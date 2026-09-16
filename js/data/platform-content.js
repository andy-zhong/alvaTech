import { getMarineContent, MARINE_ASSETS } from './marine-content.js';
import { getMarket, MARKET_CLUSTERS } from "./markets.js";

export const PLATFORM_ANCHORS = {
  summerHouse: "summer-house",
  field: "field",
  accessories: "accessories",
  instructions: "instructions",
  faqs: "faqs",
  troubleshooting: "troubleshooting",
};

const SHARED_PLATFORM_CONTENT = {
  heroScenarios: {
    summerHouse: {
      id: "summer-house",
      label: "Summer house",
      headline: "Energy freedom for your summer house",
      headlineLines: ["Energy freedom", "for your summer house"],
      body: "Ready to carry useful energy beyond the wall when everyday life moves outdoors -- from the cabin to the garden",
      benefits: [
        "Summer houses & cabins",
        "Modular battery platform",
        "Ready for Nordic routines",
      ],
      cta: "Explore Summer House",
      href: "/views/solution-summer-house.html",
      productCta: "View Voltrix Kit",
      productHref: "/views/product.html?slug=voltrix-5-pack-kit",
    },
    field: {
      id: "field",
      label: "Installer",
      headline: "Portable energy for installer teams",
      headlineLines: ["Portable energy", "for installer teams"],
      body: "Charge battery packs at the office or workshop, bring them into the van, and use them where practical power is needed.",
      benefits: [
        "Installers & service teams",
        "Centralized charging",
        "Portable installer routines",
      ],
      cta: "Explore Installer",
      href: "/views/solution-field.html",
      productCta: "View FieldPack",
      productHref: "/views/product.html?slug=voltrix-fieldpack",
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
      body: "Pair battery packs with VoltDock, Voltrix FieldPack and selected mobility options when energy needs to move with you.",
      label: "Dock / FieldPack / mobility",
    },
  ],
  platform: {
    eyebrow: "The platform",
    title: "One battery platform. Multiple ways to use energy.",
    body:
      "Voltrix is built around a modular energy base and battery packs that can stay at home, move outdoors, or support selected field routines through compatible add-ons.",
  },
  addOns: {
    eyebrow: "Add-ons",
    title: "Add-ons",
    body: "Expand how Battery Packs are used with simple add-ons for everyday outdoor life and mobile routines.",
    note: "Most add-ons work by simply pairing with the same Battery Pack platform. Solar tracking system is a separate solar-focused extension and not a simple plug-on accessory.",
    cta: "Explore all accessories",
    items: [
      {
        title: "Voltrix FieldPack",
        body: "Carry Battery Packs further for outdoor tasks and mobile use.",
        image: "/Picture/products/marine/marine_field_backpack_1.webp",
        href: "/views/product.html?slug=voltrix-fieldpack",
      },
      {
        title: "VoltDock",
        body: "Turn a Battery Pack into a compact hub for devices, lights and everyday power.",
        image: "/Picture/products/voltdock/voltdock01.png",
        href: "/views/product.html?slug=voltdock",
      },
      {
        title: "Bike accessory",
        body: "Bring Battery Packs further with a light mobility add-on for local movement.",
        image: "/Picture/products/bike/bike01-optimized.png",
        href: "/views/product.html?slug=bike-accessory",
      },
      {
        title: "Solar tracking system",
        body: "A solar-focused extension for summer house setups that want to make more of available daylight.",
        image: "/Picture/products/tracker/tracker1.webp",
        imageFit: "cover",
        href: "/views/product.html?slug=solar-tracking-system",
      },
    ],
  },
  productFit: {
    eyebrow: "Featured setup",
    title: "Voltrix 5-Pack Kit",
    body:
      "A fixed 5 kWh starting setup for seasonal homes, everyday energy support and expandable outdoor use.",
    note: "Includes five NMC battery modules. Actual performance depends on connected devices, installation and usage pattern.",
    primary: "View kit",
    secondary: "Explore products",
  },
  solutions: [
    {
      id: "summer-house",
      label: "Summer house",
      title: "For cabins, terraces and second homes",
      body: "Store useful energy in one modular setup and bring it closer to outdoor life.",
      cta: "Explore Summer house",
      href: "/views/solution-summer-house.html",
      detail: {
        eyebrow: "Summer house",
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
      label: "Installer",
      title: "For installers and service teams",
      body: "Charge centrally, then bring practical power from the van to the last meter of work.",
      cta: "Explore Installer",
      href: "/views/solution-field.html",
      detail: {
        eyebrow: "Installer",
        title: "Portable energy for installer teams.",
        body:
          "Charge batteries centrally at the office or workshop, bring selected packs into the service van, and use them on site with compatible add-ons when useful power needs to move with the work.",
        bullets: [
          "Centralized charging at the office or workshop",
          "Bring only the batteries needed for the route or job",
          "Use VoltDock for devices and temporary workstations",
          "Use Voltrix FieldPack for last-meter tasks",
        ],
      },
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
    points: [
      { value: "-20°C to +45°C", label: "Operating temperature" },
      { value: "IP65", label: "Dust and water protection" },
      { value: "2400 W PV", label: "Dual MPPT" },
      { value: "1600 VA", label: "2400 VA peak" },
    ],
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
      body: "Choose the scenario that fits your home, seasonal routines or installer workflow.",
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
        body: "Ha användbar energi nära till hands när vardagen flyttar utanför väggarna - från stugan till terrassen, trädgården, gästhuset eller bryggan.",
        benefits: ["Fritidshus och stugor", "Modulär batteriplattform", "Redo för nordiska rutiner"],
        cta: "Utforska fritidshus",
        productCta: "Se Voltrix-kit",
      },
      field: {
        label: "Installatör",
        headlineLines: ["Portabel energi", "för installatörer"],
        body: "Ladda batteripack på kontoret eller i verkstaden, ta med dem i servicebilen och använd dem där praktisk el behövs.",
        benefits: ["Installatörer och serviceteam", "Centraliserad laddning", "Portabla arbetsrutiner"],
        cta: "Utforska installatör",
        productCta: "Se FieldPack",
      },
    },
    heroCtas: { primary: "Utforska kit", secondary: "Se plattformen" },
    benefits: [
      {
        title: "En ren energibas",
        body: "Voltrix börjar med en smal basenhet och batteripack som håller lagrad energi samlad i ett modulärt system.",
        label: "Bas + batteripack",
      },
      {
        title: "Byggd för att expanderas",
        body: "Börja med den kapacitet du behöver idag och lägg till batteripack när energibehovet ökar.",
        label: "Skalar över tid",
      },
      {
        title: "Energi bortom väggen",
        body: "Använd batteripack utanför den fasta lösningen - på terrassen, i trädgården, i bilen eller närmare arbetsplatsen.",
        label: "Hem / utomhus / arbete",
      },
      {
        title: "Redo för tillbehör",
        body: "Kombinera batteripack med VoltDock, Voltrix FieldPack och utvalda mobilitetsalternativ när energin behöver följa med.",
        label: "Dock / FieldPack / mobilitet",
      },
    ],
    platform: {
      eyebrow: "Plattformen",
      title: "En batteriplattform. Flera sätt att använda energi.",
      body:
        "Voltrix är byggt runt en modulär energibas och batteripack som kan stanna hemma, följa med utomhus eller stödja utvalda arbetsrutiner med kompatibla tillbehör.",
    },
    addOns: {
      eyebrow: "Tillbehör",
      title: "Tillbehör",
      body: "Utöka hur Battery Packs används med enkla tillbehör för vardag utomhus och mobila rutiner.",
      note: "De flesta tillbehör fungerar med samma Battery Pack-plattform. Solar tracking system är en separat solfokuserad utökning och inte ett enkelt plug-on-tillbehör.",
      cta: "Utforska alla tillbehör",
      items: [
        {
          title: "Voltrix FieldPack",
          body: "Bär Battery Packs längre för utomhusaktiviteter och mobil användning.",
          image: "/Picture/products/marine/marine_field_backpack_1.webp",
          href: "/views/product.html?slug=voltrix-fieldpack",
        },
        {
          title: "VoltDock",
          body: "Gör ett Battery Pack till en kompakt hubb för enheter, belysning och vardagens energi.",
          image: "/Picture/products/voltdock/voltdock01.png",
          href: "/views/product.html?slug=voltdock",
        },
        {
          title: "Bike accessory",
          body: "Flytta Battery Packs längre med ett lätt mobilitetstillbehör för lokala rutiner.",
          image: "/Picture/products/bike/bike01-optimized.png",
          href: "/views/product.html?slug=bike-accessory",
        },
        {
          title: "Solar tracking system",
          body: "Ett solfokuserat tillbehör för fritidshus som vill ta bättre vara på tillgängligt dagsljus.",
          image: "/Picture/products/tracker/tracker1.webp",
          imageFit: "cover",
          href: "/views/product.html?slug=solar-tracking-system",
        },
      ],
    },
    productFit: {
      eyebrow: "Produktserie",
      body: "En fast 5 kWh-startsetup för fritidshus, vardagligt energistöd och expanderbar utomhusanvändning.",
      note: "Inkluderar fem NMC-batterimoduler. Faktisk prestanda beror på anslutna enheter, installation och användningsmönster.",
      label: "Fast 5 kWh-startsetup",
      primary: "Se 5-Pack Kit",
      secondary: "Alla produkter",
    },
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
            "Ta användbar energi till terrass, trädgård och helgrutiner",
          ],
        },
      },
      {
        id: "field",
        label: "Installatör",
        title: "För installatörer och serviceteam",
        body: "Ladda batterier på kontoret eller i verkstaden, ta sedan med dem och använd energin där arbetet sker.",
        cta: "Utforska installatörslösning",
        href: "/views/solution-field.html",
        detail: {
          eyebrow: "Installatör",
          title: "Portabel energi för installatörer.",
          body:
            "Ladda batterier på kontoret eller i verkstaden, ta utvalda pack i servicebilen och använd dem på plats med kompatibla tillbehör när energin behöver följa arbetet.",
          bullets: [
            "Centraliserad laddning på kontoret eller i verkstaden",
            "Ta bara med de batterier som behövs för rutten eller jobbet",
            "Använd VoltDock för enheter och tillfälliga arbetsstationer",
            "Använd Voltrix FieldPack för de sista metrarna",
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
      points: [
        { value: "-20°C till +45°C", label: "Drifttemperatur" },
        { value: "IP65", label: "Damm- och vattenskydd" },
        { value: "2400 W PV", label: "Dual MPPT" },
        { value: "1600 VA", label: "2400 VA peak" },
      ],
    },
    finalCta: {
      eyebrow: "Kom igång",
      title: "Börja med den Voltrix-lösning som passar ditt behov",
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
    body: "Välj scenariot som passar ditt hem, dina säsongsrutiner eller installatörernas vardag.",
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
    addOns: { ...base.addOns, ...override.addOns },
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
    ...extendMarineContent(mergeNested(clusterContent, LANGUAGE_OVERRIDES[lang] ?? {}), lang),
  };
}

function extendMarineContent(content, lang) {
  const marine = getMarineContent(lang);
  const sv = lang === 'sv';
  const items = content.addOns.items.map(item => item.href.includes('voltrix-fieldpack') ? {
    ...item, body: sv ? 'Portabel ström med inbyggd PCS. Ta samma batterier från hemmet till arbetet eller båten.' : 'Portable power with an integrated PCS. Take the same batteries from home to work or the boat.',
    image: MARINE_ASSETS.product,
  } : item);
  items.sort((a,b) => {
    const rank = item => item.href.includes('fieldpack') ? 0 : item.href.includes('solar-tracking') ? 1 : item.href.includes('voltdock') ? 2 : 3;
    return rank(a)-rank(b);
  });
  return {...content,
    heroScenarios: {...content.heroScenarios, marine},
    solutions: [...content.solutions.map(solution=>solution.id==='summer-house'?{...solution,body:sv?'Lagra energi med Voltrix och planera solenergi med Tracker för fritidshuset.':'Store energy with Voltrix and plan solar with Tracker for your summer house.',detail:{...solution.detail,body:sv?'Kombinera Voltrix och Battery Packs med solenergi som passar din plats. Tracker är ett val för kompatibla paneler; FieldPack tar med energin utanför huset.':'Combine Voltrix and Battery Packs with solar suited to your site. Tracker is an option for compatible panels; FieldPack brings energy beyond the house.',bullets:sv?['Voltrix lagrar energi för din vistelse','Tracker kompletterar med solenergi efter platsens förutsättningar','FieldPack tar samma batterier till trädgården eller bryggan']:['Voltrix stores energy for your stay','Tracker adds a solar option planned around your site','FieldPack takes the same batteries to the garden or dock']}}:solution), marine],
    platform: {...content.platform, body: sv ? 'Voltrix på land. FieldPack på plats. Samma löstagbara Battery Packs för fritidshuset, arbetsdagen och livet på vattnet.' : 'Voltrix on shore. FieldPack on the move. The same removable Battery Packs for your summer house, workday and time on the water.'},
    addOns: {...content.addOns, title: sv ? 'Utöka din Voltrix.' : 'Take your Voltrix further.', items},
    pages: {...content.pages, solutions: {...content.pages.solutions, body: sv ? 'Hitta din lösning för fritidshuset, arbetsdagen eller båtlivet.' : 'Find your setup for the summer house, the workday or life on the water.'}},
  };
}
