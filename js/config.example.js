// Copy this file to js/config.js on production deployments if the frontend
// is hosted separately from the backend.
//
// Local development defaults:
// - Empty ALVA_API_BASE_URL means same-origin Express API requests.
// - Empty ALVA_VENDURE_SHOP_API falls back to http://localhost:2605/shop-api,
//   or http://127.0.0.1:2605/shop-api when the frontend is opened from 127.0.0.1.
//
// Local split-port example:
// window.ALVA_API_BASE_URL = "http://localhost:3000";
// window.ALVA_VENDURE_SHOP_API = "http://localhost:2605/shop-api";
//
// Examples:
// window.ALVA_API_BASE_URL = "https://api.alvatechnology.se";
// window.ALVA_VENDURE_SHOP_API = "https://api.alvatechnology.se/shop-api";
//
// Staging examples:
// window.ALVA_API_BASE_URL = "https://staging-api.alvatechnology.se";
// window.ALVA_VENDURE_SHOP_API = "https://staging-api.alvatechnology.se/shop-api";
//
// Stripe publishable keys are safe to expose. Use test keys on staging only.
// window.ALVA_STRIPE_PUBLISHABLE_KEY = "pk_test_...";

window.ALVA_API_BASE_URL = "";
window.ALVA_VENDURE_SHOP_API = "";
window.ALVA_STRIPE_PUBLISHABLE_KEY = "";
