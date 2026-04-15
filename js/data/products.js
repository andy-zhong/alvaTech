const placeholderImage = (title) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
      <rect width="1200" height="900" fill="#0d2624"/>
      <text x="600" y="430" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="52" font-weight="600">${title}</text>
      <text x="600" y="500" text-anchor="middle" fill="#4caf8a" font-family="sans-serif" font-size="28">New Energy</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

export const PRODUCTS = [

  // ─────────────────────────────────────────
  // VOLTRIX
  // ─────────────────────────────────────────
  {
    slug: "Voltrix",
    name: "Voltrix System",
    shortName: "Voltrix",

    // 🔥 VIKTIGT
    heroImage: "/assets/products/voltrix01.jpg",
    thumbnail: "/assets/products/voltrix01.jpg",

    heroMedia: createMediaItem(
      "/assets/products/voltrix01.jpg",
      "Voltrix System"
    ),

    gallery: [
      createMediaItem("/assets/products/voltrix01.jpg", "Voltrix 1"),
      createMediaItem("/assets/products/voltrix02.jpg", "Voltrix 2"),
      createMediaItem("/assets/products/voltrix03.jpg", "Voltrix 3"),
      createMediaItem("/assets/products/voltrix04.jpg", "Voltrix 4"),
      createMediaItem("/assets/products/voltrix05.jpg", "Voltrix 5"),
      createMediaItem("/assets/products/voltrix06.jpg", "Voltrix 6"),
      createMediaItem("/assets/products/voltrix07.jpg", "Voltrix 7"),
    ],

    price: "From 11 980 SEK",
    status: "available",
    buyEnabled: true,

    config: {
      basePrice: 7990,
      batteryPrice: 2990,
      minBatteries: 1,
      maxBatteries: 12,
      capacityPerBattery: 0.57,
    },

    translations: {
      en: {
        name: "Voltrix System",
        summary: "Expandable household energy hub — grow from 0.57 to 6.84 kWh as your needs change.",
        intro: "The Voltrix is the smart heart of your home energy. Start with a single battery module and expand up to 12. Powered by solar during the day, it supplies your home at night — and the removable core travels with you to power your bike, gear, and adventures.",
        features: [
          "Expandable from 1 to 12 battery modules (0.57–6.84 kWh)",
          "2400W peak AC output — handles high-demand appliances",
          "2400W solar input with 2 independent MPPTs",
          "IP65 rated — fully protected against dust and water jets",
          "Operates from −20 °C to +45 °C with self-heating technology",
          "Ultra-slim wall profile — fits balconies and compact spaces",
          "Stand included for floor installation without wall mounting",
          "WiFi & Bluetooth with cloud platform and mobile app",
          "LFP (lithium iron phosphate) battery chemistry — long cycle life",
          "HF transformer isolation — enhanced safety and grid compliance",
        ],
        certifications: [
          "IP65 (dust and water jet protection)",
          "LFP cell chemistry — IEC 62619 battery safety",
          "CE marked — EN 62109 / EN 61000 series",
          "Grid type: L+N+PE",
          "Operating temperature: −20 °C to +65 °C",
        ],
        specs: [
          { label: "Battery chemistry", value: "LFP (lithium iron phosphate)" },
          { label: "Capacity range", value: "0.57 kWh (1 module) — 6.84 kWh (12 modules)" },
          { label: "Max. AC output", value: "1600 VA rated / 2400 VA peak (10 s)" },
          { label: "Max. solar input", value: "2400 W" },
          { label: "Number of MPPTs", value: "2 independent" },
          { label: "MPPT voltage range", value: "12–60 V" },
          { label: "MPPT tracking efficiency", value: "99 %" },
          { label: "Max. system efficiency", value: "97 %" },
          { label: "AC output voltage", value: "230 V / 180–264 V range" },
          { label: "AC frequency", value: "50/60 Hz" },
          { label: "Cooling method", value: "Natural convection" },
          { label: "Communication", value: "WiFi / Bluetooth" },
          { label: "Control", value: "Cloud Platform + Mobile App" },
          { label: "IP rating", value: "IP65" },
          { label: "Operating temperature", value: "−20 °C to +45 °C" },
          { label: "DC connector", value: "MC4" },
        ],
        useCases: [
          "Residential solar self-consumption — store excess solar for evening use",
          "Balcony and terrace power stations — minimal installation footprint",
          "Grid independence and electricity cost reduction",
          "Outdoor adventures — removable battery core powers e-bikes and gear",
          "Emergency backup — keep lights and essential devices running",
          "Off-grid cabins and remote properties",
        ],
        faq: [
          "Can I add more batteries after purchase? Yes — the system is fully modular. Add modules one at a time up to the 12-unit maximum.",
          "Does it work without solar panels? Yes — Voltrix charges from the grid and stores energy for later use.",
          "What happens during a power cut? Voltrix switches to off-grid mode and continues powering connected loads.",
          "Is installation complex? The unit wall-mounts with standard hardware or uses the included stand — no specialist tools required.",
          "Can the battery leave the system? Yes — the removable core is the universal key to the full ecosystem including e-bikes and backpacks.",
        ],
      },
      sv: {
        name: "Voltrix System",
        summary: "Skalbart energisystem för hemmet — bygg ut från 0,57 till 6,84 kWh i din egen takt.",
        intro: "Voltrix är det smarta hjärtat i ditt hemmaenergisystem. Börja med ett batterimodul och bygg ut till 12. Solenergi under dagen, egenproducerat ström på kvällen — och det utbytbara batterikärnet följer med dig ut på äventyr.",
        features: [
          "Skalbart från 1 till 12 batterimoduler (0,57–6,84 kWh)",
          "2400 W toppeffekt AC-utgång — klarar krävande apparater",
          "2400 W solinmatning med 2 oberoende MPPT-spårare",
          "IP65-klassad — skyddad mot damm och vattenstrålar",
          "Fungerar från −20 °C till +45 °C med självuppvärmningsteknologi",
          "Ultraslim väggprofil — passar balkonger och trånga utrymmen",
          "Stativ ingår för golvplacering utan väggmontering",
          "WiFi och Bluetooth med molnplattform och mobilapp",
          "LFP-batterikemi (litiumjärnfosfat) — lång livslängd",
          "HF-transformatorisolering — ökad säkerhet och nätnätkompatibilitet",
        ],
        certifications: [
          "IP65 (damm- och vattenstrålesskydd)",
          "LFP-cellkemi — IEC 62619 batterisäkerhet",
          "CE-märkt — EN 62109 / EN 61000-serien",
          "Nättyp: L+N+PE",
          "Drifttemperatur: −20 °C till +65 °C",
        ],
        specs: [
          { label: "Batterikemi", value: "LFP (litiumjärnfosfat)" },
          { label: "Kapacitetsintervall", value: "0,57 kWh (1 modul) — 6,84 kWh (12 moduler)" },
          { label: "Max AC-utgång", value: "1600 VA märkeffekt / 2400 VA topp (10 s)" },
          { label: "Max solinmatning", value: "2400 W" },
          { label: "Antal MPPT", value: "2 oberoende" },
          { label: "MPPT-spänningsintervall", value: "12–60 V" },
          { label: "MPPT-spårningseffektivitet", value: "99 %" },
          { label: "Max systemeffektivitet", value: "97 %" },
          { label: "AC-utgångsspänning", value: "230 V / 180–264 V intervall" },
          { label: "AC-frekvens", value: "50/60 Hz" },
          { label: "Kylmetod", value: "Naturlig konvektion" },
          { label: "Kommunikation", value: "WiFi / Bluetooth" },
          { label: "Styrning", value: "Molnplattform + Mobilapp" },
          { label: "IP-klass", value: "IP65" },
          { label: "Drifttemperatur", value: "−20 °C till +45 °C" },
          { label: "DC-kontakt", value: "MC4" },
        ],
        useCases: [
          "Solsjälvkonsumtion i hemmet — lagra överskottssol till kvällsanvändning",
          "Balkong- och terrassinstallationer — minimalt installationsutrymme",
          "Nätoberoende och lägre elkostnad",
          "Friluftsliv — det utbytbara batterikärnet driver elcyklar och utrustning",
          "Reservkraft — håll belysning och vitala enheter igång vid strömavbrott",
          "Nätoberoende stugor och avlägset belägna fastigheter",
        ],
        faq: [
          "Kan jag lägga till fler batterier efter köpet? Ja — systemet är fullt modulärt. Lägg till moduler en åt gången upp till maximal 12 enheter.",
          "Fungerar det utan solpaneler? Ja — Voltrix laddar från elnätet och lagrar energi till senare användning.",
          "Vad händer vid strömavbrott? Voltrix byter till off-grid-läge och fortsätter försörja anslutna laster.",
          "Är installationen komplicerad? Enheten monteras på väggen med standardbeslag eller använder det medföljande stativet — inga specialverktyg krävs.",
          "Kan batteriet tas ur systemet? Ja — det utbytbara kärnet är den universella nyckeln till hela ekosystemet, inklusive elcyklar och ryggsäckar.",
        ],
      },
    },
  },

// ─────────────────────────────────────────
  // VOLTDOCK
  // ─────────────────────────────────────────
  {
    slug: "Voltdock",
    name: "VoltDock",
    shortName: "VoltDock",

    // 🔥 VIKTIGT
    heroImage: "/assets/products/voltdock01.jpg",
    thumbnail: "/assets/products/voltdock01.jpg",

    heroMedia: createMediaItem(
      "/assets/products/voltdock01.jpg",
      "VoltDock"
    ),

    gallery: [
      createMediaItem("/assets/products/voltdock01.jpg", "VoltDock 1"),
      createMediaItem("/assets/products/voltdock02.jpg", "VoltDock 2"),
      createMediaItem("/assets/products/voltdock03.jpg", "VoltDock 3"),
      createMediaItem("/assets/products/voltdock04.jpg", "VoltDock 4"),
      createMediaItem("/assets/products/voltdock05.jpg", "VoltDock 5"),
      createMediaItem("/assets/products/voltdock06.jpg", "VoltDock 6"),
    ],

    price: "3 990 SEK",
    status: "available",
    buyEnabled: true,

    config: null,
    basePrice: 3990,

    translations: {
      en: {
        name: "VoltDock",
        summary: "A dual-source desktop hub that organises and powers all your devices — on or off the grid.",
        intro: "VoltDock plugs into a wall outlet for daily use, or accepts a Voltrix battery for uninterrupted power anywhere. Add wireless audio, charge every device from USB, and keep everything on your desk clean and organised. One hub for your whole setup.",
        features: [
          "Dual-source power: wall outlet or Voltrix battery — instant switchover",
          "Wireless Bluetooth speaker connection — your desk becomes an audio hub",
          "Digital clock and status display built in",
          "Multiple USB-A and USB-C charging ports",
          "Compact horizontal form — fits any desk without taking over it",
          "Works standalone or as part of the full Voltrix ecosystem",
          "No installation required — plug in and start using immediately",
        ],
        certifications: [
          "CE marked",
          "RoHS compliant",
          "Compatible with the Voltrix battery ecosystem",
        ],
        specs: [
          { label: "Power source", value: "Wall outlet (AC) or Voltrix battery module" },
          { label: "Display", value: "Built-in digital clock and status readout" },
          { label: "USB outputs", value: "USB-A and USB-C charging ports" },
          { label: "Audio", value: "Wireless Bluetooth speaker integration" },
          { label: "Battery compatibility", value: "Voltrix battery ecosystem" },
          { label: "Form factor", value: "Horizontal desktop unit" },
        ],
        useCases: [
          "Home office — charge every device from a single hub while playing music",
          "Standing desk setup — replace a power strip with something worth looking at",
          "Portable workstation — insert a Voltrix battery for power anywhere",
          "Backup desk power — keep working through short outages without noticing",
          "Travel — pair with a Voltrix battery for hotel-room or co-working flexibility",
        ],
        faq: [
          "Does VoltDock require a Voltrix battery? No — it works perfectly from any standard wall outlet. The Voltrix battery slot adds off-grid flexibility.",
          "Can I use my existing Voltrix battery? Yes — any Voltrix battery module slots directly into VoltDock.",
          "Does it work as a speaker on its own? VoltDock connects wirelessly to any Bluetooth speaker — it does not include a built-in speaker driver.",
          "How many devices can it charge simultaneously? VoltDock provides multiple USB-A and USB-C ports to charge phones, laptops, and accessories at the same time.",
        ],
      },
      sv: {
        name: "VoltDock",
        summary: "En dual-source skrivbordshub som organiserar och driver alla dina enheter — med eller utan elnät.",
        intro: "VoltDock kopplas in i ett vägguttag för daglig användning, eller tar emot ett Voltrix-batteri för oavbruten ström var som helst. Lägg till trådlöst ljud, ladda alla enheter via USB och håll skrivbordet rent och organiserat. En hub för hela ditt upplägg.",
        features: [
          "Dual-source ström: vägguttag eller Voltrix-batteri — omedelbart byte",
          "Trådlös Bluetooth-högtalaranslutning — skrivbordet blir ett audiocenter",
          "Inbyggd digital klocka och statusdisplay",
          "Flera USB-A- och USB-C-laddningsportar",
          "Kompakt horisontell form — passar vilket skrivbord som helst",
          "Fungerar fristående eller som del av Voltrix-ekosystemet",
          "Ingen installation krävs — koppla in och börja direkt",
        ],
        certifications: [
          "CE-märkt",
          "RoHS-kompatibel",
          "Kompatibel med Voltrix-batterierna",
        ],
        specs: [
          { label: "Strömkälla", value: "Vägguttag (AC) eller Voltrix-batterimodul" },
          { label: "Display", value: "Inbyggd digital klocka och statusvisning" },
          { label: "USB-utgångar", value: "USB-A och USB-C laddningsportar" },
          { label: "Ljud", value: "Trådlös Bluetooth-högtalarintegrering" },
          { label: "Batterikompatibilitet", value: "Voltrix-batterierna" },
          { label: "Formfaktor", value: "Horisontell bordsmodell" },
        ],
        useCases: [
          "Hemmakontor — ladda alla enheter från en hub och spela musik samtidigt",
          "Standing desk-upplägg — ersätt en grenuttag med något som ser bra ut",
          "Portabel arbetsstation — sätt i ett Voltrix-batteri för ström var som helst",
          "Reservkraft vid skrivbordet — jobba utan avbrott vid kortare strömavbrott",
          "Resor — kombinera med ett Voltrix-batteri för flexibilitet på hotell och kontor",
        ],
        faq: [
          "Kräver VoltDock ett Voltrix-batteri? Nej — fungerar perfekt från vilket vägguttag som helst. Voltrix-batterifacket ger off-grid-flexibilitet.",
          "Kan jag använda mitt befintliga Voltrix-batteri? Ja — varje Voltrix-batterimodul passar direkt in i VoltDock.",
          "Fungerar den som högtalare på egen hand? VoltDock ansluter trådlöst till valfri Bluetooth-högtalare — inbyggd högtalardriver ingår inte.",
          "Hur många enheter kan den ladda simultant? VoltDock erbjuder flera USB-A- och USB-C-portar för att ladda telefoner, laptops och tillbehör samtidigt.",
        ],
      },
    },
  },
];