import { FALLBACK_LANGUAGE, UI_TRANSLATIONS } from "../data/i18n.js";
import { DEFAULT_MARKET_CODE, getMarketOptions, isSelectableMarket } from "../data/markets.js";

const STORAGE_KEY = "alva-language";

export function getStoredLanguage() {
  const lang = localStorage.getItem(STORAGE_KEY);
  return isSelectableMarket(lang) ? lang : DEFAULT_MARKET_CODE;
}

export function setStoredLanguage(lang) {
  const nextLanguage = isSelectableMarket(lang) ? lang : DEFAULT_MARKET_CODE;
  localStorage.setItem(STORAGE_KEY, nextLanguage);
  return nextLanguage;
}

export function t(lang, key) {
  return UI_TRANSLATIONS[lang]?.[key] ?? UI_TRANSLATIONS[FALLBACK_LANGUAGE][key] ?? key;
}

export function getLanguages() {
  return getMarketOptions();
}
