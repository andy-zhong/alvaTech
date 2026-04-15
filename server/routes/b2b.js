const express = require("express");
const router = express.Router();

const { sendB2BMail } = require("../js/services/email-service.js");

router.post("/", async (req, res) => {
  try {
    await sendB2BMail(req.body);
    res.status(200).json({ success: true });
  } catch (err) {
  console.error("B2B ERROR:", err)
  res.json({ success: false, error: err.message })
}
});

module.exports = router;
