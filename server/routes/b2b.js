const express = require("express");
const router = express.Router();

const { sendB2BMail } = require("../js/services/email-service.js");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max = 4000) {
  return String(value ?? "").trim().slice(0, max);
}

function validate(body) {
  const data = {
    company: clean(body.company, 200),
    contact: clean(body.contact, 200),
    email: clean(body.email, 200),
    phone: clean(body.phone, 100),
    message: clean(body.message, 4000),
  };
  const requiredFields = ["contact", "email", "phone", "message"];
  const missing = requiredFields
    .filter((key) => !data[key]);

  if (missing.length) {
    return {
      valid: false,
      status: 400,
      error: "Please complete all required contact fields before sending your request.",
      fields: missing,
      data,
    };
  }

  if (!EMAIL_RE.test(data.email)) {
    return {
      valid: false,
      status: 400,
      error: "Please enter a valid email address.",
      fields: ["email"],
      data,
    };
  }

  return { valid: true, data };
}

router.post("/", async (req, res) => {
  const validation = validate(req.body || {});

  if (!validation.valid) {
    return res.status(validation.status).json({
      success: false,
      error: validation.error,
      fields: validation.fields,
    });
  }

  try {
    await sendB2BMail(validation.data);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("B2B ERROR:", err);
    res.status(500).json({
      success: false,
      error: "We could not send the request right now. Please try again or contact Alva directly.",
    });
  }
});

module.exports = router;
