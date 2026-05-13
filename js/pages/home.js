import { getPlatformContent } from "../data/platform-content.js";

const ICONS = ["01", "02", "03", "04"];
const BENEFIT_ICONS = ["modules", "expand", "weather"];
const FEATURE_ICONS = ["overview", "batteryPlus", "deploy"];
const TIER_ICONS = {
  "voltrix-starter": "battery",
  "voltrix-medium": "batteryPlus",
  "voltrix-max": "stack",
  accessories: "tool",
};
const SOLUTION_ICONS = {
  "summer-house": "house",
  field: "field",
};

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
            <a class="button button--primary" href="/views/solutions.html">${content.heroCtas.primary}</a>
            <a class="button button--secondary" href="#platform-section">${content.heroCtas.secondary}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="platform-home-section platform-home-section--light">
      <div class="home-section-inner">
        <div class="platform-benefit-grid">
          ${content.benefits.map((item, index) => `
            <article class="platform-benefit-card reveal" style="--delay:${(index * 0.08).toFixed(2)}s">
              <div class="platform-card-kicker">
                ${renderIcon(BENEFIT_ICONS[index])}
                <span>${ICONS[index]}</span>
              </div>
              <h2>${item.title}</h2>
              <p>${item.body}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="platform-home-section platform-home-section--light" id="platform-section" aria-labelledby="platform-title">
      <div class="home-section-inner platform-explain">
        <div class="platform-explain__copy reveal">
          <span class="platform-eyebrow">${content.platform.eyebrow}</span>
          <h2 id="platform-title">${content.platform.title}</h2>
          <p>${content.platform.body}</p>
        </div>

        <div class="platform-solution-grid">
          ${content.solutions.map((solution, index) => renderSolutionCard(solution, index)).join("")}
        </div>
      </div>
    </section>

    <section class="platform-home-section platform-home-section--neutral" aria-labelledby="product-fit-title">
      <div class="home-section-inner">
        <div class="platform-section-head">
          <div>
            <span class="platform-eyebrow">${content.productFit.eyebrow}</span>
            <h2 id="product-fit-title">${content.productFit.title}</h2>
            <p>${content.productFit.body}</p>
          </div>
          <div class="platform-section-actions">
            <a class="button button--primary" href="/views/solutions.html">${content.productFit.primary}</a>
            <a class="button button--secondary" href="/views/products.html">${content.productFit.secondary}</a>
          </div>
        </div>

        <p class="platform-tier-note">${content.productTierNote}</p>

        <div class="platform-tier-grid">
          ${content.productTiers.map((tier, index) => `
            <article class="platform-tier-card reveal" id="${tier.id}" style="--delay:${(index * 0.07).toFixed(2)}s">
              <div class="platform-card-kicker">
                ${renderIcon(TIER_ICONS[tier.id] ?? "battery")}
                <span>${tier.range}</span>
              </div>
              <h3>${tier.title}</h3>
              <p>${tier.body}</p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    ${content.useCaseSections.map((section, index) => renderUseCaseSection(section, index)).join("")}

    <section class="platform-home-section platform-home-section--light" aria-labelledby="smart-title">
      <div class="home-section-inner">
        <div class="platform-section-head platform-section-head--narrow">
          <div>
            <span class="platform-eyebrow">${content.smartFeatures.eyebrow}</span>
            <h2 id="smart-title">${content.smartFeatures.title}</h2>
          </div>
        </div>
        <div class="platform-feature-grid">
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
    </section>

    <section class="platform-home-section platform-home-section--dark" aria-labelledby="trust-title">
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

    <section class="platform-home-section platform-home-section--light" aria-labelledby="support-entry-title">
      <div class="home-section-inner">
        <div class="platform-section-head">
          <div>
            <span class="platform-eyebrow">Support</span>
            <h2 id="support-entry-title">Knowledge for choosing and using Voltrix.</h2>
          </div>
          <a class="button button--secondary" href="/views/support.html">Open support</a>
        </div>
        <div class="platform-support-grid">
          ${content.supportCards.map((card) => `
            <a class="platform-support-card reveal" href="/views/support.html#${card.id}">
              <h3>${card.title}</h3>
              <p>${card.body}</p>
            </a>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="platform-home-section platform-home-section--final" aria-labelledby="final-cta-title">
      <div class="home-section-inner platform-final">
        <span class="platform-eyebrow">${content.finalCta.eyebrow}</span>
        <h2 id="final-cta-title">${content.finalCta.title}</h2>
        <div class="platform-final__actions">
          <a class="button button--primary" href="/views/solutions.html">${content.finalCta.primary}</a>
          <a class="button button--secondary" href="/views/b2b.html">${content.finalCta.secondary}</a>
        </div>
      </div>
    </section>
  `;
}

export function bindHomePage({ lang }) {
  bindScenarioTabs(lang);
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

function renderSolutionCard(solution, index) {
  const visualClass = solution.id === "field" ? "platform-visual--field" : "platform-visual--summer";

  return `
    <a class="platform-solution-card reveal" href="/views/solutions.html#${solution.id}" style="--delay:${(index * 0.08).toFixed(2)}s">
      <div class="platform-visual ${visualClass}" aria-hidden="true">
        <span>${solution.title}</span>
      </div>
      <div>
        ${renderIcon(SOLUTION_ICONS[solution.id] ?? "modules")}
        <h3>${solution.title}</h3>
        <p>${solution.body}</p>
      </div>
    </a>
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

function renderUseCaseSection(section, index) {
  const isField = section.id === "field-detail";
  const visualClass = isField ? "platform-usecase__visual--field" : "platform-usecase__visual--summer";

  return `
    <section class="platform-home-section ${isField ? "platform-home-section--neutral" : "platform-home-section--light"}">
      <div class="home-section-inner platform-usecase ${isField ? "platform-usecase--reverse" : ""}">
        <div class="platform-usecase__visual ${visualClass} reveal" aria-hidden="true"></div>
        <div class="platform-usecase__copy reveal" style="--delay:0.08s">
          <span class="platform-eyebrow">${section.eyebrow}</span>
          <h2>${section.title}</h2>
          <p>${section.body}</p>
          <ul>
            ${section.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
          </ul>
          <a class="button button--primary" href="${section.href}">${section.cta}</a>
        </div>
      </div>
    </section>
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
