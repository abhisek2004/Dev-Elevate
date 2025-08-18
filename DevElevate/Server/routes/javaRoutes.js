import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import Notes from "../model/Notes.js";
import Reviews from "../model/Reviews.js";
import Progress from "../model/Progress.js";

const router = express.Router();

// Java module content
const javaModules = {
  basics: {
    id: 'basics',
    title: 'Java Basics',
    description: 'Learn Java fundamentals including JVM, syntax, variables, and data types',
    topics: [
      {
        id: 'jvm-jdk',
        title: 'JVM & JDK Setup',
        content: 'Java Virtual Machine and Java Development Kit fundamentals',
        duration: '30 minutes'
      },
      {
        id: 'variables-datatypes',
        title: 'Variables & Data Types',
        content: 'Primitive data types and variable declarations',
        duration: '45 minutes'
      }
    ]
  },
  controlFlow: {
    id: 'controlFlow',
    title: 'Control Flow & Loops',
    description: 'Master conditional statements and loops in Java',
    topics: [
      {
        id: 'conditionals',
        title: 'If-Else & Switch',
        content: 'Conditional statements and decision making',
        duration: '40 minutes'
      }
    ]
  },
  oop: {
    id: 'oop',
    title: 'Object-Oriented Programming',
    description: 'Learn OOP concepts: classes, objects, inheritance, polymorphism',
    topics: [
      {
        id: 'classes-objects',
        title: 'Classes & Objects',
        content: 'Object-oriented programming fundamentals',
        duration: '60 minutes'
      }
    ]
  },
  collections: {
    id: 'collections',
    title: 'Java Collections',
    description: 'Master ArrayList, HashMap, Set, and other collection frameworks',
    topics: [
      {
        id: 'arraylist',
        title: 'ArrayList & List Interface',
        content: 'Dynamic arrays and list operations',
        duration: '50 minutes'
      }
    ]
  },
  exceptions: {
    id: 'exceptions',
    title: 'Exception Handling & File I/O',
    description: 'Learn exception handling and file operations in Java',
    topics: [
      {
        id: 'try-catch',
        title: 'Try-Catch-Finally',
        content: 'Exception handling mechanisms',
        duration: '45 minutes'
      }
    ]
  }
};

// GET /api/v1/learning/java - Get all Java modules
router.get("/", authenticateToken, (req, res) => {
  try {
    const modules = Object.values(javaModules);
    res.status(200).json({
      success: true,
      data: modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Java modules",
      error: error.message
    });
  }
});

// GET /api/v1/learning/java/:moduleId - Get specific module content
router.get("/:moduleId", authenticateToken, (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = javaModules[moduleId];
    
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

// POST /api/v1/learning/java/notes/:topicId - Save notes for a topic
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

// POST /api/v1/learning/java/reviews/:topicId - Save rating/review for a topic
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

// PATCH /api/v1/learning/java/progress/:topicId - Update progress for a topic
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