import { getAllProducts, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";

// ─────────────────────────────────────────────────────────────────────────────
// Copy  —  sourced from the Voltrix product PDF and adapted for Alva Technology
// ─────────────────────────────────────────────────────────────────────────────

const COPY = {
  en: {
    eyebrow:  "VOLTRIX BY ALVA",

    // Hero — the PDF's own tagline (page 1: "One Battery for All")
    heroTitle: ["One Battery", "for All"],
    heroPara:
      "The modular home energy hub. Store solar, power your home, " +
      "and take the same battery anywhere.",
    browseLink: "Explore the system",

    // Stats — sourced from the spec table (page 10 of the PDF)
    stats: [
      { target: 12,   suffix: "",  label: "Battery modules" },
      { target: 2400, suffix: "W", label: "Peak AC output"  },
      { target: 97,   suffix: "%", label: "System efficiency" },
    ],

    // Features — adapted from PDF sections "Grow As You Go", weather page, and ecosystem page
    featuresTitle: "Built for real life",
    features: [
      {
        title: "Grows with you",
        // PDF page 8: "expandable capacity from 0.57 to 12kWh"
        body:
          "Start with one module and scale to twelve — from 0.57 to 6.84 kWh " +
          "— without changing a single cable.",
      },
      {
        title: "Built for any weather",
        // PDF page 8: "−20°C~45°C Ready for any weather" / "IP65 Water or dust reliability"
        body:
          "IP65 rated with self-heating technology. Operates from −20 °C to " +
          "+45 °C. Reliable through every Nordic season.",
      },
      {
        title: "One battery, everywhere",
        // PDF page 5: "Your Battery Always at Work" / page 4: "Your energy, always with you"
        body:
          "The removable core powers your home, your e-bike, and your backpack. " +
          "One battery for your whole life.",
      },
    ],

    // CTA label in the product carousel — replaces "Buy"
    configureBtn: "Configure System",

    // CTA section
    ctaTitle:  "One battery for all.",
    ctaBody:
      "Configure your Voltrix system — choose your capacity, " +
      "set your modules, and order directly.",
    ctaButton: "View all products",
  },

  sv: {
    eyebrow:  "VOLTRIX AV ALVA",
    heroTitle: ["Ett batteri", "för allt"],
    heroPara:
      "Det modulära hemmaenergisystemet. Lagra solenergi, driv ditt hem " +
      "och ta med batteriet vart du vill.",
    browseLink: "Utforska systemet",

    stats: [
      { target: 12,   suffix: "",  label: "Batterimoduler"       },
      { target: 2400, suffix: "W", label: "Toppeffekt (AC)"      },
      { target: 97,   suffix: "%", label: "Systemverkningsgrad"  },
    ],

    featuresTitle: "Byggt för verkligheten",
    features: [
      {
        title: "Växer med dig",
        body:
          "Börja med en modul och bygg ut till tolv — från 0,57 till 6,84 kWh " +
          "— utan att byta en enda kabel.",
      },
      {
        title: "Byggt för alla väder",
        body:
          "IP65-klassad med självuppvärmning. Fungerar från −20 °C till +45 °C. " +
          "Pålitlig under alla nordiska årstider.",
      },
      {
        title: "Ett batteri, överallt",
        body:
          "Det avtagbara kärnet driver ditt hem, din elcykel och din ryggsäck. " +
          "Ett batteri för hela livet.",
      },
    ],

    configureBtn: "Konfigurera system",

    ctaTitle:  "Ett batteri för allt.",
    ctaBody:
      "Konfigurera ditt Voltrix-system — välj kapacitet, " +
      "sätt ihop modulerna och beställ direkt.",
    ctaButton: "Visa alla produkter",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Icons — inline SVG, no external dependency
// ─────────────────────────────────────────────────────────────────────────────

const ICONS = [
  // Scale / expand
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
  // Zap / portable energy
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
    <!-- ════════════════════════ HERO ════════════════════════════════ -->
    <section class="hero hero--home">
      <div class="hero__shell">

        <!-- LEFT on desktop / BOTTOM on mobile -->
        <div class="hero__copy">
          <span class="eyebrow hero__kicker">${c.eyebrow}</span>
          <h1 class="hero__headline">
            ${c.heroTitle[0]}<br>${c.heroTitle[1]}
          </h1>
          <p class="hero__sub">${c.heroPara}</p>
          <a class="hero__explore" href="./views/products.html">
            ${c.browseLink}
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2.2"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        <!-- RIGHT on desktop / TOP on mobile -->
        <div class="showcase">
          <div class="showcase__stage">
            <button class="showcase__button" type="button"
                    data-direction="prev"
                    aria-label="${t(lang, "previousProduct")}"></button>

            <div class="product-visual" id="home-showcase">
              <!-- Painted by bindHomePage → initCarousel -->
            </div>

            <button class="showcase__button" type="button"
                    data-direction="next"
                    aria-label="${t(lang, "nextProduct")}"></button>
          </div>
        </div>

      </div>
    </section>

    <!-- ════════════════════════ STATS ═══════════════════════════════ -->
    <section class="home-stats">
      <div class="home-stats__inner">
        ${c.stats.map((s, i) => `
          <div class="home-stat reveal" style="--delay:${(i * 0.14).toFixed(2)}s">
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

    <!-- ════════════════════════ FEATURES ════════════════════════════ -->
    <section class="home-features">
      <div class="home-section-inner">
        <h2 class="home-features__title reveal">${c.featuresTitle}</h2>
        <div class="home-features__grid">
          ${c.features.map((f, i) => `
            <article class="home-feature reveal" style="--delay:${(i * 0.12).toFixed(2)}s">
              <div class="home-feature__icon">${ICONS[i] || ICONS[0]}</div>
              <h3 class="home-feature__title">${f.title}</h3>
              <p class="home-feature__body">${f.body}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- ════════════════════════ CTA ═════════════════════════════════ -->
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
// Carousel — stable crossfade, image never shifts layout
// ─────────────────────────────────────────────────────────────────────────────

function initCarousel(lang, productUrl, buyProductUrl) {
  const target = document.getElementById("home-showcase");
  if (!target) return;

  const products = getAllProducts();
  if (!products.length) return;

  const c = COPY[lang] || COPY.en;

  let activeIndex = 0;
  let isAnimating = false;

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
      <a class="button button--primary product-visual__configure" href="${href}">
        ${c.configureBtn}
      </a>
    `;
  }

  // Crossfade: fade out → swap content → fade in
  function goTo(newIndex) {
    if (isAnimating || products.length <= 1) return;
    isAnimating = true;

    target.classList.add("is-fading");

    setTimeout(() => {
      activeIndex = (newIndex + products.length) % products.length;
      paintProduct();
      void target.offsetHeight; // force reflow so transition fires
      target.classList.remove("is-fading");
      isAnimating = false;
    }, 220);
  }

  // Wire arrows
  const buttons = [...document.querySelectorAll(".showcase__button")];
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const delta = btn.dataset.direction === "next" ? 1 : -1;
      goTo(activeIndex + delta);
    });
  });

  // Hide arrows when there is only one product
  if (products.length <= 1) {
    buttons.forEach((b) => { b.hidden = true; b.setAttribute("aria-hidden", "true"); });
  }

  paintProduct();
}

// ─────────────────────────────────────────────────────────────────────────────
// Scroll reveal — adds .is-visible when element enters viewport (fires once)
// ─────────────────────────────────────────────────────────────────────────────

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -24px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ─────────────────────────────────────────────────────────────────────────────
// Counter animation — ease-out count-up when stat enters viewport
// ─────────────────────────────────────────────────────────────────────────────

function initCounters() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const end    = parseInt(el.dataset.counterTarget, 10);
        const suffix = el.dataset.counterSuffix || "";
        const dur    = 1400;
        const t0     = performance.now();

        function tick(now) {
          const progress = Math.min((now - t0) / dur, 1);
          const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = Math.round(end * eased) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("[data-counter-target]").forEach((el) => observer.observe(el));
}
