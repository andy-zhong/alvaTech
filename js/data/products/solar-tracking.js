const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

const TRACKER_MEDIA = {
  main: "/Picture/products/tracker/tracker1.webp",
  galleryTwo: "/Picture/products/tracker/tracker2.webp",
  galleryThree: "/Picture/products/tracker/tracker3.webp",
};

export const SOLAR_TRACKING_PRODUCT = {
  slug: "solar-tracking-system",
  name: "Tracker",
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
      name: "Tracker",
      summary: "A sun-tracking mount for compatible solar panels, designed for summer house energy setups.",
      intro:
        "Tracker is a sun-tracking mount for compatible solar panels. Plan it with Voltrix to collect solar energy at your summer house, store it in Battery Packs and use it when needed. Tracking mount only; solar panels are not included.",
      features: [
        "Tracking mount only — solar panels are not included",
        "Up to 40% more solar energy under suitable conditions",
        "Designed for summer house and outdoor energy routines",
        "Panel compatibility, site placement and electrical connections reviewed with Alva",
        "Configuration and installation guidance through Alva",
      ],
      certifications: [],
      specs: [
        { label: "Product type", value: "Sun-tracking mount; solar panels not included" },
        { label: "Potential gain", value: "Up to 40% more solar energy; actual results depend on conditions" },
        { label: "Platform", value: "Voltrix summer house setup" },
        { label: "Configuration", value: "Confirmed through an inquiry" },
      ],
      useCases: [
        "Summer house solar planning",
        "Outdoor energy routines with available daylight",
        "Solar expansion around the Voltrix platform",
      ],
      faq: [
        "Are solar panels included? No. Alva supplies the tracking mount and helps check compatibility with your chosen panels.",
        "How is the system configured? Contact Alva to review the setup and installation requirements.",
        "Is it a simple Battery Pack accessory? No, it is a separate solar-focused extension.",
        "How is pricing confirmed? Pricing is confirmed through an inquiry.",
      ],
    },
    sv: {
      name: "Tracker",
      summary: "Ett solföljande stativ för kompatibla solpaneler, utformat för fritidshusets energisystem.",
      intro:
        "Tracker är ett solföljande stativ för kompatibla solpaneler. Planera det med Voltrix för att samla solenergi vid fritidshuset, lagra den i Battery Packs och använda den när den behövs. Endast solföljande stativ; solpaneler ingår inte.",
      features: [
        "Endast solföljande stativ — solpaneler ingår inte",
        "Upp till 40 % mer solenergi under lämpliga förhållanden",
        "Utformad för fritidshus och utomhusrutiner",
        "Panelkompatibilitet, placering och elektrisk anslutning gås igenom med Alva",
        "Konfigurations- och installationsvägledning genom Alva",
      ],
      certifications: [],
      specs: [
        { label: "Produkttyp", value: "Solföljande stativ; solpaneler ingår inte" },
        { label: "Möjlig ökning", value: "Upp till 40 % mer solenergi; verkligt resultat beror på förhållandena" },
        { label: "Plattform", value: "Voltrix fritidshussetup" },
        { label: "Konfiguration", value: "Bekräftas via förfrågan" },
      ],
      useCases: [
        "Solplanering för fritidshus",
        "Utomhusrutiner med tillgängligt dagsljus",
        "Solutökning runt Voltrix-plattformen",
      ],
      faq: [
        "Ingår solpaneler? Nej. Alva levererar det solföljande stativet och hjälper till att kontrollera kompatibiliteten med dina valda paneler.",
        "Hur konfigureras systemet? Kontakta Alva för att gå igenom setup och installationskrav.",
        "Är det ett enkelt Battery Pack-tillbehör? Nej, det är en separat solfokuserad utökning.",
        "Hur bekräftas priset? Priset bekräftas via förfrågan.",
      ],
    },
  },
};
