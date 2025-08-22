//Middleware to authenticate requests using JWT.
import jwt from "jsonwebtoken";
import user from "../model/UserModel.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer", "").trim();

  if (!token) {
    return res.status(401).json({ message: "User not logged in" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await user.findById(decodedToken?.userId).select("-password -refreshToken");

    if (!userData) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin access required" });
  }
};


