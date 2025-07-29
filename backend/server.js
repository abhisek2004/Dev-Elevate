import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import githubRoutes from './routes/integrations/github.js';
import linkedinRoutes from './routes/integrations/linkedin.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { authMiddleware } from './middleware/auth.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5174', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'DevElevate API is running',
    timestamp: new Date().toISOString(),
  });
});

// Simple LinkedIn test endpoint (no auth required)
app.post('/api/linkedin-test', (req, res) => {
  console.log('🧪 LinkedIn test endpoint called with:', req.body);
  const { profileUrl } = req.body;
  
  if (!profileUrl) {
    return res.status(400).json({
      success: false,
      message: 'profileUrl is required'
    });
  }
  
  if (!profileUrl.includes('linkedin.com/in/')) {
    return res.status(400).json({
      success: false,
      message: 'Invalid LinkedIn profile URL format'
    });
  }
  
  // Return success response for testing
  res.json({
    success: true,
    message: 'LinkedIn test endpoint working!',
    data: {
      profileUrl: profileUrl,
      testMode: true,
      timestamp: new Date().toISOString(),
      status: 'connection_verified'
    }
  });
});

// Simple GitHub test endpoint (no auth required)
app.get('/api/github-test', (req, res) => {
  console.log('🧪 GitHub test endpoint called');
  
  // Generate a test auth URL for debugging
  const testAuthUrl = `https://github.com/login/oauth/authorize?` +
    `client_id=${process.env.GITHUB_CLIENT_ID || 'test_client_id'}&` +
    `redirect_uri=${encodeURIComponent(process.env.GITHUB_REDIRECT_URI || 'http://localhost:5000/api/integrations/github/callback')}&` +
    `scope=user:email,public_repo,read:user&` +
    `state=test_state`;
  
  res.json({
    success: true,
    message: 'GitHub test endpoint working!',
    data: {
      testMode: true,
      timestamp: new Date().toISOString(),
      status: 'connection_verified',
      authUrl: testAuthUrl,
      clientId: process.env.GITHUB_CLIENT_ID || 'NOT_SET',
      redirectUri: process.env.GITHUB_REDIRECT_URI || 'NOT_SET'
    }
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/integrations/github', authMiddleware, githubRoutes);
// LinkedIn test endpoint (no auth) - must come before the auth middleware route
app.post('/api/integrations/linkedin/test', (req, res, next) => {
  // Route directly to linkedin routes without auth middleware
  linkedinRoutes(req, res, next);
});
// LinkedIn main endpoints (with auth)
app.use('/api/integrations/linkedin', authMiddleware, linkedinRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dev-elevate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed.');
    process.exit(0);
  });
});

export default app;
