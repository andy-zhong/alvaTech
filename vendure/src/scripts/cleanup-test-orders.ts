import {
    bootstrapWorker,
    OrderService,
    RequestContextService,
    runMigrations,
} from '@vendure/core';
import { SortOrder } from '@vendure/common/lib/generated-types';
import { config } from '../vendure-config';

const PAGE_SIZE = 100;

function shouldApply(): boolean {
    return process.argv.slice(2).includes('--apply');
}

async function cleanupTestOrders() {
    const apply = shouldApply();

    await runMigrations(config);

    const worker = await bootstrapWorker(config, {
        nestApplicationContextOptions: {
            logger: ['error', 'warn'],
        },
    });

    try {
        const app = worker.app;
        const requestContextService = app.get(RequestContextService);
        const orderService = app.get(OrderService);
        const ctx = await requestContextService.create({ apiType: 'admin' });
        const orders: Array<{ id: string | number; code: string; state: string; active: boolean }> = [];

        for (let skip = 0; ; skip += PAGE_SIZE) {
            const page = await orderService.findAll(ctx, {
                take: PAGE_SIZE,
                skip,
                sort: { createdAt: SortOrder.ASC },
            });

            for (const order of page.items) {
                orders.push({
                    id: order.id,
                    code: order.code,
                    state: order.state,
                    active: order.active,
                });
            }

            if (skip + page.items.length >= page.totalItems) {
                break;
            }
        }

        console.log(`${apply ? 'Applying' : 'Dry run'} local test order cleanup.`);
        const deletableOrders = orders.filter(order => order.active && order.state === 'AddingItems');
        const skippedOrders = orders.filter(order => !deletableOrders.includes(order));

        console.log(`Orders found: ${orders.length}`);
        console.log(`Active draft orders to delete: ${deletableOrders.length}`);
        for (const order of deletableOrders) {
            console.log(`- ${order.code} (${order.state}, active ${order.active}, id ${order.id})`);
        }
        console.log(`Placed or non-draft orders skipped: ${skippedOrders.length}`);
        for (const order of skippedOrders) {
            console.log(`- skipped ${order.code} (${order.state}, active ${order.active}, id ${order.id})`);
        }

        if (!apply) {
            console.log('No changes made. Re-run with --apply to delete local test orders.');
            return;
        }

        for (const order of deletableOrders) {
            await orderService.deleteOrder(ctx, order.id);
        }

        console.log(`Deleted ${deletableOrders.length} local draft test orders. Skipped ${skippedOrders.length} placed/non-draft orders.`);
    } finally {
        await worker.app.close();
    }
}

cleanupTestOrders().catch(err => {
    console.error(err);
    process.exitCode = 1;
});
