import { getMarket, MARKET_CLUSTERS } from "./markets.js";

const VOLTRIX_SLUG = "voltrix-5-pack-kit";

// Provisional market copy. Replace cluster defaults or per-market overrides as each market gets final positioning.
const GLOBAL_HOME_CONTENT = {
  productSlug: VOLTRIX_SLUG,
  productAlt: "Voltrix modular home energy system",
  trust: {
    eyebrow: "Swedish energy technology",
    title: "Designed in Sweden. Built for homes across Europe.",
    body:
      "Voltrix is part of Alva's modular energy ecosystem, developed around clean product design, removable battery packs and practical support from Sweden.",
    points: [
      "Designed in Sweden",
      "Shipped from Sweden",
      "EU delivery prepared",
      "Support and warranty information confirmed during purchase",
    ],
  },
};

const CLUSTER_CONTENT = {
  [MARKET_CLUSTERS.NORDIC]: {
    hero: {
      eyebrow: "VOLTRIX BY ALVA",
      title: "Modular energy for Nordic homes.",
      subtitle:
        "Store solar energy, keep backup power ready and take removable battery packs where you need them.",
      primaryCta: "Configure your kit",
      secondaryCta: "Explore the system",
      productCta: "Configure System",
      quickPoints: ["Summer house", "Solar storage", "Home backup", "Portable power"],
    },
    why: {
      eyebrow: "Why Voltrix",
      title: "One system for storage, backup and flexible everyday power.",
      items: [
        {
          title: "Modular home energy",
          body: "Start with the Voltrix hub and scale capacity with removable battery packs as your needs change.",
        },
        {
          title: "Solar storage ready",
          body: "Use stored energy from solar panels for evening use, peak periods and lower grid dependence.",
        },
        {
          title: "Backup for the home",
          body: "Keep essential power available when reliability matters at home or at the summer house.",
        },
        {
          title: "Power that moves",
          body: "Take compatible battery packs out of the hub for flexible power beyond one fixed installation.",
        },
      ],
    },
    useCases: {
      eyebrow: "Use cases",
      title: "Made for the way Nordic homes actually use energy.",
      items: [
        ["Summer house", "Keep useful energy ready for weekends, seasonal stays and remote properties."],
        ["Home backup", "Support essential devices when the grid is unstable or temporarily unavailable."],
        ["Solar storage", "Store solar power during the day and use more of it when the home needs it."],
        ["Flexible everyday power", "Move energy from the home to the garden, dock, workshop or outdoor setup."],
      ],
    },
    works: {
      eyebrow: "How it works",
      title: "Charge, store, use and take power with you.",
      steps: [
        ["Home energy hub", "The Voltrix hub becomes the fixed center of the system."],
        ["Battery packs", "Removable packs add capacity and keep the system modular."],
        ["Solar or grid charging", "Charge from solar input or the grid depending on your setup."],
        ["Portable use", "Use compatible packs where fixed power is not practical."],
      ],
    },
    featured: {
      eyebrow: "Featured product",
      title: "Voltrix 5-Pack Kit",
      body:
        "A practical entry into the Voltrix ecosystem for homes, summer houses, solar storage and backup power.",
      cta: "Configure Voltrix",
      secondaryCta: "View product details",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common questions before configuring.",
      items: [
        ["Where is Voltrix shipped from?", "Voltrix is shipped from Sweden. Delivery details are confirmed during checkout."],
        ["Can it be used with solar panels?", "The system is built for solar storage use cases. Final setup details depend on your installation."],
        ["Is installation included?", "Installation requirements and support options should be confirmed before purchase."],
        ["How is VAT or final price handled?", "Price, VAT and delivery information are confirmed in the purchase flow or by the Alva team."],
        ["Can I expand later?", "The system is built around modular battery packs, so future expansion can be planned around your needs."],
      ],
    },
  },
  [MARKET_CLUSTERS.EU_ENGLISH]: {
    hero: {
      eyebrow: "VOLTRIX BY ALVA",
      title: "Modular home energy, designed in Sweden.",
      subtitle:
        "A flexible battery system for homes, holiday properties, solar self-use and backup power across Europe.",
      primaryCta: "Configure your kit",
      secondaryCta: "Explore the system",
      productCta: "Configure System",
      quickPoints: ["Holiday homes", "Solar storage", "Backup power", "Flexible energy"],
    },
    why: {
      eyebrow: "Why Voltrix",
      title: "A modular way to store and use energy at home.",
      items: [
        {
          title: "Modular system",
          body: "Build around the Voltrix hub and add battery capacity as your energy needs grow.",
        },
        {
          title: "Removable packs",
          body: "Battery packs are designed to support both installed storage and flexible portable use.",
        },
        {
          title: "Solar self-use",
          body: "Store more of the energy you produce and use it when the home needs it.",
        },
        {
          title: "Backup readiness",
          body: "Keep practical power available for important devices and everyday continuity.",
        },
      ],
    },
    useCases: {
      eyebrow: "Use cases",
      title: "For homes, holiday properties and everyday resilience.",
      items: [
        ["Holiday properties", "Support seasonal homes and weekend properties with flexible stored energy."],
        ["Solar storage", "Use more of your own solar energy instead of sending it away immediately."],
        ["Home backup", "Prepare practical backup power for essential household needs."],
        ["Portable power", "Move energy to the garden, garage, terrace or off-grid work area."],
      ],
    },
    works: {
      eyebrow: "How it works",
      title: "One hub, modular packs and flexible energy flow.",
      steps: [
        ["Install the hub", "Place the Voltrix hub as the center of the home energy setup."],
        ["Add battery packs", "Choose a capacity level that fits your current use case."],
        ["Charge and store", "Use solar or grid energy depending on the final installation."],
        ["Use where needed", "Keep energy at home or take compatible packs with you."],
      ],
    },
    featured: {
      eyebrow: "Featured product",
      title: "Voltrix 5-Pack Kit",
      body:
        "A modular entry kit for homes, holiday properties, solar storage and backup power. Shipped from Sweden.",
      cta: "Configure Voltrix",
      secondaryCta: "View product details",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Useful information before purchase.",
      items: [
        ["Where does delivery ship from?", "Voltrix is shipped from Sweden. Market-specific delivery details are confirmed during checkout."],
        ["Is this a UK-specific offer?", "No. This English version is a general Europe-facing version, not a UK local market page."],
        ["Can I use it for solar self-consumption?", "Voltrix is positioned for solar storage and self-use scenarios. Final setup depends on your installation."],
        ["What about VAT and delivery cost?", "Final VAT, delivery and purchase details are confirmed during checkout or by the Alva team."],
        ["Can I get help choosing a kit?", "Use the help form or configure the Voltrix kit to prepare your preferred setup."],
      ],
    },
  },
  [MARKET_CLUSTERS.ITALY]: {
    hero: {
      eyebrow: "VOLTRIX PER L'ITALIA",
      title: "Energia modulare per case, ville e casa vacanze.",
      subtitle:
        "Un sistema batteria progettato in Svezia per autoconsumo solare, backup domestico e energia flessibile dove serve.",
      primaryCta: "Configura il tuo kit",
      secondaryCta: "Scopri il sistema",
      productCta: "Configura il sistema",
      quickPoints: ["Casa vacanze", "Ville", "Autoconsumo solare", "Backup casa"],
    },
    why: {
      eyebrow: "Perche Voltrix",
      title: "Energia elegante e pratica per abitazioni italiane.",
      items: [
        {
          title: "Sistema modulare",
          body: "Inizia con l'hub Voltrix e aggiungi moduli batteria in base alla casa, alla villa o alla proprieta vacanze.",
        },
        {
          title: "Autoconsumo solare",
          body: "Accumula energia prodotta durante il giorno e usala quando la casa ne ha bisogno.",
        },
        {
          title: "Backup domestico",
          body: "Mantieni disponibile energia pratica per dispositivi essenziali e momenti di continuita.",
        },
        {
          title: "Batterie rimovibili",
          body: "Porta energia in terrazza, garage, giardino o in aree dove una presa fissa non basta.",
        },
      ],
    },
    useCases: {
      eyebrow: "Casi d'uso",
      title: "Pensato per casa vacanze, ville e autoconsumo solare.",
      items: [
        ["Casa vacanze", "Energia disponibile per soggiorni stagionali, weekend e proprieta lontane dalla routine quotidiana."],
        ["Ville e seconde case", "Un sistema pulito e modulare per proprieta dove estetica e praticita devono convivere."],
        ["Autoconsumo solare", "Usa piu energia prodotta dai pannelli invece di dipendere sempre dalla rete."],
        ["Backup domestico", "Supporto per dispositivi essenziali quando serve continuita energetica."],
      ],
    },
    works: {
      eyebrow: "Come funziona",
      title: "Carica, accumula, usa e porta energia con te.",
      steps: [
        ["Hub domestico", "L'hub Voltrix diventa il centro del sistema energetico della casa."],
        ["Moduli batteria", "I pacchi batteria rimovibili permettono di adattare la capacita nel tempo."],
        ["Solare o rete", "Ricarica con energia solare o dalla rete, secondo la configurazione finale."],
        ["Uso flessibile", "Usa energia in casa o sposta moduli compatibili dove ti servono."],
      ],
    },
    featured: {
      eyebrow: "Prodotto in evidenza",
      title: "Voltrix 5-Pack Kit",
      body:
        "Un ingresso modulare nell'ecosistema Voltrix per casa vacanze, ville, autoconsumo solare e backup domestico. Spedito dalla Svezia in Italia.",
      cta: "Configura Voltrix",
      secondaryCta: "Vedi dettagli prodotto",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Domande frequenti prima della configurazione.",
      items: [
        ["Da dove viene spedito Voltrix?", "Voltrix viene spedito dalla Svezia all'Italia. I dettagli di consegna sono confermati durante il checkout."],
        ["E adatto all'autoconsumo solare?", "Voltrix e pensato per scenari di accumulo solare e uso domestico. La configurazione finale dipende dall'installazione."],
        ["Sono inclusi installazione o tempi di consegna?", "Installazione, disponibilita e dettagli di consegna devono essere confermati prima dell'acquisto."],
        ["Come sono gestiti IVA e prezzo finale?", "Prezzo finale, IVA e costi di consegna vengono confermati nel flusso di acquisto o dal team Alva."],
        ["Posso ricevere aiuto nella scelta?", "Puoi configurare il kit o inviare una richiesta tramite il modulo di supporto sul sito."],
      ],
    },
  },
};

