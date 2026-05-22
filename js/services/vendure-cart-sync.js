import { getVendureVariantForSlug } from "../data/vendure-mapping.js";
import {
  addVendureItemToOrder,
  getVendureActiveOrder,
  getVendureProductVariantBySku,
} from "./vendure-client.js";

const SYNC_SIGNATURE_KEY = "alva-vendure-cart-sync-signature";

export function isVendureCartEnabled() {
  return true;
}

export function clearVendureCartSyncSignature() {
  localStorage.removeItem(SYNC_SIGNATURE_KEY);
}

export async function syncLocalCartToVendure(cart) {
  const normalizedCart = normalizeCart(cart);

  if (!normalizedCart.length) {
    throw new Error("Cart is empty.");
  }

  const signature = createCartSignature(normalizedCart);

  if (localStorage.getItem(SYNC_SIGNATURE_KEY) === signature && await hasActiveVendureOrder()) {
    return {
      skipped: true,
      reason: "Local cart is already synced to the current Vendure session.",
    };
  }

  const results = [];
  let activeOrder = null;

  for (const item of normalizedCart) {
    const mapping = getVendureVariantForSlug(item.slug);

    if (!mapping?.sku) {
      throw new Error(`Missing Vendure SKU mapping for ${item.slug}.`);
    }

    const variant = await getVendureProductVariantBySku(mapping.sku);
    const data = await addVendureItemToOrder(variant.id, item.quantity);
    const result = data.addItemToOrder;

    if (result?.errorCode) {
      throw new Error(result.message || result.errorCode);
    }

    activeOrder = result;

    results.push({
      slug: item.slug,
      sku: mapping.sku,
      quantity: item.quantity,
      orderCode: result?.code,
      orderState: result?.state,
    });
  }

  localStorage.setItem(SYNC_SIGNATURE_KEY, signature);

  return {
    skipped: false,
    activeOrder,
    results,
  };
}

function normalizeCart(cart) {
  const items = Array.isArray(cart) ? cart : [];
  const grouped = new Map();

  for (const item of items) {
    const slug = String(item.slug || "").trim();

    if (!slug) {
      continue;
    }

    const quantity = getVendureQuantity(item);

    if (quantity < 1) {
      continue;
    }

    grouped.set(slug, (grouped.get(slug) || 0) + quantity);
  }

  return Array.from(grouped.entries())
    .map(([slug, quantity]) => ({ slug, quantity }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

function getVendureQuantity(item) {
  if (item.isConfigurable && Number.isInteger(item.batteryCount)) {
    return item.slug === "voltrix-battery-module" ? item.batteryCount : item.quantity || 1;
  }

  return Number.isInteger(item.quantity) ? item.quantity : 1;
}

function createCartSignature(cart) {
  return JSON.stringify(cart);
}

async function hasActiveVendureOrder() {
  try {
    const data = await getVendureActiveOrder();
    return !!data.activeOrder?.lines?.length;
  } catch {
    return false;
  }
}
