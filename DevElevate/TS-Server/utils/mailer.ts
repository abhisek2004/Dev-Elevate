import nodemailer from "nodemailer";
import { MAIL_PASS, MAIL_USER } from "../config/env.config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,

    
  },
});

const sendWelcomeEmail = async (to:string, htmlContent:string) => {
  const mailOptions = {
    from: `"DevElevate Team" <${MAIL_USER}>`,
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

export default sendWelcomeEmail;
