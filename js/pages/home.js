import { getPlatformContent } from "../data/platform-content.js";

const ICONS = ["01", "02", "03", "04"];
const BENEFIT_ICONS = ["modules", "expand", "deploy", "tool"];
const FEATURE_ICONS = ["overview", "batteryPlus", "deploy"];
const PRODUCT_PRESET_IMAGES = [
  {
    src: "/Picture/products/voltrix/1-12_battery/Voltrix_5b.png",
    alt: "Voltrix system with five battery modules",
  },
  {
    src: "/Picture/products/voltrix/1-12_battery/Voltrix_8b.png",
    alt: "Voltrix system with eight battery modules",
  },
  {
    src: "/Picture/products/voltrix/1-12_battery/Voltrix_12b.png",
    alt: "Voltrix system with twelve battery modules",
  },
];
const PRODUCT_PRESET_LINKS = [
  "/products/starter/",
  "/products/medium/",
  "/products/max/",
];
export function renderHomePage({ lang }) {
  const content = getPlatformContent(lang);
  const defaultScenario = content.heroScenarios.summerHouse;

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
          <div class="platform-hero__tabs" role="tablist" aria-label="Energy scenarios">
            ${renderHeroTab("summerHouse", content.heroScenarios.summerHouse, true)}
            ${renderHeroTab("field", content.heroScenarios.field, false)}
          </div>

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

    <section class="platform-home-section platform-home-section--milk" aria-labelledby="product-presets-title">
      <div class="home-section-inner platform-product-area platform-product-area--ranges">
        <div class="platform-preset-head">
          <div>
            <span class="platform-eyebrow">Products</span>
            <h2 id="product-presets-title">Choose your Voltrix system.</h2>
          </div>
          <a class="platform-text-link" href="/views/products.html">Compare systems</a>
        </div>

        <div class="platform-preset-grid">
          ${content.productTiers.slice(0, 3).map((tier, index) => renderProductPreset(tier, index)).join("")}
        </div>
      </div>
    </section>

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
            <span class="platform-product-feature__label">Fixed 5 kWh starting setup</span>
            <p>${content.productFit.note ?? content.productTierNote}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="platform-home-section platform-home-section--milk" aria-labelledby="smart-title">
      <div class="home-section-inner platform-smart-layout">
        <div class="platform-section-head platform-section-head--narrow">
          <div>
            <span class="platform-eyebrow">${content.smartFeatures.eyebrow}</span>
            <h2 id="smart-title">${content.smartFeatures.title}</h2>
            <p>${content.smartFeatures.intro}</p>
          </div>
        </div>
        <div class="platform-smart-body">
          <div class="platform-phone-mockup reveal" aria-hidden="true">
            <div class="platform-phone-screen">
              <span></span>
              <strong>78%</strong>
              <small>${content.smartFeatures.phoneLabel}</small>
              <i></i>
            </div>
          </div>
          <div class="platform-feature-grid platform-feature-grid--stacked">
            ${content.smartFeatures.items.map((item, index) => `
              <article class="platform-feature-card reveal" style="--delay:${(index * 0.08).toFixed(2)}s">
                <div class="platform-card-kicker">
                  ${renderIcon(FEATURE_ICONS[index])}
                </div>
                <h3>${item.title}</h3>
                <p>${item.body}</p>
              </article>
            `).join("")}
          </div>
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

function renderProductPreset(tier, index) {
  const sizes = ["Small", "Medium", "Large"];
  const image = PRODUCT_PRESET_IMAGES[index];
  const href = PRODUCT_PRESET_LINKS[index] ?? "/views/products.html";

  return `
    <article class="platform-preset-card reveal" style="--delay:${(index * 0.07).toFixed(2)}s">
      <figure class="platform-preset-card__media">
        <img src="${image.src}" alt="${image.alt}">
      </figure>
      <div class="platform-preset-card__body">
        <span class="platform-preset-card__size">${sizes[index]}</span>
        <span class="platform-preset-card__range">${tier.range}</span>
        <h3>${tier.title}</h3>
        <p>${tier.body}</p>
        <a href="${href}">View product -></a>
      </div>
    </article>
  `;
}

export function bindHomePage({ lang }) {
  bindScenarioTabs(lang);
  bindSolutionShowcase();
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

        <div class="platform-solution-tabs" role="tablist" aria-label="Voltrix platform solutions">
          ${solutions.map((solution, index) => renderSolutionTab(solution, index)).join("")}
        </div>
      </div>

      <div class="platform-solution-panels" data-solution-panels hidden>
        ${solutions.map((solution) => renderSolutionDetail(solution)).join("")}
      </div>
    </div>
  `;
}

function renderSolutionTab(solution, index) {
  const visualClass = solution.id === "field" ? "platform-solution-tab__image--field" : "platform-solution-tab__image--summer";

  return `
    <button
      class="platform-solution-tab"
      type="button"
      role="tab"
      aria-selected="false"
      aria-expanded="false"
      aria-controls="solution-panel-${solution.id}"
      id="solution-tab-${solution.id}"
      data-solution-tab="${solution.id}"
      style="--delay:${(index * 0.08).toFixed(2)}s">
      <span class="platform-solution-tab__image ${visualClass}" aria-hidden="true"></span>
      <span class="platform-solution-tab__copy">
        <small>${solution.label}</small>
        <strong>${solution.title}</strong>
        <span>${solution.body}</span>
        <span class="platform-solution-tab__cta">Explore solution <b aria-hidden="true">&rarr;</b></span>
      </span>
    </button>
  `;
}

function renderSolutionDetail(solution) {
  const visualClass = solution.id === "field" ? "platform-solution-detail__visual--field" : "platform-solution-detail__visual--summer";

  return `
    <article
      class="platform-solution-detail"
      id="solution-panel-${solution.id}"
      role="tabpanel"
      aria-labelledby="solution-tab-${solution.id}"
      data-solution-panel="${solution.id}"
      hidden>
      <div class="platform-solution-detail__visual ${visualClass}" aria-hidden="true"></div>
      <div class="platform-solution-detail__copy">
        <span class="platform-eyebrow">${solution.detail.eyebrow}</span>
        <h3>${solution.detail.title}</h3>
        <p>${solution.detail.body}</p>
        <ul>
          ${solution.detail.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
        </ul>
        <a class="button button--primary" href="${solution.href}">${solution.cta}</a>
      </div>
    </article>
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

  function setScenario(key) {
    const scenario = content.heroScenarios[key];
    if (!scenario || !copy || !benefits) return;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.scenario === key;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    root.dataset.activeScenario = key;
    copy.classList.add("is-switching");
    benefits.classList.add("is-switching");

    setTimeout(() => {
      copy.innerHTML = `
        ${renderHeroHeadline(scenario)}
        <p>${scenario.body}</p>
      `;
      benefits.innerHTML = renderHeroBenefits(scenario.benefits);
      copy.classList.remove("is-switching");
      benefits.classList.remove("is-switching");
    }, 140);
  }

  root.dataset.activeScenario = "summerHouse";
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setScenario(tab.dataset.scenario));
  });
}

