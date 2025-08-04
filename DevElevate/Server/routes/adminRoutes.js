import express from "express";
import { 
  createAdminLog, 
  getAdminLogs,getAllUserRegister
} from "../controller/adminLogController.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();


router.post("/system-log",authenticateToken,requireAdmin, createAdminLog);

router.get("/system-logs",authenticateToken,requireAdmin, getAdminLogs);

router.get("/all-users",authenticateToken,requireAdmin,getAllUserRegister)



export default router;
