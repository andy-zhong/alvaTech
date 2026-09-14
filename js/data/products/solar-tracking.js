const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

const TRACKER_MEDIA = {
  main: "/Picture/products/tracker/tracker1.png",
  galleryTwo: "/Picture/products/tracker/tracker2.png",
  galleryThree: "/Picture/products/tracker/tracker3.png",
};

export const SOLAR_TRACKING_PRODUCT = {
  slug: "solar-tracking-system",
  name: "Solar tracking system",
  shortName: "Solar tracking",

  heroImage: TRACKER_MEDIA.main,
  thumbnail: TRACKER_MEDIA.main,

  heroMedia: createMediaItem(
    TRACKER_MEDIA.main,
    "Solar tracking system viewed from the front"
  ),

  gallery: [
    createMediaItem(TRACKER_MEDIA.main, "Solar tracking system viewed from the front"),
    createMediaItem(TRACKER_MEDIA.galleryTwo, "Solar tracking system viewed from the rear"),
    createMediaItem(TRACKER_MEDIA.galleryThree, "Solar tracking system mechanism detail"),
  ],

  price: null,
  status: "inquiry",
  buyEnabled: false,
  basePrice: null,
  config: null,

  translations: {
    en: {
      name: "Solar tracking system",
      summary: "A solar-focused extension for summer house setups that want to make more of available daylight.",
      intro:
        "Solar tracking system is a separate solar-focused extension designed around Voltrix summer house setups. It is not a simple plug-on Battery Pack accessory.",
      features: [
        "Solar-focused extension",
        "Designed for summer house and outdoor energy routines",
        "Separate from simple Battery Pack add-ons",
        "Configuration and installation guidance through Alva",
      ],
      certifications: [],
      specs: [
        { label: "Use type", value: "Solar-focused extension" },
        { label: "Platform", value: "Voltrix summer house setup" },
        { label: "Configuration", value: "Confirmed through an inquiry" },
      ],
      useCases: [
        "Summer house solar planning",
        "Outdoor energy routines with available daylight",
        "Solar expansion around the Voltrix platform",
      ],
      faq: [
        "How is the system configured? Contact Alva to confirm the setup and installation requirements.",
        "Is it a simple Battery Pack accessory? No, it is a separate solar-focused extension.",
        "How is pricing confirmed? Pricing is confirmed through an inquiry.",
      ],
    },
    sv: {
      name: "Solar tracking system",
      summary: "En solfokuserad utökning för fritidshussetup som vill nyttja tillgängligt dagsljus bättre.",
      intro:
        "Solar tracking system är en separat solfokuserad utökning utformad runt Voltrix för fritidshus. Det är inte ett enkelt plug-on-tillbehör för Battery Pack.",
      features: [
        "Solfokuserad utökning",
        "Utformad för fritidshus och utomhusrutiner",
        "Separat från enkla Battery Pack-tillbehör",
        "Konfigurations- och installationsvägledning genom Alva",
      ],
      certifications: [],
      specs: [
        { label: "Användning", value: "Solfokuserad utökning" },
        { label: "Plattform", value: "Voltrix fritidshussetup" },
        { label: "Konfiguration", value: "Bekräftas via förfrågan" },
      ],
      useCases: [
        "Solplanering för fritidshus",
        "Utomhusrutiner med tillgängligt dagsljus",
        "Solutökning runt Voltrix-plattformen",
      ],
      faq: [
        "Hur konfigureras systemet? Kontakta Alva för att bekräfta setup och installationskrav.",
        "Är det ett enkelt Battery Pack-tillbehör? Nej, det är en separat solfokuserad utökning.",
        "Hur bekräftas priset? Priset bekräftas via förfrågan.",
      ],
    },
  },
};
