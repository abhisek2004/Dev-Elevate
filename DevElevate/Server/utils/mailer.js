import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,

    
  },
});

const sendWelcomeEmail = async (to, htmlContent) => {
  const mailOptions = {
    from: `"DevElevate Team" <${process.env.MAIL_USER}>`,
    to,
    subject: "🎉 Welcome to DevElevate!",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendOtpEmail = async (to, otp, minutes = 5) => {
  const mailOptions = {
    from: `"DevElevate Team" <${process.env.MAIL_USER}>`,
    to,
    subject: "Your DevElevate OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; color: #111">
        <h2>DevElevate Verification</h2>
        <p>Your OTP for registration is:</p>
        <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otp}</div>
        <p>This code is valid for ${minutes} minutes.</p>
        <p>If you did not request this, you can ignore this email.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent to:", to);
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

export default sendWelcomeEmail;
