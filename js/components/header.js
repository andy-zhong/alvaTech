import { getAllProducts, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";
import { renderLanguagePicker } from "./language-picker.js";

export function initHeader({ page, lang, productUrl, route }) {
  clearActiveLinks();
  setActive(page);
  setTranslations(lang);
  renderProducts(lang, productUrl);
  updateCart();
  renderLanguage(lang, route);
}

function clearActiveLinks() {
  document.querySelectorAll("[data-link].active").forEach((link) => {
    link.classList.remove("active");
  });
}

function setActive(page) {
  document.querySelectorAll("[data-link]").forEach((link) => {
    if (link.dataset.link === page) {
      link.classList.add("active");
    }
  });
}

function safeT(lang, key, fallback = "") {
  try {
    return t(lang, key) || fallback || key;
  } catch {
    return fallback || key;
  }
}

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.textContent = value;
}

function setTranslations(lang) {
  setText('[data-link="home"]', safeT(lang, "navHome", "Home"));
  setText('[data-link="products"]', safeT(lang, "navProducts", "Products"));
  setText('[data-link="about"]', safeT(lang, "navAbout", "About"));
  setText('[data-link="account"]', safeT(lang, "navAccount", "Account"));
  setText('[data-link="b2b"]', safeT(lang, "navB2B", "Företagskund"));
}

function renderProducts(lang, productUrl) {
  const container = document.getElementById("product-dropdown");
  if (!container) return;

  let products = [];
  try {
    products = getAllProducts() || [];
  } catch (err) {
    console.error("[header] Failed to load products:", err);
    container.innerHTML = "";
    return;
  }

  container.innerHTML = products
    .map((product) => {
      try {
        const content = getProductContent(product, lang);
        return `<a href="${productUrl(product.slug)}">${content.name}</a>`;
      } catch (err) {
        console.error("[header] Failed to render product in dropdown:", err);
        return "";
      }
    })
    .join("");
}

function updateCart() {
  const el = document.getElementById("cart-count");
  if (!el) return;

  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    el.textContent = count > 0 ? String(count) : "";
  } catch (err) {
    console.error("[header] Failed to update cart count:", err);
    el.textContent = "";
  }
}

function renderLanguage(lang, route) {
  const el = document.getElementById("language");
  if (!el) return;

  try {
    el.innerHTML = renderLanguagePicker({ lang, route });
  } catch (err) {
    console.error("[header] Failed to render language picker:", err);
    el.innerHTML = "";
  }
}