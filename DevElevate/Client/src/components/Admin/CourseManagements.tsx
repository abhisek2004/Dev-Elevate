import { BookOpen, Layers, Play, Search } from "lucide-react";
import { useState } from "react";

type Course = {
  title: string;
  creator: string;
  link: string;
};

export default function CourseManager() {
  const [view, setView] = useState<"list" | "add">("list");
  const [courses, setCourses] = useState<Course[]>([]);

  const handleAddCourse = (newCourse: Course) => {
    setCourses([...courses, newCourse]);
    setView("list");
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {view === "list" ? (
        <div className="min-h-screen bg-white text-black p-10">
          {/* Header */}
          <div className="text-center space-y-2 mb-10">
            <h1 className="text-4xl font-extrabold">Course Management</h1>
            <p className="text-gray-600">
              Manage course content, categories, and creator information with
              comprehensive administrative controls.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Toolbar */}
          <div className="bg-gray-100 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-8">
            <div>
              <h2 className="text-lg font-bold flex items-center space-x-2">
                <BookOpen size={20} />
                <span>Course Management</span>
              </h2>
              <p className="text-gray-600 text-sm">Search and manage courses</p>
            </div>

            <div className="flex items-center space-x-4 w-full md:w-auto">
              {/* Search */}
              <div className="flex items-center bg-gray-200 rounded-lg px-3 py-2 flex-1 md:w-64">
                <Search className="text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="bg-transparent outline-none px-2 flex-1 text-sm text-black"
                />
              </div>

              {/* Dropdown */}
              <select className="bg-gray-200 px-3 py-2 rounded-lg text-sm outline-none text-black">
                <option>All Categories</option>
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
            <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center space-x-4">
              <BookOpen size={30} className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <h3 className="text-xl font-bold">0</h3>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center space-x-4">
              <Layers size={30} className="text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <h3 className="text-xl font-bold">0</h3>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex items-center space-x-4">
              <Play size={30} className="text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Filtered Results</p>
                <h3 className="text-xl font-bold">0</h3>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="bg-gray-100 rounded-2xl shadow-lg p-16 flex flex-col items-center justify-center">
            <Play size={50} className="text-gray-400 mb-4" />
            <h2 className="text-lg font-bold">No courses found</h2>
            <p className="text-gray-600 text-sm">
              Course content will appear here.
            </p>
          </div>
        </div>
      ) : (
        <AddCourseForm
          onAddCourse={handleAddCourse}
          onBack={() => setView("list")}
        />
      )}
    </div>
  );
}

type AddCourseFormProps = {
  onAddCourse: (course: Course) => void;
  onBack: () => void;
};

function AddCourseForm({ onAddCourse, onBack }: AddCourseFormProps) {
  const [formData, setFormData] = useState({
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

  // Handle field changes dynamically
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = () => {
    console.log("Current Form Data:", formData);

    // Check empty fields
    const isEmpty = Object.values(formData).some((val) => val.trim() === "");
    if (isEmpty) {
      alert("Please fill all fields");
      return;
    }

    console.log("Course Data Submitted:", formData);
    onAddCourse(formData);

    // Reset
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
  };

  return (
    <div className="min-h-screen bg-gray-100 grid  place-items-center p-6">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-6">
        {/* Left Panel – Course Form */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <div className=" flex  justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-rose-500">➕</span> Add New Course
            </h2>
            <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:scale-105 transform transition">
             {"<- Back"}
            </button>
          </div>
          <div className="bg-rose-50 rounded-xl p-4 border border-rose-200 mb-6 mt-3">
            <p className="text-sm text-gray-600 mb-3">
              <strong className="text-rose-600">Auto-fill from YouTube</strong>
              <br /> Enter YouTube ID, Category, and Type, then click fetch to
              auto-populate.
            </p>
            <button className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 hover:scale-105 transform transition">
              Fetch from YouTube
            </button>
          </div>

          <section className="space-y-6">
            {/* Row 1: Category + Type */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Category
                </label>
                <input
                  name="category"
                  placeholder="Enter course category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Type
                </label>
                <input
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="Enter course type (e.g., Tutorial, Project)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                />
              </div>
            </div>

            {/* Row 2: Video ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube Video ID
              </label>
              <input
                name="videoId"
                value={formData.videoId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                placeholder="https://youtube.com/watch?v=…"
              />
            </div>

            {/* Row 3: Title + Creator */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Creator Name
                </label>
                <input
                  name="creator"
                  value={formData.creator}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  placeholder="Enter creator name"
                />
              </div>
            </div>

            {/* Row 4: Course Image + Creator Image */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image URL
                </label>
                <input
                  name="courseImage"
                  value={formData.courseImage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  placeholder="Enter course image URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Creator Image URL
                </label>
                <input
                  name="creatorImage"
                  value={formData.creatorImage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  placeholder="Enter creator image URL"
                />
              </div>
            </div>

            {/* Row 5: Course Link */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Link
                </label>
                <input
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none"
                  placeholder="Enter course YouTube link"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none h-28 resize-none"
                  placeholder="Enter course description"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-lg font-semibold text-white
                         bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600
                         hover:scale-105 transform transition"
            >
              Add Course
            </button>
          </section>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            👁 Live Preview
          </h3>
          <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center h-80 border border-gray-300">
            <div className="w-20 h-20 bg-gray-300 rounded-full mb-4" />{" "}
            <button className="px-4 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 hover:scale-105 transform transition">
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
