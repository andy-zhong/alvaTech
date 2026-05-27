import {
    bootstrapWorker,
    Order,
    OrderService,
    RequestContextService,
    TransactionalConnection,
} from '@vendure/core';
import { SortOrder } from '@vendure/common/lib/generated-types';
import { config } from '../vendure-config';

const PAGE_SIZE = 100;
const DEFAULT_EXPIRY_HOURS = 24;

type PendingOrder = Pick<Order, 'id' | 'code' | 'state' | 'active' | 'updatedAt'>;

function shouldApply(): boolean {
    return process.argv.slice(2).includes('--apply');
}

function getExpiryHours(): number {
    const arg = process.argv.slice(2).find(value => value.startsWith('--hours='));
    const parsed = Number(arg?.replace('--hours=', '') ?? DEFAULT_EXPIRY_HOURS);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_EXPIRY_HOURS;
}

async function expirePendingOrders() {
    const apply = shouldApply();
    const expiryHours = getExpiryHours();
    const cutoff = new Date(Date.now() - expiryHours * 60 * 60 * 1000);

    const worker = await bootstrapWorker(config, {
        nestApplicationContextOptions: {
            logger: ['error', 'warn'],
        },
    });

    try {
        const app = worker.app;
        const requestContextService = app.get(RequestContextService);
        const orderService = app.get(OrderService);
        const connection = app.get(TransactionalConnection);
        const ctx = await requestContextService.create({ apiType: 'admin' });
        const pendingOrders: PendingOrder[] = [];

        for (let skip = 0; ; skip += PAGE_SIZE) {
            const page = await orderService.findAll(ctx, {
                take: PAGE_SIZE,
                skip,
                sort: { updatedAt: SortOrder.ASC },
            });

            for (const order of page.items) {
                if (order.state === 'ArrangingPayment' && order.updatedAt < cutoff) {
                    pendingOrders.push({
                        id: order.id,
                        code: order.code,
                        state: order.state,
                        active: order.active,
                        updatedAt: order.updatedAt,
                    });
                }
            }

            if (skip + page.items.length >= page.totalItems) {
                break;
            }
        }

        console.log(`${apply ? 'Applying' : 'Dry run'} pending checkout expiry.`);
        console.log(`Expiry threshold: ${expiryHours} hour${expiryHours === 1 ? '' : 's'}.`);
        console.log(`Cutoff: ${cutoff.toISOString()}.`);
        console.log(`Pending checkouts to cancel: ${pendingOrders.length}`);

        for (const order of pendingOrders) {
            console.log(`- ${order.code} (${order.state}, active ${order.active}, updated ${order.updatedAt.toISOString()}, id ${order.id})`);
        }

        if (!apply) {
            console.log(`No changes made. Re-run with --apply --hours=${expiryHours} to cancel these pending checkouts.`);
            return;
        }

        let cancelled = 0;
        let sessionsCleared = 0;

        for (const order of pendingOrders) {
            const result = await orderService.cancelOrder(ctx, {
                orderId: order.id,
                cancelShipping: true,
                reason: `Pending checkout expired after ${expiryHours} hour${expiryHours === 1 ? '' : 's'}.`,
            });

            if (isErrorResult(result)) {
                console.warn(`- skipped ${order.code}: ${result.message || result.errorCode}`);
                continue;
            }

            cancelled += 1;
            const clearResult = await connection.rawConnection
                .createQueryBuilder()
                .update('session')
                .set({ activeOrderId: null })
                .where('activeOrderId = :orderId', { orderId: order.id })
                .execute();
            sessionsCleared += clearResult.affected ?? 0;
        }

        console.log(`Cancelled pending checkouts: ${cancelled}`);
        console.log(`Sessions cleared: ${sessionsCleared}`);
    } finally {
        await worker.app.close();
    }
}

function isErrorResult(result: unknown): result is { errorCode: string; message?: string } {
    return !!result && typeof result === 'object' && 'errorCode' in result;
}

expirePendingOrders().catch(err => {
    console.error(err);
    process.exitCode = 1;
});
