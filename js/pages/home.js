import { renderProductDirectory } from '../components/product-directory.js';
import { getPlatformContent } from "../data/platform-content.js";
import { bindSetupEstimator, renderSetupEstimator } from "../components/setup-estimator.js";

const ICONS = ["01", "02", "03", "04"];
const BENEFIT_ICONS = ["modules", "expand", "deploy", "tool"];
const FEATURE_ICONS = ["overview", "batteryPlus", "deploy"];
const HERO_SCENARIOS = ["summerHouse", "field", "marine"];
const HERO_ROTATION_DELAY_MS = 7000;
const HERO_MANUAL_PAUSE_MS = 9000;
const HERO_COPY_SWITCH_DELAY_MS = 260;
const APP_SHOWCASE_INTERVAL_MS = 4600;
const APP_DOWNLOAD_URLS = {
  ios: "https://apps.apple.com/se/app/smart-life-smart-living/id1115101477",
  android: "https://play.google.com/store/apps/details?id=com.tuya.smartlife",
  fallback: "https://e.tuya.com/smartlife/",
};
const APP_DOWNLOAD_COPY = {
  en: {
    label: "Download the app",
    body: "Scan to get started with the Voltrix app.",
  },
  sv: {
    label: "Ladda ner appen",
    body: "Skanna för att komma igång med Voltrix-appen.",
  },
};
const APP_SHOWCASE_SLIDES = [
  {
    src: "/Picture/products/apps/voltrix_app_inuse.webp",
    width: 1528,
    height: 1029,
    kind: "photo",
    alt: {
      en: "Voltrix app shown on a phone beside an installed Voltrix system",
      sv: "Voltrix-appen på en telefon bredvid ett installerat Voltrix-system",
    },
  },
  {
    src: "/Picture/products/apps/voltrix_app_effortless.png",
    width: 318,
    height: 692,
    kind: "ui",
    alt: {
      en: "Voltrix app home screen showing effortless energy control",
      sv: "Voltrix-appens startvy för enkel energikontroll",
    },
  },
  {
    src: "/Picture/products/apps/voltrix_app_energy-efficient.png",
    width: 333,
    height: 695,
    kind: "ui",
    alt: {
      en: "Voltrix app screen showing energy-efficient usage insight",
      sv: "Voltrix-appvy med energiinsikt",
    },
  },
  {
    src: "/Picture/products/apps/voltrix_app_add.png",
    width: 1125,
    height: 2436,
    kind: "ui",
    alt: {
      en: "Voltrix app screen for adding a device",
      sv: "Voltrix-appvy för att lägga till en enhet",
    },
  },
];
let appShowcaseCleanup = null;

