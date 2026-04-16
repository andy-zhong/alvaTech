/**
 * db/seed.js  —  Create the initial admin user.
 *
 * Usage:
 *   ADMIN_EMAIL=you@company.com ADMIN_PASSWORD=secret node db/seed.js
 *
 * Or set these in your .env and run:
 *   node db/seed.js
 */
require("dotenv").config();
const bcrypt = require("bcrypt");
const pool   = require("./connection");

async function seed() {
  const email    = process.env.ADMIN_EMAIL    || "admin@alvatechnology.com";
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const name     = process.env.ADMIN_NAME     || "Alva Admin";

  if (password === "changeme123") {
    console.warn(
      "⚠  WARNING: Using default password. Set ADMIN_PASSWORD in your .env before running in production."
    );
  }

  const hash = await bcrypt.hash(password, 12);

  await pool.query(
    `INSERT INTO admin_users (email, password_hash, name)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO UPDATE SET password_hash = $2, name = $3`,
    [email, hash, name]
  );

  console.log(`✓  Admin user ready: ${email}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});