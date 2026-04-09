import { t } from "../services/language-service.js";

export function renderAccountPage({ lang }) {
  return `
    <section class="page-hero">
      <div class="page-hero__inner">
        <span class="eyebrow">${t(lang, "accountEyebrow")}</span>
        <h1>${t(lang, "accountTitle")}</h1>
        <p>${t(lang, "accountBody")}</p>
      </div>
    </section>

    <section class="section account-grid">
      <article class="panel">
        <h3>${t(lang, "accountPanelOneTitle")}</h3>
        <p>${t(lang, "accountPanelOneBody")}</p>
      </article>
      <article class="panel">
        <h3>${t(lang, "accountPanelTwoTitle")}</h3>
        <p>${t(lang, "accountPanelTwoBody")}</p>
      </article>
      <article class="panel">
        <h3>${t(lang, "accountPanelThreeTitle")}</h3>
        <p>${t(lang, "accountPanelThreeBody")}</p>
      </article>
      <article class="panel">
        <h3>${t(lang, "accountPanelFourTitle")}</h3>
        <p>${t(lang, "accountPanelFourBody")}</p>
      </article>
    </section>
  `;
}
