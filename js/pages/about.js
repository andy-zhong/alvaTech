import { t } from "../services/language-service.js";

export function renderAboutPage({ lang }) {
  return `
    <section class="page-hero">
      <div class="page-hero__inner">
        <span class="eyebrow">${t(lang, "aboutEyebrow")}</span>
        <h1>${t(lang, "aboutTitle")}</h1>
        <p>${t(lang, "aboutBody")}</p>
      </div>
    </section>

    <section class="section about-grid">
      <article class="panel">
        <h3>${t(lang, "aboutPointOneTitle")}</h3>
        <p>${t(lang, "aboutPointOneBody")}</p>
      </article>
      <article class="panel">
        <h3>${t(lang, "aboutPointTwoTitle")}</h3>
        <p>${t(lang, "aboutPointTwoBody")}</p>
      </article>
      <article class="panel">
        <h3>${t(lang, "aboutPointThreeTitle")}</h3>
        <p>${t(lang, "aboutPointThreeBody")}</p>
      </article>
    </section>
  `;
}
