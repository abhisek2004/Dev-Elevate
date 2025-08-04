import VisitingWebsite from "../model/VisitingWebsite.js";
import User from "../model/UserModel.js";
import Feedback from "../model/Feedback.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import moment from "moment";
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

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", newUser });
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
    console.log("jwt secret from login: ", JWT_SECRET)
    // Create JWT token
    const payLode = {
      userId: user._id,
      role: user.role,
    };
    const token = jwt.sign(payLode, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    console.log("token from login: ", token)
    // Set token in cookie
  res.cookie("token", token, {
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
    console.error("jwt verification error: ", error)
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
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "User already logout" });
    }

    res.clearCookie("accessToken", {
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

    // Sort all visits by date
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
        tempStartDate = sortedVisits[i]; // reset tempStart
      }
    }

    user.currentStreak = currentStreak;
    user.longestStreak = Math.max(user.longestStreak, maxStreak);
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

// New function to get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Calculate total modules completed
    const totalModulesCompleted = Object.values(user.learningProgress)
      .reduce((total, track) => total + track.completed, 0);

    res.status(200).json({
      success: true,
      data: {
        totalPoints: user.totalPoints || 0,
        currentStreak: user.currentStreak || 0,
        completedGoals: user.completedGoals || 0,
        learningProgress: user.learningProgress || {
          dsa: { completed: 0, total: 12 },
          java: { completed: 0, total: 10 },
          mern: { completed: 0, total: 15 },
          aiml: { completed: 0, total: 18 }
        },
        totalModulesCompleted
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to fetch dashboard stats", 
      error: error.message 
    });
  }
};

// Function to update user points
export const updateUserPoints = async (req, res) => {
  try {
    const { userId } = req.user;
    const { points } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    user.totalPoints = (user.totalPoints || 0) + points;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Points updated successfully",
      data: { totalPoints: user.totalPoints }
    });
  } catch (error) {
    console.error('Update points error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update points", 
      error: error.message 
    });
  }
};

// Function to update learning progress
export const updateLearningProgress = async (req, res) => {
  try {
    const { userId } = req.user;
    const { track, moduleId, completed } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Initialize learningProgress if it doesn't exist
    if (!user.learningProgress) {
      user.learningProgress = {
        dsa: { completed: 0, total: 12 },
        java: { completed: 0, total: 10 },
        mern: { completed: 0, total: 15 },
        aiml: { completed: 0, total: 18 }
      };
    }

    // Update the specific track
    if (user.learningProgress[track]) {
      if (completed) {
        user.learningProgress[track].completed += 1;
      } else {
        user.learningProgress[track].completed = Math.max(0, user.learningProgress[track].completed - 1);
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Learning progress updated successfully",
      data: { learningProgress: user.learningProgress }
    });
  } catch (error) {
    console.error('Update learning progress error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update learning progress", 
      error: error.message 
    });
  }
};

// Function to update completed goals
export const updateCompletedGoals = async (req, res) => {
  try {
    const { userId } = req.user;
    const { completed } = req.body; // true to add, false to remove

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    if (completed) {
      user.completedGoals = (user.completedGoals || 0) + 1;
    } else {
      user.completedGoals = Math.max(0, (user.completedGoals || 0) - 1);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Completed goals updated successfully",
      data: { completedGoals: user.completedGoals }
    });
  } catch (error) {
    console.error('Update completed goals error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to update completed goals", 
      error: error.message 
    });
  }
};

// Function to complete a module and earn points
export const completeModule = async (req, res) => {
  try {
    const { userId } = req.user;
    const { track, moduleId, pointsEarned = 50 } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Update learning progress
    if (!user.learningProgress) {
      user.learningProgress = {
        dsa: { completed: 0, total: 12 },
        java: { completed: 0, total: 10 },
        mern: { completed: 0, total: 15 },
        aiml: { completed: 0, total: 18 }
      };
    }

    if (user.learningProgress[track]) {
      user.learningProgress[track].completed += 1;
    }

    // Update points
    user.totalPoints = (user.totalPoints || 0) + pointsEarned;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Module completed successfully",
      data: { 
        totalPoints: user.totalPoints,
        learningProgress: user.learningProgress
      }
    });
  } catch (error) {
    console.error('Complete module error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to complete module", 
      error: error.message 
    });
  }
};
