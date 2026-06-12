export const PLANNING_PRICES = {
  batteryPack: 2990,
  voltDock: 3990,
  backpackPowerMounting: 1490,
  bikeAccessory: 990,
  vanMounting: 1890,
  inverter: 10980,
};

const ESTIMATE_PREFILL_KEY = "alva-estimator-request-summary";
const CART_NOTICE_KEY = "alva-cart-notice";
const RANGE_DASH = "\u2013";
const EM_DASH = "\u2014";
const SQUARE_METERS = "m\u00b2";
const MOBILE_ACCORDION_QUERY = "(max-width: 640px)";

const SUMMER_ACCESSORIES = [
  { key: "voltDock", label: "VoltDock", priceKey: "voltDock" },
  { key: "backpackPowerMounting", label: "Backpack Power Mounting", priceKey: "backpackPowerMounting" },
  { key: "bikeAccessory", label: "Bike accessory", priceKey: "bikeAccessory" },
  { key: "extraBatteryPack", label: "Extra Battery Pack", priceKey: "batteryPack", addsBatteryPack: true },
];

const INSTALLER_ACCESSORIES = [
  { key: "voltDock", label: "VoltDock", priceKey: "voltDock" },
  { key: "backpackPowerMounting", label: "Backpack Power Mounting", priceKey: "backpackPowerMounting" },
  { key: "extraBatteryPacks", label: "Extra Battery Packs", priceKey: "batteryPack", addsBatteryPacksPerVan: 1 },
  { key: "vanMounting", label: "Van mounting", priceKey: "vanMounting" },
  { key: "bikeAccessory", label: "Bike accessory", priceKey: "bikeAccessory" },
];

const SOLAR_OPTIONS = {
  none: "No solar yet",
  existing: "Existing solar",
  tracking: "Solar tracking system",
};

const USAGE_OPTIONS = {
  weekend: "Weekend use",
  regular: "Regular summer use",
  extended: "Extended stays",
};

const ROUTINE_OPTIONS = {
  light: "Light support",
  everyday: "Everyday installer routine",
  extended: "Extended workday",
};

const CENTRALIZED_CHARGING_TEXT =
  "Charge Battery Packs at the office or workshop, bring them into the service van, and use practical power where the workday needs it.";

export function renderSetupEstimator({ context = "home" } = {}) {
  const shellClass = context === "products"
    ? "showroom-section showroom-section--sage editorial-section--soft setup-estimator-shell"
    : "platform-home-section platform-home-section--milk setup-estimator-shell";
  const innerClass = context === "products"
    ? "setup-estimator"
    : "home-section-inner setup-estimator";

  return `
    <section class="${shellClass}" aria-labelledby="setup-estimator-title" data-setup-estimator>
      <div class="${innerClass}">
        <div class="setup-estimator__head">
          <span class="platform-eyebrow">Planning estimate</span>
          <h2 id="setup-estimator-title">Estimate your Voltrix setup.</h2>
          <p>Choose a use case and get a practical starting point for battery packs, accessories and an estimated planning price.</p>
        </div>

        <div class="setup-estimator__selector" role="tablist" aria-label="Estimator use case">
          <button class="setup-estimator__scenario is-active" type="button" role="tab" aria-selected="true" data-estimator-scenario="summer">
            Summer house
          </button>
          <button class="setup-estimator__scenario" type="button" role="tab" aria-selected="false" data-estimator-scenario="installer">
            Installer
          </button>
        </div>

        <div class="setup-estimator__body">
          ${renderSummerPanel()}
          ${renderInstallerPanel()}
          ${renderResultPanel()}
        </div>

      </div>
    </section>
  `;
}

function renderSummerPanel() {
  return `
    <div class="setup-estimator__panel is-active" data-estimator-panel="summer">
      <div class="setup-estimator__control setup-estimator__control--range" data-estimator-step="summer-size">
        ${renderStepToggle("Approx. summer house size")}
        <div class="setup-estimator__step-body">
          <div class="setup-estimator__control-head">
            <strong>Approx. summer house size</strong>
            <output data-summer-size-output>65 ${SQUARE_METERS}</output>
          </div>
          <input type="range" min="20" max="240" value="65" step="5" data-summer-size>
        </div>
      </div>

      ${renderOptionGroup("Usage rhythm", "usage", USAGE_OPTIONS, "regular")}
      ${renderSolarGroup()}
      ${renderCheckboxGroup("Accessories", "summer", SUMMER_ACCESSORIES)}
    </div>
  `;
}

