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
const PLANNING_MARGIN = 1.15;
const KWH_PER_BATTERY_PACK = 1;
const BATTERY_PACKS_PER_PCS = 7;

const HOME_SUMMER_PROFILES = {
  basic: { low: 0.8, recommended: 1.0, high: 1.2 },
  comfort: { low: 1.5, recommended: 1.85, high: 2.2 },
  extended: { low: 2.3, recommended: 2.75, high: 3.2 },
};

const HOME_INSTALLER_PROFILES = {
  light: { low: 0.7, recommended: 0.85, high: 1.0 },
  standard: { low: 1.2, recommended: 1.45, high: 1.7 },
  intensive: { low: 2.0, recommended: 2.35, high: 2.7 },
};

const HOME_ESTIMATOR_COPY = {
  en: {
    eyebrow: "Planning estimate",
    title: "Estimate your Voltrix setup.",
    body: "Start with a recommended configuration, then adjust the assumptions to match how energy is used and recharged.",
    recommendedSetup: "Your recommended setup",
    storage: "Storage",
    batteryPacks: "Battery Packs",
    planningRange: "Planning range",
    pcs: "PCS",
    price: "Price",
    priceSoon: "Price coming soon",
    adjustTitle: "Adjust the recommendation",
    secondaryTitle: "Setup context and accessories",
    secondaryBody: "These choices are included in the saved configuration but do not reduce the core energy estimate.",
    summerProfile: "Usage profile",
    summerRecharge: "Reliable recharge interval",
    installerTeams: "Field teams needing energy simultaneously",
    installerProfile: "Field-work profile",
    installerRecharge: "Days between reliable return-to-base charging",
    solar: "Solar and recharge context",
    accessories: "Accessories",
    profiles: {
      basic: ["Basic", "Lighting, Wi-Fi, phones, laptop and small electronics"],
      comfort: ["Everyday comfort", "Basic use plus fridge, TV, small appliances and a small pump"],
      extended: ["Extended use", "More devices, longer stays and more frequent everyday use"],
      light: ["Light", "Phones, test equipment, work lights and occasional tool-battery charging"],
      standard: ["Standard", "Regular tool-battery charging, work lights and normal field equipment"],
      intensive: ["Intensive", "Frequent charging, longer workdays and greater mobile energy demand"],
    },
    days: { 1: "Daily", 2: "About 2 days", 3: "About 3 days" },
    installerDays: { 1: "Daily", 2: "2 days", 3: "3 days" },
    assumptions: "Planning assumptions",
    assumptionsBody: "1 Battery Pack equals 1 kWh. The estimate includes a 15% planning margin and recommends one PCS for up to seven Battery Packs.",
    centralized: "Battery Packs are charged centrally at the office or workshop, travel in the service van and form one shared pool for work on site.",
    boundaryTitle: "Planning note",
    boundaryBody: "The upper planning range may require an additional PCS and detailed sizing with Alva.",
    largeTitle: "Larger system",
    largeBody: "This estimate involves multiple Voltrix systems and should be dimensioned together with Alva before it is treated as a final system design.",
    requestQuote: "Request quote",
    requestSizing: "Contact Alva for sizing",
    save: "Save configuration",
    saved: "Configuration saved",
    details: "How the estimate is calculated",
    quantityOnly: "Quantity estimate only. Final configuration is confirmed with Alva.",
    backpackProminence: "Best for last-metre work",
    recommendedAddons: "Recommended add-ons",
    change: "Change",
    edit: "Edit",
    planningLine: "Planning estimate only · 1 Battery Pack = 1 kWh · 1 PCS supports up to 7 Battery Packs",
    finalConfiguration: "Final configuration is confirmed with Alva.",
  },
  sv: {
    eyebrow: "Planeringsestimat",
    title: "Uppskatta din Voltrix-setup.",
    body: "Börja med en rekommenderad konfiguration och justera sedan antagandena efter hur energin används och laddas.",
    recommendedSetup: "Din rekommenderade setup",
    storage: "Lagring",
    batteryPacks: "Battery Packs",
    planningRange: "Planeringsintervall",
    pcs: "PCS",
    price: "Pris",
    priceSoon: "Pris kommer snart",
    adjustTitle: "Justera rekommendationen",
    secondaryTitle: "Laddning och tillbehör",
    secondaryBody: "Valen sparas med konfigurationen men minskar inte det grundläggande energibehovet.",
    summerProfile: "Användningsprofil",
    summerRecharge: "Intervall till säker laddning",
    installerTeams: "Team som behöver energi samtidigt",
    installerProfile: "Arbetsprofil på plats",
    installerRecharge: "Dagar mellan säker återladdning på basen",
    solar: "Solenergi och laddningskontext",
    accessories: "Tillbehör",
    profiles: {
      basic: ["Grundläggande", "Belysning, Wi-Fi, telefoner, laptop och mindre elektronik"],
      comfort: ["Vardagskomfort", "Grundbehov plus kylskåp, TV, småapparater och en mindre pump"],
      extended: ["Utökad användning", "Fler enheter, längre vistelser och tätare vardagsanvändning"],
      light: ["Lätt", "Telefoner, testutrustning, arbetsljus och enstaka laddning av verktygsbatterier"],
      standard: ["Standard", "Regelbunden laddning av verktygsbatterier, arbetsljus och normal fältutrustning"],
      intensive: ["Intensiv", "Frekvent laddning, längre arbetsdagar och större mobilt energibehov"],
    },
    days: { 1: "Dagligen", 2: "Cirka 2 dagar", 3: "Cirka 3 dagar" },
    installerDays: { 1: "Dagligen", 2: "2 dagar", 3: "3 dagar" },
    assumptions: "Planeringsantaganden",
    assumptionsBody: "1 Battery Pack motsvarar 1 kWh. Estimatet inkluderar 15 % planeringsmarginal och rekommenderar en PCS för upp till sju Battery Packs.",
    centralized: "Battery Packs laddas centralt på kontoret eller i verkstaden, följer med i servicebilen och bildar en gemensam pool för arbetet på plats.",
    boundaryTitle: "Planeringsnotering",
    boundaryBody: "Det övre planeringsintervallet kan kräva ytterligare PCS och detaljerad dimensionering med Alva.",
    largeTitle: "Större system",
    largeBody: "Estimatet omfattar flera Voltrix-system och bör dimensioneras tillsammans med Alva innan det betraktas som en färdig systemdesign.",
    requestQuote: "Begär offert",
    requestSizing: "Kontakta Alva för dimensionering",
    save: "Spara konfiguration",
    saved: "Konfiguration sparad",
    details: "Så beräknas estimatet",
    quantityOnly: "Endast mängdberäkning. Slutlig konfiguration bekräftas med Alva.",
    backpackProminence: "Bäst för arbetet sista biten",
    recommendedAddons: "Rekommenderade tillbehör",
    change: "Ändra",
    edit: "Redigera",
    planningLine: "Endast planeringsestimat · 1 Battery Pack = 1 kWh · 1 PCS stöder upp till 7 Battery Packs",
    finalConfiguration: "Slutlig konfiguration bekräftas med Alva.",
  },
};

