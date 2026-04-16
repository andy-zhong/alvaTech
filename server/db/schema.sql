-- ═══════════════════════════════════════════════════════════════════
-- Alva Technology  —  Database Schema
-- Run:  psql -U badr -d alva_db -f db/schema.sql
-- ═══════════════════════════════════════════════════════════════════

-- ── Orders ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id            SERIAL PRIMARY KEY,
  order_number  VARCHAR(25)   UNIQUE NOT NULL,
  status        VARCHAR(50)   NOT NULL DEFAULT 'new',

  -- Customer
  first_name    VARCHAR(100)  NOT NULL,
  last_name     VARCHAR(100)  NOT NULL,
  email         VARCHAR(255)  NOT NULL,
  phone         VARCHAR(50)   NOT NULL,
  company       VARCHAR(255),
  org_number    VARCHAR(50),

  -- Delivery address
  street        VARCHAR(255)  NOT NULL,
  postal_code   VARCHAR(20)   NOT NULL,
  city          VARCHAR(100)  NOT NULL,
  country       VARCHAR(100)  NOT NULL DEFAULT 'Sweden',

  -- Financials
  subtotal      NUMERIC(12,2) NOT NULL,
  total         NUMERIC(12,2) NOT NULL,

  -- Misc
  notes         TEXT,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── Order items ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id                  SERIAL PRIMARY KEY,
  order_id            INTEGER       NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  -- Product snapshot at time of purchase
  slug                VARCHAR(255)  NOT NULL,
  product_name        VARCHAR(255)  NOT NULL,
  quantity            INTEGER       NOT NULL DEFAULT 1,
  unit_price          NUMERIC(12,2) NOT NULL,
  line_total          NUMERIC(12,2) NOT NULL,

  -- Configuration (Voltrix / battery-count products)
  is_configurable     BOOLEAN       NOT NULL DEFAULT FALSE,
  battery_count       INTEGER,
  capacity_kwh        NUMERIC(10,3),
  configuration_label VARCHAR(255),

  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── Admin users ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255)  UNIQUE NOT NULL,
  password_hash VARCHAR(255)  NOT NULL,
  name          VARCHAR(255)  NOT NULL DEFAULT 'Admin',
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── Auto-update updated_at ───────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_orders_updated_at ON orders;
CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Useful indexes ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_status      ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_email       ON orders(email);
CREATE INDEX IF NOT EXISTS idx_order_items_order  ON order_items(order_id);