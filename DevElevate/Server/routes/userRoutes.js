import express from "express";
const router = express.Router();

// Temporarily use in-memory controller to bypass database issues
import { registerUser, loginUser } from "../controller/userControllerTemp.js";
import { loginValidator, signUpValidator } from "../middleware/Validators.js";

router.post("/signup", signUpValidator, registerUser);

router.post("/login", loginValidator, loginUser);

export default router;