const SUMMER_ACCESSORIES = [
  { key: "voltDock", label: "VoltDock", priceKey: "voltDock" },
  { key: "fieldPack", label: "Voltrix FieldPack" },
  { key: "bikeAccessory", label: "Bike accessory", priceKey: "bikeAccessory" },
  { key: "extraBatteryPack", label: "Extra Battery Pack", priceKey: "batteryPack", addsBatteryPack: true },
];

const INSTALLER_ACCESSORIES = [
  { key: "voltDock", label: "VoltDock", priceKey: "voltDock" },
  { key: "fieldPack", label: "Voltrix FieldPack" },
  { key: "extraBatteryPacks", label: "Extra Battery Packs", priceKey: "batteryPack", addsBatteryPacksPerVan: 1 },
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
      tracking: "Tracker · solar tracking",
    },
    accessoryLabels: {
      voltDock: "VoltDock",
      fieldPack: "Voltrix FieldPack",
      backpackPowerMounting: "Voltrix Carrier",
      bikeAccessory: "Bike accessory",
      extraBatteryPack: "Extra Battery Pack",
      extraBatteryPacks: "Extra Battery Packs",
      vanMounting: "Van mounting",
    },
    metrics: {
      estimatedStorage: "Estimated storage",
      batteryPacks: "Battery Packs",
      recommendedInverters: "Recommended Voltrix groups / PCS",
      estimatedPriceRange: "Estimated price range",
      batteryPacksPerVan: "Battery Packs per van",
      totalBatteryPacks: "Total Battery Packs",
    },
    notes: {
      recommendedEmpty: "Recommended add-ons: Select accessories to include them in the planning estimate.",
      recommendedPrefix: "Recommended add-ons",
      noSolar: "No solar pricing included in this planning estimate.",
      existingSolar: "Plan around the existing solar setup and confirm final configuration with a quote.",
      tracking: "Solar tracking system pricing is not included in this planning estimate.",
      centralizedCharging: `Centralized charging: ${CENTRALIZED_CHARGING_TEXT}`,
      noneSelected: "None selected",
      finalNote: "Note: Based on preset planning prices. Final configuration and quote may differ.",
      cartTitlePrefix: "Estimated Voltrix setup",
      cartSubtitle: "Planning estimate, final quote may differ.",
      cartNotice: "Planning configuration saved. Request a quote to confirm your setup.",
      architectureRule: "One Voltrix group / PCS is recommended for 1–7 Battery Packs. Add another group / PCS above 7 packs.",
    },
    invertersSingular: "Voltrix group / PCS",
    invertersPlural: "Voltrix groups / PCS",
    moreDetails: "Planning details",
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
      tracking: "Tracker · solspårning",
    },
    accessoryLabels: {
      voltDock: "VoltDock",
      fieldPack: "Voltrix FieldPack",
      backpackPowerMounting: "Voltrix Carrier",
      bikeAccessory: "Bike accessory",
      extraBatteryPack: "Extra batteripack",
      extraBatteryPacks: "Extra batteripack",
      vanMounting: "Montering i servicebil",
    },
    metrics: {
      estimatedStorage: "Uppskattad lagring",
      batteryPacks: "Batteripack",
      recommendedInverters: "Rekommenderade Voltrix-grupper / PCS",
      estimatedPriceRange: "Uppskattat prisintervall",
      batteryPacksPerVan: "Batteripack per servicebil",
      totalBatteryPacks: "Totalt antal batteripack",
    },
    notes: {
      recommendedEmpty: "Rekommenderade tillbehör: Välj tillbehör för att inkludera dem i planeringsestimatet.",
      recommendedPrefix: "Rekommenderade tillbehör",
      noSolar: "Ingen solenergiprissättning ingår i detta planeringsestimat.",
      existingSolar: "Planera utifrån befintlig solenergi och bekräfta slutlig konfiguration med offert.",
      tracking: "Pris för Solar tracking system ingår inte i planeringsestimatet.",
      centralizedCharging: "Centraliserad laddning: Ladda batteripack på kontoret eller i verkstaden, ta sedan med dem i servicebilen och använd energin där arbetsdagen behöver den.",
      noneSelected: "Inget valt",
      finalNote: "Obs: Baserat på förinställda planeringspriser. Slutlig konfiguration och offert kan skilja sig.",
      cartTitlePrefix: "Uppskattad Voltrix-setup",
      cartSubtitle: "Planeringsestimat, slutlig offert kan skilja sig.",
      cartNotice: "Planeringskonfiguration sparad. Begär offert för att bekräfta din setup.",
      architectureRule: "En Voltrix-grupp / PCS rekommenderas för 1–7 Battery Packs. Lägg till ytterligare en grupp / PCS över 7 pack.",
    },
    invertersSingular: "Voltrix-grupp / PCS",
    invertersPlural: "Voltrix-grupper / PCS",
    moreDetails: "Planeringsdetaljer",
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

