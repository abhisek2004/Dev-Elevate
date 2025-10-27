import express from "express";
import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import authorize from "./middleware/authorize.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import courseRoutes from "./routes/courseRoutes.js";
import adminCourseRoutes from "./routes/adminCourseRoutes.js"; // ✅ ADD THIS
import adminFeedbackRoutes from "./routes/adminFeedbackRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import userQuizRoutes from "./routes/userQuizRoutes.js";
import atsRoutes from "./routes/atsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import javaRoutes from "./routes/javaRoutes.js";
import aimlRoutes from "./routes/aimlRoutes.js";
import mernRoutes from "./routes/mernRoutes.js";
import dsaRoutes from "./routes/dsaRoutes.js";
import contestRoutes from "./routes/contestRoutes.js";
import placementRoutes from "./routes/placementRoutes.js";
import contactSupport from "./routes/contactSupport.js";
import newsRoutes from "./routes/newsRoutes.js";
import Faq from "./routes/faq.js";
import systemSettings from "./routes/SystemSettingRoute.js";
import videoProgressRoutes from "./routes/videoProgressRoutes.js";
import sanitizeMiddleware from "./middleware/sanitizeMiddleware.js";
import analyticRoute from "./routes/analytics.js";

import http from "http";
import { initSocketIO } from "./socket.js";
import { startContestFinalizationCron } from "./controller/contestController.js";

// Connect to MongoDB only if MONGO_URI is available
if (process.env.MONGO_URI) {
    connectDB();
} else {
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(cookieParser());

//sanitize-html
app.use(sanitizeMiddleware);

app.set("trust proxy", true);

// Routes
app.use("/api/v1/notifications", notificationRoutes);
// USER ROUTES
app.use("/api/v1", userRoutes);
app.use("/api/v1", contactSupport)
app.use("/api/v1", Faq);
app.use("/api/v1", newsRoutes);
app.use("/api/v1/community", communityRoutes);
app.use("/api/v1/ats", atsRoutes);

// ✅ Video Progress & Saved Videos (ONLY ONCE!)
app.use("/api/v1/video", videoProgressRoutes);

// ✅ PUBLIC COURSE ROUTES (YouTube API - No auth required)
app.use("/api/v1/courses", courseRoutes);

// ✅ ADMIN COURSE ROUTES (MongoDB courses - Public read, Admin write)
app.use("/api/v1/admin-courses", adminCourseRoutes);

// ADMIN ROUTES
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin/feedback", adminFeedbackRoutes);
app.use("/api/v1/admin/quiz", quizRoutes);
app.use('/api/v1/admin/analytics', analyticRoute);
app.use('/api/v1/admin', systemSettings);

// ✅ USER QUIZ ROUTES (Changed from /quiz to /user-quiz)
app.use("/api/v1/user-quiz", userQuizRoutes);
// ✅ AI ROUTES (Changed from / to /ai)
app.use("/api/v1/ai", aiRoutes);

// Learning Routes
app.use("/api/v1/learning/java", javaRoutes);
app.use("/api/v1/learning/aiml", aimlRoutes);
app.use("/api/v1/learning/mern", mernRoutes);
app.use("/api/v1/learning/dsa", dsaRoutes);

// Placement Routes
app.use("/api/v1/placements", placementRoutes);

// Contest Routes
app.use("/api/v1/contests", contestRoutes);
startContestFinalizationCron(app);

// Sample Usage of authenticate and authorize middleware for roleBased Features
app.get(
    "/api/admin/dashboard",
    authenticateToken,
    authorize("admin"),
    (req, res) => {
        res.send("Hello Admin");
    }
);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
});

// TEST ROUTE
app.get('/api/v1/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

app.get('/api/v1/courses/test', (req, res) => {
    res.json({ message: 'Course route is working!' });
});

// 404 handler - MUST BE LAST!
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

videoProgressRoutes.stack.forEach((r) => {
  if (r.route) {
  }
});

// Create HTTP server from Express app
const server = http.createServer(app);
initSocketIO(server);

// Override app.listen to use the HTTP server internally
const originalListen = app.listen;
app.listen = function (...args) {
  return server.listen.apply(server, args);
};

// Start server
app.listen(PORT, () => {
});