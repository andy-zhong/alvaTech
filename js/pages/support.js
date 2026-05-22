const SUPPORT_COPY = {
  en: {
    eyebrow: "Support",
    title: "Support for choosing, using and expanding Voltrix.",
    body:
      "A simple starting point for setup guidance, common questions and basic troubleshooting before contacting Alva.",
    quickLinks: [
      ["Instructions", "Setup and everyday use", "#instructions"],
      ["FAQs", "Common product and order questions", "#faqs"],
      ["Troubleshooting", "First checks before support", "#troubleshooting"],
    ],
    instructions: {
      eyebrow: "Instructions",
      title: "Start with the basics.",
      intro:
        "These notes are a first guide for planning and using a Voltrix setup. Final installation details should be confirmed with Alva or an approved installer.",
      items: [
        ["Plan the location", "Place the system where ventilation, access and cable routing can be handled cleanly."],
        ["Check the battery modules", "Make sure battery packs are seated correctly and that visible connectors are clean and undamaged."],
        ["Connect add-ons carefully", "Use compatible accessories such as VoltDock only with the intended battery module and power configuration."],
        ["Keep product details available", "Save order information, product name and photos of the setup before requesting support."],
      ],
    },
    faqs: {
      eyebrow: "FAQs",
      title: "Common questions.",
      items: [
        ["Can I expand later?", "Yes. Voltrix is designed as a modular platform, but capacity planning should be confirmed before purchase."],
        ["Is installation included?", "Installation depends on the selected setup and market. Alva confirms the available options during planning."],
        ["Can I use VoltDock without a battery?", "VoltDock can also be used from a wall outlet, depending on the configuration."],
        ["Where do I get order help?", "Use the contact page and include your order details so the team can identify the right setup."],
      ],
    },
    troubleshooting: {
      eyebrow: "Troubleshooting",
      title: "First checks.",
      intro:
        "If something does not work as expected, start with the checks below. Stop using the product if there is visible damage, unusual smell, heat or noise.",
      checks: [
        ["No power", "Check that the battery is charged, seated correctly and that cables or outlets are connected."],
        ["Device will not charge", "Try another cable, confirm the device power requirement and test one device at a time."],
        ["Unexpected shutdown", "Let the unit rest, remove non-essential loads and check whether the battery capacity is low."],
        ["Support request", "Send product name, order reference, photos and a short description of what happened."],
      ],
    },
    ctaTitle: "Need help with a real setup?",
    ctaBody: "Contact Alva with your product, order reference and a short description of the issue.",
    ctaPrimary: "Contact Alva",
    ctaSecondary: "View products",
  },
  sv: {
    eyebrow: "Support",
    title: "Support för att välja, använda och bygga ut Voltrix.",
    body:
      "En enkel startpunkt för vägledning, vanliga frågor och grundläggande felsökning innan du kontaktar Alva.",
    quickLinks: [
      ["Instruktioner", "Installation och vardagsanvändning", "#instructions"],
      ["FAQ", "Vanliga produkt- och orderfrågor", "#faqs"],
      ["Felsökning", "Första kontroller före support", "#troubleshooting"],
    ],
    instructions: {
      eyebrow: "Instruktioner",
      title: "Börja med grunderna.",
      intro:
        "Dessa anteckningar är en första guide för planering och användning av en Voltrix-setup. Slutliga installationsdetaljer ska bekräftas med Alva eller en godkänd installatör.",
      items: [
        ["Planera placeringen", "Placera systemet där ventilation, åtkomst och kabeldragning kan hanteras rent."],
        ["Kontrollera batterimodulerna", "Se till att batteripacken sitter rätt och att synliga kontakter är rena och oskadade."],
        ["Anslut tillbehör varsamt", "Använd kompatibla tillbehör som VoltDock endast med avsedd batterimodul och kraftkonfiguration."],
        ["Spara produktinformation", "Spara orderinformation, produktnamn och bilder av setupen innan du begär support."],
      ],
    },
    faqs: {
      eyebrow: "FAQ",
      title: "Vanliga frågor.",
      items: [
        ["Kan jag bygga ut senare?", "Ja. Voltrix är byggt som en modulär plattform, men kapacitetsplanering bör bekräftas före köp."],
        ["Ingår installation?", "Installation beror på vald setup och marknad. Alva bekräftar tillgängliga alternativ under planeringen."],
        ["Kan jag använda VoltDock utan batteri?", "VoltDock kan även användas från vägguttag, beroende på konfiguration."],
        ["Var får jag orderhjälp?", "Använd kontaktsidan och inkludera orderdetaljer så att teamet kan hitta rätt setup."],
      ],
    },
    troubleshooting: {
      eyebrow: "Felsökning",
      title: "Första kontroller.",
      intro:
        "Om något inte fungerar som väntat, börja med kontrollerna nedan. Sluta använda produkten vid synlig skada, ovanlig lukt, värme eller ljud.",
      checks: [
        ["Ingen ström", "Kontrollera att batteriet är laddat, sitter korrekt och att kablar eller uttag är anslutna."],
        ["Enheten laddar inte", "Prova en annan kabel, kontrollera enhetens effektbehov och testa en enhet i taget."],
        ["Oväntad avstängning", "Låt enheten vila, ta bort onödiga laster och kontrollera om batterikapaciteten är låg."],
        ["Supportärende", "Skicka produktnamn, orderreferens, bilder och en kort beskrivning av vad som hände."],
      ],
    },
    ctaTitle: "Behöver du hjälp med en riktig setup?",
    ctaBody: "Kontakta Alva med produkt, orderreferens och en kort beskrivning av ärendet.",
    ctaPrimary: "Kontakta Alva",
    ctaSecondary: "Visa produkter",
  },
};

