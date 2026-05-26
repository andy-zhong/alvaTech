import {
  addVendurePaymentToOrder,
  getVendureActiveOrder,
  getVendureEligibleShippingMethods,
  setVendureCustomerForOrder,
  setVendureOrderBillingAddress,
  setVendureOrderCustomFields,
  setVendureOrderShippingAddress,
  setVendureOrderShippingMethod,
  transitionVendureOrderToState,
} from "./vendure-client.js";
import { clearVendureCartSyncSignature, syncLocalCartToVendure } from "./vendure-cart-sync.js";

const DEFAULT_PAYMENT_METHOD = "standard-payment";

const COUNTRY_CODES = {
  sweden: "SE",
  sverige: "SE",
  se: "SE",
  norway: "NO",
  norge: "NO",
  no: "NO",
  denmark: "DK",
  danmark: "DK",
  dk: "DK",
  finland: "FI",
  suomi: "FI",
  fi: "FI",
  italy: "IT",
  italia: "IT",
  it: "IT",
};

export async function submitVendureGuestCheckout(payload, cart = []) {
  try {
    return await runVendureGuestCheckout(payload, cart);
  } catch (error) {
    if (!isNoActiveOrderMessage(error)) {
      throw error;
    }

    clearVendureCartSyncSignature();
    await syncLocalCartToVendure(cart);
    return runVendureGuestCheckout(payload, cart);
  }
}

export async function prepareVendureGuestCheckoutForPayment(payload, cart = []) {
  try {
    return await runVendureGuestCheckoutPreparation(payload, cart);
  } catch (error) {
    if (!isNoActiveOrderMessage(error)) {
      throw error;
    }

    clearVendureCartSyncSignature();
    await syncLocalCartToVendure(cart);
    return runVendureGuestCheckoutPreparation(payload, cart);
  }
}

async function runVendureGuestCheckout(payload, cart) {
  const preparedOrder = await runVendureGuestCheckoutPreparation(payload, cart);
  const paymentOrder = await authorizePayment(cart);

  clearVendureCartSyncSignature();

  return {
    orderCode: paymentOrder.code,
    orderState: paymentOrder.state,
    preparedOrder,
  };
}

async function runVendureGuestCheckoutPreparation(payload, cart) {
  const activeOrder = await ensureActiveOrder(cart);

  await assertOrderHasLines(activeOrder);
  await applyCustomer(payload, cart);
  await applyAddresses(payload, cart);
  await applyCustomerNote(payload, cart);
  await applyFirstEligibleShippingMethod(cart);
  const preparedOrder = await transitionOrderToPaymentState(cart);

  return {
    orderCode: preparedOrder.code,
    orderState: preparedOrder.state,
  };
}

async function applyCustomerNote(payload, cart) {
  const note = String(payload.notes || "").trim();

  if (!note) {
    return;
  }

  assertNoVendureError(
    await withActiveOrderRecovery("setOrderCustomFields", cart, () => setVendureOrderCustomFields({
      alvaCustomerNote: note,
    })),
    "setOrderCustomFields",
  );
}

async function ensureActiveOrder(cart) {
  const activeOrder = await getActiveOrderOrNull();

  if (activeOrder?.lines?.length) {
    return activeOrder;
  }

  const syncResult = await syncLocalCartToVendure(cart);

  if (syncResult.activeOrder?.lines?.length) {
    return syncResult.activeOrder;
  }

  const syncedOrder = await getActiveOrderOrNull();

  if (!syncedOrder?.lines?.length) {
    throw new Error("The selected products could not be prepared for submission. Return to the cart and continue again.");
  }

  return syncedOrder;
}

async function getActiveOrderOrNull() {
  const data = await getVendureActiveOrder();
  return data.activeOrder || null;
}

async function assertOrderHasLines(order) {
  if (!order.lines?.length) {
    throw new Error("The order request has no products. Return to the cart and continue again.");
  }
}

async function applyCustomer(payload, cart) {
  const result = await withActiveOrderRecovery("setCustomerForOrder", cart, () => setVendureCustomerForOrder({
      emailAddress: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phoneNumber: payload.phone,
    }),
  );
  const unwrapped = unwrapVendureResult(result);

  if (isAlreadyLoggedInCustomerError(unwrapped)) {
    return;
  }

  assertNoVendureError(unwrapped, "setCustomerForOrder");
}

