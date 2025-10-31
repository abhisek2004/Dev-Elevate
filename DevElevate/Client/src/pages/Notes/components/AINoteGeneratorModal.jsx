import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Loader2, Eye, Edit3, Wand2, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import axiosInstance from "../../../api/axiosinstance";
import toast from "react-hot-toast";

const AINoteGeneratorModal = ({ isOpen, onClose, onSuccess, darkMode }) => {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const generateNote = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt to generate notes");
      return;
    }
  
    setGenerating(true);
    try {
      console.log("🚀 Generating AI note with prompt:", prompt);
      
      // ✅ FIXED: Changed from /api/ai/generate-note to /api/v1/ai/generate-note
      const response = await axiosInstance.post("/api/v1/ai/generate-note", {
        prompt: prompt.trim(),
      });
  
      if (response.data.success) {
        setGeneratedContent(response.data.content);
        setTitle(response.data.title || `AI: ${prompt.substring(0, 50)}...`);
        setTags(response.data.tags?.join(", ") || "");
        toast.success("Notes generated successfully!");
        setPreviewMode(true);
      } else {
        toast.error(response.data.message || "Failed to generate note");
      }
    } catch (error) {
      console.error("Generate note error:", error);
      
      if (error.response?.status === 429) {
        toast.error("AI service rate limit exceeded. Please try again later.");
      } else if (error.response?.status === 401) {
        toast.error("Please login to generate notes");
      } else {
        toast.error(error.response?.data?.message || "Failed to generate note. Please try again.");
      }
    } finally {
      setGenerating(false);
    }
  };

  const saveNote = async () => {
    if (!title.trim() || !generatedContent.trim()) {
      toast.error("Title and content are required");
      return;
    }
  
    setSaving(true);
    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
  
      const response = await axiosInstance.post("/api/notes", {
        title: title.trim(),
        content: generatedContent,
        topicName: "AI Generated",
        tags: tagsArray,
        isPublic,
        isAiGenerated: true, // ✅ FIXED: Changed from isAIGenerated to isAiGenerated
      });
  
      if (response.data.success) {
        toast.success("AI note saved successfully!");
        if (onSuccess) onSuccess();
        handleClose();
      } else {
        toast.error(response.data.message || "Failed to save note");
      }
    } catch (error) {
      console.error("Save note error:", error);
      
      if (error.response?.status === 401) {
        toast.error("Please login to save notes");
      } else {
        toast.error(error.response?.data?.message || "Failed to save note. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };
  const handleClose = () => {
    setPrompt("");
    setGeneratedContent("");
    setTitle("");
    setTags("");
    setIsPublic(false);
    setPreviewMode(false);
    onClose();
  };

  const handleGenerateNew = () => {
    if (window.confirm("Are you sure you want to generate new notes? Current content will be lost.")) {
      setGeneratedContent("");
      setTitle("");
      setTags("");
      setPreviewMode(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-2xl`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-6 border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    AI Note Generator
                  </h2>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Generate comprehensive study notes using AI
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
              {/* Step 1: Generate Content */}
              {!generatedContent && (
                <div className="space-y-6">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      What would you like to learn about? *
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Example prompts:&#10;• Explain React Hooks in detail with examples&#10;• Create comprehensive notes on Binary Search Trees&#10;• Teach me about async/await in JavaScript&#10;• Data Structures and Algorithms basics"
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>

                  <div className={`flex items-start gap-3 p-4 rounded-lg ${
                    darkMode ? "bg-blue-900/20 border border-blue-500/30" : "bg-blue-50 border border-blue-200"
                  }`}>
                    <Wand2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`} />
                    <div>
                      <p className={`text-sm font-medium mb-1 ${
                        darkMode ? "text-blue-300" : "text-blue-800"
                      }`}>
                        Tips for better results:
                      </p>
                      <ul className={`text-sm space-y-1 ${
                        darkMode ? "text-blue-400" : "text-blue-700"
                      }`}>
                        <li>• Be specific about the topic and depth you want</li>
                        <li>• Mention if you want examples or code snippets</li>
                        <li>• Specify your learning level (beginner, intermediate, advanced)</li>
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={generateNote}
                    disabled={generating || !prompt.trim()}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating your notes... (this may take 10-20 seconds)
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Notes with AI
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Step 2: Edit and Save */}
              {generatedContent && (
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter note title"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>

                  {/* Content with Preview */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className={`block text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Generated Content (Markdown supported)
                      </label>
                      <button
                        type="button"
                        onClick={() => setPreviewMode(!previewMode)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                          darkMode
                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {previewMode ? (
                          <>
                            <Edit3 className="w-4 h-4" />
                            Edit
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            Preview
                          </>
                        )}
                      </button>
                    </div>

                    {previewMode ? (
                      <div
                        className={`w-full min-h-[400px] max-h-[500px] p-4 rounded-lg border prose prose-sm max-w-none overflow-auto ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 prose-invert"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        <ReactMarkdown>{generatedContent}</ReactMarkdown>
                      </div>
                    ) : (
                      <textarea
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        rows={15}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors font-mono text-sm ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      />
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="e.g. AI, machine learning, tutorial"
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>

                  {/* Public/Private Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-500/10">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-1 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Make this note public
                      </label>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        Public notes can be viewed by all users in the community
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsPublic(!isPublic)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isPublic ? "bg-purple-600" : darkMode ? "bg-gray-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isPublic ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleGenerateNew}
                      disabled={generating || saving}
                      className={`flex-1 px-6 py-2 rounded-lg font-medium transition-colors ${
                        darkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Generate New
                    </button>
                    <button
                      onClick={saveNote}
                      disabled={saving || !title.trim()}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Note"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AINoteGeneratorModal;