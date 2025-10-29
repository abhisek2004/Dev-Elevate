import Notes from "../model/Notes.js";
import User from "../model/UserModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads/notes");
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF and DOCX files are allowed."), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

// Helper function to populate user data consistently
const populateUserData = (query) => {
  return query.populate({
    path: "userId",
    select: "name email profilePicture bio socialLinks level streak totalPoints joinDate",
    model: "User"
  });
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content, topicName, tags, isPublic } = req.body;
    
    console.log("\n=== CREATE NOTE DEBUG ===");
    console.log("Request body:", req.body);
    console.log("Files:", req.files);
    
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const userFromDB = await User.findById(userId).select("name email profilePicture bio");
    
    if (!userFromDB) {
      console.error("❌ User not found in database:", userId);
      return res.status(404).json({
        success: false,
        message: "User not found in database",
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    // Generate topicId from topicName if not provided
    const topicId = topicName ? topicName.toLowerCase().replace(/\s+/g, '-') : 'general';

    // Process tags
    let tagsArray = [];
    if (tags) {
      // Handle both JSON string and comma-separated string
      if (typeof tags === 'string') {
        if (tags.startsWith('[')) {
          tagsArray = JSON.parse(tags);
        } else {
          tagsArray = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);
        }
      } else if (Array.isArray(tags)) {
        tagsArray = tags;
      }
    }

    // Process uploaded files
    const filesData = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const fileType = path.extname(file.originalname).substring(1).toLowerCase();
        filesData.push({
          originalFileName: file.originalname,
          fileUrl: `/uploads/notes/${file.filename}`,
          fileType: fileType,
          fileSize: file.size,
        });
      });
    }

    // Create note
    const newNote = new Notes({
      userId: userId,
      title,
      content,
      topicId,
      topicName: topicName || 'General',
      tags: tagsArray,
      isPublic: isPublic === "true" || isPublic === true,
      files: filesData,
    });

    await newNote.save();
    console.log("✅ Note saved with ID:", newNote._id);

    const populatedNote = await populateUserData(Notes.findById(newNote._id)).lean();

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: populatedNote,
    });
  } catch (error) {
    console.error("❌ Create note error:", error);
    console.error("Error stack:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Failed to create note",
      error: error.message,
    });
  }
};

// Get all notes by a user
export const getMyNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    
    console.log("=== GET MY NOTES DEBUG ===");
    console.log("Fetching notes for user:", userId);

    const notes = await populateUserData(
      Notes.find({ userId }).sort({ createdAt: -1 })
    ).lean();

    console.log(`✅ Found ${notes.length} notes`);
    
    // Log the first note to verify population
    if (notes.length > 0) {
      console.log("First note sample:", {
        id: notes[0]._id,
        title: notes[0].title,
        userId: notes[0].userId,
        userIdType: typeof notes[0].userId,
        userName: notes[0].userId?.name || "NO NAME FOUND"
      });
    }

    // Add liked status for each note
    const notesWithLikeStatus = notes.map(note => ({
      ...note,
      liked: note.likes?.some(id => id.toString() === userId.toString()) || false,
      likeCount: note.likes?.length || 0,
    }));

    return res.status(200).json({
      success: true,
      notes: notesWithLikeStatus,
      count: notesWithLikeStatus.length,
    });
  } catch (error) {
    console.error("❌ Get my notes error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
};

// Get all public notes
export const getPublicNotes = async (req, res) => {
  try {
    console.log("=== GET PUBLIC NOTES DEBUG ===");
    
    const notes = await populateUserData(
      Notes.find({ isPublic: true }).sort({ createdAt: -1 })
    ).lean();

    console.log(`✅ Found ${notes.length} public notes`);
    
    if (notes.length > 0) {
      console.log("First public note:", {
        id: notes[0]._id,
        title: notes[0].title,
        userId: notes[0].userId,
        userName: notes[0].userId?.name || "NO NAME FOUND"
      });
    }

    // Get the requesting user's ID if logged in
    const userId = req.user?._id;
    
    // Add liked status if user is logged in
    const notesWithLikeStatus = notes.map(note => ({
      ...note,
      liked: userId ? note.likes?.some(id => id.toString() === userId.toString()) : false,
      likeCount: note.likes?.length || 0,
    }));

    return res.status(200).json({
      success: true,
      notes: notesWithLikeStatus,
      count: notesWithLikeStatus.length,
    });
  } catch (error) {
    console.error("❌ Get public notes error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch public notes",
      error: error.message,
    });
  }
};

