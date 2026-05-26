/**
 * js/pages/checkout.js
 * Checkout form: renders, validates, submits order, then redirects to confirmation.
 */
import { getProductBySlug, getProductContent } from "../services/product-service.js";
import { getStoredLanguage, t } from "../services/language-service.js";
import { createVendureStripePaymentIntent, getVendureActiveOrder } from "../services/vendure-client.js";
import { prepareVendureGuestCheckoutForPayment, submitVendureGuestCheckout } from "../services/vendure-guest-checkout.js";
import { refreshCartPricesFromBackend } from "../services/commerce-catalog.js";
import {
  confirmStripePayment,
  createStripePaymentElement,
  isStripeCheckoutConfigured,
} from "../services/stripe-checkout.js";

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

            ${renderPaymentSection(copy)}

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

            <div class="checkout-summary-items" data-checkout-summary-items>
              ${cart.map((item) => renderSummaryItem(item, lang)).join("")}
            </div>

            <div class="checkout-summary-divider"></div>

            <div class="checkout-summary-row">
              <span>${t(lang, "checkoutSubtotal")}</span>
              <span data-checkout-subtotal>${grandTotal.toLocaleString("sv-SE")} SEK</span>
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
              <span data-checkout-total>${grandTotal.toLocaleString("sv-SE")} SEK</span>
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
  const paymentSection = document.querySelector("[data-stripe-payment-section]");
  const paymentMount = document.querySelector("[data-stripe-payment-element]");
  const paymentStatus = document.querySelector("[data-stripe-payment-status]");
  let stripePayment = null;
  let stripeOrder = null;

  if (!form) return;

  hydrateVendureOrderStatus(copy, lang);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    clearErrors();
    formError.style.display = "none";

    if (stripePayment) {
      submitBtn.disabled = true;
      submitBtn.textContent = copy.confirmingPayment;

      try {
        sessionStorage.setItem("alvaPendingStripeOrder", stripeOrder?.orderCode || "");
        const result = await confirmStripePayment({
          ...stripePayment,
          returnUrl: buildStripeReturnUrl(stripeOrder?.orderCode),
        });

        if (result?.error) {
          throw new Error(result.error.message || copy.paymentError);
        }
      } catch (err) {
        console.warn("[checkout] Stripe payment confirmation failed:", err);
        formError.textContent = getFriendlyCheckoutError(err, copy.paymentError, copy);
        formError.style.display = "block";
        submitBtn.disabled = false;
        submitBtn.textContent = copy.payNow;
      }

      return;
    }

    if (!validateForm(lang)) {
      formError.textContent = copy.requiredSummary;
      formError.style.display = "block";
      focusFirstInvalidCheckoutField();
      return;
    }

    // Loading state
    submitBtn.disabled    = true;
    submitBtn.textContent = copy.placingOrder;
    formError.style.display = "none";

    try {
      const cartRefresh = await refreshCartPricesFromBackend(getLocalCart());

      if (cartRefresh.unavailable.length) {
        throw new Error(copy.unavailableError);
      }

      if (cartRefresh.changed) {
        localStorage.setItem("cart", JSON.stringify(cartRefresh.updatedCart));
        renderUpdatedSummary(cartRefresh.updatedCart, lang);
        showPriceReviewNotice(formError, cartRefresh, copy, lang);
        submitBtn.disabled = false;
        submitBtn.textContent = copy.reviewedSubmit;
        return;
      }

      const payload = buildPayload(lang);

      if (isStripeCheckoutConfigured()) {
        const preparedOrder = await prepareVendureGuestCheckoutForPayment(payload, getLocalCart());
        const intentData = await createVendureStripePaymentIntent();
        const clientSecret = intentData.createStripePaymentIntent;

        stripePayment = await createStripePaymentElement(clientSecret, "[data-stripe-payment-element]");
        stripeOrder = preparedOrder;

        if (paymentSection) paymentSection.hidden = false;
        if (paymentStatus) paymentStatus.textContent = copy.paymentReady;
        paymentMount?.scrollIntoView({ behavior: "smooth", block: "center" });
        setCheckoutFieldsDisabled(true);
        submitBtn.disabled = false;
        submitBtn.textContent = copy.payNow;
        return;
      }

      const vendureOrder = await submitVendureGuestCheckout(payload, getLocalCart());
      localStorage.removeItem("cart");
      window.location.href = `/views/order-confirmation.html?order=${encodeURIComponent(vendureOrder.orderCode)}&source=vendure`;
      return;

    } catch (err) {
      console.warn("[checkout] Submission failed:", err);
      showFormError(formError, getFriendlyCheckoutError(err, copy.genericError, copy));
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

function renderPaymentSection(copy = getCheckoutCopy("en")) {
  return `
    <section class="checkout-payment" data-stripe-payment-section hidden>
      <div class="checkout-payment__header">
        <p class="checkout-payment__eyebrow">${copy.paymentEyebrow}</p>
        <h2 class="checkout-payment__title">${copy.paymentTitle}</h2>
        <p class="checkout-payment__secure">${copy.paymentSecurity}</p>
      </div>
      <div class="checkout-payment__methods" aria-label="${copy.paymentMethodsLabel}">
        <div class="checkout-payment-method">
          <p class="checkout-payment-method__title">${copy.cardPaymentTitle}</p>
          <p class="checkout-payment-method__helper">${copy.cardPaymentHelper}</p>
        </div>
        <p class="checkout-payment__klarna">${copy.klarnaAvailability}</p>
      </div>
      <p class="checkout-payment__status" data-stripe-payment-status>${copy.paymentPreparing}</p>
      <div class="checkout-payment__element" data-stripe-payment-element></div>
    </section>`;
}

function buildStripeReturnUrl(orderCode) {
  const url = new URL("/views/order-confirmation.html", window.location.origin);
  if (orderCode) url.searchParams.set("order", orderCode);
  url.searchParams.set("source", "stripe");
  return url.toString();
}

function setCheckoutFieldsDisabled(disabled) {
  document.querySelectorAll("#checkout-form .field-input").forEach((field) => {
    field.disabled = disabled;
  });
}

function renderUpdatedSummary(cart, lang) {
  const itemsEl = document.querySelector("[data-checkout-summary-items]");
  const subtotalEl = document.querySelector("[data-checkout-subtotal]");
  const totalEl = document.querySelector("[data-checkout-total]");
  const grandTotal = cart.reduce((sum, item) => sum + item.unitPrice * (item.quantity || 1), 0);
  const formattedTotal = `${grandTotal.toLocaleString("sv-SE")} SEK`;

  if (itemsEl) {
    itemsEl.innerHTML = cart.map((item) => renderSummaryItem(item, lang)).join("");
  }
  if (subtotalEl) subtotalEl.textContent = formattedTotal;
  if (totalEl) totalEl.textContent = formattedTotal;
}

function showPriceReviewNotice(formError, cartRefresh, copy, lang) {
  const changes = cartRefresh.changes
    .map((change) => {
      const item = cartRefresh.updatedCart.find((cartItem) => cartItem.slug === change.slug);
      const product = getProductBySlug(change.slug);
      const content = product ? getProductContent(product, lang || getStoredLanguage()) : null;
      const name = content?.name || item?.productName || change.slug;
      return `<li><strong>${name}</strong>: ${formatSek(change.from)} -> ${formatSek(change.to)}</li>`;
    })
    .join("");

  formError.dataset.state = "warning";
  formError.innerHTML = `
    <strong>${copy.priceReviewTitle}</strong>
    <span>${copy.priceReviewBody}</span>
    ${changes ? `<ul class="checkout-price-review__list">${changes}</ul>` : ""}
  `;
  formError.style.display = "block";
  formError.style.position = "relative";
  formError.style.zIndex = "2";
  setTimeout(() => formError.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
}

function showFormError(formError, message) {
  formError.removeAttribute("data-state");
  formError.removeAttribute("style");
  formError.textContent = message;
  formError.style.display = "block";
}

function getFriendlyCheckoutError(error, fallback, copy = getCheckoutCopy(getStoredLanguage())) {
  const message = error?.message || String(error || "");

  if (/Order contents may only be modified when in the "AddingItems" state/i.test(message)) {
    return copy.orderLockedError;
  }

  return message || fallback;
}

function formatSek(value) {
  return `${Number(value || 0).toLocaleString("sv-SE")} SEK`;
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
    console.warn("[vendure] Active order status check failed:", error);
    status.dataset.state = "error";
    title.textContent = copy.vendureErrorTitle;
    meta.textContent = copy.genericError;
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

function focusFirstInvalidCheckoutField() {
  document.querySelector(".field-input.is-invalid")?.focus();
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
      title: "Request a confirmed offer",
      contact: "Contact information",
      firstName: "First name",
      lastName: "Last name",
      delivery: "Delivery address",
      additional: "Additional information",
      notes: "Delivery notes (optional)",
      submit: "Submit order request",
      legal: "No payment is charged now. Alva will confirm price, availability and delivery window before payment is arranged.",
      countryValue: "Sweden",
      confirmedSeparately: "Confirmed separately",
      calculatedSeparately: "Calculated separately",
      vat: "VAT",
      summaryNote: "Shipping and VAT calculated separately.",
      editCart: "Edit cart",
      vendureEyebrow: "Order request",
      vendureChecking: "Checking selected products...",
      vendureMeta: "Confirming current backend catalog data.",
      placingOrder: "Submitting request...",
      genericError: "We could not submit the request right now. Please review the form and try again.",
      requiredSummary: "Please complete all required contact and delivery fields before submitting your order request.",
      priceChangedError: "Prices were updated from the backend. Return to the cart and review before continuing.",
      unavailableError: "One or more products are no longer available. Return to the cart and adjust your request.",
      priceReviewTitle: "Review updated catalog pricing",
      priceReviewBody: "No payment has started. We refreshed the cart from Alva's current backend catalog before payment so you can review the exact price first. Continue only if the updated price looks correct.",
      reviewedSubmit: "Continue with updated prices",
      paymentEyebrow: "Secure payment",
      paymentTitle: "Payment",
      paymentSecurity: "Secure payment powered by Stripe. Alva does not store card details.",
      paymentMethodsLabel: "Payment methods",
      cardPaymentTitle: "Card payment",
      cardPaymentHelper: "Visa, Mastercard and selected debit cards.",
      klarnaAvailability: "Klarna is shown when available for your country and order.",
      paymentPreparing: "Preparing secure payment...",
      paymentReady: "Your details are locked for this payment attempt. Complete payment below.",
      payNow: "Pay securely",
      confirmingPayment: "Confirming payment...",
      paymentError: "The payment could not be confirmed. Review the payment details and try again.",
      orderLockedError: "This order is already in checkout. Continue payment or start a new cart.",
      notAvailable: "n/a",
      batterySingular: "battery module",
      batteryPlural: "battery modules",
      vendureNoOrderTitle: "Selected products are not synced yet",
      vendureNoOrderMeta: "Return to the cart and continue again so the request can be prepared.",
      vendureErrorTitle: "Product check failed",
      vendureSyncedTitle: (code) => `Request ${code} is prepared`,
      vendureSyncedMeta: (count, total, state) => `${count} line${count === 1 ? "" : "s"} - ${total} - ${state}`,
      required: {
        firstName: "Enter your first name.",
        lastName: "Enter your last name.",
        email: "Enter your email address.",
        phone: "Enter your phone number.",
        street: "Enter the delivery street address.",
        postalCode: "Enter the postal code.",
        city: "Enter the city.",
        country: "Enter the country.",
      },
      invalidEmail: "Enter a valid email address.",
    },
    sv: {
      title: "Begär bekräftad offert",
      contact: "Kontaktuppgifter",
      firstName: "Förnamn",
      lastName: "Efternamn",
      delivery: "Leveransadress",
      additional: "Ytterligare information",
      notes: "Leveransnoteringar (valfritt)",
      submit: "Skicka orderförfrågan",
      legal: "Ingen betalning debiteras nu. Alva bekräftar pris, tillgänglighet och leveransfönster innan betalning ordnas.",
      countryValue: "Sverige",
      confirmedSeparately: "Bekräftas separat",
      calculatedSeparately: "Beräknas separat",
      vat: "Moms",
      summaryNote: "Frakt och moms beräknas separat.",
      editCart: "Ändra varukorg",
      vendureEyebrow: "Orderförfrågan",
      vendureChecking: "Kontrollerar valda produkter...",
      vendureMeta: "Bekräftar aktuell katalogdata från backend.",
      placingOrder: "Skickar förfrågan...",
      genericError: "Vi kunde inte skicka förfrågan just nu. Granska formuläret och försök igen.",
      requiredSummary: "Fyll i alla obligatoriska kontakt- och leveransuppgifter innan du skickar orderförfrågan.",
      priceChangedError: "Priserna har uppdaterats från backend. Gå tillbaka till varukorgen och granska innan du fortsätter.",
      unavailableError: "En eller flera produkter är inte längre tillgängliga. Gå tillbaka till varukorgen och justera din förfrågan.",
      priceReviewTitle: "Granska uppdaterat katalogpris",
      priceReviewBody: "Ingen betalning har startats. Vi har hämtat aktuellt pris från Alvas backend-katalog före betalning så att du kan granska exakt pris först. Fortsätt bara om det uppdaterade priset ser rätt ut.",
      reviewedSubmit: "Fortsätt med uppdaterade priser",
      paymentEyebrow: "Säker betalning",
      paymentTitle: "Betalning",
      paymentSecurity: "Säker betalning via Stripe. Alva lagrar inte kortuppgifter.",
      paymentMethodsLabel: "Betalmetoder",
      cardPaymentTitle: "Kortbetalning",
      cardPaymentHelper: "Visa, Mastercard och utvalda betalkort.",
      klarnaAvailability: "Klarna visas när det är tillgängligt för ditt land och din beställning.",
      paymentPreparing: "Förbereder säker betalning...",
      paymentReady: "Uppgifterna är låsta för detta betalningsförsök. Slutför betalningen nedan.",
      payNow: "Betala säkert",
      confirmingPayment: "Bekräftar betalning...",
      paymentError: "Betalningen kunde inte bekräftas. Kontrollera betalningsuppgifterna och försök igen.",
      orderLockedError: "Den här beställningen är redan i kassan. Fortsätt betalningen eller börja med en ny varukorg.",
      notAvailable: "ej tillgängligt",
      batterySingular: "batterimodul",
      batteryPlural: "batterimoduler",
      vendureNoOrderTitle: "Valda produkter är inte synkade ännu",
      vendureNoOrderMeta: "Gå tillbaka till varukorgen och fortsätt igen så att förfrågan kan förberedas.",
      vendureErrorTitle: "Produktkontrollen misslyckades",
      vendureSyncedTitle: (code) => `Förfrågan ${code} är förberedd`,
      vendureSyncedMeta: (count, total, state) => `${count} rad${count === 1 ? "" : "er"} - ${total} - ${state}`,
      required: {
        firstName: "Ange förnamn.",
        lastName: "Ange efternamn.",
        email: "Ange e-postadress.",
        phone: "Ange telefonnummer.",
        street: "Ange leveransadress.",
        postalCode: "Ange postnummer.",
        city: "Ange ort.",
        country: "Ange land.",
      },
      invalidEmail: "Ange en giltig e-postadress.",
    },
  };

  return copies[lang] ?? copies.en;
}
