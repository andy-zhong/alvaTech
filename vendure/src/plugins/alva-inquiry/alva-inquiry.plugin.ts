import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import gql from 'graphql-tag';
import { AlvaInquiryController } from './alva-inquiry.controller';
import { AlvaInquiry } from './alva-inquiry.entity';
import { AlvaInquiryAdminResolver, AlvaInquiryShopResolver } from './alva-inquiry.resolver';
import { AlvaInquiryService } from './alva-inquiry.service';

const commonTypes = gql`
    type AlvaInquirySubmissionResult {
        success: Boolean!
        reference: String!
        notificationStatus: String!
    }

    input AlvaInquiryInput {
        source: String
        company: String
        contact: String
        name: String
        email: String
        phone: String
        message: String
        needs: String
        locale: String
        pageUrl: String
        website: String
    }
`;

const shopApiExtensions = gql`
    ${commonTypes}
    extend type Mutation {
        submitAlvaInquiry(input: AlvaInquiryInput!): AlvaInquirySubmissionResult!
    }
`;

const adminApiExtensions = gql`
    type AlvaInquiry {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        reference: String!
        source: String!
        status: String!
        company: String!
        contact: String!
        email: String!
        phone: String!
        message: String!
        locale: String!
        pageUrl: String!
        userAgent: String!
        metadataJson: String!
        notificationStatus: String!
        notificationError: String!
        notifiedAt: DateTime
    }

    type AlvaInquiryList {
        items: [AlvaInquiry!]!
        totalItems: Int!
    }

    input AlvaInquiryListOptions {
        skip: Int
        take: Int
        status: String
        source: String
        search: String
    }

    extend type Query {
        alvaInquiries(options: AlvaInquiryListOptions): AlvaInquiryList!
        alvaInquiry(id: ID!): AlvaInquiry
    }

    extend type Mutation {
        updateAlvaInquiryStatus(id: ID!, status: String!): AlvaInquiry!
    }
`;

@VendurePlugin({
    imports: [PluginCommonModule],
    entities: [AlvaInquiry],
    controllers: [AlvaInquiryController],
    providers: [AlvaInquiryService],
    exports: [AlvaInquiryService],
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [AlvaInquiryShopResolver],
    },
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [AlvaInquiryAdminResolver],
    },
    dashboard: './dashboard/index.tsx',
    compatibility: '^3.0.0',
})
export class AlvaInquiryPlugin {}
