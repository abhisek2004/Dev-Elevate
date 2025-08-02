import { Router } from "express";
import {
  createNews,
  updateNews,
  deleteNews,
  getAllNews,
  getNewsById,
} from "../controller/newsController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/create-news-post").post(authenticateToken, createNews);

router.route("/update-news-post/:newsId").post(authenticateToken, updateNews);

router.route("/delete-news-post/:newsId").post(authenticateToken, deleteNews);

router.route("/get-all-news").get(getAllNews);
router.route("/get-news-by-id/:newsId").get(getNewsById);

export default router;