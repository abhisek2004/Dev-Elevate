import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import courseRoutes from "./routes/courseRoutes.js";
import adminFeedbackRoutes from './routes/adminFeedbackRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import commentRoutes from './routes/commentRoutes.js'
import emailRoutes from "./routes/emailRoutes.js";

// Import middleware
import authorize from "./middleware/authorize.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

// Load environment variables from .env file
dotenv.config();
if (process.env.MONGO_URI) {
  connectDB();
  console.log('MongoDB connected successfully.');
} else {
  console.log('MongoDB connection skipped - PDF routes will work without database');
}

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true);

app.use("/api/v1", userRoutes);

app.use("/api/email", emailRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/admin/courses", courseRoutes);

app.use('/api/admin-feedback', adminFeedbackRoutes);

app.use("/api/news", newsRoutes)
app.use("/api/comments", commentRoutes);

app.get("/api/admin/dashboard", authenticateToken, authorize("admin"), (req, res) => {
  res.send("Hello Admin");
});

app.get("/api/admin/dashboard-stats", authenticateToken, authorize("admin"), (req, res) => {
    // This is where you would fetch and send your dashboard stats data
    res.json({ message: "Dashboard stats data for admin." });
});

app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
