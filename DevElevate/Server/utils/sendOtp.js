import nodemailer from "nodemailer";
import crypto from "crypto";

const sendOtpToEmail = async (email) => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"DevElevate 🔐" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your DevElevate OTP Code",
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ OTP sent to ${email}: ${otp}`);

  return otp;
};

export default sendOtpToEmail;
