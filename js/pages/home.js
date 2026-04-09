import { getAllProducts, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";

export function renderHomePage({ lang }) {
  return `
    <section class="hero">
      <div class="hero__top">
        <div class="hero__copy">
          <span class="eyebrow">${t(lang, "heroEyebrow")}</span>
          <h1>${t(lang, "heroTitle")}</h1>
          <p>${t(lang, "heroBody")}</p>
        </div>
      </div>
      <div class="showcase" aria-label="${t(lang, "navProducts")}">
        <button class="showcase__button" type="button" data-direction="prev" aria-label="${t(lang, "previousProduct")}"></button>
        <div class="showcase__stage">
          <div class="product-visual" id="home-showcase"></div>
        </div>
        <button class="showcase__button" type="button" data-direction="next" aria-label="${t(lang, "nextProduct")}"></button>
      </div>
    </section>

    <section class="section">
      <div class="info-grid">
        <article class="kpi">
          <strong>${t(lang, "statOne")}</strong>
          <p>${t(lang, "statOneBody")}</p>
        </article>
        <article class="kpi">
          <strong>${t(lang, "statTwo")}</strong>
          <p>${t(lang, "statTwoBody")}</p>
        </article>
        <article class="kpi">
          <strong>${t(lang, "statThree")}</strong>
          <p>${t(lang, "statThreeBody")}</p>
        </article>
      </div>
    </section>
  `;
}

export function bindHomePage({ lang, productUrl }) {
  const target = document.getElementById("home-showcase");
  if (!target) return;

  const products = getAllProducts();
  let activeIndex = 0;

  const paint = () => {
    const product = products[activeIndex];
    const content = getProductContent(product, lang);
    target.innerHTML = `
      <a class="product-visual__link" href="${productUrl(product.slug)}" aria-label="${content.name}">
        <img src="${product.heroImage}" alt="${content.name}">
      </a>
      <h2 class="product-visual__name">${content.name}</h2>
      <a class="button button--primary" href="${productUrl(product.slug)}">${t(lang, "heroBuy")}</a>
    `;
  };

  document.querySelectorAll(".showcase__button").forEach((button) => {
    button.addEventListener("click", () => {
      const delta = button.dataset.direction === "next" ? 1 : -1;
      activeIndex = (activeIndex + delta + products.length) % products.length;
      paint();
    });
  });

  paint();
}