function getSupportCopy(lang) {
  return SUPPORT_COPY[lang] ?? SUPPORT_COPY.en;
}

export function renderSupportPage({ lang }) {
  const copy = getSupportCopy(lang);

  return `
    <section class="support-hero">
      <span class="eyebrow">${copy.eyebrow}</span>
      <h1>${copy.title}</h1>
      <p>${copy.body}</p>
      <nav class="support-quicklinks" aria-label="Support sections">
        ${copy.quickLinks.map(([title, body, href]) => `
          <a href="${href}">
            <strong>${title}</strong>
            <span>${body}</span>
          </a>
        `).join("")}
      </nav>
    </section>

    <section class="support-section" id="instructions" aria-labelledby="support-instructions-title">
      <div class="support-section__head">
        <span class="eyebrow">${copy.instructions.eyebrow}</span>
        <h2 id="support-instructions-title">${copy.instructions.title}</h2>
        <p>${copy.instructions.intro}</p>
      </div>
      <div class="support-row-list">
        ${copy.instructions.items.map(([title, body]) => renderSupportRow(title, body)).join("")}
      </div>
    </section>

    <section class="support-section support-section--soft" id="faqs" aria-labelledby="support-faqs-title">
      <div class="support-section__head">
        <span class="eyebrow">${copy.faqs.eyebrow}</span>
        <h2 id="support-faqs-title">${copy.faqs.title}</h2>
      </div>
      <div class="support-row-list">
        ${copy.faqs.items.map(([title, body]) => renderSupportRow(title, body)).join("")}
      </div>
    </section>

    <section class="support-section" id="troubleshooting" aria-labelledby="support-troubleshooting-title">
      <div class="support-section__head">
        <span class="eyebrow">${copy.troubleshooting.eyebrow}</span>
        <h2 id="support-troubleshooting-title">${copy.troubleshooting.title}</h2>
        <p>${copy.troubleshooting.intro}</p>
      </div>
      <div class="support-row-list">
        ${copy.troubleshooting.checks.map(([title, body]) => renderSupportRow(title, body)).join("")}
      </div>
    </section>

    <section class="support-cta">
      <h2>${copy.ctaTitle}</h2>
      <p>${copy.ctaBody}</p>
      <div class="support-actions">
        <a class="button button--primary" href="/views/b2b.html">${copy.ctaPrimary}</a>
        <a class="button button--secondary" href="/views/products.html">${copy.ctaSecondary}</a>
      </div>
    </section>
  `;
}

function renderSupportRow(title, body) {
  return `
    <article class="support-row">
      <h3>${title}</h3>
      <p>${body}</p>
    </article>
  `;
}
