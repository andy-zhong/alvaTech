/**
 * js/components/cookie-banner.js
 *
 * Cookie consent banner.
 * Shows on first visit.  Provides Accept All, Reject, and Customise options.
 * A small 🍪 button always stays visible so users can change their mind.
 *
 * Loads Google Analytics 4 only after analytics consent is granted.
 */

import {
  hasDecided, acceptAll, rejectAll, setConsent, getConsent,
} from "../core/consent.js";
import { initGoogleAnalytics, disableGoogleAnalytics } from "../core/ga4.js";

// ── Copy (5 languages) ────────────────────────────────────────────────────────

const COPY = {
  en: {
    heading:      "We value your privacy",
    body:         "We use anonymous analytics to understand how visitors use this site. No personal data is stored. You can accept, reject, or customise.",
    acceptAll:    "Accept all",
    rejectAll:    "Reject non-essential",
    customise:    "Customise",
    savePrefs:    "Save preferences",
    analytics:    "Anonymous analytics",
    analyticsSub: "Helps us understand popular pages. No personal data collected.",
    learnMore:    "Privacy Policy",
    manage:       "Cookie settings",
  },
  sv: {
    heading:      "Vi värnar om din integritet",
    body:         "Vi använder anonym statistik för att förstå hur besökare använder webbplatsen. Inga personuppgifter lagras.",
    acceptAll:    "Acceptera alla",
    rejectAll:    "Avvisa icke-nödvändiga",
    customise:    "Anpassa",
    savePrefs:    "Spara inställningar",
    analytics:    "Anonym statistik",
    analyticsSub: "Hjälper oss förstå populärt innehåll. Inga personuppgifter.",
    learnMore:    "Integritetspolicy",
    manage:       "Cookie-inställningar",
  },
  fi: {
    heading:      "Arvostamme yksityisyyttäsi",
    body:         "Käytämme nimettömiä analytiikkaevästeitä. Henkilötietoja ei tallenneta.",
    acceptAll:    "Hyväksy kaikki",
    rejectAll:    "Hylkää ei-välttämättömät",
    customise:    "Mukauta",
    savePrefs:    "Tallenna asetukset",
    analytics:    "Nimetön analytiikka",
    analyticsSub: "Auttaa meitä ymmärtämään suosittua sisältöä.",
    learnMore:    "Tietosuojaseloste",
    manage:       "Evästeasetukset",
  },
  no: {
    heading:      "Vi verdsetter ditt personvern",
    body:         "Vi bruker anonyme analysecookies. Ingen persondata lagres.",
    acceptAll:    "Godta alle",
    rejectAll:    "Avvis ikke-nødvendige",
    customise:    "Tilpass",
    savePrefs:    "Lagre innstillinger",
    analytics:    "Anonym analyse",
    analyticsSub: "Hjelper oss forstå populært innhold.",
    learnMore:    "Personvernregler",
    manage:       "Cookie-innstillinger",
  },
  da: {
    heading:      "Vi respekterer dit privatliv",
    body:         "Vi bruger anonyme analysecookies. Ingen persondata gemmes.",
    acceptAll:    "Acceptér alle",
    rejectAll:    "Afvis ikke-nødvendige",
    customise:    "Tilpas",
    savePrefs:    "Gem præferencer",
    analytics:    "Anonym analyse",
    analyticsSub: "Hjælper os med at forstå populært indhold.",
    learnMore:    "Privatlivspolitik",
    manage:       "Cookie-indstillinger",
  },
};

function getCopy(lang) { return COPY[lang] ?? COPY.en; }

// ── HTML render ───────────────────────────────────────────────────────────────

