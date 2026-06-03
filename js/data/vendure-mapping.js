export const VENDURE_PRODUCT_VARIANTS = {
  "voltrix-5-pack-kit": {
    sku: "ALVA-VOLTRIX-5PACK",
  },
  "voltrix-battery-module": {
    sku: "ALVA-VOLTRIX-BATTERY-1KWH",
  },
  "voltrix-inverter": {
    sku: "ALVA-VOLTRIX-INVERTER",
  },
  voltdock: {
    sku: "ALVA-VOLTDOCK",
  },
  "backpack-power": {
    sku: "ALVA-BACKPACK-POWER",
  },
  "bike-accessory": {
    sku: "ALVA-BIKE-ACCESSORY",
  },
  "voltrix-wall-mounting": {
    sku: "ALVA-VOLTRIX-WALL-MOUNTING",
  },
  "voltrix-stand-mounting": {
    sku: "ALVA-VOLTRIX-STAND-MOUNTING",
  },
  "solar-tracking-system": {
    sku: "ALVA-SOLAR-TRACKING-SYSTEM",
  },
};

export function getVendureVariantForSlug(slug) {
  return VENDURE_PRODUCT_VARIANTS[slug] ?? null;
}
