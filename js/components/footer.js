import { t } from "../services/language-service.js";

export function renderFooter({ lang }) {
  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__legal">
          <span>&copy; 2026 Alva Technology</span>
          <address class="site-footer__company">
            <span>Alva Technology AB</span>
            <span>Org.nr 559438-2565</span>
            <span>${lang === "sv" ? "Hjortronvägen 1, 554 75 Jönköping, Sverige" : "Hjortronvägen 1, 554 75 Jönköping, Sweden"}</span>
          </address>
          <a href="/views/warranty-returns.html">${t(lang, "footerWarrantyReturns")}</a>
        </div>
        <span>${t(lang, "footerTagline")}</span>
      </div>
    </footer>
  `;
}
