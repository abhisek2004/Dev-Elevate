import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import Notes from "../model/Notes.js";
import Reviews from "../model/Reviews.js";
import Progress from "../model/Progress.js";

const router = express.Router();

// AI/ML module content
const aimlModules = {
  introduction: {
    id: 'introduction',
    title: 'AI/ML Introduction',
    description: 'Understand AI, ML, and Data Science fundamentals with real-world applications',
    topics: [
      {
        id: 'ai-basics',
        title: 'What is AI & Machine Learning?',
        content: 'Introduction to Artificial Intelligence and Machine Learning concepts',
        duration: '45 minutes'
      },
      {
        id: 'data-science-workflow',
        title: 'Data Science Workflow',
        content: 'Complete data science process from problem definition to deployment',
        duration: '60 minutes'
      }
    ]
  },
  supervisedLearning: {
    id: 'supervisedLearning',
    title: 'Supervised Learning',
    description: 'Master classification and regression algorithms with hands-on implementation',
    topics: [
      {
        id: 'linear-regression',
        title: 'Linear Regression',
        content: 'Predicting continuous values using linear relationships',
        duration: '50 minutes'
      }
    ]
  },
  unsupervisedLearning: {
    id: 'unsupervisedLearning',
    title: 'Unsupervised Learning',
    description: 'Discover patterns in data without labels using clustering and dimensionality reduction',
    topics: [
      {
        id: 'clustering',
        title: 'Clustering Algorithms',
        content: 'K-means, hierarchical clustering, and DBSCAN',
        duration: '45 minutes'
      }
    ]
  },
  deepLearning: {
    id: 'deepLearning',
    title: 'Deep Learning',
    description: 'Neural networks, CNNs, RNNs, and modern deep learning architectures',
    topics: [
      {
        id: 'neural-networks',
        title: 'Neural Network Fundamentals',
        content: 'Perceptrons, backpropagation, and multi-layer networks',
        duration: '60 minutes'
      }
    ]
  },
  mlops: {
    id: 'mlops',
    title: 'MLOps & Deployment',
    description: 'Model deployment, monitoring, and production machine learning systems',
    topics: [
      {
        id: 'model-deployment',
        title: 'Model Deployment',
        content: 'Deploy ML models using Flask, FastAPI, and cloud platforms',
        duration: '55 minutes'
      }
    ]
  }
};

// GET /api/v1/learning/aiml - Get all AI/ML modules
router.get("/", authenticateToken, (req, res) => {
  try {
    const modules = Object.values(aimlModules);
    res.status(200).json({
      success: true,
      data: modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching AI/ML modules",
      error: error.message
    });
  }
});

// GET /api/v1/learning/aiml/:moduleId - Get specific module content
router.get("/:moduleId", authenticateToken, (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = aimlModules[moduleId];
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: "Module not found"
      });
    }
    
    res.status(200).json({
      success: true,
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching module content",
      error: error.message
    });
  }
});

// POST /api/v1/learning/aiml/notes/:topicId - Save notes for a topic
router.post("/notes/:topicId", authenticateToken, async (req, res) => {
  try {
    const { topicId } = req.params;
    const { notes, moduleId } = req.body;
    const userId = req.user.id;
    
    // Update or create notes
    const savedNotes = await Notes.findOneAndUpdate(
      { userId, topicId },
      { userId, topicId, moduleId, notes },
      { upsert: true, new: true }
    );
    
    res.status(200).json({
      success: true,
      message: "Notes saved successfully",
      data: savedNotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving notes",
      error: error.message
    });
  }
});

// POST /api/v1/learning/aiml/reviews/:topicId - Save rating/review for a topic
router.post("/reviews/:topicId", authenticateToken, async (req, res) => {
  try {
    const { topicId } = req.params;
    const { rating, comment, moduleId } = req.body;
    const userId = req.user.id;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }
    
    // Update or create review
    const savedReview = await Reviews.findOneAndUpdate(
      { userId, topicId },
      { userId, topicId, moduleId, rating, comment },
      { upsert: true, new: true }
    );
    
    res.status(200).json({
      success: true,
      message: "Review saved successfully",
      data: savedReview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving review",
      error: error.message
    });
  }
});

// PATCH /api/v1/learning/aiml/progress/:topicId - Update progress for a topic
router.patch("/progress/:topicId", authenticateToken, async (req, res) => {
  try {
    const { topicId } = req.params;
    const { status, moduleId, completionPercentage } = req.body;
    const userId = req.user.id;
    
    const validStatuses = ['not_started', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be: not_started, in_progress, or completed"
      });
    }
    
    // Update or create progress
    const savedProgress = await Progress.findOneAndUpdate(
      { userId, topicId },
      { 
        userId, 
        topicId, 
        moduleId, 
        status, 
        completionPercentage: completionPercentage || (status === 'completed' ? 100 : 0)
      },
      { upsert: true, new: true }
    );
    
    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      data: savedProgress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating progress",
      error: error.message
    });
  }
});

export default router;