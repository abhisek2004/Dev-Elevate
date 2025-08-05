import { Router } from "express";
import authRoutes from "./auth.routes"
import adminRoutes from "./admin.routes"
import userRoutes from "./user.routes"
import { authenticateToken, requireAdmin } from "../middlewares/authMiddleware";
const router = Router()
router.use("/auth", authRoutes)
router.use("/admin", authenticateToken, requireAdmin, adminRoutes)
router.use("/user", authenticateToken, userRoutes)
export default router