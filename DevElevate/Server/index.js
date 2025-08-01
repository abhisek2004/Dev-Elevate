import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import cookieParser from "cookie-parser";
import authorize from "./middleware/authorize.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import courseRoutes from "./routes/courseRoutes.js";
import adminFeedbackRoutes from './routes/adminFeedbackRoutes.js';
import quizRoutes from "./routes/quizRoutes.js"
// Connect to MongoDB only if MONGO_URI is available
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log('MongoDB connection skipped - PDF routes will work without database');
}

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());


app.set('trust proxy', true);

// Routes
app.use("/api/v1", userRoutes);


app.use("/api/admin", adminRoutes);
app.use("/api/admin/quiz", quizRoutes);
app.use("/api/admin/courses", courseRoutes);
app.use('/admin', adminFeedbackRoutes);


app.use("/",userRoutes)


// Sample Usage of authenticate and authorize middleware for roleBased Features
app.get("/api/admin/dashboard", authenticateToken, authorize("admin"), (req, res) => {
  res.send("Hello Admin");
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
