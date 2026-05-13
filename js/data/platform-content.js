import { getMarket, MARKET_CLUSTERS } from "./markets.js";

export const PLATFORM_ANCHORS = {
  summerHouse: "summer-house",
  field: "field",
  starter: "voltrix-starter",
  medium: "voltrix-medium",
  max: "voltrix-max",
  accessories: "accessories",
  instructions: "instructions",
  faqs: "faqs",
  troubleshooting: "troubleshooting",
};

const PRODUCT_TIER_NOTE =
  "Provisional content model only. These tiers are not separate purchasable SKUs until mapped to real products.";

const SHARED_PLATFORM_CONTENT = {
  productTierNote: PRODUCT_TIER_NOTE,
  heroScenarios: {
    summerHouse: {
      id: "summer-house",
      label: "Summer House",
      headline: "Energy freedom for your summer house",
      headlineLines: ["Energy freedom", "for your summer house"],
      body: "Store solar energy, power everyday comfort, and expand your system as your needs grow.",
      benefits: [
        "Made for cabins and holiday homes",
        "Modular system, expand anytime",
        "Built for Nordic conditions",
      ],
    },
    field: {
      id: "field",
      label: "Field",
      headline: "Portable energy for field teams",
      headlineLines: ["Portable energy", "for field teams"],
      body: "Charge at base, bring power into the van, and use modular batteries where work happens.",
      benefits: [
        "For installers and service teams",
        "Charge centrally, deploy anywhere",
        "Built for flexible work",
      ],
    },
  },
  heroCtas: {
    primary: "Find your system",
    secondary: "Explore solutions",
  },
  benefits: [
    {
      title: "Modular platform",
      body: "Build around one Voltrix battery platform instead of a single fixed product.",
    },
    {
      title: "Expand over time",
      body: "Start with the capacity you need now and plan for future routines.",
    },
    {
      title: "Nordic-ready energy",
      body: "Designed for seasonal homes, outdoor use cases and practical everyday power.",
    },
  ],
  platform: {
    eyebrow: "The platform",
    title: "One battery platform. Multiple ways to use energy.",
    body:
      "Voltrix is a modular energy platform designed to adapt to different ways of living and working. Start small and expand over time - at home, outdoors, or on the job.",
  },
  productFit: {
    eyebrow: "Product fit",
    title: "Choose the Voltrix system range that fits your routine.",
    body:
      "These ranges help frame capacity and use cases before a real product configuration. Actual purchasable products remain in the existing product and checkout flow.",
    primary: "Find your fit",
    secondary: "Configure system",
  },
  solutions: [
    {
      id: "summer-house",
      title: "Summer House",
      body: "Power cabins, terraces and second homes with clean, reliable energy.",
      cta: "Explore Summer House",
    },
    {
      id: "field",
      title: "Field",
      body: "Power installers and field teams. Charge at base, use it where work happens.",
      cta: "Explore Field",
    },
  ],
  productTiers: [
    {
      id: "voltrix-starter",
      title: "Voltrix Starter",
      range: "1–5 kWh",
      body: "For cabins, basic storage and smaller everyday energy needs.",
    },
    {
      id: "voltrix-medium",
      title: "Voltrix Medium",
      range: "6–8 kWh",
      body: "For larger summer houses, outdoor routines and flexible use.",
    },
    {
      id: "voltrix-max",
      title: "Voltrix Max",
      range: "9–12 kWh",
      body: "For extended autonomy, professional workflows and future expansion.",
    },
    {
      id: "accessories",
      title: "Accessories",
      range: "System add-ons",
      body: "For docks, installation support and flexible deployment.",
    },
  ],
  useCaseSections: [
    {
      id: "summer-house-detail",
      eyebrow: "Summer House",
      title: "Energy that fits the rhythm of the summer house.",
      body:
        "Solar during the day. Stored energy in the evening. Simple expansion when life asks for more.",
      bullets: [
        "For cabins and second homes",
        "Slim modular design",
        "Expandable capacity",
        "Nordic climate ready",
      ],
      cta: "Explore Summer House",
      href: "/views/solutions.html#summer-house",
    },
    {
      id: "field-detail",
      eyebrow: "Field",
      title: "Power that moves with the work.",
      body:
        "Charge batteries at base, bring them into the van, and use them on site when fixed power is not enough.",
      bullets: [
        "For installers and service teams",
        "Central charging at base",
        "Portable use on site",
        "Partner-ready workflow",
      ],
      cta: "Explore Field",
      href: "/views/solutions.html#field",
    },
  ],
  smartFeatures: {
    eyebrow: "Smart features",
    title: "Smarter energy, simpler use.",
    items: [
      {
        title: "System overview",
        body: "A clearer way to understand capacity, use case and next steps before configuring.",
      },
      {
        title: "Modular expansion",
        body: "Start with the capacity you need today and add more as routines grow.",
      },
      {
        title: "Flexible deployment",
        body: "Use energy at home, outdoors, on site, or on the move.",
      },
    ],
  },
  trust: {
    eyebrow: "Nordic climate",
    title: "Built for Nordic conditions.",
    body: "Designed for seasonal use, outdoor routines and changing weather.",
    points: ["-20 C to +45 C", "IP65", "1-12 kWh expandable"],
  },
  supportCards: [
    {
      id: "instructions",
      title: "Instructions",
      body: "Setup, installation and everyday use guidance for Voltrix systems.",
    },
    {
      id: "faqs",
      title: "FAQs",
      body: "Common questions before choosing, configuring or expanding a system.",
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      body: "Basic support paths for system, battery and deployment questions.",
    },
    {
      id: "contact-support",
      title: "Contact support",
      body: "Reach Alva for product advice, support or system planning.",
    },
  ],
  finalCta: {
    eyebrow: "Get started",
    title: "Find the right Voltrix system.",
    primary: "Find your system",
    secondary: "Contact us",
  },
  pages: {
    solutions: {
      eyebrow: "Solutions",
      title: "Start with the way you use energy.",
      body: "Choose the scenario that fits your home, seasonal routines or field workflow.",
    },
    support: {
      eyebrow: "Support",
      title: "Knowledge for choosing, using and expanding Voltrix.",
      body: "A first support structure for instructions, FAQs, troubleshooting and direct contact.",
    },
  },
};

