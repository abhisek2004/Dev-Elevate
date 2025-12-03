import mongoose from "mongoose";
import AdminLog from "./model/AdminLog.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/Dev-elevate"
);

const actionTypes = [
  "login",
  "logout",
  "view_logs",
  "create",
  "update",
  "delete",
  "export",
  "import",
  "user_management",
  "course_management",
  "content_management",
  "news_management",
  "system_settings",
];

const userRoles = ["admin", "user"];

const sampleUsers = [
  { id: "user_001", name: "John Doe" },
  { id: "user_002", name: "Jane Smith" },
  { id: "user_003", name: "Mike Johnson" },
  { id: "admin_001", name: "Admin User" },
  { id: "admin_002", name: "Super Admin" },
];

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getRandomDate = () => {
  // Random date within last 30 days
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return new Date(
    thirtyDaysAgo.getTime() +
      Math.random() * (now.getTime() - thirtyDaysAgo.getTime())
  );
};

const createTestLogs = async (count = 50) => {
  try {
    const logs = [];

    for (let i = 0; i < count; i++) {
      const actionType = getRandomItem(actionTypes);
      const user = getRandomItem(sampleUsers);
      const userRole = user.id.startsWith("admin") ? "admin" : "user";

      const logEntry = {
        actionType,
        userId: user.id,
        userRole,
        timestamp: getRandomDate(),
        message: generateMessage(actionType, user.name, userRole),
      };

      logs.push(logEntry);
    }

    // Insert all logs
    await AdminLog.insertMany(logs);

    // Show summary
    const totalLogs = await AdminLog.countDocuments();

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating test logs:", error);
    process.exit(1);
  }
};

const generateMessage = (actionType, userName, userRole) => {
  const messages = {
    login: `${
      userRole === "admin" ? "Admin" : "User"
    } ${userName} logged into the system`,
    logout: `${
      userRole === "admin" ? "Admin" : "User"
    } ${userName} logged out of the system`,
    view_logs: `Admin ${userName} viewed system logs page`,
    create: `${userName} created new content in the system`,
    update: `${userName} updated existing content`,
    delete: `${userName} deleted content from the system`,
    export: `Admin ${userName} exported system data`,
    import: `Admin ${userName} imported data into the system`,
    user_management: `Admin ${userName} performed user management operations`,
    course_management: `Admin ${userName} managed course content`,
    content_management: `Admin ${userName} managed platform content`,
    news_management: `Admin ${userName} managed news and updates`,
    system_settings: `Admin ${userName} modified system settings`,
  };

  return messages[actionType] || `${userName} performed ${actionType} action`;
};

// Run the script
const count = process.argv[2] ? parseInt(process.argv[2]) : 50;
createTestLogs(count);
