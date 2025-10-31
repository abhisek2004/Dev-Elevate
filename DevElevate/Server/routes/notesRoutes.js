import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import Notes from "../model/Notes.js";
import { 
  upload
} from "../controller/notesController.js";

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// ✅ GET /api/notes/public - Get all public notes
router.get("/public", async (req, res) => {
  try {
    const notes = await Notes.find({ isPublic: true })
      .populate({
        path: "userId",
        select: "name email profilePicture"
      })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      notes: notes || []
    });
  } catch (error) {
    console.error("Error fetching public notes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch public notes",
      error: error.message
    });
  }
});

// ✅ GET /api/notes/search - Search notes
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user?._id;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const searchRegex = new RegExp(query, "i");

    const searchQuery = userId
      ? {
          $or: [
            { isPublic: true },
            { userId },
          ],
          $and: [
            {
              $or: [
                { title: searchRegex },
                { content: searchRegex },
                { tags: searchRegex },
              ],
            },
          ],
        }
      : {
          isPublic: true,
          $or: [
            { title: searchRegex },
            { content: searchRegex },
            { tags: searchRegex },
          ],
        };

    const notes = await Notes.find(searchQuery)
      .populate({
        path: "userId",
        select: "name email profilePicture"
      })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    res.json({
      success: true,
      notes: notes || [],
      count: notes.length
    });
  } catch (error) {
    console.error("Error searching notes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search notes",
      error: error.message
    });
  }
});

// ✅ GET /api/notes/topic/:topicId - Get notes by topic
router.get("/topic/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;
    const userId = req.user?._id;

    let query;
    if (topicId === "all") {
      query = { isPublic: true };
    } else {
      query = userId
        ? {
            $or: [
              { topicId, isPublic: true },
              { topicId, userId },
            ],
          }
        : { topicId, isPublic: true };
    }

    const notes = await Notes.find(query)
      .populate({
        path: "userId",
        select: "name email profilePicture"
      })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      notes: notes || [],
      count: notes.length
    });
  } catch (error) {
    console.error("Error fetching notes by topic:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notes by topic",
      error: error.message
    });
  }
});

// ============================================
// AUTHENTICATED ROUTES (Require login)
// ============================================

// ✅ GET /api/notes/my-notes - Get user's own notes
router.get("/my-notes", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const notes = await Notes.find({ userId })
      .populate({
        path: "userId",
        select: "name email profilePicture"
      })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      notes: notes || []
    });
  } catch (error) {
    console.error("Error fetching user notes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your notes",
      error: error.message
    });
  }
});

// ✅ GET /api/notes/ai-notes - Get AI-generated notes (MOVED HERE - BEFORE /:noteId)
router.get("/ai-notes", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    
    console.log("=== GET AI NOTES DEBUG ===");
    console.log("User ID:", userId);

    // ✅ Fixed: Changed Note to Notes, added isAiGenerated filter
    const notes = await Notes.find({
      userId: userId,
      isAiGenerated: true  // Only fetch AI-generated notes
    })
    .populate({
      path: "userId",
      select: "name email profilePicture bio"
    })
    .sort({ createdAt: -1 })
    .lean();

    console.log(`✅ Found ${notes.length} AI-generated notes`);

    res.json({
      success: true,
      notes: notes || []
    });
  } catch (error) {
    console.error("❌ Error fetching AI notes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch AI notes",
      error: error.message
    });
  }
});

// ✅ GET /api/notes/:noteId - Get single note by ID
router.get("/:noteId", authenticateToken, async (req, res) => {
  try {
    const { noteId } = req.params;
    
    // ✅ Get token (but don't fail if missing)
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    
    let userId = null;
    
    // ✅ Try to authenticate if token exists
    if (token) {
      try {
        const jwt = (await import('jsonwebtoken')).default;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId || decoded.id || decoded._id;
      } catch (error) {
        // Token invalid, but that's okay - continue as anonymous
        console.log("Token verification failed, continuing as anonymous");
      }
    }

    console.log("\n=== GET NOTE BY ID DEBUG ===");
    console.log("Note ID:", noteId);
    console.log("Requesting user ID:", userId);

    const note = await Notes.findById(noteId)
      .populate({
        path: "userId",
        select: "name email profilePicture bio socialLinks"
      })
      .lean();

    if (!note) {
      console.log("❌ Note not found");
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    console.log("📝 Note found:", {
      id: note._id,
      title: note.title,
      isPublic: note.isPublic,
      ownerId: note.userId?._id || note.userId
    });

    // Get the note owner's ID (handle both string and object)
    const noteOwnerId = typeof note.userId === 'string' 
      ? note.userId 
      : (note.userId?._id || note.userId?.id);

    console.log("🔍 Permission check:", {
      isPublic: note.isPublic,
      requestingUserId: userId?.toString(),
      noteOwnerId: noteOwnerId?.toString(),
      isOwner: userId && noteOwnerId && userId.toString() === noteOwnerId.toString()
    });

    // Check if user has permission to view
    const isPublic = note.isPublic === true;
    const isOwner = userId && noteOwnerId && userId.toString() === noteOwnerId.toString();

    if (!isPublic && !isOwner) {
      console.log("❌ Access denied - Private note, not owner");
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view this note",
      });
    }

    console.log("✅ Access granted");

    // Increment view count
    await Notes.findByIdAndUpdate(noteId, { $inc: { views: 1 } });

    // Check if user liked this note
    const liked = userId && note.likedBy 
      ? note.likedBy.some(id => id.toString() === userId.toString()) 
      : false;

    res.json({
      success: true,
      note: {
        ...note,
        views: (note.views || 0) + 1,
        liked,
        likeCount: note.likeCount || 0
      }
    });
  } catch (error) {
    console.error("❌ Error fetching note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch note",
      error: error.message
    });
  }
});

