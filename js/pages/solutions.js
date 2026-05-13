import { getPlatformContent } from "../data/platform-content.js";

export function renderSolutionsPage({ lang, route }) {
  const content = getPlatformContent(lang);

  return `
    <section class="page-hero">
      <div class="page-hero__inner">
        <span class="eyebrow">${content.pages.solutions.eyebrow}</span>
        <h1>${content.pages.solutions.title}</h1>
        <p>${content.pages.solutions.body}</p>
      </div>
    </section>

    <section class="section">
      <div class="info-grid">
        ${content.solutions.map((solution) => `
          <article class="panel" id="${solution.id}">
            <span class="eyebrow">${solution.title}</span>
            <h2>${solution.title}</h2>
            <p class="muted">${solution.body}</p>
            <div class="section">
              <a class="button button--primary" href="${route("views/products.html")}">
                ${solution.cta}
              </a>
            </div>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section">
      <article class="panel">
        <span class="eyebrow">${content.platform.eyebrow}</span>
        <h2>${content.platform.title}</h2>
        <p class="muted">${content.platform.body}</p>
      </article>
    </section>
  `;
}
