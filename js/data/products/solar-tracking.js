const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

const SOLAR_TRACKING_PLACEHOLDER = "Solar tracking system";

export const SOLAR_TRACKING_PRODUCT = {
  slug: "solar-tracking-system",
  name: "Solar tracking system",
  shortName: "Solar tracking",

  heroImage: null,
  thumbnail: null,

  heroMedia: createMediaItem(
    null,
    SOLAR_TRACKING_PLACEHOLDER,
    "placeholder"
  ),

  gallery: [
    createMediaItem(null, SOLAR_TRACKING_PLACEHOLDER, "placeholder"),
  ],

  price: "Coming soon",
  status: "comingSoon",
  buyEnabled: false,
  basePrice: null,
  config: null,

  translations: {
    en: {
      name: "Solar tracking system",
      summary: "A future solar-focused extension for summer house setups that want to make more of available daylight.",
      intro:
        "Solar tracking system is a separate solar-focused extension planned around Voltrix summer house setups. It is not a simple plug-on Battery Pack accessory.",
      features: [
        "Future solar-focused extension",
        "Planned for summer house and outdoor energy routines",
        "Separate from simple Battery Pack add-ons",
        "Price and availability to be confirmed",
      ],
      certifications: [
        "Coming soon",
        "Final specification, installation requirements and price to be confirmed",
      ],
      specs: [
        { label: "Status", value: "Coming soon" },
        { label: "Use type", value: "Solar-focused extension" },
        { label: "Platform", value: "Voltrix summer house setup" },
        { label: "Price", value: "Not included yet" },
      ],
      useCases: [
        "Summer house solar planning",
        "Outdoor energy routines with available daylight",
        "Future expansion around the Voltrix platform",
      ],
      faq: [
        "Is it available now? Not yet, it is planned as a future extension.",
        "Is it a simple Battery Pack accessory? No, it is a separate solar-focused extension.",
        "Is the price included? No, price is not included yet.",
      ],
    },
    sv: {
      name: "Solar tracking system",
      summary: "En framtida solfokuserad utokning for fritidshussetup som vill nyttja tillgangligt dagsljus battre.",
      intro:
        "Solar tracking system ar en separat solfokuserad utokning planerad runt Voltrix for fritidshus. Det ar inte ett enkelt plug-on-tillbehor for Battery Pack.",
      features: [
        "Framtida solfokuserad utökning",
        "Planerad för fritidshus och utomhusrutiner",
        "Separat från enkla Battery Pack-tillbehör",
        "Pris och tillgänglighet bekräftas senare",
      ],
      certifications: [
        "Coming soon",
        "Slutlig specifikation, installationskrav och pris bekräftas senare",
      ],
      specs: [
        { label: "Status", value: "Coming soon" },
        { label: "Användning", value: "Solfokuserad utökning" },
        { label: "Plattform", value: "Voltrix fritidshussetup" },
        { label: "Pris", value: "Inte inkluderat an" },
      ],
      useCases: [
        "Solplanering for fritidshus",
        "Utomhusrutiner med tillgangligt dagsljus",
        "Framtida utokning runt Voltrix-plattformen",
      ],
      faq: [
        "Ar den tillganglig nu? Inte an, den ar planerad som en framtida utokning.",
        "Ar det ett enkelt Battery Pack-tillbehor? Nej, det ar en separat solfokuserad utokning.",
        "Ar priset inkluderat? Nej, priset ar inte inkluderat an.",
      ],
    },
  },
};
