import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSchedulerPlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin, FileBasedTemplateLoader } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { DashboardPlugin } from '@vendure/dashboard/plugin';
import { GraphiqlPlugin } from '@vendure/graphiql-plugin';
import { StripePlugin } from '@vendure-community/stripe-plugin';
import 'dotenv/config';
import path from 'path';
import { DataSourceOptions } from 'typeorm';
import { AlvaOrderReviewPlugin } from './plugins/alva-order-review/alva-order-review.plugin';

const IS_DEV = process.env.APP_ENV === 'dev';
const serverPort = +process.env.PORT || 2605;
const storefrontUrl = process.env.STOREFRONT_URL || 'http://localhost:3000';
const storefrontOrigins = parseOrigins(process.env.STOREFRONT_ORIGINS || storefrontUrl);
const publicApiUrl = process.env.PUBLIC_API_URL?.trim();
const assetUrlPrefix = process.env.ASSET_URL_PREFIX?.trim()
    || (publicApiUrl ? `${publicApiUrl.replace(/\/+$/, '')}/assets/` : undefined);
const cookieSecret = getCookieSecret();
const superadminCredentials = getSuperadminCredentials();
const localStorefrontOrigins = [
    storefrontUrl,
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

function parseOrigins(value: string): string[] {
    return value
        .split(',')
        .map(origin => origin.trim())
        .filter(Boolean);
}

function requiredEnv(name: string): string {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing required environment variable ${name}. Set ${name} before starting the Vendure server or worker.`);
    }
    return value;
}

function getCookieSecret(): string {
    if (isDashboardBuild()) {
        return process.env.COOKIE_SECRET || 'dashboard-build-placeholder-cookie-secret';
    }
    return requiredEnv('COOKIE_SECRET');
}

function getSuperadminCredentials(): { identifier: string; password: string } {
    if (isDashboardBuild()) {
        return {
            identifier: process.env.SUPERADMIN_USERNAME || 'dashboard-build-superadmin',
            password: process.env.SUPERADMIN_PASSWORD || 'dashboard-build-superadmin-password',
        };
    }

    return {
        identifier: requiredEnv('SUPERADMIN_USERNAME'),
        password: requiredEnv('SUPERADMIN_PASSWORD'),
    };
}

function isDashboardBuild(): boolean {
    return process.env.npm_lifecycle_event === 'build:dashboard'
        || process.env.VENDURE_DASHBOARD_BUILD === 'true';
}

function envBoolean(name: string, defaultValue: boolean): boolean {
    const value = process.env[name]?.trim().toLowerCase();
    if (value == null || value === '') {
        return defaultValue;
    }
    return ['1', 'true', 'yes', 'on'].includes(value);
}

function envInt(name: string, defaultValue: number): number {
    const raw = process.env[name]?.trim();
    if (!raw) {
        return defaultValue;
    }
    const value = Number(raw);
    if (!Number.isInteger(value) || value <= 0) {
        throw new Error(`Invalid ${name}: expected a positive integer, received "${raw}".`);
    }
    return value;
}

function getDbConnectionOptions(): DataSourceOptions {
    const dbType = (process.env.DB_TYPE || 'sqlite').trim().toLowerCase();
    const synchronize = envBoolean('DB_SYNCHRONIZE', IS_DEV);
    const common = {
        synchronize,
        migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
        logging: false,
    };

    if (dbType === 'postgres') {
        return {
            ...common,
            type: 'postgres',
            host: requiredEnv('DB_HOST'),
            port: envInt('DB_PORT', 5432),
            database: requiredEnv('DB_NAME'),
            username: requiredEnv('DB_USERNAME'),
            password: requiredEnv('DB_PASSWORD'),
            ssl: envBoolean('DB_SSL', false) ? { rejectUnauthorized: false } : false,
        };
    }

    if (dbType === 'sqlite' || dbType === 'better-sqlite3') {
        return {
            ...common,
            type: 'better-sqlite3',
            database: process.env.DB_PATH || path.join(__dirname, '../vendure.sqlite'),
        };
    }

    throw new Error(`Unsupported DB_TYPE "${dbType}". Use "postgres" or "sqlite".`);
}

export const config: VendureConfig = {
    apiOptions: {
        port: serverPort,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        trustProxy: IS_DEV ? false : 1,
        cors: {
            origin: IS_DEV ? Array.from(new Set(localStorefrontOrigins)) : storefrontOrigins,
            credentials: true,
        },
        // The following options are useful in development mode,
        // but are best turned off for production for security
        // reasons.
        ...(IS_DEV ? {
            adminApiDebug: true,
            shopApiDebug: true,
        } : {}),
    },
    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: superadminCredentials.identifier,
            password: superadminCredentials.password,
        },
        cookieOptions: {
          secret: cookieSecret,
        },
    },
    dbConnectionOptions: getDbConnectionOptions(),
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    // When adding or altering custom field definitions, the database will
    // need to be updated. See the "Migrations" section in README.md.
    customFields: {},
    plugins: [
        GraphiqlPlugin.init(),
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            assetUrlPrefix: IS_DEV ? undefined : assetUrlPrefix,
        }),
        DefaultSchedulerPlugin.init(),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        AlvaOrderReviewPlugin,
        StripePlugin.init({
            metadata: (injector, ctx, order) => ({
                source: 'alva-storefront',
                orderCode: order.code,
                channelCode: ctx.channel.code,
            }),
        }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templateLoader: new FileBasedTemplateLoader(path.join(__dirname, '../static/email/templates')),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation.
                // Here we point to the existing Alva storefront served by Express.
                fromAddress: '"Alva Technology" <noreply@alvatechnology.com>',
                verifyEmailAddressUrl: `${storefrontUrl}/views/account.html`,
                passwordResetUrl: `${storefrontUrl}/views/account.html`,
                changeEmailAddressUrl: `${storefrontUrl}/views/account.html`
            },
        }),
        DashboardPlugin.init({
            route: 'dashboard',
            appDir: IS_DEV
                ? path.join(__dirname, '../dist/dashboard')
                : path.join(__dirname, 'dashboard'),
        }),
    ],
};
