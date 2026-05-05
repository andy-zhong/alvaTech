require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const express = require("express");
const cors    = require("cors");
const path    = require("path");

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Safe route loader ──────────────────────────────────────────────────────
// If a route file doesn't exist yet the server still starts — just warns.
function loadRoute(routePath) {
  try {
    return require(routePath);
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      console.warn(`[server] Route not found: ${routePath}`);
      return null;
    }
    throw err;
  }
}

// ── Load all routes ────────────────────────────────────────────────────────
const authRoutes     = loadRoute("./routes/auth");
const b2bRoutes      = loadRoute("./routes/b2b");
const quoteRoutes    = loadRoute("./routes/quote");
const orderRoutes    = loadRoute("./routes/orders");
const adminRoutes    = loadRoute("./routes/admin");
const trackRoute     = loadRoute("./routes/track");      // analytics ingest (public)
const analyticsRoute = loadRoute("./routes/analytics");  // analytics read (admin-only)

const pool = require("./db/connection");

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({
  origin:         process.env.CORS_ORIGIN || "*",
  methods:        ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the project root as static files
app.use(express.static(path.join(__dirname, "..")));

// ── API Routes (each mounted exactly once) ─────────────────────────────────
if (authRoutes)     app.use("/auth",           authRoutes);
if (b2bRoutes)      app.use("/api/b2b",        b2bRoutes);
if (quoteRoutes)    app.use("/api/quote",       quoteRoutes);
if (orderRoutes)    app.use("/api/orders",      orderRoutes);
if (adminRoutes)    app.use("/api/admin",       adminRoutes);
if (trackRoute)     app.use("/api/track",      trackRoute);       // public — no auth
if (analyticsRoute) app.use("/api/analytics",   analyticsRoute);   // admin JWT required

// ── Health / DB test ───────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.send("Backend is running"));

app.get("/test-db", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error("[server] DB error:", err);
    res.status(500).send("DB error");
  }
});

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✓ Server running at http://localhost:${PORT}`);
});