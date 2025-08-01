import express from "express";
import { 
  createAdminLog, 
  getAdminLogs
} from "../controller/adminLogController.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken, requireAdmin);

router.post("/system-log", createAdminLog);

router.get("/system-logs", getAdminLogs);

export default router;
