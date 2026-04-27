/**
 * data/products/battery.js
 * Voltrix Battery Module — sold separately as replacements or expansions.
 * Compatible with the Voltrix hub system.
 *
 * Pricing model:  basePrice: 0 (no hub included)
 *                 batteryPrice: 2990 SEK per 1 kWh module
 *
 * Product-detail page calculates:
 *   price    = basePrice + batteryCount × batteryPrice
 *   capacity = batteryCount × capacityPerBattery kWh
 */

const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

export const BATTERY_PRODUCT = {
  slug:      "voltrix-battery-module",
  name:      "Voltrix Battery Module",
  shortName: "Battery",

  heroImage: "/assets/products/battery01.jpg",
  thumbnail: "/assets/products/battery01.jpg",

  heroMedia: createMediaItem(
    "/assets/products/battery01.jpg",
    "Voltrix Battery Module"
  ),

  gallery: [
    createMediaItem("/assets/products/battery01.jpg", "Battery module — front"),
    createMediaItem("/assets/products/battery02.jpg", "Battery module — installed"),
    createMediaItem("/assets/products/battery03.jpg", "Battery module — detail"),
  ],

  price:      "From 2 990 SEK",
  status:     "available",
  buyEnabled: true,

  /**
   * Configurable quantity.
   * basePrice: 0 — no hub unit is included, only battery modules.
   * UI shows: "Number of batteries" stepper (min 1 → max 10).
   */
  config: {
    basePrice:          0,    // No base unit — batteries only
    batteryPrice:       2990, // SEK per 1 kWh module
    minBatteries:       1,
    maxBatteries:       10,
    capacityPerBattery: 1,   // kWh per module
  },

  translations: {

    // ── English ─────────────────────────────────────────────────────────────
    en: {
      name:    "Voltrix Battery Module",
      summary: "1 kWh LFP battery module compatible with the Voltrix hub. Expand your system or replace a module.",
      intro:
        "The Voltrix Battery Module is the standard 1 kWh building block of the Voltrix energy system. " +
        "Order additional modules to expand your installed capacity, or replace an existing one. " +
        "Each module is fully compatible with any Voltrix hub and slots in tool-free.",

      features: [
        "1 kWh per module — expand your total system capacity",
        "LFP (lithium iron phosphate) chemistry — long cycle life and high safety",
        "Tool-free installation — slides directly into any Voltrix hub",
        "Compatible with all Voltrix hub configurations",
        "Operates from −20 °C to +65 °C with self-heating",
        "IP65 rated — protected against dust and water",
        "Select 1–10 modules per order",
      ],

      certifications: [
        "LFP cell chemistry — IEC 62619 compliant",
        "CE marked",
        "IP65 — dust-tight and water-jet protection",
        "Operating temperature: −20 °C to +65 °C",
      ],

      specs: [
        { label: "Capacity per module",   value: "1 kWh" },
        { label: "Battery chemistry",     value: "LFP (lithium iron phosphate)" },
        { label: "Voltage",               value: "48 V nominal" },
        { label: "Max. charge current",   value: "20 A" },
        { label: "IP rating",             value: "IP65" },
        { label: "Operating temperature", value: "−20 °C to +65 °C" },
        { label: "Self-heating",          value: "Integrated" },
        { label: "Installation",          value: "Tool-free, Voltrix-compatible" },
      ],

      useCases: [
        "Expanding an existing Voltrix installation",
        "Replacing a battery module in an installed system",
        "Building extra capacity for higher energy demand",
        "Off-grid and backup power use cases",
      ],

      faq: [
        "Is this compatible with my Voltrix hub? Yes — works with all Voltrix hub models.",
        "What is the capacity of one module? Each module provides 1 kWh of usable storage.",
        "Can I mix old and new modules? Yes — modules are interchangeable within the Voltrix system.",
        "How many can I add? You can have up to 12 modules per hub. Order up to 10 at a time here.",
        "Do I need a professional to install? No — modules slide in tool-free.",
      ],
    },

    // ── Swedish ──────────────────────────────────────────────────────────────
    sv: {
      name:    "Voltrix Batterimodul",
      summary: "1 kWh LFP-batterimodul kompatibel med Voltrix-systemet. Expandera din kapacitet eller byt ut en modul.",
      intro:
        "Voltrix Batterimodul är systemets standardenhet på 1 kWh. Beställ fler moduler för att " +
        "utöka din installerade kapacitet, eller ersätt en befintlig enhet. Varje modul är " +
        "fullt kompatibel med alla Voltrix-hubbar och monteras utan verktyg.",

      features: [
        "1 kWh per modul — bygg ut din totala kapacitet",
        "LFP-batterikemi — lång livslängd och hög säkerhet",
        "Verktygsfri installation — passar alla Voltrix-hubbar",
        "Drift från −20 °C till +65 °C med självuppvärmning",
        "IP65-klassad — skyddad mot damm och vatten",
        "Välj 1–10 moduler per beställning",
      ],

      certifications: [
        "LFP-celler enligt IEC 62619",
        "CE-märkt",
        "IP65 — damm- och vattenskydd",
        "Drifttemperatur: −20 °C till +65 °C",
      ],

      specs: [
        { label: "Kapacitet per modul",    value: "1 kWh" },
        { label: "Batterikemi",            value: "LFP (litiumjärnfosfat)" },
        { label: "Spänning",               value: "48 V nominell" },
        { label: "Max laddström",          value: "20 A" },
        { label: "IP-klass",               value: "IP65" },
        { label: "Drifttemperatur",        value: "−20 °C till +65 °C" },
        { label: "Självuppvärmning",       value: "Inbyggd" },
        { label: "Installation",           value: "Verktygsfri, Voltrix-kompatibel" },
      ],

      useCases: [
        "Utöka en befintlig Voltrix-installation",
        "Ersätta en batterimodul i ett installerat system",
        "Öka kapaciteten vid högt energibehov",
        "Off-grid och reservkraftslösningar",
      ],

      faq: [
        "Är den kompatibel med min Voltrix-hubb? Ja — fungerar med alla Voltrix-modeller.",
        "Hur stor är kapaciteten per modul? 1 kWh användbar lagring per modul.",
        "Kan jag blanda gamla och nya moduler? Ja — modulerna är utbytbara inom systemet.",
        "Hur många kan jag lägga till? Upp till 12 per hubb. Beställ upp till 10 åt gången här.",
        "Behöver jag en tekniker? Nej — verktygsfri montering.",
      ],
    },
  },
};