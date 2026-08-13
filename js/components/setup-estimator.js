import {
  commerceVisibility,
  getPricingComingSoonLabel,
  getQuantityEstimateOnlyLabel,
} from "../config/commerce-visibility.js";

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

const CENTRALIZED_CHARGING_TEXT =
  "Charge Battery Packs at the office or workshop, bring them into the service van, and use practical power where the workday needs it.";

const ESTIMATOR_COPY = {
  en: {
    eyebrow: "Planning estimate",
    title: "Estimate your Voltrix setup.",
    body: "Choose a use case and get a practical starting point for battery packs, accessories and an estimated planning price.",
    summerScenario: "Summer house",
    installerScenario: "Installer",
    approximateSize: "Approx. summer house size",
    usageRhythm: "Usage rhythm",
    accessories: "Accessories",
    solar: "Solar",
    vansTeams: "Number of vans / teams",
    workdayRoutine: "Workday routine",
    resultSummer: "Summer house estimate",
    resultInstaller: "Installer estimate",
    requestQuote: "Request quote",
    addToCart: "Save configuration",
    addedToCart: "Configuration saved",
    planningPrices: "Planning prices only. Final quote may differ.",
    kwhTitle: "What does 1 kWh mean?",
    kwhBody: "1 kWh is useful everyday energy. As a rough guide, it can mean many hours of lighting and device charging, roughly 40–70 full phone charges, or part of a day to about a day of efficient fridge support depending on model and conditions.",
    kwhNote: "Actual runtime depends on appliance power, temperature, charging losses and usage pattern.",
    usageOptions: {
      weekend: "Weekend use",
      regular: "Regular summer use",
      extended: "Extended stays",
    },
    routineOptions: {
      light: "Light support",
      everyday: "Everyday installer routine",
      extended: "Extended workday",
    },
    solarOptions: {
      none: "No solar yet",
      existing: "Existing solar",
      tracking: "Solar tracking system",
    },
    accessoryLabels: {
      voltDock: "VoltDock",
      backpackPowerMounting: "Backpack Power Mounting",
      bikeAccessory: "Bike accessory",
      extraBatteryPack: "Extra Battery Pack",
      extraBatteryPacks: "Extra Battery Packs",
      vanMounting: "Van mounting",
    },
    metrics: {
      estimatedStorage: "Estimated storage",
      batteryPacks: "Battery Packs",
      recommendedInverters: "Recommended inverters",
      estimatedPriceRange: "Estimated price range",
      batteryPacksPerVan: "Battery Packs per van",
      totalBatteryPacks: "Total Battery Packs",
    },
    notes: {
      recommendedEmpty: "Recommended add-ons: Select accessories to include them in the planning estimate.",
      recommendedPrefix: "Recommended add-ons",
      noSolar: "No solar pricing included in this planning estimate.",
      existingSolar: "Plan around the existing solar setup and confirm final configuration with a quote.",
      tracking: "Solar tracking system: Coming soon — price not included.",
      centralizedCharging: `Centralized charging: ${CENTRALIZED_CHARGING_TEXT}`,
      noneSelected: "None selected",
      finalNote: "Note: Based on preset planning prices. Final configuration and quote may differ.",
      cartTitlePrefix: "Estimated Voltrix setup",
      cartSubtitle: "Planning estimate, final quote may differ.",
      cartNotice: "Planning estimate added to cart. Request quote to confirm configuration.",
    },
    invertersSingular: "inverter",
    invertersPlural: "inverters",
    details: {
      scenario: "Scenario",
      solarOptions: "Solar options",
      solarNote: "Solar note",
      vansTeams: "Vans / teams",
      centralizedCharging: "Centralized charging",
    },
    centralizedChargingText: CENTRALIZED_CHARGING_TEXT,
  },
  sv: {
    eyebrow: "Planeringsestimat",
    title: "Uppskatta din Voltrix-setup.",
    body: "Välj användning och få en praktisk startpunkt för batteripack, tillbehör och uppskattat planeringspris.",
    summerScenario: "Fritidshus",
    installerScenario: "Installatör",
    approximateSize: "Ungefärlig storlek på fritidshus",
    usageRhythm: "Användningsrytm",
    accessories: "Tillbehör",
    solar: "Solenergi",
    vansTeams: "Antal servicebilar / team",
    workdayRoutine: "Arbetsrutin",
    resultSummer: "Fritidshusestimat",
    resultInstaller: "Installatörsestimat",
    requestQuote: "Begär offert",
    addToCart: "Spara konfiguration",
    addedToCart: "Konfiguration sparad",
    planningPrices: "Endast planeringspriser. Slutlig offert kan skilja sig.",
    kwhTitle: "Vad betyder 1 kWh?",
    kwhBody: "1 kWh är användbar vardagsenergi. Som grov riktlinje kan det innebära många timmars belysning och enhetsladdning, ungefär 40–70 fulla telefonladdningar eller delar av en dag till cirka en dag för ett effektivt kylskåp beroende på modell och förhållanden.",
    kwhNote: "Faktisk drifttid beror på apparatens effekt, temperatur, laddförluster och användningsmönster.",
    usageOptions: {
      weekend: "Helganvändning",
      regular: "Regelbunden säsongsanvändning",
      extended: "Längre vistelser",
    },
    routineOptions: {
      light: "Lätt stöd",
      everyday: "Vardaglig installatörsrutin",
      extended: "Längre arbetsdag",
    },
    solarOptions: {
      none: "Ingen solenergi ännu",
      existing: "Befintlig solenergi",
      tracking: "Solar tracking system",
    },
    accessoryLabels: {
      voltDock: "VoltDock",
      backpackPowerMounting: "Backpack Power Mounting",
      bikeAccessory: "Bike accessory",
      extraBatteryPack: "Extra batteripack",
      extraBatteryPacks: "Extra batteripack",
      vanMounting: "Montering i servicebil",
    },
    metrics: {
      estimatedStorage: "Uppskattad lagring",
      batteryPacks: "Batteripack",
      recommendedInverters: "Rekommenderade växelriktare",
      estimatedPriceRange: "Uppskattat prisintervall",
      batteryPacksPerVan: "Batteripack per servicebil",
      totalBatteryPacks: "Totalt antal batteripack",
    },
    notes: {
      recommendedEmpty: "Rekommenderade tillbehör: Välj tillbehör för att inkludera dem i planeringsestimatet.",
      recommendedPrefix: "Rekommenderade tillbehör",
      noSolar: "Ingen solenergiprissättning ingår i detta planeringsestimat.",
      existingSolar: "Planera utifrån befintlig solenergi och bekräfta slutlig konfiguration med offert.",
      tracking: "Solar tracking system: Kommer snart — pris ingår inte.",
      centralizedCharging: "Centraliserad laddning: Ladda batteripack på kontoret eller i verkstaden, ta sedan med dem i servicebilen och använd energin där arbetsdagen behöver den.",
      noneSelected: "Inget valt",
      finalNote: "Obs: Baserat på förinställda planeringspriser. Slutlig konfiguration och offert kan skilja sig.",
      cartTitlePrefix: "Uppskattad Voltrix-setup",
      cartSubtitle: "Planeringsestimat, slutlig offert kan skilja sig.",
      cartNotice: "Planeringskonfiguration sparad i varukorgen. Begär offert för att bekräfta den slutliga lösningen.",
    },
    invertersSingular: "växelriktare",
    invertersPlural: "växelriktare",
    details: {
      scenario: "Scenario",
      solarOptions: "Solenergival",
      solarNote: "Solenergianteckning",
      vansTeams: "Servicebilar / team",
      centralizedCharging: "Centraliserad laddning",
    },
    centralizedChargingText: "Ladda batteripack på kontoret eller i verkstaden, ta sedan med dem i servicebilen och använd energin där arbetsdagen behöver den.",
  },
};