function getEstimatorCopy(langOverride) {
  const lang = langOverride ?? (typeof document !== "undefined" ? document.documentElement.lang : "en");
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
      tracking: lang === "sv"
        ? "Solar tracking system ingår endast i konfigurationen."
        : "Solar tracking system is included in the configuration only.",
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

function getHomeEstimatorCopy(langOverride) {
  const lang = langOverride ?? (typeof document !== "undefined" ? document.documentElement.lang : "en");
  return HOME_ESTIMATOR_COPY[lang] ?? HOME_ESTIMATOR_COPY.en;
}

export function renderSetupEstimator({ context = "home" } = {}) {
  return renderHomeSetupEstimator(getEstimatorCopy(), getHomeEstimatorCopy(), context);
}

function renderHomeSetupEstimator(copy, homeCopy, context) {
  return `
    <section class="platform-home-section platform-home-section--sage platform-home-section--estimator setup-estimator-shell" ${context === "products" ? 'id="setup-estimator"' : ""} aria-labelledby="setup-estimator-title" data-setup-estimator data-home-estimator>
      <div class="home-section-inner setup-estimator setup-estimator--home-v2">
        <div class="setup-estimator__head">
          <span class="platform-eyebrow">${homeCopy.eyebrow}</span>
          <h2 id="setup-estimator-title">${homeCopy.title}</h2>
          <p>${homeCopy.body}</p>
        </div>

        <div class="setup-estimator__selector" role="tablist" aria-label="Estimator use case">
          <button class="setup-estimator__scenario is-active" id="home-estimator-tab-summer" type="button" role="tab" aria-controls="home-estimator-panel-summer" aria-selected="true" data-estimator-scenario="summer">
            ${copy.summerScenario}
          </button>
          <button class="setup-estimator__scenario" id="home-estimator-tab-installer" type="button" role="tab" aria-controls="home-estimator-panel-installer" aria-selected="false" data-estimator-scenario="installer">
            ${copy.installerScenario}
          </button>
        </div>

        ${renderHomeResultBand(homeCopy)}

        <div class="setup-estimator__body setup-estimator__adjustments">
          ${renderHomeSummerPanel(copy, homeCopy)}
          ${renderHomeInstallerPanel(copy, homeCopy)}
        </div>

        <div class="setup-estimator__footer">
          <div class="setup-estimator__planning-copy">
            <p>${homeCopy.planningLine}</p>
            <small>${homeCopy.finalConfiguration}</small>
          </div>
          <div class="setup-estimator__result-actions">
            <a class="button button--primary" href="/views/b2b.html" data-estimator-quote>${homeCopy.requestQuote}</a>
            <button class="button button--secondary" type="button" data-estimator-add-to-cart>${homeCopy.save}</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderHomeResultBand(homeCopy) {
  return `
    <aside class="setup-estimator__recommendation" aria-live="polite" data-home-result>
      <span class="setup-estimator__result-label" data-result-label>${homeCopy.recommendedSetup}</span>
      <div class="setup-estimator__recommendation-grid" data-result-metrics></div>
      <div class="setup-estimator__advisory" data-result-advisory hidden>
        <strong data-advisory-title></strong>
        <p data-advisory-body></p>
      </div>
    </aside>
  `;
}

function renderHomeSummerPanel(copy, homeCopy) {
  return `
    <div class="setup-estimator__panel is-active" id="home-estimator-panel-summer" role="tabpanel" aria-labelledby="home-estimator-tab-summer" data-estimator-panel="summer">
      <div class="setup-estimator__panel-heading">
        <span>${homeCopy.adjustTitle}</span>
      </div>
      ${renderHomeProfileGroup(homeCopy.summerProfile, "summer-profile", ["basic", "comfort", "extended"], "comfort", homeCopy)}
      ${renderHomeSegmentedGroup(homeCopy.summerRecharge, "summer-days", homeCopy.days, "2")}
      <div class="setup-estimator__secondary">
        ${renderHomeSecondaryDisclosure({
          label: homeCopy.solar,
          action: homeCopy.change,
          summaryKey: "summer-solar",
          kind: "solar",
          icon: "solar",
          content: renderHomeSolarChoices(copy, homeCopy.solar) + `<div class="estimator-solar-context" data-tracker-context hidden><strong>Tracker + Voltrix</strong><p>${document.documentElement.lang==='sv'?'Tracker ingår i din förfrågan. Alva bekräftar paneler, placering och anslutningar. Solenergi minskar inte batterirekommendationen automatiskt.':'Tracker is included in your enquiry. Alva confirms panels, placement and connections. Solar does not automatically reduce the battery recommendation.'}</p><a href="/views/solution-summer-house.html#summer-solar">${document.documentElement.lang==='sv'?'Så fungerar solenergi för fritidshuset':'How summer house solar works'} →</a></div>`,
        })}
        ${renderHomeSecondaryDisclosure({
          label: homeCopy.recommendedAddons,
          action: homeCopy.edit,
          summaryKey: "summer-accessories",
          kind: "addons",
          scenario: "summer",
          icon: "accessory",
          content: renderHomeAccessoryChoices(homeCopy.accessories, "summer", getAccessoryOptions(SUMMER_ACCESSORIES, copy)),
        })}
      </div>
    </div>
  `;
}

function renderHomeInstallerPanel(copy, homeCopy) {
  const installerAccessories = getAccessoryOptions(INSTALLER_ACCESSORIES, copy).sort((a, b) => {
    if (a.key === "fieldPack") return -1;
    if (b.key === "fieldPack") return 1;
    return 0;
  });

  return `
    <div class="setup-estimator__panel" id="home-estimator-panel-installer" role="tabpanel" aria-labelledby="home-estimator-tab-installer" data-estimator-panel="installer" hidden>
      <div class="setup-estimator__panel-heading">
        <span>${homeCopy.adjustTitle}</span>
      </div>
      ${renderHomeSegmentedGroup(homeCopy.installerTeams, "installer-teams", { 1: "1", 2: "2", 3: "3", 4: "4", 5: "5+" }, "3")}
      ${renderHomeProfileGroup(homeCopy.installerProfile, "installer-profile", ["light", "standard", "intensive"], "standard", homeCopy)}
      ${renderHomeSegmentedGroup(homeCopy.installerRecharge, "installer-days", homeCopy.installerDays, "1")}
      <div class="setup-estimator__secondary">
        <p class="setup-estimator__secondary-context">${homeCopy.centralized}</p>
        ${renderHomeSecondaryDisclosure({
          label: homeCopy.recommendedAddons,
          action: homeCopy.edit,
          summaryKey: "installer-accessories",
          kind: "addons",
          scenario: "installer",
          icon: "accessory",
          content: renderHomeAccessoryChoices(homeCopy.accessories, "installer", installerAccessories, homeCopy),
        })}
      </div>
    </div>
  `;
}

function renderHomeProfileGroup(label, group, profileKeys, activeValue, homeCopy) {
  const labelMarkup = `${renderEstimatorLineIcon("profile")}<span>${label}</span>`;
  return `
    <fieldset class="setup-estimator__control setup-estimator__control--profiles" data-estimator-step="${group}">
      <legend><span class="setup-estimator__control-label">${labelMarkup}</span></legend>
      ${renderStepToggle(`<span class="setup-estimator__control-label">${labelMarkup}</span>`)}
      <div class="setup-estimator__step-body">
        <div class="setup-estimator__profile-options">
          ${profileKeys.map((key) => {
            const [title, examples] = homeCopy.profiles[key];
            return `
              <button class="setup-estimator__profile-option ${key === activeValue ? "is-active" : ""}" type="button" aria-pressed="${key === activeValue ? "true" : "false"}" data-estimator-option="${group}" data-estimator-value="${key}">
                ${renderEstimatorLineIcon(key)}
                <strong>${title}</strong>
                <small>${examples}</small>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    </fieldset>
  `;
}

function renderHomeSegmentedGroup(label, group, options, activeValue) {
  const icon = group === "installer-teams" ? "teams" : "recharge";
  const labelMarkup = `${renderEstimatorLineIcon(icon)}<span>${label}</span>`;
  return `
    <fieldset class="setup-estimator__control setup-estimator__control--segmented" data-estimator-step="${group}">
      <legend><span class="setup-estimator__control-label">${labelMarkup}</span></legend>
      ${renderStepToggle(`<span class="setup-estimator__control-label">${labelMarkup}</span>`)}
      <div class="setup-estimator__step-body">
        <div class="setup-estimator__segments">
          ${Object.entries(options).map(([value, text]) => `
            <button class="setup-estimator__option ${value === activeValue ? "is-active" : ""}" type="button" aria-pressed="${value === activeValue ? "true" : "false"}" data-estimator-option="${group}" data-estimator-value="${value}">${text}</button>
          `).join("")}
        </div>
      </div>
    </fieldset>
  `;
}

function renderHomeSecondaryDisclosure({ label, action, summaryKey, kind, scenario = null, icon, content }) {
  return `
    <details class="setup-estimator__secondary-disclosure" data-secondary-kind="${kind}"${scenario ? ` data-secondary-scenario="${scenario}"` : ""}>
      <summary>
        <span class="setup-estimator__secondary-label">${renderEstimatorLineIcon(icon)}<strong>${label}</strong></span>
        <span class="setup-estimator__secondary-current" data-home-secondary-summary="${summaryKey}"></span>
        <span class="setup-estimator__secondary-action">${action}<span aria-hidden="true"> ›</span></span>
      </summary>
      <div class="setup-estimator__secondary-options">${content}</div>
    </details>
  `;
}

function renderHomeSolarChoices(copy, label) {
  return `
    <fieldset class="setup-estimator__secondary-fieldset">
      <legend>${label}</legend>
      <div class="setup-estimator__checks">
        ${Object.entries(copy.solarOptions).map(([value, optionLabel]) => `
          <label class="setup-estimator__check">
            <input type="checkbox" data-estimator-solar value="${value}" ${value === "none" ? "checked" : ""}>
            <span>${optionLabel}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function renderHomeAccessoryChoices(label, scenario, options, homeCopy = null) {
  return `
    <fieldset class="setup-estimator__secondary-fieldset">
      <legend>${label}</legend>
      <div class="setup-estimator__checks">
        ${options.map((option) => `
          <label class="setup-estimator__check ${option.key === "fieldPack" ? "setup-estimator__check--recommended" : ""}">
            <input type="checkbox" data-estimator-accessory="${scenario}" value="${option.key}">
            <span><b>${option.key === "fieldPack" ? "Voltrix FieldPack" : option.label}</b>${option.key === "fieldPack" && homeCopy ? `<small>${homeCopy.backpackProminence}</small>` : ""}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function renderEstimatorLineIcon(name) {
  const paths = {
    profile: '<path d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h8M16 17h4"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="14" cy="17" r="2"/>',
    basic: '<path d="M9 18h6M10 21h4M8.5 14.5a6 6 0 1 1 7 0c-.9.7-1.5 1.5-1.5 2.5h-4c0-1-.6-1.8-1.5-2.5Z"/>',
    comfort: '<path d="m3 11 9-7 9 7M5 10v10h14V10M9 20v-6h6v6"/>',
    extended: '<path d="m3 11 9-7 9 7M5 10v10h14V10M15.5 12.5v4M13.5 14.5h4"/>',
    light: '<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 8h6M9 12h2M14 12h1M9 16h6"/>',
    standard: '<path d="m5 19 7-7M10 6l3-3 5 5-3 3M8 14l2 2M4 18l2 2"/>',
    intensive: '<path d="M4 18 14 8M11 5l3-2 7 7-3 3M7 15l2 2M3 17l4 4M15 16v5M12.5 18.5h5"/>',
    recharge: '<path d="M13 2 6 13h6l-1 9 7-12h-6l1-8Z"/>',
    teams: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M15 15c3 0 5 1.5 6 4"/>',
    solar: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    accessory: '<path d="M5 8h14v11H5zM8 8V5h8v3M8 12h8"/>',
  };
  return `<span class="setup-estimator__line-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">${paths[name] ?? paths.profile}</svg></span>`;
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

function renderSolarGroup(copy, label = copy.solar) {
  return `
    <fieldset class="setup-estimator__control" data-estimator-step="solar">
      <legend>${label}</legend>
      ${renderStepToggle(label)}
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
      <details class="setup-estimator__result-details" data-estimator-result-details open>
        <summary>${copy.moreDetails}</summary>
        <div class="setup-estimator__result-notes" data-result-notes></div>
      </details>
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
    if (root.hasAttribute("data-home-estimator")) {
      bindHomeSetupEstimator(root);
      return;
    }

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
    setupEstimatorResultDetails(root);

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

function restoreEstimatorContext(root,state) {
  let saved=null;
  try { saved=JSON.parse(sessionStorage.getItem('alva-estimator-language')||'null');sessionStorage.removeItem('alva-estimator-language'); } catch {}
  if(saved?.path===window.location.pathname && Date.now()-saved.at<60000) {
    const s=saved.state;
    if(s?.scenario==='installer'||s?.scenario==='summer')state.scenario=s.scenario;
    for(const scenario of ['summer','installer']) {
      const from=s?.[scenario];if(!from)continue;
      const profiles=scenario==='summer'?HOME_SUMMER_PROFILES:HOME_INSTALLER_PROFILES;
      if(Object.hasOwn(profiles,from.profile))state[scenario].profile=from.profile;
      if([1,2,3].includes(from.rechargeDays))state[scenario].rechargeDays=from.rechargeDays;
      if(scenario==='installer'&&[1,2,3,4,5].includes(from.teams))state.installer.teams=from.teams;
      const available=(scenario==='summer'?SUMMER_ACCESSORIES:INSTALLER_ACCESSORIES).map(item=>item.key);
      state[scenario].accessories=new Set((from.accessories||[]).filter(key=>available.includes(key)));
    }
    const solarKeys=Object.keys(getEstimatorCopy().solarOptions);
    state.summer.solar=new Set((s?.summer?.solar||['none']).filter(key=>solarKeys.includes(key)));
    if(!state.summer.solar.size)state.summer.solar.add('none');
  } else {
    const params=new URLSearchParams(window.location.search);
    if(['summer','installer'].includes(params.get('scenario')))state.scenario=params.get('scenario');
    if(params.get('solar')==='tracking'){state.scenario='summer';state.summer.solar=new Set(['tracking']);}
  }
  const selected={'summer-profile':state.summer.profile,'summer-days':state.summer.rechargeDays,'installer-teams':state.installer.teams,'installer-profile':state.installer.profile,'installer-days':state.installer.rechargeDays};
  root.querySelectorAll('[data-estimator-option]').forEach(button=>{const active=String(selected[button.dataset.estimatorOption])===button.dataset.estimatorValue;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));});
  root.querySelectorAll('[data-estimator-solar]').forEach(input=>{input.checked=state.summer.solar.has(input.value);});
  root.querySelectorAll('[data-estimator-accessory]').forEach(input=>{input.checked=state[input.dataset.estimatorAccessory].accessories.has(input.value);});
  setScenario(root,state.scenario);
  window.addEventListener('alva:before-language-change',()=>{
    try {sessionStorage.setItem('alva-estimator-language',JSON.stringify({path:window.location.pathname,at:Date.now(),state},(key,value)=>value instanceof Set?[...value]:value));}catch{}
  },{once:true});
}

function bindHomeSetupEstimator(root) {
  const state = {
    scenario: "summer",
    summer: {
      profile: "comfort",
      rechargeDays: 2,
      solar: new Set(["none"]),
      accessories: new Set(),
    },
    installer: {
      teams: 3,
      profile: "standard",
      rechargeDays: 1,
      accessories: new Set(),
    },
  };

  restoreEstimatorContext(root,state);
  setupEstimatorAccordion(root);
  setupEstimatorResultDetails(root);

  const update = () => {
    updateHomeEstimator(root, state);
    const context=root.querySelector('[data-tracker-context]');
    if(context)context.hidden=!state.summer.solar.has('tracking');
    updateHomeEstimatorStepSummaries(root, state);
  };

  root.querySelectorAll("[data-estimator-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      state.scenario = button.dataset.estimatorScenario;
      setScenario(root, state.scenario);
      update();
      resetEstimatorAccordion(root);
    });
  });

  root.querySelectorAll("[data-estimator-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.dataset.estimatorOption;
      const value = button.dataset.estimatorValue;
      root.querySelectorAll(`[data-estimator-option="${group}"]`).forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        if (item.hasAttribute("aria-pressed")) item.setAttribute("aria-pressed", String(isActive));
      });

      if (group === "summer-profile") state.summer.profile = value;
      if (group === "summer-days") state.summer.rechargeDays = Number(value);
      if (group === "installer-teams") state.installer.teams = Number(value);
      if (group === "installer-profile") state.installer.profile = value;
      if (group === "installer-days") state.installer.rechargeDays = Number(value);
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
      const selected = input.dataset.estimatorAccessory === "installer"
        ? state.installer.accessories
        : state.summer.accessories;
      if (input.checked) selected.add(input.value);
      else selected.delete(input.value);
      update();
    });
  });

  root.querySelector("[data-estimator-add-to-cart]")?.addEventListener("click", () => {
    addCurrentEstimateToCart(root, state, buildHomeEstimatePayload);
  });

  root.querySelector("[data-estimator-quote]")?.addEventListener("click", () => {
    sessionStorage.setItem(ESTIMATE_PREFILL_KEY, buildHomeEstimatePayload(state).summary);
  });

  update();
}

function updateHomeEstimatorStepSummaries(root, state) {
  const homeCopy = getHomeEstimatorCopy();
  const copy = getEstimatorCopy();
  setStepSummary(root, "summer-profile", homeCopy.profiles[state.summer.profile][0]);
  setStepSummary(root, "summer-days", homeCopy.days[state.summer.rechargeDays]);
  setStepSummary(root, "solar", formatSolarLabels(state.summer.solar));
  setStepSummary(root, "summer-accessories", formatSelectedAccessoryLabels(getAccessoryOptions(SUMMER_ACCESSORIES, copy), state.summer.accessories));
  setStepSummary(root, "installer-teams", state.installer.teams === 5 ? "5+" : String(state.installer.teams));
  setStepSummary(root, "installer-profile", homeCopy.profiles[state.installer.profile][0]);
  setStepSummary(root, "installer-days", homeCopy.installerDays[state.installer.rechargeDays]);
  setStepSummary(root, "installer-accessories", formatSelectedAccessoryLabels(getAccessoryOptions(INSTALLER_ACCESSORIES, copy), state.installer.accessories));
  setHomeSecondarySummary(root, "summer-solar", formatSolarLabels(state.summer.solar, copy));
  setHomeSecondarySummary(root, "summer-accessories", formatSelectedAccessoryLabels(getAccessoryOptions(SUMMER_ACCESSORIES, copy), state.summer.accessories, copy));
  setHomeSecondarySummary(root, "installer-accessories", formatSelectedAccessoryLabels(getAccessoryOptions(INSTALLER_ACCESSORIES, copy), state.installer.accessories, copy));
}

function setHomeSecondarySummary(root, key, value) {
  const summary = root.querySelector(`[data-home-secondary-summary="${key}"]`);
  if (summary) summary.textContent = value;
}

function updateHomeEstimator(root, state) {
  const payload = buildHomeEstimatePayload(state);
  const result = payload.result;
  const metrics = root.querySelector("[data-result-metrics]");
  const notes = root.querySelector("[data-result-notes]");
  const advisory = root.querySelector("[data-result-advisory]");
  const quote = root.querySelector("[data-estimator-quote]");

  if (metrics) {
    metrics.innerHTML = result.metrics.map((metric) => `
      <div class="setup-estimator__recommendation-metric" data-metric="${metric.key}">
        <strong>${metric.value}</strong>
        <span>${metric.label}</span>
        ${metric.meta ? `<small>${metric.meta}</small>` : ""}
      </div>
    `).join("");
  }

  if (notes) {
    notes.innerHTML = result.notes.map((note) => `<p>${note}</p>`).join("");
  }

  if (advisory) {
    advisory.hidden = result.systemState === "normal";
    advisory.dataset.state = result.systemState;
    const title = advisory.querySelector("[data-advisory-title]");
    const body = advisory.querySelector("[data-advisory-body]");
    if (title) title.textContent = result.advisoryTitle ?? "";
    if (body) body.textContent = result.advisoryBody ?? "";
  }

  root.dataset.systemState = result.systemState;
  if (quote) quote.textContent = result.systemState === "large" ? payload.copy.requestSizing : payload.copy.requestQuote;
}

function setupEstimatorResultDetails(root) {
  const details = root.querySelector("[data-estimator-result-details]");
  if (!details) return;

  const sync = () => {
    details.open = !isMobileEstimatorAccordion();
  };
  sync();

  const query = window.matchMedia(MOBILE_ACCORDION_QUERY);
  query.addEventListener("change", sync);
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
      <div class="setup-estimator__metric ${metric.placeholder ? "setup-estimator__metric--placeholder" : ""}" data-metric="${metric.key}">
        <span>${metric.label}</span>
        <strong>${metric.value}</strong>
      </div>
    `).join("");
  }
  if (notes) {
    notes.innerHTML = result.notes.map((note) => `<p>${note}</p>`).join("");
  }
}

function addCurrentEstimateToCart(root, state, buildPayload = buildEstimatePayload) {
  const copy = getEstimatorCopy();
  const payload = buildPayload(state);
  const localized = buildPayload === buildHomeEstimatePayload ? Object.fromEntries(['en','sv'].map(lang=>{
    const translated=buildPayload(state,lang);
    const translatedCopy=getEstimatorCopy(lang);
    return [lang,{title:`${translatedCopy.notes.cartTitlePrefix} - ${translated.scenarioLabel}`,subtitle:translatedCopy.notes.cartSubtitle,scenario:translated.scenarioLabel,details:translated.cartDetails,summary:translated.summary}];
  })) : null;
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
    ...(localized ? { localized, language: document.documentElement.lang || 'en' } : {}),
  };

  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  sessionStorage.setItem(CART_NOTICE_KEY, copy.notes.cartNotice);
  updateCartCount(cart);

  const button = root.querySelector("[data-estimator-add-to-cart]");
  if (button) {
    const original = button.textContent;
    button.textContent = payload.savedLabel ?? copy.addedToCart;
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

export function calculateHomePlanningEstimate({ scenario, profile, rechargeDays, teams = 1 }) {
  const profileMap = scenario === "installer" ? HOME_INSTALLER_PROFILES : HOME_SUMMER_PROFILES;
  const selectedProfile = profileMap[profile];
  if (!selectedProfile) throw new Error(`Unknown ${scenario} planning profile: ${profile}`);

  const multiplier = scenario === "installer"
    ? Number(teams) * Number(rechargeDays) * PLANNING_MARGIN
    : Number(rechargeDays) * PLANNING_MARGIN;
  const lowKwh = selectedProfile.low * multiplier;
  const recommendedKwh = selectedProfile.recommended * multiplier;
  const highKwh = selectedProfile.high * multiplier;
  const lowPacks = Math.ceil(lowKwh / KWH_PER_BATTERY_PACK);
  const recommendedPacks = Math.ceil(recommendedKwh / KWH_PER_BATTERY_PACK);
  const highPacks = Math.ceil(highKwh / KWH_PER_BATTERY_PACK);
  const recommendedPcs = Math.max(1, Math.ceil(recommendedPacks / BATTERY_PACKS_PER_PCS));
  const systemState = recommendedPacks > 14 || recommendedPcs > 2
    ? "large"
    : highPacks > 14
      ? "boundary"
      : "normal";

  return {
    lowKwh,
    recommendedKwh,
    highKwh,
    lowPacks,
    recommendedPacks,
    highPacks,
    recommendedStorageKwh: recommendedPacks,
    recommendedPcs,
    systemState,
  };
}

function buildHomeEstimatePayload(state, langOverride) {
  const copy = getEstimatorCopy(langOverride);
  const homeCopy = getHomeEstimatorCopy(langOverride);
  const isInstaller = state.scenario === "installer";
  const selectedState = isInstaller ? state.installer : state.summer;
  const estimate = calculateHomePlanningEstimate({
    scenario: state.scenario,
    profile: selectedState.profile,
    rechargeDays: selectedState.rechargeDays,
    teams: isInstaller ? selectedState.teams : 1,
  });
  const interval = `${estimate.lowPacks}${RANGE_DASH}${estimate.highPacks}`;
  const scenarioLabel = isInstaller ? copy.installerScenario : copy.summerScenario;
  const profileLabel = homeCopy.profiles[selectedState.profile][0];
  const daysLabel = isInstaller
    ? homeCopy.installerDays[selectedState.rechargeDays]
    : homeCopy.days[selectedState.rechargeDays];
  const accessoryOptions = isInstaller ? INSTALLER_ACCESSORIES : SUMMER_ACCESSORIES;
  const accessoryLabels = formatSelectedAccessoryLabels(getAccessoryOptions(accessoryOptions, copy), selectedState.accessories, copy);
  const solarLabels = isInstaller ? null : formatSolarLabels(state.summer.solar, copy);
  const solarNote = isInstaller ? null : getSolarNote(state.summer.solar, copy);
  const notes = [
    homeCopy.assumptionsBody,
    isInstaller ? homeCopy.centralized : solarNote,
    `${homeCopy.accessories}: ${accessoryLabels}.`,
  ].filter(Boolean);
  const result = {
    ...estimate,
    label: homeCopy.recommendedSetup,
    priceRange: homeCopy.priceSoon,
    metricMap: {
      estimatedStorage: `${estimate.recommendedStorageKwh} kWh`,
      batteryPacks: String(estimate.recommendedPacks),
      planningRange: interval,
      pcs: String(estimate.recommendedPcs),
    },
    metrics: [
      { key: "storage", value: `${estimate.recommendedStorageKwh} kWh`, label: homeCopy.storage },
      { key: "packs", value: String(estimate.recommendedPacks), label: homeCopy.batteryPacks, meta: `${homeCopy.planningRange} ${interval}` },
      { key: "pcs", value: String(estimate.recommendedPcs), label: homeCopy.pcs },
      { key: "price", value: homeCopy.priceSoon, label: homeCopy.price },
    ],
    notes,
    advisoryTitle: estimate.systemState === "large"
      ? homeCopy.largeTitle
      : estimate.systemState === "boundary"
        ? homeCopy.boundaryTitle
        : null,
    advisoryBody: estimate.systemState === "large"
      ? homeCopy.largeBody
      : estimate.systemState === "boundary"
        ? homeCopy.boundaryBody
        : null,
  };

  const details = [
    [copy.details.scenario, scenarioLabel],
    [isInstaller ? homeCopy.installerTeams : homeCopy.summerProfile, isInstaller ? (selectedState.teams === 5 ? "5+" : String(selectedState.teams)) : profileLabel],
    ...(isInstaller ? [[homeCopy.installerProfile, profileLabel]] : []),
    [isInstaller ? homeCopy.installerRecharge : homeCopy.summerRecharge, daysLabel],
    ...(solarLabels ? [[copy.details.solarOptions, solarLabels]] : []),
    [homeCopy.accessories, accessoryLabels],
    [homeCopy.storage, result.metricMap.estimatedStorage],
    [homeCopy.batteryPacks, result.metricMap.batteryPacks],
    [homeCopy.planningRange, result.metricMap.planningRange],
    [homeCopy.pcs, result.metricMap.pcs],
  ];
  const summary = [
    `${copy.notes.cartTitlePrefix} - ${scenarioLabel}`,
    `${isInstaller ? homeCopy.installerTeams : homeCopy.summerProfile}: ${isInstaller ? (selectedState.teams === 5 ? "5+" : selectedState.teams) : profileLabel}`,
    ...(isInstaller ? [`${homeCopy.installerProfile}: ${profileLabel}`] : []),
    `${isInstaller ? homeCopy.installerRecharge : homeCopy.summerRecharge}: ${daysLabel}`,
    ...(solarLabels ? [`${copy.details.solarOptions}: ${solarLabels}`] : []),
    `${homeCopy.accessories}: ${accessoryLabels}`,
    `${homeCopy.storage}: ${result.metricMap.estimatedStorage}`,
    `${homeCopy.batteryPacks}: ${result.metricMap.batteryPacks}`,
    `${homeCopy.planningRange}: ${result.metricMap.planningRange}`,
    `${homeCopy.pcs}: ${result.metricMap.pcs}`,
    homeCopy.quantityOnly,
  ];

  return {
    copy: homeCopy,
    scenarioLabel,
    result,
    cartDetails: details,
    summary: summary.join("\n"),
    savedLabel: homeCopy.saved,
  };
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
      { key: "storage", label: copy.metrics.estimatedStorage, value: storageLabel },
      { key: "packs", label: copy.metrics.batteryPacks, value: packsLabel },
      { key: "pcs", label: copy.metrics.recommendedInverters, value: inverterLabel },
      {
        key: "price",
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
      copy.notes.architectureRule,
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
      { key: "per-van", label: copy.metrics.batteryPacksPerVan, value: perVanLabel },
      { key: "packs", label: copy.metrics.totalBatteryPacks, value: totalPacksLabel },
      { key: "storage", label: copy.metrics.estimatedStorage, value: storageLabel },
      { key: "pcs", label: copy.metrics.recommendedInverters, value: inverterLabel },
      {
        key: "price",
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
      copy.notes.architectureRule,
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
    min: Math.max(1, Math.ceil(minPacks / 7)),
    max: Math.max(1, Math.ceil(maxPacks / 7)),
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
