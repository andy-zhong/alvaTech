const { Pool } = require("pg");

const pool = new Pool({
  user: "badr",
  host: "localhost",
  database: "alva_db",
  password: "",
  port: 5432,
});

module.exports = pool;