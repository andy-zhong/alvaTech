import { getAllProducts, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";

export function renderHomePage({ lang }) {
  const heroTitle =
    lang === "sv"
      ? "Energi for sommarstugor och livet utomhus"
      : "Power for summer houses and outdoor living";

  return `
    <section class="hero hero--home">
      <div class="hero__shell">
        <div class="hero__copy">
          <span class="eyebrow hero__kicker">VOLTRIX BY ALVA</span>
          <h1>${heroTitle}</h1>
        </div>

        <div class="showcase" aria-label="${t(lang, "navProducts")}">
          <div class="showcase__stage">
            <button class="showcase__button" type="button" data-direction="prev" aria-label="${t(lang, "previousProduct")}"></button>
            <div class="product-visual" id="home-showcase"></div>
            <button class="showcase__button" type="button" data-direction="next" aria-label="${t(lang, "nextProduct")}"></button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function bindHomePage({ lang, productUrl, buyProductUrl }) {
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
      <a class="button button--primary product-visual__buy" href="${buyProductUrl(product.slug)}">${t(lang, "heroBuy")}</a>
    `;
  };

  const buttons = [...document.querySelectorAll(".showcase__button")];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const delta = button.dataset.direction === "next" ? 1 : -1;
      activeIndex = (activeIndex + delta + products.length) % products.length;
      paint();
    });
  });

  if (products.length <= 1) {
    buttons.forEach((button) => {
      button.disabled = true;
      button.setAttribute("aria-hidden", "true");
    });
  }

  paint();
}
