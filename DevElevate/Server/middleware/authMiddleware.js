import jwt from "jsonwebtoken";
import user from "../model/UserModel.js";

// AUTHENTICATE USER VIA TOKEN IN COOKIES
export const authenticateToken = async (req, res, next) => {

  const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer", "").trim();

  if (!token) {
    console.warn("Authentication failed: No token provided");
    return res.status(401).json({ message: "User not logged in" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await user
      .findById(decodedToken?.userId)
      .select("-password -refreshToken");

    if (!userData) {
      console.warn("Authentication failed: Token valid but user not found");
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = userData;
    next();
  } catch (error) {
    console.error("Authentication failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// CHECK IF USER HAS ADMIN ROLE
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    console.warn("Authorization failed: Admin access required");
    return res.status(403).json({ message: "Admin access required" });
  }
};
