/**
 * js/pages/checkout.js
 * Checkout form: renders, validates, submits order, then redirects to confirmation.
 */
import { getProductBySlug, getProductContent } from "../services/product-service.js";
import { getStoredLanguage, t } from "../services/language-service.js";
import { getVendureActiveOrder } from "../services/vendure-client.js";
import { submitVendureGuestCheckout } from "../services/vendure-guest-checkout.js";

// Render


export function renderCheckoutPage({ lang }) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const copy = getCheckoutCopy(lang);

  if (cart.length === 0) {
    return `
      <section class="section">
        <article class="empty-state">
          <h1>${t(lang, "cartEmpty")}</h1>
          <p class="muted">${t(lang, "cartEmptyBody")}</p>
          <div class="section">
            <a class="button button--secondary" href="/views/products.html">${t(lang, "backToProducts")}</a>
          </div>
        </article>
      </section>`;
  }

  const grandTotal = cart.reduce((sum, item) => sum + item.unitPrice * (item.quantity || 1), 0);

  return `
    <section class="section">
      <div class="checkout-layout">

        <!-- LEFT: Form -->
        <div class="checkout-form-col">

          <h1 class="checkout-title">${copy.title}</h1>
          ${renderVendureOrderStatus(copy)}

          <form id="checkout-form" novalidate>

            <!-- Customer info -->
            <fieldset class="checkout-fieldset">
              <legend class="checkout-legend">${copy.contact}</legend>
              <div class="checkout-row checkout-row--2">
                <div class="field-group">
                  <label class="field-label" for="co-firstName">${copy.firstName} <span class="required">*</span></label>
                  <input class="field-input" type="text" id="co-firstName" name="firstName"
                         autocomplete="given-name" required>
                  <span class="field-error" id="err-firstName"></span>
                </div>
                <div class="field-group">
                  <label class="field-label" for="co-lastName">${copy.lastName} <span class="required">*</span></label>
                  <input class="field-input" type="text" id="co-lastName" name="lastName"
                         autocomplete="family-name" required>
                  <span class="field-error" id="err-lastName"></span>
                </div>
              </div>
              <div class="checkout-row checkout-row--2">
                <div class="field-group">
                  <label class="field-label" for="co-email">${t(lang, "checkoutEmail")} <span class="required">*</span></label>
                  <input class="field-input" type="email" id="co-email" name="email"
                         autocomplete="email" required>
                  <span class="field-error" id="err-email"></span>
                </div>
                <div class="field-group">
                  <label class="field-label" for="co-phone">${t(lang, "checkoutPhone")} <span class="required">*</span></label>
                  <input class="field-input" type="tel" id="co-phone" name="phone"
                         autocomplete="tel" required>
                  <span class="field-error" id="err-phone"></span>
                </div>
              </div>
            </fieldset>

            <!-- Delivery address -->
            <fieldset class="checkout-fieldset">
              <legend class="checkout-legend">${copy.delivery}</legend>
              <div class="field-group">
                <label class="field-label" for="co-street">${t(lang, "checkoutStreet")} <span class="required">*</span></label>
                <input class="field-input" type="text" id="co-street" name="street"
                       autocomplete="street-address" required>
                <span class="field-error" id="err-street"></span>
              </div>
              <div class="checkout-row checkout-row--3">
                <div class="field-group">
                  <label class="field-label" for="co-postalCode">${t(lang, "checkoutPostal")} <span class="required">*</span></label>
                  <input class="field-input" type="text" id="co-postalCode" name="postalCode"
                         autocomplete="postal-code" required>
                  <span class="field-error" id="err-postalCode"></span>
                </div>
                <div class="field-group" style="flex:2;">
                  <label class="field-label" for="co-city">${t(lang, "checkoutCity")} <span class="required">*</span></label>
                  <input class="field-input" type="text" id="co-city" name="city"
                         autocomplete="address-level2" required>
                  <span class="field-error" id="err-city"></span>
                </div>
              </div>
              <div class="field-group">
                <label class="field-label" for="co-country">${t(lang, "checkoutCountry")} <span class="required">*</span></label>
                <input class="field-input" type="text" id="co-country" name="country"
                       autocomplete="country-name" value="${copy.countryValue}" required>
                <span class="field-error" id="err-country"></span>
              </div>
            </fieldset>

            <!-- Notes -->
            <fieldset class="checkout-fieldset">
              <legend class="checkout-legend">${copy.additional}</legend>
              <div class="field-group">
                <label class="field-label" for="co-notes">${copy.notes}</label>
                <textarea class="field-input field-textarea" id="co-notes" name="notes"
                          rows="3" placeholder="${t(lang, "checkoutNotesPlaceholder")}"></textarea>
              </div>
            </fieldset>

            <!-- Submit -->
            <div id="form-error" class="checkout-form-error" style="display:none;"></div>

            <button class="button button--primary checkout-submit" type="submit" id="submit-btn">
              ${copy.submit}
            </button>
            <p class="checkout-legal">
              ${copy.legal}
            </p>

          </form>
        </div>

        <!-- RIGHT: Order summary -->
        <aside class="checkout-summary-col">
          <div class="checkout-summary-panel">
            <h3 class="checkout-summary-title">${t(lang, "checkoutSummary")}</h3>

            <div class="checkout-summary-items">
              ${cart.map((item) => renderSummaryItem(item, lang)).join("")}
            </div>

            <div class="checkout-summary-divider"></div>

            <div class="checkout-summary-row">
              <span>${t(lang, "checkoutSubtotal")}</span>
              <span>${grandTotal.toLocaleString("sv-SE")} SEK</span>
            </div>
            <div class="checkout-summary-row">
              <span>${t(lang, "checkoutShipping")}</span>
              <span>${copy.confirmedSeparately}</span>
            </div>
            <div class="checkout-summary-row">
              <span>${copy.vat}</span>
              <span>${copy.calculatedSeparately}</span>
            </div>
            <div class="checkout-summary-row checkout-summary-row--total">
              <span>${t(lang, "checkoutTotal")}</span>
              <span>${grandTotal.toLocaleString("sv-SE")} SEK</span>
            </div>
            <p class="checkout-summary-note">
              ${copy.summaryNote}
            </p>

            <a class="checkout-summary-edit" href="/views/buy-product.html">
              ${copy.editCart}
            </a>
          </div>
        </aside>

      </div>
    </section>`;
}

