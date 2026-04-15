const placeholderImage = (title) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
      <rect width="1200" height="900" fill="#0d2624"/>
      <text x="600" y="430" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="52" font-weight="600">${title}</text>
      <text x="600" y="500" text-anchor="middle" fill="#4caf8a" font-family="sans-serif" font-size="28">New Energy</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

export const PRODUCTS = [

  {
    slug: "Voltrix",
    name: "Voltrix System",
    shortName: "Voltrix",

    heroImage: "/assets/products/voltrix01.jpg",
    thumbnail: "/assets/products/voltrix01.jpg",

    heroMedia: createMediaItem(
      "/assets/products/voltrix01.jpg",
      "Voltrix System"
    ),

    gallery: [
      createMediaItem("/assets/products/voltrix01.jpg", "Voltrix 1"),
      createMediaItem("/assets/products/voltrix02.jpg", "Voltrix 2"),
      createMediaItem("/assets/products/voltrix03.jpg", "Voltrix 3"),
      createMediaItem("/assets/products/voltrix04.jpg", "Voltrix 4"),
      createMediaItem("/assets/products/voltrix05.jpg", "Voltrix 5"),
      createMediaItem("/assets/products/voltrix06.jpg", "Voltrix 6"),
      createMediaItem("/assets/products/voltrix07.jpg", "Voltrix 7"),
    ],

    price: "From 11 980 SEK",
    status: "available",
    buyEnabled: true,

    config: {
      basePrice: 7990,
      batteryPrice: 2990,
      minBatteries: 1,
      maxBatteries: 12,
      capacityPerBattery: 0.57,
    },

    translations: {
      en: {
        name: "Voltrix System",
        summary: "A modular home energy system — scale seamlessly from 0.57 to 6.84 kWh as your needs evolve.",
        intro: "Voltrix is the intelligent core of your home energy system. Start with a single battery module and expand up to twelve as your needs grow. Store solar energy during the day and power your home at night — while the removable core extends energy use beyond the home, supporting mobility and everyday applications.",
        features: [
          "Expandable from 1 to 12 battery modules (0.57–6.84 kWh)",
          "2400 W peak AC output — supports high-demand appliances",
          "2400 W solar input with dual independent MPPT trackers",
          "IP65 rated — protected against dust and water jets",
          "Operates from −20 °C to +45 °C with integrated self-heating",
          "Ultra-slim wall profile — ideal for compact installations",
          "Stand included for flexible floor placement",
          "WiFi and Bluetooth with cloud platform and mobile app",
          "LFP (lithium iron phosphate) battery chemistry — long lifespan",
          "HF transformer isolation — enhanced safety and grid compliance",
        ],
        certifications: [
          "IP65 — dust-tight and water jet protection",
          "LFP cell chemistry — IEC 62619 compliant",
          "CE marked — EN 62109 / EN 61000 standards",
          "Grid type: L+N+PE",
          "Operating temperature: −20 °C to +65 °C",
        ],
        specs: [
          { label: "Battery chemistry", value: "LFP (lithium iron phosphate)" },
          { label: "Capacity range", value: "0.57 kWh (1 module) — 6.84 kWh (12 modules)" },
          { label: "Max. AC output", value: "1600 VA rated / 2400 VA peak (10 s)" },
          { label: "Max. solar input", value: "2400 W" },
          { label: "Number of MPPTs", value: "2 independent" },
          { label: "MPPT voltage range", value: "12–60 V" },
          { label: "MPPT tracking efficiency", value: "99 %" },
          { label: "Max. system efficiency", value: "97 %" },
          { label: "AC output voltage", value: "230 V / 180–264 V range" },
          { label: "AC frequency", value: "50/60 Hz" },
          { label: "Cooling method", value: "Natural convection" },
          { label: "Communication", value: "WiFi / Bluetooth" },
          { label: "Control", value: "Cloud Platform + Mobile App" },
          { label: "IP rating", value: "IP65" },
          { label: "Operating temperature", value: "−20 °C to +45 °C" },
          { label: "DC connector", value: "MC4" },
        ],
        useCases: [
          "Residential solar storage — use excess solar energy in the evening",
          "Balcony and terrace installations — minimal footprint",
          "Reduced grid dependence and lower energy costs",
          "Portable energy use beyond the home",
          "Backup power for essential devices",
          "Off-grid cabins and remote properties",
        ],
        faq: [
          "Can I add more batteries after purchase? Yes — the system is fully modular and expandable up to 12 units.",
          "Does it work without solar panels? Yes — Voltrix can charge directly from the grid.",
          "What happens during a power cut? The system switches to off-grid mode and continues supplying power.",
          "Is installation complex? Wall mounting or floor placement requires only standard hardware.",
          "Can the battery be removed? Yes — the removable core is designed for flexible use.",
        ],
      },

      sv: {
        name: "Voltrix System",
        summary: "Ett modulärt energisystem för hemmet — bygg ut från 0,57 till 6,84 kWh i takt med dina behov.",
        intro: "Voltrix är kärnan i ditt hemmaenergisystem. Börja med en batterimodul och expandera upp till tolv efter behov. Lagra solenergi under dagen och använd den på kvällen — samtidigt som den avtagbara batterikärnan gör energin flexibel även utanför hemmet.",
        features: [
          "Skalbart från 1 till 12 batterimoduler (0,57–6,84 kWh)",
          "2400 W toppeffekt AC-utgång — klarar energikrävande apparater",
          "2400 W solinmatning med två oberoende MPPT-spårare",
          "IP65-klassad — skyddad mot damm och vatten",
          "Drift från −20 °C till +45 °C med självuppvärmning",
          "Ultraslim design — passar även i trånga utrymmen",
          "Stativ ingår för flexibel placering",
          "WiFi och Bluetooth med molnplattform och mobilapp",
          "LFP-batterikemi — lång livslängd",
          "HF-transformatorisolering — ökad säkerhet och nätkompatibilitet",
        ],
        certifications: [
          "IP65 — damm- och vattenskydd",
          "LFP-celler enligt IEC 62619",
          "CE-märkt — EN 62109 / EN 61000",
          "Nättyp: L+N+PE",
          "Drifttemperatur: −20 °C till +65 °C",
        ],
        specs: [
          { label: "Batterikemi", value: "LFP (litiumjärnfosfat)" },
          { label: "Kapacitet", value: "0,57–6,84 kWh" },
          { label: "Max AC-utgång", value: "2400 VA topp" },
          { label: "Max solinmatning", value: "2400 W" },
          { label: "MPPT", value: "2 st" },
          { label: "Systemeffektivitet", value: "97 %" },
          { label: "Spänning", value: "230 V" },
          { label: "Frekvens", value: "50/60 Hz" },
          { label: "Kommunikation", value: "WiFi / Bluetooth" },
          { label: "IP-klass", value: "IP65" },
          { label: "Temperatur", value: "−20 °C till +45 °C" },
        ],
        useCases: [
          "Lagra solenergi för kvällsanvändning",
          "Installation på balkong eller terrass",
          "Minska elkostnader och beroende av elnätet",
          "Portabel energilösning",
          "Reservkraft vid strömavbrott",
          "Off-grid fastigheter",
        ],
        faq: [
          "Kan jag bygga ut systemet senare? Ja — upp till 12 moduler.",
          "Fungerar det utan solpaneler? Ja — laddas från elnätet.",
          "Vad händer vid strömavbrott? Systemet fortsätter leverera ström.",
          "Är installationen svår? Nej — enkel montering.",
          "Kan batteriet tas ur? Ja — designat för flexibel användning.",
        ],
      },
    },
  },

  {
    slug: "Voltdock",
    name: "VoltDock",
    shortName: "VoltDock",

    heroImage: "/assets/products/voltdock01.jpg",
    thumbnail: "/assets/products/voltdock01.jpg",

    heroMedia: createMediaItem(
      "/assets/products/voltdock01.jpg",
      "VoltDock"
    ),

    gallery: [
      createMediaItem("/assets/products/voltdock01.jpg", "VoltDock 1"),
      createMediaItem("/assets/products/voltdock02.jpg", "VoltDock 2"),
      createMediaItem("/assets/products/voltdock03.jpg", "VoltDock 3"),
      createMediaItem("/assets/products/voltdock04.jpg", "VoltDock 4"),
      createMediaItem("/assets/products/voltdock05.jpg", "VoltDock 5"),
      createMediaItem("/assets/products/voltdock06.jpg", "VoltDock 6"),
    ],

    price: "3 990 SEK",
    status: "available",
    buyEnabled: true,

    config: null,
    basePrice: 3990,

    translations: {
      en: {
        name: "VoltDock",
        summary: "A dual-source desktop hub designed to power and organise your entire workspace.",
        intro: "VoltDock simplifies your workspace by combining power, charging, and organisation into a single unit. Use it with a wall outlet or pair it with a Voltrix battery for uninterrupted power wherever you need it.",
        features: [
          "Dual power source — wall outlet or Voltrix battery",
          "Wireless Bluetooth connectivity",
          "Integrated clock and display",
          "Multiple USB-A and USB-C ports",
          "Compact design for clean desk setups",
          "Works standalone or within the Voltrix ecosystem",
          "Plug-and-play — no installation required",
        ],
        certifications: [
          "CE marked",
          "RoHS compliant",
          "Compatible with Voltrix batteries",
        ],
        specs: [
          { label: "Power source", value: "AC or battery" },
          { label: "Ports", value: "USB-A / USB-C" },
          { label: "Audio", value: "Bluetooth" },
        ],
        useCases: [
          "Home office setup",
          "Minimal desk environments",
          "Portable workstation",
          "Backup power solution",
          "Travel and remote work",
        ],
        faq: [
          "Does it require a battery? No.",
          "Compatible with Voltrix? Yes.",
          "Built-in speaker? No.",
          "Multiple devices? Yes.",
        ],
      },

      sv: {
        name: "VoltDock",
        summary: "En skrivbordshub som driver och organiserar din arbetsyta.",
        intro: "VoltDock kombinerar ström, laddning och organisation i en kompakt lösning. Använd med vägguttag eller Voltrix-batteri för flexibel energiförsörjning.",
        features: [
          "Dubbel strömkälla",
          "Bluetooth-anslutning",
          "Inbyggd display",
          "USB-A och USB-C portar",
          "Kompakt design",
          "Del av Voltrix-systemet",
          "Plug-and-play",
        ],
        certifications: [
          "CE-märkt",
          "RoHS",
          "Kompatibel med Voltrix",
        ],
        specs: [
          { label: "Ström", value: "AC eller batteri" },
          { label: "Portar", value: "USB-A / USB-C" },
          { label: "Ljud", value: "Bluetooth" },
        ],
        useCases: [
          "Hemmakontor",
          "Minimalistiska skrivbord",
          "Portabel arbetsplats",
          "Reservkraft",
          "Resor",
        ],
        faq: [
          "Behöver batteri? Nej.",
          "Fungerar med Voltrix? Ja.",
          "Inbyggd högtalare? Nej.",
          "Flera enheter? Ja.",
        ],
      },
    },
  },
];