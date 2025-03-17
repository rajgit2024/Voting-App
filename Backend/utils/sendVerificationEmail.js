const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const sendVerificationEmail = (user) => {
  const payload = {
    email: user.email,
    id: user.id,
    role: user.role,
  };

  // Generate Token
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://voting-app-11.onrender.com" // Your Render backend URL
      : "http://localhost:5000";

  const verifyLink = `${BASE_URL}/api/user/verify-email/${token}`;

  // Create Transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  // Send Email
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: "Email Verification - Voting App",
    html: `<h2>Email Verification</h2>
               <p>Please verify your email by clicking the link below:</p>
               <a href='${verifyLink}'>Verify Your Email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

module.exports = sendVerificationEmail;
