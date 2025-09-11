import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { contact_Support_Team } from "../controller/contactSupport .js";
const contactRoutes = express.Router();

contactRoutes.post("/contact-support", authenticateToken,contact_Support_Team);

export default contactRoutes;
