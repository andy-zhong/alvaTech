const express = require("express");
const router = express.Router();

const { sendB2BMail } = require("../js/services/email-service.js");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value) {
  return String(value ?? "").trim();
}

function validate(body) {
  const data = {
    company: clean(body.company),
    contact: clean(body.contact),
    email: clean(body.email),
    phone: clean(body.phone),
    message: clean(body.message),
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
  const tooLong = data.company.length > 200 || data.contact.length > 200 || data.email.length > 200 || data.phone.length > 100 || data.message.length > 4000;
  if (tooLong) {
    return { valid: false, status: 400, error: "One or more fields are too long. Please shorten the request before sending it.", fields: data.message.length > 4000 ? ["message"] : [], data };
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