function renderSummaryItem(item, lang) {
  const copy = getCheckoutCopy(lang);
  const product = getProductBySlug(item.slug);
  const content = product ? getProductContent(product, lang || getStoredLanguage()) : null;
  const name    = content?.name || item.slug;
  const qty     = item.quantity || 1;
  const total   = (item.unitPrice * qty).toLocaleString("sv-SE");

  const meta = item.isConfigurable
    ? `${item.batteryCount} ${item.batteryCount === 1 ? copy.batterySingular : copy.batteryPlural} / ${item.capacity} kWh`
    : qty > 1 ? `x ${qty}` : "";

  return `
    <div class="checkout-summary-item">
      <div class="checkout-summary-item__info">
        <p class="checkout-summary-item__name">${name}</p>
        ${meta ? `<p class="checkout-summary-item__meta">${meta}</p>` : ""}
      </div>
      <p class="checkout-summary-item__price">${total} SEK</p>
    </div>`;
}

// Bind


export function bindCheckoutPage({ lang }) {
  const form      = document.getElementById("checkout-form");
  const submitBtn = document.getElementById("submit-btn");
  const formError = document.getElementById("form-error");
  const copy = getCheckoutCopy(lang);

  if (!form) return;

  hydrateVendureOrderStatus(copy, lang);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    clearErrors();
    if (!validateForm(lang)) return;

    // Loading state
    submitBtn.disabled    = true;
    submitBtn.textContent = copy.placingOrder;
    formError.style.display = "none";

    try {
      const payload = buildPayload(lang);

      const vendureOrder = await submitVendureGuestCheckout(payload, getLocalCart());
      localStorage.removeItem("cart");
      window.location.href = `/views/order-confirmation.html?order=${encodeURIComponent(vendureOrder.orderCode)}&source=vendure`;
      return;

    } catch (err) {
      formError.textContent  = err.message || copy.genericError;
      formError.style.display = "block";
      submitBtn.disabled    = false;
      submitBtn.textContent = copy.submit;
    }
  });

  // Clear error on input change
  form.querySelectorAll(".field-input").forEach((input) => {
    input.addEventListener("input", () => clearFieldError(input.name));
  });
}

