// db/connection.js

const { Pool } = require("pg");

// NOTE:
// - Uses environment variables if available (production / deployment)
// - Falls back to local dev values if not set
// - Safe parsing for port

const pool = new Pool({
  user: process.env.DB_USER || "badr",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "alva_db",
  password: process.env.DB_PASSWORD || "",
  port: Number(process.env.DB_PORT) || 5432,
});

module.exports = pool;