function bindSolutionShowcase() {
  const root = document.querySelector("[data-solution-showcase]");
  if (!root) return;

  const tabs = [...root.querySelectorAll("[data-solution-tab]")];
  const panels = [...root.querySelectorAll("[data-solution-panel]")];
  const panelsRoot = root.querySelector("[data-solution-panels]");
  let activeId = null;
  let switchTimer;

  function updateTabs(id) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.solutionTab === id;
      const arrow = tab.querySelector(".platform-solution-tab__cta b");

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("aria-expanded", isActive ? "true" : "false");

      if (arrow) {
        arrow.textContent = isActive ? "\u2193" : "\u2192";
      }
    });
  }

  function scrollToPanels() {
    if (!panelsRoot || panelsRoot.hidden) return;

    requestAnimationFrame(() => {
      const headerOffset = document.querySelector(".site-header")?.offsetHeight || 0;
      const targetTop = panelsRoot.getBoundingClientRect().top + window.scrollY - headerOffset - 24;
      window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
    });
  }

  function collapseSolution() {
    clearTimeout(switchTimer);
    updateTabs(null);
    panels.forEach((panel) => {
      panel.hidden = true;
    });

    if (panelsRoot) {
      panelsRoot.hidden = true;
      panelsRoot.classList.remove("is-open", "is-switching");
    }

    activeId = null;
  }

  function setSolution(id) {
    if (activeId === id && panelsRoot && !panelsRoot.hidden) {
      collapseSolution();
      return;
    }

    updateTabs(id);

    const showPanel = () => {
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.solutionPanel !== id;
      });

      if (panelsRoot) {
        panelsRoot.hidden = false;
        panelsRoot.classList.remove("is-switching");
        panelsRoot.classList.add("is-open");
      }

      activeId = id;
      scrollToPanels();
    };

    if (panelsRoot) {
      clearTimeout(switchTimer);

      if (activeId && activeId !== id && !panelsRoot.hidden) {
        panelsRoot.classList.add("is-switching");
        switchTimer = setTimeout(showPanel, 180);
        return;
      }
    }

    showPanel();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setSolution(tab.dataset.solutionTab));
  });
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
