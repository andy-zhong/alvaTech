const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendB2BMail(data) {
  const { company, contact, email, phone, message } = data;
  const recipients = (process.env.SALES_EMAIL || process.env.COMPANY_EMAIL || process.env.EMAIL_USER || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!recipients.length) {
    throw new Error("No sales recipient email is configured.");
  }

  await transporter.sendMail({
    from: `"Alva Technology" <${process.env.EMAIL_USER}>`,
    to: recipients,
    replyTo: email,
    subject: `New Alva inquiry${company ? ` from ${company}` : ""}`,
    text: `
Company: ${company}
Contact person: ${contact}
Email: ${email}
Phone: ${phone}

Message:
${message}
    `,
  });
}

module.exports = {
  sendB2BMail,
};