const CLUSTER_OVERRIDES = {
  [MARKET_CLUSTERS.ITALY]: {
    heroScenarios: {
      summerHouse: {
        label: "Casa vacanze",
        headline: "Energia modulare per case vacanze e ville.",
        body: "Accumula energia solare, supporta il comfort quotidiano e amplia il sistema nel tempo.",
        benefits: [
          "Per case vacanze e ville",
          "Sistema modulare, espandibile",
          "Ingegneria svedese per uso pratico",
        ],
      },
      field: {
        label: "Field",
        headline: "Energia portatile per team tecnici.",
        body: "Carica alla base, porta energia nel veicolo e usala dove serve il lavoro.",
        benefits: [
          "Per installatori e team di servizio",
          "Ricarica centrale, uso flessibile",
          "Workflow pronto per partner",
        ],
      },
    },
    platform: {
      title: "Una piattaforma batteria. Modi diversi di usare energia.",
      body:
        "Voltrix e una piattaforma energetica modulare progettata in Svezia per case vacanze, ville, autoconsumo solare e uso flessibile.",
    },
    productFit: {
      title: "Scegli il sistema Voltrix adatto alla casa e alla routine.",
      body:
        "Queste fasce sono una guida narrativa provvisoria. I prodotti acquistabili restano nel flusso prodotto e configurazione esistente.",
    },
  },
};

function mergeNested(base, override = {}) {
  return {
    ...base,
    ...override,
    heroScenarios: {
      ...base.heroScenarios,
      ...override.heroScenarios,
      summerHouse: {
        ...base.heroScenarios.summerHouse,
        ...override.heroScenarios?.summerHouse,
      },
      field: {
        ...base.heroScenarios.field,
        ...override.heroScenarios?.field,
      },
    },
    platform: {
      ...base.platform,
      ...override.platform,
    },
    productFit: {
      ...base.productFit,
      ...override.productFit,
    },
    smartFeatures: {
      ...base.smartFeatures,
      ...override.smartFeatures,
    },
    trust: {
      ...base.trust,
      ...override.trust,
    },
    pages: {
      ...base.pages,
      ...override.pages,
    },
  };
}

export function getPlatformContent(lang) {
  const market = getMarket(lang);
  const override = CLUSTER_OVERRIDES[market.cluster] ?? {};

  return {
    market,
    ...mergeNested(SHARED_PLATFORM_CONTENT, override),
  };
}
