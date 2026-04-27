/**
 * data/products/voltdock.js
 * VoltDock — Dual-source desktop hub by Alva Technology.
 * An accessory product in the Voltrix ecosystem.
 * Fixed price — no configuration required.
 */

const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

export const VOLTDOCK_PRODUCT = {
  slug:      "voltdock",
  name:      "VoltDock",
  shortName: "VoltDock",

  heroImage: "/assets/products/voltdock01.jpg",
  thumbnail: "/assets/products/voltdock01.jpg",

  heroMedia: createMediaItem(
    "/assets/products/voltdock01.jpg",
    "VoltDock — dual-source desktop hub"
  ),

  gallery: [
    createMediaItem("/assets/products/voltdock01.jpg", "VoltDock — overview"),
    createMediaItem("/assets/products/voltdock02.jpg", "VoltDock — front ports"),
    createMediaItem("/assets/products/voltdock03.jpg", "VoltDock — desk setup"),
    createMediaItem("/assets/products/voltdock04.jpg", "VoltDock — with battery"),
    createMediaItem("/assets/products/voltdock05.jpg", "VoltDock — display detail"),
    createMediaItem("/assets/products/voltdock06.jpg", "VoltDock — portable use"),
  ],

  price:      "3 990 SEK",
  status:     "available",
  buyEnabled: true,

  /**
   * Fixed-price product — no configuration step.
   * product-detail.js uses product.basePrice when config is null.
   */
  config:    null,
  basePrice: 3990,

  translations: {

    // ── English ─────────────────────────────────────────────────────────────
    en: {
      name:    "VoltDock",
      summary: "A dual-source desktop hub that powers and organises your workspace — on or off the grid.",
      intro:
        "VoltDock simplifies your desk by combining device charging, wireless audio, and a built-in clock " +
        "display in one clean unit. Use it with any wall outlet for daily operation, or insert a Voltrix " +
        "battery module for uninterrupted power anywhere — at your desk, in a cabin, or on the go.",

      features: [
        "Dual power source — wall outlet or Voltrix battery module",
        "Wireless Bluetooth speaker connectivity",
        "Integrated digital clock and status display",
        "Multiple USB-A and USB-C charging ports",
        "Compact horizontal form — keeps desks clean",
        "Works standalone or within the full Voltrix ecosystem",
        "No installation required — plug in and start immediately",
      ],

      certifications: [
        "CE marked",
        "RoHS compliant",
        "Compatible with Voltrix battery ecosystem",
      ],

      specs: [
        { label: "Power source",          value: "Wall outlet (AC) or Voltrix battery module" },
        { label: "Display",               value: "Built-in digital clock and status readout" },
        { label: "USB outputs",           value: "USB-A and USB-C charging ports" },
        { label: "Audio",                 value: "Wireless Bluetooth speaker integration" },
        { label: "Battery compatibility", value: "Voltrix battery module" },
        { label: "Form factor",           value: "Horizontal desktop unit" },
      ],

      useCases: [
        "Home office — charge all devices from a single hub",
        "Standing desk — replace a power strip with something cleaner",
        "Portable workstation — pair with a Voltrix battery for off-grid use",
        "Cabin or travel — compact power wherever you need it",
        "Backup desk power — work through short outages uninterrupted",
      ],

      faq: [
        "Does VoltDock require a Voltrix battery? No — it works from any standard wall outlet.",
        "Can I use my existing Voltrix battery module? Yes — any module slots directly in.",
        "Does it include a speaker? No — it connects wirelessly to any Bluetooth speaker.",
        "How many devices can it charge at once? Multiple, via the USB-A and USB-C ports simultaneously.",
      ],
    },

    // ── Swedish ──────────────────────────────────────────────────────────────
    sv: {
      name:    "VoltDock",
      summary: "En skrivbordshub med dubbla strömkällor — driver och organiserar din arbetsyta med eller utan elnät.",
      intro:
        "VoltDock samlar enhetsladdning, trådlöst ljud och inbyggd klocka i en kompakt enhet. " +
        "Använd den med vägguttag som vanligt, eller anslut en Voltrix-batterimodul för oberoende " +
        "strömförsörjning — vid skrivbordet, i stugan eller på resande fot.",

      features: [
        "Dubbel strömkälla — vägguttag eller Voltrix-batterimodul",
        "Trådlös Bluetooth-högtalaranslutning",
        "Inbyggd digital klocka och statusdisplay",
        "USB-A och USB-C laddningsportar",
        "Kompakt horisontell design — håller skrivbordet rent",
        "Fungerar fristående eller som del av Voltrix-ekosystemet",
        "Ingen installation — koppla in och börja direkt",
      ],

      certifications: [
        "CE-märkt",
        "RoHS-kompatibel",
        "Kompatibel med Voltrix-batterier",
      ],

      specs: [
        { label: "Strömkälla",           value: "Vägguttag (AC) eller Voltrix-batterimodul" },
        { label: "Display",              value: "Inbyggd digital klocka och statusvisning" },
        { label: "USB-utgångar",         value: "USB-A och USB-C laddningsportar" },
        { label: "Ljud",                 value: "Trådlös Bluetooth-högtalarintegrering" },
        { label: "Batterikompatibilitet",value: "Voltrix-batterimodul" },
        { label: "Formfaktor",           value: "Horisontell bordsmodell" },
      ],

      useCases: [
        "Hemmakontor — ladda alla enheter från en enda enhet",
        "Standing desk — ersätt grenuttaget med något snyggare",
        "Portabel arbetsstation — kombinera med Voltrix-batteri",
        "Stuga eller resa — kompakt ström var som helst",
        "Reservkraft vid kortare strömavbrott",
      ],

      faq: [
        "Kräver VoltDock ett Voltrix-batteri? Nej — fungerar med vilket vägguttag som helst.",
        "Kan jag använda min befintliga Voltrix-modul? Ja — monteras direkt utan verktyg.",
        "Ingår det en högtalare? Nej — ansluter trådlöst till valfri Bluetooth-högtalare.",
        "Hur många enheter kan laddas samtidigt? Flera — via USB-A och USB-C parallellt.",
      ],
    },
  },
};