// ✅ POST /api/notes - Create new note (with file uploads)
router.post("/", authenticateToken, upload.array("files", 5), async (req, res) => {
  try {
    const { title, content, topicName, tags, isPublic, isAiGenerated } = req.body;
    const userId = req.user._id || req.user.id;

    console.log("Creating note with data:", { title, content, topicName, tags, isPublic, isAiGenerated });
    console.log("Files:", req.files);

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required"
      });
    }

    // Handle tags - parse if it's a JSON string
    let tagsArray = [];
    if (tags) {
      if (typeof tags === 'string') {
        if (tags.startsWith('[')) {
          tagsArray = JSON.parse(tags);
        } else {
          tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        }
      } else if (Array.isArray(tags)) {
        tagsArray = tags;
      }
    }

    // Process uploaded files
    const filesData = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const fileType = file.originalname.split('.').pop().toLowerCase();
        filesData.push({
          originalFileName: file.originalname,
          fileUrl: `/uploads/notes/${file.filename}`,
          fileType: fileType,
          fileSize: file.size,
        });
      });
    }

    // Generate topicId from topicName
    const topicId = topicName 
      ? topicName.toLowerCase().replace(/\s+/g, '-') 
      : 'general';

    const newNote = new Notes({
      userId,
      title,
      content,
      topicId,
      topicName: topicName || 'General',
      tags: tagsArray,
      isPublic: isPublic === "true" || isPublic === true,
      isAiGenerated: isAiGenerated === "true" || isAiGenerated === true || false, // ✅ ADDED
      files: filesData,
      likeCount: 0,
      views: 0
    });

    await newNote.save();

    const populatedNote = await Notes.findById(newNote._id)
      .populate({
        path: "userId",
        select: "name email profilePicture"
      })
      .lean();

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: populatedNote
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create note",
      error: error.message
    });
  }
});

// ✅ PUT /api/notes/:noteId - Update note (with file uploads)
router.put("/:noteId", authenticateToken, upload.array("files", 5), async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, topicName, tags, isPublic } = req.body;
    const userId = req.user._id || req.user.id;

    const note = await Notes.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    // Check ownership
    if (note.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to update this note"
      });
    }

    // Update fields
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (topicName !== undefined) {
      note.topicName = topicName;
      note.topicId = topicName.toLowerCase().replace(/\s+/g, '-');
    }
    
    // Handle tags
    if (tags !== undefined) {
      if (typeof tags === 'string') {
        if (tags.startsWith('[')) {
          note.tags = JSON.parse(tags);
        } else {
          note.tags = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        }
      } else if (Array.isArray(tags)) {
        note.tags = tags;
      }
    }
    
    if (isPublic !== undefined) {
      note.isPublic = isPublic === "true" || isPublic === true;
    }

    // Process uploaded files
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const fileType = file.originalname.split('.').pop().toLowerCase();
        note.files.push({
          originalFileName: file.originalname,
          fileUrl: `/uploads/notes/${file.filename}`,
          fileType: fileType,
          fileSize: file.size,
        });
      });
    }

    await note.save();

    const updatedNote = await Notes.findById(noteId)
      .populate({
        path: "userId",
        select: "name email profilePicture"
      })
      .lean();

    res.json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update note",
      error: error.message
    });
  }
});

// ✅ DELETE /api/notes/:noteId - Delete note
router.delete("/:noteId", authenticateToken, async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id || req.user.id;

    const note = await Notes.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    // Check ownership (or admin)
    const isOwner = note.userId.toString() === userId.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to delete this note"
      });
    }

    // Delete associated files from filesystem
    if (note.files && note.files.length > 0) {
      const fs = await import('fs');
      const path = await import('path');
      const { fileURLToPath } = await import('url');
      const { dirname } = await import('path');
      
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      
      note.files.forEach((file) => {
        const filePath = path.join(__dirname, "..", file.fileUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await Notes.findByIdAndDelete(noteId);

    res.json({
      success: true,
      message: "Note deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error: error.message
    });
  }
});

// ✅ POST /api/notes/:noteId/like - Like/unlike note
router.post("/:noteId/like", authenticateToken, async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id || req.user.id;

    const note = await Notes.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found"
      });
    }

    // Initialize likedBy array if it doesn't exist
    if (!note.likedBy) {
      note.likedBy = [];
    }

    const hasLiked = note.likedBy.some(id => id.toString() === userId.toString());

    if (hasLiked) {
      // Unlike
      note.likedBy = note.likedBy.filter(id => id.toString() !== userId.toString());
      note.likeCount = Math.max(0, (note.likeCount || 0) - 1);
    } else {
      // Like
      note.likedBy.push(userId);
      note.likeCount = (note.likeCount || 0) + 1;
    }

    await note.save();

    res.json({
      success: true,
      liked: !hasLiked,
      likeCount: note.likeCount
    });
  } catch (error) {
    console.error("Error liking note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to like note",
      error: error.message
    });
  }
});

// ✅ DELETE /api/notes/:noteId/files/:fileId - Delete file from note
router.delete("/:noteId/files/:fileId", authenticateToken, async (req, res) => {
  try {
    const { noteId, fileId } = req.params;
    const userId = req.user._id || req.user.id;

    const note = await Notes.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    if (note.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to modify this note",
      });
    }

    const fileIndex = note.files.findIndex(
      (file) => file._id.toString() === fileId
    );

    if (fileIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }

    const file = note.files[fileIndex];
    
    // Delete file from filesystem
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const { dirname } = await import('path');
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
    const filePath = path.join(__dirname, "..", file.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    note.files.splice(fileIndex, 1);
    await note.save();

    res.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note file:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete file",
      error: error.message,
    });
  }
});

export default router;