function renderBanner(copy, showCustom) {
  return `
    <div class="cookie-banner__inner" role="dialog" aria-label="${copy.heading}">
      <div class="cookie-banner__copy">
        <h2 class="cookie-banner__heading">${copy.heading}</h2>
        <p class="cookie-banner__body">
          ${copy.body}
          <a class="cookie-banner__link" href="/views/privacy-policy.html">${copy.learnMore}</a>
        </p>
      </div>

      ${showCustom ? `
        <div class="cookie-banner__prefs">
          <label class="cookie-pref">
            <div class="cookie-pref__info">
              <strong>${copy.analytics}</strong>
              <span>${copy.analyticsSub}</span>
            </div>
            <span class="cookie-pref__toggle">
              <input type="checkbox" id="pref-analytics" checked>
              <span class="cookie-pref__slider" aria-hidden="true"></span>
            </span>
          </label>
        </div>
      ` : ""}

      <div class="cookie-banner__actions">
        <button class="button button--primary cookie-banner__btn"
                data-consent-action="accept-all">${copy.acceptAll}</button>
        <button class="button button--secondary cookie-banner__btn"
                data-consent-action="reject-all">${copy.rejectAll}</button>
        ${showCustom
          ? `<button class="button button--ghost cookie-banner__btn"
                     data-consent-action="save-prefs">${copy.savePrefs}</button>`
          : `<button class="cookie-banner__text-btn"
                     data-consent-action="show-custom">${copy.customise}</button>`
        }
      </div>
    </div>`;
}

// ── Mount ─────────────────────────────────────────────────────────────────────

export function mountCookieBanner({ lang }) {
  const copy = getCopy(lang);

  // Remove any stale banner instance
  document.getElementById("cookie-banner")?.remove();

  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.className = "cookie-banner";

  // Persistent 🍪 manage button (bottom-left corner)
  let manageWrap = document.getElementById("cookie-manage-btn-wrap");
  if (!manageWrap) {
    manageWrap = document.createElement("div");
    manageWrap.id = "cookie-manage-btn-wrap";
    document.body.appendChild(manageWrap);
  }
  manageWrap.innerHTML = `
    <button class="cookie-manage-btn" data-consent-action="manage"
            aria-label="${copy.manage}" title="${copy.manage}">🍪</button>`;

  let showCustom = false;

  function renderAndShow() {
    banner.innerHTML = renderBanner(copy, showCustom);
    if (!banner.parentElement) document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add("cookie-banner--visible"));
  }

  function hideBanner() {
    banner.classList.remove("cookie-banner--visible");
    setTimeout(() => banner.remove(), 320);
  }

  function onDecision(analyticsGranted) {
    hideBanner();
    analyticsGranted ? initGoogleAnalytics() : disableGoogleAnalytics();
  }

  function handleAction(action) {
    if (action === "accept-all")   { acceptAll(); onDecision(true);  }
    if (action === "reject-all")   { rejectAll(); onDecision(false); }
    if (action === "show-custom")  { showCustom = true; renderAndShow(); }
    if (action === "save-prefs") {
      const checked = banner.querySelector("#pref-analytics")?.checked ?? false;
      setConsent({ analytics: checked });
      onDecision(checked);
    }
    if (action === "manage") { showCustom = true; renderAndShow(); }
  }

  banner.addEventListener("click", (e) => {
    const action = e.target.closest("[data-consent-action]")?.dataset.consentAction;
    if (action) handleAction(action);
  });

  manageWrap.addEventListener("click", (e) => {
    const action = e.target.closest("[data-consent-action]")?.dataset.consentAction;
    if (action) handleAction(action);
  });

  // Initial state
  if (!hasDecided()) {
    renderAndShow();                          // new visitor — show banner
  } else if (getConsent()?.analytics) {
    initGoogleAnalytics();                    // returning visitor who accepted
  }
  // returning visitor who rejected → do nothing

  // React to consent changes from other code (e.g. privacy policy page)
  document.addEventListener("alva:consent", (e) => {
    if (e.detail === null) { showCustom = false; renderAndShow(); }
    else if (e.detail.analytics) initGoogleAnalytics();
    else disableGoogleAnalytics();
  });
}
