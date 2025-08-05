import { Router } from "express";
import { googleUser, loginUser, registerUser } from "../controllers/user.controller";

const router = Router()
router.post("/signup",registerUser)
router.post("/login",loginUser)
router.post("/google",googleUser)

export default router