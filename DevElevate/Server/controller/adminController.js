// controller/adminController.js
import bcrypt from "bcryptjs";
import User from "../model/UserModel.js";   
import AdminLog from "../model/AdminLog.js"    



// ✅ Create an admin log entry
export const createAdminLog = async (req, res) => {
  try {
    const { action, details } = req.body;

    if (!action || !details) {
      return res.status(400).json({ message: "Action and details are required" });
    }

    const log = new Admin({
      action,
      details,
      performedBy: req.user.id, // comes from authenticateToken middleware
    });

    await log.save();
    res.status(201).json({ message: "Log created successfully", log });
  } catch (error) {
    res.status(500).json({ message: "Error creating log", error: error.message });
  }
};

// ✅ Get all admin logs
export const getAdminLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find()
      .populate("performedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs", error: error.message });
  }
};

// ✅ Add new user (only admin can do this)
export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error: error.message });
  }
};

// ✅ Get all registered users
export const getAllUserRegister = async (req, res) => {
  try {
    // Fetch all users but exclude password
    const users = await User.find().select("-password");

    // Count by role
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      totalUsers,
      totalAdmins,
      totalRegistered: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};


// ✅ Delete user by ID (matches /delete-user/:id route)
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;  // ✅ now uses params, not body

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};



