import jwt from "jsonwebtoken";
import user from "../model/UserModel.js";
import dotenv from "dotenv"
dotenv.config()

// export const authenticateToken = (req, res, next) => {
//   if(!process.env.JWT_SECRET) return res.status(400).json({message: "jwt_secret is not defined in .env"})

//   const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
// =======
export const authenticateToken = async (req, res, next) => {
  const token =
    req.cookies?.accessToken || req.header("Authorization").split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  console.log("token: from middleware", token);

  try {
    console.log("jwt secret: ", process.env.JWT_SECRET)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded token: ", decodedToken);

    const userData = await user
      .findById(decodedToken?.userId)
      .select("-password -refreshToken");
    console.log("user data", userData);

    if (!userData) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = userData;
    next();
  } catch (error) {
    console.error("jwt verification error", error)
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
