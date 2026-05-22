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
  "Capacity ranges are guidance for choosing a setup. Purchasable products remain in the product and checkout flow.";

const SHARED_PLATFORM_CONTENT = {
  productTierNote: PRODUCT_TIER_NOTE,
  heroScenarios: {
    summerHouse: {
      id: "summer-house",
      label: "Summer House",
      headline: "Energy freedom for your summer house",
      headlineLines: ["Energy freedom", "for your summer house"],
      body: "Start with one slim Voltrix setup, then expand battery capacity and add portable options as routines grow.",
      benefits: [
        "Summer houses & cabins",
        "Modular battery platform",
        "Ready for Nordic routines",
      ],
    },
    field: {
      id: "field",
      label: "Field",
      headline: "Portable energy for field teams",
      headlineLines: ["Portable energy", "for field teams"],
      body: "Charge battery packs at base, bring them into the van, and use them where practical power is needed.",
      benefits: [
        "Installers & service teams",
        "Central charging",
        "Portable field routines",
      ],
    },
  },
  heroCtas: {
    primary: "Explore kits",
    secondary: "View platform",
  },
  benefits: [
    {
      title: "A clean energy base",
      body: "Voltrix starts with a slim base unit and battery packs, keeping stored energy organized in one modular system.",
      label: "Base + battery packs",
    },
    {
      title: "Expandable by design",
      body: "Start with the capacity you need today, then add battery packs as home routines or team operations grow.",
      label: "Scales over time",
    },
    {
      title: "Power beyond the wall",
      body: "Use battery packs beyond the fixed setup — on the terrace, in the garden, in a van, or closer to the work area.",
      label: "Home / outdoor / field",
    },
    {
      title: "Ready for add-ons",
      body: "Pair battery packs with VoltDock, Backpack Power and selected mobility options when energy needs to move with you.",
      label: "Dock / Backpack / mobility",
    },
  ],
  platform: {
    eyebrow: "The platform",
    title: "One battery platform. Multiple ways to use energy.",
    body:
      "Voltrix is built around a modular energy base and battery packs that can stay at home, move outdoors, or support selected field routines through compatible add-ons.",
  },
  productFit: {
    eyebrow: "Featured setup",
    title: "Voltrix 5-Pack Kit",
    body:
      "A fixed 5 kWh starting setup for seasonal homes, everyday energy support and expandable outdoor use.",
    note: "Includes five NCM battery modules. Actual performance depends on connected devices, installation and usage pattern.",
    primary: "View kit",
    secondary: "Explore products",
  },
  solutions: [
    {
      id: "summer-house",
      label: "Summer House",
      title: "For cabins, terraces and second homes",
      body: "Store useful energy in one modular setup and bring it closer to outdoor life.",
      cta: "Explore Summer House",
      href: "/views/solution-summer-house.html",
      detail: {
        eyebrow: "Summer House",
        title: "Energy that fits the rhythm of the summer house.",
        body:
          "A modular setup for cabins, terraces and second homes - designed to keep useful energy close to the places where everyday life moves outdoors.",
        bullets: [
          "Slim setup for cabins and compact spaces",
          "Expand battery capacity over time",
          "Use battery packs with selected outdoor add-ons",
          "Bring useful power to terraces, gardens and weekend routines",
        ],
      },
    },
    {
      id: "field",
      label: "Field",
      title: "For installers and service teams",
      body: "Charge batteries at base, bring them into the van, and use them where work happens.",
      cta: "Explore Field",
      href: "/views/solution-field.html",
      detail: {
        eyebrow: "Field",
        title: "Portable energy for field teams.",
        body:
          "Charge batteries centrally at base, bring selected packs into the service van, and use them on site with compatible add-ons when useful power needs to move with the work.",
        bullets: [
          "Central charging at base",
          "Bring only the batteries needed for the route or job",
          "Use VoltDock for devices and temporary workstations",
          "Use Backpack Power for last-meter tasks",
        ],
      },
    },
  ],
  productTiers: [
    {
      id: "voltrix-starter",
      title: "Voltrix Starter",
      range: "1-5 kWh",
      body: "For cabins, basic storage and smaller everyday energy needs.",
    },
    {
      id: "voltrix-medium",
      title: "Voltrix Medium",
      range: "6-8 kWh",
      body: "For larger summer houses, outdoor routines and flexible use.",
    },
    {
      id: "voltrix-max",
      title: "Voltrix Max",
      range: "9-12 kWh",
      body: "For extended autonomy, professional workflows and future expansion.",
    },
    {
      id: "accessories",
      title: "Accessories",
      range: "System add-ons",
      body: "For docks, installation support and flexible deployment.",
    },
  ],
  smartFeatures: {
    eyebrow: "Smart control",
    title: "Simple control for everyday energy.",
    phoneLabel: "Battery available",
    intro:
      "A clearer way to monitor your Voltrix system, understand battery status and manage everyday use from one place.",
    items: [
      {
        title: "System overview",
        body: "See battery status, system state and connected components.",
      },
      {
        title: "Battery insight",
        body: "Understand available capacity and plan use across daily routines.",
      },
      {
        title: "Future-ready control",
        body: "A software layer prepared for future Voltrix features and connected add-ons.",
      },
    ],
  },
  trust: {
    eyebrow: "Nordic conditions",
    title: "Designed for changing Nordic routines.",
    body: "Built for seasonal homes, outdoor routines and practical everyday energy needs in changing weather.",
    points: ["-20°C to +65°C", "IP65", "1-12 kWh per inverter/base setup"],
  },
  finalCta: {
    eyebrow: "Get started",
    title: "Start with the Voltrix setup that fits your routine.",
    body: "Explore kits and components, or talk to Alva if you need help planning a setup.",
    primary: "Explore kits",
    secondary: "Contact Alva",
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

const LANGUAGE_OVERRIDES = {
  sv: {
    productTierNote:
      "Kapacitetsnivåerna är vägledande och hjälper dig att välja rätt omfattning. Produkterna konfigureras i nästa steg.",
    heroScenarios: {
      summerHouse: {
        label: "Fritidshus",
        headlineLines: ["Trygg energi", "i fritidshuset"],
        body: "Börja med en smal Voltrix-lösning och bygg ut batterikapacitet och portabla tillval när rutinerna växer.",
        benefits: ["Fritidshus & stugor", "Modulär batteriplattform", "Redo för nordiska rutiner"],
      },
      field: {
        label: "Fältarbete",
        headlineLines: ["Portabel kraft", "för arbete på plats"],
        body: "Ladda batteripack på basen, ta med dem i bilen och använd dem där praktisk kraft behövs.",
        benefits: ["Installatörer & service", "Central laddning", "Portabla fältrutiner"],
      },
    },
    heroCtas: { primary: "Utforska kit", secondary: "Se plattformen" },
    benefits: [
      {
        title: "En ren energibas",
        body: "Voltrix börjar med en smal basenhet och batteripack som håller lagrad energi organiserad i ett modulärt system.",
        label: "Bas + batteripack",
      },
      {
        title: "Byggd för expansion",
        body: "Börja med den kapacitet du behöver idag och lägg till batteripack när hemmarutiner eller teamets arbete växer.",
        label: "Skalar över tid",
      },
      {
        title: "Kraft bortom väggen",
        body: "Använd batteripack utanför den fasta lösningen — på terrassen, i trädgården, i bilen eller närmare arbetsområdet.",
        label: "Hem / utomhus / fält",
      },
      {
        title: "Redo för tillbehör",
        body: "Kombinera batteripack med VoltDock, Backpack Power och utvalda mobilitetsalternativ när energin behöver följa med.",
        label: "Dock / Backpack / mobilitet",
      },
    ],
    platform: {
      eyebrow: "Plattformen",
      title: "En batteriplattform. Flera sätt att använda energi.",
      body:
        "Voltrix är byggt runt en modulär energibas och batteripack som kan stanna hemma, följa med utomhus eller stödja utvalda fältrutiner med kompatibla tillbehör.",
    },
    productFit: { eyebrow: "Produktserie", primary: "Visa produktserie", secondary: "Utforska kit" },
    solutions: [
      {
        id: "summer-house",
        label: "Fritidshus",
        title: "För stugor, terrasser och säsongsboenden",
        body: "Samla användbar energi i en modulär lösning och ta den närmare livet utomhus.",
        cta: "Utforska fritidshus",
        href: "/views/solution-summer-house.html",
        detail: {
          eyebrow: "Fritidshus",
          title: "Energi som följer rytmen i fritidshuset.",
          body: "En modulär lösning för stugor, terrasser och säsongsboenden - skapad för att hålla användbar energi nära platserna där vardagen rör sig utomhus.",
          bullets: [
            "Smal lösning för stugor och kompakta ytor",
            "Bygg ut batterikapacitet över tid",
            "Använd batteripack med utvalda utomhustillbehör",
            "Ta användbar kraft till terrass, trädgård och helgrutiner",
          ],
        },
      },
      {
        id: "field",
        label: "Fältarbete",
        title: "För installatörer och serviceteam",
        body: "Ladda batterier på basen, ta dem med i bilen och använd dem där arbetet sker.",
        cta: "Utforska fältarbete",
        href: "/views/solution-field.html",
        detail: {
          eyebrow: "Fältarbete",
          title: "Portabel energi för fältteam.",
          body:
            "Ladda batterier centralt på basen, ta utvalda pack i servicebilen och använd dem på plats med kompatibla tillbehör när användbar kraft behöver följa arbetet.",
          bullets: [
            "Central laddning på basen",
            "Ta bara med de batterier som behövs för rutten eller jobbet",
            "Använd VoltDock för enheter och tillfälliga arbetsstationer",
            "Använd Backpack Power för de sista metrarna",
          ],
        },
      },
    ],
    smartFeatures: {
      eyebrow: "Smart kontroll",
      title: "Enkel kontroll för vardagens energi.",
      phoneLabel: "Batteri tillgängligt",
      intro:
        "Ett tydligare sätt att följa Voltrix-systemet, förstå batteristatus och hantera vardagsanvändning från ett ställe.",
      items: [
        { title: "Systemöversikt", body: "Se batteristatus, systemläge och anslutna komponenter." },
        { title: "Batteriinsikt", body: "Förstå tillgänglig kapacitet och planera användning över dagens rutiner." },
        {
          title: "Redo för framtida kontroll",
          body: "Ett mjukvarulager för kommande Voltrix-funktioner och anslutna tillbehör.",
        },
      ],
    },
    trust: {
      eyebrow: "Nordiska förhållanden",
      title: "Utformat för skiftande nordiska rutiner.",
      body: "Byggt för säsongsboenden, utomhusrutiner och praktiska energibehov i växlande väder.",
      points: ["-20°C till +65°C", "IP65", "1-12 kWh per inverter/base setup"],
    },
    finalCta: {
      eyebrow: "Kom igång",
      title: "Börja med den Voltrix-lösning som passar din rutin.",
      body: "Utforska kit och komponenter, eller prata med Alva om du vill ha hjälp att planera en setup.",
      primary: "Utforska kit",
      secondary: "Kontakta Alva",
    },
  },
};

LANGUAGE_OVERRIDES.sv.pages = {
  solutions: {
    eyebrow: "Lösningar",
    title: "Börja med hur du använder energi.",
    body: "Välj scenariot som passar ditt hem, dina säsongsrutiner eller ditt fältarbete.",
  },
  support: {
    eyebrow: "Support",
    title: "Kunskap för att välja, använda och bygga ut Voltrix.",
    body: "En första supportstruktur för instruktioner, FAQ, felsökning och direktkontakt.",
  },
};

const CLUSTER_OVERRIDES = {
  [MARKET_CLUSTERS.ITALY]: {},
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
    platform: { ...base.platform, ...override.platform },
    productFit: { ...base.productFit, ...override.productFit },
    smartFeatures: { ...base.smartFeatures, ...override.smartFeatures },
    trust: { ...base.trust, ...override.trust },
    finalCta: { ...base.finalCta, ...override.finalCta },
    pages: { ...base.pages, ...override.pages },
  };
}

export function getPlatformContent(lang) {
  const market = getMarket(lang);
  const clusterContent = mergeNested(SHARED_PLATFORM_CONTENT, CLUSTER_OVERRIDES[market.cluster] ?? {});

  return {
    market,
    ...mergeNested(clusterContent, LANGUAGE_OVERRIDES[lang] ?? {}),
  };
}