function renderVendureOrderStatus(copy = getCheckoutCopy("en")) {
  return `
    <section class="checkout-vendure-status" data-vendure-order-status>
      <div>
        <p class="checkout-vendure-status__eyebrow">${copy.vendureEyebrow}</p>
        <p class="checkout-vendure-status__title" data-vendure-order-title>${copy.vendureChecking}</p>
      </div>
      <p class="checkout-vendure-status__meta" data-vendure-order-meta>${copy.vendureMeta}</p>
    </section>`;
}

async function hydrateVendureOrderStatus(copy = getCheckoutCopy("en"), lang = "en") {
  const status = document.querySelector("[data-vendure-order-status]");
  const title = document.querySelector("[data-vendure-order-title]");
  const meta = document.querySelector("[data-vendure-order-meta]");

  if (!status || !title || !meta) {
    return;
  }

  try {
    const data = await getVendureActiveOrder();
    const order = data.activeOrder;

    if (!order?.lines?.length) {
      status.dataset.state = "warning";
      title.textContent = copy.vendureNoOrderTitle;
      meta.textContent = copy.vendureNoOrderMeta;
      return;
    }

    status.dataset.state = "success";
    title.textContent = copy.vendureSyncedTitle(order.code);
    meta.textContent = copy.vendureSyncedMeta(
      order.lines.length,
      formatMinorUnits(order.totalWithTax, order.currencyCode, lang),
      order.state,
    );
  } catch (error) {
    status.dataset.state = "error";
    title.textContent = copy.vendureErrorTitle;
    meta.textContent = error.message || String(error);
  }
}

function formatMinorUnits(value, currencyCode, lang = "en") {
  if (typeof value !== "number" || !currencyCode) {
    return getCheckoutCopy(lang).notAvailable;
  }

  return new Intl.NumberFormat(lang === "sv" ? "sv-SE" : "en", {
    style: "currency",
    currency: currencyCode,
  }).format(value / 100);
}

// Validation


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function val(name) {
  return (document.getElementById(`co-${name}`)?.value || "").trim();
}

function validateForm(lang = getStoredLanguage()) {
  let valid = true;
  const copy = getCheckoutCopy(lang);

  const required = [
    ["firstName",  copy.required.firstName],
    ["lastName",   copy.required.lastName],
    ["email",      copy.required.email],
    ["phone",      copy.required.phone],
    ["street",     copy.required.street],
    ["postalCode", copy.required.postalCode],
    ["city",       copy.required.city],
    ["country",    copy.required.country],
  ];

  required.forEach(([name, msg]) => {
    if (!val(name)) { setFieldError(name, msg); valid = false; }
  });

  if (val("email") && !EMAIL_RE.test(val("email"))) {
    setFieldError("email", copy.invalidEmail);
    valid = false;
  }

  return valid;
}

function setFieldError(name, msg) {
  const el = document.getElementById(`err-${name}`);
  if (el) el.textContent = msg;
  document.getElementById(`co-${name}`)?.classList.add("is-invalid");
}

function clearFieldError(name) {
  const el = document.getElementById(`err-${name}`);
  if (el) el.textContent = "";
  document.getElementById(`co-${name}`)?.classList.remove("is-invalid");
}

function clearErrors() {
  document.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
  document.querySelectorAll(".field-input").forEach((el) => el.classList.remove("is-invalid"));
}

// Build API payload


function buildPayload(lang) {
  const cart = getLocalCart();

  const items = cart.map((item) => {
    const product = getProductBySlug(item.slug);
    const content = product ? getProductContent(product, "en") : null;

    return {
      slug:           item.slug,
      productName:    content?.name || item.slug,
      quantity:       item.quantity || 1,
      unitPrice:      item.unitPrice,
      isConfigurable: item.isConfigurable || false,
      batteryCount:   item.batteryCount   || null,
      capacity:       item.capacity       || null,
    };
  });

  return {
    firstName:  val("firstName"),
    lastName:   val("lastName"),
    email:      val("email"),
    phone:      val("phone"),
    company:    val("company")   || undefined,
    orgNumber:  val("orgNumber") || undefined,
    street:     val("street"),
    postalCode: val("postalCode"),
    city:       val("city"),
    country:    val("country"),
    notes:      val("notes")     || undefined,
    items,
  };
}

function getLocalCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function getCheckoutCopy(lang) {
  const copies = {
    en: {
      title: "Checkout",
      contact: "Contact Information",
      firstName: "First Name",
      lastName: "Last Name",
      delivery: "Delivery Address",
      additional: "Additional Information",
      notes: "Delivery Notes (Optional)",
      submit: "Place Order",
      legal: "No payment is charged now. Our team will contact you to confirm your order and arrange delivery and payment.",
      countryValue: "Sweden",
      confirmedSeparately: "Confirmed separately",
      calculatedSeparately: "Calculated separately",
      vat: "VAT",
      summaryNote: "Shipping and VAT calculated separately.",
      editCart: "Edit cart",
      vendureEyebrow: "Vendure order",
      vendureChecking: "Checking active order...",
      vendureMeta: "Syncing with the commerce backend.",
      placingOrder: "Placing order...",
      genericError: "Something went wrong. Please try again.",
      notAvailable: "n/a",
      batterySingular: "battery module",
      batteryPlural: "battery modules",
      vendureNoOrderTitle: "No active Vendure order found",
      vendureNoOrderMeta: "Return to the cart and continue again to sync the order.",
      vendureErrorTitle: "Vendure order check failed",
      vendureSyncedTitle: (code) => `Order ${code} is synced`,
      vendureSyncedMeta: (count, total, state) => `${count} line${count === 1 ? "" : "s"} - ${total} - ${state}`,
      required: {
        firstName: "First name is required",
        lastName: "Last name is required",
        email: "Email is required",
        phone: "Phone number is required",
        street: "Street address is required",
        postalCode: "Postal code is required",
        city: "City is required",
        country: "Country is required",
      },
      invalidEmail: "Please enter a valid email address",
    },
    sv: {
      title: "Kassa",
      contact: "Kontaktuppgifter",
      firstName: "Förnamn",
      lastName: "Efternamn",
      delivery: "Leveransadress",
      additional: "Ytterligare information",
      notes: "Leveransnoteringar (valfritt)",
      submit: "Lägg order",
      legal: "Ingen betalning debiteras nu. Vårt team kontaktar dig för att bekräfta ordern och ordna leverans och betalning.",
      countryValue: "Sverige",
      confirmedSeparately: "Bekräftas separat",
      calculatedSeparately: "Beräknas separat",
      vat: "Moms",
      summaryNote: "Frakt och moms beräknas separat.",
      editCart: "Ändra varukorg",
      vendureEyebrow: "Vendure-order",
      vendureChecking: "Kontrollerar aktiv order...",
      vendureMeta: "Synkar med handelsbackend.",
      placingOrder: "Lägger order...",
      genericError: "Något gick fel. Försök igen.",
      notAvailable: "ej tillgängligt",
      batterySingular: "batterimodul",
      batteryPlural: "batterimoduler",
      vendureNoOrderTitle: "Ingen aktiv Vendure-order hittades",
      vendureNoOrderMeta: "Gå tillbaka till varukorgen och fortsätt igen för att synka ordern.",
      vendureErrorTitle: "Kontroll av Vendure-order misslyckades",
      vendureSyncedTitle: (code) => `Order ${code} är synkad`,
      vendureSyncedMeta: (count, total, state) => `${count} rad${count === 1 ? "" : "er"} - ${total} - ${state}`,
      required: {
        firstName: "Förnamn krävs",
        lastName: "Efternamn krävs",
        email: "E-post krävs",
        phone: "Telefonnummer krävs",
        street: "Gatuadress krävs",
        postalCode: "Postnummer krävs",
        city: "Ort krävs",
        country: "Land krävs",
      },
      invalidEmail: "Ange en giltig e-postadress",
    },
  };

  return copies[lang] ?? copies.en;
}
