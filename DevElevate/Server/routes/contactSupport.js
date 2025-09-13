import express from "express";

import { contact_Support_Team } from "../controller/contactSupport .js";
const contactRoutes = express.Router();

contactRoutes.post("/faq", contact_Support_Team);

export default contactRoutes;
