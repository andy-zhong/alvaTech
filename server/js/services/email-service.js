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

  // 🔥 split multiple emails
  const recipients = process.env.SALES_EMAIL.split(",");

  await transporter.sendMail({
    from: `"Alva Technology" <${process.env.EMAIL_USER}>`,
    to: recipients, // 🔥 flera mottagare
    subject: "New B2B Request",
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