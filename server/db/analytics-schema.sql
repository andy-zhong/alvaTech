-- ═══════════════════════════════════════════════════════════════════════════
-- Alva Technology  —  Analytics Schema
-- Run once:  psql -U badr -d alva_db -f server/db/analytics-schema.sql
--
-- GDPR: no IP addresses, no names, no personal identifiers stored.
-- Sessions auto-purge after 90 days (see cron note at bottom).
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS analytics_sessions (
  id           UUID         PRIMARY KEY,          -- random UUID, client-generated
  country_code CHAR(2),                            -- e.g. "SE" — derived from IP, IP never stored
  city         VARCHAR(100),                       -- approximate city
  lang         VARCHAR(10),                        -- UI language, e.g. "sv"
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id          BIGSERIAL    PRIMARY KEY,
  session_id  UUID         NOT NULL REFERENCES analytics_sessions(id) ON DELETE CASCADE,
  type        VARCHAR(50)  NOT NULL,   -- 'pageview' | 'click' | 'engagement'
  page        VARCHAR(500) NOT NULL,
  element     VARCHAR(300),            -- for click events only
  duration_s  INTEGER,                 -- for engagement events only
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Indexes for dashboard query performance
CREATE INDEX IF NOT EXISTS idx_ae_type    ON analytics_events(type);
CREATE INDEX IF NOT EXISTS idx_ae_page    ON analytics_events(page);
CREATE INDEX IF NOT EXISTS idx_ae_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_ae_created ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_as_country ON analytics_sessions(country_code);
CREATE INDEX IF NOT EXISTS idx_as_created ON analytics_sessions(created_at DESC);

-- ── Data retention ───────────────────────────────────────────────────────────
-- Run this as a daily cron job to delete data older than 90 days.
-- Because of ON DELETE CASCADE, deleting a session also deletes its events.
--
--   DELETE FROM analytics_sessions WHERE created_at < NOW() - INTERVAL '90 days';