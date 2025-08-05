
import mongoose from "mongoose"
import dotenv from "dotenv"
import { MONGO_URI } from "./env.config";

// Load environment variables
dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI as string);
        console.log(`MongoDB connected: ${conn.connection.host}🟢`);
    } catch (error: any) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