const LOCAL_OVERRIDES = {
  sv: {
    hero: {
      eyebrow: "VOLTRIX AV ALVA",
      title: "Modular energi for nordiska hem.",
      subtitle:
        "Lagra solenergi, hall reservkraft redo och ta med batterimoduler dit du behover dem.",
      primaryCta: "Konfigurera ditt kit",
      secondaryCta: "Utforska systemet",
      productCta: "Konfigurera system",
      quickPoints: ["Fritidshus", "Solenergilagring", "Reservkraft", "Portabel energi"],
    },
  },
  fi: {
    hero: {
      title: "Modulaarista energiaa pohjoisiin koteihin.",
      subtitle:
        "Varastoi aurinkoenergiaa, pidä varavirta valmiina ja vie akkuteho sinne missä sitä tarvitaan.",
      primaryCta: "Määritä paketti",
      secondaryCta: "Tutustu järjestelmään",
      productCta: "Määritä järjestelmä",
      quickPoints: ["Mökki", "Aurinkovarasto", "Varavoima", "Siirrettävä energia"],
    },
  },
  no: {
    hero: {
      title: "Modulær energi for nordiske hjem.",
      subtitle:
        "Lagre solenergi, hold reservekraft klar og ta med batterimoduler dit du trenger dem.",
      primaryCta: "Konfigurer ditt kit",
      secondaryCta: "Utforsk systemet",
      productCta: "Konfigurer system",
      quickPoints: ["Hytte", "Solenergilagring", "Reservekraft", "Bærbar energi"],
    },
  },
  da: {
    hero: {
      title: "Modulær energi til nordiske hjem.",
      subtitle:
        "Gem solenergi, hold backup-strøm klar og tag batterimoduler med derhen, hvor du har brug for dem.",
      primaryCta: "Konfigurer dit kit",
      secondaryCta: "Udforsk systemet",
      productCta: "Konfigurer system",
      quickPoints: ["Fritidshus", "Solenergilagring", "Backup-strøm", "Bærbar energi"],
    },
  },
};

function mergeContent(base, override = {}) {
  return {
    ...GLOBAL_HOME_CONTENT,
    ...base,
    ...override,
    hero: { ...base.hero, ...override.hero },
    why: { ...base.why, ...override.why },
    useCases: { ...base.useCases, ...override.useCases },
    works: { ...base.works, ...override.works },
    trust: { ...GLOBAL_HOME_CONTENT.trust, ...base.trust, ...override.trust },
    featured: { ...base.featured, ...override.featured },
    faq: { ...base.faq, ...override.faq },
  };
}

export function getHomeContent(lang) {
  const market = getMarket(lang);
  const clusterContent = CLUSTER_CONTENT[market.cluster] ?? CLUSTER_CONTENT[MARKET_CLUSTERS.NORDIC];

  return {
    market,
    ...mergeContent(clusterContent, LOCAL_OVERRIDES[lang]),
  };
}
