import VisitingWebsite from "../model/VisitingWebsite.js";
import User from "../model/UserModel.js";
import Feedback from "../model/Feedback.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import moment from "moment";
dotenv.config();

// REGISTER NEW USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(
        `[REGISTER] Failed: User with email "${email}" already exists`
      );
      return res
        .status(400)
        .json({ message: "User already exists. Please login instead." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, role, password: hashedPassword });
    await newUser.save();

    console.log(`[REGISTER] Success: Registered user "${newUser.email}"`);
    return res
      .status(201)
      .json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error(`[REGISTER] Error: ${error.message}`);
    return res
      .status(500)
      .json({
        message: "Registration failed. Please try again.",
        error: error.message,
      });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.warn(`[LOGIN] Failed: No user found with email "${email}"`);
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn(`[LOGIN] Failed: Incorrect password for "${email}"`);
      return res.status(401).json({ message: "Invalid email or password." });
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

    console.log(`[LOGIN] Success: User logged in with email "${email}"`);
  } catch (error) {
    console.error(`[LOGIN] Error: ${error.message}`);
    return res
      .status(500)
      .json({
        message: "Login failed. Please try again.",
        error: error.message,
      });
  }
};

// GOOGLE LOGIN USER
export const googleUser = async (req, res) => {
  try {

    console.log("[GOOGLE LOGIN] Request received:", req.body);

    const { name, email, role } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, role, password: "google-oauth" });
      await user.save();
      console.log(`[GOOGLE LOGIN] Created new Google user: "${email}"`);
    } else {
      console.log(`[GOOGLE LOGIN] Existing Google user found: "${email}"`);
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

    console.log(`[GOOGLE LOGIN] Success: User logged in with email "${email}"`);
  } catch (error) {
    console.error(`[GOOGLE LOGIN] Error: ${error.message}`);
    return res
      .status(500)
      .json({
        message: "Google login failed. Please try again.",
        error: error.message,
      });
  }
};

// LOGOUT USER
export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.warn(
        "[LOGOUT] Attempted logout but user was already logged out."
      );
      return res.status(401).json({ message: "User already logged out." });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    console.log("[LOGOUT] Success: User logged out.");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(`[LOGOUT] Error: ${error.message}`);
    return res
      .status(500)
      .json({
        message: "Logout failed. Please try again.",
        error: error.message,
      });
  }
};

// TRACK CURRENT STREAK OF DAILY VISITS
export const currentStreak = async (req, res) => {
  try {

    console.log("[STREAK] Checking streak for user:", req.user);
    const userId = req.user._id.toString();   
    console.log(userId);

    const user = await User.findById(userId).populate("dayStreak");
    if (!user) {
      console.warn(`[STREAK] User not found: ID "${userId}"`);
      return res.status(404).json({ message: "User not found" });
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

    console.log(
      `[STREAK] Updated streak for user "${user.email}". Current: ${currentStreak}, Max: ${maxStreak}`
    );
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
    console.error(`[STREAK] Error: ${error.message}`);
    return res
      .status(500)
      .json({
        message: "Failed to fetch streak data. Please try again.",
        error: error.message,
      });
  }
};

// HANDLE USER FEEDBACK
export const feedback = async (req, res) => {
  try {
    const { message } = req.body;
    const { userId } = req.user;

    const newFeedback = await Feedback.create({ message, userId });
    console.log(`[FEEDBACK] Received feedback from user ID "${userId}"`);
    return res.status(200).json({ newFeedback });
  } catch (error) {
    console.error(`[FEEDBACK] Error: ${error.message}`);
    return res
      .status(500)
      .json({
        message: "Failed to submit feedback. Please try again.",
        error: error.message,
      });
  }
};
