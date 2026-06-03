const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

export const INVERTER_PRODUCT = {
  slug: "voltrix-inverter",
  name: "Voltrix Inverter",
  shortName: "Inverter",

  heroImage: "/Picture/products/inverter/Inverter01.png",
  thumbnail: "/Picture/products/inverter/Inverter01.png",

  heroMedia: createMediaItem("/Picture/products/inverter/Inverter01.png", "Voltrix Inverter"),

  gallery: [
    createMediaItem("/Picture/products/inverter/Inverter01.png", "Voltrix Inverter front angle"),
    createMediaItem("/Picture/products/inverter/inverter02.png", "Voltrix Inverter side angle"),
    createMediaItem("/Picture/products/inverter/inverter03.png", "Voltrix Inverter product view"),
    createMediaItem("/Picture/products/inverter/inverter04-optimized.png", "Voltrix Inverter connection side"),
    createMediaItem("/Picture/products/inverter/inverter05-optimized.png", "Voltrix Inverter rear side"),
  ],

  price: "10 980 SEK",
  status: "available",
  buyEnabled: true,
  basePrice: 10980,
  config: null,

  translations: {
    en: {
      name: "Voltrix Inverter",
      summary: "The inverter unit for building and expanding a Voltrix Battery Pack setup.",
      intro:
        "The Voltrix Inverter connects Battery Packs into a practical energy setup, supporting one inverter/base configuration before larger setups expand with additional inverter units.",
      features: [
        "Supports 7-12 Battery Packs in a standard planning setup",
        "Can also act as a starting setup with fewer Battery Packs",
        "Designed for modular Voltrix system expansion",
        "Pairs with Battery Packs and selected add-ons around the platform",
      ],
      certifications: [
        "Designed for the Voltrix Battery Pack platform",
        "Final configuration depends on installation and selected Battery Packs",
      ],
      specs: [
        { label: "Platform", value: "Voltrix Battery Pack" },
        { label: "Planning range", value: "1-12 Battery Packs per inverter setup" },
        { label: "Expansion", value: "Add another inverter above 12 Battery Packs" },
        { label: "Use type", value: "System inverter unit" },
      ],
      useCases: [
        "Start a modular Voltrix setup",
        "Expand storage beyond one inverter setup",
        "Support summer house and selected installer routines",
      ],
      faq: [
        "Does one inverter support every setup? One inverter is planned around up to 12 Battery Packs.",
        "Can a setup use more than 12 Battery Packs? Yes, larger planning setups add another inverter.",
        "Does it include Battery Packs? No, Battery Packs are selected separately.",
      ],
    },
    sv: {
      name: "Voltrix Inverter",
      summary: "Inverterenheten for att bygga och expandera en Voltrix Battery Pack-setup.",
      intro:
        "Voltrix Inverter kopplar Battery Packs till en praktisk energisetup och gor det mojligt att bygga ut systemet med fler inverterenheter vid storre setup.",
      features: [
        "Stodjer 7-12 Battery Packs i en standard planeringssetup",
        "Kan ocksa fungera som startsetup med farre Battery Packs",
        "Utformad for modular Voltrix-expansion",
        "Kombineras med Battery Packs och utvalda tillbehor runt plattformen",
      ],
      certifications: [
        "Utformad for Voltrix Battery Pack-plattformen",
        "Slutlig konfiguration beror pa installation och valda Battery Packs",
      ],
      specs: [
        { label: "Plattform", value: "Voltrix Battery Pack" },
        { label: "Planeringsspann", value: "1-12 Battery Packs per invertersetup" },
        { label: "Expansion", value: "Lagg till en inverter over 12 Battery Packs" },
        { label: "Anvandning", value: "Systeminverter" },
      ],
      useCases: [
        "Starta en modular Voltrix-setup",
        "Bygg ut lagring bortom en invertersetup",
        "Stod fritidshus och utvalda installatorsrutiner",
      ],
      faq: [
        "Stodjer en inverter varje setup? En inverter planeras runt upp till 12 Battery Packs.",
        "Kan en setup anvanda fler an 12 Battery Packs? Ja, storre planeringssetuper lagger till en inverter.",
        "Ingar Battery Packs? Nej, Battery Packs valjs separat.",
      ],
    },
  },
};
