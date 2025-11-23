import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const cookieToken = req.cookies?.token;
    const headerToken = req.headers.authorization?.split(" ")[1];
    const token = cookieToken || headerToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required - No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Extract user ID from ANY possible field in token
    const userId = decoded.userId || decoded.id || decoded._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format - missing userId",
      });
    }

    // ✅ Get FULL user data from database
    const user = await User.findById(userId).select("-password").lean();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found - Invalid token",
      });
    }

    // ✅ Attach user object with BOTH _id and id fields to request
    req.user = {
      ...user,
      _id: user._id,
      id: user._id.toString(),
    };
    next();
  } catch (error) {
    console.error("❌ Auth middleware error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication error",
      error: error.message,
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }
};

export const checkSecretKey = (req, res, next) => {
  const secretKey = req.headers["x-secret-key"] || req.body.secretKey;

  if (secretKey === process.env.SECRET_KEY) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Invalid secret key",
    });
  }
};
