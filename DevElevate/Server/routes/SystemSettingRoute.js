import express from "express";

import {
  getSystemSettings,
  updateSystemSettings,
} from "../controller/systemController.js";
import {
  authenticateToken,
  checkSecretKey,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/system-settings", getSystemSettings);
router.patch(
  "/system-settings",
  authenticateToken,
  requireAdmin,
  checkSecretKey,
  updateSystemSettings
);

export default router;
