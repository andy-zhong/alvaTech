const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

export const BIKE_ACCESSORY_PRODUCT = {
  slug: "bike-accessory",
  name: "Bike accessory",
  shortName: "Bike accessory",

  heroImage: "/Picture/products/bike/bike01-optimized.png",
  thumbnail: "/Picture/products/bike/bike01-optimized.png",

  heroMedia: createMediaItem(
    "/Picture/products/bike/bike01-optimized.png",
    "Bike accessory with Voltrix Battery Pack"
  ),

  gallery: [
    createMediaItem("/Picture/products/bike/bike01-optimized.png", "Bike accessory product view"),
    createMediaItem("/Picture/products/bike/bike02-optimized.jpg", "Bike accessory in use"),
  ],

  price: "990 SEK",
  status: "available",
  buyEnabled: true,
  basePrice: 990,
  config: null,

  translations: {
    en: {
      name: "Bike accessory",
      summary: "A light mobility add-on for moving Battery Packs further in local routines.",
      intro:
        "The Bike accessory helps move Battery Packs further with a simple mobility layer for local movement around homes, summer houses and selected workday routines.",
      features: [
        "Designed around the Voltrix Battery Pack platform",
        "Supports local movement where carrying is less practical",
        "Useful for summer house routines, garden areas and selected workday needs",
        "A light add-on, not a standalone energy system",
      ],
      certifications: [
        "Designed for selected Voltrix Battery Pack routines",
        "Final use depends on Battery Pack setup and mounting configuration",
      ],
      specs: [
        { label: "Platform", value: "Voltrix Battery Pack" },
        { label: "Use type", value: "Light mobility add-on" },
        { label: "Typical routine", value: "Local movement" },
        { label: "Price basis", value: "Accessory only" },
      ],
      useCases: [
        "Move Battery Packs around a summer house property",
        "Support local movement between garden, shed and dock routines",
        "Bring practical energy further without a vehicle",
      ],
      faq: [
        "Does it include a Battery Pack? No, it is an add-on around the Battery Pack platform.",
        "Is it an e-bike kit? No, it is a mobility accessory for moving Battery Packs.",
        "Is it priced as a full system? No, the price is for the accessory only.",
      ],
    },
    sv: {
      name: "Bike accessory",
      summary: "Ett latt mobilitetstillbehor for att flytta Battery Packs langre i lokala rutiner.",
      intro:
        "Bike accessory hjalper till att flytta Battery Packs langre med ett enkelt mobilitetslager for lokal forflyttning runt hem, fritidshus och utvalda arbetsrutiner.",
      features: [
        "Byggd runt Voltrix Battery Pack-plattformen",
        "Stodjer lokal forflyttning dar barande ar mindre praktiskt",
        "Anvandbar for fritidshusrutiner, tradgardsytor och utvalda arbetsbehov",
        "Ett latt tillbehor, inte ett fristaende energisystem",
      ],
      certifications: [
        "Utformad for utvalda Voltrix Battery Pack-rutiner",
        "Slutlig anvandning beror pa Battery Pack-setup och montering",
      ],
      specs: [
        { label: "Plattform", value: "Voltrix Battery Pack" },
        { label: "Anvandning", value: "Latt mobilitetstillbehor" },
        { label: "Typisk rutin", value: "Lokal forflyttning" },
        { label: "Prisbas", value: "Endast tillbehor" },
      ],
      useCases: [
        "Flytta Battery Packs runt ett fritidshus",
        "Stod lokal forflyttning mellan tradgard, forrad och brygga",
        "Ta praktisk energi langre utan fordon",
      ],
      faq: [
        "Ingar Battery Pack? Nej, det ar ett tillbehor runt Battery Pack-plattformen.",
        "Ar det ett e-bike kit? Nej, det ar ett mobilitetstillbehor for att flytta Battery Packs.",
        "Är priset för ett komplett system? Nej, priset gäller endast tillbehöret.",
      ],
    },
  },
};
