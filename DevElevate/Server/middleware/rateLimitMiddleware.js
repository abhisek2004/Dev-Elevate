import rateLimit from 'express-rate-limit';

// General rate limiting for most API endpoints
export const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000, // Temporarily increased for debugging
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip rate limiting on errors to help with debugging
  skipFailedRequests: true,
});

// Strict rate limiting for authentication endpoints
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip successful requests
  skipSuccessfulRequests: true,
});

// Rate limiting for OTP requests
export const otpRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 3, // Limit each IP to 3 OTP requests per 5 minutes
  message: {
    success: false,
    message: 'Too many OTP requests, please try again after 5 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for AI/Gemini requests (resource intensive)
export const aiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 10, // Limit each IP to 10 AI requests per minute
  message: {
    success: false,
    message: 'Too many AI requests, please try again after a minute.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for content creation (posts, comments, etc.)
export const contentRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 30, // Limit each IP to 30 content creations per 10 minutes
  message: {
    success: false,
    message: 'Too many content creation requests, please slow down.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for feedback and submissions
export const feedbackRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5, // Limit each IP to 5 feedback submissions per hour
  message: {
    success: false,
    message: 'Too many feedback submissions, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// More permissive rate limiting for read operations
export const readRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // Limit each IP to 300 read requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
