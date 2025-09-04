import rateLimit from "express-rate-limit";

export const passwordChangeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 2, 
  message: {
    message: "Too many password change attempts. Please try again later."
  },
});