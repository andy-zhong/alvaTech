import { getProductBySlug, getProductContent } from "../services/product-service.js";
import { getStoredLanguage, t } from "../services/language-service.js";
import { isVendureCartEnabled, syncLocalCartToVendure } from "../services/vendure-cart-sync.js";
import { refreshCartPricesFromBackend } from "../services/commerce-catalog.js";

const CART_NOTICE_KEY = "alva-cart-notice";

const CART_COPY = {
  en: {
    title: "Your cart",
    summaryTitle: "Order summary",
    checkout: "Continue to checkout",
    continue: "Continue shopping",
    syncing: "Syncing cart...",
  },
  sv: {
    title: "Granska din konfiguration",
    summaryTitle: "Konfigurationssammanfattning",
    checkout: "Fortsatt till kassan",
    continue: "Justera system",
    syncing: "Synkar varukorg...",
  },
  fi: {
    title: "Tarkista kokoonpano",
    summaryTitle: "Kokoonpanon yhteenveto",
    checkout: "Jatka kassaan",
    continue: "Saada jarjestelmaa",
  },
  no: {
    title: "Se gjennom konfigurasjonen",
    summaryTitle: "Konfigurasjonssammendrag",
    checkout: "Gaa til kassen",
    continue: "Juster system",
  },
  da: {
    title: "Gennemgaa din konfiguration",
    summaryTitle: "Konfigurationsoversigt",
    checkout: "Gaa til kassen",
    continue: "Juster system",
  },
  it: {
    title: "Rivedi la configurazione",
    summaryTitle: "Riepilogo configurazione",
    checkout: "Vai al checkout",
    continue: "Modifica sistema",
  },
};

function getCartCopy(lang) {
  return CART_COPY[lang] ?? CART_COPY.en;
}

// ─────────────────────────────────────────────────────────────────────────────
// Render
// ─────────────────────────────────────────────────────────────────────────────

export function renderBuyProductPage({ lang, route }) {
  const copy = getCartCopy(lang);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    return `
      <section class="section">
        <article class="empty-state">
          <h1>${t(lang, "cartEmpty")}</h1>
          <p class="muted">${t(lang, "cartEmptyBody")}</p>
          <div class="section">
            <a class="button button--secondary" href="/views/products.html">
              ${t(lang, "backToProducts")}
            </a>
          </div>
        </article>
      </section>`;
  }

  const grandTotal = cart.reduce((sum, item) => sum + item.unitPrice * (item.quantity || 1), 0);
  const itemCount  = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const notice = consumeCartNotice();

  return `
    <section class="section">
      <div class="cart-header">
        <h1>${copy.title}</h1>
        <span class="cart-header__count">
          ${itemCount} ${itemCount === 1 ? t(lang, "cartItemSingular") : t(lang, "cartItemPlural")}
        </span>
      </div>
      ${notice ? `<p class="cart-summary__sync-error">${notice}</p>` : ""}

      <div class="cart-layout">

        <div class="cart-lines" id="cart-lines">
          ${cart.map((item) => renderCartLine(item, lang)).join("")}
        </div>

        <aside class="cart-sidebar">
          <h3>${copy.summaryTitle}</h3>

          <div class="cart-summary__rows">
            ${cart.map((item) => renderSummaryRow(item, lang)).join("")}
          </div>

          <div class="cart-summary__row cart-summary__row--total">
            <span>${t(lang, "cartTotal")}</span>
            <span id="cart-grand-total">${grandTotal.toLocaleString("sv-SE")} SEK</span>
          </div>

          <p class="cart-summary__legal">${t(lang, "cartTaxNote")}</p>

          <div class="cart-actions">
            <a class="button button--primary" href="/views/checkout.html" data-vendure-checkout-link>
              ${copy.checkout}
            </a>
            <a class="button button--secondary" href="/views/products.html">
              ${copy.continue}
            </a>
          </div>
          <p class="cart-summary__sync-error" data-vendure-sync-error hidden></p>
        </aside>

      </div>
    </section>`;
}

