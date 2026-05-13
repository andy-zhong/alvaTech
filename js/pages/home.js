import { getAllProducts, getProductBySlug, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";
import { getHomeContent } from "../data/home-content.js";

const ICONS = {
  modular: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
     <rect x="3" y="3" width="7" height="7" rx="1.5"/>
     <rect x="14" y="3" width="7" height="7" rx="1.5"/>
     <rect x="3" y="14" width="7" height="7" rx="1.5"/>
     <rect x="14" y="14" width="7" height="7" rx="1.5"/>
   </svg>`,
  solar: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
     <circle cx="12" cy="12" r="4"/>
     <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
   </svg>`,
  backup: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
   </svg>`,
  portable: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
     <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
   </svg>`,
};

const ICON_SEQUENCE = [ICONS.modular, ICONS.solar, ICONS.backup, ICONS.portable];

export function renderHomePage({ lang, productUrl }) {
  const content = getHomeContent(lang);
  const featuredProduct = getProductBySlug(content.productSlug);
  const featuredProductContent = featuredProduct
    ? getProductContent(featuredProduct, lang)
    : null;
  const featuredHref = featuredProduct ? productUrl(featuredProduct.slug) : "./views/products.html";

  return `
    <section class="home-showcase-hero" aria-labelledby="home-hero-title">
      <div class="home-showcase-hero__glow" aria-hidden="true"></div>
      <div class="home-showcase-hero__shell">
        <div class="home-showcase-hero__copy">
          <span class="eyebrow home-showcase-hero__eyebrow">${content.hero.eyebrow}</span>
          <h1 id="home-hero-title" class="home-showcase-hero__title">${content.hero.title}</h1>
          <p class="home-showcase-hero__subtitle">${content.hero.subtitle}</p>
          <div class="home-showcase-hero__actions">
            <a class="button button--primary home-showcase-hero__primary" href="${featuredHref}">
              ${content.hero.primaryCta}
            </a>
            <a class="button button--secondary home-showcase-hero__secondary" href="#home-how-it-works">
              ${content.hero.secondaryCta}
            </a>
          </div>
          <div class="home-showcase-hero__signals" aria-label="Primary use cases">
            ${content.hero.quickPoints.map((point) => `<span>${point}</span>`).join("")}
          </div>
        </div>

        <div class="showcase home-showcase-hero__product">
          <div class="showcase__stage">
            <button class="showcase__button" type="button"
                    data-direction="prev"
                    aria-label="${t(lang, "previousProduct")}"></button>

            <div class="product-visual" id="home-showcase"></div>

            <button class="showcase__button" type="button"
                    data-direction="next"
                    aria-label="${t(lang, "nextProduct")}"></button>
          </div>
        </div>
      </div>
    </section>

    <section class="home-section home-why" aria-labelledby="home-why-title">
      <div class="home-section-inner">
        ${renderSectionHeading(content.why.eyebrow, content.why.title, "home-why-title")}
        <div class="home-card-grid home-card-grid--four">
          ${content.why.items.map((item, index) => renderFeatureCard(item, index)).join("")}
        </div>
      </div>
    </section>

    <section class="home-section home-use-cases" aria-labelledby="home-use-cases-title">
      <div class="home-section-inner home-use-cases__layout">
        <div>
          <span class="eyebrow">${content.useCases.eyebrow}</span>
          <h2 id="home-use-cases-title" class="home-section-title">${content.useCases.title}</h2>
        </div>
        <div class="home-use-cases__grid">
          ${content.useCases.items.map(([title, body], index) => `
            <article class="home-use-case reveal" style="--delay:${(index * 0.08).toFixed(2)}s">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <h3>${title}</h3>
              <p>${body}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="home-section home-system" id="home-how-it-works" aria-labelledby="home-system-title">
      <div class="home-section-inner home-system__layout">
        <div class="home-system__visual reveal" aria-hidden="true">
          <div class="home-system__hub"></div>
          <span></span><span></span><span></span>
        </div>
        <div class="home-system__copy">
          <span class="eyebrow">${content.works.eyebrow}</span>
          <h2 id="home-system-title" class="home-section-title">${content.works.title}</h2>
          <div class="home-steps">
            ${content.works.steps.map(([title, body], index) => `
              <article class="home-step reveal" style="--delay:${(index * 0.1).toFixed(2)}s">
                <span>${index + 1}</span>
                <div>
                  <h3>${title}</h3>
                  <p>${body}</p>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      </div>
    </section>

    <section class="home-section home-trust" aria-labelledby="home-trust-title">
      <div class="home-section-inner home-trust__card reveal">
        <div>
          <span class="eyebrow">${content.trust.eyebrow}</span>
          <h2 id="home-trust-title" class="home-section-title">${content.trust.title}</h2>
          <p>${content.trust.body}</p>
        </div>
        <div class="home-trust__points">
          ${content.trust.points.map((point) => `<span>${point}</span>`).join("")}
        </div>
      </div>
    </section>

    <section class="home-section home-featured-product" aria-labelledby="home-featured-title">
      <div class="home-section-inner">
        <article class="home-featured-product__card reveal reveal--scale">
          <div class="home-featured-product__media">
            ${featuredProduct ? `<img src="${featuredProduct.heroImage}" alt="${featuredProductContent?.name ?? content.productAlt}">` : ""}
          </div>
          <div class="home-featured-product__copy">
            <span class="eyebrow">${content.featured.eyebrow}</span>
            <h2 id="home-featured-title">${content.featured.title}</h2>
            <p>${content.featured.body}</p>
            ${featuredProduct ? `<span class="home-featured-product__price">${featuredProduct.price}</span>` : ""}
            <div class="home-featured-product__actions">
              <a class="button button--primary" href="${featuredHref}">${content.featured.cta}</a>
              <a class="button button--secondary" href="${featuredHref}">${content.featured.secondaryCta}</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="home-section home-faq" aria-labelledby="home-faq-title">
      <div class="home-section-inner">
        ${renderSectionHeading(content.faq.eyebrow, content.faq.title, "home-faq-title")}
        <div class="home-faq__list">
          ${content.faq.items.map(([question, answer], index) => `
            <article class="home-faq__item reveal" style="--delay:${(index * 0.06).toFixed(2)}s">
              <h3>${question}</h3>
              <p>${answer}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

export function bindHomePage({ lang, productUrl }) {
  initCarousel(lang, productUrl);
  initScrollReveal();
}

function renderSectionHeading(eyebrow, title, id) {
  return `
    <div class="home-section-heading">
      <span class="eyebrow">${eyebrow}</span>
      <h2 id="${id}" class="home-section-title">${title}</h2>
    </div>
  `;
}

function renderFeatureCard(item, index) {
  return `
    <article class="home-feature-card reveal" style="--delay:${(index * 0.1).toFixed(2)}s">
      <div class="home-feature-card__icon">${ICON_SEQUENCE[index] || ICON_SEQUENCE[0]}</div>
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    </article>
  `;
}

function initCarousel(lang, productUrl) {
  const target = document.getElementById("home-showcase");
  if (!target) return;

  const content = getHomeContent(lang);
  const products = getAllProducts();
  if (!products.length) return;

  const featuredIndex = Math.max(0, products.findIndex((product) => product.slug === content.productSlug));
  let activeIndex = featuredIndex;
  let isAnimating = false;

  function paintProduct() {
    const product = products[activeIndex];
    const productContent = getProductContent(product, lang);
    const href = productUrl(product.slug);
    const ctaLabel = product.slug === content.productSlug
      ? content.hero.productCta
      : t(lang, "productCardCta");

    target.innerHTML = `
      <a class="product-visual__link" href="${href}" aria-label="${productContent.name}">
        <div class="product-visual__frame">
          <img src="${product.heroImage}" alt="${productContent.name}" draggable="false" loading="eager">
        </div>
      </a>
      <div class="product-visual__meta">
        <p class="product-visual__market">${content.market.market}</p>
        <h2 class="product-visual__name">${productContent.name}</h2>
        <a class="button button--primary product-visual__configure" href="${href}">
          ${ctaLabel}
        </a>
      </div>
    `;
  }

  function goTo(newIndex) {
    if (isAnimating || products.length <= 1) return;
    isAnimating = true;
    target.classList.add("is-fading");

    setTimeout(() => {
      activeIndex = (newIndex + products.length) % products.length;
      paintProduct();
      void target.offsetHeight;
      target.classList.remove("is-fading");
      isAnimating = false;
    }, 220);
  }

  const buttons = [...document.querySelectorAll(".showcase__button")];
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const delta = button.dataset.direction === "next" ? 1 : -1;
      goTo(activeIndex + delta);
    });
  });

  if (products.length <= 1) {
    buttons.forEach((button) => {
      button.hidden = true;
      button.setAttribute("aria-hidden", "true");
    });
  }

  paintProduct();
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}
