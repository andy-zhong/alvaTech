import { getAllProducts, getProductContent } from "../services/product-service.js";
import { getPlatformContent } from "../data/platform-content.js";
import { t } from "../services/language-service.js";

const USE_CASE_GUIDANCE = [
  {
    title: "Summer House",
    body: "For cabins, terraces, seasonal homes and everyday comfort away from the city.",
  },
  {
    title: "Field",
    body: "For installers, service teams and portable power routines between base and site.",
  },
  {
    title: "Home backup",
    body: "For keeping practical energy available when reliability matters.",
  },
  {
    title: "Solar storage",
    body: "For storing daytime energy and using more of it when the home needs it.",
  },
];

export function renderProductsPage({ lang, productUrl }) {
  const platform = getPlatformContent(lang);

  return `
    <section class="page-hero products-platform-hero">
      <div class="page-hero__inner products-platform-hero__inner">
        <span class="eyebrow">Product fit</span>
        <h1>Find the right Voltrix system.</h1>
        <p>Start with your use case, then choose a capacity range that fits your home, work or future expansion.</p>
        <div class="page-hero__actions">
          <a class="button button--primary" href="/views/buy.html">Configure system</a>
          <a class="button button--secondary" href="/views/b2b.html">Contact us</a>
        </div>
      </div>
    </section>

    <section class="section product-fit-section" aria-labelledby="capacity-guide-title">
      <div class="section-head product-fit-section__head">
        <div>
          <span class="eyebrow">Capacity guide</span>
          <h2 id="capacity-guide-title">Choose a system range before choosing a product.</h2>
          <p>Capacity ranges are guidance for configuration. Available products are shown below.</p>
        </div>
      </div>
      <p class="tier-disclaimer">${platform.productTierNote}</p>
      <div class="product-tier-grid">
        ${platform.productTiers.map((tier) => `
          <article class="product-tier-card" id="${tier.id}">
            <span>${tier.range}</span>
            <h3>${tier.title}</h3>
            <p>${tier.body}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section" aria-labelledby="available-products-title">
      <div class="section-head product-fit-section__head">
        <div>
          <span class="eyebrow">${t(lang, "productsEyebrow")}</span>
          <h2 id="available-products-title">Available Voltrix products.</h2>
          <p>These are the real products currently connected to product details, configuration and checkout.</p>
        </div>
      </div>
      <div class="grid">
        ${getAllProducts().map((product) => renderProductCard({ product, lang, productUrl })).join("")}
      </div>
    </section>

    <section class="section" aria-labelledby="use-case-guidance-title">
      <div class="section-head product-fit-section__head">
        <div>
          <span class="eyebrow">Use case guidance</span>
          <h2 id="use-case-guidance-title">Match the system to the way energy is used.</h2>
        </div>
      </div>
      <div class="use-case-guide-grid">
        ${USE_CASE_GUIDANCE.map((item) => `
          <article class="use-case-guide-card">
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </article>
        `).join("")}
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
