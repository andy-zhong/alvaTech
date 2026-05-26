import { VENDURE_PRODUCT_VARIANTS, getVendureVariantForSlug } from "../data/vendure-mapping.js";
import { getVendureProducts } from "./vendure-client.js";
import { clearVendureCartSyncSignature } from "./vendure-cart-sync.js";

const MINOR_UNITS = 100;

export async function fetchCommerceCatalog() {
  const data = await getVendureProducts({ take: 100, skip: 0 });
  const items = data.products?.items ?? [];
  const bySku = new Map();
  const bySlug = new Map();

  for (const product of items) {
    for (const variant of product.variants ?? []) {
      const record = {
        slug: product.slug,
        productName: product.name,
        variantId: variant.id,
        variantName: variant.name,
        sku: variant.sku,
        priceMinor: variant.priceWithTax,
        price: typeof variant.priceWithTax === "number" ? variant.priceWithTax / MINOR_UNITS : null,
        currencyCode: variant.currencyCode,
        active: true,
      };

      bySku.set(variant.sku, record);
      bySlug.set(product.slug, record);
    }
  }

  return {
    bySku,
    bySlug,
    fetchedAt: new Date().toISOString(),
  };
}

export function getCommerceRecordForSlug(catalog, slug) {
  const mapping = getVendureVariantForSlug(slug);
  if (!mapping?.sku) return null;
  return catalog?.bySku?.get(mapping.sku) ?? null;
}

export function formatCommercePrice(record, lang = "en") {
  if (!record || typeof record.price !== "number" || !record.currencyCode) {
    return null;
  }

  return new Intl.NumberFormat(lang === "sv" ? "sv-SE" : "en-SE", {
    style: "currency",
    currency: record.currencyCode,
    maximumFractionDigits: Number.isInteger(record.price) ? 0 : 2,
  }).format(record.price);
}

export async function refreshCartPricesFromBackend(cart) {
  const catalog = await fetchCommerceCatalog();
  const items = Array.isArray(cart) ? cart : [];
  const updatedCart = [];
  const changes = [];
  const unavailable = [];

  for (const item of items) {
    const slug = String(item.slug || "").trim();
    const mapping = getVendureVariantForSlug(slug);

    if (!slug || !mapping?.sku) {
      unavailable.push({ slug, reason: "Missing SKU mapping" });
      continue;
    }

    const record = catalog.bySku.get(mapping.sku);
    if (!record || typeof record.price !== "number") {
      unavailable.push({ slug, sku: mapping.sku, reason: "Not available in backend catalog" });
      continue;
    }

    const nextItem = {
      ...item,
      unitPrice: record.price,
      backendSku: record.sku,
      backendPriceFetchedAt: catalog.fetchedAt,
    };

    if (Number(item.unitPrice) !== Number(record.price)) {
      changes.push({
        slug,
        sku: record.sku,
        from: Number(item.unitPrice),
        to: record.price,
      });
    }

    updatedCart.push(nextItem);
  }

  if (changes.length || unavailable.length) {
    clearVendureCartSyncSignature();
  }

  return {
    catalog,
    updatedCart,
    changed: changes.length > 0,
    changes,
    unavailable,
  };
}

export function getMappedProductSlugs() {
  return Object.keys(VENDURE_PRODUCT_VARIANTS);
}
