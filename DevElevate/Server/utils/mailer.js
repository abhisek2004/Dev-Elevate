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

export default sendWelcomeEmail;
