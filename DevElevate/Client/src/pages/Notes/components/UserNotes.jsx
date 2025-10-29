import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGlobalState } from "../../contexts/GlobalContext";
import {
    Plus,
    Search,
    Filter,
    Heart,
    Eye,
    Download,
    Edit2,
    Trash2,
    Lock,
    Unlock,
    FileText,
    Tag,
    Calendar,
    User,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import CreateNoteModal from "./CreateNoteModal";

const UserNotes = () => {
    const { state } = useGlobalState();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all"); // all, public, private
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    // At the top of UserNotes component
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    useEffect(() => {
        fetchNotes();
    }, [filter]);

    // UPDATE THE fetchNotes FUNCTION IN UserNotesGrid.jsx


    const fetchNotes = async () => {
        try {
            setLoading(true);

            // ✅ Check if user is logged in
            if (!state.user) {
                // If not logged in, only show public notes
                const response = await axios.get(`${API_URL}/api/notes/public`);
                setNotes(response.data.notes || []);
                setLoading(false);
                return;
            }

            if (filter === "all") {
                // Fetch both public notes and user's notes
                const [publicResponse, myNotesResponse] = await Promise.all([
                    axios.get(`${API_URL}/api/notes/public`),
                    axios.get(`${API_URL}/api/notes/my-notes`, {
                        withCredentials: true,
                    }),
                ]);

                const publicNotes = publicResponse.data.notes || [];
                const myNotes = myNotesResponse.data.notes || [];

                console.log("Public notes:", publicNotes.length);
                console.log("My notes:", myNotes.length);

                // Combine and deduplicate
                const myNoteIds = new Set(myNotes.map((n) => n._id));
                const uniquePublicNotes = publicNotes.filter(
                    (n) => !myNoteIds.has(n._id)
                );
                setNotes([...myNotes, ...uniquePublicNotes]);
            } else if (filter === "public") {
                const response = await axios.get(`${API_URL}/api/notes/public`);
                setNotes(response.data.notes || []);
            } else if (filter === "private") {
                // ✅ CHANGED: Show ALL user's notes (both public and private)
                const response = await axios.get(`${API_URL}/api/notes/my-notes`, {
                    withCredentials: true,
                });
                const myNotes = response.data.notes || [];
                console.log("My all notes (public + private):", myNotes.length);
                // ✅ Don't filter - show all notes
                setNotes(myNotes);
            }
        } catch (error) {
            console.error("Fetch notes error:", error);
            console.error("Error details:", error.response?.data);
            if (error.response?.status === 401) {
                toast.error("Please login to view your notes");
                // If unauthorized, show only public notes
                try {
                    const response = await axios.get(`${API_URL}/api/notes/public`);
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

    const handleLike = async (noteId) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/notes/${noteId}/like`,
                {},
                { withCredentials: true }
            );

            if (response.data.success) {
                setNotes((prev) =>
                    prev.map((note) =>
                        note._id === noteId
                            ? {
                                ...note,
                                liked: response.data.liked,
                                likeCount: response.data.likeCount,
                            }
                            : note
                    )
                );
            }
        } catch (error) {
            console.error("Like note error:", error);
            toast.error("Failed to like note");
        }
    };

    const handleDelete = async (noteId) => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            const response = await axios.delete(`${API_URL}/api/notes/${noteId}`, {
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success("Note deleted successfully");
                fetchNotes();
            }
        } catch (error) {
            console.error("Delete note error:", error);
            toast.error("Failed to delete note");
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            fetchNotes();
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(
                `${API_URL}/api/notes/search?query=${searchQuery}`,
                { withCredentials: true }
            );
            setNotes(response.data.notes || []);
        } catch (error) {
            console.error("Search error:", error);
            toast.error("Failed to search notes");
        } finally {
            setLoading(false);
        }
    };

    const handleFileDownload = (fileUrl, fileName) => {
        const link = document.createElement("a");
        link.href = `${API_URL}${fileUrl}`;
        link.download = fileName;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const currentUserId = localStorage.getItem("userId");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
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

    return (
        <div>
            {/* Header with Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="w-full sm:w-auto">
                    <h2
                        className={`text-2xl sm:text-3xl font-righteous tracking-wider text-center sm:text-left ${state.darkMode ? "text-gray-100" : "text-gray-900"
                            }`}
                    >
                        Community Notes
                    </h2>
                    <p
                        className={`text-sm mt-1 text-center sm:text-left ${state.darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                    >
                        Explore notes shared by the community
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap justify-center">
                    {/* Filter Buttons */}
                    <div
                        className={`inline-flex p-1 rounded-lg ${state.darkMode ? "bg-gray-800" : "bg-gray-100"
                            }`}
                    >
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === "all"
                                    ? "bg-blue-600 text-white"
                                    : state.darkMode
                                        ? "text-gray-300 hover:text-gray-100"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("public")}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === "public"
                                    ? "bg-blue-600 text-white"
                                    : state.darkMode
                                        ? "text-gray-300 hover:text-gray-100"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Public
                        </button>
                        <button
                            onClick={() => setFilter("private")}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === "private"
                                    ? "bg-blue-600 text-white"
                                    : state.darkMode
                                        ? "text-gray-300 hover:text-gray-100"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            My Notes 
                        </button>
                    </div>

                    {/* Create Button */}
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="w-5 h-5" />
                        Create Note
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative flex gap-2">
                    <div className="relative flex-1">
                        <Search
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${state.darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            placeholder="Search notes by title, content, or tags..."
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all ${state.darkMode
                                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500"
                                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-600"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Notes Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : notes.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                >
                    <div
                        className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${state.darkMode ? "bg-gray-800" : "bg-gray-100"
                            }`}
                    >
                        <FileText
                            className={`w-10 h-10 ${state.darkMode ? "text-gray-600" : "text-gray-400"
                                }`}
                        />
                    </div>
                    <h3
                        className={`text-xl font-semibold mb-2 ${state.darkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                    >
                        No notes found
                    </h3>
                    <p
                        className={`text-sm mb-6 ${state.darkMode ? "text-gray-500" : "text-gray-500"
                            }`}
                    >
                        Be the first to create a note and share your knowledge!
                    </p>
                    <button
                        onClick={() => setShowCreateModal(true)}
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
                        const isOwner = note.userId?._id === currentUserId;
                        const liked = note.liked || false;

                        return (
                            <motion.div
                                key={note._id}
                                className={`relative group overflow-hidden rounded-xl p-6 transition-all transform hover:-translate-y-1 border ${state.darkMode
                                        ? "bg-gray-800 border-gray-700 hover:bg-gray-750 hover:shadow-xl"
                                        : "bg-white border-gray-200 hover:bg-gray-50 hover:shadow-lg"
                                    }`}
                                variants={item}
                            >
                                {/* Privacy Badge */}
                                <div className="absolute top-3 right-3">
                                    <span
                                        className={`px-2 py-1 rounded-md text-xs font-medium ${note.isPublic
                                                ? state.darkMode
                                                    ? "bg-green-900/30 text-green-400"
                                                    : "bg-green-100 text-green-700"
                                                : state.darkMode
                                                    ? "bg-orange-900/30 text-orange-400"
                                                    : "bg-orange-100 text-orange-700"
                                            }`}
                                    >
                                        {note.isPublic ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                    </span>
                                </div>

                                {/* User Info */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${state.darkMode ? "bg-gray-700" : "bg-gray-200"
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
                                                className={`w-5 h-5 ${state.darkMode ? "text-gray-400" : "text-gray-500"
                                                    }`}
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={`text-sm font-medium truncate ${state.darkMode ? "text-gray-200" : "text-gray-900"
                                                }`}
                                        >
                                            {note.userId?.name || "Anonymous"}
                                        </p>
                                        <p
                                            className={`text-xs truncate ${state.darkMode ? "text-gray-500" : "text-gray-500"
                                                }`}
                                        >
                                            {note.topicName}
                                        </p>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3
                                    className={`text-lg font-bold mb-3 line-clamp-2 ${state.darkMode ? "text-gray-100" : "text-gray-900"
                                        }`}
                                >
                                    {note.title}
                                </h3>

                                {/* Content Preview */}
                                <p
                                    className={`text-sm mb-4 line-clamp-3 ${state.darkMode ? "text-gray-400" : "text-gray-600"
                                        }`}
                                >
                                    {note.content.substring(0, 150)}...
                                </p>

                                {/* Tags */}
                                {note.tags && note.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {note.tags.slice(0, 3).map((tag, index) => (
                                            <span
                                                key={index}
                                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${state.darkMode
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
                                                className={`px-2 py-1 rounded-md text-xs ${state.darkMode ? "text-gray-500" : "text-gray-500"
                                                    }`}
                                            >
                                                +{note.tags.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Files */}
                                {note.files && note.files.length > 0 && (
                                    <div className="mb-4">
                                        <div
                                            className={`flex items-center gap-2 text-xs ${state.darkMode ? "text-gray-400" : "text-gray-600"
                                                }`}
                                        >
                                            <FileText className="w-4 h-4" />
                                            <span>{note.files.length} file(s) attached</span>
                                        </div>
                                    </div>
                                )}

                                {/* Stats */}
                                <div
                                    className={`flex items-center justify-between pt-4 border-t ${state.darkMode ? "border-gray-700" : "border-gray-200"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => handleLike(note._id)}
                                            className={`flex items-center gap-1 text-sm transition-colors ${liked
                                                    ? "text-red-500"
                                                    : state.darkMode
                                                        ? "text-gray-400 hover:text-red-400"
                                                        : "text-gray-600 hover:text-red-600"
                                                }`}
                                        >
                                            <Heart
                                                className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
                                            />
                                            <span>{note.likeCount || 0}</span>
                                        </button>
                                        <div
                                            className={`flex items-center gap-1 text-sm ${state.darkMode ? "text-gray-400" : "text-gray-600"
                                                }`}
                                        >
                                            <Eye className="w-4 h-4" />
                                            <span>{note.views || 0}</span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/notes/view/${note._id}`}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${state.darkMode
                                                ? "bg-gray-700 text-blue-400 hover:bg-gray-600"
                                                : "bg-gray-100 text-blue-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        View
                                    </Link>
                                </div>

                                {/* Date */}
                                <div
                                    className={`flex items-center gap-1 mt-3 text-xs ${state.darkMode ? "text-gray-500" : "text-gray-500"
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

                                {/* Owner Actions */}
                                {isOwner && (
                                    <div className="flex gap-2 mt-4">
                                        <Link
                                            to={`/notes/edit/${note._id}`}
                                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${state.darkMode
                                                    ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                                                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                                }`}
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(note._id)}
                                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${state.darkMode
                                                    ? "bg-red-900/30 hover:bg-red-900/50 text-red-400"
                                                    : "bg-red-50 hover:bg-red-100 text-red-600"
                                                }`}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <CreateNoteModal
                    isOpen={showCreateModal}
                    onClose={() => {
                        setShowCreateModal(false);
                        setSelectedNote(null);
                    }}
                    selectedTopic={selectedNote}
                    onSuccess={() => {
                        setShowCreateModal(false);
                        setSelectedNote(null);
                        fetchNotes();
                    }}
                />
            )}
        </div>
    );
};

export default UserNotes;