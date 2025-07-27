import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
export const registerUser = async (req, res) => {
  console.log('🚀 Registration endpoint hit');
  console.log('📥 Request body:', req.body);
  console.log('📋 Request headers:', req.headers);

  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      console.log('❌ Missing required fields:', { name: !!name, email: !!email, password: !!password, role: !!role });
      return res.status(400).json({
        message: "Missing required fields",
        required: ['name', 'email', 'password', 'role'],
        received: { name: !!name, email: !!email, password: !!password, role: !!role }
      });
    }

    console.log('📝 Registration attempt for:', { name, email, role });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();
    console.log('✅ User registered successfully:', email);

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);

    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Invalid user data",
        error: error.message
      });
    } else if (error.code === 11000) {
      return res.status(400).json({
        message: "User already exists"
      });
    } else if (error.name === 'MongoError' || error.name === 'MongoNetworkError') {
      return res.status(503).json({
        message: "Database unavailable. Please try again later."
      });
    }

    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES = "3d";
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    // Set token in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in production
        sameSite: process.env.NODE_ENV === "production"?"Strict":"Lax", // CSRF protection
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in ms
      })
      .status(200)
      .json({ 
        message: "Login successful", 
        userId: user._id, 
        token: token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
