import { initHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { bindLanguagePicker } from "../components/language-picker.js";
import { mountFloatingQuoteWidget } from "../components/floating-quote-widget.js";
import { getStoredLanguage, t } from "../services/language-service.js";
import { createRouteHelpers } from "../utils/routes.js";
import { renderHomePage, bindHomePage } from "../pages/home.js";
import { renderProductsPage } from "../pages/products.js";
import {
  renderProductDetailPage,
  renderMissingProduct,
  afterRenderProductDetail,
} from "../pages/product-detail.js";
import { renderBuyHubPage } from "../pages/buy.js";
import {
  renderBuyProductPage,
  afterRenderBuyProduct,
} from "../pages/buy-product.js";
import { renderAboutPage } from "../pages/about.js";
import { renderAccountPage } from "../pages/account.js";
import { getProductBySlug } from "../services/product-service.js";
import { initB2BForm } from "../pages/b2b.js";

export async function initApp() {
  const page = document.body.dataset.page || "home";
  const lang = getStoredLanguage();
  const routes = createRouteHelpers(page);

  document.documentElement.lang = lang;

  await mountShell({ page, lang, ...routes });
  await mountPage({ page, lang, ...routes });
  mountFloatingQuoteWidget({ lang });

  bindLanguagePicker();
}

async function mountShell({ page, lang, route, productUrl }) {
  const navbar = document.getElementById("navbar");
  const footer = document.getElementById("footer");

  if (navbar) {
    try {
      const res = await fetch("/components/navbar.html");

      if (!res.ok) {
        throw new Error(`Failed to load navbar.html (${res.status})`);
      }

      const html = await res.text();
      navbar.innerHTML = html;

      initHeader({ page, lang, productUrl, route });
    } catch (err) {
      console.error("[bootstrap] Navbar failed:", err);
      navbar.innerHTML = `<p style="color:red">Navbar failed to load</p>`;
    }
  }

  if (footer) {
    try {
      footer.innerHTML = renderFooter({ lang });
    } catch (err) {
      console.error("[bootstrap] Footer failed:", err);
    }
  }
}

async function mountPage({
  page,
  lang,
  route,
  productUrl,
  buyProductUrl,
  getCurrentSlug,
}) {
  const container = document.getElementById("page-content");
  if (!container) return;

  switch (page) {
    case "home":
      document.title = t(lang, "metaHomeTitle");
      container.innerHTML = renderHomePage({ lang });
      bindHomePage({ lang, productUrl, buyProductUrl });
      break;

    case "products":
      document.title = t(lang, "metaProductsTitle");
      container.innerHTML = renderProductsPage({ lang, productUrl });
      break;

    case "product": {
      document.title = t(lang, "metaProductTitle");
      const slug = getCurrentSlug();

      container.innerHTML = renderProductDetailPage({
        lang,
        slug,
        route,
        buyProductUrl,
      });

      const product = getProductBySlug(slug);
      if (product) {
        afterRenderProductDetail(product);
      } else {
        container.innerHTML = renderMissingProduct({ lang, route });
      }
      break;
    }

    case "buy":
      document.title = t(lang, "metaBuyTitle");
      container.innerHTML = renderBuyHubPage({ lang, productUrl, buyProductUrl });
      break;

    case "buy-product":
      document.title = t(lang, "metaCheckoutTitle");
      container.innerHTML = renderBuyProductPage({ lang, route });
      afterRenderBuyProduct({ lang });
      break;

    case "checkout":
      document.title = "Checkout | Alva Technology";
      try {
        const checkoutModule = await import("../pages/checkout.js");
        container.innerHTML = checkoutModule.renderCheckoutPage({ lang });
        checkoutModule.bindCheckoutPage({ lang });
      } catch (err) {
        console.error("[bootstrap] Checkout page failed:", err);
        container.innerHTML = renderMissingProduct({ lang, route });
      }
      break;

    case "order-confirmation":
      document.title = "Order Confirmed | Alva Technology";
      try {
        const orderConfirmationModule = await import("../pages/order-confirmation.js");
        container.innerHTML = orderConfirmationModule.renderOrderConfirmationPage(lang);
      } catch (err) {
        console.error("[bootstrap] Order confirmation page failed:", err);
        container.innerHTML = renderMissingProduct({ lang, route });
      }
      break;

    case "about":
      document.title = t(lang, "metaAboutTitle");
      container.innerHTML = renderAboutPage({ lang });
      break;

    case "account":
      document.title = t(lang, "metaAccountTitle");
      container.innerHTML = renderAccountPage({ lang });
      break;

    case "b2b":
      document.title = "B2B | Alva Technology";
      setTimeout(() => {
        initB2BForm();
      }, 0);
      break;

    default:
      container.innerHTML = renderMissingProduct({ lang, route });
      break;
  }
}
