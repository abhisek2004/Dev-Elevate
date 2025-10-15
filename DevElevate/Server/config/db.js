
import mongoose from"mongoose"
import dotenv from "dotenv"

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}🟢`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.log('Server will continue running without database connection...');
    // Don't exit the process, allow server to run for testing
    // process.exit(1);
  }
};

export default connectDB;
