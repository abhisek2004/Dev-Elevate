import { BookOpen, Layers, Play, Search, Loader2, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import * as adminCourseService from "../../services/adminCourseService";
import type { Course, CourseData } from "../../services/adminCourseService";
import { Toaster, toast } from 'sonner';
import { useGlobalState } from "../../contexts/GlobalContext";

type ViewMode = "list" | "add";
type FetchStatus = "idle" | "loading" | "success" | "error";

interface StatsDisplay {
  totalCourses: number;
  categories: number;
  filteredResults: number;
}

export default function CourseManager() {
  const { state } = useGlobalState();
  const [view, setView] = useState<ViewMode>("list");
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<StatsDisplay>({ 
    totalCourses: 0, 
    categories: 0, 
    filteredResults: 0 
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
    loadStats();
  }, [searchTerm, selectedCategory]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await adminCourseService.getAllAdminCourses(
        searchTerm || undefined,
        selectedCategory !== "All Categories" ? selectedCategory : undefined
      );
      if (response.success) {
        setCourses(response.data);
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to load courses";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await adminCourseService.getAdminCourseStats();
      if (response.success) {
        setStats({
          totalCourses: response.data.totalCourses,
          categories: response.data.categories,
          filteredResults: response.data.totalCourses
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to load stats:", error.message);
      }
    }
  };

  const handleAddCourse = async (newCourse: CourseData) => {
    try {
      const response = await adminCourseService.createAdminCourse(newCourse);
      if (response.success) {
        toast.success("Course added successfully! 🎉");
        await loadCourses();
        await loadStats();
        setView("list");
      }
    } catch (error) {
      let message = "Failed to add course";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'object' && error !== null) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        message = axiosError.response?.data?.message || message;
      }
      toast.error(message);
      throw error;
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (deletingCourseId) return;
    
    toast('Are you sure you want to delete this course?', {
      action: {
        label: 'Delete',
        onClick: async () => {
          setDeletingCourseId(courseId);
          toast.promise(
            adminCourseService.deleteAdminCourse(courseId).then(response => {
              if (response.success) {
                loadCourses();
                loadStats();
                setDeletingCourseId(null);
                return response;
              }
              setDeletingCourseId(null);
              throw new Error("Failed to delete course");
            }).catch(error => {
              setDeletingCourseId(null);
              throw error;
            }),
            {
              loading: 'Deleting course...',
              success: 'Course deleted successfully! 🗑️',
              error: (error) => {
                const errorMessage = error instanceof Error 
                  ? error.message 
                  : (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to delete course";
                return errorMessage;
              }
            }
          );
        }
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {
          toast.info('Delete cancelled');
        }
      },
      duration: 5000,
    });
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        course.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Toaster position="top-right" richColors theme={state.darkMode ? "dark" : "light"} />
      <div className={`min-h-screen p-6 ${state.darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        {view === "list" ? (
          <div className={`min-h-screen p-10 ${state.darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {/* Header */}
            <div className="text-center space-y-2 mb-10">
              <h1 className={`text-4xl font-extrabold ${state.darkMode ? 'text-white' : 'text-gray-800'}`}>
                Course Management
              </h1>
              <p className={state.darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Manage course content, categories, and creator information with
                comprehensive administrative controls.
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 mx-auto mt-3 rounded-full"></div>
            </div>

            {/* Toolbar */}
            <div className={`rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-8 ${
              state.darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <div>
                <h2 className={`text-lg font-bold flex items-center space-x-2 ${state.darkMode ? 'text-white' : 'text-black'}`}>
                  <BookOpen size={20} />
                  <span>Course Management</span>
                </h2>
                <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Search and manage courses
                </p>
              </div>

              <div className="flex items-center space-x-4 w-full md:w-auto">
                {/* Search */}
                <div className={`flex items-center rounded-lg px-3 py-2 flex-1 md:w-64 ${
                  state.darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <Search className={state.darkMode ? 'text-gray-400' : 'text-gray-500'} size={18} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`bg-transparent outline-none px-2 flex-1 text-sm ${
                      state.darkMode ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'
                    }`}
                  />
                </div>

                {/* Dropdown */}
                <select 
                  className={`px-3 py-2 rounded-lg text-sm outline-none ${
                    state.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
                  }`}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Web Development</option>
                  <option>Programming</option>
                  <option>Data Science</option>
                  <option>Mobile Development</option>
                  <option>Design</option>
                  <option>DevOps</option>
                  <option>Database</option>
                  <option>Cloud Computing</option>
                  <option>AI/ML</option>
                  <option>Cybersecurity</option>
                </select>

                {/* Add Button */}
                <button
                  onClick={() => setView("add")}
                  className="px-5 py-2 rounded-lg font-semibold text-white
                         bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600
                         hover:scale-105 transform transition"
                >
                  + Add Course
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={`p-6 rounded-2xl shadow-md flex items-center space-x-4 ${
                state.darkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <BookOpen size={30} className="text-blue-500" />
                <div>
                  <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Courses
                  </p>
                  <h3 className={`text-xl font-bold ${state.darkMode ? 'text-white' : 'text-black'}`}>
                    {stats.totalCourses}
                  </h3>
                </div>
              </div>

              <div className={`p-6 rounded-2xl shadow-md flex items-center space-x-4 ${
                state.darkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Layers size={30} className="text-green-500" />
                <div>
                  <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Categories
                  </p>
                  <h3 className={`text-xl font-bold ${state.darkMode ? 'text-white' : 'text-black'}`}>
                    {stats.categories}
                  </h3>
                </div>
              </div>

              <div className={`p-6 rounded-2xl shadow-md flex items-center space-x-4 ${
                state.darkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Play size={30} className="text-purple-500" />
                <div>
                  <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Filtered Results
                  </p>
                  <h3 className={`text-xl font-bold ${state.darkMode ? 'text-white' : 'text-black'}`}>
                    {filteredCourses.length}
                  </h3>
                </div>
              </div>
            </div>

            {/* Courses List */}
            {loading ? (
              <div className={`rounded-2xl shadow-lg p-16 flex flex-col items-center justify-center ${
                state.darkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Loader2 size={50} className={`mb-4 animate-spin ${state.darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <h2 className={`text-lg font-bold ${state.darkMode ? 'text-white' : 'text-black'}`}>
                  Loading courses...
                </h2>
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div key={course._id} className={`rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow ${
                    state.darkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <img src={course.courseImage} alt={course.title} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full text-purple-600 bg-purple-100">
                        {course.category}
                      </span>
                      <h3 className={`text-lg font-bold mt-3 mb-2 line-clamp-2 ${
                        state.darkMode ? 'text-white' : 'text-black'
                      }`}>
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <img src={course.creatorImage} alt={course.creator} className="w-6 h-6 rounded-full" />
                        <span className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {course.creator}
                        </span>
                      </div>
                      <p className={`text-sm line-clamp-2 mb-3 ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {course.description}
                      </p>
                      <div className={`flex items-center justify-between text-xs mb-3 ${
                        state.darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <span>⏱️ {course.duration}</span>
                        <span>👥 {course.students?.toLocaleString()}</span>
                        <span>⭐ {course.rating}</span>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg text-sm font-medium transition"
                        >
                          View Course
                        </a>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`rounded-2xl shadow-lg p-16 flex flex-col items-center justify-center ${
                state.darkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <Play size={50} className={state.darkMode ? 'text-gray-500' : 'text-gray-400'} />
                <h2 className={`text-lg font-bold ${state.darkMode ? 'text-white' : 'text-black'}`}>
                  No courses found
                </h2>
                <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {searchTerm || selectedCategory !== "All Categories" 
                    ? "Try adjusting your filters" 
                    : "Click 'Add Course' to create your first course."}
                </p>
              </div>
            )}
          </div>
        ) : (
          <AddCourseForm
            onAddCourse={handleAddCourse}
            onBack={() => setView("list")}
            darkMode={state.darkMode}
          />
        )}
      </div>
    </>
  );
}

interface AddCourseFormProps {
  onAddCourse: (course: CourseData) => Promise<void>;
  onBack: () => void;
  darkMode: boolean;
}

function AddCourseForm({ onAddCourse, onBack, darkMode }: AddCourseFormProps) {
  const [formData, setFormData] = useState<CourseData>({
    category: "",
    type: "",
    videoId: "",
    title: "",
    creator: "",
    courseImage: "",
    creatorImage: "",
    link: "",
    description: "",
  });

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [fetchMessage, setFetchMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFetchFromYouTube = async () => {
    if (!formData.videoId || !formData.category || !formData.type) {
      setFetchStatus("error");
      setFetchMessage("Please fill Video ID, Category, and Type first!");
      toast.error("Please fill Video ID, Category, and Type first!");
      setTimeout(() => setFetchStatus("idle"), 3000);
      return;
    }
  
    try {
      setFetchStatus("loading");
      setFetchMessage("Fetching from YouTube...");
  
      const response = await adminCourseService.fetchYouTubeDetails(
        formData.videoId, 
        formData.category, 
        formData.type
      );
  
      if (response.success) {
        setFormData({
          ...formData,
          title: response.data.title,
          creator: response.data.creator,
          courseImage: response.data.courseImage,
          creatorImage: response.data.creatorImage,
          link: response.data.link,
          description: response.data.description,
          videoId: response.data.videoId,
          duration: response.data.duration,
          students: response.data.students,
          rating: response.data.rating,
        });
        setFetchStatus("success");
        setFetchMessage("✅ Data fetched successfully!");
        toast.success("YouTube data fetched successfully!");
        setTimeout(() => setFetchStatus("idle"), 3000);
      }
    } catch (error) {
      setFetchStatus("error");
      let message = "Failed to fetch YouTube details";
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'object' && error !== null) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        message = axiosError.response?.data?.message || message;
      }
      setFetchMessage(message);
      toast.error(message);
      setTimeout(() => setFetchStatus("idle"), 3000);
    }
  };

  const handleSubmit = async () => {
    const isEmpty = Object.values(formData).some((val) => 
      typeof val === 'string' && val.trim() === ""
    );
    
    if (isEmpty) {
      toast.error("Please fill all required fields");
      return;
    }
  
    try {
      setIsSubmitting(true);
      await onAddCourse(formData);
      setFormData({
        category: "",
        type: "",
        videoId: "",
        title: "",
        creator: "",
        courseImage: "",
        creatorImage: "",
        link: "",
        description: "",
      });
    } catch (error) {
      // Error already handled by onAddCourse with toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen grid place-items-center p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-6">
        <div className={`rounded-2xl p-6 shadow-md border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-3xl font-bold mb-4 flex items-center gap-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <span className="text-rose-500">➕</span> Add New Course
            </h2>
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:scale-105 transform transition"
            >
              {"<- Back"}
            </button>
          </div>

          <div className={`rounded-xl p-4 border mb-6 mt-3 ${
            darkMode ? 'bg-rose-900/20 border-rose-800' : 'bg-rose-50 border-rose-200'
          }`}>
            <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <strong className="text-rose-600">Auto-fill from YouTube</strong>
              <br /> Enter YouTube ID, Category, and Type, then click fetch to auto-populate.
            </p>
            <button
              onClick={handleFetchFromYouTube}
              disabled={fetchStatus === "loading"}
              className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 hover:scale-105 transform transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {fetchStatus === "loading" ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Fetching...
                </>
              ) : fetchStatus === "success" ? (
                <>
                  <CheckCircle size={16} />
                  Fetch from YouTube
                </>
              ) : fetchStatus === "error" ? (
                <>
                  <AlertCircle size={16} />
                  Fetch from YouTube
                </>
              ) : (
                "Fetch from YouTube"
              )}
            </button>
            {fetchMessage && (
              <p className={`text-sm mt-2 ${
                fetchStatus === "success" ? "text-green-600" : 
                fetchStatus === "error" ? "text-red-600" : 
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                {fetchMessage}
              </p>
            )}
          </div>

          <section className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Course Category *</label>
                <select name="category" value={formData.category} onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
                  }`}>
                  <option value="">Select category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Programming">Programming</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Design">Design</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Database">Database</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Course Type *</label>
                <select name="type" value={formData.type} onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
                  }`}>
                  <option value="">Select type</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Project">Project</option>
                  <option value="Course">Course</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Bootcamp">Bootcamp</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>YouTube Video ID or URL *</label>
              <input name="videoId" value={formData.videoId} onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'
                }`}
                placeholder="dGcsHMXbSOA or https://youtube.com/watch?v=..." />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Course Title *</label>
                <input name="title" value={formData.title} onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'
                  }`}
                  placeholder="Enter course title" />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Creator Name *</label>
                <input name="creator" value={formData.creator} onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'
                  }`}
                  placeholder="Enter creator name" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Course Image URL *</label>
                <input name="courseImage" value={formData.courseImage} onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'
                  }`}
                  placeholder="Enter course image URL" />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Creator Image URL *</label>
                <input name="creatorImage" value={formData.creatorImage} onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'
                  }`}
                  placeholder="Enter creator image URL" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Course Link *</label>
                <input name="link" value={formData.link} onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'
                  }`}
                  placeholder="Enter course YouTube link" />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none h-28 resize-none ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-black placeholder-gray-500'
                  }`}
                  placeholder="Enter course description" />
              </div>
            </div>

            <button onClick={handleSubmit} disabled={isSubmitting}
              className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 hover:scale-105 transform transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isSubmitting ? (<><Loader2 className="animate-spin" size={20} />Adding Course...</>) : ("Add Course")}
            </button>
          </section>
        </div>

        <div className={`rounded-2xl p-6 shadow-md border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            👁 Live Preview
          </h3>
          <div className={`rounded-xl overflow-hidden border ${
            darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
          }`}>
            {formData.courseImage ? (
              <img src={formData.courseImage} alt="Course" className="w-full h-48 object-cover" />
            ) : (
              <div className={`w-full h-48 flex items-center justify-center ${
                darkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}>
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No image</span>
              </div>
            )}
            <div className="p-4">
              {formData.category && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full text-purple-600 bg-purple-100">
                  {formData.category}
                </span>
              )}
              <h4 className={`text-lg font-bold mt-3 mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                {formData.title || "Course Title"}
              </h4>
              <div className="flex items-center gap-2 mb-3">
                {formData.creatorImage ? (
                  <img src={formData.creatorImage} alt="Creator" className="w-6 h-6 rounded-full" />
                ) : (
                  <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
                )}
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formData.creator || "Creator Name"}
                </span>
              </div>
              <p className={`text-sm line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formData.description || "Course description will appear here"}
              </p>
              <button className="mt-4 w-full px-4 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600">
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}