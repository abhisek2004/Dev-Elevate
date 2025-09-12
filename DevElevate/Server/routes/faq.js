import express from "express";
import { getFaq, postFaq } from "../controller/Faq.js";
const Faq = express.Router();

Faq.post("/faq", postFaq);
Faq.get("/faq-get",getFaq);

export default Faq;
