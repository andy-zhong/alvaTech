import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { bindLanguagePicker } from "../components/language-picker.js";
import { getStoredLanguage, t } from "../services/language-service.js";
import { createRouteHelpers } from "../utils/routes.js";
import { renderHomePage, bindHomePage } from "../pages/home.js";
import { renderProductsPage } from "../pages/products.js";
import { renderProductDetailPage, renderMissingProduct } from "../pages/product-detail.js";
import { renderBuyHubPage } from "../pages/buy.js";
import { renderBuyProductPage, bindBuyProductPage } from "../pages/buy-product.js";
import { renderAboutPage } from "../pages/about.js";
import { renderAccountPage } from "../pages/account.js";

export function initApp() {
  const page = document.body.dataset.page || "home";
  const lang = getStoredLanguage();
  const routes = createRouteHelpers(page);

  document.documentElement.lang = lang;
  mountShell({ page, lang, ...routes });
  mountPage({ page, lang, ...routes });
  bindLanguagePicker();
}

function mountShell({ page, lang, route, productUrl }) {
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  if (navbar) {
    navbar.innerHTML = renderHeader({ page, lang, route, productUrl });
  }

  if (footer) {
    footer.innerHTML = renderFooter({ lang });
  }
}

function mountPage({ page, lang, route, productUrl, buyProductUrl, getCurrentSlug }) {
  const container = document.getElementById("page-content");
  if (!container) return;

  switch (page) {
    case "home":
      document.title = t(lang, "metaHomeTitle");
      container.innerHTML = renderHomePage({ lang });
      bindHomePage({ lang, productUrl });
      break;
    case "products":
      document.title = t(lang, "metaProductsTitle");
      container.innerHTML = renderProductsPage({ lang, productUrl });
      break;
    case "product":
      document.title = t(lang, "metaProductTitle");
      container.innerHTML = renderProductDetailPage({ lang, slug: getCurrentSlug(), route, buyProductUrl });
      break;
    case "buy":
      document.title = t(lang, "metaBuyTitle");
      container.innerHTML = renderBuyHubPage({ lang, productUrl, buyProductUrl });
      break;
    case "buy-product":
      document.title = t(lang, "metaCheckoutTitle");
      container.innerHTML = renderBuyProductPage({ lang, slug: getCurrentSlug(), route });
      bindBuyProductPage();
      break;
    case "about":
      document.title = t(lang, "metaAboutTitle");
      container.innerHTML = renderAboutPage({ lang });
      break;
    case "account":
      document.title = t(lang, "metaAccountTitle");
      container.innerHTML = renderAccountPage({ lang });
      break;
    default:
      container.innerHTML = renderMissingProduct({ lang, route });
      break;
  }
}
