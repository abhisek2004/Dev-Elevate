import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalState } from "../../../contexts/GlobalContext";
import { X, Upload, FileText, Eye, Edit3, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import axiosInstance from "../../../api/axiosinstance"; // ✅ CHANGED: Use axiosInstance
import toast from "react-hot-toast";

const CreateNoteModal = ({ isOpen, onClose, selectedTopic, onSuccess }) => {
  const { state } = useGlobalState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [files, setFiles] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topicName, setTopicName] = useState("");

  // ✅ REMOVED: No longer needed
  //const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    console.log("User from state:", state.user);
  }, [state.user]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    const validFiles = selectedFiles.filter(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      return ['pdf', 'docx', 'doc'].includes(ext);
    });

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF and DOCX files are allowed!");
    }

    const oversizedFiles = validFiles.filter(file => file.size > 50 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error("Some files exceed 50MB limit!");
      return;
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
  
    if (!content.trim()) {
      toast.error("Please enter content");
      return;
    }
  
    if (!topicName.trim()) {
      toast.error("Please enter a topic name");
      return;
    }
  
    if (!state.user) {
      toast.error("Please login to create notes");
      return;
    }
  
    setLoading(true);
  
    try {
      // Process tags into array
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("topicName", topicName.trim());
      formData.append("tags", JSON.stringify(tagsArray)); // Send as JSON string
      formData.append("isPublic", isPublic);
  
      files.forEach(file => {
        formData.append("files", file);
      });
  
      console.log("Submitting note...");
  
      const stored = localStorage.getItem("devElevateAuth");
      const authData = stored ? JSON.parse(stored) : null;
      
      const response = await axiosInstance.post(
        "/api/notes",  // ← CHANGED: Correct endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(authData?.sessionToken && {
              Authorization: `Bearer ${authData.sessionToken}`
            })
          },
        }
      );
  
      if (response.data.success) {
        toast.success("Note created successfully!");
        
        setTitle("");
        setContent("");
        setTags("");
        setIsPublic(false);
        setFiles([]);
        setTopicName("");
        
        if (onSuccess) {
          onSuccess();
        }
        
        onClose();
      }
    } catch (error) {
      console.error("Create note error:", error);
      console.error("Error response:", error.response?.data);
      
      if (error.response?.status === 401) {
        toast.error("Please login to create notes");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid data provided");
      } else {
        toast.error(error.response?.data?.message || "Failed to create note");
      }
    } finally {
      setLoading(false);
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
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl ${
              state.darkMode ? "bg-gray-800" : "bg-white"
            } shadow-2xl`}
          >
            <div
              className={`flex items-center justify-between p-6 border-b ${
                state.darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold ${
                  state.darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Create New Note
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  state.darkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      state.darkMode ? "text-gray-300" : "text-gray-700"
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
                      state.darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      state.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Topic *
                  </label>
                  <input
                    type="text"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    placeholder="e.g., Python Basics, React Hooks, Data Structures"
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      state.darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  <p className={`text-xs mt-1 ${state.darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Enter a topic name for your note
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      className={`block text-sm font-medium ${
                        state.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Content * (Markdown supported)
                    </label>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(!previewMode)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                        state.darkMode
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
                      className={`w-full min-h-[300px] p-4 rounded-lg border prose prose-sm max-w-none ${
                        state.darkMode
                          ? "bg-gray-700 border-gray-600 prose-invert"
                          : "bg-white border-gray-300"
                      }`}
                    >
                      <ReactMarkdown>{content || "*No content to preview*"}</ReactMarkdown>
                    </div>
                  ) : (
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your notes here... You can use markdown formatting!"
                      rows={12}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors font-mono text-sm ${
                        state.darkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      required
                    />
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      state.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. javascript, es6, async"
                    className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                      state.darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      state.darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Attach Files (PDF, DOCX)
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      state.darkMode
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.docx,.doc"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload
                        className={`w-10 h-10 mb-2 ${
                          state.darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          state.darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Click to upload or drag and drop
                      </span>
                      <span
                        className={`text-xs mt-1 ${
                          state.darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        PDF, DOCX up to 50MB each
                      </span>
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            state.darkMode ? "bg-gray-700" : "bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <FileText
                              className={`w-5 h-5 ${
                                state.darkMode ? "text-blue-400" : "text-blue-600"
                              }`}
                            />
                            <div>
                              <p
                                className={`text-sm font-medium ${
                                  state.darkMode ? "text-gray-200" : "text-gray-900"
                                }`}
                              >
                                {file.name}
                              </p>
                              <p
                                className={`text-xs ${
                                  state.darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className={`p-2 rounded-lg transition-colors ${
                              state.darkMode
                                ? "hover:bg-gray-600 text-red-400"
                                : "hover:bg-gray-200 text-red-600"
                            }`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-1 ${
                        state.darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Make this note public
                    </label>
                    <p
                      className={`text-xs ${
                        state.darkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      Public notes can be viewed by all users
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPublic(!isPublic)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isPublic ? "bg-blue-600" : state.darkMode ? "bg-gray-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isPublic ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </form>
            </div>

            <div
              className={`flex items-center justify-end gap-3 p-6 border-t ${
                state.darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <button
                type="button"
                onClick={onClose}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  state.darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {loading ? "Creating..." : "Create Note"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateNoteModal;