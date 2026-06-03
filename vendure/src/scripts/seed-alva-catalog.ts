import {
    Asset,
    AssetService,
    bootstrapWorker,
    CollectionService,
    CurrencyCode,
    LanguageCode,
    Product,
    ProductService,
    ProductVariant,
    ProductVariantService,
    RequestContextService,
    runMigrations,
    StockLocationService,
    Translated,
} from '@vendure/core';
import fs from 'fs';
import path from 'path';
import { config } from '../vendure-config';

type AlvaSeedProduct = {
    slug: string;
    name: string;
    description: string;
    sku: string;
    price: number;
    stockOnHand: number;
    assetName: string;
    assetPath?: string;
    enabled?: boolean;
};

const ALVA_PRODUCTS: AlvaSeedProduct[] = [
    {
        slug: 'voltrix-5-pack-kit',
        name: 'Voltrix 5-Pack Kit',
        description:
            'A fixed 5 kWh starting setup. Includes five NMC battery modules for seasonal homes, everyday energy support and expandable outdoor use.',
        sku: 'ALVA-VOLTRIX-5PACK',
        price: 1098000,
        stockOnHand: 25,
        assetName: 'Alva Voltrix 5-Pack Kit',
        assetPath: 'products/voltrix/voltrix02.png',
    },
    {
        slug: 'voltrix-battery-module',
        name: 'Voltrix Battery Module',
        description:
            'A 1 kWh NMC battery module for expanding or replacing capacity in the Voltrix energy system.',
        sku: 'ALVA-VOLTRIX-BATTERY-1KWH',
        price: 299000,
        stockOnHand: 100,
        assetName: 'Alva Voltrix Battery Module',
        assetPath: 'products/battery/battery01.png',
    },
    {
        slug: 'voltrix-inverter',
        name: 'Voltrix Inverter',
        description:
            'The inverter unit for building and expanding a Voltrix Battery Pack setup.',
        sku: 'ALVA-VOLTRIX-INVERTER',
        price: 1098000,
        stockOnHand: 40,
        assetName: 'Alva Voltrix Inverter',
        assetPath: 'products/inverter/Inverter01.png',
    },
    {
        slug: 'voltdock',
        name: 'VoltDock',
        description:
            'A dual-source desktop hub for charging, organization and backup power at the desk.',
        sku: 'ALVA-VOLTDOCK',
        price: 399000,
        stockOnHand: 40,
        assetName: 'Alva VoltDock',
        assetPath: 'products/voltdock/voltdock01.png',
    },
    {
        slug: 'backpack-power',
        name: 'Backpack Power',
        description:
            'A carrying add-on for moving Battery Packs closer to outdoor tasks and last-meter work.',
        sku: 'ALVA-BACKPACK-POWER',
        price: 149000,
        stockOnHand: 40,
        assetName: 'Alva Backpack Power',
        assetPath: 'products/backpack/backpack_1inverter+1battery-optimized.jpg',
    },
    {
        slug: 'bike-accessory',
        name: 'Bike accessory',
        description:
            'A light mobility add-on for moving Battery Packs further in local routines.',
        sku: 'ALVA-BIKE-ACCESSORY',
        price: 99000,
        stockOnHand: 40,
        assetName: 'Alva Bike accessory',
        assetPath: 'products/bike/bike01-optimized.png',
    },
    {
        slug: 'voltrix-wall-mounting',
        name: 'Voltrix Wall Mounting',
        description:
            'A future wall-mounted support option for organizing Voltrix Battery Packs. Coming soon - price not included.',
        sku: 'ALVA-VOLTRIX-WALL-MOUNTING',
        price: 0,
        stockOnHand: 0,
        assetName: 'Alva Voltrix Wall Mounting',
        enabled: false,
    },
    {
        slug: 'voltrix-stand-mounting',
        name: 'Voltrix Stand Mounting',
        description:
            'A future freestanding support option for organizing Voltrix Battery Packs. Coming soon - price not included.',
        sku: 'ALVA-VOLTRIX-STAND-MOUNTING',
        price: 0,
        stockOnHand: 0,
        assetName: 'Alva Voltrix Stand Mounting',
        enabled: false,
    },
    {
        slug: 'solar-tracking-system',
        name: 'Solar tracking system',
        description:
            'A future solar-focused extension for summer house setups that want to make more of available daylight. Coming soon - price not included.',
        sku: 'ALVA-SOLAR-TRACKING-SYSTEM',
        price: 0,
        stockOnHand: 0,
        assetName: 'Alva Solar tracking system',
        enabled: false,
    },
];

const ALVA_COLLECTION = {
    slug: 'alva-products',
    name: 'Alva Products',
    description: 'A compact local demonstration collection for Alva catalog validation.',
};

const ALVA_ASSET_TAG = 'alva-seed';
const DEFAULT_SEED_ASSET_ROOT = path.join(process.cwd(), 'static', 'seed-assets');

async function seedAlvaCatalog() {
    validateRequiredSeedAssets();

    await runMigrations(config);

    const worker = await bootstrapWorker(config, {
        nestApplicationContextOptions: {
            logger: ['error', 'warn'],
        },
    });

    try {
        const app = worker.app;
        const requestContextService = app.get(RequestContextService);
        const assetService = app.get(AssetService);
        const collectionService = app.get(CollectionService);
        const productService = app.get(ProductService);
        const productVariantService = app.get(ProductVariantService);
        const stockLocationService = app.get(StockLocationService);

        const ctx = await requestContextService.create({
            apiType: 'admin',
            languageCode: LanguageCode.en,
        });
        const stockLocation = await stockLocationService.defaultStockLocation(ctx);
        const currencyCode = ctx.channel.defaultCurrencyCode as CurrencyCode;
        const created: string[] = [];
        const updated: string[] = [];
        const skipped: string[] = [];
        const productIds: Array<string | number> = [];
        const assetIds: Array<string | number> = [];

        for (const seedProduct of ALVA_PRODUCTS) {
            const asset = await ensureAlvaAsset(assetService, ctx, seedProduct);
            if (asset) {
                assetIds.push(asset.id);
            }
            const existingVariant = await findVariantBySku(productVariantService, ctx, seedProduct.sku);
            const existingProduct = existingVariant
                ? await productVariantService.getProductForVariant(ctx, existingVariant)
                : await productService.findOneBySlug(ctx, seedProduct.slug);

            if (existingProduct) {
                await updateProduct(productService, ctx, existingProduct, seedProduct, asset?.id);
                productIds.push(existingProduct.id);

                if (existingVariant) {
                    await updateVariant(productVariantService, ctx, existingVariant, seedProduct, stockLocation.id, currencyCode, asset?.id);
                    updated.push(seedProduct.slug);
                } else {
                    await createVariant(productVariantService, ctx, existingProduct.id, seedProduct, stockLocation.id, currencyCode, asset?.id);
                    updated.push(`${seedProduct.slug} (created variant)`);
                }
                continue;
            }

            const product = await productService.create(ctx, {
                enabled: seedProduct.enabled ?? true,
                featuredAssetId: asset?.id,
                assetIds: asset ? [asset.id] : [],
                translations: [
                    {
                        languageCode: LanguageCode.en,
                        name: seedProduct.name,
                        slug: seedProduct.slug,
                        description: seedProduct.description,
                    },
                ],
            });

            productIds.push(product.id);

            await createVariant(productVariantService, ctx, product.id, seedProduct, stockLocation.id, currencyCode, asset?.id);

            created.push(seedProduct.slug);
        }

        await upsertAlvaCollection(collectionService, ctx, productIds, assetIds[0]);

        console.log(
            `Alva catalog seed complete. Created: ${created.length || 0}. Updated: ${updated.length || 0}. Skipped: ${skipped.length || 0}.`,
        );
        if (created.length) {
            console.log(`Created slugs: ${created.join(', ')}`);
        }
        if (updated.length) {
            console.log(`Updated prices for slugs: ${updated.join(', ')}`);
        }
        if (skipped.length) {
            console.log(`Skipped existing slugs: ${skipped.join(', ')}`);
        }
    } finally {
        await worker.app.close();
    }
}

seedAlvaCatalog().catch(err => {
    console.error(err);
    process.exitCode = 1;
});

function getSeedAssetRoot(): string {
    return process.env.ALVA_SEED_ASSET_ROOT || DEFAULT_SEED_ASSET_ROOT;
}

function resolveSeedAssetPath(seedProduct: AlvaSeedProduct): string | undefined {
    if (!seedProduct.assetPath) {
        return undefined;
    }

    return path.resolve(getSeedAssetRoot(), seedProduct.assetPath);
}

function validateRequiredSeedAssets() {
    const missingFiles = ALVA_PRODUCTS
        .map(seedProduct => ({
            seedProduct,
            filePath: resolveSeedAssetPath(seedProduct),
        }))
        .filter((item): item is { seedProduct: AlvaSeedProduct; filePath: string } => !!item.filePath)
        .filter(item => !fs.existsSync(item.filePath));

    if (!missingFiles.length) {
        return;
    }

    const formatted = missingFiles
        .map(item => `- ${item.seedProduct.sku}: ${item.filePath}`)
        .join('\n');

    throw new Error(
        `Missing required Alva seed asset files. No catalog changes were made.\n${formatted}`,
    );
}

async function ensureAlvaAsset(
    assetService: AssetService,
    ctx: Parameters<AssetService['findAll']>[0],
    seedProduct: AlvaSeedProduct,
): Promise<Translated<Asset> | undefined> {
    const filePath = resolveSeedAssetPath(seedProduct);
    if (!filePath) {
        return undefined;
    }

    const fileName = path.basename(filePath);

    const existing = await assetService.findAll(ctx, {
        take: 1,
        filter: {
            _or: [
                { name: { eq: seedProduct.assetName } },
                { source: { contains: fileName } },
            ],
        },
    });

    if (existing.items[0]) {
        return assetService.update(ctx, {
            id: existing.items[0].id,
            name: seedProduct.assetName,
            tags: [ALVA_ASSET_TAG, seedProduct.slug],
            translations: [
                {
                    languageCode: LanguageCode.en,
                    name: seedProduct.assetName,
                },
            ],
        });
    }

    const asset = await assetService.createFromFileStream(fs.createReadStream(filePath), filePath, ctx);
    if ('errorCode' in asset) {
        throw new Error(`${asset.errorCode}: ${asset.message}`);
    }

    return assetService.update(ctx, {
        id: asset.id,
        name: seedProduct.assetName,
        tags: [ALVA_ASSET_TAG, seedProduct.slug],
        translations: [
            {
                languageCode: LanguageCode.en,
                name: seedProduct.assetName,
            },
        ],
    });
}

async function upsertAlvaCollection(
    collectionService: CollectionService,
    ctx: Parameters<CollectionService['findOneBySlug']>[0],
    productIds: Array<string | number>,
    featuredAssetId: string | number | undefined,
) {
    const filters = [
        {
            code: 'product-id-filter',
            arguments: [
                {
                    name: 'productIds',
                    value: JSON.stringify(productIds.map(id => String(id))),
                },
                {
                    name: 'combineWithAnd',
                    value: JSON.stringify(true),
                },
            ],
        },
    ];
    const translations = [
        {
            languageCode: LanguageCode.en,
            name: ALVA_COLLECTION.name,
            slug: ALVA_COLLECTION.slug,
            description: ALVA_COLLECTION.description,
        },
    ];
    const existing = await collectionService.findOneBySlug(ctx, ALVA_COLLECTION.slug);

    if (existing) {
        await collectionService.update(ctx, {
            id: existing.id,
            isPrivate: false,
            filters,
            featuredAssetId,
            assetIds: featuredAssetId ? [featuredAssetId] : [],
            translations,
        });
        return;
    }

    await collectionService.create(ctx, {
        isPrivate: false,
        filters,
        featuredAssetId,
        assetIds: featuredAssetId ? [featuredAssetId] : [],
        translations,
    });
}

async function findVariantBySku(
    productVariantService: ProductVariantService,
    ctx: Parameters<ProductVariantService['findAll']>[0],
    sku: string,
): Promise<Translated<ProductVariant> | undefined> {
    const variants = await productVariantService.findAll(ctx, {
        take: 1,
        filter: {
            sku: {
                eq: sku,
            },
        },
    });

    return variants.items[0];
}

async function updateProduct(
    productService: ProductService,
    ctx: Parameters<ProductService['update']>[0],
    product: Translated<Product>,
    seedProduct: AlvaSeedProduct,
    assetId: string | number | undefined,
) {
    await productService.update(ctx, {
        id: product.id,
        enabled: seedProduct.enabled ?? true,
        featuredAssetId: assetId ?? null as never,
        assetIds: assetId ? [assetId] : [],
        translations: [
            {
                languageCode: LanguageCode.en,
                name: seedProduct.name,
                slug: seedProduct.slug,
                description: seedProduct.description,
            },
        ],
    });
}

async function updateVariant(
    productVariantService: ProductVariantService,
    ctx: Parameters<ProductVariantService['update']>[0],
    variant: Translated<ProductVariant>,
    seedProduct: AlvaSeedProduct,
    stockLocationId: string | number,
    currencyCode: CurrencyCode,
    assetId: string | number | undefined,
) {
    await productVariantService.update(ctx, [
        {
            id: variant.id,
            enabled: seedProduct.enabled ?? true,
            sku: seedProduct.sku,
            price: seedProduct.price,
            featuredAssetId: assetId ?? null as never,
            assetIds: assetId ? [assetId] : [],
            stockLevels: [
                {
                    stockLocationId,
                    stockOnHand: seedProduct.stockOnHand,
                },
            ],
            translations: [
                {
                    languageCode: LanguageCode.en,
                    name: seedProduct.name,
                },
            ],
        },
    ]);

    await productVariantService.createOrUpdateProductVariantPrice(
        ctx,
        variant.id,
        seedProduct.price,
        ctx.channelId,
        currencyCode,
    );
}

async function createVariant(
    productVariantService: ProductVariantService,
    ctx: Parameters<ProductVariantService['create']>[0],
    productId: string | number,
    seedProduct: AlvaSeedProduct,
    stockLocationId: string | number,
    currencyCode: CurrencyCode,
    assetId: string | number | undefined,
) {
    const variants = await productVariantService.create(ctx, [
        {
            productId,
            enabled: seedProduct.enabled ?? true,
            sku: seedProduct.sku,
            price: seedProduct.price,
            featuredAssetId: assetId,
            assetIds: assetId ? [assetId] : [],
            stockLevels: [
                {
                    stockLocationId,
                    stockOnHand: seedProduct.stockOnHand,
                },
            ],
            translations: [
                {
                    languageCode: LanguageCode.en,
                    name: seedProduct.name,
                },
            ],
        },
    ]);

    await productVariantService.createOrUpdateProductVariantPrice(
        ctx,
        variants[0].id,
        seedProduct.price,
        ctx.channelId,
        currencyCode,
    );
}
