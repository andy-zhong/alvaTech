import { getBuyEnabledProducts, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";

export function renderBuyHubPage({ lang, productUrl, buyProductUrl }) {
  return `
    <section class="page-hero">
      <div class="page-hero__inner">
        <span class="eyebrow">Configure</span>
        <h1>Configure your Voltrix system.</h1>
        <p>Choose the real available product that fits your use case, then continue into the existing configuration and checkout flow.</p>
      </div>
    </section>

    <section class="section buy-hub">
      ${getBuyEnabledProducts().map((product) => {
        const content = getProductContent(product, lang);
        return `
          <article class="buy-hub__item">
            <img src="${product.heroImage}" alt="${content.name}">
            <div class="product-card__body">
              <span class="product-card__meta">${product.price}</span>
              <h2>${content.name}</h2>
              <p>${content.summary}</p>
              <div class="hero__actions">
                <a class="button button--primary" href="${buyProductUrl(product.slug)}">Choose setup</a>
                <a class="button button--secondary" href="${productUrl(product.slug)}">${t(lang, "productCardCta")}</a>
              </div>
            </div>
          </article>
        `;
      }).join("")}
    </section>
  `;
}
