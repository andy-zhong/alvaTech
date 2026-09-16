import { renderSummerSolar, SUMMER_TRACKER_PLANNER, trackerEnquiry } from '../components/summer-solar.js';
import { renderFieldPackOptions, bindFieldPackOptions } from '../components/fieldpack-options.js';
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
let galleryKeyboardController;
let currentMediaSlug;

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

function getProductMedia(product, content) {
  const fallbackAlt = content.name;
  const hero = product.heroMedia ?? {
    type: "image",
    src: product.heroImage,
    alt: fallbackAlt,
  };

  const gallery = content.gallery ?? (Array.isArray(product.gallery) ? product.gallery : []);

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
  const mediaItems = getProductMedia(product, content);
  try {
    const saved = JSON.parse(sessionStorage.getItem("alva-language-gallery") || "null");
    sessionStorage.removeItem("alva-language-gallery");
    if (saved?.slug === product.slug && Number.isInteger(saved.index) && saved.index >= 0) {
      currentMediaSlug = product.slug;
      currentMediaIndex = saved.index;
    }
  } catch { /* Gallery remains usable when session storage is unavailable. */ }
  const activeIndex = currentMediaSlug === product.slug ? Math.min(currentMediaIndex, mediaItems.length - 1) : 0;
  const activeMedia = mediaItems[activeIndex];

  return `
    <article class="detail-media">
      <div class="media-viewer">
        <div class="media-stage frameless-image-stage" id="media-stage">
          <button class="media-nav media-nav--prev" id="media-prev" type="button" aria-label="${labels.previous}">&lsaquo;</button>

          <div class="media-stage__inner" id="media-stage-inner">
            ${renderMainMedia(activeMedia, content.name, labels)}
          </div>

          <button class="media-nav media-nav--next" id="media-next" type="button" aria-label="${labels.next}">&rsaquo;</button>

          <button type="button" id="media-expand" class="media-stage__expand-hint" aria-label="${document.documentElement.lang === "sv" ? "Förstora produktbild" : "Enlarge product image"}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2.2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </button>
        </div>

        <div class="media-thumbs" id="media-thumbs">
          ${mediaItems.map((media, index) => renderThumbnail(media, index, index === activeIndex, content.name, labels)).join("")}
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
  if (product.price == null) {
    return labels.requestAdvice;
  }

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

      <button class="lightbox__zoom" id="lightbox-zoom" type="button" aria-pressed="false">${document.documentElement.lang === "sv" ? "Förstora +" : "Zoom in +"}</button>
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
  const sv=lang==='sv';
  if (product.includedWith) return `<section class="detail-section included-mounting"><span class="eyebrow">Voltrix</span><h1>${sv?'Monteringen ingår.':'Mounting is included.'}</h1><p>${sv?'Nödvändig montering levereras med Voltrix och säljs inte separat.':'Required mounting comes with Voltrix and is not sold separately.'}</p><a class="button button--primary" href="/views/product.html?slug=${product.includedWith}">${sv?'Se Voltrix':'View Voltrix'}</a></section>`;
  const content=getProductContent(product,lang), labels=getDetailCopy(lang);
  const fieldpack=slug==='voltrix-fieldpack', tracker=slug==='solar-tracking-system';
  const quote='/views/b2b.html?context=product&request='+encodeURIComponent((sv?'Jag vill ha rådgivning och en offert för ':'I would like advice and a quotation for ')+content.name+'.');
  const visibleFaq=commerceVisibility.showPrices?content.faq:content.faq.filter(item=>!/(\b(?:price|pris|SEK|kr)\b|€)/i.test(item));
  return `${renderLightbox(labels)}
    <nav class="detail-breadcrumb" aria-label="${sv?'Navigering':'Breadcrumb'}"><a href="/views/products.html">${sv?'Produkter':'Products'}</a><span aria-hidden="true">/</span><span>${content.name}</span></nav>
    <section id="product-overview" class="detail-hero ${fieldpack?'detail-hero--fieldpack':''}">
      ${renderMediaViewer(product,content,labels)}
      <article class="detail-copy"><span class="eyebrow">${t(lang,'detailEyebrow')}</span><h1>${content.name}</h1><p>${content.intro}</p>
        <div class="price-badge" data-commerce-price="${slug}">${getDisplayPrice(product,labels,lang)}</div>
        ${renderBatterySelector(product,labels,lang)}
        <div class="detail-actions">${fieldpack?`<a class="button button--primary" href="#fieldpack-options">${sv?'Välj din setup':'Choose your setup'}</a>`:tracker?`<a class="button button--primary" href="${SUMMER_TRACKER_PLANNER}">${sv?'Planera med Voltrix':'Plan with Voltrix'}</a><a class="text-link" href="${trackerEnquiry(lang)}">${sv?'Begär offert för Tracker':'Request a Tracker quote'} →</a>`:product.buyEnabled===false?`<a class="button button--primary" href="${quote}">${sv?'Begär offert':'Request quote'}</a>`:`<button class="button button--primary" id="add-to-cart" data-commerce-action="${slug}">${commerceVisibility.allowCheckout?labels.configure:(sv?'Spara konfiguration':'Save configuration')}</button><a class="text-link" href="${quote}" data-product-enquiry>${labels.requestAdvice} →</a>`}</div>
      </article>
    </section>
    ${fieldpack?renderFieldPackOptions(lang):''}
    ${tracker?renderSummerSolar(lang,{compact:true}):''}
    <section class="detail-section detail-key-facts" id="product-features"><span id="product-capacity" class="anchor-alias"></span><div class="detail-facts-grid">
      <article><h2>${t(lang,'detailFeatures')}</h2><ul class="detail-list thin-divider-list">${content.features.map(item=>`<li>${item}</li>`).join('')}</ul></article>
      <article><h2>${content.included?(sv?'Detta ingår':'What is included'):(sv?'Användning & kompatibilitet':'Use & compatibility')}</h2>${content.included?`<ul class="detail-list thin-divider-list">${content.included.map(item=>`<li>${item}</li>`).join('')}</ul>`:`<ul class="detail-list thin-divider-list">${content.useCases.map(item=>`<li>${item}</li>`).join('')}</ul>`}${content.platformFit?`<p>${content.platformFit}</p>`:''}${content.modularity?`<p>${content.modularity}</p>`:product.config?`<p>${renderModularityCopy(product,labels)}</p>`:''}</article>
    </div></section>
    <section class="detail-section detail-reference">
      <details class="detail-disclosure" id="product-specifications" open data-mobile-disclosure><summary><h2>${t(lang,'detailSpecifications')}</h2></summary><div class="detail-spec-table spec-table">${content.specs.map(item=>`<div class="detail-spec-row"><span>${item.label}</span><strong>${item.value}</strong></div>`).join('')}</div></details>
      ${content.certifications.length?`<details class="detail-disclosure"><summary><h2>${t(lang,'detailCertifications')}</h2></summary><ul class="detail-list">${content.certifications.map(item=>`<li>${item}</li>`).join('')}</ul></details>`:''}
      <details class="detail-disclosure" id="product-use-cases"><summary><h2>${t(lang,'detailFaq')}</h2></summary><ul class="faq-list thin-divider-list">${visibleFaq.map(item=>`<li>${item}</li>`).join('')}</ul></details>
      <a class="text-link" href="/views/support.html">${sv?'Hjälp & support':'Help & support'} →</a>
    </section>`;
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

  lbStage.classList.remove("is-zoomed");
  const zoomButton = document.getElementById("lightbox-zoom");
  if (zoomButton) {
    zoomButton.hidden = type !== "image" || !src;
    zoomButton.setAttribute("aria-pressed", "false");
    zoomButton.textContent = document.documentElement.lang === "sv" ? "Förstora +" : "Zoom in +";
  }
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
  galleryKeyboardController?.abort();
  galleryKeyboardController = new AbortController();
  const mediaItems = getProductMedia(product, content);
  if (!mediaItems.length) return;

  currentMediaIndex = currentMediaSlug === product.slug ? Math.min(currentMediaIndex, mediaItems.length - 1) : 0;
  currentMediaSlug = product.slug;
  const prevBtn = document.getElementById("media-prev");
  const nextBtn = document.getElementById("media-next");
  const thumbButtons = document.querySelectorAll(".media-thumb");
  const mainStage = document.getElementById("media-stage");
  const expandButton = document.getElementById("media-expand");
  window.addEventListener("alva:before-language-change", () => {
    try { sessionStorage.setItem("alva-language-gallery", JSON.stringify({slug: product.slug, index: currentMediaIndex})); } catch { /* Optional continuity only. */ }
  }, { signal: galleryKeyboardController.signal });

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
    lbClose?.focus();
  }

  function closeLightbox() {
    lightbox?.classList.remove("active");
    document.body.style.overflow = "";
    lbStage?.querySelectorAll("video").forEach((video) => video.pause());
    expandButton?.focus();
  }

  function lbGoTo(newIndex) {
    currentMediaIndex = (newIndex + mediaItems.length) % mediaItems.length;
    setLightboxContent(lbStage, mediaItems[currentMediaIndex], content.name);
    if (lbCounter) lbCounter.textContent = `${currentMediaIndex + 1} / ${mediaItems.length}`;
    goTo(currentMediaIndex);
  }

  mainStage?.addEventListener("click", (event) => {
    if (event.target.closest(".media-nav, video")) return;
    openLightbox(currentMediaIndex);
  });

  const lbZoom = document.getElementById("lightbox-zoom");
  lbZoom?.addEventListener("click", () => {
    const zoomed = lbStage.classList.toggle("is-zoomed");
    lbZoom.setAttribute("aria-pressed", String(zoomed));
    lbZoom.textContent = document.documentElement.lang === "sv" ? (zoomed ? "Visa hela bilden −" : "Förstora +") : (zoomed ? "Fit image −" : "Zoom in +");
    lbStage.scrollTo({left:0,top:0});
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
      if (event.key === "Tab") {
        const controls = [...lightbox.querySelectorAll("button")].filter(button => button.offsetParent !== null);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
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
      if (event.target.closest?.(".media-viewer")) {
        if (event.key === "ArrowLeft") { event.preventDefault(); goTo(currentMediaIndex - 1); }
        if (event.key === "ArrowRight") { event.preventDefault(); goTo(currentMediaIndex + 1); }
      }
    }
  }, { signal: galleryKeyboardController.signal });
}

export function afterRenderProductDetail(product) {
  if (product.includedWith) return;
  const lang = document.documentElement.lang || "en";
  const content = getProductContent(product, lang);

  initProductMediaViewer(product, content);
  bindFieldPackOptions(lang);
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
      const enquiry=document.querySelector("[data-product-enquiry]");
      if(enquiry) enquiry.href="/views/b2b.html?context=product&request="+encodeURIComponent(`${content.name}: ${batteryCount} Battery Packs, ${calculateCapacity(product)} kWh. ${lang==='sv'?'Jag vill ha rådgivning och en offert.':'I would like advice and a quotation.'}`);
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
