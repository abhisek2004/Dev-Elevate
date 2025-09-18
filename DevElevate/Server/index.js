import express from "express";
import dotenv from "dotenv";
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
import placementRoutes from "./routes/placementRoutes.js";
import contactSupport from "./routes/contactSupport.js";
import newsRoutes from "./routes/newsRoutes.js";
import Faq from "./routes/faq.js";
import systemSettings from "./routes/SystemSettingRoute.js";

// sanitizeMiddleware
import sanitizeMiddleware from "./middleware/sanitizeMiddleware.js";
import analyticRoute from "./routes/analytics.js";

// ratelimiting
import { guestLimiter, authLimiter, userLimiter } from './middleware/rateLimiting/index.js'

// Connect to MongoDB only if MONGO_URI is available
if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.log(
        "MongoDB connection skipped - PDF routes will work without database"
    );
}

// Load environment variables
dotenv.config();

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

// USER ROUTES with rate limiting
app.use("/api/v1", authLimiter, userRoutes);
app.use("/api/v1", guestLimiter, contactSupport);
app.use("/api/v1", guestLimiter, Faq);
app.use("/api/v1/community", guestLimiter, communityRoutes);
app.use("/api/v1/ats", guestLimiter, atsRoutes); // ATS resume scanner functionality

// ADMIN ROUTES
app.use("/api/v1/admin", authLimiter, adminRoutes);
app.use("/api/v1/admin/courses", courseRoutes); // course create/delete/edit
app.use("/api/v1/admin/feedback", adminFeedbackRoutes); // feedback-related
app.use("/api/v1/admin/quiz", quizRoutes); //quiz-related
app.use("/api/v1/quiz", userQuizRoutes); // user quiz routes
app.use("/api/v1", aiRoutes);
app.use('/api/v1/admin/analytics', analyticRoute)
app.use('/api/v1/admin', systemSettings)

// Learning Routes
app.use("/api/v1/learning/java", guestLimiter, javaRoutes);
app.use("/api/v1/learning/aiml", guestLimiter, aimlRoutes);
app.use("/api/v1/learning/mern", guestLimiter, mernRoutes);
app.use("/api/v1/learning/dsa", guestLimiter, dsaRoutes);

// Placement Routes
app.use("/api/v1/placements", placementRoutes);

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
app.use("/api/v1", guestLimiter, newsRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
