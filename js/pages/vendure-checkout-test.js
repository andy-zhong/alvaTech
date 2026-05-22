import * as VendureClient from "../services/vendure-client.js";
import { getVendureVariantForSlug } from "../data/vendure-mapping.js";

const QUICK_ADD_PRODUCT_SLUG = "voltdock";

const ORDER_FIELDS = `
  id
  code
  state
  totalWithTax
  currencyCode
  customer {
    id
    emailAddress
    firstName
    lastName
  }
  shippingAddress {
    fullName
    streetLine1
    city
    postalCode
    countryCode
  }
  shippingLines {
    shippingMethod {
      id
      code
      name
    }
    priceWithTax
  }
  payments {
    id
    method
    state
    amount
    transactionId
  }
  lines {
    id
    quantity
    linePriceWithTax
    productVariant {
      id
      name
      sku
    }
  }
`;

const endpointInput = document.querySelector("#vendure-endpoint");
const checkoutForm = document.querySelector("[data-checkout-form]");
const addTestItemButton = document.querySelector('[data-action="add-test-item"]');
const refreshButton = document.querySelector('[data-action="refresh-order"]');
const runCheckoutButton = document.querySelector('[data-action="run-checkout"]');
const emailInput = document.querySelector("#checkout-email");
const actionControls = document.querySelectorAll("[data-action]");
let isRunning = false;

setUniqueGuestEmail();

addTestItemButton?.addEventListener("click", async () => {
  await runExclusive(() => addTestItem());
});

refreshButton?.addEventListener("click", async () => {
  await runExclusive(() => refreshActiveOrder());
});

runCheckoutButton?.addEventListener("click", async () => {
  await runExclusive(() => runGuestCheckout());
});

checkoutForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await runExclusive(() => runGuestCheckout());
});

await refreshActiveOrder();

async function runGuestCheckout() {
  const input = readCheckoutInput();
  const results = [];

  setEndpointOverride();
  setStatus("checkout", "Loading", "loading");
  setButtonBusy(runCheckoutButton, true, "Running");
  resetSteps();

  try {
    const order = await ensureTestOrder();
    results.push({
      step: "ensureTestOrder",
      result: order,
    });

    results.push(await runCheckoutStep("customer", "setCustomerForOrder", () => setCustomerForOrder({
      emailAddress: input.emailAddress,
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
    })));

    results.push(await runCheckoutStep("address", "setOrderShippingAddress", () => setOrderShippingAddress({
      fullName: `${input.firstName} ${input.lastName}`.trim(),
      streetLine1: input.streetLine1,
      city: input.city,
      postalCode: input.postalCode,
      countryCode: input.countryCode,
      phoneNumber: input.phoneNumber,
    })));

    results.push(await runCheckoutStep("billing-address", "setOrderBillingAddress", () => setOrderBillingAddress({
      fullName: `${input.firstName} ${input.lastName}`.trim(),
      streetLine1: input.streetLine1,
      city: input.city,
      postalCode: input.postalCode,
      countryCode: input.countryCode,
      phoneNumber: input.phoneNumber,
    })));

    const methodsResult = await runCheckoutStep("shipping-methods", "eligibleShippingMethods", getEligibleShippingMethods);
    results.push(methodsResult);

    const selectedShippingMethodId = input.shippingMethodId || methodsResult?.result?.eligibleShippingMethods?.[0]?.id;
    results.push(await runCheckoutStep("shipping-method", "setOrderShippingMethod", () => {
      if (!selectedShippingMethodId) {
        return skipStep("shipping-method", "No shipping method ID entered and no eligible method returned.");
      }

      return setOrderShippingMethod(selectedShippingMethodId);
    }));

    results.push(await runCheckoutStep("state", "transitionOrderToState", () => transitionOrderToState("ArrangingPayment")));

    results.push(await runCheckoutStep("payment", "addPaymentToOrder", () => {
      if (!input.paymentMethodCode) {
        return skipStep("payment", "No payment method code entered.");
      }

      return addPaymentToOrder({
        method: input.paymentMethodCode,
        metadata: {
          smokeTest: true,
        },
      });
    }));

    setPreOutput("checkout", results);
    setStatus("checkout", "OK", "success");
  } catch (error) {
    setStatus("checkout", "Error", "error");
    setPreOutput("checkout", {
      error: error.message || String(error),
      completed: results,
    });
  } finally {
    setButtonBusy(runCheckoutButton, false, "Run steps");
    await refreshActiveOrder();
  }
}

