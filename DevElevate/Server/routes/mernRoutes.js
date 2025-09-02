import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import Notes from "../model/Notes.js";
import Reviews from "../model/Reviews.js";
import Progress from "../model/Progress.js";

const router = express.Router();

// MERN module content
const mernModules = {
  html: {
    id: 'html',
    title: 'HTML5 Fundamentals',
    description: 'Master semantic HTML, forms, accessibility, and modern HTML5 features',
    topics: [
      {
        id: 'html-basics',
        title: 'HTML Structure & Semantics',
        content: 'HTML5 structure and semantic elements fundamentals',
        duration: '45 minutes'
      },
      {
        id: 'forms-accessibility',
        title: 'Forms & Accessibility',
        content: 'Advanced forms and web accessibility best practices',
        duration: '60 minutes'
      }
    ]
  },
  css: {
    id: 'css',
    title: 'CSS3 & Styling',
    description: 'Master modern CSS including Flexbox, Grid, animations, and responsive design',
    topics: [
      {
        id: 'css-fundamentals',
        title: 'CSS Fundamentals & Selectors',
        content: 'CSS basics, selectors, and styling fundamentals',
        duration: '50 minutes'
      },
      {
        id: 'flexbox-grid',
        title: 'Flexbox & CSS Grid',
        content: 'Modern layout techniques with Flexbox and CSS Grid',
        duration: '70 minutes'
      }
    ]
  },
  javascript: {
    id: 'javascript',
    title: 'JavaScript ES6+',
    description: 'Modern JavaScript fundamentals, ES6+ features, DOM manipulation, and async programming',
    topics: [
      {
        id: 'js-fundamentals',
        title: 'JavaScript Fundamentals',
        content: 'Variables, functions, objects, and ES6+ features',
        duration: '80 minutes'
      },
      {
        id: 'dom-events',
        title: 'DOM Manipulation & Events',
        content: 'Working with the DOM and handling user events',
        duration: '60 minutes'
      }
    ]
  },
  react: {
    id: 'react',
    title: 'React.js',
    description: 'Build modern user interfaces with React components, hooks, and state management',
    topics: [
      {
        id: 'react-basics',
        title: 'React Components & JSX',
        content: 'Components, JSX, props, and React fundamentals',
        duration: '90 minutes'
      },
      {
        id: 'hooks-state',
        title: 'Hooks & State Management',
        content: 'useState, useEffect, and modern React patterns',
        duration: '100 minutes'
      }
    ]
  },
  nodejs: {
    id: 'nodejs',
    title: 'Node.js & Express',
    description: 'Server-side JavaScript with Node.js, Express framework, and REST API development',
    topics: [
      {
        id: 'nodejs-basics',
        title: 'Node.js & Express Fundamentals',
        content: 'Server setup, routing, middleware, and REST APIs',
        duration: '85 minutes'
      },
      {
        id: 'api-development',
        title: 'REST API Development',
        content: 'Building robust APIs with authentication and validation',
        duration: '95 minutes'
      }
    ]
  },
  mongodb: {
    id: 'mongodb',
    title: 'MongoDB & Database',
    description: 'NoSQL database fundamentals, MongoDB operations, and Mongoose ODM',
    topics: [
      {
        id: 'mongodb-basics',
        title: 'MongoDB Fundamentals',
        content: 'NoSQL concepts, CRUD operations, and Mongoose ODM',
        duration: '75 minutes'
      },
      {
        id: 'data-modeling',
        title: 'Data Modeling & Relationships',
        content: 'Schema design, relationships, and advanced queries',
        duration: '80 minutes'
      }
    ]
  }
};

// GET /api/v1/learning/mern - Get all MERN modules
router.get("/", authenticateToken, (req, res) => {
  try {
    const modules = Object.values(mernModules);
    res.status(200).json({
      success: true,
      data: modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching MERN modules",
      error: error.message
    });
  }
});

// GET /api/v1/learning/mern/:moduleId - Get specific module content
router.get("/:moduleId", authenticateToken, (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = mernModules[moduleId];
    
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

// POST /api/v1/learning/mern/notes/:topicId - Save notes for a topic
router.post("/notes/:topicId", authenticateToken, async (req, res) => {
  try {
    const { topicId } = req.params;
    const { notes, moduleId } = req.body;
    const userId = req.user.id;
    
    // Update or create notes
    const savedNotes = await Notes.findOneAndUpdate(
      { userId, topicId },
      { userId, topicId, moduleId, notes, subject: 'mern' },
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

// GET /api/v1/learning/mern/notes/:topicId - Get notes for a topic
router.get("/notes/:topicId", authenticateToken, async (req, res) => {
  try {
    const { topicId } = req.params;
    const userId = req.user.id;
    
    const notes = await Notes.findOne({ userId, topicId });
    
    res.status(200).json({
      success: true,
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notes",
      error: error.message
    });
  }
});

// POST /api/v1/learning/mern/reviews/:topicId - Save rating/review for a topic
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
      { userId, topicId, moduleId, rating, comment, subject: 'mern' },
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

// GET /api/v1/learning/mern/reviews/:topicId - Get reviews for a topic
router.get("/reviews/:topicId", authenticateToken, async (req, res) => {
  try {
    const { topicId } = req.params;
    
    const reviews = await Reviews.find({ topicId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message
    });
  }
});

// PATCH /api/v1/learning/mern/progress/:topicId - Update progress for a topic
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
        completionPercentage: completionPercentage || (status === 'completed' ? 100 : 0),
        subject: 'mern'
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

// GET /api/v1/learning/mern/progress/:userId - Get user's progress across all MERN topics
router.get("/progress/user/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Ensure user can only access their own progress or admin access
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }
    
    const progress = await Progress.find({ userId, subject: 'mern' });
    
    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching progress",
      error: error.message
    });
  }
});

// GET /api/v1/learning/mern/stats - Get MERN learning statistics
router.get("/stats", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's progress
    const userProgress = await Progress.find({ userId, subject: 'mern' });
    
    // Calculate statistics
    const totalTopics = Object.values(mernModules).reduce((acc, module) => acc + module.topics.length, 0);
    const completedTopics = userProgress.filter(p => p.status === 'completed').length;
    const inProgressTopics = userProgress.filter(p => p.status === 'in_progress').length;
    
    // Get user's reviews
    const userReviews = await Reviews.find({ userId, subject: 'mern' });
    const averageRating = userReviews.length > 0 
      ? userReviews.reduce((acc, review) => acc + review.rating, 0) / userReviews.length 
      : 0;
    
    const stats = {
      totalTopics,
      completedTopics,
      inProgressTopics,
      notStartedTopics: totalTopics - completedTopics - inProgressTopics,
      completionPercentage: Math.round((completedTopics / totalTopics) * 100),
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: userReviews.length
    };
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message
    });
  }
});

export default router;