export function renderHomePage({ lang }) {
  const content = getPlatformContent(lang);
  const defaultScenario = content.heroScenarios.summerHouse;
  const appDownload = APP_DOWNLOAD_COPY[lang] ?? APP_DOWNLOAD_COPY.en;

  return `
    <section class="platform-hero" aria-labelledby="home-hero-title" data-platform-hero>
      <div class="platform-hero__image platform-hero__image--summer" data-hero-visual="summerHouse" aria-hidden="true"></div>
      <div class="platform-hero__field" data-hero-visual="field" aria-hidden="true">
        <span class="platform-hero__van"></span>
        <span class="platform-hero__battery platform-hero__battery--one"></span>
        <span class="platform-hero__battery platform-hero__battery--two"></span>
      </div>
      <div class="platform-hero__marine" data-hero-visual="marine" aria-hidden="true"></div>
      <div class="platform-hero__overlay" aria-hidden="true"></div>

      <div class="home-section-inner platform-hero__inner">
        <div class="platform-hero__content">
          <div class="platform-hero__copy" data-hero-copy>
            ${renderHeroHeadline(defaultScenario)}
            <p>${defaultScenario.body}</p>
          </div>

          <div class="platform-hero__benefits" data-hero-benefits>
            ${renderHeroBenefits(defaultScenario.benefits)}
          </div>

          <div class="platform-hero__actions">
            <a class="button button--primary" href="${defaultScenario.href}">${defaultScenario.cta}</a>
            <a class="button button--secondary" href="${defaultScenario.productHref}">${defaultScenario.productCta}</a>
          </div>
        </div>

        <div class="platform-hero__tabs" role="tablist" aria-label="Energy scenarios">
          ${renderHeroTab("summerHouse", content.heroScenarios.summerHouse, true)}
          ${renderHeroTab("field", content.heroScenarios.field, false)}
          ${renderHeroTab("marine", content.heroScenarios.marine, false)}
        </div>
      </div>
    </section>

    <section class="platform-home-section platform-home-section--sage platform-home-section--platform" id="platform-section" aria-labelledby="platform-title">
      <div class="home-section-inner">
        ${renderSolutionShowcase(content.platform, content.solutions, lang)}
      </div>
    </section>

    <section class="refined-section home-core-products" id="product-addons"><div class="refined-section-head"><div><span class="eyebrow">Voltrix</span><h2>${lang==='sv'?'En plattform. Din kombination.':'One platform. Your combination.'}</h2></div><a class="text-link" href="/views/products.html">${lang==='sv'?'Alla produkter':'All products'} →</a></div>${renderProductDirectory(lang,undefined,{compact:true})}</section>

    <section class="platform-home-section platform-home-section--sage platform-home-section--app" aria-labelledby="smart-title">
      <div class="home-section-inner">
        <div class="platform-smart-showcase" data-app-showcase>
          <div class="platform-smart-copy reveal">
            <span class="platform-eyebrow">${content.smartFeatures.eyebrow}</span>
            <h2 id="smart-title">${content.smartFeatures.title}</h2>
            <p>${content.smartFeatures.intro}</p>
            <ul class="platform-smart-list">
              ${content.smartFeatures.items.map((item) => `
                <li>
                  <strong>${item.title}</strong>
                  <span>${item.body}</span>
                </li>
              `).join("")}
            </ul>
          </div>

          ${renderAppShowcase(lang)}

          <a class="platform-app-download reveal" href="${APP_DOWNLOAD_URLS.fallback}" target="_blank" rel="noopener" data-app-download data-mobile-cta="${lang === "sv" ? "Ladda ner Smart Life" : "Download Smart Life"}" aria-label="${appDownload.label}">
            <img src="/Picture/products/apps/qr_code.png" alt="${appDownload.label}" width="339" height="331" loading="lazy" decoding="async">
            <div>
              <strong>${appDownload.label}</strong>
              <span>${appDownload.body}</span>
            </div>
          </a>
        </div>
      </div>
    </section>



    ${renderSetupEstimator({ context: "home" })}

    ${renderTrustContactSection(content, lang)}
  `;
}

export function bindHomePage({ lang }) {
  bindScenarioTabs(lang);
  bindSolutionDisclosure();
  bindAppShowcase();
  bindAppDownloadLink();
  bindSetupEstimator();
  initScrollReveal();
}

function renderHeroTab(key, scenario, isActive) {
  return `
    <button
      class="platform-hero__tab ${isActive ? "is-active" : ""}"
      type="button"
      role="tab"
      aria-selected="${isActive ? "true" : "false"}"
      data-scenario="${key}">
      ${scenario.label}
    </button>
  `;
}

function renderHeroBenefits(benefits) {
  return benefits.map((benefit, index) => {
    const [title, ...rest] = benefit.split(",");
    const body = rest.join(",").trim();

    return `
      <span>
        <strong>${ICONS[index]}</strong>
        <em>${title.trim()}</em>
        ${body ? `<small>${body}</small>` : ""}
      </span>
    `;
  }).join("");
}

