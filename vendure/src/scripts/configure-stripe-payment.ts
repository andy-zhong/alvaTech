import {
    bootstrapWorker,
    LanguageCode,
    PaymentMethodService,
    RequestContextService,
    ChannelService,
    runMigrations,
    TransactionalConnection,
    User,
} from '@vendure/core';
import { config } from '../vendure-config';

const STRIPE_PAYMENT_CODE = 'stripe';

async function configureStripePayment() {
    const apiKey = String(process.env.STRIPE_SECRET_KEY || '').trim();
    const webhookSecret = String(process.env.STRIPE_WEBHOOK_SECRET || '').trim();

    if (!apiKey || !webhookSecret) {
        console.log('Stripe payment method not configured. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET, then run this script again.');
        return;
    }

    if (!/^sk_(test|live)_/.test(apiKey)) {
        throw new Error('STRIPE_SECRET_KEY must start with sk_test_ or sk_live_.');
    }

    if (!/^whsec_/.test(webhookSecret)) {
        throw new Error('STRIPE_WEBHOOK_SECRET must start with whsec_.');
    }

    await runMigrations(config);

    const worker = await bootstrapWorker(config, {
        nestApplicationContextOptions: {
            logger: ['error', 'warn'],
        },
    });

    try {
        const app = worker.app;
        const requestContextService = app.get(RequestContextService);
        const paymentMethodService = app.get(PaymentMethodService);
        const channelService = app.get(ChannelService);
        const connection = app.get(TransactionalConnection);
        const channel = await channelService.getDefaultChannel();
        const superadminCredentials = config.authOptions.superadminCredentials;

        if (!superadminCredentials?.identifier) {
            throw new Error('SuperAdmin credentials are not configured. Set SUPERADMIN_USERNAME before configuring Stripe payments.');
        }

        const superAdminUser = await connection.rawConnection.getRepository(User).findOne({
            where: {
                identifier: superadminCredentials.identifier,
            },
            relations: ['roles', 'roles.channels'],
        });

        if (!superAdminUser) {
            throw new Error('SuperAdmin user was not found. Check SUPERADMIN_USERNAME and run the Vendure setup before configuring Stripe payments.');
        }

        const ctx = await requestContextService.create({
            apiType: 'admin',
            channelOrToken: channel,
            languageCode: LanguageCode.en,
            user: superAdminUser,
        });
        const existing = (await paymentMethodService.findAll(ctx, {
            take: 1,
            filter: {
                code: {
                    eq: STRIPE_PAYMENT_CODE,
                },
            },
        })).items[0];
        const input = {
            code: STRIPE_PAYMENT_CODE,
            enabled: true,
            handler: {
                code: STRIPE_PAYMENT_CODE,
                arguments: [
                    { name: 'apiKey', value: apiKey },
                    { name: 'webhookSecret', value: webhookSecret },
                ],
            },
            translations: [
                {
                    languageCode: LanguageCode.en,
                    name: 'Stripe',
                    description: 'Secure card and Klarna payments through Stripe.',
                },
            ],
        };
        const paymentMethod = existing
            ? await paymentMethodService.update(ctx, { id: existing.id, ...input })
            : await paymentMethodService.create(ctx, input);

        await paymentMethodService.assignPaymentMethodsToChannel(ctx, {
            paymentMethodIds: [paymentMethod.id],
            channelId: channel.id,
        });

        console.log(`Stripe payment method ${existing ? 'updated' : 'created'} and assigned to channel "${channel.code}".`);
    } finally {
        await worker.app.close();
    }
}

configureStripePayment().catch(err => {
    console.error(err);
    process.exitCode = 1;
});
