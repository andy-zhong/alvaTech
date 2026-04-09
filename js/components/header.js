import { renderLanguagePicker } from "./language-picker.js";
import { getAllProducts, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";

export function renderHeader({ page, lang, route, productUrl }) {
  const products = getAllProducts();

  return `
    <header class="site-header">
      <div class="site-header__inner">
        <a class="brand" href="${route("index.html")}" aria-label="Alva Technology">
          <img class="brand__image" src="${route("Pictures/ALVA TECHNOLOGY logo design.png")}" alt="Alva Technology">
        </a>
        <div class="site-nav">
          <ul class="site-nav__list">
            <li class="site-nav__item">
              <a class="site-nav__link ${page === "home" ? "is-active" : ""}" href="${route("index.html")}">${t(lang, "navHome")}</a>
            </li>
            <li class="site-nav__item">
              <a class="nav-dropdown__trigger ${page === "products" || page === "product" ? "is-active" : ""}" href="${route("views/products.html")}">${t(lang, "navProducts")}</a>
              <div class="nav-dropdown__menu" role="menu" aria-label="${t(lang, "navProducts")}">
                ${products.map((product) => {
                  const content = getProductContent(product, lang);
                  return `<a href="${productUrl(product.slug)}">${content.name}</a>`;
                }).join("")}
              </div>
            </li>
            <li class="site-nav__item">
              <a class="site-nav__link ${page === "about" ? "is-active" : ""}" href="${route("views/about.html")}">${t(lang, "navAbout")}</a>
            </li>
            <li class="site-nav__item">
              <a class="site-nav__link ${page === "account" ? "is-active" : ""}" href="${route("views/account.html")}">${t(lang, "navAccount")}</a>
            </li>
          </ul>
          <div class="site-header__actions">
            ${renderLanguagePicker({ lang, route })}
          </div>
        </div>
      </div>
    </header>
  `;
}
