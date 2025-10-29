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
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected\n");

    // Find the admin user
    const adminUser = await User.findOne({ 
      email: "officialdevelevate@gmail.com" 
    });

    if (!adminUser) {
      console.log("❌ Admin user not found!");
      console.log("Searching for any admin users...\n");
      
      const admins = await User.find({ role: "admin" });
      
      if (admins.length === 0) {
        console.log("No admin users found in database.");
      } else {
        console.log(`Found ${admins.length} admin user(s):\n`);
        
        for (const admin of admins) {
          console.log(`Admin: ${admin.name} (${admin.email})`);
          console.log(`  ID: ${admin._id}`);
          console.log(`  Should this be admin? ${admin.email === "officialdevelevate@gmail.com" ? "YES" : "NO"}`);
          
          // If this is NOT the official admin email, change to user
          if (admin.email !== "officialdevelevate@gmail.com") {
            console.log(`  ⚠️  Converting to regular user...\n`);
            admin.role = "user";
            await admin.save();
            console.log(`  ✅ ${admin.name} is now a regular user\n`);
          }
        }
      }
    } else {
      console.log("✅ Found official admin user:");
      console.log(`   Name: ${adminUser.name}`);
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Role: ${adminUser.role}`);
      console.log(`   ID: ${adminUser._id}\n`);
      
      if (adminUser.role !== "admin") {
        console.log("⚠️  Admin user doesn't have admin role, fixing...");
        adminUser.role = "admin";
        await adminUser.save();
        console.log("✅ Admin role restored\n");
      }
    }

    // List all users and their roles
    console.log("\n" + "=".repeat(60));
    console.log("ALL USERS IN DATABASE:");
    console.log("=".repeat(60) + "\n");
    
    const allUsers = await User.find().select("name email role").lean();
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   Role: ${user.role}`);
      console.log(`   ID: ${user._id}\n`);
    });

    console.log("=".repeat(60));
    console.log("✅ Database fix complete!");
    console.log("=".repeat(60));
    
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
    process.exit(0);
  }
}

fixAdminUser();