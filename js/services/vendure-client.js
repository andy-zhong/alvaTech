const DEFAULT_VENDURE_PORT = "2605";
const DEFAULT_VENDURE_SHOP_API_PATH = "shop-api";

const ORDER_FIELDS = `
  id
  code
  state
  total
  totalWithTax
  currencyCode
  customer {
    id
    firstName
    lastName
    emailAddress
  }
  shipping
  shippingWithTax
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
    amount
    state
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

export async function vendureRequest(query, variables = {}) {
  const endpoint = resolveVendureShopApiEndpoint();
  const operation = getGraphQLOperationName(query);

  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (error) {
    console.error("[vendure] Network request failed", {
      endpoint,
      operation,
      error,
    });
    throw new Error(`Vendure ${operation} failed to fetch ${endpoint}. Check that Vendure is running and CORS allows this origin.`);
  }

  const payload = await response.json();

  if (!response.ok || payload.errors?.length) {
    const message = payload.errors?.[0]?.message || `Vendure request failed with ${response.status}`;
    console.error("[vendure] GraphQL request failed", {
      endpoint,
      operation,
      status: response.status,
      errors: payload.errors,
    });
    throw new Error(message);
  }

  return payload.data;
}

export function resolveVendureShopApiEndpoint() {
  if (window.ALVA_VENDURE_SHOP_API) {
    return window.ALVA_VENDURE_SHOP_API;
  }

  const hostname = window.location.hostname === "127.0.0.1"
    ? "127.0.0.1"
    : "localhost";

  return `http://${hostname}:${DEFAULT_VENDURE_PORT}/${DEFAULT_VENDURE_SHOP_API_PATH}`;
}

function getGraphQLOperationName(query) {
  const match = String(query || "").match(/\b(query|mutation)\s+([A-Za-z0-9_]+)/);
  return match?.[2] || "GraphQL operation";
}

export async function getVendureActiveChannel() {
  return vendureRequest(`
    query ActiveChannel {
      activeChannel {
        id
        code
        currencyCode
        defaultLanguageCode
      }
    }
  `);
}

export async function getVendureProducts(options = { take: 20, skip: 0 }) {
  return vendureRequest(`
    query Products($options: ProductListOptions) {
      products(options: $options) {
        totalItems
        items {
          id
          name
          slug
          description
          variants {
            id
            name
            sku
            priceWithTax
            currencyCode
          }
        }
      }
    }
  `, { options });
}

export async function getVendureProductVariantBySku(sku) {
  const normalizedSku = String(sku || "").trim();

  if (!normalizedSku) {
    throw new Error("SKU is required.");
  }

  const searchData = await vendureRequest(`
    query SearchVariantBySku($input: SearchInput!) {
      search(input: $input) {
        items {
          sku
          productId
          productName
          productVariantId
          productVariantName
          slug
          currencyCode
        }
      }
    }
  `, { input: { term: normalizedSku, take: 20 } });

  const searchMatch = searchData.search.items.find((item) => item.sku === normalizedSku);

  if (searchMatch) {
    return {
      id: searchMatch.productVariantId,
      productId: searchMatch.productId,
      productName: searchMatch.productName,
      name: searchMatch.productVariantName,
      slug: searchMatch.slug,
      sku: searchMatch.sku,
      currencyCode: searchMatch.currencyCode,
    };
  }

  const productData = await getVendureProducts({ take: 100, skip: 0 });
  const product = productData.products.items.find((item) =>
    item.variants?.some((variant) => variant.sku === normalizedSku),
  );
  const variant = product?.variants?.find((item) => item.sku === normalizedSku);

  if (!variant) {
    throw new Error(`No Vendure product variant found for SKU ${normalizedSku}.`);
  }

  return {
    ...variant,
    productId: product.id,
    productName: product.name,
    slug: product.slug,
  };
}

export async function getVendureActiveOrder() {
  return vendureRequest(`
    query ActiveOrder {
      activeOrder {
        ${ORDER_FIELDS}
      }
    }
  `);
}

export async function addVendureItemToOrder(productVariantId, quantity = 1) {
  return vendureRequest(`
    mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
      addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
        ... on Order {
          ${ORDER_FIELDS}
        }
        ... on ErrorResult {
          errorCode
          message
        }
        ... on InsufficientStockError {
          quantityAvailable
        }
      }
    }
  `, { productVariantId, quantity });
}

export async function setVendureCustomerForOrder(input) {
  return vendureRequest(`
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
  `, { input });
}

export async function setVendureOrderShippingAddress(input) {
  return vendureRequest(`
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
  `, { input });
}

export async function setVendureOrderBillingAddress(input) {
  return vendureRequest(`
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
  `, { input });
}

export async function setVendureOrderCustomFields(customFields) {
  return vendureRequest(`
    mutation SetOrderCustomFields($input: UpdateOrderInput!) {
      setOrderCustomFields(input: $input) {
        ... on Order {
          ${ORDER_FIELDS}
        }
        ... on ErrorResult {
          errorCode
          message
        }
      }
    }
  `, { input: { customFields } });
}

export async function getVendureEligibleShippingMethods() {
  return vendureRequest(`
    query EligibleShippingMethods {
      eligibleShippingMethods {
        id
        code
        name
        description
        price
        priceWithTax
        metadata
      }
    }
  `);
}

export async function getVendureEligiblePaymentMethods() {
  return vendureRequest(`
    query EligiblePaymentMethods {
      eligiblePaymentMethods {
        id
        code
        name
        description
        eligibilityMessage
      }
    }
  `);
}

export async function getVendureNextOrderStates() {
  return vendureRequest(`
    query NextOrderStates {
      nextOrderStates
    }
  `);
}

export async function setVendureOrderShippingMethod(shippingMethodId) {
  return vendureRequest(`
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
  `, { shippingMethodId: Array.isArray(shippingMethodId) ? shippingMethodId : [shippingMethodId] });
}

export async function transitionVendureOrderToState(state) {
  return vendureRequest(`
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
  `, { state });
}

export async function addVendurePaymentToOrder(input = { method: "standard-payment", metadata: {} }) {
  return vendureRequest(`
    mutation AddPaymentToOrder($input: PaymentInput!) {
      addPaymentToOrder(input: $input) {
        ... on Order {
          ${ORDER_FIELDS}
        }
        ... on ErrorResult {
          errorCode
          message
        }
        ... on PaymentDeclinedError {
          paymentErrorMessage
        }
        ... on PaymentFailedError {
          paymentErrorMessage
        }
      }
    }
  `, { input });
}

export async function createVendureStripePaymentIntent() {
  return vendureRequest(`
    mutation CreateStripePaymentIntent {
      createStripePaymentIntent
    }
  `);
}

export async function clearVendureActiveOrder() {
  return vendureRequest(`
    mutation ClearAlvaActiveOrder {
      clearAlvaActiveOrder
    }
  `);
}
