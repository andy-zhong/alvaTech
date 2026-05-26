const STRIPE_JS_SRC = "https://js.stripe.com/v3/";

let stripeJsPromise;
let stripeInstancePromise;

export function getStripePublishableKey() {
  const key = window.ALVA_STRIPE_PUBLISHABLE_KEY;
  return typeof key === "string" ? key.trim() : "";
}

export function isStripeCheckoutConfigured() {
  return /^pk_(test|live)_/.test(getStripePublishableKey());
}

export async function createStripePaymentElement(clientSecret, mountSelector) {
  const stripe = await getStripeInstance();
  const elements = stripe.elements({ clientSecret });
  const paymentElement = elements.create("payment");
  const mount = document.querySelector(mountSelector);

  if (!mount) {
    throw new Error("Payment form container was not found.");
  }

  mount.innerHTML = "";
  paymentElement.mount(mount);

  return { stripe, elements, paymentElement };
}

export async function confirmStripePayment({ stripe, elements, returnUrl }) {
  if (!stripe || !elements) {
    throw new Error("Payment form is not ready yet.");
  }

  return stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: returnUrl,
    },
  });
}

async function getStripeInstance() {
  if (!stripeInstancePromise) {
    stripeInstancePromise = loadStripeJs().then(() => {
      const key = getStripePublishableKey();

      if (!key) {
        throw new Error("Stripe publishable key is not configured.");
      }

      return window.Stripe(key);
    });
  }

  return stripeInstancePromise;
}

function loadStripeJs() {
  if (window.Stripe) {
    return Promise.resolve();
  }

  if (!stripeJsPromise) {
    stripeJsPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = STRIPE_JS_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Stripe.js could not be loaded."));
      document.head.appendChild(script);
    });
  }

  return stripeJsPromise;
}
