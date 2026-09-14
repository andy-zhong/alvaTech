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
        "The Voltrix Inverter connects Battery Packs into a practical energy setup. One Voltrix group / PCS is recommended for up to 7 Battery Packs; larger setups add another group / PCS.",
      features: [
        "Recommended for 1-7 Battery Packs in one Voltrix group / PCS",
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
        { label: "Planning range", value: "1-7 Battery Packs per Voltrix group / PCS" },
        { label: "Expansion", value: "Add another Voltrix group / PCS above 7 Battery Packs" },
        { label: "Use type", value: "System inverter unit" },
      ],
      useCases: [
        "Start a modular Voltrix setup",
        "Expand storage beyond one inverter setup",
        "Support summer house and selected installer routines",
      ],
      faq: [
        "Does one PCS support every setup? One Voltrix group / PCS is recommended for up to 7 Battery Packs.",
        "Can a setup use more than 7 Battery Packs? Yes, larger planning setups add another Voltrix group / PCS.",
        "Does it include Battery Packs? No, Battery Packs are selected separately.",
      ],
    },
    sv: {
      name: "Voltrix Inverter",
      summary: "Inverterenheten för att bygga och expandera en Voltrix Battery Pack-setup.",
      intro:
        "Voltrix Inverter kopplar Battery Packs till en praktisk energisetup och gör det möjligt att bygga ut systemet med fler inverterenheter vid större setup.",
      features: [
        "Rekommenderas för 1-7 Battery Packs i en Voltrix-grupp / PCS",
        "Kan också fungera som startsetup med färre Battery Packs",
        "Utformad för modulär Voltrix-expansion",
        "Kombineras med Battery Packs och utvalda tillbehör runt plattformen",
      ],
      certifications: [
        "Utformad för Voltrix Battery Pack-plattformen",
        "Slutlig konfiguration beror på installation och valda Battery Packs",
      ],
      specs: [
        { label: "Plattform", value: "Voltrix Battery Pack" },
        { label: "Planeringsspann", value: "1-7 Battery Packs per Voltrix-grupp / PCS" },
        { label: "Expansion", value: "Lägg till ytterligare en Voltrix-grupp / PCS över 7 Battery Packs" },
        { label: "Användning", value: "Systeminverter" },
      ],
      useCases: [
        "Starta en modulär Voltrix-setup",
        "Bygg ut lagring bortom en invertersetup",
        "Stöd fritidshus och utvalda installatörsrutiner",
      ],
      faq: [
        "Stödjer en PCS varje setup? En Voltrix-grupp / PCS rekommenderas för upp till 7 Battery Packs.",
        "Kan en setup använda fler än 7 Battery Packs? Ja, större planeringssetuper lägger till ytterligare en Voltrix-grupp / PCS.",
        "Ingår Battery Packs? Nej, Battery Packs väljs separat.",
      ],
    },
  },
};
