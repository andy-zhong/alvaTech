/**
 * js/pages/order-confirmation.js
 * Shown after a successful order submission.
 * Reads the order number from ?order=ALV-... in the URL.
 */

export function renderOrderConfirmationPage() {
  const orderNumber = new URLSearchParams(window.location.search).get("order") || "";

  return `
    <section class="section">
      <article class="order-confirm">

        <div class="order-confirm__icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="1.6"
               stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
        </div>

        <h1 class="order-confirm__title">Order Placed</h1>

        ${orderNumber ? `
          <div class="order-confirm__number">
            <p class="order-confirm__number-label">Order Number</p>
            <p class="order-confirm__number-value">${orderNumber}</p>
          </div>
        ` : ""}

        <p class="order-confirm__message">
          Thank you — we've received your order and sent a confirmation to your email.
          Our team will be in touch shortly to confirm the details and arrange delivery.
        </p>

        <div class="order-confirm__actions">
          <a class="button button--primary"   href="/views/products.html">Continue Shopping</a>
          <a class="button button--secondary" href="/index.html">Back to Home</a>
        </div>

      </article>
    </section>`;
}