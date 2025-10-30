import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { FileText, Link2, Plus, Sparkles, Loader2, Calendar, Tag, Eye, Trash2 } from "lucide-react";
import NotesData from "./NotesData";
import { AIService } from "../../services/aiService";
import { searchNotes } from "../../utils/searchNotes";
import CreateNoteModal from "./components/CreateNoteModal";
import UserNotesGrid from "./components/UserNotesGrid";
import AINoteGeneratorModal from "./components/AINoteGeneratorModal";
import axiosInstance from "../../api/axiosinstance";
import { toast } from "sonner"; // ✅ Changed to Sonner

const NotesPage = () => {
  const { state } = useGlobalState();
  const [searchQuery, setSearchQuery] = useState("");
  const [summaries, setSummaries] = useState({});
  const [loadingSummary, setLoadingSummary] = useState({});
  const [activeTab, setActiveTab] = useState("admin");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [aiNotes, setAiNotes] = useState([]);
  const [loadingAiNotes, setLoadingAiNotes] = useState(false);

  const filteredAdminNotes = searchQuery
    ? searchNotes(searchQuery, NotesData)
    : NotesData;

  useEffect(() => {
    if (activeTab === "ai") {
      fetchAiNotes();
    }
  }, [activeTab]);

  const fetchAiNotes = async () => {
    setLoadingAiNotes(true);
    try {
      const response = await axiosInstance.get("/api/notes/ai-notes");
      if (response.data.success) {
        setAiNotes(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching AI notes:", error);
      if (error.response?.status !== 401) {
        toast.error("Failed to load AI notes");
      }
    } finally {
      setLoadingAiNotes(false);
    }
  };

  // ✅ Replace window.confirm with Sonner confirmation
  const deleteAiNote = async (noteId, noteTitle) => {
    toast.promise(
      new Promise((resolve, reject) => {
        toast.warning(
          <div>
            <p className="font-semibold">Delete "{noteTitle}"?</p>
            <p className="text-sm mt-1">This AI-generated note will be permanently removed.</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  toast.dismiss();
                  resolve(true);
                }}
                className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  toast.dismiss();
                  reject(new Error("Cancelled"));
                }}
                className="px-3 py-1.5 bg-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>,
          {
            duration: Infinity,
            closeButton: false,
          }
        );
      }).then(async () => {
        const response = await axiosInstance.delete(`/api/notes/${noteId}`);
        if (response.data.success) {
          setAiNotes(aiNotes.filter(note => note._id !== noteId));
          return response;
        }
        throw new Error("Failed to delete");
      }),
      {
        loading: "Deleting AI note...",
        success: "AI note deleted successfully!",
        error: (err) => {
          if (err.message === "Cancelled") return null;
          return "Failed to delete note";
        },
      }
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const generateSummary = async (noteId, content) => {
    setLoadingSummary((prev) => ({ ...prev, [noteId]: true }));
    const summary = await AIService.summarizeText(content);
    setSummaries((prev) => ({ ...prev, [noteId]: summary }));
    setLoadingSummary((prev) => ({ ...prev, [noteId]: false }));
  };

  const handleCreateNote = (topic) => {
    setSelectedTopic(topic);
    setShowCreateModal(true);
  };

  const titleAnimation = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const titleLine = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const contentAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const searchAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.4,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div
      className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${
        state.darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${
          state.darkMode ? "bg-grid-pattern-dark" : "bg-grid-pattern-light"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            state.darkMode
              ? "bg-gradient-to-br from-gray-900/90 via-transparent to-gray-900/50"
              : "bg-gradient-to-br from-white/90 via-transparent to-white/50"
          }`}
        ></div>
      </div>

      <div className="px-4 py-12 mx-auto max-w-7xl md:py-16 lg:py-20">
        <div className="mb-12 text-center">
          <div className="inline-block overflow-hidden">
            <motion.h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${
                state.darkMode ? "text-gray-100" : "text-gray-900"
              }`}
              initial="hidden"
              animate="visible"
              variants={titleAnimation}
            >
              Notes & Resources
            </motion.h1>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={titleLine}
              className={`h-1 rounded-full bg-gradient-to-r ${
                state.darkMode
                  ? "from-blue-500 via-blue-600 to-blue-500"
                  : "from-blue-600 via-blue-700 to-blue-600"
              }`}
            ></motion.div>
          </div>

          <motion.p
            className={`m-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              state.darkMode ? "text-gray-300" : "text-gray-600"
            }`}
            initial="hidden"
            animate="visible"
            variants={contentAnimation}
          >
            Access curated notes, study materials, and resources to enhance your
            learning journey.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={searchAnimation}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    state.darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search notes by name or content..."
                className={`w-full pl-12 pr-12 py-3 text-base rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
                  state.darkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400 focus:ring-blue-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-600"
                }`}
              />

              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center hover:opacity-70 transition-opacity ${
                    state.darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                  aria-label="Clear search"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {searchQuery && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-3 text-sm text-center ${
                  state.darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {filteredAdminNotes.length === 1
                  ? `Found 1 note matching "${searchQuery}"`
                  : `Found ${filteredAdminNotes.length} notes matching "${searchQuery}"`}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentAnimation}
            className="flex justify-center mb-8"
          >
            <div
              className={`inline-flex p-1 rounded-xl ${
                state.darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <button
                onClick={() => setActiveTab("admin")}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "admin"
                    ? state.darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-600 text-white"
                    : state.darkMode
                    ? "text-gray-300 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Admin Notes
              </button>
              <button
                onClick={() => setActiveTab("user")}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "user"
                    ? state.darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-600 text-white"
                    : state.darkMode
                    ? "text-gray-300 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                User Notes
              </button>
              <button
                onClick={() => setActiveTab("ai")}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === "ai"
                    ? state.darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-600 text-white"
                    : state.darkMode
                    ? "text-gray-300 hover:text-gray-100"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                AI Notes
              </button>
            </div>
          </motion.div>

          {activeTab === "admin" && (
            <>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={contentAnimation}
                className="flex flex-col items-center justify-between gap-4 mb-8 sm:flex-row"
              >
                <div className="w-full sm:w-auto">
                  <h2
                    className={`text-2xl sm:text-3xl font-righteous tracking-wider text-center sm:text-left ${
                      state.darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    Notes Topics
                  </h2>
                  <p
                    className={`text-sm mt-1 text-center sm:text-left ${
                      state.darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Browse through our collection of curated notes and resources
                  </p>
                </div>

                <div
                  className={`px-4 py-2 rounded-lg ${
                    state.darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-gray-100 border-gray-200"
                  } border`}
                >
                  <p
                    className={`text-sm font-medium flex items-center ${
                      state.darkMode ? "text-blue-500" : "text-blue-600"
                    }`}
                  >
                    <span
                      className={`mr-2 ${
                        state.darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Total Notes:
                    </span>
                    <span className="font-bold">
                      {filteredAdminNotes.length}
                    </span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={container}
              >
                {filteredAdminNotes.map((note, index) => {
                  const Icon = note.icon;
                  return (
                    <motion.div
                      key={index}
                      className={`relative group overflow-hidden rounded-xl p-6 transition-all transform hover:-translate-y-0.5 ${
                        state.darkMode
                          ? "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:shadow-lg"
                          : "bg-white border-gray-200 hover:bg-gray-50 hover:shadow-md"
                      } border`}
                      variants={item}
                    >
                      <div className="absolute top-3 right-3">
                        {note.customDocs ? (
                          <div
                            className={`p-1.5 rounded-lg ${
                              state.darkMode
                                ? "bg-green-900/30 text-green-400"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            <FileText className="w-4 h-4" />
                          </div>
                        ) : (
                          <div
                            className={`p-1.5 rounded-lg ${
                              state.darkMode
                                ? "bg-blue-900/30 text-blue-400"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            <Link2 className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4 space-x-4">
                          <div
                            className={`p-2 rounded-lg ${
                              state.darkMode ? "bg-gray-900/50" : "bg-gray-100"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                state.darkMode
                                  ? "text-blue-500"
                                  : "text-blue-600"
                              }`}
                            />
                          </div>
                          <h3
                            className={`text-lg font-semibold ${
                              state.darkMode ? "text-gray-100" : "text-gray-900"
                            }`}
                          >
                            {note.name}
                          </h3>
                        </div>

                        <p
                          className={`text-sm mb-6 line-clamp-3 ${
                            state.darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {note.content}
                        </p>

                        <div className="mt-auto">
                          <Link
                            to={note.link}
                            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              state.darkMode
                                ? "bg-gray-900/50 text-blue-500 hover:bg-gray-900/80"
                                : "bg-gray-100 text-blue-600 hover:bg-gray-200"
                            }`}
                          >
                            <span className="mr-2">
                              {note.customDocs ? "View Notes" : "View Resources"}
                            </span>
                            <span className="inline-block transition-transform group-hover:translate-x-1">
                              →
                            </span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </>
          )}

          {activeTab === "user" && (
            <UserNotesGrid onCreateNote={handleCreateNote} />
          )}

          {activeTab === "ai" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-gradient-to-br from-purple-500 to-blue-500">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    state.darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  AI-Powered Note Generation
                </h3>
                <p
                  className={`text-lg mb-8 max-w-2xl mx-auto ${
                    state.darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Use artificial intelligence to generate comprehensive study
                  notes on any topic instantly.
                </p>
                <button
                  onClick={() => {
                    console.log("🔥 AI Button clicked!");
                    setShowAIModal(true);
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
                >
                  <Sparkles className="w-6 h-6" />
                  Generate AI Notes
                </button>
              </div>

              {loadingAiNotes ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2
                    className={`w-8 h-8 animate-spin ${
                      state.darkMode ? "text-blue-500" : "text-blue-600"
                    }`}
                  />
                </div>
              ) : aiNotes.length > 0 ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h4
                      className={`text-xl font-semibold ${
                        state.darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      Your AI-Generated Notes ({aiNotes.length})
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {aiNotes.map((note) => (
                      <motion.div
                        key={note._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-6 rounded-xl border transition-all hover:shadow-lg ${
                          state.darkMode
                            ? "bg-gray-800 border-gray-700 hover:border-purple-500"
                            : "bg-white border-gray-200 hover:border-purple-400"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                state.darkMode
                                  ? "bg-purple-900/30 text-purple-400"
                                  : "bg-purple-100 text-purple-600"
                              }`}
                            >
                              AI Generated
                            </span>
                          </div>
                        </div>

                        <h5
                          className={`text-lg font-semibold mb-2 line-clamp-2 ${
                            state.darkMode ? "text-gray-100" : "text-gray-900"
                          }`}
                        >
                          {note.title}
                        </h5>

                        <p
                          className={`text-sm mb-4 line-clamp-3 ${
                            state.darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {note.content.substring(0, 150)}...
                        </p>

                        {note.tags && note.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {note.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                                  state.darkMode
                                    ? "bg-gray-700 text-gray-300"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                            {note.tags.length > 3 && (
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  state.darkMode
                                    ? "text-gray-400"
                                    : "text-gray-500"
                                }`}
                              >
                                +{note.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <div
                          className={`flex items-center gap-2 text-xs mb-4 ${
                            state.darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Calendar className="w-3 h-3" />
                          {new Date(note.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Link
                            to={`/notes/view/${note._id}`}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              state.darkMode
                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                : "bg-purple-600 text-white hover:bg-purple-700"
                            }`}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Link>
                          <button
                            onClick={() => deleteAiNote(note._id, note.title)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              state.darkMode
                                ? "bg-red-900/30 text-red-400 hover:bg-red-900/50"
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  className={`text-center py-12 px-4 rounded-xl border-2 border-dashed ${
                    state.darkMode ? "border-gray-700" : "border-gray-300"
                  }`}
                >
                  <FileText
                    className={`w-16 h-16 mx-auto mb-4 ${
                      state.darkMode ? "text-gray-600" : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`text-lg ${
                      state.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    No AI-generated notes yet. Click the button above to create
                    your first AI note!
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateNoteModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedTopic(null);
          }}
          selectedTopic={selectedTopic}
        />
      )}

      {showAIModal && (
        <AINoteGeneratorModal
          isOpen={showAIModal}
          onClose={() => {
            console.log("🔒 Closing AI modal");
            setShowAIModal(false);
          }}
          onSuccess={() => {
            console.log("✅ AI note saved successfully");
            setShowAIModal(false);
            fetchAiNotes();
            setActiveTab("ai");
          }}
          darkMode={state.darkMode}
        />
      )}
    </div>
  );
};

export default NotesPage;