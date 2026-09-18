import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Allow, Ctx, ID, Permission, RequestContext } from '@vendure/core';
import { AlvaInquiryService } from './alva-inquiry.service';

@Resolver()
export class AlvaInquiryShopResolver {
    constructor(private inquiryService: AlvaInquiryService) {}

    @Mutation()
    @Allow(Permission.Public)
    submitAlvaInquiry(@Args('input') input: Record<string, unknown>) {
        return this.inquiryService.submit(input);
    }
}

@Resolver()
export class AlvaInquiryAdminResolver {
    constructor(private inquiryService: AlvaInquiryService) {}

    @Query()
    @Allow(Permission.SuperAdmin, Permission.ReadCustomer)
    alvaInquiries(@Args('options', { nullable: true }) options?: Record<string, unknown>) {
        return this.inquiryService.list((options ?? {}) as never);
    }

    @Query()
    @Allow(Permission.SuperAdmin, Permission.ReadCustomer)
    alvaInquiry(@Args('id') id: ID) {
        return this.inquiryService.findOne(id);
    }

    @Mutation()
    @Allow(Permission.SuperAdmin, Permission.UpdateCustomer)
    updateAlvaInquiryStatus(@Ctx() _ctx: RequestContext, @Args('id') id: ID, @Args('status') status: string) {
        return this.inquiryService.updateStatus(id, status);
    }
}
