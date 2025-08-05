import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import moment, { Moment } from "moment";
import sendWelcomeEmail from "../utils/mailer.js";
import generateWelcomeEmail from "../utils/welcomeTemplate.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { User } from "../models/user.model.js";
import { Feedback } from "../models/feedback.model.js";
import { JWT_EXPIRES, JWT_SECRET, NODE_ENV } from "../config/env.config.js";
import VisitingWebsite from "../models/visitingWebsite.model.js";

dotenv.config();

export const registerUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("User already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        role,
        password: hashedPassword,
    });

    const html = generateWelcomeEmail(newUser.name);
    await sendWelcomeEmail(newUser.email, html);
    await newUser.save();

    res.status(201).json({
        message: "User registered successfully",
        newUser,
        send: "Mail sent successfully",
    });
});

export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("User not found", 404));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Invalid credentials", 401));

    const JWT_EXPIRES = "3d";
    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn: JWT_EXPIRES });

    res
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
            message: "Login successful",
            userId: user._id,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
});

export const googleUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, role } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        role,
        password: "google-oauth",
      });
      await user.save();
    }

    if (!JWT_SECRET) {
      return next(new ErrorHandler("JWT secret is not defined", 500));
    }

    const payload = { userId: user._id.toString() };

    // Fix: Type-safe JWT sign call
    // @ts-ignore TODO
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES ?? "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      })
      .status(200)
      .json({
        message: "Google login successful",
        userId: user._id,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  }
);

export const logout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return next(new ErrorHandler("User already logged out", 401));
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    return res.status(200).json({
        message: "Logout successful",
    });
});


export const feedback = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;
    const { userId } = req.user as any;

    const newFeedback = await Feedback.create({
        message,
        userId,
    });

    return res.status(200).json({
        newFeedback,
    });
});
export const currentStreak = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
        return next(new ErrorHandler("Unauthorized: User ID not found in request", 401));
    }

    const user = await User.findById(userId).populate("dayStreak");

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const today: Moment = moment().startOf("day");

    const alreadyVisited: boolean = user.dayStreak.some((visit: any) =>
        moment(visit.dateOfVisiting).isSame(today, "day")
    );

    if (!alreadyVisited) {
        const visit = await VisitingWebsite.create({
            user: userId,
            dateOfVisiting: Date.now(),
            visit: true,
        });
        user.dayStreak.push(visit._id);
    }

    await user.populate("dayStreak");

    // Sort visits by date ascending
    const sortedVisits: Moment[] = user.dayStreak
        .map((v: any) => moment(v.dateOfVisiting).startOf("day"))
        .sort((a, b) => a.valueOf() - b.valueOf());

    let currentStreak = 1;
    let maxStreak = 1;
    let startDate = sortedVisits[0];
    let tempStartDate = sortedVisits[0];
    let endDate = sortedVisits[0];

    for (let i = 1; i < sortedVisits.length; i++) {
        const diff = sortedVisits[i].diff(sortedVisits[i - 1], "days");
        if (diff === 1) {
            currentStreak++;
            if (currentStreak > maxStreak) {
                maxStreak = currentStreak;
                startDate = tempStartDate;
                endDate = sortedVisits[i];
            }
        } else if (diff > 1) {
            currentStreak = 1;
            tempStartDate = sortedVisits[i];
        }
    }

    user.currentStreak = currentStreak;
    user.longestStreak = Math.max(user.longestStreak, maxStreak);
    user.streakStartDate = startDate.toDate();
    user.streakEndDate = endDate.toDate();
    await user.save();

    return res.status(200).json({
        message: `✅ Welcome back, ${user.name}`,
        currentStreakData: {
            currentStreak: user.currentStreak,
            longestStreak: user.longestStreak,
            totalDays: user.dayStreak.length,
            streakStartDate: user.streakStartDate,
            streakEndDate: user.streakEndDate,
            dayStreak: user.dayStreak,
        },
    });
});

