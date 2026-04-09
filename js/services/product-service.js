import { PRODUCTS } from "../data/products.js";

export function getAllProducts() {
  return PRODUCTS;
}

export function getBuyEnabledProducts() {
  return PRODUCTS.filter((product) => product.buyEnabled);
}

export function getProductBySlug(slug) {
  return PRODUCTS.find((product) => product.slug === slug) ?? null;
}

export function getProductContent(product, lang) {
  return product.translations[lang] ?? product.translations.en;
}
