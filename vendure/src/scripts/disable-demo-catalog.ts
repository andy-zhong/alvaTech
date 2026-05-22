import {
    AssetService,
    bootstrapWorker,
    CollectionService,
    ProductService,
    ProductVariantService,
    RequestContextService,
    runMigrations,
} from '@vendure/core';
import { ID } from '@vendure/common/lib/shared-types';
import { SortOrder } from '@vendure/common/lib/generated-types';
import { config } from '../vendure-config';

const DEFAULT_ALVA_SKU_PREFIX = 'ALVA-';
const ALVA_ASSET_TAG = 'alva-seed';
const ALVA_COLLECTION_SLUG = 'alva-products';
const PAGE_SIZE = 100;

type ScriptOptions = {
    apply: boolean;
    alvaSkuPrefix: string;
};

type ProductSummary = {
    id: ID;
    name: string;
    slug: string;
};

type VariantSummary = {
    id: ID;
    productId: ID;
    sku: string;
    name: string;
};

type CollectionSummary = {
    id: ID;
    name: string;
    slug: string;
};

type AssetSummary = {
    id: ID;
    name: string;
    source: string;
};

function parseOptions(): ScriptOptions {
    const args = process.argv.slice(2);
    const prefixArg = args.find(arg => arg.startsWith('--alva-sku-prefix='));

    return {
        apply: args.includes('--apply'),
        alvaSkuPrefix: prefixArg?.split('=')[1] || process.env.ALVA_SKU_PREFIX || DEFAULT_ALVA_SKU_PREFIX,
    };
}

function isAlvaSku(sku: string | null | undefined, prefix: string): boolean {
    return !!sku && sku.toUpperCase().startsWith(prefix.toUpperCase());
}

function formatVariant(variant: VariantSummary): string {
    return `${variant.sku} (${variant.name}, id ${variant.id})`;
}

function formatProduct(product: ProductSummary): string {
    return `${product.slug} (${product.name}, id ${product.id})`;
}

function formatCollection(collection: CollectionSummary): string {
    return `${collection.slug} (${collection.name}, id ${collection.id})`;
}

function formatAsset(asset: AssetSummary): string {
    return `${asset.name} (${asset.source}, id ${asset.id})`;
}