function getEstimatorCopy() {
  const lang = typeof document !== "undefined" ? document.documentElement.lang : "en";
  const copy = ESTIMATOR_COPY[lang] ?? ESTIMATOR_COPY.en;

  if (commerceVisibility.showEstimatorPrices) {
    return copy;
  }

  return {
    ...copy,
    body: lang === "sv"
      ? "Välj användning och få en praktisk startpunkt för batteripack och tillbehör."
      : "Choose a use case and get a practical starting point for battery packs and accessories.",
    planningPrices: getPricingComingSoonLabel(lang),
    notes: {
      ...copy.notes,
      noSolar: lang === "sv"
        ? "Solenergival används endast för konfigurationen."
        : "Solar options are used for configuration only.",
      tracking: lang === "sv" ? "Solar tracking system: Kommer snart." : "Solar tracking system: Coming soon.",
      finalNote: getQuantityEstimateOnlyLabel(lang),
      cartSubtitle: getQuantityEstimateOnlyLabel(lang),
    },
  };
}

function getAccessoryOptions(options, copy) {
  return options.map((item) => ({
    ...item,
    label: copy.accessoryLabels[item.key] ?? item.label,
  }));
}

export function renderSetupEstimator({ context = "home" } = {}) {
  const copy = getEstimatorCopy();
  const shellClass = context === "products"
    ? "showroom-section showroom-section--sage editorial-section--soft setup-estimator-shell"
    : "platform-home-section platform-home-section--milk setup-estimator-shell";
  const innerClass = context === "products"
    ? "setup-estimator"
    : "home-section-inner setup-estimator";
  const shellId = context === "products" ? ' id="setup-estimator"' : "";

  return `
    <section class="${shellClass}"${shellId} aria-labelledby="setup-estimator-title" data-setup-estimator>
      <div class="${innerClass}">
        <div class="setup-estimator__head">
          <span class="platform-eyebrow">${copy.eyebrow}</span>
          <h2 id="setup-estimator-title">${copy.title}</h2>
          <p>${copy.body}</p>
        </div>

        <div class="setup-estimator__selector" role="tablist" aria-label="Estimator use case">
          <button class="setup-estimator__scenario is-active" type="button" role="tab" aria-selected="true" data-estimator-scenario="summer">
            ${copy.summerScenario}
          </button>
          <button class="setup-estimator__scenario" type="button" role="tab" aria-selected="false" data-estimator-scenario="installer">
            ${copy.installerScenario}
          </button>
        </div>

        <div class="setup-estimator__body">
          ${renderSummerPanel(copy)}
          ${renderInstallerPanel(copy)}
          ${renderResultPanel(copy)}
        </div>

      </div>
    </section>
  `;
}

