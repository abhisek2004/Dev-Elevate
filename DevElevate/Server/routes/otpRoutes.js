// Server/routes/otpRoutes.js
import express from "express";
import sendOtpToEmail from "../utils/sendOtp.js"; // Assuming sendOtpToEmail is exported as default

const router = express.Router();

// Temporary in-memory store (can replace with DB)
const otpStore = {};

// 📩 Route: Send OTP to Email
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const otp = await sendOtpToEmail(email);
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore[email] = { otp, expiresAt };

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// ✅ Route: Verify OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  const otpData = otpStore[email];

  if (!otpData) {
    return res.status(400).json({ error: "No OTP found for this email" });
  }

  const { otp: storedOtp, expiresAt } = otpData;

  if (Date.now() > expiresAt) {
    return res.status(400).json({ error: "OTP has expired" });
  }

  if (otp !== storedOtp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  delete otpStore[email]; // Clean up
  res.json({ message: "OTP verified successfully" });
});

export default router;
