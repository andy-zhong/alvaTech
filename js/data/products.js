/**
 * data/products.js
 * Single source of truth for all products.
 *
 * TO ADD A NEW PRODUCT:
 *   1. Create  data/products/yourproduct.js  following the same structure.
 *   2. Import  YOUR_PRODUCT  here.
 *   3. Add it to the  PRODUCTS  array in the desired display order.
 *
 * Product order here determines order in:
 *   — homepage carousel
 *   — navbar dropdown
 *   — products grid
 *   — buy hub
 */

import { VOLTRIX_PRODUCT } from "./products/voltrix.js";
import { BATTERY_PRODUCT  } from "./products/battery.js";
import { VOLTDOCK_PRODUCT } from "./products/voltdock.js";

export const PRODUCTS = [
  VOLTRIX_PRODUCT, // Main system — always first
  BATTERY_PRODUCT, // Expansion batteries
  VOLTDOCK_PRODUCT, // Desktop accessory
];