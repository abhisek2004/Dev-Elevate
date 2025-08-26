import express from "express";
import {
  getNotifications,
  markNotificationRead,
  deleteNotification,
} from "../controller/notificationController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getNotifications);
router.patch("/:id/read", authenticateToken, markNotificationRead);
router.delete("/:id", authenticateToken, deleteNotification);

export default router;
