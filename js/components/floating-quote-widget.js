const WIDGET_COPY = {
  en: {
    collapsedText: "Need help choosing the right kit?",
    title: "Need help choosing the right kit?",
    description:
      "Tell us about your setup, and we'll help you find the right Voltrix solution.",
    needsLabel: "Your needs",
    nameLabel: "Name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    submitLabel: "Send request",
    privacy:
      "By submitting, you agree that Alva Technology may contact you about Voltrix products.",
    needsError: "Please describe your needs.",
    phoneError: "Please enter your phone number.",
    successTitle: "Thank you!",
    successBody:
      "Your request has been received. We'll contact you as soon as possible.",
    minimizeLabel: "Minimize help form",
    closeLabel: "Close help form",
    expandLabel: "Open help form",
  },
  sv: {
    collapsedText: "Behöver du hjälp att välja rätt kit?",
    title: "Behöver du hjälp att välja rätt kit?",
    description:
      "Berätta om ditt behov, så hjälper vi dig att hitta rätt Voltrix-lösning.",
    needsLabel: "Ditt behov",
    nameLabel: "Namn",
    emailLabel: "E-post",
    phoneLabel: "Telefon",
    submitLabel: "Skicka förfrågan",
    privacy:
      "Genom att skicka in formuläret godkänner du att Alva Technology kontaktar dig om Voltrix-produkter.",
    needsError: "Beskriv ditt behov.",
    phoneError: "Ange ditt telefonnummer.",
    successTitle: "Tack!",
    successBody:
      "Din förfrågan har tagits emot. Vi kontaktar dig så snart som möjligt.",
    minimizeLabel: "Minimera hjälpformulär",
    closeLabel: "Stäng hjälpformulär",
    expandLabel: "Öppna hjälpformulär",
  },
  fi: {
    collapsedText: "Tarvitsetko apua oikean paketin valintaan?",
    title: "Tarvitsetko apua oikean paketin valintaan?",
    description:
      "Kerro kokoonpanostasi, niin autamme sinua löytämään oikean Voltrix-ratkaisun.",
    needsLabel: "Tarpeesi",
    nameLabel: "Nimi",
    emailLabel: "Sähköposti",
    phoneLabel: "Puhelin",
    submitLabel: "Lähetä pyyntö",
    privacy:
      "Lähettämällä lomakkeen hyväksyt, että Alva Technology voi ottaa sinuun yhteyttä Voltrix-tuotteista.",
    needsError: "Kuvaile tarpeesi.",
    phoneError: "Anna puhelinnumerosi.",
    successTitle: "Kiitos!",
    successBody:
      "Pyyntösi on vastaanotettu. Otamme sinuun yhteyttä mahdollisimman pian.",
    minimizeLabel: "Pienennä apulomake",
    closeLabel: "Sulje apulomake",
    expandLabel: "Avaa apulomake",
  },
  no: {
    collapsedText: "Trenger du hjelp til å velge riktig kit?",
    title: "Trenger du hjelp til å velge riktig kit?",
    description:
      "Fortell oss om oppsettet ditt, så hjelper vi deg med å finne riktig Voltrix-løsning.",
    needsLabel: "Dine behov",
    nameLabel: "Navn",
    emailLabel: "E-post",
    phoneLabel: "Telefon",
    submitLabel: "Send forespørsel",
    privacy:
      "Ved å sende inn godtar du at Alva Technology kan kontakte deg om Voltrix-produkter.",
    needsError: "Beskriv behovet ditt.",
    phoneError: "Oppgi telefonnummeret ditt.",
    successTitle: "Takk!",
    successBody:
      "Forespørselen din er mottatt. Vi kontakter deg så snart som mulig.",
    minimizeLabel: "Minimer hjelpeskjema",
    closeLabel: "Lukk hjelpeskjema",
    expandLabel: "Åpne hjelpeskjema",
  },
  da: {
    collapsedText: "Har du brug for hjælp til at vælge det rigtige kit?",
    title: "Har du brug for hjælp til at vælge det rigtige kit?",
    description:
      "Fortæl os om dit setup, så hjælper vi dig med at finde den rigtige Voltrix-løsning.",
    needsLabel: "Dine behov",
    nameLabel: "Navn",
    emailLabel: "E-mail",
    phoneLabel: "Telefon",
    submitLabel: "Send forespørgsel",
    privacy:
      "Ved at indsende formularen accepterer du, at Alva Technology må kontakte dig om Voltrix-produkter.",
    needsError: "Beskriv dine behov.",
    phoneError: "Indtast dit telefonnummer.",
    successTitle: "Tak!",
    successBody:
      "Din forespørgsel er modtaget. Vi kontakter dig hurtigst muligt.",
    minimizeLabel: "Minimer hjælpeformular",
    closeLabel: "Luk hjælpeformular",
    expandLabel: "Åbn hjælpeformular",
  },
};

