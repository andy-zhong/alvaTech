/**
 * routes/quote.js
 * POST /api/quote  —  Floating quote widget submission.
 *
 * Mirrors the B2B route pattern exactly:
 * validates input → sends email to SALES_EMAIL → returns { success: true }.
 *
 * Fields received from the widget:
 *   needs   (required) — description of what the customer needs
 *   name    (optional)
 *   email   (optional)
 *   phone   (required)
 */

const express    = require("express");
const router     = express.Router();
const nodemailer = require("nodemailer");

// ── Transporter ──────────────────────────────────────────────────────────────
// Uses the same SMTP credentials as the rest of the app.

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Resolve recipient list — mirrors how SALES_EMAIL is used in b2b route. */
function getRecipients() {
  return process.env.SALES_EMAIL || process.env.COMPANY_EMAIL || process.env.SMTP_USER;
}

/** Basic sanitise — strip leading/trailing whitespace, limit length. */
function clean(value, max = 2000) {
  return String(value ?? "").trim().slice(0, max);
}

// ── POST /api/quote ──────────────────────────────────────────────────────────

router.post("/", async (req, res) => {
  const needs = clean(req.body.needs);
  const name  = clean(req.body.name,  200);
  const email = clean(req.body.email, 200);
  const phone = clean(req.body.phone, 100);

  // Server-side validation — mirrors b2b route pattern
  if (!needs) {
    return res.status(400).json({ success: false, error: "Needs description is required." });
  }
  if (!phone) {
    return res.status(400).json({ success: false, error: "Phone number is required." });
  }

  // ── Build email ─────────────────────────────────────────────────────────────

  const subject = `New Quote Request${name ? ` from ${name}` : ""}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 16px;">
            <table width="580" style="max-width:580px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06);">

              <!-- Header -->
              <tr>
                <td style="background:#071513;padding:24px 32px;">
                  <p style="margin:0;color:#fff;font-size:18px;font-weight:700;letter-spacing:.06em;">
                    ALVA TECHNOLOGY
                  </p>
                  <p style="margin:5px 0 0;color:rgba(255,255,255,.45);font-size:12px;">
                    New Quote Request
                  </p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:28px 32px;">

                  <!-- Customer needs (the key field) -->
                  <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:.08em;
                             text-transform:uppercase;color:#aaa;">
                    What they need
                  </p>
                  <div style="background:#f7f9f7;border:1px solid #e4ebe4;border-radius:8px;
                               padding:16px 18px;margin-bottom:24px;">
                    <p style="margin:0;font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(needs)}</p>
                  </div>

                  <!-- Contact details -->
                  <p style="margin:0 0 12px;font-size:11px;font-weight:600;letter-spacing:.08em;
                             text-transform:uppercase;color:#aaa;">
                    Contact
                  </p>
                  <table style="width:100%;border-collapse:collapse;font-size:14px;">
                    ${name  ? tableRow("Name",  escapeHtml(name))  : ""}
                    ${phone ? tableRow("Phone", escapeHtml(phone)) : ""}
                    ${email ? tableRow("Email",
                        `<a href="mailto:${escapeHtml(email)}" style="color:#071513;">${escapeHtml(email)}</a>`)
                            : ""}
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f9f9f9;border-top:1px solid #eee;padding:16px 32px;">
                  <p style="margin:0;font-size:12px;color:#bbb;line-height:1.6;">
                    Alva Technology &nbsp;·&nbsp; Automated quote-widget notification
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Plain-text fallback
  const text = [
    `NEW QUOTE REQUEST`,
    ``,
    `What they need:\n${needs}`,
    ``,
    name  ? `Name:  ${name}`  : null,
    phone ? `Phone: ${phone}` : null,
    email ? `Email: ${email}` : null,
  ].filter((line) => line !== null).join("\n");

  // ── Send ────────────────────────────────────────────────────────────────────

  try {
    await transporter.sendMail({
      from:    `"Alva Quote Widget" <${process.env.SMTP_USER}>`,
      to:      getRecipients(),
      replyTo: email || undefined, // clicking Reply goes straight to the customer
      subject,
      html,
      text,
    });

    return res.json({ success: true });

  } catch (err) {
    console.error("[quote] Email send failed:", err.message);
    // Don't expose internal SMTP errors to the client
    return res.status(500).json({ success: false, error: "Failed to send request. Please try again." });
  }
});

// ── Tiny helpers ─────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function tableRow(label, value) {
  return `
    <tr>
      <td style="padding:6px 0;color:#999;width:80px;vertical-align:top;
                 font-size:12px;font-weight:600;text-transform:uppercase;
                 letter-spacing:.06em;">${label}</td>
      <td style="padding:6px 0;color:#1a1a1a;">${value}</td>
    </tr>`;
}

module.exports = router;