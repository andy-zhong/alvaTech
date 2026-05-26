/**
 * js/analytics/tracker.js
 *
 * Anonymous frontend tracker.
 * Only runs after hasAnalyticsConsent() === true.
 *
 * Tracks: pageviews, button/link clicks, time on page.
 * Never tracks: form inputs, personal data, or anything before consent.
 *
 * Session ID: random UUID in sessionStorage — dies when tab closes.
 *             Never linked to login or identity.
 */

import { hasAnalyticsConsent } from "./consent.js";
import { apiUrl } from "../app/runtime-config.js";

const ENDPOINT    = "/api/track";
const FLUSH_AFTER = 8;        // flush when this many events queued
const FLUSH_EVERY = 30_000;   // also flush every 30 seconds
const SESSION_KEY = "alva-session-id";

// CSS selectors for elements to auto-track on click
const AUTO_TRACK = [
  "[data-track]",
  ".hero .button",
  ".product-visual__configure",
  ".product-visual__link",
  ".detail-actions .button",
  ".cart-actions .button",
  ".cart-actions a",
  ".cart-line__remove",
  ".checkout-submit",
  ".navbar__cart",
].join(", ");

let sessionId   = null;
let batch       = [];
let flushTimer  = null;
let pageStart   = Date.now();
let initialised = false;

// ── Session ID ────────────────────────────────────────────────────────────────

function getOrCreateSessionId() {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    // Fallback för äldre webbläsare som saknar crypto.randomUUID
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

// ── Normalise page path ───────────────────────────────────────────────────────

function normalisePage() {
  const url  = new URL(window.location.href);
  const slug = url.searchParams.get("slug");
  return slug ? `${url.pathname}?slug=${encodeURIComponent(slug)}` : url.pathname;
}

// ── Element label ─────────────────────────────────────────────────────────────

function labelFor(el) {
  if (el.dataset.track)               return el.dataset.track.trim().slice(0, 300);
  if (el.getAttribute("aria-label"))  return el.getAttribute("aria-label").trim().slice(0, 300);
  const text = el.textContent?.trim().replace(/\s+/g, " ");
  if (text && text.length <= 60)      return text;
  return `${el.tagName.toLowerCase()}${el.className ? "." + el.className.split(" ")[0] : ""}`;
}

// ── Batch + flush ─────────────────────────────────────────────────────────────

function push(event) {
  if (!sessionId) return;
  batch.push(event);
  if (batch.length >= FLUSH_AFTER) flush();
}

function flush(useBeacon = false) {
  if (!batch.length || !sessionId) return;

  const payload = JSON.stringify({
    sessionId,
    lang:   document.documentElement.lang || "en",
    events: batch.splice(0),
  });

  if (useBeacon && navigator.sendBeacon) {
    navigator.sendBeacon(apiUrl(ENDPOINT), new Blob([payload], { type: "application/json" }));
  } else {
    fetch(apiUrl(ENDPOINT), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {/* analytics must never break the site */});
  }
}

// ── Event listeners ───────────────────────────────────────────────────────────

function attachListeners() {
  // Click delegation
  document.addEventListener("click", (e) => {
    const el = e.target.closest(AUTO_TRACK);
    if (el) push({ type: "click", page: normalisePage(), element: labelFor(el) });
  }, { passive: true, capture: true });

  // Engagement (time on page)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      const seconds = Math.round((Date.now() - pageStart) / 1000);
      if (seconds >= 2) push({ type: "engagement", page: normalisePage(), duration: seconds });
      flush(true);
      pageStart = Date.now();
    } else {
      pageStart = Date.now();
    }
  });

  window.addEventListener("pagehide", () => {
    const seconds = Math.round((Date.now() - pageStart) / 1000);
    if (seconds >= 2) push({ type: "engagement", page: normalisePage(), duration: seconds });
    flush(true);
  }, { passive: true });
}

// ── Public API ────────────────────────────────────────────────────────────────

export function initTracker() {
  if (initialised || !hasAnalyticsConsent()) return;

  sessionId   = getOrCreateSessionId();
  initialised = true;
  pageStart   = Date.now();

  // Track the current pageview
  push({ type: "pageview", page: normalisePage() });

  attachListeners();

  // Periodic flush
  flushTimer = window.setInterval(() => { if (batch.length) flush(); }, FLUSH_EVERY);
}

export function stopTracker() {
  if (flushTimer) { clearInterval(flushTimer); flushTimer = null; }
  if (batch.length) flush();
  initialised = false;
  sessionId   = null;
  batch       = [];
  sessionStorage.removeItem(SESSION_KEY);
}
