import { t } from "../services/language-service.js";

export function renderFooter({ lang }) {
  const linksByLanguage = {
    en: { privacy: "Privacy", contact: "Contact" },
    sv: { privacy: "Integritet", contact: "Kontakt" },
    fi: { privacy: "Tietosuoja", contact: "Yhteys" },
    no: { privacy: "Personvern", contact: "Kontakt" },
    da: { privacy: "Privatliv", contact: "Kontakt" },
    it: { privacy: "Privacy", contact: "Contatto" },
  };
  const links = linksByLanguage[lang] ?? linksByLanguage.en;

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
        <div class="site-footer__aside">
          <nav class="site-footer__links" aria-label="Footer">
            <a href="/views/privacy-policy.html">${links.privacy}</a>
            <a href="/views/b2b.html">${links.contact}</a>
          </nav>
          <span>${t(lang, "footerTagline")}</span>
        </div>
      </div>
    </footer>
  `;
}
