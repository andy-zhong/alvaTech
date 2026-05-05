/**
 * server/middleware/analyticsRateLimit.js
 *
 * In-memory rate limiter for the /api/track endpoint.
 * Keyed on sessionId (never on IP) — allows 120 events per 10 minutes per session.
 * Buckets are cleared automatically every 10 minutes to prevent memory growth.
 */

const WINDOW_MS      = 10 * 60 * 1000;  // 10 minutes
const MAX_PER_WINDOW = 120;

/** @type {Map<string, { count: number, resetAt: number }>} */
const buckets = new Map();

// Clean up expired buckets every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) buckets.delete(key);
  }
}, WINDOW_MS);

function analyticsRateLimit(req, res, next) {
  const sessionId = req.body?.sessionId;

  // No sessionId → let validation in the route handle it
  if (!sessionId || typeof sessionId !== "string") return next();

  const now    = Date.now();
  let   bucket = buckets.get(sessionId);

  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + WINDOW_MS };
    buckets.set(sessionId, bucket);
  }

  const eventCount = Array.isArray(req.body?.events) ? req.body.events.length : 1;
  bucket.count += eventCount;

  if (bucket.count > MAX_PER_WINDOW) {
    return res.status(429).json({ error: "Rate limit exceeded" });
  }

  next();
}

module.exports = analyticsRateLimit;