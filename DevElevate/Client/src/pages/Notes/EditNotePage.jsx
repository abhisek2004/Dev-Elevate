import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../contexts/GlobalContext";
import { ArrowLeft, Save, X, Upload, File, Trash2, Eye, Edit3 } from "lucide-react";
import axiosInstance from "../../api/axiosinstance";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const EditNotePage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { state } = useGlobalState();
  const darkMode = state.darkMode;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    isPublic: true,
  });
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    fetchNote();
  }, [noteId]);

  const fetchNote = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/notes/${noteId}`);
      
      if (response.data.success) {
        const noteData = response.data.note;
        setNote(noteData);
        setFormData({
          title: noteData.title,
          content: noteData.content,
          tags: noteData.tags?.join(", ") || "",
          isPublic: noteData.isPublic,
        });
        setExistingFiles(noteData.files || []);
      }
    } catch (error) {
      console.error("Error fetching note:", error);
      toast.error("Failed to load note");
      navigate("/notes");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

  const removeNewFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingFile = async (fileId) => {
    try {
      const response = await axiosInstance.delete(`/api/notes/${noteId}/files/${fileId}`);
      if (response.data.success) {
        setExistingFiles(prev => prev.filter(f => f._id !== fileId));
        toast.success("File removed");
      }
    } catch (error) {
      console.error("Error removing file:", error);
      toast.error("Failed to remove file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Title and content are required");
      return;
    }
  
    try {
      setSaving(true);
  
      // Process tags into array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
  
      // Use regular JSON instead of FormData since you're not using multer
      const submitData = {
        title: formData.title,
        content: formData.content,
        tags: tagsArray, // Send as array
        isPublic: formData.isPublic,
      };
  
      const response = await axiosInstance.put(
        `/api/notes/${noteId}`,
        submitData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        toast.success("Note updated successfully!");
        navigate(`/notes/view/${noteId}`);
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error(error.response?.data?.message || "Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!note) {
    return null;
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} py-8 px-4`}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              darkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Edit Note
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={`rounded-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg space-y-6`}>
          {/* Title */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="Enter note title"
              required
            />
          </div>

          {/* Content with Preview Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={`block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Content * (Markdown supported)
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
                className={`w-full min-h-[300px] p-4 rounded-lg border prose prose-sm max-w-none overflow-auto ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 prose-invert"
                    : "bg-white border-gray-300"
                }`}
              >
                <ReactMarkdown>{formData.content || "*No content to preview*"}</ReactMarkdown>
              </div>
            ) : (
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={12}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none font-mono text-sm ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="Write your notes here... You can use markdown formatting!"
                required
              />
            )}
          </div>

          {/* Tags */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              placeholder="e.g. javascript, es6, async"
            />
          </div>

          {/* Public/Private Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Make this note public
              </label>
              <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                Public notes can be viewed by all users
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.isPublic ? "bg-blue-600" : darkMode ? "bg-gray-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.isPublic ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Existing Files */}
          {existingFiles.length > 0 && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Attached Files
              </label>
              <div className="space-y-2">
                {existingFiles.map((file) => (
                  <div
                    key={file._id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <File className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                          {file.originalFileName}
                        </p>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {file.fileType?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExistingFile(file._id)}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode
                          ? "hover:bg-gray-600 text-red-400"
                          : "hover:bg-gray-200 text-red-600"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Files */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Add Files (PDF, DOCX)
            </label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              darkMode
                ? "border-gray-600 hover:border-gray-500"
                : "border-gray-300 hover:border-gray-400"
            }`}>
              <input
                type="file"
                id="file-upload"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <Upload className={`w-10 h-10 mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Click to upload or drag and drop
                </span>
                <span className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
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
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <File className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                          {file.name}
                        </p>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeNewFile(index)}
                      className={`p-2 rounded-lg transition-colors ${
                        darkMode
                          ? "hover:bg-gray-600 text-red-400"
                          : "hover:bg-gray-200 text-red-600"
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNotePage;