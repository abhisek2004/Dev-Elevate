import { Request, Response, NextFunction } from "express";
import { AdminLog } from "../models/adminLog.model";
import { User } from "../models/user.model";

// Create a new admin log entry
export const createAdminLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { actionType, userId, userRole, message, additionalData } = req.body;

    // Validate required fields
    if (!actionType || !userId || !userRole || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: actionType, userId, userRole, message",
      });
    }

    // Get IP address and user agent from request
    const ipAddress =
      req.ip || req.connection.remoteAddress || req.socket.remoteAddress || "";
    const userAgent = req.get("User-Agent") || "";

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
      message: "Log entry created successfully",
      log: logEntry,
    });
  } catch (error: any) {
    console.error("Error creating admin log:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create log entry",
      error: error.message,
    });
  }
};

// Get admin logs with filtering and pagination
export const getAdminLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract and type query params properly
    const {
      page = "1",
      limit = "20",
      actionType,
      userId,
      userRole,
      dateFrom,
      dateTo,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query as {
      page?: string;
      limit?: string;
      actionType?: string;
      userId?: string;
      userRole?: string;
      dateFrom?: string;
      dateTo?: string;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    };

    // Build filter object
    const filter: any = {};

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

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const sort: any = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const [logs, totalCount] = await Promise.all([
      AdminLog.find(filter).sort(sort).skip(skip).limit(limitNum).lean(),
      AdminLog.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

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
        currentPage: pageNum,
        totalPages,
        totalCount,
        hasNextPage,
        hasPrevPage,
        limit: limitNum,
      },
      filters: {
        actionType,
        userId,
        userRole,
        dateFrom,
        dateTo,
      },
    });
  } catch (error: any) {
    console.error("Error fetching admin logs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin logs",
      error: error.message,
    });
  }
};

// Get all users in the database
export const getAllUserRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("hello - fetching all registered users");

    const users = await User.find().sort({ createdAt: -1 });
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    res.status(200).json({
      success: true,
      message: "All registered users fetched successfully",
      totalUsers,
      users,
      totalAdmins,
    });
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
