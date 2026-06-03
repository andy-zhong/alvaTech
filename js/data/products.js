/**
 * data/products.js
 * Single source of truth for storefront products.
 */

import { VOLTRIX_PRODUCT } from "./products/voltrix.js";
import { BATTERY_PRODUCT } from "./products/battery.js";
import { INVERTER_PRODUCT } from "./products/inverter.js";
import { VOLTDOCK_PRODUCT } from "./products/voltdock.js";
import { BACKPACK_PRODUCT } from "./products/backpack.js";
import { BIKE_ACCESSORY_PRODUCT } from "./products/bike.js";
import { SOLAR_TRACKING_PRODUCT } from "./products/solar-tracking.js";
import {
  VOLTRIX_STAND_MOUNTING_PRODUCT,
  VOLTRIX_WALL_MOUNTING_PRODUCT,
} from "./products/mounting.js";

export const PRODUCTS = [
  VOLTRIX_PRODUCT,
  BATTERY_PRODUCT,
  INVERTER_PRODUCT,
  VOLTDOCK_PRODUCT,
  BACKPACK_PRODUCT,
  BIKE_ACCESSORY_PRODUCT,
  VOLTRIX_WALL_MOUNTING_PRODUCT,
  VOLTRIX_STAND_MOUNTING_PRODUCT,
  SOLAR_TRACKING_PRODUCT,
];
