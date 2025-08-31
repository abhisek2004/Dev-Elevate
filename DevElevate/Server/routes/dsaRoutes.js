import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import Notes from "../model/Notes.js";
import Reviews from "../model/Reviews.js";
import Progress from "../model/Progress.js";

const router = express.Router();

// DSA module content
const dsaModules = {
  arrays: {
    id: 'arrays',
    title: 'Arrays',
    description: 'Master array fundamentals, two pointers technique, and sliding window patterns for efficient problem solving',
    topics: [
      {
        id: 'array-basics',
        title: 'Array Basics',
        content: 'Array fundamentals and basic operations',
        duration: '45 minutes'
      },
      {
        id: 'two-pointers',
        title: 'Two Pointers',
        content: 'Two pointers technique for array problems',
        duration: '50 minutes'
      },
      {
        id: 'sliding-window',
        title: 'Sliding Window',
        content: 'Sliding window technique for subarray problems',
        duration: '55 minutes'
      }
    ]
  },
  strings: {
    id: 'strings',
    title: 'Strings',
    description: 'Master string manipulation, pattern matching, and advanced string algorithms',
    topics: [
      {
        id: 'string-manipulation',
        title: 'String Manipulation',
        content: 'Basic string operations and manipulations',
        duration: '40 minutes'
      },
      {
        id: 'pattern-matching',
        title: 'Pattern Matching',
        content: 'String pattern matching algorithms',
        duration: '60 minutes'
      },
      {
        id: 'kmp-algorithm',
        title: 'KMP Algorithm',
        content: 'Knuth-Morris-Pratt pattern matching algorithm',
        duration: '70 minutes'
      }
    ]
  },
  linkedlist: {
    id: 'linkedlist',
    title: 'Linked Lists',
    description: 'Master linked list operations, traversal, and advanced techniques',
    topics: [
      {
        id: 'singly-linked-list',
        title: 'Singly Linked List',
        content: 'Basic linked list operations and implementation',
        duration: '50 minutes'
      },
      {
        id: 'doubly-linked-list',
        title: 'Doubly Linked List',
        content: 'Doubly linked list implementation and operations',
        duration: '55 minutes'
      },
      {
        id: 'circular-linked-list',
        title: 'Circular Linked List',
        content: 'Circular linked list concepts and applications',
        duration: '45 minutes'
      }
    ]
  },
  trees: {
    id: 'trees',
    title: 'Trees',
    description: 'Master tree data structures, traversals, and tree algorithms',
    topics: [
      {
        id: 'binary-trees',
        title: 'Binary Trees',
        content: 'Binary tree fundamentals and operations',
        duration: '60 minutes'
      },
      {
        id: 'bst',
        title: 'BST',
        content: 'Binary Search Tree implementation and operations',
        duration: '65 minutes'
      },
      {
        id: 'tree-traversals',
        title: 'Tree Traversals',
        content: 'In-order, pre-order, post-order, and level-order traversals',
        duration: '50 minutes'
      },
      {
        id: 'avl-trees',
        title: 'AVL Trees',
        content: 'Self-balancing binary search trees',
        duration: '80 minutes'
      }
    ]
  },
  graphs: {
    id: 'graphs',
    title: 'Graphs',
    description: 'Master graph representations, traversals, and shortest path algorithms',
    topics: [
      {
        id: 'graph-representation',
        title: 'Graph Representation',
        content: 'Adjacency matrix and adjacency list representations',
        duration: '45 minutes'
      },
      {
        id: 'dfs',
        title: 'DFS',
        content: 'Depth-First Search algorithm and applications',
        duration: '55 minutes'
      },
      {
        id: 'bfs',
        title: 'BFS',
        content: 'Breadth-First Search algorithm and applications',
        duration: '55 minutes'
      },
      {
        id: 'shortest-path',
        title: 'Shortest Path',
        content: 'Dijkstra and Bellman-Ford shortest path algorithms',
        duration: '75 minutes'
      }
    ]
  },
  dp: {
    id: 'dp',
    title: 'Dynamic Programming',
    description: 'Master dynamic programming concepts, memoization, and classic DP problems',
    topics: [
      {
        id: 'memoization',
        title: 'Memoization',
        content: 'Top-down dynamic programming approach',
        duration: '60 minutes'
      },
      {
        id: 'tabulation',
        title: 'Tabulation',
        content: 'Bottom-up dynamic programming approach',
        duration: '65 minutes'
      },
      {
        id: 'classic-dp-problems',
        title: 'Classic DP Problems',
        content: 'Common dynamic programming problem patterns',
        duration: '90 minutes'
      }
    ]
  }
};

// GET /api/v1/learning/dsa - Get all DSA modules
router.get("/", authenticateToken, (req, res) => {
  try {
    const modules = Object.values(dsaModules);
    res.status(200).json({
      success: true,
      data: modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching DSA modules",
      error: error.message
    });
  }
});

// GET /api/v1/learning/dsa/:moduleId - Get specific module content
router.get("/:moduleId", authenticateToken, (req, res) => {
  try {
    const { moduleId } = req.params;
    const module = dsaModules[moduleId];
    
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

// POST /api/v1/learning/dsa/notes/:topicId - Save notes for a topic
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

// POST /api/v1/learning/dsa/reviews/:topicId - Save rating/review for a topic
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

// PATCH /api/v1/learning/dsa/progress/:topicId - Update progress for a topic
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