async function addTestItem() {
  setEndpointOverride();
  setButtonBusy(addTestItemButton, true, "Adding");

  try {
    if (typeof VendureClient.addVendureItemToOrder !== "function") {
      throw new Error("Missing addVendureItemToOrder helper.");
    }

    const result = await addQuickTestItem();
    const errorResult = findErrorResult(result);

    if (errorResult) {
      throw new Error(errorResult.message || errorResult.errorCode);
    }

    setPreOutput("checkout", {
      step: "addItemToOrder",
      result,
    });
    await refreshActiveOrder();
  } catch (error) {
    setStatus("checkout", "Error", "error");
    setOutput("checkout", error.message || String(error));
  } finally {
    setButtonBusy(addTestItemButton, false, "Add VoltDock");
  }
}

async function ensureTestOrder() {
  const activeOrderData = typeof VendureClient.getVendureActiveOrder === "function"
    ? await VendureClient.getVendureActiveOrder()
    : await requestActiveOrder();
  const activeOrder = activeOrderData.activeOrder;

  if (activeOrder?.lines?.length) {
    return activeOrder;
  }

  const result = await addQuickTestItem();
  const errorResult = findErrorResult(result);

  if (errorResult) {
    throw new Error(errorResult.message || errorResult.errorCode);
  }

  return result.addItemToOrder || result;
}

async function addQuickTestItem() {
  const variant = await resolveQuickAddVariant();
  return VendureClient.addVendureItemToOrder(variant.id, 1);
}

async function refreshActiveOrder() {
  setEndpointOverride();
  setStatus("active-order", "Loading", "loading");

  try {
    const data = typeof VendureClient.getVendureActiveOrder === "function"
      ? await VendureClient.getVendureActiveOrder()
      : await requestActiveOrder();

    setPreOutput("active-order", data.activeOrder || { activeOrder: null });
    setStatus("active-order", "OK", "success");
  } catch (error) {
    setStatus("active-order", "Error", "error");
    setOutput("active-order", error.message || String(error));
  }
}

async function setCustomerForOrder(input) {
  return callClientFunction(
    ["setVendureCustomerForOrder", "setCustomerForOrder"],
    () => VendureClient.vendureRequest(`
      mutation SetCustomerForOrder($input: CreateCustomerInput!) {
        setCustomerForOrder(input: $input) {
          ... on Order {
            ${ORDER_FIELDS}
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `, { input }),
    input,
  );
}

async function setOrderShippingAddress(input) {
  return callClientFunction(
    ["setVendureOrderShippingAddress", "setOrderShippingAddress"],
    () => VendureClient.vendureRequest(`
      mutation SetOrderShippingAddress($input: CreateAddressInput!) {
        setOrderShippingAddress(input: $input) {
          ... on Order {
            ${ORDER_FIELDS}
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `, { input }),
    input,
  );
}

async function setOrderBillingAddress(input) {
  return callClientFunction(
    ["setVendureOrderBillingAddress", "setOrderBillingAddress"],
    () => VendureClient.vendureRequest(`
      mutation SetOrderBillingAddress($input: CreateAddressInput!) {
        setOrderBillingAddress(input: $input) {
          ... on Order {
            ${ORDER_FIELDS}
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `, { input }),
    input,
  );
}

async function getEligibleShippingMethods() {
  return callClientFunction(
    ["getVendureEligibleShippingMethods", "getEligibleShippingMethods"],
    () => VendureClient.vendureRequest(`
      query EligibleShippingMethods {
        eligibleShippingMethods {
          id
          code
          name
          priceWithTax
        }
      }
    `),
  );
}

async function setOrderShippingMethod(shippingMethodId) {
  return callClientFunction(
    ["setVendureOrderShippingMethod", "setOrderShippingMethod"],
    () => VendureClient.vendureRequest(`
      mutation SetOrderShippingMethod($shippingMethodId: [ID!]!) {
        setOrderShippingMethod(shippingMethodId: $shippingMethodId) {
          ... on Order {
            ${ORDER_FIELDS}
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `, { shippingMethodId: [shippingMethodId] }),
    shippingMethodId,
  );
}

async function transitionOrderToState(state) {
  return callClientFunction(
    ["transitionVendureOrderToState", "transitionOrderToState"],
    () => VendureClient.vendureRequest(`
      mutation TransitionOrderToState($state: String!) {
        transitionOrderToState(state: $state) {
          ... on Order {
            ${ORDER_FIELDS}
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `, { state }),
    state,
  );
}