function getCopy(lang) {
  return WIDGET_COPY[lang] ?? WIDGET_COPY.sv;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return map[char] ?? char;
  });
}

function renderControls(copy, state) {
  const controls = [];

  if (state !== "collapsed") {
    controls.push(`
      <button
        class="floating-quote-widget__icon-button"
        type="button"
        data-widget-action="minimize"
        aria-label="${copy.minimizeLabel}">
        <span aria-hidden="true">−</span>
      </button>
    `);
  }

  controls.push(`
    <button
      class="floating-quote-widget__icon-button"
      type="button"
      data-widget-action="close"
      aria-label="${copy.closeLabel}">
      <span aria-hidden="true">×</span>
    </button>
  `);

  return controls.join("");
}

function renderCollapsed(copy) {
  return `
    <div class="floating-quote-widget__bar">
      <button
        class="floating-quote-widget__trigger"
        type="button"
        data-widget-action="expand"
        aria-label="${copy.expandLabel}">
        <span class="floating-quote-widget__prompt">${copy.collapsedText}</span>
      </button>
      <div class="floating-quote-widget__controls">
        ${renderControls(copy, "collapsed")}
      </div>
    </div>
  `;
}

function renderExpanded(copy, values, errors) {
  return `
    <div class="floating-quote-widget__card">
      <div class="floating-quote-widget__card-head">
        <div class="floating-quote-widget__copy">
          <h2 class="floating-quote-widget__title">${copy.title}</h2>
          <p class="floating-quote-widget__description">${copy.description}</p>
        </div>
        <div class="floating-quote-widget__controls">
          ${renderControls(copy, "expanded")}
        </div>
      </div>

      <form class="floating-quote-widget__form" data-widget-form novalidate>
        <div class="floating-quote-widget__field">
          <label class="floating-quote-widget__label" for="floating-quote-needs">${copy.needsLabel}</label>
          <textarea
            class="floating-quote-widget__input floating-quote-widget__textarea ${errors.needs ? "is-invalid" : ""}"
            id="floating-quote-needs"
            name="needs"
            rows="4">${escapeHtml(values.needs)}</textarea>
          <p class="floating-quote-widget__error">${errors.needs ?? ""}</p>
        </div>

        <div class="floating-quote-widget__field-grid">
          <div class="floating-quote-widget__field">
            <label class="floating-quote-widget__label" for="floating-quote-name">${copy.nameLabel}</label>
            <input
              class="floating-quote-widget__input"
              type="text"
              id="floating-quote-name"
              name="name"
              value="${escapeHtml(values.name)}">
          </div>

          <div class="floating-quote-widget__field">
            <label class="floating-quote-widget__label" for="floating-quote-email">${copy.emailLabel}</label>
            <input
              class="floating-quote-widget__input"
              type="email"
              id="floating-quote-email"
              name="email"
              value="${escapeHtml(values.email)}">
          </div>
        </div>

        <div class="floating-quote-widget__field">
          <label class="floating-quote-widget__label" for="floating-quote-phone">${copy.phoneLabel}</label>
          <input
            class="floating-quote-widget__input ${errors.phone ? "is-invalid" : ""}"
            type="tel"
            id="floating-quote-phone"
            name="phone"
            value="${escapeHtml(values.phone)}">
          <p class="floating-quote-widget__error">${errors.phone ?? ""}</p>
        </div>

        <button class="button button--primary button--wide floating-quote-widget__submit" type="submit">
          ${copy.submitLabel}
        </button>
        <p class="floating-quote-widget__privacy">${copy.privacy}</p>
      </form>
    </div>
  `;
}