async function applyAddresses(payload, cart) {
  const address = {
    fullName: `${payload.firstName} ${payload.lastName}`.trim(),
    streetLine1: payload.street,
    city: payload.city,
    postalCode: payload.postalCode,
    countryCode: toCountryCode(payload.country),
    phoneNumber: payload.phone,
    company: payload.company,
  };

  assertNoVendureError(
    await withActiveOrderRecovery("setOrderShippingAddress", cart, () => setVendureOrderShippingAddress(address)),
    "setOrderShippingAddress",
  );
  assertNoVendureError(
    await withActiveOrderRecovery("setOrderBillingAddress", cart, () => setVendureOrderBillingAddress(address)),
    "setOrderBillingAddress",
  );
}

async function applyFirstEligibleShippingMethod(cart) {
  const methodsData = await getVendureEligibleShippingMethods();
  const method = methodsData.eligibleShippingMethods?.[0];

  if (!method?.id) {
    throw new Error("No eligible Vendure shipping method found.");
  }

  assertNoVendureError(
    await withActiveOrderRecovery("setOrderShippingMethod", cart, () => setVendureOrderShippingMethod(method.id)),
    "setOrderShippingMethod",
  );
}

async function authorizePayment(cart) {
  await transitionOrderToPaymentState(cart);

  const paymentResult = await withActiveOrderRecovery("addPaymentToOrder", cart, () => addVendurePaymentToOrder({
      method: DEFAULT_PAYMENT_METHOD,
      metadata: {
        source: "alva-storefront-checkout",
      },
    }),
  );
  const order = unwrapVendureResult(paymentResult);

  if (order?.errorCode) {
    throw new Error(order.message || `addPaymentToOrder failed with ${order.errorCode}`);
  }

  return order;
}

async function transitionOrderToPaymentState(cart) {
  const transitioned = await withActiveOrderRecovery("transitionOrderToState", cart, () => transitionVendureOrderToState("ArrangingPayment"));
  const transitionResult = unwrapVendureResult(transitioned);

  if (transitionResult?.errorCode && transitionResult.errorCode !== "ORDER_STATE_TRANSITION_ERROR") {
    throw new Error(transitionResult.message || `transitionOrderToState failed with ${transitionResult.errorCode}`);
  }

  if (transitionResult?.errorCode === "ORDER_STATE_TRANSITION_ERROR") {
    const data = await getVendureActiveOrder();
    return data.activeOrder;
  }

  return transitionResult;
}

function assertNoVendureError(result, label) {
  const unwrapped = unwrapVendureResult(result);

  if (unwrapped?.errorCode) {
    throw new Error(unwrapped.message || `${label} failed with ${unwrapped.errorCode}`);
  }
}

async function withActiveOrderRecovery(label, cart, operation) {
  const result = await operation();
  const unwrapped = unwrapVendureResult(result);

  if (!isNoActiveOrderError(unwrapped)) {
    return result;
  }

  clearVendureCartSyncSignature();
  await syncLocalCartToVendure(cart);
  const retryResult = await operation();
  const retryUnwrapped = unwrapVendureResult(retryResult);

  if (isNoActiveOrderError(retryUnwrapped)) {
    throw new Error(`${label}: ${retryUnwrapped.message || "The selected products could not be prepared after retry."}`);
  }

  return retryResult;
}

function unwrapVendureResult(result) {
  if (!result || typeof result !== "object") {
    return result;
  }

  return Object.values(result).find((value) => value && typeof value === "object") || result;
}

function isAlreadyLoggedInCustomerError(result) {
  return /already logged in/i.test(result?.message || "");
}

function isNoActiveOrderError(result) {
  return result?.errorCode === "NO_ACTIVE_ORDER_ERROR"
    || /no active order/i.test(result?.message || "");
}

function isNoActiveOrderMessage(error) {
  return /no active order/i.test(error?.message || "");
}

function toCountryCode(country) {
  const normalized = String(country || "").trim().toLowerCase();
  const code = COUNTRY_CODES[normalized];

  if (!code) {
    throw new Error(`Unsupported country for Vendure checkout: ${country || "blank"}. Use Sweden or SE for local testing.`);
  }

  return code;
}
