const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

function createMountingProduct({
  slug,
  name,
  shortName,
  summary,
  intro,
  useType,
}) {
  return {
    slug,
    name,
    shortName,

    heroImage: null,
    thumbnail: null,

    heroMedia: createMediaItem(null, name, "placeholder"),
    gallery: [
      createMediaItem(null, name, "placeholder"),
    ],

    price: "Coming soon",
    status: "comingSoon",
    buyEnabled: false,
    basePrice: null,
    config: null,

    translations: {
      en: {
        name,
        summary,
        intro,
        features: [
          "Mounting support for the Voltrix Battery Pack platform",
          "Planned for clean placement around the base unit and battery packs",
          "Separate from solar-panel tracking hardware",
          "Price and availability to be confirmed",
        ],
        certifications: [
          "Coming soon",
          "Final specification, installation requirements and price to be confirmed",
        ],
        specs: [
          { label: "Status", value: "Coming soon" },
          { label: "Use type", value: useType },
          { label: "Platform", value: "Voltrix Battery Pack" },
          { label: "Price", value: "Not included yet" },
        ],
        useCases: [
          "Voltrix Battery Pack placement",
          "Summer house and compact installation routines",
          "Installer planning around organized battery setups",
        ],
        faq: [
          "Is it available now? Not yet, it is planned as a future mounting option.",
          "Is it for solar panels? No, it is mounting support for Voltrix battery setups.",
          "Is the price included? No, price is not included yet.",
        ],
      },
      sv: {
        name,
        summary,
        intro,
        features: [
          "Monteringsstöd för Voltrix Battery Pack-plattformen",
          "Planerad för ren placering runt basenhet och batteripack",
          "Separat från hårdvara för solpanelsföljning",
          "Pris och tillgänglighet bekräftas senare",
        ],
        certifications: [
          "Coming soon",
          "Slutlig specifikation, installationskrav och pris bekräftas senare",
        ],
        specs: [
          { label: "Status", value: "Coming soon" },
          { label: "Användning", value: useType },
          { label: "Plattform", value: "Voltrix Battery Pack" },
          { label: "Pris", value: "Inte inkluderat an" },
        ],
        useCases: [
          "Placering av Voltrix Battery Pack",
          "Fritidshus och kompakta installationsrutiner",
          "Installatorplanering runt organiserade batterisetuper",
        ],
        faq: [
          "Ar den tillganglig nu? Inte an, den ar planerad som ett framtida monteringsval.",
          "Ar den for solpaneler? Nej, den ar monteringsstod for Voltrix batterisetuper.",
          "Ar priset inkluderat? Nej, priset ar inte inkluderat an.",
        ],
      },
    },
  };
}

export const VOLTRIX_WALL_MOUNTING_PRODUCT = createMountingProduct({
  slug: "voltrix-wall-mounting",
  name: "Voltrix Wall Mounting",
  shortName: "Wall Mounting",
  summary: "A future wall-mounted support option for organizing Voltrix Battery Packs.",
  intro:
    "Voltrix Wall Mounting is planned as mounting support for keeping the Voltrix battery setup organized close to the wall.",
  useType: "Wall mounting",
});

export const VOLTRIX_STAND_MOUNTING_PRODUCT = createMountingProduct({
  slug: "voltrix-stand-mounting",
  name: "Voltrix Stand Mounting",
  shortName: "Stand Mounting",
  summary: "A future freestanding support option for Voltrix Battery Pack setups.",
  intro:
    "Voltrix Stand Mounting is planned as a freestanding support option for Voltrix battery setups where wall mounting is not the right fit.",
  useType: "Freestanding mounting",
});
