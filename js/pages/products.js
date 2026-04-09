import { getAllProducts, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";

export function renderProductsPage({ lang, productUrl }) {
  return `
    <section class="page-hero">
      <div class="page-hero__inner">
        <span class="eyebrow">${t(lang, "productsEyebrow")}</span>
        <h1>${t(lang, "productsTitle")}</h1>
        <p>${t(lang, "productsBody")}</p>
      </div>
    </section>

    <section class="section">
      <div class="grid">
        ${getAllProducts().map((product) => renderProductCard({ product, lang, productUrl })).join("")}
      </div>
    </section>
  `;
}

function renderProductCard({ product, lang, productUrl }) {
  const content = getProductContent(product, lang);

  return `
    <a class="product-card" href="${productUrl(product.slug)}">
      <img src="${product.heroImage}" alt="${content.name}">
      <div class="product-card__body">
        <span class="product-card__meta">${t(lang, "productCardStatus")}</span>
        <h3>${content.name}</h3>
        <p>${content.summary}</p>
        <span class="button button--ghost">${t(lang, "productCardCta")}</span>
      </div>
    </a>
  `;
}
