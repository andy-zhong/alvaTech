/**
 * js/analytics/consent.js
 *
 * Single source of truth for cookie/tracking consent.
 * Nothing is tracked until hasAnalyticsConsent() returns true.
 *
 * Stored in localStorage under "alva-consent":
 *   { version: 1, decided: true, analytics: true|false, decidedAt: ISO string }
 */

const CONSENT_KEY     = "alva-consent";
const CONSENT_VERSION = 1;

export function getConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Re-prompt if policy version changed
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Returns true only if user has explicitly accepted analytics */
export function hasAnalyticsConsent() {
  return getConsent()?.analytics === true;
}

/** Returns true if user has made any decision (accept OR reject) */
export function hasDecided() {
  return getConsent()?.decided === true;
}

export function setConsent(preferences) {
  const consent = {
    version:   CONSENT_VERSION,
    decided:   true,
    analytics: Boolean(preferences.analytics),
    decidedAt: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  document.dispatchEvent(new CustomEvent("alva:consent", { detail: consent }));
}

export function acceptAll()  { setConsent({ analytics: true  }); }
export function rejectAll()  { setConsent({ analytics: false }); }

export function withdrawConsent() {
  localStorage.removeItem(CONSENT_KEY);
  document.dispatchEvent(new CustomEvent("alva:consent", { detail: null }));
}