function renderInstallerPanel() {
  return `
    <div class="setup-estimator__panel" data-estimator-panel="installer" hidden>
      ${renderOptionGroup("Number of vans / teams", "vans", { 1: "1", 2: "2", 3: "3", 4: "4+" }, "1")}
      ${renderOptionGroup("Workday routine", "routine", ROUTINE_OPTIONS, "everyday")}
      ${renderCheckboxGroup("Accessories", "installer", INSTALLER_ACCESSORIES)}
    </div>
  `;
}

function renderOptionGroup(label, group, options, activeValue) {
  return `
    <fieldset class="setup-estimator__control" data-estimator-step="${group}">
      <legend>${label}</legend>
      ${renderStepToggle(label)}
      <div class="setup-estimator__step-body">
        <div class="setup-estimator__options">
          ${Object.entries(options).map(([value, text]) => `
            <button
              class="setup-estimator__option ${value === activeValue ? "is-active" : ""}"
              type="button"
              data-estimator-option="${group}"
              data-estimator-value="${value}">
              ${text}
            </button>
          `).join("")}
        </div>
      </div>
    </fieldset>
  `;
}

function renderCheckboxGroup(label, scenario, options) {
  return `
    <fieldset class="setup-estimator__control" data-estimator-step="${scenario}-accessories">
      <legend>${label}</legend>
      ${renderStepToggle(label)}
      <div class="setup-estimator__step-body">
        <div class="setup-estimator__checks">
          ${options.map((option) => `
            <label class="setup-estimator__check">
              <input type="checkbox" data-estimator-accessory="${scenario}" value="${option.key}">
              <span>${option.label}</span>
            </label>
          `).join("")}
        </div>
      </div>
    </fieldset>
  `;
}

function renderSolarGroup() {
  return `
    <fieldset class="setup-estimator__control" data-estimator-step="solar">
      <legend>Solar</legend>
      ${renderStepToggle("Solar")}
      <div class="setup-estimator__step-body">
        <div class="setup-estimator__checks">
          ${Object.entries(SOLAR_OPTIONS).map(([value, label]) => `
            <label class="setup-estimator__check">
              <input type="checkbox" data-estimator-solar value="${value}" ${value === "none" ? "checked" : ""}>
              <span>${label}</span>
            </label>
          `).join("")}
        </div>
      </div>
    </fieldset>
  `;
}

function renderStepToggle(title) {
  return `
    <button class="setup-estimator__step-toggle" type="button" aria-expanded="false" data-estimator-step-toggle>
      <span>${title}</span>
      <small data-estimator-step-summary></small>
    </button>
  `;
}

function renderResultPanel() {
  return `
    <aside class="setup-estimator__result" aria-live="polite">
      <span class="setup-estimator__result-label" data-result-label>Summer house estimate</span>
      <div class="setup-estimator__result-grid" data-result-metrics></div>
      <div class="setup-estimator__result-notes" data-result-notes></div>
      ${renderKwhHelper()}
      <div class="setup-estimator__result-actions">
        <a class="button button--primary" href="/views/b2b.html">Request quote</a>
        <button class="button button--secondary" type="button" data-estimator-add-to-cart>Add to cart</button>
      </div>
      <small>Planning prices only. Final quote may differ.</small>
    </aside>
  `;
}

function renderKwhHelper() {
  return `
    <details class="setup-estimator__details">
      <summary>What does 1 kWh mean?</summary>
      <p>1 kWh is useful everyday energy. As a rough guide, it can mean many hours of lighting and device charging, roughly 40${RANGE_DASH}70 full phone charges, or part of a day to about a day of efficient fridge support depending on model and conditions.</p>
      <small>Actual runtime depends on appliance power, temperature, charging losses and usage pattern.</small>
    </details>
  `;
}

