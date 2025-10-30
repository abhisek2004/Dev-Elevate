import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../contexts/AuthContext";
import { useGlobalState } from "../../../contexts/GlobalContext";
import { Plus, Heart, Eye, FileText, Tag, Calendar, User, Trash2, Edit } from "lucide-react";
import axiosInstance from "../../../api/axiosinstance";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";

// Helper functions OUTSIDE component
const getUserId = (userObj) => {
  if (!userObj) return null;
  return userObj.id || userObj._id || userObj.userId || null;
};

const getNoteOwnerId = (note) => {
  if (!note || !note.userId) return null;
  if (typeof note.userId === 'string') return note.userId;
  return note.userId._id || note.userId.id || null;
};

const UserNotesGrid = ({ onCreateNote }) => {
  const { state: authState } = useAuth();
  const { state: globalState } = useGlobalState();
  
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deletingNoteId, setDeletingNoteId] = useState(null);

  const user = authState.user;
  const darkMode = globalState.darkMode;

  useEffect(() => {
    fetchNotes();
  }, [filter]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      
      if (!user) {
        const response = await axiosInstance.get(`/api/notes/public`);
        setNotes(response.data.notes || []);
        setLoading(false);
        return;
      }
      
      if (filter === "all") {
        const [publicResponse, myNotesResponse] = await Promise.all([
          axiosInstance.get(`/api/notes/public`),
          axiosInstance.get(`/api/notes/my-notes`),
        ]);

        const publicNotes = publicResponse.data.notes || [];
        const myNotes = myNotesResponse.data.notes || [];
        
        const myNoteIds = new Set(myNotes.map((n) => n._id));
        const uniquePublicNotes = publicNotes.filter(
          (n) => !myNoteIds.has(n._id)
        );
        setNotes([...myNotes, ...uniquePublicNotes]);
      } else if (filter === "public") {
        const response = await axiosInstance.get(`/api/notes/public`);
        setNotes(response.data.notes || []);
      } else if (filter === "private") {
        const response = await axiosInstance.get(`/api/notes/my-notes`);
        const myNotes = response.data.notes || [];
        setNotes(myNotes);
      }
    } catch (error) {
      console.error("Fetch notes error:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to view your notes");
        try {
          const response = await axiosInstance.get(`/api/notes/public`);
          setNotes(response.data.notes || []);
        } catch (err) {
          console.error("Failed to fetch public notes:", err);
        }
      } else {
        toast.error("Failed to fetch notes");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLikeNote = async (noteId) => {
    try {
      const response = await axiosInstance.post(`/api/notes/${noteId}/like`, {});

      if (response.data.success) {
        setNotes(prev =>
          prev.map(note =>
            note._id === noteId
              ? { ...note, likeCount: response.data.likeCount, liked: response.data.liked }
              : note
          )
        );
      }
    } catch (error) {
      console.error("Like note error:", error);
      toast.error("Failed to like note");
    }
  };

  const handleDeleteNote = async (noteId, noteTitle) => {
    // Show confirmation toast with custom buttons
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-gray-900">Delete Note?</p>
          <p className="text-sm text-gray-600 mt-1">
            Are you sure you want to delete "{noteTitle}"?
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              await performDelete(noteId);
            }}
            className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        maxWidth: '400px',
      }
    });
  };

  const performDelete = async (noteId) => {
    try {
      setDeletingNoteId(noteId);
      const response = await axiosInstance.delete(`/api/notes/${noteId}`);

      if (response.data.success) {
        toast.success("Note deleted successfully!");
        setNotes(prev => prev.filter(note => note._id !== noteId));
      }
    } catch (error) {
      console.error("Delete note error:", error);
      
      if (error.response?.status === 401) {
        toast.error("Please login to delete notes");
      } else if (error.response?.status === 403) {
        toast.error("You don't have permission to delete this note");
      } else if (error.response?.status === 404) {
        toast.error("Note not found");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete note");
      }
    } finally {
      setDeletingNoteId(null);
    }
  };

  const handleEditNote = (noteId, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/notes/edit/${noteId}`);
  };

  const isNoteOwner = (note) => {
    if (!user) return false;
    
    const currentUserId = getUserId(user);
    const noteOwnerId = getNoteOwnerId(note);
    
    if (!currentUserId || !noteOwnerId) return false;
    
    return currentUserId.toString() === noteOwnerId.toString();
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full sm:w-auto">
          <h2
            className={`text-2xl sm:text-3xl font-righteous tracking-wider text-center sm:text-left ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Community Notes
          </h2>
          <p
            className={`text-sm mt-1 text-center sm:text-left ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Explore notes shared by the community
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <div
            className={`inline-flex p-1 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "text-gray-300 hover:text-gray-100"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("public")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                filter === "public"
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "text-gray-300 hover:text-gray-100"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Public
            </button>
            <button
              onClick={() => setFilter("private")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                filter === "private"
                  ? "bg-blue-600 text-white"
                  : darkMode
                  ? "text-gray-300 hover:text-gray-100"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              My Notes
            </button>
          </div>

          <button
            onClick={() => onCreateNote(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-5 h-5" />
            Create Note
          </button>
        </div>
      </div>

      {notes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <FileText
              className={`w-10 h-10 ${
                darkMode ? "text-gray-600" : "text-gray-400"
              }`}
            />
          </div>
          <h3
            className={`text-xl font-semibold mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No notes found
          </h3>
          <p
            className={`text-sm mb-6 ${
              darkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Be the first to create a note and share your knowledge!
          </p>
          <button
            onClick={() => onCreateNote(null)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Create Your First Note
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {notes.map((note) => {
            const noteOwnership = isNoteOwner(note);
            const isAdmin = user?.role === "admin";
            const showActions = noteOwnership || isAdmin;

            return (
              <motion.div
                key={note._id}
                className={`relative group overflow-hidden rounded-xl transition-all transform hover:-translate-y-1 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-750 hover:shadow-xl"
                    : "bg-white border-gray-200 hover:bg-gray-50 hover:shadow-lg"
                } border`}
                variants={item}
              >
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      note.isPublic
                        ? darkMode
                          ? "bg-green-900/30 text-green-400"
                          : "bg-green-100 text-green-700"
                        : darkMode
                        ? "bg-orange-900/30 text-orange-400"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {note.isPublic ? "Public" : "Private"}
                  </span>
                </div>

                {showActions && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleEditNote(note._id, e)}
                        className={`p-1.5 rounded-md transition-all ${
                          darkMode
                            ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        }`}
                        title="Edit note"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteNote(note._id, note.title);
                        }}
                        disabled={deletingNoteId === note._id}
                        className={`p-1.5 rounded-md transition-all ${
                          deletingNoteId === note._id
                            ? "opacity-50 cursor-not-allowed"
                            : darkMode
                            ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                        title="Delete note"
                      >
                        {deletingNoteId === note._id ? (
                          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <h3
                    className={`text-xl font-bold mb-3 line-clamp-2 ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {note.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        darkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    >
                      {note.userId?.profilePicture ? (
                        <img
                          src={note.userId.profilePicture}
                          alt={note.userId.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User
                          className={`w-4 h-4 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium truncate ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {note.userId?.name || "Anonymous"}
                      </p>
                      <p
                        className={`text-xs truncate ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {note.topicName}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`text-sm mb-4 line-clamp-3 prose prose-sm max-w-none ${
                      darkMode ? "text-gray-400 prose-invert" : "text-gray-600"
                    }`}
                  >
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                  </div>

                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                            darkMode
                              ? "bg-blue-900/30 text-blue-400"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 3 && (
                        <span
                          className={`px-2 py-1 rounded-md text-xs ${
                            darkMode ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
                          +{note.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {note.files && note.files.length > 0 && (
                    <div className="mb-4">
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                        <span>{note.files.length} file(s) attached</span>
                      </div>
                    </div>
                  )}

                  <div
                    className={`flex items-center justify-between pt-4 border-t ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLikeNote(note._id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          note.liked
                            ? "text-red-500"
                            : darkMode
                            ? "text-gray-400 hover:text-red-400"
                            : "text-gray-600 hover:text-red-600"
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${note.liked ? "fill-current" : ""}`}
                        />
                        <span>{note.likeCount || 0}</span>
                      </button>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        <span>{note.views || 0}</span>
                      </div>
                    </div>

                    <Link
                      to={`/notes/view/${note._id}`}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        darkMode
                          ? "bg-gray-700 text-blue-400 hover:bg-gray-600"
                          : "bg-gray-100 text-blue-600 hover:bg-gray-200"
                      }`}
                    >
                      View
                    </Link>
                  </div>

                  <div
                    className={`flex items-center gap-1 mt-3 text-xs ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(note.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default UserNotesGrid;