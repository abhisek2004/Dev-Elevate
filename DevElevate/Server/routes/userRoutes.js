import express from "express";
import passport from "passport";
import { googleAuthCallback, getMe } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleAuthCallback
);

router.get("/me", isAuthenticated, getMe);

export default router;
