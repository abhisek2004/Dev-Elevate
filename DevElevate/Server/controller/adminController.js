// controller/adminController.js
import bcrypt from "bcryptjs";
import User from "../model/UserModel.js";
import AdminLog from "../model/AdminLog.js";

// ================== Admin Log Controllers ==================

// Create an admin log entry
export const createAdminLog = async (req, res) => {
  try {
    const { action, details } = req.body;

    if (!action || !details) {
      return res
        .status(400)
        .json({ message: "Action and details are required" });
    }

    const log = new AdminLog({
      actionType: action,
      details,
      performedBy: req.user.id,
    });

    await log.save();
    return res.status(201).json({ message: "Log created successfully", log });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating log",
      error: error.message,
    });
  }
};

// Get all admin logs with pagination
export const getAdminLogs = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const [totalCount, logs] = await Promise.all([
      AdminLog.countDocuments(),
      AdminLog.find()
        .populate("performedBy", "name email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const logsWithTimestamps = logs.map((log) => ({
      ...log,
      createdAtTimestamp: new Date(log.createdAt).getTime(),
      updatedAtTimestamp: new Date(log.updatedAt).getTime(),
    }));

    return res.status(200).json({
      success: true,
      log: logsWithTimestamps,
      pagination: {
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching logs",
      error: error.message,
    });
  }
};

// ================== User Management Controllers ==================

// Add new user (only admin can do this)
export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding user",
      error: error.message,
    });
  }
};

// Get all registered users with role counts
export const getAllUserRegister = async (req, res) => {
  try {
    const [users, totalUsers, totalAdmins] = await Promise.all([
      User.find().select("-password").sort({ createdAt: -1 }),
      User.countDocuments({ role: "user" }),
      User.countDocuments({ role: "admin" }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      totalUsers,
      totalAdmins,
      totalRegistered: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};
