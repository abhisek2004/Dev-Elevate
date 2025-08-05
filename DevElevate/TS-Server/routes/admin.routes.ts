import { Router } from "express";
import { createAdminLog, getAdminLogs, getAllUserRegister } from "../controllers/adminLog.controller";
import quizRoutes from "./quiz.routes"
import courseRoutes from "./course.routes"
const router = Router()
router.use("/quiz", quizRoutes)
router.use("/course", courseRoutes)
router.post("/system-log", createAdminLog);
router.get("/system-logs", getAdminLogs);
router.get("/all-users", getAllUserRegister)
router.get("/dashboard", (req, res) => {
    res.send("Hello Admin");
});

export default router