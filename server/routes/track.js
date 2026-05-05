/**
 * server/routes/track.js
 *
 * POST /api/track  — public endpoint, no authentication required.
 * Receives batched anonymous events from the frontend tracker.
 * Derives geo from IP then immediately discards the IP — never stored.
 */

const express            = require("express");
const router             = express.Router();
const pool               = require("../db/connection");
const { getGeo }         = require("../services/geo");
const analyticsRateLimit = require("../middleware/analyticsRateLimit");

const VALID_TYPES    = new Set(["pageview", "click", "engagement"]);
const MAX_BATCH_SIZE = 20;

function safeStr(value, max = 500) {
  if (value == null) return null;
  return String(value).replace(/[\x00-\x1F]/g, "").trim().slice(0, max) || null;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function isUuid(str) {
  return typeof str === "string" && UUID_RE.test(str);
}

router.post("/", analyticsRateLimit, async (req, res) => {
  const { sessionId, lang, events } = req.body;

  if (!isUuid(sessionId))
    return res.status(400).json({ error: "Invalid sessionId" });
  if (!Array.isArray(events) || events.length === 0)
    return res.status(400).json({ error: "events must be a non-empty array" });
  if (events.length > MAX_BATCH_SIZE)
    return res.status(400).json({ error: `Too many events (max ${MAX_BATCH_SIZE})` });

  // Sanitise events — skip unknown types silently
  const sanitised = [];
  for (const ev of events) {
    if (!VALID_TYPES.has(ev.type)) continue;
    sanitised.push({
      type:     ev.type,
      page:     safeStr(ev.page, 500) || "/",
      element:  ev.type === "click" ? safeStr(ev.element, 300) : null,
      duration: ev.type === "engagement" && Number.isInteger(ev.duration) && ev.duration > 0
                  ? Math.min(ev.duration, 86400) : null,
    });
  }
  if (sanitised.length === 0)
    return res.status(400).json({ error: "No valid events" });

  // Geo — derive then discard IP immediately
  const { countryCode, city } = getGeo(req.ip);

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Upsert session — ON CONFLICT DO NOTHING preserves original geo on re-flushes
    await client.query(
      `INSERT INTO analytics_sessions (id, country_code, city, lang, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (id) DO NOTHING`,
      [sessionId, countryCode, city, safeStr(lang, 10)]
    );

    for (const ev of sanitised) {
      await client.query(
        `INSERT INTO analytics_events (session_id, type, page, element, duration_s, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [sessionId, ev.type, ev.page, ev.element, ev.duration]
      );
    }

    await client.query("COMMIT");
    
    return res.json({ ok: true, stored: sanitised.length });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[track] DB error:", err.message);
    return res.status(500).json({ error: "Internal error" });
  } finally {
    client.release();
  }
});

module.exports = router;