function renderCartLine(item, lang) {
  const product = getProductBySlug(item.slug);
  if (!product) return "";
  const content   = getProductContent(product, lang);
  const qty       = item.quantity || 1;
  const lineTotal = item.unitPrice * qty;

  if (item.isConfigurable) {
    return `
      <div class="cart-line" data-item-id="${item.cartItemId}">
        <img class="cart-line__img" src="${product.heroImage}" alt="${content.name}">
        <div class="cart-line__body">
          <p class="cart-line__name">${content.name}</p>
          <p class="cart-line__meta">
            ${item.batteryCount} ${item.batteryCount === 1 ? t(lang, "cartBatterySingular") : t(lang, "cartBatteryPlural")}
            &nbsp;/&nbsp; ${item.capacity} kWh
          </p>
        </div>
        <div class="cart-line__right">
          <p class="cart-line__price">${lineTotal.toLocaleString("sv-SE")} SEK</p>
          <button class="cart-line__remove" data-item-id="${item.cartItemId}"
                  aria-label="${t(lang, "cartRemove")}">
            ${t(lang, "cartRemove")}
          </button>
        </div>
      </div>`;
  }

  return `
    <div class="cart-line" data-item-id="${item.cartItemId}">
      <img class="cart-line__img" src="${product.heroImage}" alt="${content.name}">
      <div class="cart-line__body">
        <p class="cart-line__name">${content.name}</p>
        <p class="cart-line__meta">${item.unitPrice.toLocaleString("sv-SE")} SEK ${t(lang, "cartPerUnit")}</p>
        <div class="cart-quantity-stepper cart-line__qty">
          <button class="cart-quantity-stepper__button qty-decrease" data-item-id="${item.cartItemId}"
                  aria-label="${t(lang, "cartDecrease")}">-</button>
          <span class="cart-quantity-stepper__value qty-value" data-item-id="${item.cartItemId}">${qty}</span>
          <button class="cart-quantity-stepper__button qty-increase" data-item-id="${item.cartItemId}"
                  aria-label="${t(lang, "cartIncrease")}">+</button>
        </div>
      </div>
      <div class="cart-line__right">
        <p class="cart-line__price" data-price-id="${item.cartItemId}">${lineTotal.toLocaleString("sv-SE")} SEK</p>
        <button class="cart-line__remove" data-item-id="${item.cartItemId}"
                aria-label="${t(lang, "cartRemove")}">
          ${t(lang, "cartRemove")}
        </button>
      </div>
    </div>`;
}