function renderHeroHeadline(scenario) {
  const lines = Array.isArray(scenario.headlineLines) && scenario.headlineLines.length
    ? scenario.headlineLines
    : [scenario.headline];

  return `<h1 class="platform-hero__title" id="home-hero-title">${lines.map((line) => `<span>${escapeHtml(line)}</span>`).join("")}</h1>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderSolutionShowcase(platform, solutions, lang) {
  const sv = lang === "sv";
  const detailImages = {
    "summer-house": "/Picture/products/voltrix/summerhouse/summerhouse02-optimized.jpg",
    field: "/Picture/products/voltrix/field/field04-optimized.jpg",
    marine: "/Picture/products/marine/marine_field_backpack_inuse_7.webp",
  };
  return `
    <div class="scenario-directory" data-scenario-directory>
      <div class="platform-explain__copy">
        <span class="platform-eyebrow">${platform.eyebrow}</span>
        <h2 id="platform-title">${platform.title}</h2>
        <p>${platform.body}</p>
      </div>
      <div class="scenario-directory__grid">
        ${solutions.map(solution => `
          <div class="scenario-choice">
            <button class="scenario-card" type="button" id="scenario-trigger-${solution.id}"
              aria-expanded="false" aria-controls="scenario-detail-${solution.id}" data-scenario-toggle="${solution.id}">
              <span class="scenario-card__image platform-solution-tab__image--${solution.id}" aria-hidden="true"></span>
              <span class="scenario-card__copy">
                <span class="scenario-card__label">${solution.label}</span>
                <strong>${solution.title}</strong>
                <span class="scenario-card__description">${solution.body}</span>
                <span class="scenario-card__link"><span>${sv ? "Upptäck möjligheterna" : "Explore the possibilities"}</span><span class="scenario-card__toggle" aria-hidden="true">+</span></span>
              </span>
            </button>
            <section class="scenario-detail" id="scenario-detail-${solution.id}" aria-labelledby="scenario-detail-title-${solution.id}" data-scenario-detail="${solution.id}" hidden>
              <figure class="scenario-detail__media"><img src="${detailImages[solution.id]}" alt="${solution.label} — Voltrix" width="1536" height="1024" loading="lazy"></figure>
              <div class="scenario-detail__copy">
                <div class="scenario-detail__top"><span class="platform-eyebrow">${solution.detail.eyebrow}</span><button type="button" class="scenario-detail__close" data-scenario-close="${solution.id}" aria-label="${sv ? "Stäng" : "Close"} ${solution.label}">×</button></div>
                <h3 id="scenario-detail-title-${solution.id}">${solution.detail.title}</h3>
                <p>${solution.detail.body}</p>
                <ul>${solution.detail.bullets.slice(0,3).map(bullet => `<li>${bullet}</li>`).join("")}</ul>
                <a class="button button--primary" href="${solution.href}">${solution.cta}</a>
              </div>
            </section>
          </div>`).join("")}
      </div>
    </div>`;
}

function bindSolutionDisclosure() {
  const root = document.querySelector("[data-scenario-directory]");
  if (!root) return;
  const triggers = [...root.querySelectorAll("[data-scenario-toggle]")];
  const panels = [...root.querySelectorAll("[data-scenario-detail]")];
  let activeId = null;
  const motion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
  function setOpen(id, {returnFocus = false} = {}) {
    const previous = activeId;
    activeId = id;
    triggers.forEach(trigger => {
      const open = trigger.dataset.scenarioToggle === id;
      trigger.setAttribute("aria-expanded", String(open));
      trigger.querySelector(".scenario-card__toggle").textContent = open ? "−" : "+";
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.scenarioDetail !== id; });
    const trigger = triggers.find(button => button.dataset.scenarioToggle === (id || previous));
    if (returnFocus) trigger?.focus({preventScroll:true});
    if (!id && !returnFocus) return;
    requestAnimationFrame(() => {
      const target = id && window.matchMedia("(min-width:1024px)").matches
        ? panels.find(panel => panel.dataset.scenarioDetail === id) : trigger;
      target?.scrollIntoView({behavior:motion(),block:"start"});
    });
  }
  triggers.forEach(trigger => trigger.addEventListener("click", () => {
    const id = trigger.dataset.scenarioToggle;
    setOpen(activeId === id ? null : id);
  }));
  root.querySelectorAll("[data-scenario-close]").forEach(button => button.addEventListener("click", () => setOpen(null, {returnFocus:true})));
  root.addEventListener("keydown", event => {
    if (event.key === "Escape" && activeId) { event.preventDefault(); setOpen(null, {returnFocus:true}); }
  });
}

function renderAppShowcase(lang) {
  const regionLabel = lang === "sv" ? "Voltrix-appens skärmar" : "Voltrix app screens";
  const controlsLabel = lang === "sv" ? "Välj appvy" : "Choose app screen";
  const dotLabel = lang === "sv" ? "Visa appvy" : "Show app screen";

  return `
    <div class="platform-app-showcase reveal" role="region" aria-label="${regionLabel}">
      <div class="platform-app-stage">
        ${APP_SHOWCASE_SLIDES.map((slide, index) => `
          <figure class="platform-app-slide ${slide.kind ? `platform-app-slide--${slide.kind}` : ""} ${index === 0 ? "is-active" : ""}" data-app-slide="${index}" aria-hidden="${index === 0 ? "false" : "true"}">
            <div class="platform-app-slide__frame">
              <img
                src="${slide.src}"
                alt="${slide.alt[lang] ?? slide.alt.en}"
                width="${slide.width}"
                height="${slide.height}"
                loading="lazy" decoding="async">
            </div>
          </figure>
        `).join("")}
      </div>
      <div class="platform-app-controls" aria-label="${controlsLabel}">
        ${APP_SHOWCASE_SLIDES.map((_, index) => `
          <button
            class="platform-app-dot ${index === 0 ? "is-active" : ""}"
            type="button"
            aria-label="${dotLabel} ${index + 1}"
            aria-current="${index === 0 ? "true" : "false"}"
            data-app-dot="${index}">
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderAddOnsSection(addOns) {
  return `
    <section class="platform-home-section platform-home-section--milk platform-addons-section" aria-labelledby="platform-addons-title">
      <div class="home-section-inner platform-addons">
        <div class="platform-section-head platform-section-head--narrow">
          <div>
            <span class="platform-eyebrow">${addOns.eyebrow}</span>
            <h2 id="platform-addons-title">${addOns.title}</h2>
            <p>${addOns.body}</p>
          </div>
        </div>

        <div class="platform-addons__grid">
          ${addOns.items.map((item, index) => renderAddOnItem(item, index)).join("")}
        </div>

        <p class="platform-addons__note">${addOns.note}</p>
        <a class="platform-addons__all" href="/views/products/accessories/">${addOns.cta}</a>
      </div>
    </section>
  `;
}

function renderAddOnItem(item, index) {
  return `
    <a class="platform-addon reveal" href="${item.href}" style="--delay:${(index * 0.06).toFixed(2)}s">
      <figure class="platform-addon__media ${item.image ? "" : "platform-addon__media--placeholder"} ${item.imageFit === "cover" ? "platform-addon__media--cover" : ""}" aria-label="${escapeHtml(item.title)}">
        ${item.image
          ? `<img src="${item.image}" alt="${escapeHtml(item.title)}">`
          : `<span>${escapeHtml(item.title)}</span>`}
      </figure>
      <div class="platform-addon__copy">
        ${item.status ? `<span class="platform-addon__status">${item.status}</span>` : ""}
        <h3>${item.title}</h3>
        <p>${item.body}</p>
      </div>
    </a>
  `;
}

function renderTrustContactSection(content, lang) {
  return `
    <section class="platform-home-section platform-home-section--milk platform-home-section--trust-contact" aria-labelledby="final-cta-title">
      <div class="home-section-inner platform-trust-contact">
        <div class="platform-trust-contact__story">
          <div class="platform-trust-contact__intro">
            <span class="platform-eyebrow platform-eyebrow--dark platform-trust-label">${String(content.trust.eyebrow).split(/\s+/).map((word) => `<span>${escapeHtml(word)}</span>`).join(" ")}</span>
            <h2 id="trust-title">${content.trust.title}</h2>
            <p>${content.trust.body}</p>
          </div>
          <div class="platform-trust__points">
            <small class="platform-trust__scope">${lang==='sv'?'Nyckeldata för Voltrix PCS':'Key specifications for the Voltrix PCS'}</small>
            ${content.trust.points.map((point) => `
              <span>
                <strong>${point.value}</strong>
                <small>${point.label}</small>
              </span>
            `).join("")}
          </div>
        </div>

        <div class="platform-final" aria-labelledby="final-cta-title">
          <span class="platform-eyebrow platform-eyebrow--dark">${content.finalCta.eyebrow}</span>
          <h2 id="final-cta-title">${content.finalCta.title}</h2>
          <p>${content.finalCta.body}</p>
          <div class="platform-final__actions">
            <a class="button button--primary" href="/views/b2b.html">${content.finalCta.secondary}</a>
            <a class="button button--secondary" href="/views/products.html">${content.finalCta.primary}</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderIcon(name) {
  const paths = {
    modules: '<path d="M5 7.5 12 4l7 3.5-7 3.5-7-3.5Z"/><path d="m5 12 7 3.5 7-3.5"/><path d="m5 16.5 7 3.5 7-3.5"/>',
    expand: '<path d="M12 5v14"/><path d="M5 12h14"/><path d="M7 7h3V4"/><path d="M17 17h-3v3"/>',
    weather: '<path d="M12 3v3"/><path d="M12 18v3"/><path d="m5.6 5.6 2.1 2.1"/><path d="m16.3 16.3 2.1 2.1"/><path d="M3 12h3"/><path d="M18 12h3"/><circle cx="12" cy="12" r="3.5"/>',
    house: '<path d="m4 11 8-7 8 7"/><path d="M6.5 10v9h11v-9"/><path d="M10 19v-5h4v5"/>',
    field: '<path d="M4 15h16"/><path d="M6 15l2-5h7l3 5"/><path d="M8 18h.01"/><path d="M17 18h.01"/><path d="M8 10V7h5v3"/>',
    overview: '<path d="M4 5h16v14H4z"/><path d="M8 9h4"/><path d="M8 13h8"/><path d="M8 17h3"/>',
    battery: '<path d="M6 8h11a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6z"/><path d="M19 11h1v2h-1"/><path d="M9 10v4"/>',
    batteryPlus: '<path d="M5 8h11a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5z"/><path d="M18 11h1v2h-1"/><path d="M10.5 10.5v3"/><path d="M9 12h3"/>',
    deploy: '<path d="M5 12h11"/><path d="m12 8 4 4-4 4"/><path d="M5 6h5"/><path d="M5 18h5"/>',
    stack: '<path d="M7 6h10v4H7z"/><path d="M7 10h10v4H7z"/><path d="M7 14h10v4H7z"/>',
    tool: '<path d="M14.5 5.5a4 4 0 0 0 4 4L9 19l-4-4 9.5-9.5Z"/><path d="m6.5 16.5 1 1"/>',
  };

  return `
    <svg class="platform-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      ${paths[name] ?? paths.modules}
    </svg>
  `;
}

function bindAppDownloadLink() {
  const link = document.querySelector("[data-app-download]");
  if (!link) return;

  const agent = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(agent)
    || (/Macintosh/.test(agent) && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(agent);

  link.href = isIOS
    ? APP_DOWNLOAD_URLS.ios
    : isAndroid
      ? APP_DOWNLOAD_URLS.android
      : APP_DOWNLOAD_URLS.fallback;
}

function bindScenarioTabs(lang) {
  const root = document.querySelector("[data-platform-hero]");
  if (!root) return;

  const content = getPlatformContent(lang);
  const tabs = [...root.querySelectorAll("[data-scenario]")];
  const copy = root.querySelector("[data-hero-copy]");
  const benefits = root.querySelector("[data-hero-benefits]");
  let activeScenario = "summerHouse";
  let rotationTimer;
  let copyTimer;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchLastX = 0;
  let touchLastY = 0;
  let touchAxis = null;

  function handleSwipe(deltaX, deltaY) {
    if (!window.matchMedia("(max-width: 860px)").matches) return;
    if (Math.abs(deltaX) < 32 || Math.abs(deltaX) < Math.abs(deltaY) * 0.8) return;

    const currentIndex = HERO_SCENARIOS.indexOf(activeScenario);
    const nextIndex = deltaX < 0
      ? Math.min(currentIndex + 1, HERO_SCENARIOS.length - 1)
      : Math.max(currentIndex - 1, 0);
    const nextScenario = HERO_SCENARIOS[nextIndex];

    if (nextScenario && nextScenario !== activeScenario) {
      setScenario(nextScenario, { manual: true });
    }
  }

  function stopRotation() {
    clearTimeout(rotationTimer);
  }

  function scheduleRotation(delay = HERO_ROTATION_DELAY_MS) {
    stopRotation();
    if (window.matchMedia("(max-width: 860px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    rotationTimer = setTimeout(() => {
      const currentIndex = HERO_SCENARIOS.indexOf(activeScenario);
      const nextScenario = HERO_SCENARIOS[(currentIndex + 1) % HERO_SCENARIOS.length] ?? HERO_SCENARIOS[0];
      setScenario(nextScenario);
      scheduleRotation();
    }, delay);
  }

  function pauseThenResumeRotation() {
    scheduleRotation(HERO_MANUAL_PAUSE_MS);
  }

  function setScenario(key, options = {}) {
    const scenario = content.heroScenarios[key];
    if (!scenario || !copy || !benefits) return;

    if (activeScenario === key) {
      if (options.manual) {
        pauseThenResumeRotation();
      }
      return;
    }

    activeScenario = key;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.scenario === key;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    root.dataset.activeScenario = key;
    const [primary, secondary] = root.querySelectorAll('.platform-hero__actions a');
    primary.href = scenario.href;
    primary.textContent = scenario.cta;
    secondary.href = scenario.productHref;
    secondary.textContent = scenario.productCta;
    copy.classList.add("is-switching");
    benefits.classList.add("is-switching");
    clearTimeout(copyTimer);

    copyTimer = setTimeout(() => {
      copy.innerHTML = `
        ${renderHeroHeadline(scenario)}
        <p>${scenario.body}</p>
      `;
      benefits.innerHTML = renderHeroBenefits(scenario.benefits);
      copy.classList.remove("is-switching");
      benefits.classList.remove("is-switching");
    }, HERO_COPY_SWITCH_DELAY_MS);

    if (options.manual) {
      pauseThenResumeRotation();
    }
  }

  root.dataset.activeScenario = activeScenario;
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setScenario(tab.dataset.scenario, { manual: true }));
  });

  root.addEventListener("touchstart", (event) => {
    if (!window.matchMedia("(max-width: 860px)").matches) return;
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchLastX = touch.clientX;
    touchLastY = touch.clientY;
    touchAxis = null;
  }, { passive: true });

  root.addEventListener("touchmove", (event) => {
    if (!window.matchMedia("(max-width: 860px)").matches || !event.touches.length) return;
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    touchLastX = touch.clientX;
    touchLastY = touch.clientY;

    if (!touchAxis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) >= 8) {
      touchAxis = Math.abs(deltaX) >= Math.abs(deltaY) * 0.8 ? "horizontal" : "vertical";
    }

    if (touchAxis === "horizontal") {
      event.preventDefault();
    }
  }, { passive: false });

  root.addEventListener("touchend", (event) => {
    if (!window.matchMedia("(max-width: 860px)").matches) return;
    const touch = event.changedTouches[0];
    const endX = touch?.clientX ?? touchLastX;
    const endY = touch?.clientY ?? touchLastY;
    if (touchAxis === "horizontal") {
      handleSwipe(endX - touchStartX, endY - touchStartY);
    }
    touchAxis = null;
  }, { passive: true });

  root.addEventListener("touchcancel", () => {
    touchAxis = null;
  }, { passive: true });

  root.addEventListener("pointerdown", (event) => {
    if (!window.matchMedia("(max-width: 860px)").matches || event.pointerType !== "mouse") return;
    touchStartX = event.clientX;
    touchStartY = event.clientY;
  });

  root.addEventListener("pointerup", (event) => {
    if (!window.matchMedia("(max-width: 860px)").matches || event.pointerType !== "mouse") return;
    handleSwipe(event.clientX - touchStartX, event.clientY - touchStartY);
  }, { passive: true });

  scheduleRotation();
}

