import jwt from "jsonwebtoken";
import user from "../model/UserModel.js";

export const authenticateToken = async (req, res, next) => {
  const token =
    req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer", "").trim();

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await user
      .findById(decodedToken?.userId)
      .select("-password -refreshToken");

    if (!userData) {
      return res
        .status(401)
        .json({ message: "Invalid access token: User does not exist" });
    }

    req.user = userData;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access denied: Admin privileges required" });
  }
};