async function addPaymentToOrder(input) {
  return callClientFunction(
    ["addVendurePaymentToOrder", "addPaymentToOrder"],
    () => VendureClient.vendureRequest(`
      mutation AddPaymentToOrder($input: PaymentInput!) {
        addPaymentToOrder(input: $input) {
          ... on Order {
            ${ORDER_FIELDS}
          }
          ... on ErrorResult {
            errorCode
            message
          }
        }
      }
    `, { input }),
    input,
  );
}

async function requestActiveOrder() {
  return VendureClient.vendureRequest(`
    query ActiveOrder {
      activeOrder {
        ${ORDER_FIELDS}
      }
    }
  `);
}

async function callClientFunction(names, fallback, argument) {
  const clientFunction = names.map((name) => VendureClient[name]).find((candidate) => typeof candidate === "function");

  if (clientFunction) {
    return clientFunction(argument);
  }

  if (typeof VendureClient.vendureRequest === "function") {
    return fallback();
  }

  throw new Error(`Missing Vendure client helper. Add one of: ${names.join(", ")}, or export vendureRequest.`);
}

async function runCheckoutStep(step, label, request) {
  setStepState(step, "loading");

  try {
    const result = await request();

    if (result?.skipped) {
      setStepState(step, "skipped");
      return { step: label, ...result };
    }

    const errorResult = findErrorResult(result);

    if (errorResult) {
      setStepState(step, "error");
      throw new Error(`${label}: ${errorResult.message || errorResult.errorCode}`);
    }

    setStepState(step, "success");
    return { step: label, result };
  } catch (error) {
    setStepState(step, "error");
    throw error;
  }
}

function skipStep(step, reason) {
  setStepState(step, "skipped");
  return {
    skipped: true,
    reason,
  };
}

function findErrorResult(value) {
  if (!value || typeof value !== "object") {
    return null;
  }

  if (value.errorCode || value.message) {
    return value.errorCode ? value : null;
  }

  return Object.values(value).find((child) => child && typeof child === "object" && child.errorCode) || null;
}

function readCheckoutInput() {
  const formData = new FormData(checkoutForm);
  const input = Object.fromEntries(formData.entries());

  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, String(value).trim()]),
  );
}

async function resolveQuickAddVariant() {
  const mappedVariant = getVendureVariantForSlug(QUICK_ADD_PRODUCT_SLUG);

  if (!mappedVariant) {
    throw new Error(`Missing Vendure mapping for ${QUICK_ADD_PRODUCT_SLUG}.`);
  }

  if (typeof VendureClient.getVendureProductVariantBySku === "function") {
    return VendureClient.getVendureProductVariantBySku(mappedVariant.sku);
  }

  throw new Error(`No SKU resolver available for Vendure variant ${mappedVariant.sku}.`);
}

function setUniqueGuestEmail() {
  if (!emailInput || emailInput.value !== "guest@example.com") {
    return;
  }

  const suffix = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  emailInput.value = `guest+${suffix}@example.com`;
}

function setEndpointOverride() {
  const endpoint = endpointInput?.value.trim();

  if (endpoint) {
    window.ALVA_VENDURE_SHOP_API = endpoint;
  }
}

function resetSteps() {
  document.querySelectorAll("[data-step]").forEach((step) => {
    delete step.dataset.state;
  });
}

function setStepState(name, state) {
  const step = document.querySelector(`[data-step="${name}"]`);

  if (step) {
    step.dataset.state = state;
  }
}

function setPreOutput(name, value) {
  setOutput(name, JSON.stringify(value, null, 2));
}

function setOutput(name, value) {
  const output = document.querySelector(`[data-output="${name}"]`);

  if (output) {
    output.textContent = value;
  }
}

function setStatus(name, label, state) {
  const status = document.querySelector(`[data-status="${name}"]`);

  if (!status) {
    return;
  }

  status.textContent = label;
  status.dataset.state = state;
}

function setButtonBusy(button, isBusy, label) {
  if (!button) {
    return;
  }

  button.disabled = isBusy;
  button.textContent = label;
}

async function runExclusive(task) {
  if (isRunning) {
    return;
  }

  isRunning = true;
  setPageBusy(true);

  try {
    await task();
  } finally {
    isRunning = false;
    setPageBusy(false);
  }
}

function setPageBusy(isBusy) {
  actionControls.forEach((control) => {
    control.disabled = isBusy;
  });
}
