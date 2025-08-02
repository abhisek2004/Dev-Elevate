import express from "express";
import { sendNewsletter, getEmailLogs } from "../controller/emailController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.post("/send", authenticateToken, authorize("admin"), sendNewsletter);
router.get("/logs", authenticateToken, authorize("admin"), getEmailLogs);

export default router;
