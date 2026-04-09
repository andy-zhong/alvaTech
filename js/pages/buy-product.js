import { getProductBySlug, getProductContent } from "../services/product-service.js";
import { t } from "../services/language-service.js";
import { renderMissingProduct } from "./product-detail.js";

export function renderBuyProductPage({ lang, slug, route }) {
  const product = getProductBySlug(slug);
  if (!product) {
    return renderMissingProduct({ lang, route });
  }

  const content = getProductContent(product, lang);

  return `
    <section class="checkout-layout">
      <div class="checkout-stack">
        <article class="checkout-product">
          <img src="${product.heroImage}" alt="${content.name}">
          <div class="checkout-product__body">
            <span class="eyebrow">${t(lang, "checkoutEyebrow")}</span>
            <div class="checkout-product__meta">${product.price}</div>
            <h1>${content.name}</h1>
            <p>${content.summary}</p>
          </div>
        </article>

        <article class="checkout-card">
          <div class="section-head">
            <h2>${t(lang, "checkoutCustomer")}</h2>
          </div>
          <form class="form-grid">
            <div class="form-field">
              <label for="customer-name">${t(lang, "checkoutContactName")}</label>
              <input class="input" id="customer-name" name="customer-name" type="text">
            </div>
            <div class="form-field">
              <label for="customer-email">${t(lang, "checkoutEmail")}</label>
              <input class="input" id="customer-email" name="customer-email" type="email">
            </div>
            <div class="form-field">
              <label for="customer-phone">${t(lang, "checkoutPhone")}</label>
              <input class="input" id="customer-phone" name="customer-phone" type="tel">
            </div>
            <div class="form-field">
              <label for="customer-company">${t(lang, "checkoutCompany")}</label>
              <input class="input" id="customer-company" name="customer-company" type="text">
            </div>
            <div class="form-field form-field--full">
              <label for="customer-street">${t(lang, "checkoutStreet")}</label>
              <input class="input" id="customer-street" name="customer-street" type="text">
            </div>
            <div class="form-field">
              <label for="customer-postal">${t(lang, "checkoutPostal")}</label>
              <input class="input" id="customer-postal" name="customer-postal" type="text">
            </div>
            <div class="form-field">
              <label for="customer-city">${t(lang, "checkoutCity")}</label>
              <input class="input" id="customer-city" name="customer-city" type="text">
            </div>
            <div class="form-field">
              <label for="customer-country">${t(lang, "checkoutCountry")}</label>
              <input class="input" id="customer-country" name="customer-country" type="text" placeholder="${t(lang, "checkoutCountryPlaceholder")}">
            </div>
            <div class="form-field form-field--full">
              <label for="customer-notes">${t(lang, "checkoutNotes")}</label>
              <textarea class="textarea" id="customer-notes" name="customer-notes" placeholder="${t(lang, "checkoutNotesPlaceholder")}"></textarea>
            </div>
          </form>
        </article>

        <article class="checkout-card">
          <div class="section-head">
            <h2>${t(lang, "checkoutPayment")}</h2>
          </div>
          <div class="payment-options">
            ${renderPaymentOption(lang, "paymentStripe", "paymentStripeBody")}
            ${renderPaymentOption(lang, "paymentKlarna", "paymentKlarnaBody")}
            ${renderPaymentOption(lang, "paymentCards", "paymentCardsBody")}
          </div>
        </article>
      </div>

      <aside class="checkout-stack">
        <article class="checkout-card checkout-summary">
          <span class="eyebrow">${t(lang, "checkoutSummary")}</span>
          <h1>${t(lang, "checkoutTitle")}</h1>
          <p>${t(lang, "checkoutBody")}</p>

          <div class="section">
            <h2 class="section-title">${t(lang, "checkoutProduct")}</h2>
            <ul class="summary-list">
              <li><span>${content.name}</span><strong>${product.price}</strong></li>
            </ul>
          </div>

          <div class="section">
            <h2 class="section-title">${t(lang, "checkoutQuantity")}</h2>
            <div class="qty-stepper" data-qty-stepper>
              <button type="button" data-qty-change="-1" aria-label="${t(lang, "decreaseQuantity")}">-</button>
              <span class="qty-value" data-qty-value>1</span>
              <button type="button" data-qty-change="1" aria-label="${t(lang, "increaseQuantity")}">+</button>
            </div>
          </div>

          <div class="section">
            <ul class="summary-list">
              <li><span>${t(lang, "checkoutSubtotal")}</span><strong>${product.price}</strong></li>
              <li><span>${t(lang, "checkoutShipping")}</span><strong>${t(lang, "checkoutShippingPending")}</strong></li>
              <li><span>${t(lang, "checkoutTax")}</span><strong>${t(lang, "checkoutTaxPending")}</strong></li>
              <li><span>${t(lang, "checkoutTotal")}</span><strong>${product.price}</strong></li>
            </ul>
          </div>

          <div class="checkout-note">
            ${t(lang, "checkoutLegal")}
          </div>

          <div class="section">
            <button class="button button--primary button--wide" type="button">${t(lang, "checkoutSubmit")}</button>
          </div>
        </article>
      </aside>
    </section>
  `;
}

function renderPaymentOption(lang, titleKey, bodyKey) {
  return `
    <article class="payment-option">
      <div class="payment-option__title">
        <span>${t(lang, titleKey)}</span>
        <span class="pill">${t(lang, "paymentPending")}</span>
      </div>
      <p>${t(lang, bodyKey)}</p>
    </article>
  `;
}

export function bindBuyProductPage() {
  const stepper = document.querySelector("[data-qty-stepper]");
  if (!stepper) return;

  const valueNode = stepper.querySelector("[data-qty-value]");
  let value = 1;

  stepper.querySelectorAll("[data-qty-change]").forEach((button) => {
    button.addEventListener("click", () => {
      value = Math.max(1, value + Number(button.dataset.qtyChange));
      valueNode.textContent = String(value);
    });
  });
}