function bindAppShowcase() {
  const root = document.querySelector("[data-app-showcase]");
  appShowcaseCleanup?.();
  appShowcaseCleanup = null;

  if (!root) return;

  const carousel = root.querySelector(".platform-app-showcase");
  const slides = [...root.querySelectorAll("[data-app-slide]")];
  const dots = [...root.querySelectorAll("[data-app-dot]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const compactLayout = window.matchMedia("(max-width: 860px)");
  let activeIndex = 0;
  let timer = null;
  let isPaused = false;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchLastX = 0;
  let touchLastY = 0;
  let touchAxis = null;
  const cleanupHandlers = [];

  if (!carousel || !slides.length) return;

  function on(target, type, handler, options) {
    target.addEventListener(type, handler, options);
    cleanupHandlers.push(() => target.removeEventListener(type, handler, options));
  }

  function setSlide(index, options = {}) {
    const nextIndex = (index + slides.length) % slides.length;
    activeIndex = nextIndex;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === nextIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === nextIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    if (options.manual) {
      restartAutoplay();
    }
  }

  function stopAutoplay() {
    clearInterval(timer);
    timer = null;
  }

  function startAutoplay() {
    if (reducedMotion.matches || compactLayout.matches || isPaused || slides.length < 2 || timer) return;
    timer = setInterval(() => setSlide(activeIndex + 1), APP_SHOWCASE_INTERVAL_MS);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  function pause() {
    isPaused = true;
    stopAutoplay();
  }

  function resume() {
    isPaused = false;
    startAutoplay();
  }

  function handleSwipe(deltaX, deltaY) {
    if (Math.abs(deltaX) < 32 || Math.abs(deltaX) < Math.abs(deltaY) * 0.8) return;
    setSlide(activeIndex + (deltaX < 0 ? 1 : -1), { manual: true });
  }

  dots.forEach((dot) => {
    on(dot, "click", () => setSlide(Number(dot.dataset.appDot), { manual: true }));
  });

  on(carousel, "pointerenter", pause);
  on(carousel, "pointerleave", resume);
  on(carousel, "focusin", pause);
  on(carousel, "focusout", resume);

  on(carousel, "touchstart", (event) => {
    if (!compactLayout.matches || !event.touches.length) return;
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchLastX = touch.clientX;
    touchLastY = touch.clientY;
    touchAxis = null;
  }, { passive: true });

  on(carousel, "touchmove", (event) => {
    if (!compactLayout.matches || !event.touches.length) return;
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    touchLastX = touch.clientX;
    touchLastY = touch.clientY;

    if (!touchAxis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) >= 8) {
      touchAxis = Math.abs(deltaX) >= Math.abs(deltaY) * 0.8 ? "horizontal" : "vertical";
    }

    if (touchAxis === "horizontal") {
      event.preventDefault();
    }
  }, { passive: false });

  on(carousel, "touchend", (event) => {
    if (!compactLayout.matches) return;
    const touch = event.changedTouches[0];
    const endX = touch?.clientX ?? touchLastX;
    const endY = touch?.clientY ?? touchLastY;
    if (touchAxis === "horizontal") {
      handleSwipe(endX - touchStartX, endY - touchStartY);
    }
    touchAxis = null;
  }, { passive: true });

  on(carousel, "touchcancel", () => {
    touchAxis = null;
  }, { passive: true });

  on(carousel, "pointerdown", (event) => {
    if (event.pointerType !== "mouse") return;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
  }, { passive: true });

  on(carousel, "pointerup", (event) => {
    if (event.pointerType !== "mouse") return;
    handleSwipe(event.clientX - pointerStartX, event.clientY - pointerStartY);
  }, { passive: true });

  const handleReducedMotionChange = () => {
    stopAutoplay();
    startAutoplay();
  };
  on(reducedMotion, "change", handleReducedMotionChange);
  on(compactLayout, "change", handleReducedMotionChange);

  appShowcaseCleanup = () => {
    stopAutoplay();
    cleanupHandlers.forEach((cleanup) => cleanup());
    cleanupHandlers.length = 0;
  };

  startAutoplay();
}

function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

  items.forEach((item) => observer.observe(item));
}
