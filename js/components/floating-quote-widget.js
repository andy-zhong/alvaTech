/**
 * js/components/floating-quote-widget.js
 *
 * Changes from previous version:
 *   — submit handler now POSTs to /api/quote (mirrors the B2B form)
 *   — server errors are shown inline without destroying form state
 *   — loading state on the submit button while the request is in-flight
 *   — all other UI logic (collapse/expand/close, validation, i18n) is unchanged
 */

const WIDGET_COPY = {
  en: {
    collapsedText:  "Need help choosing the right kit?",
    title:          "Need help choosing the right kit?",
    description:    "Tell us about your setup, and we'll help you find the right Voltrix solution.",
    needsLabel:     "Your needs",
    nameLabel:      "Name",
    emailLabel:     "Email",
    phoneLabel:     "Phone",
    submitLabel:    "Send request",
    submittingLabel:"Sending…",
    privacy:
      "By submitting, you agree that Alva Technology may contact you about Voltrix products.",
    needsError:     "Please describe your needs.",
    phoneError:     "Please enter your phone number.",
    serverError:    "Something went wrong. Please try again.",
    successTitle:   "Thank you!",
    successBody:    "Your request has been received. We'll contact you as soon as possible.",
    minimizeLabel:  "Minimize help form",
    closeLabel:     "Close help form",
    expandLabel:    "Open help form",
  },
  sv: {
    collapsedText:  "Behöver du hjälp att välja rätt kit?",
    title:          "Behöver du hjälp att välja rätt kit?",
    description:    "Berätta om ditt behov, så hjälper vi dig att hitta rätt Voltrix-lösning.",
    needsLabel:     "Ditt behov",
    nameLabel:      "Namn",
    emailLabel:     "E-post",
    phoneLabel:     "Telefon",
    submitLabel:    "Skicka förfrågan",
    submittingLabel:"Skickar…",
    privacy:
      "Genom att skicka in formuläret godkänner du att Alva Technology kontaktar dig om Voltrix-produkter.",
    needsError:     "Beskriv ditt behov.",
    phoneError:     "Ange ditt telefonnummer.",
    serverError:    "Något gick fel. Försök igen.",
    successTitle:   "Tack!",
    successBody:    "Din förfrågan har tagits emot. Vi kontaktar dig så snart som möjligt.",
    minimizeLabel:  "Minimera hjälpformulär",
    closeLabel:     "Stäng hjälpformulär",
    expandLabel:    "Öppna hjälpformulär",
  },
  fi: {
    collapsedText:  "Tarvitsetko apua oikean paketin valintaan?",
    title:          "Tarvitsetko apua oikean paketin valintaan?",
    description:    "Kerro kokoonpanostasi, niin autamme sinua löytämään oikean Voltrix-ratkaisun.",
    needsLabel:     "Tarpeesi",
    nameLabel:      "Nimi",
    emailLabel:     "Sähköposti",
    phoneLabel:     "Puhelin",
    submitLabel:    "Lähetä pyyntö",
    submittingLabel:"Lähetetään…",
    privacy:
      "Lähettämällä lomakkeen hyväksyt, että Alva Technology voi ottaa sinuun yhteyttä Voltrix-tuotteista.",
    needsError:     "Kuvaile tarpeesi.",
    phoneError:     "Anna puhelinnumerosi.",
    serverError:    "Jokin meni pieleen. Yritä uudelleen.",
    successTitle:   "Kiitos!",
    successBody:    "Pyyntösi on vastaanotettu. Otamme sinuun yhteyttä mahdollisimman pian.",
    minimizeLabel:  "Pienennä apulomake",
    closeLabel:     "Sulje apulomake",
    expandLabel:    "Avaa apulomake",
  },
  no: {
    collapsedText:  "Trenger du hjelp til å velge riktig kit?",
    title:          "Trenger du hjelp til å velge riktig kit?",
    description:    "Fortell oss om oppsettet ditt, så hjelper vi deg med å finne riktig Voltrix-løsning.",
    needsLabel:     "Dine behov",
    nameLabel:      "Navn",
    emailLabel:     "E-post",
    phoneLabel:     "Telefon",
    submitLabel:    "Send forespørsel",
    submittingLabel:"Sender…",
    privacy:
      "Ved å sende inn godtar du at Alva Technology kan kontakte deg om Voltrix-produkter.",
    needsError:     "Beskriv behovet ditt.",
    phoneError:     "Oppgi telefonnummeret ditt.",
    serverError:    "Noe gikk galt. Prøv igjen.",
    successTitle:   "Takk!",
    successBody:    "Forespørselen din er mottatt. Vi kontakter deg så snart som mulig.",
    minimizeLabel:  "Minimer hjelpeskjema",
    closeLabel:     "Lukk hjelpeskjema",
    expandLabel:    "Åpne hjelpeskjema",
  },
  da: {
    collapsedText:  "Har du brug for hjælp til at vælge det rigtige kit?",
    title:          "Har du brug for hjælp til at vælge det rigtige kit?",
    description:    "Fortæl os om dit setup, så hjælper vi dig med at finde den rigtige Voltrix-løsning.",
    needsLabel:     "Dine behov",
    nameLabel:      "Navn",
    emailLabel:     "E-mail",
    phoneLabel:     "Telefon",
    submitLabel:    "Send forespørgsel",
    submittingLabel:"Sender…",
    privacy:
      "Ved at indsende formularen accepterer du, at Alva Technology må kontakte dig om Voltrix-produkter.",
    needsError:     "Beskriv dine behov.",
    phoneError:     "Indtast dit telefonnummer.",
    serverError:    "Noget gik galt. Prøv igen.",
    successTitle:   "Tak!",
    successBody:    "Din forespørgsel er modtaget. Vi kontakter dig hurtigst muligt.",
    minimizeLabel:  "Minimer hjælpeformular",
    closeLabel:     "Luk hjælpeformular",
    expandLabel:    "Åbn hjælpeformular",
  },
};

