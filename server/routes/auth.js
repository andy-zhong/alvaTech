const express = require("express");
const router = express.Router();
const pool = require("../db/connection");
const bcrypt = require("bcrypt");


// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [first_name, last_name, email, hashedPassword]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(400).send("User not found");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).send("Wrong password");
    }

    res.json({
      message: "Login successful",
      user: user
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Login error");
  }
});

module.exports = router;