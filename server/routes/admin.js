/**
 * routes/admin.js
 * Admin-only API.  All routes except /login require a valid JWT.
 */
const express      = require("express");
const router       = express.Router();
const bcrypt       = require("bcrypt");
const jwt          = require("jsonwebtoken");
const pool         = require("../db/connection");
const requireAdmin = require("../middleware/requireAdmin");

const VALID_STATUSES = ["new", "confirmed", "processing", "shipped", "delivered", "cancelled"];

// ── POST /api/admin/login ─────────────────────────────────────────────────────

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { rows } = await pool.query(
      "SELECT * FROM admin_users WHERE email = $1",
      [email.toLowerCase().trim()]
    );
    const admin = rows[0];

    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      // Same message regardless of which check failed — prevents user enumeration
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token, name: admin.name });

  } catch (err) {
    console.error("[admin] Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ── GET /api/admin/orders ─────────────────────────────────────────────────────

router.get("/orders", requireAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT
         id, order_number, status,
         first_name, last_name, email, phone,
         city, country,
         subtotal, total,
         created_at, updated_at
       FROM orders
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("[admin] List orders error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ── GET /api/admin/orders/:id ─────────────────────────────────────────────────

router.get("/orders/:id", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid order ID" });

  try {
    const [orderRes, itemsRes] = await Promise.all([
      pool.query("SELECT * FROM orders WHERE id = $1", [id]),
      pool.query("SELECT * FROM order_items WHERE order_id = $1 ORDER BY id", [id]),
    ]);

    if (!orderRes.rows.length) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ order: orderRes.rows[0], items: itemsRes.rows });

  } catch (err) {
    console.error("[admin] Get order error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ── PATCH /api/admin/orders/:id/status ───────────────────────────────────────

router.patch("/orders/:id/status", requireAdmin, async (req, res) => {
  const id     = parseInt(req.params.id, 10);
  const { status } = req.body || {};

  if (isNaN(id)) return res.status(400).json({ error: "Invalid order ID" });

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: "Invalid status",
      allowed: VALID_STATUSES,
    });
  }

  try {
    const { rows } = await pool.query(
      "UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (!rows.length) return res.status(404).json({ error: "Order not found" });

    res.json(rows[0]);

  } catch (err) {
    console.error("[admin] Update status error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;