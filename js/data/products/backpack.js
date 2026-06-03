const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

export const BACKPACK_PRODUCT = {
  slug: "backpack-power",
  name: "Backpack Power",
  shortName: "Backpack Power",

  heroImage: "/Picture/products/backpack/backpack_1inverter+1battery-optimized.jpg",
  thumbnail: "/Picture/products/backpack/backpack_1inverter+1battery-optimized.jpg",

  heroMedia: createMediaItem(
    "/Picture/products/backpack/backpack_1inverter+1battery-optimized.jpg",
    "Backpack Power with one inverter and one Battery Pack"
  ),

  gallery: [
    createMediaItem("/Picture/products/backpack/backpack_1inverter+1battery-optimized.jpg", "Backpack Power setup"),
    createMediaItem("/Picture/products/backpack/backpack03-optimized.jpg", "Backpack Power in use"),
    createMediaItem("/Picture/products/backpack/backpack01-optimized.jpg", "Backpack Power product view"),
    createMediaItem("/Picture/products/backpack/backpack02-optimized.jpg", "Backpack Power charging detail"),
    createMediaItem("/Picture/products/backpack/backpack03-optimized.jpg", "Backpack Power outdoor use"),
  ],

  price: "1 490 SEK",
  status: "available",
  buyEnabled: true,
  basePrice: 1490,
  config: null,

  translations: {
    en: {
      name: "Backpack Power",
      summary: "A carrying add-on for moving Battery Packs closer to outdoor tasks and last-meter work.",
      intro:
        "Backpack Power helps carry useful energy beyond the wall, from the service van or fixed setup to the place where the task actually happens.",
      features: [
        "Designed around the Voltrix Battery Pack platform",
        "Supports last-meter carrying for selected outdoor and workday routines",
        "Useful for garden projects, mobile tasks and service workflows",
        "Keeps Battery Packs organized while moving between locations",
      ],
      certifications: [
        "Designed for the Voltrix Battery Pack platform",
        "Final setup depends on selected Battery Packs and inverter configuration",
      ],
      specs: [
        { label: "Platform", value: "Voltrix Battery Pack" },
        { label: "Use type", value: "Portable carrying add-on" },
        { label: "Typical routine", value: "Outdoor tasks and last-meter work" },
        { label: "Price basis", value: "Accessory only" },
      ],
      useCases: [
        "Move useful power from a van to the final work area",
        "Carry Battery Packs closer to garden and outdoor tasks",
        "Support selected mobile routines away from fixed outlets",
      ],
      faq: [
        "Does it include Battery Packs? No, it is an add-on around the Battery Pack platform.",
        "Is it a full power system by itself? No, final use depends on selected Battery Packs and inverter setup.",
        "Can it be used for installer routines? Yes, for selected last-meter tasks where power needs to move closer.",
      ],
    },
    sv: {
      name: "Backpack Power",
      summary: "Ett bärtillbehör för att flytta Battery Packs närmare utomhusuppgifter och sista metern.",
      intro:
        "Backpack Power hjälper till att bära användbar energi bortom väggen, från servicebilen eller den fasta setupen till platsen där uppgiften sker.",
      features: [
        "Byggd runt Voltrix Battery Pack-plattformen",
        "Stöd för sista metern i utvalda utomhus- och arbetsrutiner",
        "Användbar för trädgårdsprojekt, mobila uppgifter och serviceflöden",
        "Haller Battery Packs organiserade nar de flyttas mellan platser",
      ],
      certifications: [
        "Utformad for Voltrix Battery Pack-plattformen",
        "Slutlig setup beror pa valda Battery Packs och inverterkonfiguration",
      ],
      specs: [
        { label: "Plattform", value: "Voltrix Battery Pack" },
        { label: "Anvandning", value: "Portabelt bartillbehor" },
        { label: "Typisk rutin", value: "Utomhusuppgifter och sista metern" },
        { label: "Prisbas", value: "Endast tillbehör" },
      ],
      useCases: [
        "Flytta användbar energi från servicebil till arbetsplatsens sista meter",
        "Bär Battery Packs närmare trädgårds- och utomhusuppgifter",
        "Stöd utvalda mobila rutiner bort från fasta uttag",
      ],
      faq: [
        "Ingår Battery Packs? Nej, det är ett tillbehör runt Battery Pack-plattformen.",
        "Är det ett komplett energisystem? Nej, användningen beror på valda Battery Packs och invertersetup.",
        "Kan det användas av installatörer? Ja, för utvalda sista-meter-uppgifter där energin behöver flyttas närmare.",
      ],
    },
  },
};
