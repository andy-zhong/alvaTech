/**
 * services/email.js
 * Transactional emails using nodemailer + any SMTP provider.
 * All calls are non-blocking — a misconfigured SMTP must never fail an order.
 */
const nodemailer = require("nodemailer");

// ── Transporter ──────────────────────────────────────────────────────────────

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

function fmt(amount) {
  return Number(amount).toLocaleString("sv-SE") + " SEK";
}

function itemsTableHTML(items) {
  const rows = items.map((item) => {
    const configLine = item.is_configurable
      ? `<br><span style="font-size:12px;color:#888;">
           ${item.battery_count} battery module${item.battery_count === 1 ? "" : "s"}
           &nbsp;·&nbsp; ${item.capacity_kwh} kWh
         </span>`
      : "";

    return `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;line-height:1.5;">
          ${item.product_name}${configLine}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:center;">
          ${item.quantity}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:right;">
          ${fmt(item.unit_price)}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600;">
          ${fmt(item.line_total)}
        </td>
      </tr>`;
  }).join("");

  return `
    <table style="width:100%;border-collapse:collapse;font-size:14px;margin:16px 0;">
      <thead>
        <tr>
          <th style="text-align:left;padding:6px 0 10px;font-size:11px;color:#aaa;font-weight:600;letter-spacing:.06em;border-bottom:2px solid #eee;">PRODUCT</th>
          <th style="text-align:center;padding:6px 0 10px;font-size:11px;color:#aaa;font-weight:600;letter-spacing:.06em;border-bottom:2px solid #eee;">QTY</th>
          <th style="text-align:right;padding:6px 0 10px;font-size:11px;color:#aaa;font-weight:600;letter-spacing:.06em;border-bottom:2px solid #eee;">UNIT</th>
          <th style="text-align:right;padding:6px 0 10px;font-size:11px;color:#aaa;font-weight:600;letter-spacing:.06em;border-bottom:2px solid #eee;">TOTAL</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function shell({ title, preheader, body }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;">
  <!-- Preheader (hidden) -->
  <span style="display:none;max-height:0;overflow:hidden;">${preheader}</span>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="580" cellpadding="0" cellspacing="0"
               style="max-width:580px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06);">

          <!-- Logo bar -->
          <tr>
            <td style="background:#071513;padding:26px 36px;">
              <p style="margin:0;color:#fff;font-size:20px;font-weight:700;letter-spacing:.06em;">ALVA TECHNOLOGY</p>
              <p style="margin:5px 0 0;color:rgba(255,255,255,.45);font-size:12px;">${title}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px 36px;font-size:15px;line-height:1.65;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;border-top:1px solid #eee;padding:18px 36px;">
              <p style="margin:0;font-size:12px;color:#bbb;line-height:1.6;">
                Alva Technology &nbsp;·&nbsp; www.alvatechnology.com<br>
                This is an automated message — please do not reply directly.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Customer confirmation ─────────────────────────────────────────────────────

async function sendCustomerOrderConfirmation(order, items) {
  const body = `
    <p>Hi ${order.first_name},</p>
    <p>
      Thank you for your order. We have received your request and will be in touch
      shortly to confirm details and arrange delivery.
    </p>

    <!-- Order number badge -->
    <div style="background:#f7f9f7;border:1px solid #e4ebe4;border-radius:8px;
                padding:18px 22px;margin:24px 0;">
      <p style="margin:0 0 3px;font-size:11px;color:#aaa;font-weight:600;letter-spacing:.06em;">ORDER NUMBER</p>
      <p style="margin:0;font-size:24px;font-weight:700;color:#071513;letter-spacing:.02em;">
        ${order.order_number}
      </p>
    </div>

    <h3 style="font-size:14px;font-weight:600;color:#555;margin:28px 0 4px;
               text-transform:uppercase;letter-spacing:.05em;">Order Summary</h3>
    ${itemsTableHTML(items)}

    <!-- Totals -->
    <table style="width:100%;font-size:14px;margin-top:4px;">
      <tr>
        <td style="text-align:right;padding:5px 0;color:#888;">Subtotal</td>
        <td style="text-align:right;padding:5px 0;width:130px;">${fmt(order.subtotal)}</td>
      </tr>
      <tr>
        <td style="text-align:right;padding:5px 0;color:#888;">Shipping</td>
        <td style="text-align:right;padding:5px 0;color:#888;font-style:italic;">Calculated separately</td>
      </tr>
      <tr style="border-top:2px solid #eee;">
        <td style="text-align:right;padding:10px 0 4px;font-size:16px;font-weight:700;">Total</td>
        <td style="text-align:right;padding:10px 0 4px;font-size:18px;font-weight:700;">${fmt(order.total)}</td>
      </tr>
    </table>

    <h3 style="font-size:14px;font-weight:600;color:#555;margin:28px 0 8px;
               text-transform:uppercase;letter-spacing:.05em;">Delivery Address</h3>
    <p style="margin:0;line-height:1.8;">
      ${order.first_name} ${order.last_name}<br>
      ${order.company ? `${order.company}<br>` : ""}
      ${order.street}<br>
      ${order.postal_code} ${order.city}<br>
      ${order.country}
    </p>

    ${order.notes ? `
      <h3 style="font-size:14px;font-weight:600;color:#555;margin:28px 0 8px;
                 text-transform:uppercase;letter-spacing:.05em;">Your Note</h3>
      <p style="margin:0;color:#555;">${order.notes}</p>
    ` : ""}

    <p style="margin-top:32px;">
      Questions? Contact us at
      <a href="mailto:${process.env.COMPANY_EMAIL}" style="color:#071513;">
        ${process.env.COMPANY_EMAIL}
      </a>
    </p>
    <p style="margin-top:8px;">
      Best regards,<br>
      <strong>Alva Technology</strong>
    </p>`;

  return transporter.sendMail({
    from:    `"Alva Technology" <${process.env.SMTP_USER}>`,
    to:      order.email,
    subject: `Order Confirmation — ${order.order_number}`,
    html:    shell({
      title:     "Order Confirmation",
      preheader: `Your order ${order.order_number} has been received.`,
      body,
    }),
  });
}

// ── Admin notification ────────────────────────────────────────────────────────

async function sendAdminOrderNotification(order, items) {
  const adminUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/views/admin/order.html?id=${order.id}`;

  const body = `
    <p><strong>New order received.</strong></p>

    <div style="background:#f0f7f4;border:1px solid #cce5d8;border-radius:8px;
                padding:18px 22px;margin:20px 0;">
      <p style="margin:0 0 3px;font-size:11px;color:#aaa;font-weight:600;letter-spacing:.06em;">ORDER NUMBER</p>
      <p style="margin:0;font-size:24px;font-weight:700;letter-spacing:.02em;">${order.order_number}</p>
    </div>

    <h3 style="font-size:13px;font-weight:600;color:#555;margin:24px 0 8px;
               text-transform:uppercase;letter-spacing:.05em;">Customer</h3>
    <table style="border-collapse:collapse;font-size:14px;width:100%;">
      <tr><td style="padding:4px 0;color:#999;width:130px;">Name</td>
          <td style="padding:4px 0;">${order.first_name} ${order.last_name}</td></tr>
      <tr><td style="padding:4px 0;color:#999;">Email</td>
          <td style="padding:4px 0;"><a href="mailto:${order.email}" style="color:#071513;">${order.email}</a></td></tr>
      <tr><td style="padding:4px 0;color:#999;">Phone</td>
          <td style="padding:4px 0;">${order.phone}</td></tr>
      ${order.company ? `<tr><td style="padding:4px 0;color:#999;">Company</td><td style="padding:4px 0;">${order.company}</td></tr>` : ""}
      ${order.org_number ? `<tr><td style="padding:4px 0;color:#999;">Org nr</td><td style="padding:4px 0;">${order.org_number}</td></tr>` : ""}
    </table>

    <h3 style="font-size:13px;font-weight:600;color:#555;margin:24px 0 8px;
               text-transform:uppercase;letter-spacing:.05em;">Delivery Address</h3>
    <p style="margin:0;line-height:1.8;">
      ${order.street}<br>${order.postal_code} ${order.city}<br>${order.country}
    </p>

    ${order.notes ? `
      <h3 style="font-size:13px;font-weight:600;color:#555;margin:24px 0 8px;
                 text-transform:uppercase;letter-spacing:.05em;">Customer Note</h3>
      <p style="margin:0;">${order.notes}</p>
    ` : ""}

    <h3 style="font-size:13px;font-weight:600;color:#555;margin:24px 0 8px;
               text-transform:uppercase;letter-spacing:.05em;">Items Ordered</h3>
    ${itemsTableHTML(items)}

    <table style="width:100%;font-size:15px;margin-top:4px;">
      <tr style="border-top:2px solid #eee;">
        <td style="text-align:right;padding:10px 0;font-weight:700;">Total</td>
        <td style="text-align:right;padding:10px 0;font-size:18px;font-weight:700;width:130px;">${fmt(order.total)}</td>
      </tr>
    </table>

    <p style="margin-top:28px;">
      <a href="${adminUrl}"
         style="display:inline-block;background:#071513;color:#fff;padding:12px 24px;
                border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
        Open Order in Admin Panel →
      </a>
    </p>`;

  return transporter.sendMail({
    from:    `"Alva Orders" <${process.env.SMTP_USER}>`,
    to:      process.env.COMPANY_EMAIL,
    subject: `New Order — ${order.order_number} — ${order.first_name} ${order.last_name} — ${fmt(order.total)}`,
    html:    shell({
      title:     "New Order Received",
      preheader: `${order.order_number} from ${order.first_name} ${order.last_name} — ${fmt(order.total)}`,
      body,
    }),
  });
}

module.exports = { sendCustomerOrderConfirmation, sendAdminOrderNotification };