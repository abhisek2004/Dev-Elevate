import express from "express";
import {  FAQ } from "../controller/contactSupport .js";
const contactRoutes = express.Router();

contactRoutes.post("/faq",FAQ);

export default contactRoutes;
