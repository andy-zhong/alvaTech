import { getLanguages, setStoredLanguage, t } from "../services/language-service.js";

export function renderLanguagePicker({ lang, route }) {
  const languages = getLanguages();
  const current = languages.find((entry) => entry.code === lang) ?? languages[0];

  return `
    <div class="lang-picker">
      <button class="lang-picker__button" type="button" aria-label="${t(lang, "languageLabel")}">
        <img class="flag" src="${route(`Picture/icons/flags/${current.flag}.svg`)}" alt="">
        <span>${current.label}</span>
      </button>
      <div class="lang-picker__menu" role="menu">
        ${languages.map((entry) => `
          <button class="lang-picker__option ${entry.code === lang ? "is-active" : ""}" type="button" data-language-option="${entry.code}">
            <img class="flag" src="${route(`Picture/icons/flags/${entry.flag}.svg`)}" alt="">
            <span>${entry.label}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

export function bindLanguagePicker() {
  document.querySelectorAll("[data-language-option]").forEach((button) => {
    button.addEventListener("click", () => {
      setStoredLanguage(button.dataset.languageOption);
      window.location.reload();
    });
  });
}
