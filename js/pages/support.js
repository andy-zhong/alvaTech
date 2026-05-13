import { getPlatformContent } from "../data/platform-content.js";

export function renderSupportPage({ lang }) {
  const content = getPlatformContent(lang);

  return `
    <section class="page-hero">
      <div class="page-hero__inner">
        <span class="eyebrow">${content.pages.support.eyebrow}</span>
        <h1>${content.pages.support.title}</h1>
        <p>${content.pages.support.body}</p>
      </div>
    </section>

    <section class="section">
      <div class="grid">
        ${content.supportCards.map((card) => `
          <article class="panel" id="${card.id}">
            <h2>${card.title}</h2>
            <p class="muted">${card.body}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}
