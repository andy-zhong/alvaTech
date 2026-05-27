import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
    Allow,
    Ctx,
    ID,
    Order,
    OrderService,
    Permission,
    PluginCommonModule,
    RequestContext,
    SessionService,
    Transaction,
    TransactionalConnection,
    VendurePlugin,
} from '@vendure/core';
import gql from 'graphql-tag';

type AlvaReviewStatus = 'pending' | 'approved' | 'rejected' | 'expired' | 'cancelled';

const adminApiExtensions = gql`
    extend type Mutation {
        approveAlvaOrder(orderId: ID!, note: String): Order!
        rejectAlvaOrder(orderId: ID!, reason: String!): Order!
        expireAlvaOrder(orderId: ID!, reason: String!): Order!
        cancelAlvaOrder(orderId: ID!, reason: String!): Order!
    }
`;

const shopApiExtensions = gql`
    extend type Mutation {
        clearAlvaActiveOrder: Boolean!
    }
`;

@Resolver()
class AlvaShopCartResolver {
    constructor(private sessionService: SessionService) {}

    @Transaction()
    @Mutation()
    @Allow(Permission.Public)
    async clearAlvaActiveOrder(@Ctx() ctx: RequestContext): Promise<boolean> {
        if (ctx.session) {
            await this.sessionService.unsetActiveOrder(ctx, ctx.session);
        }

        return true;
    }
}

@Resolver()
class AlvaOrderReviewResolver {
    constructor(
        private connection: TransactionalConnection,
        private orderService: OrderService,
    ) {}

    @Transaction()
    @Mutation()
    @Allow(Permission.SuperAdmin, Permission.UpdateOrder)
    approveAlvaOrder(
        @Ctx() ctx: RequestContext,
        @Args('orderId') orderId: ID,
        @Args('note', { nullable: true }) note?: string,
    ) {
        return this.updateReviewStatus(ctx, orderId, 'approved', note);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.SuperAdmin, Permission.UpdateOrder)
    rejectAlvaOrder(
        @Ctx() ctx: RequestContext,
        @Args('orderId') orderId: ID,
        @Args('reason') reason: string,
    ) {
        return this.updateReviewStatus(ctx, orderId, 'rejected', reason);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.SuperAdmin, Permission.UpdateOrder)
    expireAlvaOrder(
        @Ctx() ctx: RequestContext,
        @Args('orderId') orderId: ID,
        @Args('reason') reason: string,
    ) {
        return this.updateReviewStatus(ctx, orderId, 'expired', reason);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.SuperAdmin, Permission.UpdateOrder)
    async cancelAlvaOrder(
        @Ctx() ctx: RequestContext,
        @Args('orderId') orderId: ID,
        @Args('reason') reason: string,
    ) {
        const result = await this.orderService.cancelOrder(ctx, {
            orderId,
            reason,
            cancelShipping: true,
        });

        if (isErrorResult(result)) {
            throw new Error(result.message || `Unable to cancel order: ${result.errorCode}`);
        }

        return this.updateReviewStatus(ctx, orderId, 'cancelled', reason);
    }

    private async updateReviewStatus(
        ctx: RequestContext,
        orderId: ID,
        status: AlvaReviewStatus,
        note?: string,
    ): Promise<Order> {
        const repo = this.connection.getRepository(ctx, Order);
        const order = await repo.findOne({ where: { id: orderId as any } });

        if (!order) {
            throw new Error(`Order ${orderId} was not found.`);
        }

        const customFields = {
            ...(order.customFields ?? {}),
            alvaReviewStatus: status,
            alvaReviewNote: note ?? '',
            alvaReviewedAt: new Date(),
            alvaReviewedBy: ctx.activeUserId ? String(ctx.activeUserId) : '',
        };

        await repo.update(order.id, { customFields });

        return repo.findOneOrFail({ where: { id: orderId as any } });
    }
}

function isErrorResult(result: unknown): result is { errorCode: string; message?: string } {
    return !!result && typeof result === 'object' && 'errorCode' in result;
}

@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [AlvaOrderReviewResolver, AlvaShopCartResolver],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [AlvaOrderReviewResolver],
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [AlvaShopCartResolver],
    },
    configuration: config => {
        const orderFields = config.customFields?.Order ?? [];
        const fieldNames = new Set(orderFields.map(field => field.name));
        const alvaFields = [
            {
                name: 'alvaCustomerNote',
                type: 'text' as const,
                nullable: true,
                public: true,
                label: [{ languageCode: 'en' as any, value: 'Customer note' }],
            },
            {
                name: 'alvaReviewStatus',
                type: 'string' as const,
                defaultValue: 'pending',
                nullable: false,
                public: false,
                options: [
                    { value: 'pending' },
                    { value: 'approved' },
                    { value: 'rejected' },
                    { value: 'expired' },
                    { value: 'cancelled' },
                ],
            },
            {
                name: 'alvaReviewNote',
                type: 'text' as const,
                nullable: true,
                public: false,
            },
            {
                name: 'alvaReviewedAt',
                type: 'datetime' as const,
                nullable: true,
                public: false,
            },
            {
                name: 'alvaReviewedBy',
                type: 'string' as const,
                nullable: true,
                public: false,
            },
        ].filter(field => !fieldNames.has(field.name));

        config.customFields = {
            ...(config.customFields ?? {}),
            Order: [...orderFields, ...alvaFields],
        };

        return config;
    },
    compatibility: '^3.0.0',
})
export class AlvaOrderReviewPlugin {}
