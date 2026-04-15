import { getProductBySlug, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";

let batteryCount = 1;
let currentMediaIndex = 0;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

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
  return [hero, ...gallery].filter((item) => item?.src);
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML render helpers
// ─────────────────────────────────────────────────────────────────────────────

function renderMainMedia(media, fallbackAlt) {
  const type = media?.type ?? "image";
  const src  = media?.src  ?? "";
  const alt  = media?.alt  ?? fallbackAlt;

  if (type === "video") {
    return `<video id="detail-main-media" class="media-main-asset"
              controls playsinline preload="metadata" aria-label="${alt}">
              <source src="${src}">${alt}</video>`;
  }
  return `<img id="detail-main-media" class="media-main-asset" src="${src}" alt="${alt}">`;
}

function renderThumbnail(media, index, isActive, fallbackAlt) {
  const type = media?.type ?? "image";
  const src  = media?.src  ?? "";
  const alt  = media?.alt  ?? `${fallbackAlt} ${index + 1}`;

  const inner = type === "video"
    ? `<span class="media-thumb__video-wrap">
         <video class="media-thumb__asset" muted playsinline preload="metadata">
           <source src="${src}">
         </video>
         <span class="media-thumb__video-badge">▶</span>
       </span>`
    : `<img class="media-thumb__asset" src="${src}" alt="${alt}">`;

  return `
    <button class="media-thumb ${isActive ? "is-active" : ""}" type="button"
            data-media-index="${index}" aria-label="Show image ${index + 1}">
      ${inner}
    </button>`;
}

function renderMediaViewer(product, content) {
  const mediaItems  = getProductMedia(product, content.name);
  const activeMedia = mediaItems[0];

  return `
    <article class="detail-media">
      <div class="media-viewer">

        <div class="media-stage" id="media-stage">
          <button class="media-nav media-nav--prev" id="media-prev" type="button" aria-label="Previous">‹</button>

          <div class="media-stage__inner" id="media-stage-inner">
            ${renderMainMedia(activeMedia, content.name)}
          </div>

          <button class="media-nav media-nav--next" id="media-next" type="button" aria-label="Next">›</button>

          <span class="media-stage__expand-hint" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2.2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </span>
        </div>

        <div class="media-thumbs" id="media-thumbs">
          ${mediaItems.map((m, i) => renderThumbnail(m, i, i === 0, content.name)).join("")}
        </div>

      </div>
    </article>`;
}

function renderBatterySelector(product) {
  if (!product.config) return "";

  return `
    <div class="battery-selector">
      <label class="battery-selector__label">Number of battery modules</label>
      <div class="battery-control">
        <button id="battery-minus" class="battery-btn" aria-label="Remove one battery">−</button>
        <span id="battery-count" class="battery-count">${product.config.minBatteries}</span>
        <button id="battery-plus" class="battery-btn" aria-label="Add one battery">+</button>
      </div>
      <div class="battery-selector__readout">
        <p>Capacity: <strong><span id="capacity"></span> kWh</strong></p>
        <p>Price: <strong><span id="price"></span> SEK</strong></p>
      </div>
    </div>`;
}

// Lightbox HTML — injected once at top of render output
function renderLightbox() {
  return `
    <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
      <button class="lightbox__close" id="lightbox-close" aria-label="Close">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <button class="lightbox__nav lightbox__nav--prev" id="lightbox-prev" aria-label="Previous">‹</button>

      <div class="lightbox__stage" id="lightbox-stage"></div>

      <button class="lightbox__nav lightbox__nav--next" id="lightbox-next" aria-label="Next">›</button>

      <span class="lightbox__counter" id="lightbox-counter"></span>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page render  (gallery section removed — thumbs above serve the same purpose)
// ─────────────────────────────────────────────────────────────────────────────

export function renderProductDetailPage({ lang, slug, route }) {
  const product = getProductBySlug(slug);
  if (!product) return renderMissingProduct({ lang, route });

  const content = getProductContent(product, lang);

  return `
    ${renderLightbox()}

    <section class="detail-hero">
      ${renderMediaViewer(product, content)}

      <article class="detail-copy">
        <span class="eyebrow">${t(lang, "detailEyebrow")}</span>
        <div class="price-badge">${product.price}</div>
        <h1>${content.name}</h1>
        <p>${content.intro}</p>

        ${renderBatterySelector(product)}

        <div class="detail-actions">
          <button class="button button--primary" id="add-to-cart">
            ${t(lang, "detailBuy")}
          </button>
          <a class="button button--secondary" href="${route("views/products.html")}">
            ${t(lang, "detailBack")}
          </a>
        </div>
      </article>
    </section>

    <section class="section">
      <div class="info-grid">
        <article class="panel">
          <h3>${t(lang, "detailFeatures")}</h3>
          <ul class="detail-list">
            ${content.features.map((i) => `<li>${i}</li>`).join("")}
          </ul>
        </article>
        <article class="panel">
          <h3>${t(lang, "detailSupport")}</h3>
          <ul class="support-list">
            <li>${content.summary}</li>
            <li>${product.price}</li>
            <li>${t(lang, "productCardStatus")}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="spec-grid">
        <article class="panel">
          <h3>${t(lang, "detailSpecifications")}</h3>
          <div class="spec-grid">
            ${content.specs.map((i) => `
              <article class="spec-card">
                <h3>${i.label}</h3>
                <p>${i.value}</p>
              </article>`).join("")}
          </div>
        </article>
        <article class="panel">
          <h3>${t(lang, "detailCertifications")}</h3>
          <ul class="detail-list">
            ${content.certifications.map((i) => `<li>${i}</li>`).join("")}
          </ul>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="info-grid">
        <article class="panel">
          <h3>${t(lang, "detailUseCases")}</h3>
          <ul class="detail-list">
            ${content.useCases.map((i) => `<li>${i}</li>`).join("")}
          </ul>
        </article>
        <article class="panel">
          <h3>${t(lang, "detailFaq")}</h3>
          <ul class="faq-list">
            ${content.faq.map((i) => `<li>${i}</li>`).join("")}
          </ul>
        </article>
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

// ─────────────────────────────────────────────────────────────────────────────
// Media viewer + lightbox logic
// ─────────────────────────────────────────────────────────────────────────────

function setMainStageContent(media, fallbackAlt) {
  const stage = document.getElementById("media-stage-inner");
  if (!stage) return;

  const type = media?.type ?? "image";
  const src  = media?.src  ?? "";
  const alt  = media?.alt  ?? fallbackAlt;

  if (type === "video") {
    stage.innerHTML = `<video id="detail-main-media" class="media-main-asset"
                         controls playsinline preload="metadata" aria-label="${alt}">
                         <source src="${src}">${alt}</video>`;
  } else {
    stage.innerHTML = `<img id="detail-main-media" class="media-main-asset" src="${src}" alt="${alt}">`;
  }
}

function setLightboxContent(lbStage, media, fallbackAlt) {
  const type = media?.type ?? "image";
  const src  = media?.src  ?? "";
  const alt  = media?.alt  ?? fallbackAlt;

  if (type === "video") {
    lbStage.innerHTML = `<video class="lightbox__asset" controls playsinline preload="metadata"
                           aria-label="${alt}" autoplay>
                           <source src="${src}">${alt}</video>`;
  } else {
    lbStage.innerHTML = `<img class="lightbox__asset" src="${src}" alt="${alt}">`;
  }
}

function initProductMediaViewer(product, content) {
  const mediaItems   = getProductMedia(product, content.name);
  if (!mediaItems.length) return;

  currentMediaIndex  = 0;
  const stageInner   = document.getElementById("media-stage-inner");
  const prevBtn      = document.getElementById("media-prev");
  const nextBtn      = document.getElementById("media-next");
  const thumbButtons = document.querySelectorAll(".media-thumb");
  const mainStage    = document.getElementById("media-stage");

  const lightbox  = document.getElementById("lightbox");
  const lbStage   = document.getElementById("lightbox-stage");
  const lbClose   = document.getElementById("lightbox-close");
  const lbPrev    = document.getElementById("lightbox-prev");
  const lbNext    = document.getElementById("lightbox-next");
  const lbCounter = document.getElementById("lightbox-counter");

  // ── Viewer navigation ─────────────────────────────────────────────────
  function goTo(newIndex) {
    currentMediaIndex = (newIndex + mediaItems.length) % mediaItems.length;
    setMainStageContent(mediaItems[currentMediaIndex], content.name);
    thumbButtons.forEach((btn, i) => btn.classList.toggle("is-active", i === currentMediaIndex));
    document.querySelector(`.media-thumb[data-media-index="${currentMediaIndex}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  prevBtn?.addEventListener("click", (e) => { e.stopPropagation(); goTo(currentMediaIndex - 1); });
  nextBtn?.addEventListener("click", (e) => { e.stopPropagation(); goTo(currentMediaIndex + 1); });
  thumbButtons.forEach((btn) => btn.addEventListener("click", () => goTo(Number(btn.dataset.mediaIndex))));

  // Hide nav if only one item
  if (mediaItems.length <= 1) {
    [prevBtn, nextBtn].forEach((b) => b && (b.style.display = "none"));
  }

  // ── Lightbox ──────────────────────────────────────────────────────────
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
    lbStage?.querySelectorAll("video").forEach((v) => v.pause());
  }

  function lbGoTo(newIndex) {
    currentMediaIndex = (newIndex + mediaItems.length) % mediaItems.length;
    setLightboxContent(lbStage, mediaItems[currentMediaIndex], content.name);
    if (lbCounter) lbCounter.textContent = `${currentMediaIndex + 1} / ${mediaItems.length}`;
    goTo(currentMediaIndex); // keep main viewer in sync
  }

  // Clicking anywhere on the stage (not nav buttons) → open lightbox
  mainStage?.addEventListener("click", (e) => {
    if (e.target.closest(".media-nav")) return;
    openLightbox(currentMediaIndex);
  });

  lbClose?.addEventListener("click", closeLightbox);
  lbPrev?.addEventListener("click",  () => lbGoTo(currentMediaIndex - 1));
  lbNext?.addEventListener("click",  () => lbGoTo(currentMediaIndex + 1));

  // Click backdrop (not stage content) → close
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Hide lightbox nav if only one item
  if (mediaItems.length <= 1) {
    [lbPrev, lbNext].forEach((b) => b && (b.style.display = "none"));
  }

  // ── Keyboard ──────────────────────────────────────────────────────────
  window.addEventListener("keydown", (e) => {
    const lbOpen = lightbox?.classList.contains("active");

    if (lbOpen) {
      if (e.key === "Escape")     { e.preventDefault(); closeLightbox(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); lbGoTo(currentMediaIndex - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); lbGoTo(currentMediaIndex + 1); }
    } else {
      if (e.key === "ArrowLeft")  goTo(currentMediaIndex - 1);
      if (e.key === "ArrowRight") goTo(currentMediaIndex + 1);
    }
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// After render — called by bootstrap
// ─────────────────────────────────────────────────────────────────────────────

export function afterRenderProductDetail(product) {
  const lang    = document.documentElement.lang || "en";
  const content = getProductContent(product, lang);

  initProductMediaViewer(product, content);

  const btn = document.getElementById("add-to-cart");

  if (product.config) {
    const minus      = document.getElementById("battery-minus");
    const plus       = document.getElementById("battery-plus");
    const countEl    = document.getElementById("battery-count");
    const priceEl    = document.getElementById("price");
    const capacityEl = document.getElementById("capacity");

    if (!minus || !plus || !countEl || !priceEl || !capacityEl) return;

    batteryCount = product.config.minBatteries;

    function update() {
      countEl.innerText    = batteryCount;
      priceEl.innerText    = calculatePrice(product).toLocaleString("sv-SE");
      capacityEl.innerText = calculateCapacity(product);
    }

    minus.addEventListener("click", () => { if (batteryCount > product.config.minBatteries) { batteryCount--; update(); } });
    plus.addEventListener("click",  () => { if (batteryCount < product.config.maxBatteries) { batteryCount++; update(); } });

    btn?.addEventListener("click", () => { addConfigurableToCart(product); window.location.href = "/views/buy-product.html"; });

    update();
  } else {
    btn?.addEventListener("click", () => { addSimpleToCart(product); window.location.href = "/views/buy-product.html"; });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Cart helpers
// ─────────────────────────────────────────────────────────────────────────────

function addConfigurableToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({
    cartItemId:    `${product.slug}-${Date.now()}`,
    slug:          product.slug,
    batteryCount,
    unitPrice:     calculatePrice(product),
    capacity:      calculateCapacity(product),
    quantity:      1,
    isConfigurable: true,
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addSimpleToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const idx  = cart.findIndex((i) => i.slug === product.slug && !i.isConfigurable);

  if (idx >= 0) {
    cart[idx].quantity = (cart[idx].quantity || 1) + 1;
  } else {
    cart.push({
      cartItemId:    `${product.slug}-${Date.now()}`,
      slug:          product.slug,
      batteryCount:  null,
      unitPrice:     product.basePrice,
      capacity:      null,
      quantity:      1,
      isConfigurable: false,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}