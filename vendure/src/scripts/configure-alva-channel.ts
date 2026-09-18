import {
    bootstrapWorker,
    ChannelService,
    CurrencyCode,
    GlobalSettingsService,
    LanguageCode,
    RequestContextService,
    runMigrations,
} from '@vendure/core';
import { config } from '../vendure-config';

async function configureAlvaChannel() {
    await runMigrations(config);

    const worker = await bootstrapWorker(config, {
        nestApplicationContextOptions: {
            logger: ['error', 'warn'],
        },
    });

    try {
        const app = worker.app;
        const requestContextService = app.get(RequestContextService);
        const channelService = app.get(ChannelService);
        const globalSettingsService = app.get(GlobalSettingsService);
        const ctx = await requestContextService.create({
            apiType: 'admin',
            languageCode: LanguageCode.en,
        });
        const channel = await channelService.getDefaultChannel(ctx);
        await globalSettingsService.updateSettings(ctx, {
            availableLanguages: [LanguageCode.en, LanguageCode.zh_Hans],
        });
        const result = await channelService.update(ctx, {
            id: channel.id,
            currencyCode: CurrencyCode.SEK,
            defaultCurrencyCode: CurrencyCode.SEK,
            availableCurrencyCodes: [CurrencyCode.SEK],
            defaultLanguageCode: LanguageCode.en,
            availableLanguageCodes: [LanguageCode.en, LanguageCode.zh_Hans],
        });

        if ('errorCode' in result) {
            throw new Error(`${result.errorCode}: ${result.message}`);
        }

        console.log(
            `Alva channel configured. Channel "${result.code}" now uses ${result.defaultCurrencyCode} with English and Simplified Chinese enabled.`,
        );
    } finally {
        await worker.app.close();
    }
}

configureAlvaChannel().catch(err => {
    console.error(err);
    process.exitCode = 1;
});
