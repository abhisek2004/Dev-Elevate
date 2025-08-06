import AdminLog from "../model/AdminLog.js";
import User from "../model/UserModel.js";

// Create a new admin log entry
export const createAdminLog = async (req, res) => {
  try {
    const { actionType, userId, userRole, message, additionalData } = req.body;

    if (!actionType || !userId || !userRole || !message) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: 'actionType', 'userId', 'userRole', and 'message'. Please ensure all required fields are provided.",
      });
    }

    const ipAddress =
      req.ip || req.connection?.remoteAddress || req.socket?.remoteAddress;
    const userAgent = req.get("User-Agent");

    const logEntry = new AdminLog({
      actionType,
      userId,
      userRole,
      message,
      ipAddress,
      userAgent,
      additionalData,
    });

    await logEntry.save();

    res.status(201).json({
      success: true,
      message: "Admin log entry created successfully.",
      log: logEntry,
    });
  } catch (error) {
    console.error(
      `[AdminLog Error] Failed to create admin log: ${error.message}`
    );
    res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while creating the admin log entry. Please try again.",
      error: error.message,
    });
  }
};

// Get admin logs with filtering and pagination
export const getAdminLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      actionType,
      userId,
      userRole,
      dateFrom,
      dateTo,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const filter = {};

    if (actionType && actionType !== "all") {
      filter.actionType = actionType;
    }

    if (userId) {
      filter.userId = userId;
    }

    if (userRole && userRole !== "all") {
      filter.userRole = userRole;
    }

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) {
        filter.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = endDate;
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const [logs, totalCount] = await Promise.all([
      AdminLog.find(filter).sort(sort).skip(skip).limit(parseInt(limit)).lean(),
      AdminLog.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    const transformedLogs = logs.map((log) => ({
      _id: log._id,
      actionType: log.actionType,
      userId: log.userId,
      userRole: log.userRole,
      message: log.message,
      timestamp: log.createdAt,
      ipAddress: log.ipAddress,
      userAgent: log.userAgent,
      additionalData: log.additionalData,
    }));

    res.status(200).json({
      success: true,
      logs: transformedLogs,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: parseInt(limit),
      },
      filters: {
        actionType,
        userId,
        userRole,
        dateFrom,
        dateTo,
      },
    });
  } catch (error) {
    console.error(`[AdminLog Error] Failed to fetch logs: ${error.message}`);
    res.status(500).json({
      success: false,
      message:
        "Unable to fetch admin logs. Please check your filters or try again later.",
      error: error.message,
    });
  }
};

// Get all users in the database
export const getAllUserRegister = async (req, res) => {
  try {
    console.log("[User Fetch] Retrieving all registered users...");

    const users = await User.find().sort({ createdAt: -1 });
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    res.status(200).json({
      success: true,
      message: "Successfully fetched all registered users.",
      totalUsers,
      users,
      totalAdmins,
    });
  } catch (error) {
    console.error(
      `[User Fetch Error] Failed to retrieve users: ${error.message}`
    );
    res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching registered users. Please try again later.",
      error: error.message,
    });
  }
};
