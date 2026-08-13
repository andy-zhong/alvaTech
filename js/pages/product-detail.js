import { getProductBySlug, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";
import {
  fetchCommerceCatalog,
  formatCommercePrice,
  getCommerceRecordForSlug,
} from "../services/commerce-catalog.js";
import { commerceVisibility, getPricingComingSoonLabel } from "../config/commerce-visibility.js";
import { bindSectionNav } from "../components/section-nav.js";

let batteryCount = 1;
let currentMediaIndex = 0;

const DETAIL_COPY = {
  en: {
    showImage: "Show image",
    previous: "Previous",
    next: "Next",
    batteryLabel: "Number of battery modules",
    batteryDecrease: "Remove one battery",
    batteryIncrease: "Add one battery",
    capacity: "Capacity",
    price: "Price",
    imageViewer: "Image viewer",
    closeViewer: "Close",
    comingSoon: "Coming soon",
    soon: "Soon",
  },
  sv: {
    showImage: "Visa bild",
    previous: "Föregående",
    next: "Nästa",
    batteryLabel: "Antal batterimoduler",
    batteryDecrease: "Ta bort en batterimodul",
    batteryIncrease: "Lägg till en batterimodul",
    capacity: "Kapacitet",
    price: "Pris",
    imageViewer: "Bildvisare",
    closeViewer: "Stäng",
    comingSoon: "Kommer snart",
    soon: "Snart",
  },
  fi: {
    showImage: "Näytä kuva",
    previous: "Edellinen",
    next: "Seuraava",
    batteryLabel: "Akkumoduulien määrä",
    batteryDecrease: "Poista yksi akkumoduuli",
    batteryIncrease: "Lisää yksi akkumoduuli",
    capacity: "Kapasiteetti",
    price: "Hinta",
    imageViewer: "Kuvakatselin",
    closeViewer: "Sulje",
  },
  no: {
    showImage: "Vis bilde",
    previous: "Forrige",
    next: "Neste",
    batteryLabel: "Antall batterimoduler",
    batteryDecrease: "Fjern én batterimodul",
    batteryIncrease: "Legg til én batterimodul",
    capacity: "Kapasitet",
    price: "Pris",
    imageViewer: "Bildeviser",
    closeViewer: "Lukk",
  },
  da: {
    showImage: "Vis billede",
    previous: "Forrige",
    next: "Næste",
    batteryLabel: "Antal batterimoduler",
    batteryDecrease: "Fjern én batterimodul",
    batteryIncrease: "Tilføj én batterimodul",
    capacity: "Kapacitet",
    price: "Pris",
    imageViewer: "Billedviser",
    closeViewer: "Luk",
  },
  it: {
    showImage: "Mostra immagine",
    previous: "Precedente",
    next: "Successivo",
    batteryLabel: "Numero di moduli batteria",
    batteryDecrease: "Rimuovi un modulo batteria",
    batteryIncrease: "Aggiungi un modulo batteria",
    capacity: "Capacita",
    price: "Prezzo",
    imageViewer: "Visualizzatore immagini",
    closeViewer: "Chiudi",
  },
};

function getDetailCopy(lang) {
  return {
    ...DETAIL_PLATFORM_COPY.en,
    ...(DETAIL_PLATFORM_COPY[lang] ?? {}),
    ...(DETAIL_COPY[lang] ?? DETAIL_COPY.en),
  };
}

const DETAIL_PLATFORM_COPY = {
  en: {
    configure: "Configure system",
    requestAdvice: "Request advice",
    whoFor: "Who it is for",
    platformFit: "How it fits the platform",
    platformFitBody:
      "This product works as part of the Voltrix modular energy platform, helping connect storage, expansion and practical deployment across home and work use cases.",
    modularity: "Capacity and modularity",
    modularityFallback:
      "Capacity and configuration depend on selected modules and setup.",
    trustTitle: "Guidance before configuration",
    navOverview: "Overview",
    navFeatures: "Features",
    navSpecs: "Specs",
    navUseCases: "Use cases",
  },
  sv: {
    configure: "Konfigurera system",
    requestAdvice: "Be om rådgivning",
    whoFor: "Vem den passar för",
    platformFit: "Hur den passar plattformen",
    platformFitBody:
      "Produkten fungerar som en del av Voltrix modulära energiplattform och kopplar samman lagring, expansion och praktisk användning.",
    modularity: "Kapacitet och modularitet",
    modularityFallback:
      "Kapacitet och konfiguration beror på valda moduler och slutlig setup.",
    modularityConfig: ({ min, max, capacity }) =>
      `Konfigurera från ${min} till ${max} moduler med ${capacity} kWh per modul. Slutlig kapacitet beror på valda moduler och setup.`,
    trustTitle: "Vägledning före konfigurering",
    navOverview: "Översikt",
    navFeatures: "Funktioner",
    navSpecs: "Specifikationer",
    navUseCases: "Användning",
  },
  it: {
    configure: "Configura sistema",
    requestAdvice: "Richiedi consiglio",
    whoFor: "Per chi e pensato",
    platformFit: "Come si integra nella piattaforma",
    platformFitBody:
      "Questo prodotto fa parte della piattaforma energetica modulare Voltrix per accumulo, espansione e uso pratico.",
    modularity: "Capacita e modularita",
    modularityFallback:
      "Capacita e configurazione dipendono dai moduli selezionati e dal setup finale.",
    trustTitle: "Guida prima della configurazione",
  },
};

const PLATFORM_USE_CASES = [
  "Summer houses",
  "Solar storage",
  "Backup power",
  "Portable deployment / field use",
];

const TRUST_POINTS = [
  "Designed in Sweden",
  "Shipped from Sweden",
  "Support and guidance available",
];

const PLATFORM_USE_CASES_BY_LANG = {
  sv: [
    "Fritidshus",
    "Solenergilagring",
    "Reservenergi",
    "Portabel användning / arbetsrutiner",
  ],
};

const TRUST_POINTS_BY_LANG = {
  sv: [
    "Designad i Sverige",
    "Skickas från Sverige",
    "Support och vägledning finns",
  ],
};

function calculatePrice(product) {
  return product.config.basePrice + batteryCount * product.config.batteryPrice;
}

function calculateCapacity(product) {
  return (batteryCount * product.config.capacityPerBattery).toFixed(2);
}

function getProductMedia(product, fallbackAlt) {
  const hero = product.heroMedia ?? {
    type: "image",
    src: product.heroImage,
    alt: fallbackAlt,
  };

  const gallery = Array.isArray(product.gallery) ? product.gallery : [];

  const uniqueGallery = gallery.filter((item) => {
    if (!item?.src && item?.type !== "placeholder") return false;
    return !(item.src === hero.src && (item.type ?? "image") === (hero.type ?? "image"));
  });

  return [hero, ...uniqueGallery];
}

function renderMainMedia(media, fallbackAlt, labels) {
  const type = media?.type ?? "image";
  const src = media?.src ?? "";
  const alt = media?.alt ?? fallbackAlt;

  if (type === "video") {
    return `<video id="detail-main-media" class="media-main-asset"
              controls playsinline preload="metadata" aria-label="${alt}">
              <source src="${src}">${alt}</video>`;
  }

  if (type === "placeholder" || !src) {
    return `<div id="detail-main-media" class="media-main-asset media-placeholder" role="img" aria-label="${alt}">
              <span>${labels.comingSoon}</span>
            </div>`;
  }

  return `<img id="detail-main-media" class="media-main-asset" src="${src}" alt="${alt}">`;
}

function renderThumbnail(media, index, isActive, fallbackAlt, labels) {
  const type = media?.type ?? "image";
  const src = media?.src ?? "";
  const alt = media?.alt ?? `${fallbackAlt} ${index + 1}`;

  const inner = type === "placeholder" || !src
    ? `<span class="media-thumb__placeholder">${labels.soon}</span>`
    : type === "video"
      ? `<span class="media-thumb__video-wrap">
         <video class="media-thumb__asset" muted playsinline preload="metadata">
           <source src="${src}">
         </video>
         <span class="media-thumb__video-badge">&#9654;</span>
       </span>`
      : `<img class="media-thumb__asset" src="${src}" alt="${alt}">`;

  return `
    <button class="media-thumb ${isActive ? "is-active" : ""}" type="button"
            data-media-index="${index}" aria-label="${labels.showImage} ${index + 1}">
      ${inner}
    </button>`;
}

function renderMediaViewer(product, content, labels) {
  const mediaItems = getProductMedia(product, content.name);
  const activeMedia = mediaItems[0];

  return `
    <article class="detail-media">
      <div class="media-viewer">
        <div class="media-stage frameless-image-stage" id="media-stage">
          <button class="media-nav media-nav--prev" id="media-prev" type="button" aria-label="${labels.previous}">&lsaquo;</button>

          <div class="media-stage__inner" id="media-stage-inner">
            ${renderMainMedia(activeMedia, content.name, labels)}
          </div>

          <button class="media-nav media-nav--next" id="media-next" type="button" aria-label="${labels.next}">&rsaquo;</button>

          <span class="media-stage__expand-hint" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2.2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </span>
        </div>

        <div class="media-thumbs" id="media-thumbs">
          ${mediaItems.map((media, index) => renderThumbnail(media, index, index === 0, content.name, labels)).join("")}
        </div>
      </div>
    </article>`;
}

function renderBatterySelector(product, labels, lang) {
  if (!product.config) return "";

  return `
    <div class="battery-selector">
      <label class="battery-selector__label">${labels.batteryLabel}</label>
      <div class="battery-control">
        <button id="battery-minus" class="battery-btn" aria-label="${labels.batteryDecrease}">-</button>
        <span id="battery-count" class="battery-count">${product.config.minBatteries}</span>
        <button id="battery-plus" class="battery-btn" aria-label="${labels.batteryIncrease}">+</button>
      </div>
      <div class="battery-selector__readout">
        <p>${labels.capacity}: <strong><span id="capacity"></span> kWh</strong></p>
        <p>${labels.price}: <strong>${commerceVisibility.showPrices ? `<span id="price"></span> SEK` : getPricingComingSoonLabel(lang)}</strong></p>
      </div>
    </div>`;
}

function renderModularityCopy(product, labels) {
  if (!product.config) {
    return labels.modularityFallback;
  }

  const min = product.config.minBatteries;
  const max = product.config.maxBatteries;
  const capacity = product.config.capacityPerBattery;
  if (typeof labels.modularityConfig === "function") {
    return labels.modularityConfig({ min, max, capacity });
  }
  return `Configure from ${min} to ${max} modules at ${capacity} kWh per module. Final capacity depends on selected modules and setup.`;
}

function getDisplayPrice(product, labels, lang = "en") {
  if (!commerceVisibility.showPrices) {
    return getPricingComingSoonLabel(lang);
  }

  return product.price === "Coming soon" ? labels.comingSoon : product.price;
}

function renderLightbox(labels) {
  return `
    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="${labels.imageViewer}">
      <button class="lightbox__close" id="lightbox-close" aria-label="${labels.closeViewer}">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <button class="lightbox__nav lightbox__nav--prev" id="lightbox-prev" aria-label="${labels.previous}">&lsaquo;</button>
      <div class="lightbox__stage" id="lightbox-stage"></div>
      <button class="lightbox__nav lightbox__nav--next" id="lightbox-next" aria-label="${labels.next}">&rsaquo;</button>
      <span class="lightbox__counter" id="lightbox-counter"></span>
    </div>`;
}

function renderProductMobileNav(labels) {
  return `
    <nav class="mobile-section-nav product-mobile-nav" aria-label="${labels.navOverview}">
      <div class="mobile-section-nav__track">
        <a href="#product-overview" data-section-link="product-overview">${labels.navOverview}</a>
        <a href="#product-features" data-section-link="product-features">${labels.navFeatures}</a>
        <a href="#product-specifications" data-section-link="product-specifications">${labels.navSpecs}</a>
        <a href="#product-use-cases" data-section-link="product-use-cases">${labels.navUseCases}</a>
      </div>
    </nav>
  `;
}

export function renderProductDetailPage({ lang, slug, route }) {
  const product = getProductBySlug(slug);
  if (!product) return renderMissingProduct({ lang, route });

  const content = getProductContent(product, lang);
  const labels = getDetailCopy(lang);
  const platformUseCases = PLATFORM_USE_CASES_BY_LANG[lang] ?? PLATFORM_USE_CASES;
  const trustPoints = TRUST_POINTS_BY_LANG[lang] ?? TRUST_POINTS;
  const visibleFaq = commerceVisibility.showPrices
    ? content.faq
    : content.faq.filter((item) => !/(price|pris|SEK|kr|€)/i.test(item));

  return `
    ${renderLightbox(labels)}

    <section class="detail-hero">
      ${renderMediaViewer(product, content, labels)}

      <article class="detail-copy">
        <span class="eyebrow">${t(lang, "detailEyebrow")}</span>
        <div class="price-badge" data-commerce-price="${product.slug}">${getDisplayPrice(product, labels, lang)}</div>
        <h1>${content.name}</h1>
        <p>${content.intro}</p>

        ${renderBatterySelector(product, labels, lang)}

        <div class="detail-actions">
          ${product.buyEnabled === false
            ? `<a class="button button--primary" href="${route("views/b2b.html")}">${labels.requestAdvice}</a>
               <a class="button button--secondary" href="${route("views/products.html")}">${t(lang, "backToProducts")}</a>`
            : `<button class="button button--primary" id="add-to-cart" data-commerce-action="${product.slug}">
                ${labels.configure}
              </button>
              <a class="button button--secondary" href="${route("views/b2b.html")}">
                ${labels.requestAdvice}
              </a>`}
        </div>
      </article>
    </section>

    ${renderProductMobileNav(labels)}

    <section class="detail-section detail-platform-section" id="product-overview">
      <div class="detail-platform-grid">
        <article class="detail-platform-panel">
          <span class="eyebrow">${labels.whoFor}</span>
          <div class="detail-pill-grid">
            ${platformUseCases.map((item) => `<span class="detail-platform-pill">${item}</span>`).join("")}
          </div>
        </article>
        <article class="detail-platform-panel">
          <h2>${labels.platformFit}</h2>
          <p>${labels.platformFitBody}</p>
        </article>
      </div>
    </section>

    <section class="detail-section" id="product-capacity">
      <div class="detail-platform-grid">
        <article class="detail-platform-panel">
          <h2>${labels.modularity}</h2>
          <p>${renderModularityCopy(product, labels)}</p>
        </article>
        <article class="detail-trust-band">
          <span class="eyebrow">${labels.trustTitle}</span>
          <div class="detail-trust-points">
            ${trustPoints.map((point) => `<span>${point}</span>`).join("")}
          </div>
        </article>
      </div>
    </section>

    <section class="detail-section" id="product-features">
      <div class="info-grid">
        <article class="detail-content-panel">
          <h3>${t(lang, "detailFeatures")}</h3>
          <ul class="detail-list thin-divider-list">
            ${content.features.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
        <article class="detail-content-panel">
          <h3>${t(lang, "detailSupport")}</h3>
          <ul class="support-list thin-divider-list">
            <li>${content.summary}</li>
            <li>${getDisplayPrice(product, labels, lang)}</li>
            <li>${t(lang, "productCardStatus")}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="detail-section" id="product-specifications">
      <div class="spec-grid">
        <article class="detail-content-panel">
          <h3>${t(lang, "detailSpecifications")}</h3>
          <div class="detail-spec-table spec-table">
            ${content.specs.map((item) => `
              <div class="detail-spec-row">
                <span>${item.label}</span>
                <strong>${item.value}</strong>
              </div>`).join("")}
          </div>
        </article>
        <details class="detail-content-panel detail-disclosure" open data-mobile-disclosure>
          <summary><h3>${t(lang, "detailCertifications")}</h3></summary>
          <ul class="detail-list thin-divider-list">
            ${content.certifications.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </details>
      </div>
    </section>

    <section class="detail-section" id="product-use-cases">
      <div class="info-grid">
        <article class="detail-content-panel">
          <h3>${t(lang, "detailUseCases")}</h3>
          <ul class="detail-list thin-divider-list">
            ${content.useCases.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
        <details class="detail-content-panel detail-disclosure" open data-mobile-disclosure>
          <summary><h3>${t(lang, "detailFaq")}</h3></summary>
          <ul class="faq-list thin-divider-list">
            ${visibleFaq.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </details>
      </div>
    </section>
  `;
}

export function renderMissingProduct({ lang, route }) {
  return `
    <section class="section">
      <article class="empty-state">
        <h1>${t(lang, "missingProductTitle")}</h1>
        <p class="muted">${t(lang, "missingProductBody")}</p>
        <div class="section">
          <a class="button button--secondary" href="${route("views/products.html")}">
            ${t(lang, "backToProducts")}
          </a>
        </div>
      </article>
    </section>`;
}

function setMainStageContent(media, fallbackAlt) {
  const stage = document.getElementById("media-stage-inner");
  if (!stage) return;

  const type = media?.type ?? "image";
  const src = media?.src ?? "";
  const alt = media?.alt ?? fallbackAlt;
  const labels = getDetailCopy(document.documentElement.lang || "en");

  if (type === "video") {
    stage.innerHTML = `<video id="detail-main-media" class="media-main-asset"
                         controls playsinline preload="metadata" aria-label="${alt}">
                         <source src="${src}">${alt}</video>`;
  } else if (type === "placeholder" || !src) {
    stage.innerHTML = `<div id="detail-main-media" class="media-main-asset media-placeholder" role="img" aria-label="${alt}">
                         <span>${labels.comingSoon}</span>
                       </div>`;
  } else {
    stage.innerHTML = `<img id="detail-main-media" class="media-main-asset" src="${src}" alt="${alt}">`;
  }
}

function setLightboxContent(lbStage, media, fallbackAlt) {
  const type = media?.type ?? "image";
  const src = media?.src ?? "";
  const alt = media?.alt ?? fallbackAlt;
  const labels = getDetailCopy(document.documentElement.lang || "en");

  if (type === "video") {
    lbStage.innerHTML = `<video class="lightbox__asset" controls playsinline preload="metadata"
                           aria-label="${alt}" autoplay>
                           <source src="${src}">${alt}</video>`;
  } else if (type === "placeholder" || !src) {
    lbStage.innerHTML = `<div class="lightbox__asset media-placeholder" role="img" aria-label="${alt}">
                           <span>${labels.comingSoon}</span>
                         </div>`;
  } else {
    lbStage.innerHTML = `<img class="lightbox__asset" src="${src}" alt="${alt}">`;
  }
}

function initProductMediaViewer(product, content) {
  const mediaItems = getProductMedia(product, content.name);
  if (!mediaItems.length) return;

  currentMediaIndex = 0;
  const prevBtn = document.getElementById("media-prev");
  const nextBtn = document.getElementById("media-next");
  const thumbButtons = document.querySelectorAll(".media-thumb");
  const mainStage = document.getElementById("media-stage");

  const lightbox = document.getElementById("lightbox");
  const lbStage = document.getElementById("lightbox-stage");
  const lbClose = document.getElementById("lightbox-close");
  const lbPrev = document.getElementById("lightbox-prev");
  const lbNext = document.getElementById("lightbox-next");
  const lbCounter = document.getElementById("lightbox-counter");

  function goTo(newIndex) {
    currentMediaIndex = (newIndex + mediaItems.length) % mediaItems.length;
    setMainStageContent(mediaItems[currentMediaIndex], content.name);
    thumbButtons.forEach((button, index) => button.classList.toggle("is-active", index === currentMediaIndex));
    document.querySelector(`.media-thumb[data-media-index="${currentMediaIndex}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  prevBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    goTo(currentMediaIndex - 1);
  });

  nextBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    goTo(currentMediaIndex + 1);
  });

  thumbButtons.forEach((button) => {
    button.addEventListener("click", () => goTo(Number(button.dataset.mediaIndex)));
  });

  if (mediaItems.length <= 1) {
    [prevBtn, nextBtn].forEach((button) => button && (button.style.display = "none"));
  }

  function openLightbox(index) {
    currentMediaIndex = (index + mediaItems.length) % mediaItems.length;
    setLightboxContent(lbStage, mediaItems[currentMediaIndex], content.name);
    if (lbCounter) lbCounter.textContent = `${currentMediaIndex + 1} / ${mediaItems.length}`;
    lightbox?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox?.classList.remove("active");
    document.body.style.overflow = "";
    lbStage?.querySelectorAll("video").forEach((video) => video.pause());
  }

  function lbGoTo(newIndex) {
    currentMediaIndex = (newIndex + mediaItems.length) % mediaItems.length;
    setLightboxContent(lbStage, mediaItems[currentMediaIndex], content.name);
    if (lbCounter) lbCounter.textContent = `${currentMediaIndex + 1} / ${mediaItems.length}`;
    goTo(currentMediaIndex);
  }

  mainStage?.addEventListener("click", (event) => {
    if (event.target.closest(".media-nav")) return;
    openLightbox(currentMediaIndex);
  });

  lbClose?.addEventListener("click", closeLightbox);
  lbPrev?.addEventListener("click", () => lbGoTo(currentMediaIndex - 1));
  lbNext?.addEventListener("click", () => lbGoTo(currentMediaIndex + 1));

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  if (mediaItems.length <= 1) {
    [lbPrev, lbNext].forEach((button) => button && (button.style.display = "none"));
  }

  window.addEventListener("keydown", (event) => {
    const lightboxOpen = lightbox?.classList.contains("active");

    if (lightboxOpen) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        lbGoTo(currentMediaIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        lbGoTo(currentMediaIndex + 1);
      }
    } else {
      if (event.key === "ArrowLeft") goTo(currentMediaIndex - 1);
      if (event.key === "ArrowRight") goTo(currentMediaIndex + 1);
    }
  });
}

export function afterRenderProductDetail(product) {
  const lang = document.documentElement.lang || "en";
  const content = getProductContent(product, lang);

  initProductMediaViewer(product, content);
  bindSectionNav(document.querySelector(".product-mobile-nav"));
  if (window.matchMedia("(max-width: 640px)").matches) {
    document.querySelectorAll("[data-mobile-disclosure]").forEach((details) => {
      details.open = false;
    });
  }
  if (commerceVisibility.showPrices) {
    hydrateCommercePrice(product, lang);
  }

  const button = document.getElementById("add-to-cart");

  if (product.buyEnabled === false) {
    return;
  }

  if (product.config) {
    const minus = document.getElementById("battery-minus");
    const plus = document.getElementById("battery-plus");
    const countEl = document.getElementById("battery-count");
    const priceEl = document.getElementById("price");
    const capacityEl = document.getElementById("capacity");

    if (!minus || !plus || !countEl || !capacityEl) return;

    batteryCount = product.config.minBatteries;

    function update() {
      countEl.innerText = batteryCount;
      if (priceEl) priceEl.innerText = calculatePrice(product).toLocaleString("sv-SE");
      capacityEl.innerText = calculateCapacity(product);
    }

    minus.addEventListener("click", () => {
      if (batteryCount > product.config.minBatteries) {
        batteryCount -= 1;
        update();
      }
    });

    plus.addEventListener("click", () => {
      if (batteryCount < product.config.maxBatteries) {
        batteryCount += 1;
        update();
      }
    });

    button?.addEventListener("click", () => {
      addConfigurableToCart(product);
      window.location.href = "/views/buy-product.html";
    });

    update();
  } else {
    button?.addEventListener("click", () => {
      addSimpleToCart(product);
      window.location.href = "/views/buy-product.html";
    });
  }
}

async function hydrateCommercePrice(product, lang) {
  const priceEl = document.querySelector(`[data-commerce-price="${product.slug}"]`);
  const actionEl = document.querySelector(`[data-commerce-action="${product.slug}"]`);

  try {
    const catalog = await fetchCommerceCatalog();
    const record = getCommerceRecordForSlug(catalog, product.slug);

    if (!record) {
      if (actionEl) {
        actionEl.disabled = true;
        actionEl.textContent = lang === "sv" ? "Begär tillgänglighet" : "Request availability";
      }
      return;
    }

    const formatted = formatCommercePrice(record, lang);
    if (formatted && priceEl) {
      priceEl.textContent = formatted;
    }

    if (typeof record.price === "number") {
      if (product.config?.batteryPrice) {
        product.config.batteryPrice = record.price;
      } else {
        product.basePrice = record.price;
      }
    }
  } catch (error) {
    console.warn("[commerce] Could not hydrate product price:", error);
  }
}

function addConfigurableToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({
    cartItemId: `${product.slug}-${Date.now()}`,
    slug: product.slug,
    batteryCount,
    unitPrice: calculatePrice(product),
    capacity: calculateCapacity(product),
    quantity: 1,
    isConfigurable: true,
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addSimpleToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex((item) => item.slug === product.slug && !item.isConfigurable);

  if (index >= 0) {
    cart[index].quantity = (cart[index].quantity || 1) + 1;
  } else {
    cart.push({
      cartItemId: `${product.slug}-${Date.now()}`,
      slug: product.slug,
      batteryCount: null,
      unitPrice: product.basePrice,
      capacity: null,
      quantity: 1,
      isConfigurable: false,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
