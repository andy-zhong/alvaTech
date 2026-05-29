const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

export const VOLTDOCK_PRODUCT = {
  slug: "voltdock",
  name: "VoltDock",
  shortName: "VoltDock",

  heroImage: "/Picture/products/voltdock/voltdock01.png",
  thumbnail: "/Picture/products/voltdock/voltdock01.png",

  heroMedia: createMediaItem("/Picture/products/voltdock/voltdock01.png", "VoltDock charging detail"),

  gallery: [
    createMediaItem("/Picture/products/voltdock/voltdock01.png", "VoltDock charging detail"),
    createMediaItem("/Picture/products/voltdock/voltdock02.png", "VoltDock detail view"),
    createMediaItem("/Picture/products/voltdock/voltdock03.png", "VoltDock desktop use"),
    createMediaItem("/Picture/products/voltdock/voltdock04.png", "VoltDock product angle"),
    createMediaItem("/Picture/products/voltdock/voltdock10-optimized.jpg", "VoltDock overview"),
    createMediaItem("/Picture/products/voltdock/voltdock07-optimized.jpg", "VoltDock with battery"),
  ],

  price: "3 990 SEK",
  status: "available",
  buyEnabled: true,
  config: null,
  basePrice: 3990,

  translations: {
    en: {
      name: "VoltDock",
      summary: "A dual-source desktop hub for charging, organisation and backup power at the desk.",
      intro:
        "VoltDock combines charging, audio connectivity and a built-in display in one clean desktop unit. Use it from a wall outlet every day or pair it with a Voltrix battery module for flexible off-grid power.",
      features: [
        "Dual power source: wall outlet or Voltrix battery module",
        "Bluetooth speaker connectivity",
        "Built-in digital clock and status display",
        "USB-A and USB-C charging ports",
        "Compact horizontal desktop form",
        "Works standalone or as part of the Voltrix ecosystem",
      ],
      certifications: [
        "CE marked",
        "RoHS compliant",
        "Compatible with the Voltrix battery ecosystem",
      ],
      specs: [
        { label: "Power source", value: "Wall outlet (AC) or Voltrix battery module" },
        { label: "Display", value: "Digital clock and status display" },
        { label: "USB outputs", value: "USB-A and USB-C charging ports" },
        { label: "Audio", value: "Wireless Bluetooth speaker integration" },
        { label: "Battery compatibility", value: "Voltrix battery module" },
        { label: "Form factor", value: "Horizontal desktop unit" },
      ],
      useCases: [
        "Home office charging hub",
        "Cleaner desk setup than a power strip",
        "Portable workstation with Voltrix battery support",
        "Compact power for cabins and travel",
      ],
      faq: [
        "Does VoltDock require a Voltrix battery? No, it also works from a standard wall outlet.",
        "Can I use my existing Voltrix module? Yes, any compatible module slots in directly.",
        "Does it include a speaker? No, it connects wirelessly to Bluetooth speakers.",
        "How many devices can it charge at once? Multiple devices via USB-A and USB-C simultaneously.",
      ],
    },
    sv: {
      name: "VoltDock",
      summary: "En skrivbordshub med dubbla strömkällor för laddning, ordning och reservkraft vid skrivbordet.",
      intro:
        "VoltDock kombinerar laddning, ljudanslutning och inbyggd display i en ren bordsenhet. Använd den från vägguttag till vardags eller tillsammans med en Voltrix-batterimodul för flexibel off-grid-ström.",
      features: [
        "Dubbel strömkälla: vägguttag eller Voltrix-batterimodul",
        "Bluetooth-anslutning till högtalare",
        "Inbyggd digital klocka och statusdisplay",
        "USB-A- och USB-C-portar för laddning",
        "Kompakt horisontell bordsform",
        "Fungerar fristående eller i Voltrix-ekosystemet",
      ],
      certifications: [
        "CE-märkt",
        "RoHS-kompatibel",
        "Kompatibel med Voltrix-batteriekosystemet",
      ],
      specs: [
        { label: "Strömkälla", value: "Vägguttag (AC) eller Voltrix-batterimodul" },
        { label: "Display", value: "Digital klocka och statusdisplay" },
        { label: "USB-utgångar", value: "USB-A- och USB-C-portar" },
        { label: "Ljud", value: "Trådlös Bluetooth-högtalarintegration" },
        { label: "Batterikompatibilitet", value: "Voltrix-batterimodul" },
        { label: "Formfaktor", value: "Horisontell bordsenhet" },
      ],
      useCases: [
        "Laddningshub för hemmakontoret",
        "Snyggare skrivbordssetup än grenuttag",
        "Portabel arbetsstation med Voltrix-batteri",
        "Kompakt ström för stuga och resa",
      ],
      faq: [
        "Kräver VoltDock ett Voltrix-batteri? Nej, den fungerar även från vanligt vägguttag.",
        "Kan jag använda min befintliga Voltrix-modul? Ja, kompatibla moduler passar direkt.",
        "Ingår en högtalare? Nej, den ansluter trådlöst till Bluetooth-högtalare.",
        "Hur många enheter kan laddas samtidigt? Flera via USB-A och USB-C samtidigt.",
      ],
    },
    fi: {
      name: "VoltDock",
      summary: "Kahden virtalähteen työpöytähubi lataukseen, järjestykseen ja varavirtaan työpisteellä.",
      intro:
        "VoltDock yhdistää latauksen, ääniyhteydet ja sisäänrakennetun näytön yhdeksi siistiksi työpöytäyksiköksi. Käytä sitä seinäpistorasiasta päivittäin tai yhdistä Voltrix-akkumoduuliin joustavaa off-grid-virtaa varten.",
      features: [
        "Kaksi virtalähdettä: seinäpistorasia tai Voltrix-akkumoduuli",
        "Bluetooth-yhteys kaiuttimeen",
        "Sisäänrakennettu digitaalinen kello ja tilanäyttö",
        "USB-A- ja USB-C-latausportit",
        "Kompakti vaakasuuntainen työpöytämuoto",
        "Toimii itsenäisesti tai osana Voltrix-ekosysteemiä",
      ],
      certifications: [
        "CE-merkitty",
        "RoHS-yhteensopiva",
        "Yhteensopiva Voltrix-akkuekososysteemin kanssa",
      ],
      specs: [
        { label: "Virtalähde", value: "Seinäpistorasia (AC) tai Voltrix-akkumoduuli" },
        { label: "Näyttö", value: "Digitaalinen kello ja tilanäyttö" },
        { label: "USB-lähdöt", value: "USB-A- ja USB-C-latausportit" },
        { label: "Ääni", value: "Langaton Bluetooth-kaiutinyhteys" },
        { label: "Akkuyhteensopivuus", value: "Voltrix-akkumoduuli" },
        { label: "Muoto", value: "Vaakasuuntainen työpöytäyksikkö" },
      ],
      useCases: [
        "Kotitoimiston lataushubi",
        "Siistimpi työpöytä kuin jatkojohdolla",
        "Siirrettävä työasema Voltrix-akun kanssa",
        "Kompakti virta mökille ja matkalle",
      ],
      faq: [
        "Tarvitseeko VoltDock Voltrix-akun? Ei, se toimii myös tavallisesta pistorasiasta.",
        "Voinko käyttää nykyistä Voltrix-moduuliani? Kyllä, yhteensopivat moduulit sopivat suoraan.",
        "Sisältyykö kaiutin? Ei, laite yhdistyy langattomasti Bluetooth-kaiuttimiin.",
        "Kuinka monta laitetta voi ladata yhtä aikaa? Useita USB-A- ja USB-C-porttien kautta samanaikaisesti.",
      ],
    },
    no: {
      name: "VoltDock",
      summary: "En skrivebordshub med to strømkilder for lading, orden og reservekraft ved arbeidsplassen.",
      intro:
        "VoltDock kombinerer lading, lydtilkobling og innebygd display i én ryddig skrivebordsenhet. Bruk den fra vegguttak til daglig eller sammen med en Voltrix-batterimodul for fleksibel off-grid-strøm.",
      features: [
        "To strømkilder: vegguttak eller Voltrix-batterimodul",
        "Bluetooth-tilkobling til høyttaler",
        "Innebygd digital klokke og statusdisplay",
        "USB-A- og USB-C-ladeporter",
        "Kompakt horisontal skrivebordsform",
        "Fungerer alene eller i Voltrix-økosystemet",
      ],
      certifications: [
        "CE-merket",
        "RoHS-kompatibel",
        "Kompatibel med Voltrix-batteriøkosystemet",
      ],
      specs: [
        { label: "Strømkilde", value: "Vegguttak (AC) eller Voltrix-batterimodul" },
        { label: "Display", value: "Digital klokke og statusdisplay" },
        { label: "USB-utganger", value: "USB-A- og USB-C-ladeporter" },
        { label: "Lyd", value: "Trådløs Bluetooth-høyttalertilkobling" },
        { label: "Batterikompatibilitet", value: "Voltrix-batterimodul" },
        { label: "Formfaktor", value: "Horisontal skrivebordsenhet" },
      ],
      useCases: [
        "Ladehub for hjemmekontor",
        "Renere skrivebordsoppsett enn en strømskinne",
        "Portabel arbeidsstasjon med Voltrix-batteri",
        "Kompakt strøm for hytte og reise",
      ],
      faq: [
        "Krever VoltDock et Voltrix-batteri? Nei, den fungerer også fra vanlig vegguttak.",
        "Kan jeg bruke min eksisterende Voltrix-modul? Ja, kompatible moduler passer direkte.",
        "Inkluderer den en høyttaler? Nei, den kobles trådløst til Bluetooth-høyttalere.",
        "Hvor mange enheter kan den lade samtidig? Flere via USB-A og USB-C samtidig.",
      ],
    },
    da: {
      name: "VoltDock",
      summary: "En skrivebordshub med to strømkilder til opladning, orden og backup-strøm ved arbejdspladsen.",
      intro:
        "VoltDock samler opladning, lydforbindelse og indbygget display i én ren skrivebordsenhed. Brug den fra stikkontakten til hverdag eller sammen med en Voltrix-batterimodul for fleksibel off-grid-strøm.",
      features: [
        "To strømkilder: stikkontakt eller Voltrix-batterimodul",
        "Bluetooth-forbindelse til højttaler",
        "Indbygget digitalt ur og statusdisplay",
        "USB-A- og USB-C-porte til opladning",
        "Kompakt horisontal skrivebordsform",
        "Fungerer alene eller i Voltrix-økosystemet",
      ],
      certifications: [
        "CE-mærket",
        "RoHS-kompatibel",
        "Kompatibel med Voltrix-batteriøkosystemet",
      ],
      specs: [
        { label: "Strømkilde", value: "Stikkontakt (AC) eller Voltrix-batterimodul" },
        { label: "Display", value: "Digitalt ur og statusdisplay" },
        { label: "USB-udgange", value: "USB-A- og USB-C-ladeporte" },
        { label: "Lyd", value: "Trådløs Bluetooth-højttalerforbindelse" },
        { label: "Batterikompatibilitet", value: "Voltrix-batterimodul" },
        { label: "Formfaktor", value: "Horisontal skrivebordsenhed" },
      ],
      useCases: [
        "Opladningshub til hjemmekontor",
        "Et renere skrivebordssetup end en stikdåse",
        "Bærbar arbejdsstation med Voltrix-batteri",
        "Kompakt strøm til fritidshus og rejser",
      ],
      faq: [
        "Kræver VoltDock et Voltrix-batteri? Nej, den fungerer også fra en almindelig stikkontakt.",
        "Kan jeg bruge min eksisterende Voltrix-modul? Ja, kompatible moduler passer direkte.",
        "Er der en højttaler med? Nej, den forbindes trådløst til Bluetooth-højttalere.",
        "Hvor mange enheder kan den oplade samtidig? Flere via USB-A og USB-C på samme tid.",
      ],
    },
  },
};
