require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const b2bRoutes = require("./routes/b2b");
const pool = require("./db/connection");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static frontend
app.use(express.static(path.join(__dirname, "..")));

// API routes
app.use("/auth", authRoutes);
app.use("/api/b2b", b2bRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// DB test
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error("[server] DB error:", err);
    res.status(500).send("DB error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
