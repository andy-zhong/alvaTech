import { getAllProducts, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";

// ─────────────────────────────────────────────────────────────────────────────
// Section copy (mirrors the project's i18n pattern — inline for non-system keys)
// ─────────────────────────────────────────────────────────────────────────────

const COPY = {
  en: {
    eyebrow:  "VOLTRIX BY ESPARK",
    heroTitle: "Power for summer houses and outdoor living",
    stats: [
      { target: 12,   suffix: "",  label: "Battery modules" },
      { target: 2400, suffix: "W", label: "Peak AC output"  },
      { target: 97,   suffix: "%", label: "System efficiency" },
    ],
    featuresTitle: "Built for real life",
    features: [
      {
        title: "Scales as you need it",
        body:  "Start with one module and expand one battery at a time — from 0.57 to 6.84 kWh — no system changes required.",
      },
      {
        title: "Any weather, any season",
        body:  "IP65 rated with self-heating. Operates confidently from −20 °C to +45 °C. Built for Nordic conditions.",
      },
      {
        title: "Energy that travels with you",
        body:  "The removable core powers your e-bike, backpack and portable gear. One battery for your whole life.",
      },
    ],
    ctaTitle:  "Build your system",
    ctaBody:   "Choose your capacity, configure to your needs, and order directly.",
    ctaButton: "View all products",
  },
  sv: {
    eyebrow:  "VOLTRIX AV ESPARK",
    heroTitle: "Energi för sommarstugor och livet utomhus",
    stats: [
      { target: 12,   suffix: "",  label: "Batterimoduler"      },
      { target: 2400, suffix: "W", label: "Toppeffekt (AC)"     },
      { target: 97,   suffix: "%", label: "Systemverkningsgrad" },
    ],
    featuresTitle: "Byggt för verkligheten",
    features: [
      {
        title: "Skalbart efter dina behov",
        body:  "Börja med en modul och bygg ut en i taget — från 0,57 till 6,84 kWh — utan systemändringar.",
      },
      {
        title: "Alla väder, alla årstider",
        body:  "IP65-klassad med självuppvärmning. Fungerar från −20 °C till +45 °C. Byggt för nordiska förhållanden.",
      },
      {
        title: "Energi som följer dig",
        body:  "Det utbytbara kärnet driver din elcykel, ryggsäck och utrustning. Ett batteri för hela livet.",
      },
    ],
    ctaTitle:  "Bygg ditt system",
    ctaBody:   "Välj kapacitet, konfigurera efter dina behov och beställ direkt.",
    ctaButton: "Visa alla produkter",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Icons (inline SVG so no external dependency)
// ─────────────────────────────────────────────────────────────────────────────

const ICONS = [
  // Expand / scale
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
     <polyline points="15 3 21 3 21 9"/>
     <polyline points="9 21 3 21 3 15"/>
     <line x1="21" y1="3" x2="14" y2="10"/>
     <line x1="3" y1="21" x2="10" y2="14"/>
   </svg>`,
  // Shield / weather
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
   </svg>`,
  // Zap / portable
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
     <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
   </svg>`,
];

// ─────────────────────────────────────────────────────────────────────────────
// Render
// ─────────────────────────────────────────────────────────────────────────────

export function renderHomePage({ lang }) {
  const c = COPY[lang] || COPY.en;

  return `
    <!-- ════════════════════════════ HERO ════════════════════════════ -->
    <section class="hero hero--home">
      <div class="hero__shell">

        <div class="hero__copy">
          <span class="eyebrow hero__kicker">${c.eyebrow}</span>
          <h1>${c.heroTitle}</h1>
        </div>

        <div class="showcase">
          <div class="showcase__stage">
            <button class="showcase__button" type="button"
                    data-direction="prev"
                    aria-label="${t(lang, "previousProduct")}"></button>

            <div class="product-visual" id="home-showcase">
              <!-- Painted by bindHomePage -->
            </div>

            <button class="showcase__button" type="button"
                    data-direction="next"
                    aria-label="${t(lang, "nextProduct")}"></button>
          </div>
        </div>

      </div>
    </section>

    <!-- ════════════════════════════ STATS ═══════════════════════════ -->
    <section class="home-stats">
      <div class="home-stats__inner">
        ${c.stats.map((s, i) => `
          <div class="home-stat reveal" style="--delay:${(i * 0.12).toFixed(2)}s">
            <strong
              class="home-stat__value"
              data-counter-target="${s.target}"
              data-counter-suffix="${s.suffix}"
            >${s.target}${s.suffix}</strong>
            <p class="home-stat__label">${s.label}</p>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- ═══════════════════════════ FEATURES ════════════════════════ -->
    <section class="home-features">
      <div class="home-section-inner">
        <h2 class="home-features__title reveal">${c.featuresTitle}</h2>
        <div class="home-features__grid">
          ${c.features.map((f, i) => `
            <article class="home-feature reveal" style="--delay:${(i * 0.11).toFixed(2)}s">
              <div class="home-feature__icon">${ICONS[i] || ICONS[0]}</div>
              <h3 class="home-feature__title">${f.title}</h3>
              <p class="home-feature__body">${f.body}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- ════════════════════════════ CTA ════════════════════════════ -->
    <section class="home-cta">
      <div class="home-section-inner">
        <div class="home-cta__card reveal reveal--scale">
          <h2 class="home-cta__title">${c.ctaTitle}</h2>
          <p class="home-cta__body">${c.ctaBody}</p>
          <a class="button button--primary home-cta__btn" href="./views/products.html">
            ${c.ctaButton}
          </a>
        </div>
      </div>
    </section>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// Bind — called by bootstrap after innerHTML is set
// ─────────────────────────────────────────────────────────────────────────────

export function bindHomePage({ lang, productUrl, buyProductUrl }) {
  initCarousel(lang, productUrl, buyProductUrl);
  initScrollReveal();
  initCounters();
}

// ─────────────────────────────────────────────────────────────────────────────
// Carousel — stable crossfade, never jumps layout
// ─────────────────────────────────────────────────────────────────────────────

function initCarousel(lang, productUrl, buyProductUrl) {
  const target = document.getElementById("home-showcase");
  if (!target) return;

  const products = getAllProducts();
  if (!products.length) return;

  let activeIndex  = 0;
  let isAnimating  = false;

  function paintProduct() {
    const product = products[activeIndex];
    const content = getProductContent(product, lang);
    const href    = productUrl(product.slug);

    target.innerHTML = `
      <a class="product-visual__link" href="${href}" aria-label="${content.name}">
        <div class="product-visual__frame">
          <img
            src="${product.heroImage}"
            alt="${content.name}"
            draggable="false"
            loading="eager"
          >
        </div>
      </a>
      <h2 class="product-visual__name">${content.name}</h2>
      <a class="button button--primary product-visual__buy"
         href="${href}">
        ${t(lang, "heroBuy")}
      </a>
    `;
  }

  // Crossfade: fade out → swap → fade in
  function goTo(newIndex) {
    if (isAnimating || products.length <= 1) return;
    isAnimating = true;

    target.classList.add("is-fading");

    setTimeout(() => {
      activeIndex = (newIndex + products.length) % products.length;
      paintProduct();

      // Force reflow so the transition fires correctly
      void target.offsetHeight;
      target.classList.remove("is-fading");
      isAnimating = false;
    }, 200);
  }

  // Wire prev/next buttons
  const buttons = [...document.querySelectorAll(".showcase__button")];
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const delta = btn.dataset.direction === "next" ? 1 : -1;
      goTo(activeIndex + delta);
    });
  });

  // Disable arrows if only one product
  if (products.length <= 1) {
    buttons.forEach((b) => { b.hidden = true; b.setAttribute("aria-hidden", "true"); });
  }

  paintProduct();
}

// ─────────────────────────────────────────────────────────────────────────────
// Scroll reveal — adds .is-visible when element enters viewport
// ─────────────────────────────────────────────────────────────────────────────

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Fire once only
        }
      });
    },
    {
      threshold:  0.12,
      rootMargin: "0px 0px -32px 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ─────────────────────────────────────────────────────────────────────────────
// Counter animation — counts up when the stat enters viewport
// ─────────────────────────────────────────────────────────────────────────────

function initCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const end    = parseInt(el.dataset.counterTarget, 10);
        const suffix = el.dataset.counterSuffix || "";
        const dur    = 1300; // ms
        const t0     = performance.now();

        function tick(now) {
          const elapsed  = now - t0;
          const progress = Math.min(elapsed / dur, 1);
          // Ease-out cubic
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(end * eased) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll("[data-counter-target]").forEach((el) => observer.observe(el));
}