export function bindSetupEstimator(scope = document) {
  scope.querySelectorAll("[data-setup-estimator]").forEach((root) => {
    const state = {
      scenario: "summer",
      summer: {
        size: 65,
        usage: "regular",
        solar: new Set(["none"]),
        accessories: new Set(),
      },
      installer: {
        vans: 1,
        routine: "everyday",
        accessories: new Set(),
      },
    };

    setupEstimatorAccordion(root);

    const update = () => {
      updateEstimator(root, state);
      updateEstimatorStepSummaries(root, state);
    };

    root.querySelectorAll("[data-estimator-scenario]").forEach((button) => {
      button.addEventListener("click", () => {
        state.scenario = button.dataset.estimatorScenario;
        setScenario(root, state.scenario);
        update();
        resetEstimatorAccordion(root);
      });
    });

    root.querySelector("[data-summer-size]")?.addEventListener("input", (event) => {
      state.summer.size = Number(event.target.value);
      const output = root.querySelector("[data-summer-size-output]");
      if (output) output.textContent = `${state.summer.size} ${SQUARE_METERS}`;
      update();
    });

    root.querySelectorAll("[data-estimator-option]").forEach((button) => {
      button.addEventListener("click", () => {
        const group = button.dataset.estimatorOption;
        const value = button.dataset.estimatorValue;
        root.querySelectorAll(`[data-estimator-option="${group}"]`).forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });

        if (group === "usage") state.summer.usage = value;
        if (group === "vans") state.installer.vans = Number(value);
        if (group === "routine") state.installer.routine = value;
        update();
      });
    });

    root.querySelectorAll("[data-estimator-solar]").forEach((input) => {
      input.addEventListener("change", () => {
        updateSolarState(root, state, input);
        update();
      });
    });

    root.querySelectorAll("[data-estimator-accessory]").forEach((input) => {
      input.addEventListener("change", () => {
        const target = input.dataset.estimatorAccessory === "installer"
          ? state.installer.accessories
          : state.summer.accessories;

        if (input.checked) {
          target.add(input.value);
        } else {
          target.delete(input.value);
        }
        update();
      });
    });

    root.querySelector("[data-estimator-add-to-cart]")?.addEventListener("click", () => {
      addCurrentEstimateToCart(root, state);
    });

    root.querySelector(".setup-estimator__result-actions .button--primary")?.addEventListener("click", () => {
      sessionStorage.setItem(ESTIMATE_PREFILL_KEY, buildEstimatePayload(state).summary);
    });

    update();
  });
}

function setupEstimatorAccordion(root) {
  root.querySelectorAll("[data-estimator-step]").forEach((step) => {
    step.querySelector("[data-estimator-step-toggle]")?.addEventListener("click", () => {
      if (!isMobileEstimatorAccordion()) return;
      setOpenEstimatorStep(root, step);
    });
  });

  resetEstimatorAccordion(root);
}

