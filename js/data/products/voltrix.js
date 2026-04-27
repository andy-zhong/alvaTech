/**
 * data/products/voltrix.js
 * Voltrix — Modular home energy hub by Alva Technology.
 * The core system: stores solar energy, charges battery modules,
 * and acts as the central power hub.
 */

const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

export const VOLTRIX_PRODUCT = {
  slug:      "voltrix-5-pack-kit",
  name:      "Voltrix 5-Pack Kit",
  shortName: "Voltrix",

  heroImage: "/assets/products/voltrix01.png",
  thumbnail: "/assets/products/voltrix01.png",

  heroMedia: createMediaItem(
    "/assets/products/voltrix01.png",
    "Voltrix Energy Hub"
  ),

  gallery: [
    createMediaItem("/assets/products/voltrix01.png", "Voltrix — front view"),
    createMediaItem("/assets/products/voltrix02.png", "Voltrix — side profile"),
    createMediaItem("/assets/products/voltrix03.jpg", "Voltrix — installed outdoors"),
    createMediaItem("/assets/products/voltrix04.jpg", "Voltrix — wall mounted"),
    createMediaItem("/assets/products/voltrix05.jpg", "Voltrix — expanded system"),
    createMediaItem("/assets/products/voltrix06.jpg", "Voltrix — solar integration"),
    createMediaItem("/assets/products/voltrix07.jpg", "Voltrix — app control"),
  ],

  price:      "From 10 980 SEK",
  status:     "available",
  buyEnabled: true,

  /**
   * Configurable system — user selects number of battery modules at purchase.
   * Price = basePrice (hub unit) + batteryCount × batteryPrice (per module)
   * Capacity = batteryCount × capacityPerBattery kWh
   */
  config: {
    basePrice:          7990, // SEK — hub/inverter unit
    batteryPrice:       2990, // SEK — per 1 kWh battery module
    minBatteries:       1,
    maxBatteries:       12,
    capacityPerBattery: 1,   // kWh per module
  },

  translations: {

    // ── English ─────────────────────────────────────────────────────────────
    en: {
      name:    "Voltrix 5-Pack Kit",
      summary: "A modular home energy hub — scale from 1 to 12 kWh as your needs grow.",
      intro:
        "Voltrix is the intelligent core of your home energy system. Start with one battery module " +
        "and expand to twelve as your needs grow. Store solar energy during the day and power your " +
        "home at night — while the removable battery core travels with you to support mobility and " +
        "everyday outdoor use.",

      features: [
        "Expandable from 1 to 12 battery modules (1–12 kWh)",
        "2400 W peak AC output — handles high-demand appliances",
        "2400 W solar input with two independent MPPT trackers",
        "IP65 rated — protected against dust and water jets",
        "Operates from −20 °C to +45 °C with integrated self-heating",
        "Ultra-slim wall profile — ideal for compact spaces",
        "Stand included for flexible floor placement",
        "WiFi and Bluetooth with cloud platform and mobile app",
        "LFP (lithium iron phosphate) battery chemistry — long lifespan",
        "HF transformer isolation — enhanced safety and grid compliance",
      ],

      certifications: [
        "IP65 — dust-tight and water-jet protection",
        "LFP cell chemistry — IEC 62619 compliant",
        "CE marked — EN 62109 / EN 61000 series",
        "Grid type: L+N+PE",
        "Operating temperature: −20 °C to +65 °C",
      ],

      specs: [
        { label: "Battery chemistry",      value: "LFP (lithium iron phosphate)" },
        { label: "Capacity per module",    value: "1 kWh" },
        { label: "Capacity range",         value: "1 kWh (1 module) — 12 kWh (12 modules)" },
        { label: "Max. AC output",         value: "1600 VA rated / 2400 VA peak (10 s)" },
        { label: "Max. solar input",       value: "2400 W" },
        { label: "Number of MPPTs",        value: "2 independent" },
        { label: "MPPT voltage range",     value: "12–60 V" },
        { label: "MPPT tracking eff.",     value: "99 %" },
        { label: "Max. system efficiency", value: "97 %" },
        { label: "AC output voltage",      value: "230 V / 180–264 V range" },
        { label: "AC frequency",           value: "50/60 Hz" },
        { label: "Cooling method",         value: "Natural convection" },
        { label: "Communication",          value: "WiFi / Bluetooth" },
        { label: "Control",                value: "Cloud Platform + Mobile App" },
        { label: "IP rating",              value: "IP65" },
        { label: "Operating temperature",  value: "−20 °C to +45 °C" },
        { label: "DC connector",           value: "MC4" },
      ],

      useCases: [
        "Residential solar storage — use excess solar energy in the evening",
        "Balcony and terrace installations — minimal footprint",
        "Reduced grid dependence and lower electricity costs",
        "Portable energy beyond the home — e-bikes and outdoor gear",
        "Backup power for essential devices during outages",
        "Off-grid cabins and remote properties",
      ],

      faq: [
        "Can I add more batteries after purchase? Yes — the system is fully modular. Add modules one at a time up to 12.",
        "Does it work without solar panels? Yes — Voltrix charges directly from the grid.",
        "What happens during a power cut? The system switches to off-grid mode automatically.",
        "Is installation complex? No — wall mount or floor stand with standard hardware.",
        "Can the battery be removed and used elsewhere? Yes — the removable core powers compatible Alva devices.",
      ],
    },

    // ── Swedish ──────────────────────────────────────────────────────────────
    sv: {
      name:    "Voltrix 5-Pack Kit",
      summary: "Ett modulärt energisystem för hemmet — bygg ut från 1 till 12 kWh i din egen takt.",
      intro:
        "Voltrix är kärnan i ditt hemmaenergisystem. Börja med en batterimodul och expandera upp till tolv " +
        "efter behov. Lagra solenergi under dagen och använd den på kvällen — det avtagbara batterikärnet " +
        "gör energin tillgänglig även utanför hemmet.",

      features: [
        "Skalbart från 1 till 12 batterimoduler (1–12 kWh)",
        "2400 W toppeffekt AC-utgång — klarar energikrävande apparater",
        "2400 W solinmatning med två oberoende MPPT-spårare",
        "IP65-klassad — skyddad mot damm och vatten",
        "Drift från −20 °C till +45 °C med självuppvärmning",
        "Ultraslim väggdesign — passar även i trånga utrymmen",
        "Stativ ingår för flexibel golvplacering",
        "WiFi och Bluetooth med molnplattform och mobilapp",
        "LFP-batterikemi — lång livslängd och hög säkerhet",
        "HF-transformatorisolering — ökad säkerhet och nätkompatibilitet",
      ],

      certifications: [
        "IP65 — damm- och vattenskydd",
        "LFP-celler enligt IEC 62619",
        "CE-märkt — EN 62109 / EN 61000-serien",
        "Nättyp: L+N+PE",
        "Drifttemperatur: −20 °C till +65 °C",
      ],

      specs: [
        { label: "Batterikemi",         value: "LFP (litiumjärnfosfat)" },
        { label: "Kapacitet per modul", value: "1 kWh" },
        { label: "Kapacitetsintervall", value: "1 kWh (1 modul) — 12 kWh (12 moduler)" },
        { label: "Max AC-utgång",       value: "2400 VA topp (10 s)" },
        { label: "Max solinmatning",    value: "2400 W" },
        { label: "Antal MPPT",          value: "2 oberoende" },
        { label: "Systemeffektivitet",  value: "97 %" },
        { label: "Spänning",            value: "230 V" },
        { label: "Frekvens",            value: "50/60 Hz" },
        { label: "Kommunikation",       value: "WiFi / Bluetooth" },
        { label: "IP-klass",            value: "IP65" },
        { label: "Temperatur",          value: "−20 °C till +45 °C" },
        { label: "DC-kontakt",          value: "MC4" },
      ],

      useCases: [
        "Lagra solenergi för kvällsanvändning i hemmet",
        "Installation på balkong eller terrass",
        "Minska elkostnader och beroendet av elnätet",
        "Portabel energi för elcyklar och friluftsliv",
        "Reservkraft vid strömavbrott",
        "Off-grid stugor och avlägset belägna fastigheter",
      ],

      faq: [
        "Kan jag bygga ut systemet efter köpet? Ja — fullt modulärt, upp till 12 moduler.",
        "Fungerar det utan solpaneler? Ja — laddas direkt från elnätet.",
        "Vad händer vid strömavbrott? Systemet byter automatiskt till off-grid-läge.",
        "Är installationen svår? Nej — väggmontering eller stativ med standardverktyg.",
        "Kan batteriet tas ut och användas på annat håll? Ja — kärnan driver kompatibla Alva-enheter.",
      ],
    },
  },
};