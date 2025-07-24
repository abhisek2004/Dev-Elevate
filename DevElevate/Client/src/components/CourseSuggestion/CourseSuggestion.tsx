import { useState, useEffect } from "react";
import courses from "../../data/courses.json";
import { useGlobalState } from "../../contexts/GlobalContext";


type Course = {
  title: string;
  level: string;
  category: string;
  goal: string;
  link: string;
};

const CourseSuggestion = () => {
  const [interest, setInterest] = useState("");
  const [suggestions, setSuggestions] = useState<Course[]>([]);
  const [topPicks, setTopPicks] = useState<Course[]>([]);
  const [darkMode, setDarkMode] = useState(false); // Toggle for dark mode
  const { state } = useGlobalState();

  const handleSuggest = () => {
    const matchedCourses = courses.filter(
      (course) => course.category.toLowerCase() === interest.toLowerCase()
    );
    setSuggestions(matchedCourses);
  };

  useEffect(() => {
    const defaultTop = courses
      .filter((c) => ["beginner", "intermediate"].includes(c.level.toLowerCase()))
      .slice(0, 6);
    setTopPicks(defaultTop);
  }, []);

  const renderCourseCard = (course: Course) => (
    <div
      key={course.title}
      className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition ${
        state.darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-gray-900"
      }`}
    >
      <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
      <p className="text-sm mb-2">Level: {course.level}</p>
      <p className="text-sm mb-2">Category: {course.category}</p>
      <p className="text-sm mb-2">Goal: {course.goal}</p>
      <a
        href={course.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1 rounded"
      >
        View Course
      </a>
    </div>
  );

  return (
    <div
      className={`p-6 min-h-screen max-w-6xl mx-auto transition ${
        state.darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header and Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center w-full">Course Suggestions</h1>
        <button
          onClick={() => setDarkMode(!state.darkMode)}
          className="absolute top-6 right-6 text-sm px-4 py-1 rounded-md border shadow-sm transition
            bg-gray-200 hover:bg-gray-300 text-gray-800
            dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Dropdown UI */}
      <div
        className={`rounded-lg shadow p-6 mb-8 ${
          state.darkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Select Your Interest</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="p-2 rounded-md border border-gray-300 w-full sm:w-auto text-black"
          >
            <option value="">Select Category</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="dsa">DSA</option>
            <option value="react">React</option>
            <option value="node">Node</option>
            <option value="fullstack">Full stack</option>
          </select>
          <button
            onClick={handleSuggest}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition"
          >
            Suggest Courses
          </button>
        </div>
      </div>

      {/* Suggestions Section */}
      {interest && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Courses for:{" "}
            <span className="text-indigo-400 capitalize">{interest}</span>
          </h2>
          {suggestions.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map(renderCourseCard)}
            </div>
          ) : (
            <p className="text-gray-400 mt-4">
              No courses found for <span className="font-semibold">{interest}</span>.
            </p>
          )}
        </div>
      )}

      {/* Top Picks */}
      {!interest && topPicks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Picks for You</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPicks.map(renderCourseCard)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSuggestion;
