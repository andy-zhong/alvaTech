/**
 * server/routes/analytics.js
 *
 * Admin-only analytics query endpoints.
 * Mounted at: GET /api/analytics/*
 * ALL routes require a valid admin JWT via requireAdmin middleware.
 */

const express      = require("express");
const router       = express.Router();
const pool         = require("../db/connection");
const requireAdmin = require("../middleware/requireAdmin");

// GET /api/analytics/summary
router.get("/summary", requireAdmin, async (req, res) => {
  const days = Math.min(parseInt(req.query.days || "30", 10), 365);

  try {
    const [sessions, pageviews, clicks, topPages, topElements, countries] =
      await Promise.all([
        pool.query(
          `SELECT COUNT(*) AS count FROM analytics_sessions
           WHERE created_at >= NOW() - ($1 || ' days')::interval`, [days]),
        pool.query(
          `SELECT COUNT(*) AS count FROM analytics_events
           WHERE type = 'pageview'
             AND created_at >= NOW() - ($1 || ' days')::interval`, [days]),
        pool.query(
          `SELECT COUNT(*) AS count FROM analytics_events
           WHERE type = 'click'
             AND created_at >= NOW() - ($1 || ' days')::interval`, [days]),
        pool.query(
          `SELECT page, COUNT(*) AS views
           FROM analytics_events
           WHERE type = 'pageview'
             AND created_at >= NOW() - ($1 || ' days')::interval
           GROUP BY page ORDER BY views DESC LIMIT 10`, [days]),
        pool.query(
          `SELECT element, COUNT(*) AS clicks
           FROM analytics_events
           WHERE type = 'click' AND element IS NOT NULL
             AND created_at >= NOW() - ($1 || ' days')::interval
           GROUP BY element ORDER BY clicks DESC LIMIT 10`, [days]),
        pool.query(
          `SELECT country_code, COUNT(*) AS sessions
           FROM analytics_sessions
           WHERE created_at >= NOW() - ($1 || ' days')::interval
             AND country_code IS NOT NULL
           GROUP BY country_code ORDER BY sessions DESC LIMIT 20`, [days]),
      ]);

    res.json({
      period_days:  days,
      sessions:     parseInt(sessions.rows[0].count, 10),
      pageviews:    parseInt(pageviews.rows[0].count, 10),
      clicks:       parseInt(clicks.rows[0].count, 10),
      top_pages:    topPages.rows,
      top_elements: topElements.rows,
      by_country:   countries.rows,
    });
  } catch (err) {
    console.error("[analytics] Summary error:", err.message);
    res.status(500).json({ error: "Internal error" });
  }
});

// GET /api/analytics/trend  — daily sessions + pageviews
router.get("/trend", requireAdmin, async (req, res) => {
  const days = Math.min(parseInt(req.query.days || "30", 10), 90);
  try {
    const { rows } = await pool.query(
      `SELECT
         DATE(e.created_at)                                  AS date,
         COUNT(DISTINCT e.session_id)                        AS sessions,
         COUNT(*) FILTER (WHERE e.type = 'pageview')         AS pageviews
       FROM analytics_events e
       WHERE e.created_at >= NOW() - ($1 || ' days')::interval
       GROUP BY DATE(e.created_at)
       ORDER BY date ASC`, [days]);
    res.json(rows);
  } catch (err) {
    console.error("[analytics] Trend error:", err.message);
    res.status(500).json({ error: "Internal error" });
  }
});

// GET /api/analytics/engagement  — avg time on page
router.get("/engagement", requireAdmin, async (req, res) => {
  const days = Math.min(parseInt(req.query.days || "30", 10), 365);
  try {
    const { rows } = await pool.query(
      `SELECT page, ROUND(AVG(duration_s)) AS avg_seconds, COUNT(*) AS samples
       FROM analytics_events
       WHERE type = 'engagement' AND duration_s IS NOT NULL
         AND created_at >= NOW() - ($1 || ' days')::interval
       GROUP BY page HAVING COUNT(*) >= 3
       ORDER BY avg_seconds DESC LIMIT 15`, [days]);
    res.json(rows);
  } catch (err) {
    console.error("[analytics] Engagement error:", err.message);
    res.status(500).json({ error: "Internal error" });
  }
});

module.exports = router;