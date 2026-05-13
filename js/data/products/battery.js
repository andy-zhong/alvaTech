const createMediaItem = (src, alt, type = "image") => ({ src, alt, type });

export const BATTERY_PRODUCT = {
  slug: "voltrix-battery-module",
  name: "Voltrix Battery Module",
  shortName: "Battery",

  heroImage: "/Picture/products/battery/battery01.jpg",
  thumbnail: "/Picture/products/battery/battery01.jpg",

  heroMedia: createMediaItem("/Picture/products/battery/battery01.jpg", "Voltrix Battery Module"),

  gallery: [
    createMediaItem("/Picture/products/battery/battery01.jpg", "Battery module front"),
    createMediaItem("/Picture/products/battery/battery02.jpg", "Battery module installed"),
    createMediaItem("/Picture/products/battery/battery03.jpg", "Battery module detail"),
  ],

  price: "From 2 990 SEK",
  status: "available",
  buyEnabled: true,

  config: {
    basePrice: 0,
    batteryPrice: 2990,
    minBatteries: 1,
    maxBatteries: 10,
    capacityPerBattery: 1,
  },

  translations: {
    en: {
      name: "Voltrix Battery Module",
      summary: "1 kWh LFP battery module for expanding or replacing capacity in the Voltrix system.",
      intro:
        "The Voltrix Battery Module is the standard 1 kWh building block of the Voltrix energy system. Add modules to expand your installed capacity or replace an existing unit.",
      features: [
        "1 kWh per module",
        "LFP chemistry for long cycle life and high safety",
        "Tool-free installation in all Voltrix hubs",
        "Operates from -20 °C to +65 °C with self-heating",
        "IP65 protection against dust and water",
        "Order 1 to 10 modules at a time",
      ],
      certifications: [
        "IEC 62619 compliant LFP cells",
        "CE marked",
        "IP65 rated",
        "Operating temperature: -20 °C to +65 °C",
      ],
      specs: [
        { label: "Capacity per module", value: "1 kWh" },
        { label: "Battery chemistry", value: "LFP (lithium iron phosphate)" },
        { label: "Voltage", value: "48 V nominal" },
        { label: "Max. charge current", value: "20 A" },
        { label: "IP rating", value: "IP65" },
        { label: "Self-heating", value: "Integrated" },
        { label: "Installation", value: "Tool-free, Voltrix-compatible" },
      ],
      useCases: [
        "Expand an existing Voltrix installation",
        "Replace a module in an installed system",
        "Add capacity for higher energy demand",
        "Support off-grid and backup power setups",
      ],
      faq: [
        "Is it compatible with my Voltrix hub? Yes, with all Voltrix hubs.",
        "What is the capacity per module? 1 kWh usable storage.",
        "Can I mix old and new modules? Yes, modules are interchangeable within the system.",
        "How many can I add? Up to 12 per hub, and up to 10 per order here.",
        "Do I need a technician? No, installation is tool-free.",
      ],
    },
    sv: {
      name: "Voltrix Batterimodul",
      summary: "1 kWh LFP-batterimodul för att bygga ut eller ersätta kapacitet i Voltrix-systemet.",
      intro:
        "Voltrix Batterimodul är systemets standardenhet på 1 kWh. Lägg till moduler för att öka installerad kapacitet eller ersätta en befintlig enhet.",
      features: [
        "1 kWh per modul",
        "LFP-kemi för lång livslängd och hög säkerhet",
        "Verktygsfri installation i alla Voltrix-hubbar",
        "Drift från -20 °C till +65 °C med självuppvärmning",
        "IP65-skydd mot damm och vatten",
        "Beställ 1 till 10 moduler åt gången",
      ],
      certifications: [
        "LFP-celler enligt IEC 62619",
        "CE-märkt",
        "IP65-klassad",
        "Drifttemperatur: -20 °C till +65 °C",
      ],
      specs: [
        { label: "Kapacitet per modul", value: "1 kWh" },
        { label: "Batterikemi", value: "LFP (litiumjärnfosfat)" },
        { label: "Spänning", value: "48 V nominell" },
        { label: "Max laddström", value: "20 A" },
        { label: "IP-klass", value: "IP65" },
        { label: "Självuppvärmning", value: "Integrerad" },
        { label: "Installation", value: "Verktygsfri, Voltrix-kompatibel" },
      ],
      useCases: [
        "Bygg ut en befintlig Voltrix-installation",
        "Byt ut en modul i ett installerat system",
        "Lägg till kapacitet vid högre energibehov",
        "Stöd för off-grid och reservkraft",
      ],
      faq: [
        "Är den kompatibel med min Voltrix-hubb? Ja, med alla Voltrix-hubbar.",
        "Hur stor kapacitet har en modul? 1 kWh användbar lagring.",
        "Kan jag blanda gamla och nya moduler? Ja, modulerna är utbytbara inom systemet.",
        "Hur många kan jag lägga till? Upp till 12 per hubb och upp till 10 per beställning här.",
        "Behöver jag en tekniker? Nej, installationen är verktygsfri.",
      ],
    },
    fi: {
      name: "Voltrix-akkumoduuli",
      summary: "1 kWh LFP-akkumoduuli Voltrix-järjestelmän kapasiteetin laajentamiseen tai vaihtoon.",
      intro:
        "Voltrix-akkumoduuli on järjestelmän vakio 1 kWh rakennuspalikka. Lisää moduuleja kasvattaaksesi kapasiteettia tai korvataksesi olemassa olevan yksikön.",
      features: [
        "1 kWh per moduuli",
        "LFP-kemia pitkää käyttöikää ja turvallisuutta varten",
        "Työkaluton asennus kaikkiin Voltrix-hubeihin",
        "Toimii -20 °C ... +65 °C itselämmityksellä",
        "IP65-suoja pölyä ja vettä vastaan",
        "Tilaa 1-10 moduulia kerralla",
      ],
      certifications: [
        "IEC 62619 -yhteensopivat LFP-kennot",
        "CE-merkitty",
        "IP65-luokitus",
        "Käyttölämpötila: -20 °C ... +65 °C",
      ],
      specs: [
        { label: "Kapasiteetti per moduuli", value: "1 kWh" },
        { label: "Akkukemia", value: "LFP (litiumrautafosfaatti)" },
        { label: "Jännite", value: "48 V nimellinen" },
        { label: "Maks. latausvirta", value: "20 A" },
        { label: "IP-luokka", value: "IP65" },
        { label: "Itselämmitys", value: "Integroitu" },
        { label: "Asennus", value: "Työkaluton, Voltrix-yhteensopiva" },
      ],
      useCases: [
        "Laajenna olemassa olevaa Voltrix-järjestelmää",
        "Vaihda moduuli asennetussa järjestelmässä",
        "Lisää kapasiteettia suurempaan energiatarpeeseen",
        "Tuki off-grid- ja varavoimaratkaisuille",
      ],
      faq: [
        "Sopiiko se Voltrix-hubiini? Kyllä, kaikkiin Voltrix-hubeihin.",
        "Mikä on yhden moduulin kapasiteetti? 1 kWh käyttökelpoista varastoa.",
        "Voinko yhdistää vanhoja ja uusia moduuleja? Kyllä, moduulit ovat keskenään vaihdettavia.",
        "Kuinka monta voin lisätä? Jopa 12 per hubi ja tässä enintään 10 per tilaus.",
        "Tarvitsenko asentajan? Et, asennus on työkaluton.",
      ],
    },
    no: {
      name: "Voltrix-batterimodul",
      summary: "1 kWh LFP-batterimodul for utvidelse eller utskifting av kapasitet i Voltrix-systemet.",
      intro:
        "Voltrix-batterimodulen er systemets standardenhet på 1 kWh. Legg til moduler for å øke kapasiteten eller erstatte en eksisterende enhet.",
      features: [
        "1 kWh per modul",
        "LFP-kjemi for lang levetid og høy sikkerhet",
        "Verktøyfri installasjon i alle Voltrix-huber",
        "Drift fra -20 °C til +65 °C med selvoppvarming",
        "IP65-beskyttelse mot støv og vann",
        "Bestill 1 til 10 moduler om gangen",
      ],
      certifications: [
        "IEC 62619-kompatible LFP-celler",
        "CE-merket",
        "IP65-klassifisert",
        "Driftstemperatur: -20 °C til +65 °C",
      ],
      specs: [
        { label: "Kapasitet per modul", value: "1 kWh" },
        { label: "Batterikjemi", value: "LFP (litiumjernfosfat)" },
        { label: "Spenning", value: "48 V nominell" },
        { label: "Maks ladestrøm", value: "20 A" },
        { label: "IP-klasse", value: "IP65" },
        { label: "Selvoppvarming", value: "Integrert" },
        { label: "Installasjon", value: "Verktøyfri, Voltrix-kompatibel" },
      ],
      useCases: [
        "Utvid en eksisterende Voltrix-installasjon",
        "Bytt ut en modul i et installert system",
        "Legg til kapasitet ved høyere energibehov",
        "Støtte for off-grid og reservekraft",
      ],
      faq: [
        "Er den kompatibel med min Voltrix-hub? Ja, med alle Voltrix-huber.",
        "Hvor stor kapasitet har én modul? 1 kWh brukbar lagring.",
        "Kan jeg blande gamle og nye moduler? Ja, modulene er utbyttbare i systemet.",
        "Hvor mange kan jeg legge til? Opptil 12 per hub og opptil 10 per bestilling her.",
        "Trenger jeg en tekniker? Nei, installasjonen er verktøyfri.",
      ],
    },
    da: {
      name: "Voltrix-batterimodul",
      summary: "1 kWh LFP-batterimodul til udvidelse eller udskiftning af kapacitet i Voltrix-systemet.",
      intro:
        "Voltrix-batterimodulet er systemets standardenhed på 1 kWh. Tilføj moduler for at øge kapaciteten eller erstatte en eksisterende enhed.",
      features: [
        "1 kWh pr. modul",
        "LFP-kemi for lang levetid og høj sikkerhed",
        "Værktøjsfri installation i alle Voltrix-hubs",
        "Drift fra -20 °C til +65 °C med selvopvarmning",
        "IP65-beskyttelse mod støv og vand",
        "Bestil 1 til 10 moduler ad gangen",
      ],
      certifications: [
        "IEC 62619-kompatible LFP-celler",
        "CE-mærket",
        "IP65-klassificeret",
        "Driftstemperatur: -20 °C til +65 °C",
      ],
      specs: [
        { label: "Kapacitet pr. modul", value: "1 kWh" },
        { label: "Batterikemi", value: "LFP (litiumjernfosfat)" },
        { label: "Spænding", value: "48 V nominelt" },
        { label: "Maks. ladestrøm", value: "20 A" },
        { label: "IP-klasse", value: "IP65" },
        { label: "Selvopvarmning", value: "Integreret" },
        { label: "Installation", value: "Værktøjsfri, Voltrix-kompatibel" },
      ],
      useCases: [
        "Udvid en eksisterende Voltrix-installation",
        "Udskift en modul i et installeret system",
        "Tilføj kapacitet ved højere energibehov",
        "Støtte til off-grid og backup-strøm",
      ],
      faq: [
        "Er den kompatibel med min Voltrix-hub? Ja, med alle Voltrix-hubs.",
        "Hvor stor kapacitet har én modul? 1 kWh brugbar lagring.",
        "Kan jeg blande gamle og nye moduler? Ja, modulerne er udskiftelige i systemet.",
        "Hvor mange kan jeg tilføje? Op til 12 pr. hub og op til 10 pr. ordre her.",
        "Har jeg brug for en tekniker? Nej, installationen er værktøjsfri.",
      ],
    },
  },
};