function getCopy(lang) {
  return WIDGET_COPY[lang] ?? WIDGET_COPY.sv;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char] ?? char));
}

// ─────────────────────────────────────────────────────────────────────────────
// HTML render helpers (unchanged from original)
// ─────────────────────────────────────────────────────────────────────────────

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

function renderExpanded(copy, values, errors, serverError) {
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
          <label class="floating-quote-widget__label" for="floating-quote-needs">
            ${copy.needsLabel}
          </label>
          <textarea
            class="floating-quote-widget__input floating-quote-widget__textarea ${errors.needs ? "is-invalid" : ""}"
            id="floating-quote-needs"
            name="needs"
            rows="4">${escapeHtml(values.needs)}</textarea>
          <p class="floating-quote-widget__error">${errors.needs ?? ""}</p>
        </div>

        <div class="floating-quote-widget__field-grid">
          <div class="floating-quote-widget__field">
            <label class="floating-quote-widget__label" for="floating-quote-name">
              ${copy.nameLabel}
            </label>
            <input
              class="floating-quote-widget__input"
              type="text"
              id="floating-quote-name"
              name="name"
              value="${escapeHtml(values.name)}">
          </div>

          <div class="floating-quote-widget__field">
            <label class="floating-quote-widget__label" for="floating-quote-email">
              ${copy.emailLabel}
            </label>
            <input
              class="floating-quote-widget__input"
              type="email"
              id="floating-quote-email"
              name="email"
              value="${escapeHtml(values.email)}">
          </div>
        </div>

        <div class="floating-quote-widget__field">
          <label class="floating-quote-widget__label" for="floating-quote-phone">
            ${copy.phoneLabel}
          </label>
          <input
            class="floating-quote-widget__input ${errors.phone ? "is-invalid" : ""}"
            type="tel"
            id="floating-quote-phone"
            name="phone"
            value="${escapeHtml(values.phone)}">
          <p class="floating-quote-widget__error">${errors.phone ?? ""}</p>
        </div>

        ${serverError ? `
          <p class="floating-quote-widget__error floating-quote-widget__error--server">
            ${escapeHtml(serverError)}
          </p>
        ` : ""}

        <button
          class="button button--primary button--wide floating-quote-widget__submit"
          type="submit">
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

// ─────────────────────────────────────────────────────────────────────────────
// Mount — public API called by bootstrap.js
// ─────────────────────────────────────────────────────────────────────────────

export function mountFloatingQuoteWidget({ lang }) {
  // Remove any previous instance (e.g. after language switch)
  const existing = document.getElementById("floating-quote-widget");
  if (existing) existing.remove();

  const copy = getCopy(lang);

  const root = document.createElement("section");
  root.id = "floating-quote-widget";
  root.setAttribute("aria-live", "polite");
  document.body.appendChild(root);

  // ── Model ────────────────────────────────────────────────────────────────
  const model = {
    state:       "collapsed",  // "collapsed" | "expanded" | "submitting" | "submitted" | "closed"
    values:      { needs: "", name: "", email: "", phone: "" },
    errors:      {},
    serverError: null,
  };

  // ── Render ───────────────────────────────────────────────────────────────
  function render() {
    root.className = `floating-quote-widget floating-quote-widget--${model.state}`;

    if (model.state === "closed") {
      root.innerHTML = "";
      root.setAttribute("hidden", "hidden");
      return;
    }

    root.removeAttribute("hidden");

    switch (model.state) {
      case "collapsed":
        root.innerHTML = renderCollapsed(copy);
        break;

      case "expanded":
      case "submitting":
        root.innerHTML = renderExpanded(copy, model.values, model.errors, model.serverError);

        // If submitting, disable the button and show loading label
        if (model.state === "submitting") {
          const btn = root.querySelector(".floating-quote-widget__submit");
          if (btn) {
            btn.disabled    = true;
            btn.textContent = copy.submittingLabel;
          }
        }
        break;

      case "submitted":
        root.innerHTML = renderSubmitted(copy);
        break;
    }
  }

  // ── Client-side validation ───────────────────────────────────────────────
  function validate() {
    const errors = {};
    if (!model.values.needs.trim()) errors.needs = copy.needsError;
    if (!model.values.phone.trim()) errors.phone = copy.phoneError;
    model.errors = errors;
    return Object.keys(errors).length === 0;
  }

  // ── Event delegation ─────────────────────────────────────────────────────
  root.addEventListener("click", (event) => {
    const action = event.target.closest("[data-widget-action]")?.dataset.widgetAction;
    if (!action) return;

    if (action === "expand")   { model.state = "expanded"; }
    if (action === "minimize") { model.state = "collapsed"; }
    if (action === "close")    { model.state = "closed"; }

    render();
  });

  // Clear inline errors as the user types (restores focus after re-render)
  root.addEventListener("input", (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) return;

    model.values[field.name] = field.value;

    if (model.errors[field.name]) {
      delete model.errors[field.name];
      render();
      // Restore focus and cursor position after re-render
      const refocused = root.querySelector(`[name="${field.name}"]`);
      if (refocused instanceof HTMLElement) {
        refocused.focus();
        if ("setSelectionRange" in refocused) {
          const end = model.values[field.name].length;
          refocused.setSelectionRange(end, end);
        }
      }
    }
  });

  // ── Form submit — POSTs to /api/quote (mirrors b2b.js) ──────────────────
  root.addEventListener("submit", async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches("[data-widget-form]")) return;

    event.preventDefault();

    // Sync values from the live form before validation
    const formData = new FormData(form);
    model.values = {
      needs:  String(formData.get("needs")  ?? ""),
      name:   String(formData.get("name")   ?? ""),
      email:  String(formData.get("email")  ?? ""),
      phone:  String(formData.get("phone")  ?? ""),
    };

    // Client-side validation first
    if (!validate()) {
      model.state       = "expanded";
      model.serverError = null;
      render();
      return;
    }

    // Enter loading state
    model.state       = "submitting";
    model.serverError = null;
    render();

    try {
      const res  = await fetch("/api/quote", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(model.values),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || copy.serverError);
      }

      // Success — show confirmation
      model.state = "submitted";
      render();

    } catch (err) {
      // Server error — go back to form, show error message, keep user's data
      model.state       = "expanded";
      model.serverError = err.message || copy.serverError;
      model.errors      = {};
      render();
    }
  });

  render();
}