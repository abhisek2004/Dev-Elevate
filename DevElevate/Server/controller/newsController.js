import { News } from "../model/NewsModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNews = asyncHandler(async (req, res) => {
  const { title, content, published = false, tags = [] } = req.body;

  const author = req.user.id || req.user._id;

  if (!title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let processedTags = [];

  if (tags) {
    if (Array.isArray(tags)) {
      processedTags = tags;
    } else if (typeof tags === "string") {
      processedTags = [tags];
    } else {
      return res
        .status(400)
        .json({ message: "Tags must be a string or an array of strings" });
    }

    // Clean up tags
    processedTags = processedTags.filter((tag) => tag !== "");

    if (processedTags.length > 5) {
      return res.status(400).json({ message: "You can add up to 5 tags only" });
    }

    const invalidTag = processedTags.find((tag) => !/^[a-z0-9\-]+$/i.test(tag));
    if (invalidTag) {
      return res.status(400).json({
        message: `Invalid tag: "${invalidTag}". Only alphanumeric and hyphens allowed.`,
      });
    }
  }

  const news = new News({
    title,
    content,
    author,
    isPublished: published,
    tags: processedTags,
  });

  await news.save();
  return res.status(201).json({
    success: true,
    message: "News created successfully",
    news,
  });
});

const updateNews = asyncHandler(async (req, res) => {
  const { title, content, published, tags } = req.body;
  if (!content) {
    return res.status(400).json({ message: "Updated content is required!!" });
  }
  const news = await News.findById(req.params.id);
  if (!news) {
    return res.status(404).json({ message: "News not found" });
  }

  await News.findByIdAndUpdate(
    req.params.id,
    {
      title,
      content,
      tags: tags ? tags : news.tags,
      isPublished: published !== undefined ? published : news.isPublished,
    },
    { new: true }
  );
  res.status(200).json({ message: "News updated successfully" });
});

const deleteNews = asyncHandler(async (req, res) => {
  const newsId = req.params.id;
  if (!newsId) {
    return res.status(404).json({ message: "News Id not found!" });
  }
  const news = await News.findById(req.params.id);
  if (!news) {
    return res.status(404).json({ message: "News not found" });
  }

  await News.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "News deleted successfully" });
});

const getAllNews = asyncHandler(async (req, res) => {
  const news = await News.find()
    .populate("author", "name email")
    .populate({
      path: "comments",
      populate: { path: "user", select: "email" },
    })
    .sort({ createdAt: -1 });

  if (!news || news.length === 0) {
    return res.status(404).json({ message: "No news found" });
  }

  return res.status(200).json({
    success: true,
    news,
    message: "News fetched successfully",
  });
});


const getNewsById = asyncHandler(async (req, res) => {
  const newsId = req.params.newsId;
  if (!newsId) {
    return res.status(400).json({ message: "News Id not found!" });
  }
  const news = await News.findById(newsId).populate(
    "author",
    "name email"
  );

  if (!news) {
    return res.status(404).json({ message: "News not found" });
  }
  res.status(200).json({
    success: true,
    news,
    message: "News fetched successfully",
  });
});

export { createNews, updateNews, deleteNews, getAllNews, getNewsById };