function renderSubmitted(copy) {
  return `
    <div class="floating-quote-widget__card floating-quote-widget__card--success">
      <div class="floating-quote-widget__card-head">
        <div class="floating-quote-widget__copy">
          <h2 class="floating-quote-widget__title">${copy.successTitle}</h2>
          <p class="floating-quote-widget__description">${copy.successBody}</p>
        </div>
        <div class="floating-quote-widget__controls">
          ${renderControls(copy, "submitted")}
        </div>
      </div>
    </div>
  `;
}

export function mountFloatingQuoteWidget({ lang }) {
  const existing = document.getElementById("floating-quote-widget");
  if (existing) {
    existing.remove();
  }

  const copy = getCopy(lang);
  const root = document.createElement("section");
  const model = {
    state: "collapsed",
    values: {
      needs: "",
      name: "",
      email: "",
      phone: "",
    },
    errors: {},
  };

  root.id = "floating-quote-widget";
  root.className = "floating-quote-widget floating-quote-widget--collapsed";
  root.setAttribute("aria-live", "polite");
  document.body.appendChild(root);

  function render() {
    root.className = `floating-quote-widget floating-quote-widget--${model.state}`;

    if (model.state === "closed") {
      root.innerHTML = "";
      root.setAttribute("hidden", "hidden");
      return;
    }

    root.removeAttribute("hidden");

    if (model.state === "collapsed") {
      root.innerHTML = renderCollapsed(copy);
      return;
    }

    if (model.state === "submitted") {
      root.innerHTML = renderSubmitted(copy);
      return;
    }

    root.innerHTML = renderExpanded(copy, model.values, model.errors);
  }

  function validate() {
    const errors = {};

    if (!model.values.needs.trim()) {
      errors.needs = copy.needsError;
    }

    if (!model.values.phone.trim()) {
      errors.phone = copy.phoneError;
    }

    model.errors = errors;
    return Object.keys(errors).length === 0;
  }

  root.addEventListener("click", (event) => {
    const action = event.target.closest("[data-widget-action]")?.dataset.widgetAction;
    if (!action) return;

    if (action === "expand") {
      model.state = "expanded";
    }

    if (action === "minimize") {
      model.state = "collapsed";
    }

    if (action === "close") {
      model.state = "closed";
    }

    render();
  });

  root.addEventListener("input", (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) {
      return;
    }

    model.values[field.name] = field.value;

    if (model.errors[field.name]) {
      delete model.errors[field.name];
      render();
      const nextField = root.querySelector(`[name="${field.name}"]`);
      if (nextField instanceof HTMLElement) {
        nextField.focus();
        const end = model.values[field.name].length;
        if ("setSelectionRange" in nextField) {
          nextField.setSelectionRange(end, end);
        }
      }
    }
  });

  root.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches("[data-widget-form]")) {
      return;
    }

    event.preventDefault();

    const formData = new FormData(form);
    model.values = {
      needs: String(formData.get("needs") ?? ""),
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
    };

    if (!validate()) {
      model.state = "expanded";
      render();
      return;
    }

    model.errors = {};
    model.state = "submitted";
    render();
  });

  render();
}