// Get notes by topic
export const getNotesByTopic = async (req, res) => {
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

    const notes = await populateUserData(
      Notes.find(query).sort({ createdAt: -1 })
    ).lean();

    const notesWithLikeStatus = notes.map(note => ({
      ...note,
      liked: userId ? note.likes?.some(id => id.toString() === userId.toString()) : false,
      likeCount: note.likes?.length || 0,
    }));

    return res.status(200).json({
      success: true,
      notes: notesWithLikeStatus,
      count: notesWithLikeStatus.length,
    });
  } catch (error) {
    console.error("Get notes by topic error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
};

// Get a single note by ID
export const getNoteById = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user?._id;

    const note = await populateUserData(Notes.findById(noteId)).lean();

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Check if user has permission to view
    if (!note.isPublic && (!userId || note.userId._id.toString() !== userId.toString())) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view this note",
      });
    }

    // Increment views
    await Notes.findByIdAndUpdate(noteId, { $inc: { views: 1 } });

    // Check if user liked this note
    const liked = userId ? note.likes?.some(id => id.toString() === userId.toString()) : false;

    return res.status(200).json({
      success: true,
      note: {
        ...note,
        views: note.views + 1,
        liked,
        likeCount: note.likes?.length || 0,
      },
    });
  } catch (error) {
    console.error("Get note by ID error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch note",
      error: error.message,
    });
  }
};

// Update a note
export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, content, tags, isPublic } = req.body;
    const userId = req.user._id;

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
        message: "You don't have permission to update this note",
      });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (isPublic !== undefined) note.isPublic = isPublic === "true" || isPublic === true;

    if (tags !== undefined) {
      note.tags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const fileType = path.extname(file.originalname).substring(1).toLowerCase();
        note.files.push({
          originalFileName: file.originalname,
          fileUrl: `/uploads/notes/${file.filename}`,
          fileType: fileType,
          fileSize: file.size,
        });
      });
    }

    await note.save();
    
    const updatedNote = await populateUserData(Notes.findById(noteId)).lean();

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Update note error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update note",
      error: error.message,
    });
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

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
        message: "You don't have permission to delete this note",
      });
    }

    if (note.files && note.files.length > 0) {
      note.files.forEach((file) => {
        const filePath = path.join(__dirname, "..", file.fileUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await Notes.findByIdAndDelete(noteId);

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete note error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error: error.message,
    });
  }
};

// Like/Unlike a note
export const likeNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    const note = await Notes.findById(noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    const likeIndex = note.likes.findIndex(
      (id) => id.toString() === userId.toString()
    );

    let liked;
    if (likeIndex === -1) {
      note.likes.push(userId);
      liked = true;
    } else {
      note.likes.splice(likeIndex, 1);
      liked = false;
    }

    await note.save();

    return res.status(200).json({
      success: true,
      liked,
      likeCount: note.likes.length,
    });
  } catch (error) {
    console.error("Like note error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to like/unlike note",
      error: error.message,
    });
  }
};

// Delete a file from a note
export const deleteNoteFile = async (req, res) => {
  try {
    const { noteId, fileId } = req.params;
    const userId = req.user._id;

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
    const filePath = path.join(__dirname, "..", file.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    note.files.splice(fileIndex, 1);
    await note.save();

    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Delete note file error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete file",
      error: error.message,
    });
  }
};

// Search notes
export const searchNotes = async (req, res) => {
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

    const notes = await populateUserData(
      Notes.find(searchQuery).sort({ createdAt: -1 }).limit(50)
    ).lean();

    const notesWithLikeStatus = notes.map(note => ({
      ...note,
      liked: userId ? note.likes?.some(id => id.toString() === userId.toString()) : false,
      likeCount: note.likes?.length || 0,
    }));

    return res.status(200).json({
      success: true,
      notes: notesWithLikeStatus,
      count: notesWithLikeStatus.length,
    });
  } catch (error) {
    console.error("Search notes error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search notes",
      error: error.message,
    });
  }
};