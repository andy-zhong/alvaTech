import { t } from "../services/language-service.js";

export function renderFooter({ lang }) {
  return `
    <footer class="site-footer">
      <div class="site-footer__inner">
        <span>&copy; 2026 Alva Technology</span>
        <span>${t(lang, "footerTagline")}</span>
      </div>
    </footer>
  `;
}
