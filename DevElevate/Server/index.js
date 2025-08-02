import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
// import adminRoutes from './routes/adminRoutes.js'
import cookieParser from "cookie-parser";
import authorize from "./middleware/authorize.js";
import authenticate from "./middleware/authMiddleware.js";
import courseRoutes from "./routes/courseRoutes.js";
import counselorRoutes from './routes/counselor.route.js';


connectDB();

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // or wherever your FrontEnd or test.html is served
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// CORS configuration for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Trust proxy for accurate IP addresses (helpful for logging)
app.set('trust proxy', true);

// Routes
app.use("/api/v1/auth", userRoutes);
// app.use("/api/admin", adminRoutes);
app.use("/api/admin/courses", courseRoutes);
app.use('/api/counselor', counselorRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from DevElevate !');
});


// Sample Usage of authenticate and autherie middleware for roleBased Features
app.get("/api/admin/dashboard", authenticate, authorize("admin"), (req, res) => {
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
