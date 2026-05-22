export const VENDURE_PRODUCT_VARIANTS = {
  "voltrix-5-pack-kit": {
    sku: "ALVA-VOLTRIX-5PACK",
  },
  "voltrix-battery-module": {
    sku: "ALVA-VOLTRIX-BATTERY-1KWH",
  },
  voltdock: {
    sku: "ALVA-VOLTDOCK",
  },
};

export function getVendureVariantForSlug(slug) {
  return VENDURE_PRODUCT_VARIANTS[slug] ?? null;
}
