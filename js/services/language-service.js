import { FALLBACK_LANGUAGE, UI_TRANSLATIONS } from "../data/i18n.js";

const STORAGE_KEY = "alva-language";

export function getStoredLanguage() {
  const lang = localStorage.getItem(STORAGE_KEY);
  return UI_TRANSLATIONS[lang] ? lang : "sv";
}

export function setStoredLanguage(lang) {
  const nextLanguage = UI_TRANSLATIONS[lang] ? lang : "sv";
  localStorage.setItem(STORAGE_KEY, nextLanguage);
  return nextLanguage;
}

export function t(lang, key) {
  return UI_TRANSLATIONS[lang]?.[key] ?? UI_TRANSLATIONS[FALLBACK_LANGUAGE][key] ?? key;
}

export function getLanguages() {
  return [
    { code: "sv", label: "SV", flag: "se" },
    { code: "fi", label: "FI", flag: "fi" },
    { code: "no", label: "NO", flag: "no" },
    { code: "da", label: "DA", flag: "dk" },
    { code: "en", label: "EN", flag: "gb" }
  ];
}