function renderSummaryRow(item, lang) {
  const product = getProductBySlug(item.slug);
  if (!product) return "";
  const content   = getProductContent(product, lang);
  const qty       = item.quantity || 1;
  const lineTotal = item.unitPrice * qty;

  const label = item.isConfigurable
    ? `${content.name} (${item.batteryCount} ${item.batteryCount === 1 ? t(lang, "cartBatterySingular") : t(lang, "cartBatteryPlural")})`
    : qty > 1 ? `${content.name} x ${qty}` : content.name;

  return `
    <div class="cart-summary__row">
      <span style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
            title="${label}">${label}</span>
      <span>${lineTotal.toLocaleString("sv-SE")} SEK</span>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Bind
// ─────────────────────────────────────────────────────────────────────────────

export function afterRenderBuyProduct({ lang } = {}) {
  const activeLang = lang || getStoredLanguage();
  const checkoutLink = document.querySelector("[data-vendure-checkout-link]");

  hydrateBackendCartSnapshot(activeLang);

  document.querySelectorAll(".cart-line__remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeCartItem(btn.dataset.itemId);
      rerenderCart(activeLang);
    });
  });

  document.querySelectorAll(".qty-decrease").forEach((btn) => {
    btn.addEventListener("click", () => updateCartQuantity(btn.dataset.itemId, -1, activeLang));
  });

  document.querySelectorAll(".qty-increase").forEach((btn) => {
    btn.addEventListener("click", () => updateCartQuantity(btn.dataset.itemId, +1, activeLang));
  });

  checkoutLink?.addEventListener("click", async (event) => {
    if (!isVendureCartEnabled()) {
      return;
    }

    event.preventDefault();
    if (checkoutLink.getAttribute("aria-disabled") === "true") {
      return;
    }

    await syncCartThenContinue(checkoutLink.href, checkoutLink);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function rerenderCart(lang) {
  const container = document.getElementById("page-content");
  if (!container) return;
  container.innerHTML = renderBuyProductPage({ lang, route: null });
  afterRenderBuyProduct({ lang });
}

function removeCartItem(cartItemId) {
  const cart    = JSON.parse(localStorage.getItem("cart")) || [];
  const updated = cart.filter((item) => item.cartItemId !== cartItemId);
  localStorage.setItem("cart", JSON.stringify(updated));
}

function updateCartQuantity(cartItemId, delta, lang) {
  const cart  = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex((item) => item.cartItemId === cartItemId);
  if (index < 0) return;

  const newQty = (cart[index].quantity || 1) + delta;

  if (newQty < 1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    rerenderCart(lang);
    return;
  }

  cart[index].quantity = newQty;
  localStorage.setItem("cart", JSON.stringify(cart));

  const lineTotal  = cart[index].unitPrice * newQty;
  const grandTotal = cart.reduce((sum, item) => sum + item.unitPrice * (item.quantity || 1), 0);

  const qtyEl   = document.querySelector(`.qty-value[data-item-id="${cartItemId}"]`);
  const priceEl = document.querySelector(`.cart-line__price[data-price-id="${cartItemId}"]`);
  const totalEl = document.getElementById("cart-grand-total");

  if (qtyEl)   qtyEl.innerText   = newQty;
  if (priceEl) priceEl.innerText = `${lineTotal.toLocaleString("sv-SE")} SEK`;
  if (totalEl) totalEl.innerText = `${grandTotal.toLocaleString("sv-SE")} SEK`;
}

async function syncCartThenContinue(nextUrl, checkoutLink) {
  const errorEl = document.querySelector("[data-vendure-sync-error]");
  const originalLabel = checkoutLink.textContent.trim();
  const copy = getCartCopy(getStoredLanguage());

  checkoutLink.setAttribute("aria-disabled", "true");
  checkoutLink.textContent = copy.syncing;
  hideVendureSyncError(errorEl);

  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const refresh = await refreshCartPricesFromBackend(cart);

    if (refresh.unavailable.length) {
      throw new Error("One or more products are no longer available in the backend catalog.");
    }

    if (refresh.changed) {
      localStorage.setItem("cart", JSON.stringify(refresh.updatedCart));
      setCartNotice("Prices were updated from the backend. Review the cart and continue again.");
      rerenderCart(getStoredLanguage());
      return;
    }

    await syncLocalCartToVendure(cart);
    window.location.href = nextUrl;
  } catch (error) {
    showVendureSyncError(errorEl, error.message || String(error));
    checkoutLink.removeAttribute("aria-disabled");
    checkoutLink.textContent = originalLabel;
  }
}

function showVendureSyncError(errorEl, message) {
  if (!errorEl) {
    return;
  }

  errorEl.hidden = false;
  errorEl.textContent = message;
}

function hideVendureSyncError(errorEl) {
  if (!errorEl) {
    return;
  }

  errorEl.hidden = true;
  errorEl.textContent = "";
}

async function hydrateBackendCartSnapshot(lang) {
  if (!isVendureCartEnabled()) {
    return;
  }

  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.length) return;

    const refresh = await refreshCartPricesFromBackend(cart);
    if (!refresh.changed || refresh.unavailable.length) {
      return;
    }

    localStorage.setItem("cart", JSON.stringify(refresh.updatedCart));
    setCartNotice("Prices were updated from the backend.");
    rerenderCart(lang);
  } catch (error) {
    console.warn("[commerce] Could not refresh cart prices:", error);
  }
}

function setCartNotice(message) {
  sessionStorage.setItem(CART_NOTICE_KEY, message);
}

function consumeCartNotice() {
  const notice = sessionStorage.getItem(CART_NOTICE_KEY);
  sessionStorage.removeItem(CART_NOTICE_KEY);
  return notice;
}
