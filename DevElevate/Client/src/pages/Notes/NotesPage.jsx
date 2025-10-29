import { motion } from "framer-motion";
import { useState } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { FileText, Link2, Plus } from "lucide-react";
import NotesData from "./NotesData";
import { AIService } from "../../services/aiService";
import { searchNotes } from "../../utils/searchNotes";
import CreateNoteModal from "./components/CreateNoteModal";
import UserNotesGrid from "./components/UserNotesGrid";

const NotesPage = () => {
  const { state } = useGlobalState();
  const [searchQuery, setSearchQuery] = useState("");
  const [summaries, setSummaries] = useState({});
  const [loadingSummary, setLoadingSummary] = useState({});
  const [activeTab, setActiveTab] = useState("admin"); // admin, user, ai
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Filter admin notes based on search query
  const filteredAdminNotes = searchQuery
    ? searchNotes(searchQuery, NotesData)
    : NotesData;

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Generate AI summary for a note
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

  // Animation variants
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
      {/* Background */}
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
        {/* Header Section */}
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

          {/* Search Input */}
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

          {/* Tabs */}
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

          {/* Admin Notes Tab */}
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
                    state.darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"
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
                    <span className="font-bold">{filteredAdminNotes.length}</span>
                  </p>
                </div>
              </motion.div>

              {/* Notes Grid */}
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
                      {/* Top-right icon */}
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

                      {/* Note Content */}
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4 space-x-4">
                          <div
                            className={`p-2 rounded-lg ${
                              state.darkMode ? "bg-gray-900/50" : "bg-gray-100"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                state.darkMode ? "text-blue-500" : "text-blue-600"
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

                        {/* View Link */}
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

          {/* User Notes Tab */}
          {activeTab === "user" && (
            <UserNotesGrid onCreateNote={handleCreateNote} />
          )}

          {/* AI Notes Tab */}
          {activeTab === "ai" && (
            <div className="text-center py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${state.darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                <p className="text-xl mb-4">AI Generated Notes Coming Soon!</p>
                <p className="text-sm">
                  We're working on bringing you AI-powered note generation and summaries.
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Create Note Modal */}
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
    </div>
  );
};

export default NotesPage;