function resetEstimatorAccordion(root) {
  const activePanel = root.querySelector("[data-estimator-panel].is-active");
  const firstStep = activePanel?.querySelector("[data-estimator-step]");
  root.querySelectorAll("[data-estimator-step]").forEach((step) => {
    const isOpen = step === firstStep;
    step.classList.toggle("is-open", isOpen);
    step.querySelector("[data-estimator-step-toggle]")?.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function setOpenEstimatorStep(root, targetStep) {
  const panel = targetStep.closest("[data-estimator-panel]");
  panel?.querySelectorAll("[data-estimator-step]").forEach((step) => {
    const isOpen = step === targetStep;
    step.classList.toggle("is-open", isOpen);
    step.querySelector("[data-estimator-step-toggle]")?.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function updateEstimatorStepSummaries(root, state) {
  setStepSummary(root, "summer-size", `${state.summer.size} ${SQUARE_METERS}`);
  setStepSummary(root, "usage", USAGE_OPTIONS[state.summer.usage]);
  setStepSummary(root, "solar", formatSolarLabels(state.summer.solar));
  setStepSummary(root, "summer-accessories", formatSelectedAccessoryLabels(SUMMER_ACCESSORIES, state.summer.accessories));
  setStepSummary(root, "vans", `${state.installer.vans}`);
  setStepSummary(root, "routine", ROUTINE_OPTIONS[state.installer.routine]);
  setStepSummary(root, "installer-accessories", formatSelectedAccessoryLabels(INSTALLER_ACCESSORIES, state.installer.accessories));
}

function setStepSummary(root, stepName, value) {
  const summary = root.querySelector(`[data-estimator-step="${stepName}"] [data-estimator-step-summary]`);
  if (summary) summary.textContent = value;
}

function isMobileEstimatorAccordion() {
  return window.matchMedia(MOBILE_ACCORDION_QUERY).matches;
}

function updateSolarState(root, state, changedInput) {
  const value = changedInput.value;

  if (value === "none" && changedInput.checked) {
    state.summer.solar = new Set(["none"]);
    root.querySelectorAll("[data-estimator-solar]").forEach((input) => {
      input.checked = input.value === "none";
    });
    return;
  }

  if (value !== "none" && changedInput.checked) {
    state.summer.solar.delete("none");
    state.summer.solar.add(value);
    const noneInput = root.querySelector('[data-estimator-solar][value="none"]');
    if (noneInput) noneInput.checked = false;
    return;
  }

  state.summer.solar.delete(value);

  if (!state.summer.solar.size) {
    state.summer.solar.add("none");
    const noneInput = root.querySelector('[data-estimator-solar][value="none"]');
    if (noneInput) noneInput.checked = true;
  }
}

function setScenario(root, scenario) {
  root.querySelectorAll("[data-estimator-scenario]").forEach((button) => {
    const isActive = button.dataset.estimatorScenario === scenario;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  root.querySelectorAll("[data-estimator-panel]").forEach((panel) => {
    const isActive = panel.dataset.estimatorPanel === scenario;
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
  });

  const body = root.querySelector(".setup-estimator__body");
  if (body) {
    body.classList.add("is-switching");
    window.setTimeout(() => body.classList.remove("is-switching"), 180);
  }
}

function updateEstimator(root, state) {
  const result = buildEstimatePayload(state).result;

  const label = root.querySelector("[data-result-label]");
  const metrics = root.querySelector("[data-result-metrics]");
  const notes = root.querySelector("[data-result-notes]");

  if (label) label.textContent = result.label;
  if (metrics) {
    metrics.innerHTML = result.metrics.map((metric) => `
      <div class="setup-estimator__metric">
        <span>${metric.label}</span>
        <strong>${metric.value}</strong>
      </div>
    `).join("");
  }
  if (notes) {
    notes.innerHTML = result.notes.map((note) => `<p>${note}</p>`).join("");
  }
}

function addCurrentEstimateToCart(root, state) {
  const payload = buildEstimatePayload(state);
  const cart = readCart();
  const item = {
    type: "planning-estimate",
    cartItemId: `planning-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    quantity: 1,
    unitPrice: 0,
    title: `Estimated Voltrix setup - ${payload.scenarioLabel}`,
    subtitle: "Planning estimate, final quote may differ.",
    scenario: payload.scenarioLabel,
    estimatedPriceRange: payload.result.priceRange,
    estimatedPriceMin: payload.result.priceMin,
    estimatedPriceMax: payload.result.priceMax,
    details: payload.cartDetails,
    summary: payload.summary,
  };

  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  sessionStorage.setItem(CART_NOTICE_KEY, "Planning estimate added to cart. Request quote to confirm configuration.");
  updateCartCount(cart);

  const button = root.querySelector("[data-estimator-add-to-cart]");
  if (button) {
    const original = button.textContent;
    button.textContent = "Added to cart";
    window.setTimeout(() => {
      button.textContent = original;
    }, 1600);
  }
}

function updateCartCount(cart) {
  const el = document.getElementById("cart-count");
  if (!el) return;

  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  el.textContent = count > 0 ? String(count) : "";
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

function buildEstimatePayload(state) {
  return state.scenario === "installer"
    ? buildInstallerPayload(state.installer)
    : buildSummerPayload(state.summer);
}

function buildSummerPayload(state) {
  const result = calculateSummer(state);
  const solarLabels = formatSolarLabels(state.solar);
  const solarNote = getSolarNote(state.solar);
  const accessoryLabels = formatSelectedAccessoryLabels(SUMMER_ACCESSORIES, state.accessories);
  const details = [
    ["Scenario", "Summer house"],
    ["Approx. summer house size", `${state.size} ${SQUARE_METERS}`],
    ["Usage rhythm", USAGE_OPTIONS[state.usage]],
    ["Solar options", solarLabels],
    ["Solar note", solarNote],
    ["Accessories", accessoryLabels],
    ["Estimated storage", result.metricMap.estimatedStorage],
    ["Battery Packs", result.metricMap.batteryPacks],
    ["Recommended inverters", result.metricMap.inverters],
    ["Estimated price range", result.priceRange],
  ];

  return {
    scenarioLabel: "Summer house",
    result,
    cartDetails: details,
    summary: [
      "Estimated Voltrix setup - Summer house",
      `Approx. summer house size: ${state.size} ${SQUARE_METERS}`,
      `Usage rhythm: ${USAGE_OPTIONS[state.usage]}`,
      `Solar options: ${solarLabels}`,
      `Solar note: ${solarNote}`,
      `Accessories: ${accessoryLabels}`,
      `Estimated storage: ${result.metricMap.estimatedStorage}`,
      `Battery Packs: ${result.metricMap.batteryPacks}`,
      `Recommended inverters: ${result.metricMap.inverters}`,
      `Estimated price range: ${result.priceRange}`,
      "Note: Based on preset planning prices. Final configuration and quote may differ.",
    ].join("\n"),
  };
}

function buildInstallerPayload(state) {
  const result = calculateInstaller(state);
  const accessoryLabels = formatSelectedAccessoryLabels(INSTALLER_ACCESSORIES, state.accessories);
  const details = [
    ["Scenario", "Installer"],
    ["Vans / teams", String(state.vans)],
    ["Workday routine", ROUTINE_OPTIONS[state.routine]],
    ["Centralized charging", CENTRALIZED_CHARGING_TEXT],
    ["Accessories", accessoryLabels],
    ["Battery Packs per van", result.metricMap.perVan],
    ["Total Battery Packs", result.metricMap.totalPacks],
    ["Estimated storage", result.metricMap.estimatedStorage],
    ["Recommended inverters", result.metricMap.inverters],
    ["Estimated price range", result.priceRange],
  ];

  return {
    scenarioLabel: "Installer",
    result,
    cartDetails: details,
    summary: [
      "Estimated Voltrix setup - Installer",
      `Vans / teams: ${state.vans}`,
      `Workday routine: ${ROUTINE_OPTIONS[state.routine]}`,
      `Centralized charging: ${CENTRALIZED_CHARGING_TEXT}`,
      `Accessories: ${accessoryLabels}`,
      `Battery Packs per van: ${result.metricMap.perVan}`,
      `Total Battery Packs: ${result.metricMap.totalPacks}`,
      `Estimated storage: ${result.metricMap.estimatedStorage}`,
      `Recommended inverters: ${result.metricMap.inverters}`,
      `Estimated price range: ${result.priceRange}`,
      "Note: Based on preset planning prices. Final configuration and quote may differ.",
    ].join("\n"),
  };
}

function calculateSummer(state) {
  const baseRange = getSummerBaseRange(state.size);
  let min = baseRange[0];
  let max = baseRange[1];

  if (state.usage === "weekend") {
    min = Math.max(2, min - 1);
    max = Math.max(min, max - 1);
  }

  if (state.usage === "extended") {
    min = Math.max(min, max);
    max = max + 2;
  }

  if (state.accessories.has("extraBatteryPack")) {
    min += 1;
    max += 1;
  }

  const accessoryItems = SUMMER_ACCESSORIES.filter((item) => state.accessories.has(item.key));
  const inverters = calculateInverterRange(min, max);
  const price = calculatePriceRange(min, max, inverters, accessoryItems);
  const addOns = formatAddOns(accessoryItems);
  const solarNote = getSolarNote(state.solar);
  const storageLabel = formatRange(min, max, " kWh");
  const packsLabel = formatRange(min, max);
  const inverterLabel = formatInverterRange(inverters.min, inverters.max);

  return {
    label: "Summer house estimate",
    priceRange: price.display,
    priceMin: price.min,
    priceMax: price.max,
    metricMap: {
      estimatedStorage: storageLabel,
      batteryPacks: packsLabel,
      inverters: inverterLabel,
    },
    metrics: [
      { label: "Estimated storage", value: storageLabel },
      { label: "Battery Packs", value: packsLabel },
      { label: "Recommended inverters", value: inverterLabel },
      { label: "Estimated price range", value: price.display },
    ],
    notes: [
      addOns,
      solarNote,
    ].filter(Boolean),
  };
}

function calculateInstaller(state) {
  const perVan = getInstallerPerVanRange(state.routine);
  let perVanMin = perVan[0];
  let perVanMax = perVan[1];

  if (state.accessories.has("extraBatteryPacks")) {
    perVanMin += 1;
    perVanMax += 1;
  }

  const min = perVanMin * state.vans;
  const max = perVanMax * state.vans;

  const accessoryItems = INSTALLER_ACCESSORIES.filter((item) => state.accessories.has(item.key));
  const inverters = calculateInverterRange(min, max);
  const price = calculatePriceRange(min, max, inverters, accessoryItems);
  const addOns = formatAddOns(accessoryItems);
  const perVanLabel = formatRange(perVanMin, perVanMax);
  const totalPacksLabel = formatRange(min, max);
  const storageLabel = formatRange(min, max, " kWh");
  const inverterLabel = formatInverterRange(inverters.min, inverters.max);

  return {
    label: "Installer estimate",
    priceRange: price.display,
    priceMin: price.min,
    priceMax: price.max,
    metricMap: {
      perVan: perVanLabel,
      totalPacks: totalPacksLabel,
      estimatedStorage: storageLabel,
      inverters: inverterLabel,
    },
    metrics: [
      { label: "Battery Packs per van", value: perVanLabel },
      { label: "Total Battery Packs", value: totalPacksLabel },
      { label: "Estimated storage", value: storageLabel },
      { label: "Recommended inverters", value: inverterLabel },
      { label: "Estimated price range", value: price.display },
    ],
    notes: [
      addOns,
      `Centralized charging: ${CENTRALIZED_CHARGING_TEXT}`,
    ].filter(Boolean),
  };
}

function getSummerBaseRange(size) {
  if (size < 40) return [2, 3];
  if (size < 80) return [4, 6];
  if (size < 120) return [6, 9];
  if (size < 160) return [9, 12];
  if (size < 200) return [12, 16];
  return [16, 20];
}

function getInstallerPerVanRange(routine) {
  if (routine === "light") return [2, 2];
  if (routine === "extended") return [5, 6];
  return [3, 4];
}

function calculateInverterRange(minPacks, maxPacks) {
  return {
    min: Math.max(1, Math.ceil(minPacks / 12)),
    max: Math.max(1, Math.ceil(maxPacks / 12)),
  };
}

function calculatePriceRange(minPacks, maxPacks, inverters, accessories) {
  const accessoryTotal = accessories.reduce((sum, item) => {
    if (item.addsBatteryPack || item.addsBatteryPacksPerVan) return sum;
    return sum + (PLANNING_PRICES[item.priceKey] ?? 0);
  }, 0);
  const minPrice = minPacks * PLANNING_PRICES.batteryPack + inverters.min * PLANNING_PRICES.inverter + accessoryTotal;
  const maxPrice = maxPacks * PLANNING_PRICES.batteryPack + inverters.max * PLANNING_PRICES.inverter + accessoryTotal;
  return {
    min: minPrice,
    max: maxPrice,
    display: formatPriceRange(minPrice, maxPrice),
  };
}

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function formatPriceRange(min, max) {
  return min === max
    ? `${formatPrice(min)} SEK`
    : `${formatPrice(min)}${RANGE_DASH}${formatPrice(max)} SEK`;
}

function formatRange(min, max, suffix = "") {
  return min === max
    ? `${min}${suffix}`
    : `${min}${RANGE_DASH}${max}${suffix}`;
}

function formatInverterRange(min, max) {
  const range = formatRange(min, max);
  const noun = min === max && min === 1 ? "inverter" : "inverters";
  return `${range} ${noun}`;
}

function formatAddOns(items) {
  if (!items.length) {
    return "Recommended add-ons: Select accessories to include them in the planning estimate.";
  }

  const labels = items.map((item) => item.label);
  return `Recommended add-ons: ${labels.join(", ")}.`;
}

function formatSelectedAccessoryLabels(options, selected) {
  const labels = options
    .filter((item) => selected.has(item.key))
    .map((item) => item.label);

  return labels.length ? labels.join(", ") : "None selected";
}

function formatSolarLabels(selected) {
  const labels = Array.from(selected).map((value) => SOLAR_OPTIONS[value]).filter(Boolean);
  return labels.length ? labels.join(", ") : SOLAR_OPTIONS.none;
}

function getSolarNote(selected) {
  const values = selected instanceof Set ? selected : new Set([selected]);

  if (values.has("tracking")) {
    return `Solar tracking system: Coming soon ${EM_DASH} price not included.`;
  }
  if (values.has("existing")) {
    return "Plan around the existing solar setup and confirm final configuration with a quote.";
  }
  return "No solar pricing included in this planning estimate.";
}
