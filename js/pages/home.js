import { getPlatformContent } from "../data/platform-content.js";

const ICONS = ["01", "02", "03", "04"];

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
            <h1 id="home-hero-title">${defaultScenario.headline}</h1>
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
              <span>${ICONS[index]}</span>
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
              <span>${tier.range}</span>
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
  return benefits.map((benefit, index) => `
    <span><strong>${ICONS[index]}</strong>${benefit}</span>
  `).join("");
}

function renderSolutionCard(solution, index) {
  const visualClass = solution.id === "field" ? "platform-visual--field" : "platform-visual--summer";

  return `
    <a class="platform-solution-card reveal" href="/views/solutions.html#${solution.id}" style="--delay:${(index * 0.08).toFixed(2)}s">
      <div class="platform-visual ${visualClass}" aria-hidden="true">
        <span>${solution.title}</span>
      </div>
      <div>
        <h3>${solution.title}</h3>
        <p>${solution.body}</p>
      </div>
    </a>
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
        <h1 id="home-hero-title">${scenario.headline}</h1>
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
