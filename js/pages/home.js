import { getPlatformContent } from "../data/platform-content.js";
import { bindSetupEstimator, renderSetupEstimator } from "../components/setup-estimator.js";

const ICONS = ["01", "02", "03", "04"];
const BENEFIT_ICONS = ["modules", "expand", "deploy", "tool"];
const FEATURE_ICONS = ["overview", "batteryPlus", "deploy"];
const HERO_SCENARIOS = ["summerHouse", "field"];
const HERO_ROTATION_DELAY_MS = 7000;
const HERO_MANUAL_PAUSE_MS = 9000;
const HERO_COPY_SWITCH_DELAY_MS = 260;
const APP_SHOWCASE_INTERVAL_MS = 4600;
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
    src: "/Picture/products/apps/voltrix_app_effortless.png",
    width: 318,
    height: 692,
    alt: {
      en: "Voltrix app home screen showing effortless energy control",
      sv: "Voltrix-appens startvy för enkel energikontroll",
    },
  },
  {
    src: "/Picture/products/apps/voltrix_app_energy-efficient.png",
    width: 333,
    height: 695,
    alt: {
      en: "Voltrix app screen showing energy-efficient usage insight",
      sv: "Voltrix-appvy med energiinsikt",
    },
  },
  {
    src: "/Picture/products/apps/voltrix_app_add.png",
    width: 1125,
    height: 2436,
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
            <a class="button button--primary" href="/views/products.html">${content.heroCtas.primary}</a>
            <a class="button button--secondary" href="#platform-section">${content.heroCtas.secondary}</a>
          </div>
        </div>

        <div class="platform-hero__tabs" role="tablist" aria-label="Energy scenarios">
          ${renderHeroTab("summerHouse", content.heroScenarios.summerHouse, true)}
          ${renderHeroTab("field", content.heroScenarios.field, false)}
        </div>
      </div>
    </section>

    <section class="platform-home-section platform-home-section--milk">
      <div class="home-section-inner">
        <div class="platform-benefit-grid">
          ${content.benefits.map((item, index) => `
            <article class="platform-benefit-card reveal" style="--delay:${(index * 0.08).toFixed(2)}s">
              <div class="platform-benefit-card__meta">
                ${renderIcon(BENEFIT_ICONS[index])}
                <span>${ICONS[index]}</span>
              </div>
              <div class="platform-benefit-card__body">
                <h2>${item.title}</h2>
                <p>${item.body}</p>
              </div>
              ${item.label ? `<small class="platform-benefit-card__tag">${item.label}</small>` : ""}
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="platform-home-section platform-home-section--sage" id="platform-section" aria-labelledby="platform-title">
      <div class="home-section-inner">
        ${renderSolutionShowcase(content.platform, content.solutions)}
      </div>
    </section>

    ${renderAddOnsSection(content.addOns)}

    ${renderSetupEstimator({ context: "home" })}

    <section class="platform-home-section platform-home-section--sage" aria-labelledby="product-fit-title">
      <div class="home-section-inner platform-product-area platform-product-area--featured">
        <div class="platform-section-head">
          <div>
            <span class="platform-eyebrow">${content.productFit.eyebrow}</span>
            <h2 id="product-fit-title">${content.productFit.title}</h2>
            <p>${content.productFit.body}</p>
          </div>
          <div class="platform-section-actions">
            <a class="button button--primary" href="/views/product.html?slug=voltrix-5-pack-kit">${content.productFit.primary}</a>
            <a class="button button--secondary" href="/views/products.html">${content.productFit.secondary}</a>
          </div>
        </div>

        <div class="platform-product-feature reveal">
          <figure class="platform-product-feature__media frameless-image-stage">
            <img src="/Picture/products/voltrix/voltrix02.png" alt="Voltrix 5-Pack Kit">
          </figure>
          <div class="platform-product-feature__copy">
            <span class="platform-product-feature__label">${content.productFit.label ?? "Fixed 5 kWh starting setup"}</span>
            <p>${content.productFit.note ?? content.productTierNote}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="platform-home-section platform-home-section--milk" aria-labelledby="smart-title">
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

          <aside class="platform-app-download reveal" aria-label="${appDownload.label}">
            <img src="/Picture/products/apps/qr_code.png" alt="${appDownload.label}" width="339" height="331" loading="lazy">
            <div>
              <strong>${appDownload.label}</strong>
              <span>${appDownload.body}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="platform-home-section platform-home-section--sage platform-home-section--trust" aria-labelledby="trust-title">
      <div class="home-section-inner platform-trust">
        <div>
          <span class="platform-eyebrow platform-eyebrow--dark">${content.trust.eyebrow}</span>
          <h2 id="trust-title">${content.trust.title}</h2>
          <p>${content.trust.body}</p>
        </div>
        <div class="platform-trust__points">
          ${content.trust.points.map((point) => `<span>${point}</span>`).join("")}
        </div>
      </div>
    </section>

    <section class="platform-home-section platform-home-section--milk platform-home-section--final" aria-labelledby="final-cta-title">
      <div class="home-section-inner platform-final">
        <span class="platform-eyebrow">${content.finalCta.eyebrow}</span>
        <h2 id="final-cta-title">${content.finalCta.title}</h2>
        <p>${content.finalCta.body}</p>
        <div class="platform-final__actions">
          <a class="button button--primary" href="/views/products.html">${content.finalCta.primary}</a>
          <a class="button button--secondary" href="/views/b2b.html">${content.finalCta.secondary}</a>
        </div>
      </div>
    </section>
  `;
}

export function bindHomePage({ lang }) {
  bindScenarioTabs(lang);
  bindSolutionShowcase();
  bindAppShowcase();
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

function renderSolutionShowcase(platform, solutions) {
  return `
    <div class="platform-solution-showcase reveal" data-solution-showcase>
      <div class="platform-solution-layout">
        <div class="platform-explain__copy">
          <span class="platform-eyebrow">${platform.eyebrow}</span>
          <h2 id="platform-title">${platform.title}</h2>
          <p>${platform.body}</p>
        </div>

        <div class="platform-solution-stage">
          <div class="platform-solution-mobile-indicator" role="tablist" aria-label="${platform.eyebrow}">
            ${solutions.map((solution, index) => renderSolutionMobileIndicator(solution, index)).join("")}
          </div>

          <div class="platform-solution-tabs" data-solution-viewport>
            ${solutions.map((solution, index) => renderSolutionSlide(solution, index)).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAppShowcase(lang) {
  const regionLabel = lang === "sv" ? "Voltrix-appens skärmar" : "Voltrix app screens";
  const controlsLabel = lang === "sv" ? "Välj appvy" : "Choose app screen";
  const dotLabel = lang === "sv" ? "Visa appvy" : "Show app screen";

  return `
    <div class="platform-app-showcase reveal" role="region" aria-label="${regionLabel}">
      <div class="platform-app-stage">
        ${APP_SHOWCASE_SLIDES.map((slide, index) => `
          <figure class="platform-app-slide ${index === 0 ? "is-active" : ""}" data-app-slide="${index}" aria-hidden="${index === 0 ? "false" : "true"}">
            <img
              src="${slide.src}"
              alt="${slide.alt[lang] ?? slide.alt.en}"
              width="${slide.width}"
              height="${slide.height}"
              ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>
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
      </div>
    </section>
  `;
}

function renderAddOnItem(item, index) {
  return `
    <article class="platform-addon reveal" style="--delay:${(index * 0.06).toFixed(2)}s">
      <figure class="platform-addon__media ${item.image ? "" : "platform-addon__media--placeholder"}" aria-label="${escapeHtml(item.title)}">
        ${item.image
          ? `<img src="${item.image}" alt="${escapeHtml(item.title)}">`
          : `<span>${escapeHtml(item.title)}</span>`}
      </figure>
      <div class="platform-addon__copy">
        <h3>${item.title}</h3>
        <p>${item.body}</p>
      </div>
    </article>
  `;
}

function renderSolutionMobileIndicator(solution, index) {
  const isActive = index === 0;

  return `
    <button
      class="platform-solution-mobile-indicator__button ${isActive ? "is-active" : ""}"
      type="button"
      role="tab"
      aria-selected="${isActive ? "true" : "false"}"
      aria-controls="solution-panel-${solution.id}"
      id="solution-tab-${solution.id}"
      tabindex="${isActive ? "0" : "-1"}"
      data-solution-indicator="${solution.id}">
      ${solution.label}
    </button>
  `;
}

function renderSolutionSlide(solution, index) {
  return `
    <article
      class="platform-solution-slide ${index === 0 ? "is-active" : ""}"
      id="solution-panel-${solution.id}"
      role="tabpanel"
      aria-labelledby="solution-tab-${solution.id}"
      aria-hidden="${index === 0 ? "false" : "true"}"
      data-solution-slide="${solution.id}"
      ${index === 0 ? "" : "inert"}>
      ${renderSolutionTab(solution)}
    </article>
  `;
}

function renderSolutionTab(solution) {
  const visualClass = `platform-solution-tab__image--${solution.id}`;

  return `
    <div class="platform-solution-tab">
      <span class="platform-solution-tab__image ${visualClass}" aria-hidden="true"></span>
      <span class="platform-solution-tab__copy">
        <strong>${solution.title}</strong>
        <span>${solution.body}</span>
        <a class="platform-solution-tab__cta" href="${solution.href}">${solution.cta ?? "Explore solution"} <b aria-hidden="true">&rarr;</b></a>
      </span>
    </div>
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

  function handleSwipe(deltaX, deltaY) {
    if (!window.matchMedia("(max-width: 860px)").matches) return;
    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;

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
  }, { passive: true });

  root.addEventListener("touchend", (event) => {
    if (!window.matchMedia("(max-width: 860px)").matches) return;
    const touch = event.changedTouches[0];
    handleSwipe(touch.clientX - touchStartX, touch.clientY - touchStartY);
  }, { passive: true });

  root.addEventListener("pointerdown", (event) => {
    if (!window.matchMedia("(max-width: 860px)").matches) return;
    touchStartX = event.clientX;
    touchStartY = event.clientY;
  });

  root.addEventListener("pointerup", (event) => {
    if (!window.matchMedia("(max-width: 860px)").matches) return;
    handleSwipe(event.clientX - touchStartX, event.clientY - touchStartY);
  }, { passive: true });

  scheduleRotation();
}

function bindSolutionShowcase() {
  const root = document.querySelector("[data-solution-showcase]");
  if (!root) return;

  const indicators = [...root.querySelectorAll("[data-solution-indicator]")];
  const slides = [...root.querySelectorAll("[data-solution-slide]")];
  const viewport = root.querySelector("[data-solution-viewport]");
  const desktopQuery = window.matchMedia("(min-width: 861px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let scrollFrame = 0;
  let autoplayTimer = null;
  let isInView = false;
  let hasManualSelection = false;

  function stopAutoplay() {
    window.clearTimeout(autoplayTimer);
    autoplayTimer = null;
  }

  function canAutoplay() {
    return desktopQuery.matches
      && !reducedMotion.matches
      && !hasManualSelection
      && isInView
      && !document.hidden
      && !root.matches(":hover")
      && !root.contains(document.activeElement)
      && slides.length > 1;
  }

  function scheduleAutoplay() {
    stopAutoplay();
    if (!canAutoplay()) return;

    autoplayTimer = window.setTimeout(() => {
      scrollToSolution((activeIndex + 1) % slides.length);
      scheduleAutoplay();
    }, 8000);
  }

  function selectManually(nextIndex, options = {}) {
    hasManualSelection = true;
    stopAutoplay();
    scrollToSolution(nextIndex, options);
  }

  function syncSolution(nextIndex, { focus = false } = {}) {
    const normalizedIndex = Math.max(0, Math.min(nextIndex, slides.length - 1));
    activeIndex = normalizedIndex;

    slides.forEach((slide, index) => {
      const isActive = index === normalizedIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.toggleAttribute("inert", !isActive);
    });

    indicators.forEach((indicator, index) => {
      const isActive = index === normalizedIndex;
      indicator.classList.toggle("is-active", isActive);
      indicator.setAttribute("aria-selected", String(isActive));
      indicator.tabIndex = isActive ? 0 : -1;
    });

    if (focus) indicators[normalizedIndex]?.focus();
  }

  function scrollToSolution(nextIndex, { focus = false } = {}) {
    const normalizedIndex = Math.max(0, Math.min(nextIndex, slides.length - 1));
    const slide = slides[normalizedIndex];
    if (!viewport || !slide) return;

    syncSolution(normalizedIndex, { focus });
    viewport.scrollTo({
      left: slide.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  function getNearestSlideIndex() {
    if (!viewport || !slides.length) return 0;
    const viewportLeft = viewport.getBoundingClientRect().left;
    return slides.reduce((nearest, slide, index) => {
      const distance = Math.abs(slide.getBoundingClientRect().left - viewportLeft);
      return distance < nearest.distance ? { index, distance } : nearest;
    }, { index: 0, distance: Infinity }).index;
  }

  function updateSceneMotion() {
    if (!viewport) return;
    const viewportLeft = viewport.getBoundingClientRect().left;
    const viewportWidth = Math.max(viewport.clientWidth, 1);

    slides.forEach((slide) => {
      const distance = Math.min(Math.abs(slide.getBoundingClientRect().left - viewportLeft) / viewportWidth, 1);
      slide.style.setProperty("--scene-opacity", String(1 - distance * 0.12));
      slide.style.setProperty("--scene-scale", String(1 - distance * 0.012));
    });
  }

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => selectManually(index));
    indicator.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const nextIndex = event.key === "Home"
        ? 0
        : event.key === "End"
          ? indicators.length - 1
          : activeIndex + (event.key === "ArrowRight" ? 1 : -1);
      selectManually(nextIndex, { focus: true });
    });
  });

  viewport?.addEventListener("scroll", () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => {
      updateSceneMotion();
      syncSolution(getNearestSlideIndex());
    });
  }, { passive: true });

  root.addEventListener("pointerenter", stopAutoplay);
  root.addEventListener("pointerleave", scheduleAutoplay);
  root.addEventListener("focusin", stopAutoplay);
  root.addEventListener("focusout", () => window.setTimeout(scheduleAutoplay, 0));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else scheduleAutoplay();
  });

  const visibilityObserver = new IntersectionObserver((entries) => {
    isInView = entries[0]?.isIntersecting ?? false;
    if (isInView) scheduleAutoplay();
    else stopAutoplay();
  }, { threshold: 0.35 });
  visibilityObserver.observe(root);

  reducedMotion.addEventListener("change", scheduleAutoplay);
  desktopQuery.addEventListener("change", scheduleAutoplay);

  window.addEventListener("resize", () => {
    viewport?.scrollTo({ left: slides[activeIndex]?.offsetLeft ?? 0, behavior: "auto" });
  }, { passive: true });

  syncSolution(0);
  updateSceneMotion();
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
  let activeIndex = 0;
  let timer = null;
  let isPaused = false;
  let pointerStartX = 0;
  let pointerStartY = 0;
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
    if (reducedMotion.matches || isPaused || slides.length < 2 || timer) return;
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
    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY) * 1.4) return;
    setSlide(activeIndex + (deltaX < 0 ? 1 : -1), { manual: true });
  }

  dots.forEach((dot) => {
    on(dot, "click", () => setSlide(Number(dot.dataset.appDot), { manual: true }));
  });

  on(carousel, "pointerenter", pause);
  on(carousel, "pointerleave", resume);
  on(carousel, "focusin", pause);
  on(carousel, "focusout", resume);

  on(carousel, "pointerdown", (event) => {
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
  }, { passive: true });

  on(carousel, "pointerup", (event) => {
    handleSwipe(event.clientX - pointerStartX, event.clientY - pointerStartY);
  }, { passive: true });

  const handleReducedMotionChange = () => {
    stopAutoplay();
    startAutoplay();
  };
  on(reducedMotion, "change", handleReducedMotionChange);

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
