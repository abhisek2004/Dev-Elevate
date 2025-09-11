import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

// ✅ Middleware: Authenticate user via token
export const authenticateToken = async (req, res, next) => {
  try {
    console.log(req.cookies.token);
    
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findById(decodedToken?.id || decodedToken?.userId)
      .select("-password -refreshToken");

    if (!userData) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    req.user = userData;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Middleware: Check if user is admin
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};


