import express from "express";
import { getFaq, postFaq } from "../controller/Faq.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";
const Faq = express.Router();

Faq.post("/user/faq", postFaq);
Faq.get("/admin/faq-get",authenticateToken, requireAdmin,getFaq);


export default Faq;

