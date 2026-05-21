/**
 * js/pages/checkout.js
 * Checkout form: renders, validates, submits order, then redirects to confirmation.
 */
import { getProductBySlug, getProductContent } from "../services/product-service.js";
import { getStoredLanguage } from "../services/language-service.js";

// ─────────────────────────────────────────────────────────────────────────────
// Render
// ─────────────────────────────────────────────────────────────────────────────

export function renderCheckoutPage({ lang }) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    return `
      <section class="section">
        <article class="empty-state">
          <h1>Your cart is empty</h1>
          <p class="muted">Add a product before proceeding to checkout.</p>
          <div class="section">
            <a class="button button--secondary" href="/views/products.html">Back to Products</a>
          </div>
        </article>
      </section>`;
  }

  const grandTotal = cart.reduce((sum, item) => sum + item.unitPrice * (item.quantity || 1), 0);

  return `
    <section class="section">
      <div class="checkout-layout">

        <!-- ── LEFT: Form ── -->
        <div class="checkout-form-col">

          <h1 class="checkout-title">Checkout</h1>

          <form id="checkout-form" novalidate>

            <!-- Customer info -->
            <fieldset class="checkout-fieldset">
              <legend class="checkout-legend">Contact Information</legend>
              <div class="checkout-row checkout-row--2">
                <div class="field-group">
                  <label class="field-label" for="co-firstName">First Name <span class="required">*</span></label>
                  <input class="field-input" type="text" id="co-firstName" name="firstName"
                         autocomplete="given-name" required>
                  <span class="field-error" id="err-firstName"></span>
                </div>
                <div class="field-group">
                  <label class="field-label" for="co-lastName">Last Name <span class="required">*</span></label>
                  <input class="field-input" type="text" id="co-lastName" name="lastName"
                         autocomplete="family-name" required>
                  <span class="field-error" id="err-lastName"></span>
                </div>
              </div>
              <div class="checkout-row checkout-row--2">
                <div class="field-group">
                  <label class="field-label" for="co-email">Email <span class="required">*</span></label>
                  <input class="field-input" type="email" id="co-email" name="email"
                         autocomplete="email" required>
                  <span class="field-error" id="err-email"></span>
                </div>
                <div class="field-group">
                  <label class="field-label" for="co-phone">Phone <span class="required">*</span></label>
                  <input class="field-input" type="tel" id="co-phone" name="phone"
                         autocomplete="tel" required>
                  <span class="field-error" id="err-phone"></span>
                </div>
              </div>
            </fieldset>

            <!-- Delivery address -->
            <fieldset class="checkout-fieldset">
              <legend class="checkout-legend">Delivery Address</legend>
              <div class="field-group">
                <label class="field-label" for="co-street">Street Address <span class="required">*</span></label>
                <input class="field-input" type="text" id="co-street" name="street"
                       autocomplete="street-address" required>
                <span class="field-error" id="err-street"></span>
              </div>
              <div class="checkout-row checkout-row--3">
                <div class="field-group">
                  <label class="field-label" for="co-postalCode">Postal Code <span class="required">*</span></label>
                  <input class="field-input" type="text" id="co-postalCode" name="postalCode"
                         autocomplete="postal-code" required>
                  <span class="field-error" id="err-postalCode"></span>
                </div>
                <div class="field-group" style="flex:2;">
                  <label class="field-label" for="co-city">City <span class="required">*</span></label>
                  <input class="field-input" type="text" id="co-city" name="city"
                         autocomplete="address-level2" required>
                  <span class="field-error" id="err-city"></span>
                </div>
              </div>
              <div class="field-group">
                <label class="field-label" for="co-country">Country <span class="required">*</span></label>
                <input class="field-input" type="text" id="co-country" name="country"
                       autocomplete="country-name" value="Sweden" required>
                <span class="field-error" id="err-country"></span>
              </div>
            </fieldset>

            <!-- Notes -->
            <fieldset class="checkout-fieldset">
              <legend class="checkout-legend">Additional Information</legend>
              <div class="field-group">
                <label class="field-label" for="co-notes">Delivery Notes (Optional)</label>
                <textarea class="field-input field-textarea" id="co-notes" name="notes"
                          rows="3" placeholder="Access codes, delivery preferences, installation notes..."></textarea>
              </div>
            </fieldset>

            <!-- Submit -->
            <div id="form-error" class="checkout-form-error" style="display:none;"></div>

            <button class="button button--primary checkout-submit" type="submit" id="submit-btn">
              Place Order
            </button>
            <p class="checkout-legal">
              No payment is charged now. Our team will contact you to confirm your order
              and arrange delivery and payment.
            </p>

          </form>
        </div>

        <!-- ── RIGHT: Order summary ── -->
        <aside class="checkout-summary-col">
          <div class="checkout-summary-panel">
            <h3 class="checkout-summary-title">Order Summary</h3>

            <div class="checkout-summary-items">
              ${cart.map((item) => renderSummaryItem(item, lang)).join("")}
            </div>

            <div class="checkout-summary-divider"></div>

            <div class="checkout-summary-row">
              <span>Subtotal</span>
              <span>${grandTotal.toLocaleString("sv-SE")} SEK</span>
            </div>
            <div class="checkout-summary-row">
              <span>Shipping</span>
              <span>Confirmed separately</span>
            </div>
            <div class="checkout-summary-row">
              <span>VAT</span>
              <span>Calculated separately</span>
            </div>
            <div class="checkout-summary-row checkout-summary-row--total">
              <span>Total</span>
              <span>${grandTotal.toLocaleString("sv-SE")} SEK</span>
            </div>
            <p class="checkout-summary-note">
              Shipping and VAT calculated separately.
            </p>

            <a class="checkout-summary-edit" href="/views/buy-product.html">
              Edit cart
            </a>
          </div>
        </aside>

      </div>
    </section>`;
}

