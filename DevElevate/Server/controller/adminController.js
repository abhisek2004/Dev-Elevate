// controller/adminController.js
import User from "../models/User.js";  // adjust the path if your User model is elsewhere
import AdminLog from "../models/AdminLog.js"; // create this model if not already done

// ✅ Create an admin log entry
export const createAdminLog = async (req, res) => {
  try {
    const { action, details } = req.body;
    const log = new AdminLog({
      action,
      details,
      performedBy: req.user.id, // comes from authenticateToken
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
    const logs = await AdminLog.find().populate("performedBy", "name email");
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

    const newUser = new User({
      name,
      email,
      password, // make sure you hash in User model pre-save hook
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
    const users = await User.find().select("-password"); // hide password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// ✅ Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};


