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

// sanitizeMiddleware

import sanitizeMiddleware from "./middleware/sanitizeMiddleware.js";
import analyticRoute from "./routes/analytics.js";

import http from "http";
import { initSocketIO } from "./socket.js";
import { startContestFinalizationCron } from "./controller/contestController.js";

// Connect to MongoDB only if MONGO_URI is available
if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.log(
        "MongoDB connection skipped - PDF routes will work without database"
    );
}

const app = express();
const PORT = process.env.PORT || 3001;

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
app.use("/api/v1/community", communityRoutes);
app.use("/api/v1/ats", atsRoutes); // ATS resume scanner functionality

// ADMIN ROUTES
app.use("/api/v1/admin", adminRoutes); // general admin stuff like login, profile
app.use("/api/v1/admin/courses", courseRoutes); // course create/delete/edit
app.use("/api/v1/admin/feedback", adminFeedbackRoutes); // feedback-related
app.use("/api/v1/admin/quiz", quizRoutes); //quiz-related
app.use("/api/v1/quiz", userQuizRoutes); // user quiz routes
app.use("/api/v1", aiRoutes);
app.use('/api/v1/admin/analytics',analyticRoute)

app.use('/api/v1/admin',systemSettings)

// Learning Routes
app.use("/api/v1/learning/java", javaRoutes); // Java learning content
app.use("/api/v1/learning/aiml", aimlRoutes); // AI/ML learning content
app.use("/api/v1/learning/mern", mernRoutes); // MERN stack learning content
app.use("/api/v1/learning/dsa", dsaRoutes); // DSA learning content

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

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// Use news routes
app.use("/api/v1", newsRoutes);

// Create HTTP server from Express app
const server = http.createServer(app);
initSocketIO(server);

// Override app.listen to use the HTTP server internally
const originalListen = app.listen;
app.listen = function (...args) {
  console.log(
    `Server with WebSocket support starting on port ${
      args[0] || process.env.PORT || 3001
    }`
  );
  return server.listen.apply(server, args);
};

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});