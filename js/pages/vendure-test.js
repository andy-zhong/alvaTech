import { addVendureItemToOrder, getVendureActiveOrder, vendureRequest } from "../services/vendure-client.js";

const ACTIVE_CHANNEL_QUERY = `
  query ActiveChannel {
    activeChannel {
      id
      code
      currencyCode
      defaultLanguageCode
      availableLanguageCodes
    }
  }
`;

const PRODUCTS_QUERY = `
  query SmokeTestProducts {
    products(options: { take: 20 }) {
      totalItems
      items {
        id
        name
        slug
        description
        featuredAsset {
          preview
        }
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
`;

const endpointInput = document.querySelector("#vendure-endpoint");
const actionButtons = document.querySelectorAll("[data-action]");
const addItemForm = document.querySelector("[data-add-item-form]");
const productsOutput = document.querySelector('[data-output="products"]');
const variantIdInput = document.querySelector("#vendure-variant-id");
const quantityInput = document.querySelector("#vendure-quantity");

const tests = {
  "active-channel": runActiveChannel,
  products: runProducts,
  "active-order": runActiveOrder,
};

actionButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const action = button.dataset.action;

    if (action === "run-all") {
      await runAll();
      return;
    }

    await tests[action]?.();
  });
});

addItemForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  await runAddItemToOrder();
});

productsOutput?.addEventListener("click", async (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const button = target?.closest("[data-add-variant]");

  if (!button) {
    return;
  }

  const productVariantId = button.dataset.variantId;

  if (variantIdInput) {
    variantIdInput.value = productVariantId || "";
  }

  if (quantityInput) {
    quantityInput.value = "1";
  }

  await runAddItemToOrder({ submitter: button });
});

async function runAll() {
  for (const runTest of Object.values(tests)) {
    await runTest();
  }
}

async function runActiveChannel() {
  await runTest("active-channel", async () => {
    const data = await vendureRequest(ACTIVE_CHANNEL_QUERY);
    setPreOutput("active-channel", data.activeChannel);
  });
}

async function runProducts() {
  await runTest("products", async () => {
    const data = await vendureRequest(PRODUCTS_QUERY);
    renderProducts(data.products);
  });
}

async function runActiveOrder() {
  await runTest("active-order", async () => {
    const data = await getVendureActiveOrder();
    setPreOutput("active-order", data.activeOrder || { activeOrder: null });
  });
}

async function runAddItemToOrder(options = {}) {
  const productVariantId = variantIdInput?.value.trim();
  const quantity = Number.parseInt(quantityInput?.value, 10);
  await addItemToOrder(productVariantId, quantity, options);
}

async function addItemToOrder(productVariantId, quantity, options = {}) {
  setEndpointOverride();
  setStatus("add-item", "Loading", "loading");
  setButtonBusy(options.submitter, true);

  if (!productVariantId) {
    setStatus("add-item", "Error", "error");
    setOutput("add-item", "Enter a productVariantId.");
    setButtonBusy(options.submitter, false);
    return;
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    setStatus("add-item", "Error", "error");
    setOutput("add-item", "Quantity must be a whole number of at least 1.");
    setButtonBusy(options.submitter, false);
    return;
  }

  try {
    const data = await addVendureItemToOrder(productVariantId, quantity);
    const result = data.addItemToOrder;

    setPreOutput("add-item", result);

    if (result?.errorCode) {
      setStatus("add-item", "Error", "error");
      return;
    }

    setStatus("add-item", "OK", "success");
    await runActiveOrder();
  } catch (error) {
    setStatus("add-item", "Error", "error");
    setOutput("add-item", error.message || String(error));
  } finally {
    setButtonBusy(options.submitter, false);
  }
}

async function runTest(name, request) {
  setEndpointOverride();
  setStatus(name, "Loading", "loading");

  try {
    await request();
    setStatus(name, "OK", "success");
  } catch (error) {
    setStatus(name, "Error", "error");
    setOutput(name, error.message || String(error));
  }
}

function setEndpointOverride() {
  const endpoint = endpointInput?.value.trim();

  if (endpoint) {
    window.ALVA_VENDURE_SHOP_API = endpoint;
  }
}

function renderProducts(products) {
  const output = productsOutput;

  if (!output) {
    return;
  }

  if (!products?.items?.length) {
    output.textContent = `No products returned. totalItems: ${products?.totalItems ?? 0}`;
    return;
  }

  const rows = products.items.map((product) => {
    const variantRows = (product.variants || [])
      .map((variant) => renderVariantRow(variant))
      .join("");

    return `
      <tr>
        <td>
          <strong>${escapeHtml(product.name)}</strong>
          <span>${escapeHtml(product.slug)}</span>
        </td>
        <td>${escapeHtml(product.description || "")}</td>
        <td>
          ${
            variantRows
              ? `<div class="vendure-test__variants" role="list">${variantRows}</div>`
              : "No variants"
          }
        </td>
      </tr>
    `;
  });

  output.innerHTML = `
    <p class="vendure-test__result-note">Showing ${products.items.length} of ${products.totalItems} products.</p>
    <div class="vendure-test__table-wrap">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Variants</th>
          </tr>
        </thead>
        <tbody>${rows.join("")}</tbody>
      </table>
    </div>
  `;
}

function renderVariantRow(variant) {
  const price = formatMinorUnits(variant.priceWithTax, variant.currencyCode);

  return `
    <div class="vendure-test__variant-row" role="listitem">
      <div>
        <strong>${escapeHtml(variant.name)}</strong>
        <span>${escapeHtml(variant.sku || "no SKU")} - ID ${escapeHtml(variant.id)}</span>
      </div>
      <span>${escapeHtml(price)}</span>
      <button
        type="button"
        class="vendure-test__button vendure-test__button--small"
        data-add-variant
        data-variant-id="${escapeHtml(variant.id)}"
      >Add</button>
    </div>
  `;
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

function setButtonBusy(button, isBusy) {
  if (!button) {
    return;
  }

  button.disabled = isBusy;
  button.textContent = isBusy ? "Adding" : "Add";
}

function formatMinorUnits(value, currencyCode) {
  if (typeof value !== "number" || !currencyCode) {
    return "n/a";
  }

  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currencyCode,
  }).format(value / 100);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
