/**
 * routes/orders.js
 * POST /api/orders  —  Create a new order from the checkout form.
 */
const express  = require("express");
const router   = express.Router();
const pool     = require("../db/connection");
const { sendCustomerOrderConfirmation, sendAdminOrderNotification } = require("../services/email");

// ── Helpers ──────────────────────────────────────────────────────────────────

/** ALV-YYYYMMDD-XXXX */
function generateOrderNumber() {
  const d    = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `ALV-${date}-${rand}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBody(b) {
  const errors = {};
  if (!b.firstName?.trim())  errors.firstName  = "Required";
  if (!b.lastName?.trim())   errors.lastName   = "Required";
  if (!b.email?.trim())      errors.email      = "Required";
  else if (!EMAIL_RE.test(b.email)) errors.email = "Invalid email address";
  if (!b.phone?.trim())      errors.phone      = "Required";
  if (!b.street?.trim())     errors.street     = "Required";
  if (!b.postalCode?.trim()) errors.postalCode = "Required";
  if (!b.city?.trim())       errors.city       = "Required";
  if (!b.country?.trim())    errors.country    = "Required";
  if (!Array.isArray(b.items) || b.items.length === 0) errors.items = "Cart is empty";
  return errors;
}

// ── POST /api/orders ─────────────────────────────────────────────────────────

router.post("/", async (req, res) => {
  const {
    firstName, lastName, email, phone,
    company, orgNumber,
    street, postalCode, city, country,
    notes,
    items,
  } = req.body;

  // Validation
  const errors = validateBody(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Validation failed", fields: errors });
  }

  // Sanitize and price items server-side.
  // NOTE: Unit prices come from the frontend cart snapshot.
  // In a future iteration, verify prices against a server-side product price table.
  const lineItems = items.map((item) => {
    const qty       = Math.max(1, parseInt(item.quantity, 10) || 1);
    const unitPrice = Math.max(0, parseFloat(item.unitPrice) || 0);
    return {
      slug:               String(item.slug    || "").slice(0, 255),
      productName:        String(item.productName || item.slug || "Unknown").slice(0, 255),
      quantity:           qty,
      unitPrice,
      lineTotal:          parseFloat((unitPrice * qty).toFixed(2)),
      isConfigurable:     Boolean(item.isConfigurable),
      batteryCount:       item.batteryCount ? parseInt(item.batteryCount, 10) : null,
      capacityKwh:        item.capacity     ? parseFloat(parseFloat(item.capacity).toFixed(3)) : null,
      configurationLabel: item.isConfigurable
        ? `${item.batteryCount} battery module${item.batteryCount === 1 ? "" : "s"} · ${item.capacity} kWh`
        : null,
    };
  });

  const subtotal    = parseFloat(lineItems.reduce((s, i) => s + i.lineTotal, 0).toFixed(2));
  const total       = subtotal; // shipping is invoiced separately
  const orderNumber = generateOrderNumber();

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Insert order
    const { rows: [order] } = await client.query(
      `INSERT INTO orders (
         order_number, status,
         first_name, last_name, email, phone, company, org_number,
         street, postal_code, city, country,
         subtotal, total, notes
       ) VALUES (
         $1, 'new',
         $2, $3, $4, $5, $6, $7,
         $8, $9, $10, $11,
         $12, $13, $14
       ) RETURNING *`,
      [
        orderNumber,
        firstName.trim(), lastName.trim(), email.trim(), phone.trim(),
        company?.trim() || null, orgNumber?.trim() || null,
        street.trim(), postalCode.trim(), city.trim(), country.trim(),
        subtotal, total,
        notes?.trim() || null,
      ]
    );

    // Insert line items
    for (const item of lineItems) {
      await client.query(
        `INSERT INTO order_items (
           order_id, slug, product_name, quantity,
           unit_price, line_total,
           is_configurable, battery_count, capacity_kwh, configuration_label
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          order.id, item.slug, item.productName, item.quantity,
          item.unitPrice, item.lineTotal,
          item.isConfigurable, item.batteryCount, item.capacityKwh,
          item.configurationLabel,
        ]
      );
    }

    await client.query("COMMIT");

    // Send emails non-blocking — a failed SMTP must never fail the order
    const emailItems = lineItems.map((i) => ({
      product_name:  i.productName,
      quantity:      i.quantity,
      unit_price:    i.unitPrice,
      line_total:    i.lineTotal,
      is_configurable: i.isConfigurable,
      battery_count: i.batteryCount,
      capacity_kwh:  i.capacityKwh,
    }));

    Promise.all([
      sendCustomerOrderConfirmation(order, emailItems),
      sendAdminOrderNotification(order, emailItems),
    ]).catch((err) => console.error("[email] Failed to send order emails:", err.message));

    return res.status(201).json({
      success:     true,
      orderNumber: order.order_number,
      orderId:     order.id,
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[orders] Create order error:", err);
    return res.status(500).json({ error: "Failed to create order. Please try again." });
  } finally {
    client.release();
  }
});

module.exports = router;