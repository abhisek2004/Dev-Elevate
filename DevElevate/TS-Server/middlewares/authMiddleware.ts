import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { JWT_SECRET } from "../config/env.config";
import { NextFunction, Response, Request } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";
import { catchAsyncError } from "../middlewares/catchAsyncError";

export const authenticateToken = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.cookies?.token ||
    req.header("Authorization")?.replace("Bearer", "").trim();

  if (!token) {
    return next(new ErrorHandler("User not logged in", 401));
  }

  const decodedToken = jwt.verify(token, JWT_SECRET as string) as { userId: string };

  const userData = await User.findById(decodedToken?.userId).select(
    "-password -refreshToken"
  );

  if (!userData) {
    return next(new ErrorHandler("Invalid Access Token", 401));
  }

  req.user = userData;
  next();
});

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    next(new ErrorHandler("Admin access required", 403));
  }
};
