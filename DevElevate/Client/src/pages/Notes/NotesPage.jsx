import { motion } from "framer-motion";
import { useState } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { Link } from "react-router-dom";
import { FileText, Link2 } from "lucide-react";
import NotesData from "./NotesData";

const NotesPage = () => {
  const { state, dispatch } = useGlobalState();

  const [searchQuery, setSearchQuery] = useState("");

  // Filter notes based on search query
  const filteredNotes = NotesData.filter(
    (note) =>
      note.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
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
          ? "bg-dark-bg-primary text-dark-text-primary"
          : "bg-light-bg-primary text-light-text-primary"
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
              ? "bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50"
              : "bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50"
          }`}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block overflow-hidden">
            <motion.h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${
                state.darkMode
                  ? "text-dark-text-primary"
                  : "text-light-text-primary"
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
              transition={{ delay: 0.6 }}
              className={`h-1 rounded-full bg-gradient-to-r ${
                state.darkMode
                  ? "from-primary via-primary-dark to-primary"
                  : "from-primary via-primary-dark to-primary"
              }`}
            ></motion.div>
          </div>
          <motion.p
            className={`m-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              state.darkMode
                ? "text-dark-text-secondary"
                : "text-light-text-secondary"
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
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    state.darkMode
                      ? "text-dark-text-secondary"
                      : "text-gray-400"
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
                    ? "bg-dark-bg-secondary border-dark-border text-white placeholder-gray-400 focus:ring-primary focus:border-transparent"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-primary focus:border-transparent shadow-sm"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center hover:opacity-70 transition-opacity ${
                    state.darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                  aria-label="Clear search"
                >
                  <svg
                    className="h-5 w-5"
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
                  state.darkMode
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                }`}
              >
                {filteredNotes.length === 1
                  ? `Found 1 note matching "${searchQuery}"`
                  : `Found ${filteredNotes.length} notes matching "${searchQuery}"`}
              </motion.p>
            )}
          </motion.div>

          {/* Notes Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentAnimation}
            className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
          >
            <div className="w-full sm:w-auto">
              <h2 className="text-2xl sm:text-3xl font-righteous tracking-wider text-center sm:text-left">
                Notes Topics
              </h2>
              <p
                className={`text-sm mt-1 ${
                  state.darkMode ? "text-dark-text-secondary" : "text-gray-500"
                } text-center sm:text-left`}
              >
                Browse through our collection of curated notes and resources
              </p>
            </div>

            <div
              className={`px-4 py-2 rounded-lg ${
                state.darkMode ? "bg-dark-bg-secondary" : "bg-gray-50"
              } border ${
                state.darkMode ? "border-dark-border" : "border-gray-200"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  state.darkMode ? "text-primary" : "text-primary-dark"
                } flex items-center`}
              >
                <span
                  className={`mr-2 ${
                    state.darkMode
                      ? "text-dark-text-secondary"
                      : "text-gray-500"
                  }`}
                >
                  Total Notes:
                </span>
                <span className="font-bold">{filteredNotes.length}</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            {filteredNotes.map((note, index) => {
              const Icon = note.icon;
              return (
                <motion.div
                  key={index}
                  className={`relative group overflow-hidden rounded-xl p-6 transition-all transform hover:-translate-y-0.5 ${
                    state.darkMode
                      ? "bg-dark-bg-secondary hover:bg-dark-bg-tertiary border border-dark-border hover:shadow-lg"
                      : "bg-white hover:bg-gray-50 border border-gray-200 hover:shadow-md"
                  }`}
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
                    <div className="flex items-center space-x-4 mb-4">
                      <div
                        className={`p-2 rounded-lg ${
                          state.darkMode
                            ? "bg-dark-bg-primary/50"
                            : "bg-gray-100"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            state.darkMode
                              ? "text-primary"
                              : "text-primary-dark"
                          }`}
                        />
                      </div>
                      <h3
                        className={`text-lg font-semibold ${
                          state.darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {note.name}
                      </h3>
                    </div>
                    <p
                      className={`text-sm mb-6 ${
                        state.darkMode ? "text-gray-300" : "text-gray-600"
                      } line-clamp-3`}
                    >
                      {note.content}
                    </p>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        <Link
                          to={note.link}
                          className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                            state.darkMode
                              ? "bg-dark-bg-primary/50 text-primary hover:bg-dark-bg-primary/80"
                              : "bg-gray-100 text-primary-dark hover:bg-gray-200"
                          } transition-all`}
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
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
