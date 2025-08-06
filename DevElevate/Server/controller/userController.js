import VisitingWebsite from "../model/VisitingWebsite.js";
import User from "../model/UserModel.js";
import Feedback from "../model/Feedback.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import moment from "moment";
import sendWelcomeEmail from "../utils/mailer.js";
import generateWelcomeEmail from "../utils/welcomeTemplate.js";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    const html = generateWelcomeEmail(newUser.name);
    // await sendWelcomeEmail(newUser.email, html); // Uncomment in production

    await newUser.save();

    console.log(`✅ New user registered: ${newUser.email}`);
    res.status(201).json({
      message: "User registered successfully",
      newUser,
      send: "Mail sent successfully",
    });
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found. Please register." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });

    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES = "3d";
    const payLode = { userId: user._id };
    const token = jwt.sign(payLode, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    console.log(`✅ Login successful for user: ${user.email}`);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        userId: user._id,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const googleUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    let user = await User.findOne({ email });
    console.log(
      "🔍 Checking if Google user exists:",
      user?.email || "Not found"
    );

    if (!user) {
      user = new User({
        name,
        email,
        role,
        password: "google-oauth",
      });
      await user.save();
      console.log("✅ New Google user created:", user.email);
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES = "3d";
    const payLode = { userId: user._id };
    const token = jwt.sign(payLode, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Google login successful",
        userId: user._id,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

    console.log("✅ Google login response sent for:", user.email);
  } catch (error) {
    console.error("❌ Google login error:", error.message);
    res
      .status(500)
      .json({ message: "Google login failed", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "User already logged out." });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    console.log("✅ Logout successful");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("❌ Logout error:", error.message);
    return res
      .status(500)
      .json({ message: "Logout failed", error: error.message });
  }
};

export const currentStreak = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const user = await User.findById(userId).populate("dayStreak");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const today = moment().startOf("day");
    const alreadyVisited = user.dayStreak.some((visit) =>
      moment(visit.dateOfVisiting).isSame(today, "day")
    );

    if (!alreadyVisited) {
      const visit = await VisitingWebsite.create({
        user: userId,
        dateOfVisiting: Date.now(),
        visit: true,
      });
      user.dayStreak.push(visit._id);
    }

    await user.populate("dayStreak");

    const sortedVisits = user.dayStreak
      .map((v) => moment(v.dateOfVisiting).startOf("day"))
      .sort((a, b) => a - b);

    let currentStreak = 1;
    let maxStreak = 1;
    let startDate = sortedVisits[0];
    let tempStartDate = sortedVisits[0];
    let endDate = sortedVisits[0];

    for (let i = 1; i < sortedVisits.length; i++) {
      const diff = sortedVisits[i].diff(sortedVisits[i - 1], "days");
      if (diff === 1) {
        currentStreak++;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
          startDate = tempStartDate;
          endDate = sortedVisits[i];
        }
      } else if (diff > 1) {
        currentStreak = 1;
        tempStartDate = sortedVisits[i];
      }
    }

    user.currentStreak = currentStreak;
    user.longestStreak = Math.max(user.longestStreak, maxStreak);
    user.streakStartDate = startDate;
    user.streakEndDate = endDate;
    await user.save();

    console.log(`📅 Streak updated for ${user.name}`);
    return res.status(200).json({
      message: `✅ Welcome back, ${user.name}`,
      currentStreakData: {
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        totalDays: user.dayStreak.length,
        streakStartDate: user.streakStartDate,
        streakEndDate: user.streakEndDate,
        dayStreak: user.dayStreak,
      },
    });
  } catch (error) {
    console.error("❌ Error calculating streak:", error.message);
    return res
      .status(500)
      .json({ message: "Streak calculation failed", error: error.message });
  }
};

export const feedback = async (req, res) => {
  try {
    const { message } = req.body;
    const { userId } = req.user;

    const newFeedback = await Feedback.create({ message, userId });

    console.log(`📝 Feedback received from user: ${userId}`);
    return res.status(200).json({
      message: "Feedback submitted successfully",
      newFeedback,
    });
  } catch (error) {
    console.error("❌ Feedback submission error:", error.message);
    res
      .status(500)
      .json({ message: "Failed to submit feedback", error: error.message });
  }
};