function renderSummaryItem(item, lang) {
  const product = getProductBySlug(item.slug);
  const content = product ? getProductContent(product, lang || getStoredLanguage()) : null;
  const name    = content?.name || item.slug;
  const qty     = item.quantity || 1;
  const total   = (item.unitPrice * qty).toLocaleString("sv-SE");

  const meta = item.isConfigurable
    ? `${item.batteryCount} battery module${item.batteryCount === 1 ? "" : "s"} / ${item.capacity} kWh`
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

// ─────────────────────────────────────────────────────────────────────────────
// Bind (called by bootstrap after HTML is injected)
// ─────────────────────────────────────────────────────────────────────────────

export function bindCheckoutPage({ lang }) {
  const form      = document.getElementById("checkout-form");
  const submitBtn = document.getElementById("submit-btn");
  const formError = document.getElementById("form-error");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    clearErrors();
    if (!validateForm()) return;

    // Loading state
    submitBtn.disabled    = true;
    submitBtn.textContent = "Placing order...";
    formError.style.display = "none";

    try {
      const payload = buildPayload(lang);
      const res     = await fetch("/api/orders", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Server returned field-level errors
        if (data.fields) {
          Object.entries(data.fields).forEach(([field, msg]) => setFieldError(field, msg));
        }
        throw new Error(data.error || "Order failed");
      }

      // Success — clear cart and go to confirmation
      localStorage.removeItem("cart");
      window.location.href = `/views/order-confirmation.html?order=${encodeURIComponent(data.orderNumber)}`;

    } catch (err) {
      formError.textContent  = err.message || "Something went wrong. Please try again.";
      formError.style.display = "block";
      submitBtn.disabled    = false;
      submitBtn.textContent = "Place Order";
    }
  });

  // Clear error on input change
  form.querySelectorAll(".field-input").forEach((input) => {
    input.addEventListener("input", () => clearFieldError(input.name));
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function val(name) {
  return (document.getElementById(`co-${name}`)?.value || "").trim();
}

function validateForm() {
  let valid = true;

  const required = [
    ["firstName",  "First name is required"],
    ["lastName",   "Last name is required"],
    ["email",      "Email is required"],
    ["phone",      "Phone number is required"],
    ["street",     "Street address is required"],
    ["postalCode", "Postal code is required"],
    ["city",       "City is required"],
    ["country",    "Country is required"],
  ];

  required.forEach(([name, msg]) => {
    if (!val(name)) { setFieldError(name, msg); valid = false; }
  });

  if (val("email") && !EMAIL_RE.test(val("email"))) {
    setFieldError("email", "Please enter a valid email address");
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

// ─────────────────────────────────────────────────────────────────────────────
// Build API payload
// ─────────────────────────────────────────────────────────────────────────────

function buildPayload(lang) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

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
