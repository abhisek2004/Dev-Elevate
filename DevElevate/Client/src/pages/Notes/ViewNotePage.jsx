import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGlobalState } from "../../contexts/GlobalContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  ArrowLeft,
  Heart,
  Eye,
  Calendar,
  User,
  Tag,
  FileText,
  Download,
  Edit,
  Trash2,
} from "lucide-react";
import axiosInstance from "../../api/axiosinstance";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const ViewNotePage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { state: globalState } = useGlobalState();
  const { state: authState } = useAuth();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const darkMode = globalState.darkMode;
  const user = authState.user;

  useEffect(() => {
    fetchNote();
  }, [noteId]);

  const fetchNote = async () => {
    try {
      setLoading(true);
      console.log("Fetching note:", noteId);
      
      const response = await axiosInstance.get(`/api/notes/${noteId}`);
      console.log("Note response:", response.data);

      if (response.data.success) {
        const fetchedNote = response.data.note;
        setNote(fetchedNote);
        
        // Check ownership
        if (user) {
          const currentUserId = user.id || user._id || user.userId;
          const noteOwnerId = fetchedNote.userId?._id || 
                             fetchedNote.userId?.id || 
                             fetchedNote.userId;
          
          console.log("Ownership check:", {
            currentUserId,
            noteOwnerId,
            match: currentUserId?.toString() === noteOwnerId?.toString()
          });
          
          setIsOwner(currentUserId?.toString() === noteOwnerId?.toString());
        }
      }
    } catch (error) {
      console.error("Fetch note error:", error);
      
      if (error.response?.status === 403) {
        toast.error("This is a private note. You don't have permission to view it.");
        navigate("/notes");
      } else if (error.response?.status === 404) {
        toast.error("Note not found");
        navigate("/notes");
      } else {
        toast.error("Failed to load note");
        navigate("/notes");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like notes");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/api/notes/${noteId}/like`,
        {}
      );

      if (response.data.success) {
        setNote((prev) => ({
          ...prev,
          liked: response.data.liked,
          likeCount: response.data.likeCount,
        }));
      }
    } catch (error) {
      console.error("Like error:", error);
      toast.error("Failed to like note");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      const response = await axiosInstance.delete(`/api/notes/${noteId}`);

      if (response.data.success) {
        toast.success("Note deleted successfully");
        navigate("/notes");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleDownload = (fileUrl, fileName) => {
    const baseURL = axiosInstance.defaults.baseURL || "http://localhost:5000";
    const link = document.createElement("a");
    link.href = `${baseURL}${fileUrl}`;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <div
      className={`relative min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Background */}
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${
          darkMode ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-gradient-to-br from-gray-900/90 via-transparent to-gray-900/50"
              : "bg-gradient-to-br from-white/90 via-transparent to-white/50"
          }`}
        ></div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-4xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/notes")}
          className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-colors ${
            darkMode
              ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Notes
        </motion.button>

        {/* Note Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl overflow-hidden ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          } border shadow-xl`}
        >
          {/* Header */}
          <div className={`p-8 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
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
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      darkMode
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {note.topicName}
                  </span>
                </div>
                <h1
                  className={`text-3xl md:text-4xl font-bold mb-4 ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {note.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
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
                          className={`w-6 h-6 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-gray-200" : "text-gray-900"
                        }`}
                      >
                        {note.userId?.name || "Anonymous"}
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {note.userId?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div
                    className={`flex items-center gap-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    {new Date(note.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div
                    className={`flex items-center gap-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    {note.views} views
                  </div>
                  <button
                    onClick={handleLike}
                    disabled={!user}
                    className={`flex items-center gap-2 transition-colors ${
                      note.liked
                        ? "text-red-500"
                        : darkMode
                        ? "text-gray-400 hover:text-red-400"
                        : "text-gray-600 hover:text-red-600"
                    } ${!user && "opacity-50 cursor-not-allowed"}`}
                  >
                    <Heart
                      className={`w-4 h-4 ${note.liked ? "fill-current" : ""}`}
                    />
                    {note.likeCount || 0} likes
                  </button>
                </div>
              </div>

              {/* Actions */}
              {isOwner && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/notes/edit/${noteId}`)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-blue-400"
                        : "bg-gray-100 hover:bg-gray-200 text-blue-600"
                    }`}
                    title="Edit note"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "bg-gray-700 hover:bg-red-900/30 text-red-400"
                        : "bg-gray-100 hover:bg-red-50 text-red-600"
                    }`}
                    title="Delete note"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Tags */}
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium ${
                      darkMode
                        ? "bg-blue-900/30 text-blue-400"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <div
              className={`prose prose-lg max-w-none ${
                darkMode ? "prose-invert" : ""
              }`}
            >
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
          </div>

          {/* Files */}
          {note.files && note.files.length > 0 && (
            <div
              className={`p-8 border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Attached Files
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {note.files.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText
                        className={`w-8 h-8 flex-shrink-0 ${
                          darkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={`font-medium truncate ${
                            darkMode ? "text-gray-200" : "text-gray-900"
                          }`}
                        >
                          {file.originalFileName}
                        </p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {(file.fileSize / 1024 / 1024).toFixed(2)} MB •{" "}
                          {file.fileType.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleDownload(file.fileUrl, file.originalFileName)
                      }
                      className={`p-2 rounded-lg transition-colors flex-shrink-0 ml-2 ${
                        darkMode
                          ? "bg-gray-600 hover:bg-gray-500 text-gray-200"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      }`}
                      title="Download file"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ViewNotePage;