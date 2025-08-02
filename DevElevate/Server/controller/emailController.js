import nodemailer from "nodemailer";
import EmailLog from "../model/EmailLog.js";
import User from "../model/UserModel.js";
import dotenv from "dotenv";

export const sendNewsletter = async (req, res) => {
  try {
    const { subject, content, targetGroup } = req.body;
    const senderId = req.user._id;

    if (!subject || !content) {
      console.error("❌ ERROR: Both subject and content are required in the request body.");
      return res.status(400).json({ success: false, message: "Request body is incomplete. Both `subject` and `content` are required." });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("❌ ERROR: Email credentials (EMAIL_USER or EMAIL_PASS) not found in .env file.");
      return res.status(500).json({ success: false, message: "Server configuration error: Email credentials missing." });
    }
    let userFilter = {};
    if (targetGroup === 'newsletter_subscribers') {
        userFilter = { isSubscribed: true };
    } else if (targetGroup === 'admin_users') { 
        userFilter = { role: 'admin' };
    } else {
        userFilter = {};
    }

    const users = await User.find(userFilter, "email");
    const recipients = users.map(user => user.email);

    if (recipients.length === 0) {
      console.error(" No recipients found for the selected group. Email not sent.");
      return res.status(400).json({ success: false, message: "No recipients found for the selected group." });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: emailUser,
      to: recipients,
      subject,
      html: content,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Newsletter sent successfully:", info.messageId);

    const log = new EmailLog({
      subject,
      content,
      recipients,
      sentBy: senderId,
    });

    await log.save();

    res.status(200).json({ success: true, message: "Newsletter sent!" });
  } catch (error) {
    console.error("NODEMAILER FAILED:", error.message, "Full Error:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};

export const getEmailLogs = async (req, res) => {
  try {
    const logs = await EmailLog.find().populate("sentBy", "name email").sort({ sentAt: -1 });
    res.status(200).json({ success: true, logs });
  } catch (error) {
    console.error("Error fetching logs", error);
    res.status(500).json({ success: false, message: "Failed to fetch logs" });
  }
};
