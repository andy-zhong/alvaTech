import { getBuyEnabledProducts, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";
import { commerceVisibility, getPricingComingSoonLabel } from "../config/commerce-visibility.js";

export function renderBuyHubPage({ lang, productUrl, buyProductUrl }) {
  return `
    <section class="page-hero">
      <div class="page-hero__inner">
        <span class="eyebrow">${t(lang, "buyHubEyebrow")}</span>
        <h1>${t(lang, "buyHubTitle")}</h1>
        <p>${t(lang, "buyHubBody")}</p>
      </div>
    </section>

    <section class="section buy-hub">
      ${getBuyEnabledProducts().map((product) => {
        const content = getProductContent(product, lang);
        return `
          <article class="buy-hub__item">
            <img src="${product.heroImage}" alt="${content.name}">
            <div class="product-card__body">
              <span class="product-card__meta">${commerceVisibility.showPrices ? product.price : getPricingComingSoonLabel(lang)}</span>
              <h2>${content.name}</h2>
              <p>${content.summary}</p>
              <div class="hero__actions">
                <a class="button button--primary" href="${buyProductUrl(product.slug)}">${t(lang, "buyHubCta")}</a>
                <a class="button button--secondary" href="${productUrl(product.slug)}">${t(lang, "productCardCta")}</a>
              </div>
            </div>
          </article>
        `;
      }).join("")}
    </section>
  `;
}