function renderSummerPanel(copy) {
  return `
    <div class="setup-estimator__panel is-active" data-estimator-panel="summer">
      <div class="setup-estimator__control setup-estimator__control--range" data-estimator-step="summer-size">
        ${renderStepToggle(copy.approximateSize)}
        <div class="setup-estimator__step-body">
          <div class="setup-estimator__control-head">
            <strong>${copy.approximateSize}</strong>
            <output data-summer-size-output>65 ${SQUARE_METERS}</output>
          </div>
          <input type="range" min="20" max="240" value="65" step="5" data-summer-size>
        </div>
      </div>

      ${renderOptionGroup(copy.usageRhythm, "usage", copy.usageOptions, "regular")}
      ${renderSolarGroup(copy)}
      ${renderCheckboxGroup(copy.accessories, "summer", getAccessoryOptions(SUMMER_ACCESSORIES, copy))}
    </div>
  `;
}

function renderInstallerPanel(copy) {
  return `
    <div class="setup-estimator__panel" data-estimator-panel="installer" hidden>
      ${renderOptionGroup(copy.vansTeams, "vans", { 1: "1", 2: "2", 3: "3", 4: "4+" }, "1")}
      ${renderOptionGroup(copy.workdayRoutine, "routine", copy.routineOptions, "everyday")}
      ${renderCheckboxGroup(copy.accessories, "installer", getAccessoryOptions(INSTALLER_ACCESSORIES, copy))}
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

function renderSolarGroup(copy) {
  return `
    <fieldset class="setup-estimator__control" data-estimator-step="solar">
      <legend>${copy.solar}</legend>
      ${renderStepToggle(copy.solar)}
      <div class="setup-estimator__step-body">
        <div class="setup-estimator__checks">
          ${Object.entries(copy.solarOptions).map(([value, label]) => `
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

function renderResultPanel(copy) {
  return `
    <aside class="setup-estimator__result" aria-live="polite">
      <span class="setup-estimator__result-label" data-result-label>${copy.resultSummer}</span>
      <div class="setup-estimator__result-grid" data-result-metrics></div>
      <div class="setup-estimator__result-notes" data-result-notes></div>
      ${renderKwhHelper(copy)}
      <div class="setup-estimator__result-actions">
        <a class="button button--primary" href="/views/b2b.html">${copy.requestQuote}</a>
        <button class="button button--secondary" type="button" data-estimator-add-to-cart>${copy.addToCart}</button>
      </div>
      <small>${copy.planningPrices}</small>
    </aside>
  `;
}

function renderKwhHelper(copy) {
  return `
    <details class="setup-estimator__details">
      <summary>${copy.kwhTitle}</summary>
      <p>${copy.kwhBody}</p>
      <small>${copy.kwhNote}</small>
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
  const copy = getEstimatorCopy();
  setStepSummary(root, "summer-size", `${state.summer.size} ${SQUARE_METERS}`);
  setStepSummary(root, "usage", copy.usageOptions[state.summer.usage]);
  setStepSummary(root, "solar", formatSolarLabels(state.summer.solar, copy));
  setStepSummary(root, "summer-accessories", formatSelectedAccessoryLabels(getAccessoryOptions(SUMMER_ACCESSORIES, copy), state.summer.accessories, copy));
  setStepSummary(root, "vans", `${state.installer.vans}`);
  setStepSummary(root, "routine", copy.routineOptions[state.installer.routine]);
  setStepSummary(root, "installer-accessories", formatSelectedAccessoryLabels(getAccessoryOptions(INSTALLER_ACCESSORIES, copy), state.installer.accessories, copy));
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
      <div class="setup-estimator__metric ${metric.placeholder ? "setup-estimator__metric--placeholder" : ""}">
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
  const copy = getEstimatorCopy();
  const payload = buildEstimatePayload(state);
  const cart = readCart();
  const item = {
    type: "planning-estimate",
    cartItemId: `planning-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    quantity: 1,
    unitPrice: 0,
    title: `${copy.notes.cartTitlePrefix} - ${payload.scenarioLabel}`,
    subtitle: copy.notes.cartSubtitle,
    scenario: payload.scenarioLabel,
    ...(commerceVisibility.showEstimatorPrices ? {
      estimatedPriceRange: payload.result.priceRange,
      estimatedPriceMin: payload.result.priceMin,
      estimatedPriceMax: payload.result.priceMax,
    } : {}),
    details: payload.cartDetails,
    summary: payload.summary,
  };

  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  sessionStorage.setItem(CART_NOTICE_KEY, copy.notes.cartNotice);
  updateCartCount(cart);

  const button = root.querySelector("[data-estimator-add-to-cart]");
  if (button) {
    const original = button.textContent;
    button.textContent = copy.addedToCart;
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
  const copy = getEstimatorCopy();
  return state.scenario === "installer"
    ? buildInstallerPayload(state.installer, copy)
    : buildSummerPayload(state.summer, copy);
}

function buildSummerPayload(state, copy) {
  const result = calculateSummer(state, copy);
  const solarLabels = formatSolarLabels(state.solar, copy);
  const solarNote = getSolarNote(state.solar, copy);
  const accessoryLabels = formatSelectedAccessoryLabels(getAccessoryOptions(SUMMER_ACCESSORIES, copy), state.accessories, copy);
  const details = [
    [copy.details.scenario, copy.summerScenario],
    [copy.approximateSize, `${state.size} ${SQUARE_METERS}`],
    [copy.usageRhythm, copy.usageOptions[state.usage]],
    [copy.details.solarOptions, solarLabels],
    [copy.details.solarNote, solarNote],
    [copy.accessories, accessoryLabels],
    [copy.metrics.estimatedStorage, result.metricMap.estimatedStorage],
    [copy.metrics.batteryPacks, result.metricMap.batteryPacks],
    [copy.metrics.recommendedInverters, result.metricMap.inverters],
  ];
  if (commerceVisibility.showEstimatorPrices) {
    details.push([copy.metrics.estimatedPriceRange, result.priceRange]);
  }

  const summary = [
    `${copy.notes.cartTitlePrefix} - ${copy.summerScenario}`,
    `${copy.approximateSize}: ${state.size} ${SQUARE_METERS}`,
    `${copy.usageRhythm}: ${copy.usageOptions[state.usage]}`,
    `${copy.details.solarOptions}: ${solarLabels}`,
    `${copy.details.solarNote}: ${solarNote}`,
    `${copy.accessories}: ${accessoryLabels}`,
    `${copy.metrics.estimatedStorage}: ${result.metricMap.estimatedStorage}`,
    `${copy.metrics.batteryPacks}: ${result.metricMap.batteryPacks}`,
    `${copy.metrics.recommendedInverters}: ${result.metricMap.inverters}`,
  ];
  if (commerceVisibility.showEstimatorPrices) {
    summary.push(`${copy.metrics.estimatedPriceRange}: ${result.priceRange}`);
  }
  summary.push(copy.notes.finalNote);

  return {
    scenarioLabel: copy.summerScenario,
    result,
    cartDetails: details,
    summary: summary.join("\n"),
  };
}

function buildInstallerPayload(state, copy) {
  const result = calculateInstaller(state, copy);
  const accessoryLabels = formatSelectedAccessoryLabels(getAccessoryOptions(INSTALLER_ACCESSORIES, copy), state.accessories, copy);
  const details = [
    [copy.details.scenario, copy.installerScenario],
    [copy.details.vansTeams, String(state.vans)],
    [copy.workdayRoutine, copy.routineOptions[state.routine]],
    [copy.details.centralizedCharging, copy.centralizedChargingText],
    [copy.accessories, accessoryLabels],
    [copy.metrics.batteryPacksPerVan, result.metricMap.perVan],
    [copy.metrics.totalBatteryPacks, result.metricMap.totalPacks],
    [copy.metrics.estimatedStorage, result.metricMap.estimatedStorage],
    [copy.metrics.recommendedInverters, result.metricMap.inverters],
  ];
  if (commerceVisibility.showEstimatorPrices) {
    details.push([copy.metrics.estimatedPriceRange, result.priceRange]);
  }

  const summary = [
    `${copy.notes.cartTitlePrefix} - ${copy.installerScenario}`,
    `${copy.details.vansTeams}: ${state.vans}`,
    `${copy.workdayRoutine}: ${copy.routineOptions[state.routine]}`,
    `${copy.details.centralizedCharging}: ${copy.centralizedChargingText}`,
    `${copy.accessories}: ${accessoryLabels}`,
    `${copy.metrics.batteryPacksPerVan}: ${result.metricMap.perVan}`,
    `${copy.metrics.totalBatteryPacks}: ${result.metricMap.totalPacks}`,
    `${copy.metrics.estimatedStorage}: ${result.metricMap.estimatedStorage}`,
    `${copy.metrics.recommendedInverters}: ${result.metricMap.inverters}`,
  ];
  if (commerceVisibility.showEstimatorPrices) {
    summary.push(`${copy.metrics.estimatedPriceRange}: ${result.priceRange}`);
  }
  summary.push(copy.notes.finalNote);

  return {
    scenarioLabel: copy.installerScenario,
    result,
    cartDetails: details,
    summary: summary.join("\n"),
  };
}

function calculateSummer(state, copy) {
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

  const accessoryItems = getAccessoryOptions(SUMMER_ACCESSORIES, copy).filter((item) => state.accessories.has(item.key));
  const inverters = calculateInverterRange(min, max);
  const price = calculatePriceRange(min, max, inverters, accessoryItems);
  const addOns = formatAddOns(accessoryItems);
  const solarNote = getSolarNote(state.solar);
  const storageLabel = formatRange(min, max, " kWh");
  const packsLabel = formatRange(min, max);
  const inverterLabel = formatInverterRange(inverters.min, inverters.max);

  return {
    label: copy.resultSummer,
    priceRange: price.display,
    priceMin: price.min,
    priceMax: price.max,
    metricMap: {
      estimatedStorage: storageLabel,
      batteryPacks: packsLabel,
      inverters: inverterLabel,
    },
    metrics: [
      { label: copy.metrics.estimatedStorage, value: storageLabel },
      { label: copy.metrics.batteryPacks, value: packsLabel },
      { label: copy.metrics.recommendedInverters, value: inverterLabel },
      {
        label: copy.metrics.estimatedPriceRange,
        value: commerceVisibility.showEstimatorPrices
          ? price.display
          : getPricingComingSoonLabel(document.documentElement.lang || "en"),
        placeholder: !commerceVisibility.showEstimatorPrices,
      },
    ],
    notes: [
      addOns,
      solarNote,
    ].filter(Boolean),
  };
}

function calculateInstaller(state, copy) {
  const perVan = getInstallerPerVanRange(state.routine);
  let perVanMin = perVan[0];
  let perVanMax = perVan[1];

  if (state.accessories.has("extraBatteryPacks")) {
    perVanMin += 1;
    perVanMax += 1;
  }

  const min = perVanMin * state.vans;
  const max = perVanMax * state.vans;

  const accessoryItems = getAccessoryOptions(INSTALLER_ACCESSORIES, copy).filter((item) => state.accessories.has(item.key));
  const inverters = calculateInverterRange(min, max);
  const price = calculatePriceRange(min, max, inverters, accessoryItems);
  const addOns = formatAddOns(accessoryItems);
  const perVanLabel = formatRange(perVanMin, perVanMax);
  const totalPacksLabel = formatRange(min, max);
  const storageLabel = formatRange(min, max, " kWh");
  const inverterLabel = formatInverterRange(inverters.min, inverters.max);

  return {
    label: copy.resultInstaller,
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
      { label: copy.metrics.batteryPacksPerVan, value: perVanLabel },
      { label: copy.metrics.totalBatteryPacks, value: totalPacksLabel },
      { label: copy.metrics.estimatedStorage, value: storageLabel },
      { label: copy.metrics.recommendedInverters, value: inverterLabel },
      {
        label: copy.metrics.estimatedPriceRange,
        value: commerceVisibility.showEstimatorPrices
          ? price.display
          : getPricingComingSoonLabel(document.documentElement.lang || "en"),
        placeholder: !commerceVisibility.showEstimatorPrices,
      },
    ],
    notes: [
      addOns,
      copy.notes.centralizedCharging,
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
  const copy = getEstimatorCopy();
  const range = formatRange(min, max);
  const noun = min === max && min === 1 ? copy.invertersSingular : copy.invertersPlural;
  return `${range} ${noun}`;
}

function formatAddOns(items) {
  const copy = getEstimatorCopy();
  if (!items.length) {
    return copy.notes.recommendedEmpty;
  }

  const labels = items.map((item) => item.label);
  return `${copy.notes.recommendedPrefix}: ${labels.join(", ")}.`;
}

function formatSelectedAccessoryLabels(options, selected, copy = getEstimatorCopy()) {
  const labels = options
    .filter((item) => selected.has(item.key))
    .map((item) => item.label);

  return labels.length ? labels.join(", ") : copy.notes.noneSelected;
}

function formatSolarLabels(selected, copy = getEstimatorCopy()) {
  const labels = Array.from(selected).map((value) => copy.solarOptions[value]).filter(Boolean);
  return labels.length ? labels.join(", ") : copy.solarOptions.none;
}

function getSolarNote(selected, copy = getEstimatorCopy()) {
  const values = selected instanceof Set ? selected : new Set([selected]);

  if (values.has("tracking")) {
    return copy.notes.tracking;
  }
  if (values.has("existing")) {
    return copy.notes.existingSolar;
  }
  return copy.notes.noSolar;
}
