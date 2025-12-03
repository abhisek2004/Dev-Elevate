// fixAdminUser.js
// Run this once to fix the admin user issue: node fixAdminUser.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function fixAdminUser() {
  try {
    await mongoose.connect(MONGO_URI);


    // Find the admin user
    const adminUser = await User.findOne({ 
      email: "officialdevelevate@gmail.com" 
    });

    if (!adminUser) {
      
      const admins = await User.find({ role: "admin" });
      
      if (admins.length === 0) {
      } else {
        
        for (const admin of admins) {
          
          // If this is NOT the official admin email, change to user
          if (admin.email !== "officialdevelevate@gmail.com") {
            admin.role = "user";
            await admin.save();
          }
        }
      }
    } else {
      if (adminUser.role !== "admin") {
        adminUser.role = "admin";
        await adminUser.save();
      }
    }
    
    const allUsers = await User.find().select("name email role").lean();
    allUsers.forEach((user, index) => {
    });
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

fixAdminUser();