import express from "express";
import { 
  createAdminLog, 
  getAdminLogs
} from "../controller/adminLogController.js";
import { 
  sendNewsletter, 
  getEmailLogs 
} from "../controller/emailController.js"; 
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken, requireAdmin);

router.post("/system-log", createAdminLog);

router.get("/system-logs", getAdminLogs);
router.post("/email/send", sendNewsletter); 
router.get("/email/logs", getEmailLogs); 

export default router;