import VisitingWebsite from "../model/VisitingWebsite.js";
import User from "../model/UserModel.js";
import Feedback from "../model/Feedback.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import moment from "moment";
// import sendWelcomeEmail from "../utils/mailer.js";
import generateWelcomeEmail from "../utils/welcomeTemplate.js";
dotenv.config();
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    const html = generateWelcomeEmail(newUser.name);

    // await sendWelcomeEmail(newUser.email, html);

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      newUser,
      send: "Mali send successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES = "3d";
    // Create JWT token
    const payLode = {
      userId: user._id,
    };
    const token = jwt.sign(payLode, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    // Set token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // Always true in production (Render is HTTPS)
        sameSite: "None", // ✅ Needed for cross-origin cookies (Vercel ↔ Render)
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })

      .status(200)
      .json({
        message: "Login successful",
        userId: user._id,
        token: token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const googleUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    console.log("User found in DB:", user);

    if (!user) {
      user = new User({
        name,
        email,
        role,
        password: "google-oauth", // Dummy password for Google users because in MongoDB User Schema requires a password
      });
      await user.save();
      console.log("New Google user created:", user);
    }

    // JWT token
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES = "3d";
    const payLode = { userId: user._id };
    const token = jwt.sign(payLode, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    console.log("JWT token generated:", token);

    // Set token in cookie and send response
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      })
      .status(200)
      .json({
        message: "Google login successful",
        userId: user._id,
        token: token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    console.log("Google login response sent.");
  } catch (error) {
    console.error("Google login error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "User already logout" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const currentStreak = async (req, res) => {
  try {
    console.log(req.user);

    const userId = req.user._id.toString();
    console.log(userId);

    const user = await User.findById(userId).populate("dayStreak");

    if (!user) {
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
      .sort((a, b) => a.valueOf() - b.valueOf());

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
    user.longestStreak = Math.max(user.longestStreak || 0, maxStreak);
    user.streakStartDate = startDate;
    user.streakEndDate = endDate;
    await user.save();

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
    return res.status(500).json({ error: error.message });
  }
};


export const feedback = async (req, res) => {
  try {
    const { message } = req.body;
    const { userId } = req.user;

    const newFeedback = await Feedback.create({
      message: message,
      userId: userId,
    });

    return res.status(200).json({
      newFeedback,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// latestNewsController.js
export const latestNews = async (req, res) => {
  try {
    const apiKey = "5197b7b314d04c1080a2092f0496c165"; // You can move this to process.env later
    const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=9&apiKey=${apiKey}`;

    const response = await fetch(url);

    // Check if the response status is not OK (e.g., 401, 403, 404)
    if (!response.ok) {
      const errorText = await response.text(); // Get raw error response
      console.error("News API error:", errorText);
      return res.status(response.status).json({
        message: "Failed to fetch news",
        status: response.status,
        error: errorText,
      });
    }

    // Check if content-type is actually JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const rawText = await response.text();
      console.error("Unexpected response (not JSON):", rawText);
      return res.status(500).json({ message: "Invalid content type received" });
    }

    const data = await response.json();
    console.log(data);
    

    res.json(data);
  } catch (error) {
    console.error("Error fetching latest news:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};