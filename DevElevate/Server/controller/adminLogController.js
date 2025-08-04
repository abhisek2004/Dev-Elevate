import AdminLog from "../model/AdminLog.js";
import User from "../model/UserModel.js";

// CREATE A NEW ADMIN LOG ENTRY
export const createAdminLog = async (req, res) => {
  try {
    const { actionType, userId, userRole, message, additionalData } = req.body;

    // VALIDATE REQUIRED FIELDS
    if (!actionType || !userId || !userRole || !message) {
      console.error(
        "Validation failed: Missing required fields in createAdminLog"
      );
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: actionType, userId, userRole, message",
      });
    }


    // GET IP ADDRESS AND USER AGENT FROM REQUEST
    const ipAddress =
      req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
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

    console.log("Admin log entry created successfully");
    res.status(201).json({
      success: true,
      message: "Log entry created successfully",
      log: logEntry,
    });
  } catch (error) {
    console.error("Error creating admin log:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create log entry",
      error: error.message,
    });
  }
};

// GET ADMIN LOGS WITH FILTERING AND PAGINATION
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

    // BUILD FILTER OBJECT
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

    // DATE RANGE FILTER
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) {
        filter.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        const endDate = new Date(dateTo);

        //INCLUDE ENTIRE DAY
        endDate.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = endDate;
      }
    }

    // CALCULATE SKIP VALUE FOR PAGINATION
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // BUILD SORT OBJECT
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // EXECUTE QUERY WITH PAGINATION
    const [logs, totalCount] = await Promise.all([
      AdminLog.find(filter).sort(sort).skip(skip).limit(parseInt(limit)).lean(),
      AdminLog.countDocuments(filter),
    ]);

    // CALCULATE PAGINATION INFO
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;


    // TRANSFORM LOGS TO MATCH FRONTEND EXPECTED FORMAT
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
    console.log(`Fetched ${logs.length} admin logs successfully`);
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
    console.error("Error fetching admin logs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin logs",
      error: error.message,

    });
  }
};

//Get all-user in the  database
export const getAllUserRegister = async (req, res) => {
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
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,

    });
  }
};
