import { getPlatformContent } from "../data/platform-content.js";

const SOLUTION_ROUTES = {
  "summer-house": "/views/solution-summer-house.html",
  field: "/views/solution-field.html",
};

const OVERVIEW_COPY = {
  hero: {
    eyebrow: "Solutions",
    title: "Energy beyond fixed places.",
    body:
      "Explore how Voltrix turns one modular battery platform into practical energy for seasonal homes, outdoor routines, service vans and installer teams.",
  },
  cards: {
    "summer-house": {
      label: "Summer House",
      title: "For seasonal homes and outdoor living",
      body:
        "A compact Voltrix setup for cabins, terraces and second homes — expandable over time and ready to bring useful power closer to gardens, outdoor corners and weekend routines.",
      cta: "Explore Summer House",
    },
    field: {
      label: "Installer",
      title: "For installer teams and service van routines",
      body:
        "Charge battery packs at the office or workshop, bring selected packs into the service van, and use VoltDock or Backpack Power when work needs power beyond the parking spot.",
      cta: "Explore Installer",
    },
  },
  platform: {
    eyebrow: "The platform",
    title: "One battery platform. Different ways to bring energy closer.",
    body:
      "Voltrix starts with a modular energy base and battery packs. From there, the same platform can support a summer house setup, move into outdoor routines, or help installer teams organize portable power through compatible add-ons.",
  },
};

const SOLUTION_ICONS = {
  "summer-house": `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="m4 11 8-7 8 7"/>
      <path d="M6.5 10.5V20h11v-9.5"/>
      <path d="M10 20v-5h4v5"/>
      <path d="M8.5 8.5h7"/>
    </svg>
  `,
  field: `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 15V8.5A1.5 1.5 0 0 1 5.5 7h8v8"/>
      <path d="M13.5 10h3.7l2.8 3.2V15"/>
      <path d="M4 15h2.2"/>
      <path d="M9.8 15h5.4"/>
      <path d="M18.8 15H20"/>
      <circle cx="8" cy="17" r="2"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
  `,
};

export function renderSolutionsPage({ lang }) {
  const content = getPlatformContent(lang);
  const page = content.pages?.solutions ?? OVERVIEW_COPY.hero;
  const platform = content.platform ?? OVERVIEW_COPY.platform;

  return `
    <section class="solutions-overview-hero">
      <span class="eyebrow">${page.eyebrow}</span>
      <h1>${page.title}</h1>
      <p>${page.body}</p>
    </section>

    <section class="solutions-overview-cards" aria-label="Voltrix solution paths">
      ${content.solutions.map((solution) => renderSolutionCard(solution)).join("")}
    </section>

    <section class="solutions-overview-platform">
      <span class="eyebrow">${platform.eyebrow}</span>
      <h2>${platform.title}</h2>
      <p>${platform.body}</p>
    </section>
  `;
}

function renderSolutionCard(solution) {
  const href = SOLUTION_ROUTES[solution.id] ?? "/views/solutions.html";
  const copy = {
    label: solution.label ?? solution.title,
    title: solution.title,
    body: solution.body,
    cta: solution.cta,
  };

  return `
    <a class="solutions-overview-card" id="${solution.id}" href="${href}">
      <span class="solutions-overview-card__icon">
        ${SOLUTION_ICONS[solution.id] ?? SOLUTION_ICONS["summer-house"]}
      </span>
      <span class="solutions-overview-card__pill">${copy.label}</span>
      <span class="solutions-overview-card__body">
        <strong>${copy.title}</strong>
        <span>${copy.body}</span>
      </span>
      <span class="solutions-overview-card__cta">${copy.cta} <b aria-hidden="true">→</b></span>
    </a>
  `;
}
