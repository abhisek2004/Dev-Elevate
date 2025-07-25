import { config } from 'dotenv';
config();

import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/auth",authRouter);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'The Dashboard comes here'
   });
});


(async () => {
  await mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})();
