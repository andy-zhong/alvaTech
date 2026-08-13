const WARRANTY_COPY = {
  en: {
    meta: "Purchase information",
    title: "Warranty, returns & support.",
    intro:
      "This page summarizes the current purchase information for Alva Technology customers in Sweden and the EU. Final commercial warranty terms may be updated when Alva's formal product policy is confirmed.",
    sections: [
      [
        "Warranty",
        [
          "Alva products include limited warranty information confirmed with the order, quote or product documentation. The exact warranty period, covered components and service process may differ by product.",
          "Any commercial warranty is additional to your statutory rights. It does not limit rights that apply under Swedish or EU consumer protection rules.",
        ],
      ],
      [
        "Online returns",
        [
          "For online consumer purchases, customers in Sweden and the EU generally have a 14-day right of withdrawal. The period normally starts when the product has been received.",
          "Contact Alva within the withdrawal period before sending products back. Return shipping, inspection and refund details are confirmed during the return process.",
        ],
      ],
      [
        "Faults and complaints",
        [
          "In Sweden, consumers have the right to complain about faults in a product for up to 3 years from receiving the product. Within the EU, consumer goods are covered by a legal guarantee of at least 2 years.",
          "If a product appears faulty, damaged on arrival, or does not match the purchase information, contact Alva with your order reference, product details and photos or a short description of the issue.",
        ],
      ],
      [
        "Support",
        [
          "Alva can help with setup questions, product selection, service handling and return steps. For business purchases, installer projects or custom configurations, support and warranty handling may be confirmed separately in the quote or agreement.",
        ],
      ],
    ],
    referencesTitle: "Useful references",
    referencesBody:
      "The information above follows common Swedish and EU e-commerce practice. You can read more from Konsumentverket and official EU consumer information.",
  },
  sv: {
    meta: "Köpinformation",
    title: "Garanti, returer och support.",
    intro:
      "Här sammanfattas aktuell köpinformation för Alva Technologys kunder i Sverige och EU. De kommersiella garantivillkoren kan uppdateras när Alvas formella produktpolicy är fastställd.",
    sections: [
      [
        "Garanti",
        [
          "Alvas produkter omfattas av begränsad garantiinformation som bekräftas i ordern, offerten eller produktdokumentationen. Exakt garantitid, vilka komponenter som omfattas och hur service hanteras kan skilja sig mellan produkter.",
          "En kommersiell garanti gäller utöver dina lagstadgade rättigheter. Den begränsar inte de rättigheter du har enligt svensk eller EU-baserad konsumentlagstiftning.",
        ],
      ],
      [
        "Returer vid köp online",
        [
          "Vid konsumentköp online har kunder i Sverige och EU normalt 14 dagars ångerrätt. Perioden börjar vanligtvis när produkten har tagits emot.",
          "Kontakta Alva inom ångerfristen innan du skickar tillbaka produkter. Returfrakt, kontroll och återbetalning bekräftas i samband med returprocessen.",
        ],
      ],
      [
        "Fel och reklamation",
        [
          "I Sverige har konsumenter rätt att reklamera fel i en vara i upp till 3 år från mottagandet. Inom EU omfattas konsumentvaror av en lagstadgad garanti på minst 2 år.",
          "Om en produkt verkar felaktig, skadad vid leverans eller inte motsvarar köpinformationen, kontakta Alva med orderreferens, produktuppgifter och bilder eller en kort beskrivning av problemet.",
        ],
      ],
      [
        "Support",
        [
          "Alva kan hjälpa till med frågor om setup, produktval, service och returflöde. För företagsköp, installatörsprojekt eller anpassade konfigurationer kan support och garanti hanteras separat i offert eller avtal.",
        ],
      ],
    ],
    referencesTitle: "Bra referenser",
    referencesBody:
      "Informationen ovan följer vanlig svensk och europeisk e-handelspraxis. Mer information finns hos Konsumentverket och officiell EU-information.",
  },
};

const REFERENCES = {
  en: [
    ["Swedish Consumer Agency: complaints", "https://www.konsumentverket.se/varor-och-tjanster-rattigheter/reklamera-fel-pa-vara-eller-tjanst/"],
    ["Swedish Consumer Agency: right of withdrawal", "https://web-prod.konsumentverket.se/en/articles/right-of-withdrawal/"],
    ["EU consumer shopping rights", "https://www.consilium.europa.eu/en/policies/consumer-protection-shopping-rights/"],
  ],
  sv: [
    ["Konsumentverket: reklamationsrätt", "https://www.konsumentverket.se/varor-och-tjanster-rattigheter/reklamera-fel-pa-vara-eller-tjanst/"],
    ["Konsumentverket: ångerrätt", "https://www.konsumentverket.se/konsumentratt/angerratt/"],
    ["EU: konsumenträttigheter vid köp", "https://europa.eu/youreurope/citizens/consumers/shopping/index_sv.htm"],
  ],
};

export function renderWarrantyReturnsPage({ lang }) {
  const copy = WARRANTY_COPY[lang] ?? WARRANTY_COPY.en;
  const references = REFERENCES[lang] ?? REFERENCES.en;

  return `
    <article class="legal-page">
      <div class="legal-page__inner">
        <header class="legal-page__hero">
          <span class="legal-page__meta">${copy.meta}</span>
          <h1>${copy.title}</h1>
          <p>${copy.intro}</p>
        </header>

        ${copy.sections.map(([title, paragraphs], index) => `
          <section class="legal-section">
            <h2>${title}</h2>
            <div class="legal-section__body">
              ${paragraphs.map((paragraph) => `<p class="${index === 0 && paragraphs.indexOf(paragraph) === 1 ? "legal-notice" : ""}">${paragraph}</p>`).join("")}
            </div>
          </section>
        `).join("")}

        <section class="legal-section">
          <h2>${copy.referencesTitle}</h2>
          <div class="legal-section__body">
            <p>${copy.referencesBody}</p>
            <ul>
              ${references.map(([label, href]) => `<li><a href="${href}" target="_blank" rel="noopener">${label}</a></li>`).join("")}
            </ul>
          </div>
        </section>
      </div>
    </article>
  `;
}
