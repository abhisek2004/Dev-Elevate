// ✅ Top-level imports and configuration
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/connectDB.js';

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import adminFeedbackRoutes from './routes/adminFeedbackRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import authorize from './middleware/authorize.js';
import { authenticateToken } from './middleware/authMiddleware.js';

// ✅ Load environment variables first
dotenv.config();

// ✅ Initialize app
const app = express();

// ✅ Connect to MongoDB
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log('MongoDB connection skipped - PDF routes will work without database');
}

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend origin (Vite)
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true);

// ✅ Routes
app.use("/api/v1", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/courses", courseRoutes);
app.use("/admin", adminFeedbackRoutes);
app.use("/", userRoutes);
app.use("/api", otpRoutes);

// ✅ Protected route example
app.get("/api/admin/dashboard", authenticateToken, authorize("admin"), (req, res) => {
  res.send("Hello Admin");
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