async function disableDemoCatalog() {
    const options = parseOptions();

    if (!options.alvaSkuPrefix.trim()) {
        throw new Error('ALVA SKU prefix cannot be empty.');
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
        const assetService = app.get(AssetService);
        const collectionService = app.get(CollectionService);
        const productService = app.get(ProductService);
        const productVariantService = app.get(ProductVariantService);
        const ctx = await requestContextService.create({ apiType: 'admin' });

        const protectedProductIds = new Set<string>();
        const protectedAssetIds = new Set<string>();
        const variantsToDisable: VariantSummary[] = [];
        const variantsToDetachAssets: VariantSummary[] = [];

        for (let skip = 0; ; skip += PAGE_SIZE) {
            const variants = await productVariantService.findAll(ctx, {
                take: PAGE_SIZE,
                skip,
                sort: { id: SortOrder.ASC },
            });

            for (const variant of variants.items) {
                const summary: VariantSummary = {
                    id: variant.id,
                    productId: variant.productId,
                    sku: variant.sku,
                    name: variant.name,
                };

                if (isAlvaSku(summary.sku, options.alvaSkuPrefix)) {
                    protectedProductIds.add(String(summary.productId));
                    const hydratedVariant = await productVariantService.findOne(ctx, summary.id, ['featuredAsset', 'assets']);
                    if (hydratedVariant?.featuredAssetId) {
                        protectedAssetIds.add(String(hydratedVariant.featuredAssetId));
                    }
                    for (const orderableAsset of hydratedVariant?.assets ?? []) {
                        protectedAssetIds.add(String(orderableAsset.assetId));
                    }
                } else if (variant.enabled) {
                    variantsToDisable.push(summary);
                }

                if (!isAlvaSku(summary.sku, options.alvaSkuPrefix)) {
                    variantsToDetachAssets.push(summary);
                }
            }

            if (skip + variants.items.length >= variants.totalItems) {
                break;
            }
        }

        const productsToDisable: ProductSummary[] = [];
        const productsToDetachAssets: ProductSummary[] = [];

        for (let skip = 0; ; skip += PAGE_SIZE) {
            const products = await productService.findAll(ctx, {
                take: PAGE_SIZE,
                skip,
                sort: { id: SortOrder.ASC },
            });

            for (const product of products.items) {
                if (protectedProductIds.has(String(product.id))) {
                    const hydratedProduct = await productService.findOne(ctx, product.id, ['featuredAsset', 'assets']);
                    if (hydratedProduct?.featuredAssetId) {
                        protectedAssetIds.add(String(hydratedProduct.featuredAssetId));
                    }
                    for (const orderableAsset of hydratedProduct?.assets ?? []) {
                        protectedAssetIds.add(String(orderableAsset.assetId));
                    }
                } else {
                    const summary = {
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                    };

                    if (product.enabled) {
                        productsToDisable.push(summary);
                    }
                    productsToDetachAssets.push(summary);
                }
            }

            if (skip + products.items.length >= products.totalItems) {
                break;
            }
        }

        const collectionsToPrivatize: CollectionSummary[] = [];
        const collectionsToDetachAssets: CollectionSummary[] = [];

        for (let skip = 0; ; skip += PAGE_SIZE) {
            const collections = await collectionService.findAll(ctx, {
                take: PAGE_SIZE,
                skip,
                sort: { id: SortOrder.ASC },
            });

            for (const collection of collections.items) {
                const summary = {
                    id: collection.id,
                    name: collection.name,
                    slug: collection.slug,
                };
                const isRoot = collection.slug.startsWith('__') || collection.name.toLowerCase() === 'root';
                const isAlvaCollection = collection.slug === ALVA_COLLECTION_SLUG;

                if (isAlvaCollection) {
                    const hydratedCollection = await collectionService.findOne(ctx, collection.id, ['featuredAsset', 'assets']);
                    if (hydratedCollection?.featuredAsset?.id) {
                        protectedAssetIds.add(String(hydratedCollection.featuredAsset.id));
                    }
                    for (const orderableAsset of hydratedCollection?.assets ?? []) {
                        protectedAssetIds.add(String(orderableAsset.assetId));
                    }
                    continue;
                }

                if (!isRoot) {
                    if (!collection.isPrivate) {
                        collectionsToPrivatize.push(summary);
                    }
                    collectionsToDetachAssets.push(summary);
                }
            }

            if (skip + collections.items.length >= collections.totalItems) {
                break;
            }
        }

        const assetsToDelete: AssetSummary[] = [];

        for (let skip = 0; ; skip += PAGE_SIZE) {
            const assets = await assetService.findAll(
                ctx,
                {
                    take: PAGE_SIZE,
                    skip,
                    sort: { id: SortOrder.ASC },
                },
                ['tags'],
            );

            for (const asset of assets.items) {
                const tags = asset.tags?.map(tag => tag.value) ?? [];
                if (protectedAssetIds.has(String(asset.id)) || tags.includes(ALVA_ASSET_TAG)) {
                    protectedAssetIds.add(String(asset.id));
                    continue;
                }

                assetsToDelete.push({
                    id: asset.id,
                    name: asset.name,
                    source: asset.source,
                });
            }

            if (skip + assets.items.length >= assets.totalItems) {
                break;
            }
        }

        console.log(
            `${options.apply ? 'Applying' : 'Dry run'} demo catalog cleanup. Preserving products with variants whose SKUs start with "${options.alvaSkuPrefix}".`,
        );
        console.log(`Variants to disable: ${variantsToDisable.length}`);
        for (const variant of variantsToDisable) {
            console.log(`- ${formatVariant(variant)}`);
        }
        console.log(`Products to disable: ${productsToDisable.length}`);
        for (const product of productsToDisable) {
            console.log(`- ${formatProduct(product)}`);
        }
        console.log(`Collections to make private: ${collectionsToPrivatize.length}`);
        for (const collection of collectionsToPrivatize) {
            console.log(`- ${formatCollection(collection)}`);
        }
        console.log(`Demo product/variant asset links to clear: ${productsToDetachAssets.length + variantsToDetachAssets.length}`);
        console.log(`Demo collection asset links to clear: ${collectionsToDetachAssets.length}`);
        console.log(`Non-Alva assets to delete: ${assetsToDelete.length}`);
        for (const asset of assetsToDelete) {
            console.log(`- ${formatAsset(asset)}`);
        }

        if (!options.apply) {
            console.log('No changes made. Re-run with --apply to clean these demo catalog records.');
            return;
        }

        if (variantsToDisable.length) {
            await productVariantService.update(
                ctx,
                variantsToDisable.map(variant => ({
                    id: variant.id,
                    enabled: false,
                })),
            );
        }

        for (const product of productsToDisable) {
            await productService.update(ctx, {
                id: product.id,
                enabled: false,
                featuredAssetId: null as never,
                assetIds: [],
            });
        }

        for (const product of productsToDetachAssets) {
            if (!productsToDisable.some(item => String(item.id) === String(product.id))) {
                await productService.update(ctx, {
                    id: product.id,
                    featuredAssetId: null as never,
                    assetIds: [],
                });
            }
        }

        for (const variant of variantsToDetachAssets) {
            await productVariantService.update(ctx, [
                {
                    id: variant.id,
                    featuredAssetId: null as never,
                    assetIds: [],
                },
            ]);
        }

        for (const collection of collectionsToPrivatize) {
            await collectionService.update(ctx, {
                id: collection.id,
                isPrivate: true,
                featuredAssetId: null as never,
                assetIds: [],
            });
        }

        for (const collection of collectionsToDetachAssets) {
            if (!collectionsToPrivatize.some(item => String(item.id) === String(collection.id))) {
                await collectionService.update(ctx, {
                    id: collection.id,
                    featuredAssetId: null as never,
                    assetIds: [],
                });
            }
        }

        if (assetsToDelete.length) {
            console.log(
                `Skipped physical deletion of ${assetsToDelete.length} non-Alva assets. Asset records were unbound from demo catalog records to avoid local permission/foreign-key issues.`,
            );
        }

        console.log(
            `Demo catalog cleanup complete. Disabled ${variantsToDisable.length} variants and ${productsToDisable.length} products, privatized ${collectionsToPrivatize.length} collections, unbound ${assetsToDelete.length} non-Alva assets.`,
        );
    } finally {
        await worker.app.close();
    }
}

disableDemoCatalog().catch(err => {
    console.error(err);
    process.exitCode = 1;
});
