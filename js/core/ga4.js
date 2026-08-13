import { hasAnalyticsConsent } from "./consent.js";

const GA_SCRIPT_ID = "alva-ga4-script";
const GA_ID_PATTERN = /^G-[A-Z0-9]+$/i;

let configuredMeasurementId = null;
let loadingPromise = null;
let pageViewSent = false;

function getMeasurementId() {
  const value = window.ALVA_GA4_MEASUREMENT_ID;
  if (typeof value !== "string") return "";
  return value.trim();
}

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
}

function loadScript(measurementId) {
  const existing = document.getElementById(GA_SCRIPT_ID);
  if (existing) return Promise.resolve();
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("GA4 script failed to load"));
    document.head.appendChild(script);
  }).catch((err) => {
    loadingPromise = null;
    throw err;
  });

  return loadingPromise;
}

export async function initGoogleAnalytics() {
  const measurementId = getMeasurementId();
  if (!measurementId || !hasAnalyticsConsent()) return;

  if (!GA_ID_PATTERN.test(measurementId)) {
    console.warn("[ga4] Ignoring invalid GA4 measurement ID.");
    return;
  }

  ensureDataLayer();
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  try {
    await loadScript(measurementId);
  } catch (err) {
    console.warn("[ga4]", err.message);
    return;
  }

  if (configuredMeasurementId !== measurementId) {
    window.gtag("js", new Date());
    configuredMeasurementId = measurementId;
    pageViewSent = false;
  }

  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  if (!pageViewSent) {
    window.gtag("config", measurementId, {
      page_path: window.location.pathname + window.location.search,
      send_page_view: true,
    });
    pageViewSent = true;
  }
}

export function disableGoogleAnalytics() {
  ensureDataLayer();
  window.gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}
