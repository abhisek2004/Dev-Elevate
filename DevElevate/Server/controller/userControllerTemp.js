import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Temporary in-memory storage for testing
const users = [];

export const registerUser = async (req, res) => {
  console.log('🚀 Temp Registration endpoint hit');
  console.log('📥 Request body:', req.body);
  
  try {
    const { name, email, password, role } = req.body;
    
    // Validate required fields
    if (!name || !email || !password || !role) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ 
        message: "Missing required fields", 
        required: ['name', 'email', 'password', 'role']
      });
    }
    
    console.log('📝 Registration attempt for:', { name, email, role });

    // Check if user already exists in memory
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in memory
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    console.log('✅ User registered successfully:', email);
    console.log('👥 Total users in memory:', users.length);

    res.status(201).json({ 
      message: "User registered successfully", 
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ 
      message: "Registration failed", 
      error: error.message 
    });
  }
};

export const loginUser = async (req, res) => {
  console.log('🔐 Temp Login endpoint hit');
  console.log('📥 Request body:', req.body);
  
  try {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid credentials for:', email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
    const JWT_EXPIRES = "3d";
    
    // Create JWT token
    const token = jwt.sign(
      { id: user.id, userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    console.log('✅ Login successful for:', email);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      message: "Login failed", 
      error: error.message 
    });
  }
};
