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
    subject: "🔐 Email Verification DevElevate",
    html: `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🔐 Email Verification</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
        
      
          <p style="font-size: 16px; margin-bottom: 25px;">
            Welcome to our platform! To complete your registration, please verify your email address using the OTP code below:
          </p>
          
          <div style="background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 25px; text-align: center; margin: 25px 0;">
            <h2 style="font-size: 36px; letter-spacing: 8px; margin: 0; color: #667eea; font-weight: bold;">${otp}</h2>
            <p style="margin: 10px 0 0 0; color: #6c757d; font-size: 14px;">This code will expire in ${minutes} minutes</p>
          </div>
          
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>⚠️ Security Note:</strong> Never share this OTP with anyone. Our team will never ask for your OTP via phone or email.
            </p>
          </div>
          
          <p style="color: #6c757d; font-size: 14px; margin-top: 25px;">
            If you didn't request this verification, please ignore this email or contact our support team.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
          <p>© 2025 Dev Elevate. All rights reserved.</p>
        </div>
      </body>
      </html>
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
