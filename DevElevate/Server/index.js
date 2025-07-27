import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import cookieParser from "cookie-parser";
import adminFeedbackRoutes from './routes/adminFeedbackRoutes.js';
import cors from "cors";



// ✅ Load environment variables before anything else
dotenv.config();

// ✅ Then connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true, // allow cookies and credentials
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", userRoutes);
app.use('/admin', adminFeedbackRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from DevElevate !');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
    });