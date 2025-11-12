import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useGlobalState } from "@/contexts/GlobalContext";

const InterviewExperienceDetails = ({
  experience,
  onClose,
  isDarkMode,
}: {
  experience: any;
  onClose: () => void;
  isDarkMode: boolean;
}) => {
  if (!experience) return null;
  return (
    <div
      className={`relative p-8 rounded-xl shadow-lg w-full max-w-2xl overflow-y-auto max-h-[80vh] ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <button
        onClick={onClose}
        className={`absolute top-4 right-4 transition-colors ${
          isDarkMode
            ? "text-gray-400 hover:text-gray-200"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <X className="w-6 h-6" />
      </button>

      {/* Header Section */}
      <div
        className={`mb-6 pb-4 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h3
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {experience.company}
        </h3>
        <p
          className={`text-xl ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {experience.position}
        </p>
      </div>

      {/* Info Grid */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <span
            className={`font-semibold min-w-[120px] ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Author:
          </span>
          <span className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
            {experience.author}
          </span>
        </div>

        <div className="flex items-start">
          <span
            className={`font-semibold min-w-[120px] ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Date:
          </span>
          <span className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
            {experience.date}
          </span>
        </div>

        <div className="flex items-start">
          <span
            className={`font-semibold min-w-[120px] ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Duration:
          </span>
          <span className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
            {experience.duration}min
          </span>
        </div>

        {/* Rounds */}
        <div className="flex items-start">
          <span
            className={`font-semibold min-w-[120px] ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Rounds:
          </span>
          <span className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
            {experience.rounds}
          </span>
        </div>

        <div className="flex items-start">
          <span
            className={`font-semibold min-w-[120px] ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Level:
          </span>
          <span
            className={`${
              experience.level === "hard"
                ? "text-red-400"
                : experience.level === "medium"
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {experience.level}
          </span>
        </div>

        <div className="flex items-start">
          <span
            className={`font-semibold min-w-[120px] ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Result:
          </span>
          <span
            className={`font-medium ${
              experience.result === "selected"
                ? "text-green-400"
                : experience.result === "pending"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {experience.result}
          </span>
        </div>

        <div className="flex items-start">
          <span
            className={`font-semibold min-w-[120px] ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Tags:
          </span>
          <span className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
            {experience.tags.join(", ")}
          </span>
        </div>
        <div className="flex items-start">
          <span
            className={`font-semibold min-w-[120px] ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Overall :
          </span>
          <span className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
            {experience.preview}
          </span>
        </div>
        <div className="flex items-start">
          <span
            className={`font-semibold min-w-[120px] ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Tips :
          </span>
          <span className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
            {experience.tips.join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};
const InterviewExperience = ({ refreshKey }: { refreshKey?: number }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  type InterviewExperience = {
    id: string;
    company: string;
    position: string;
    author: string;
    date: string;
    duration: string;
    level: string;
    result: string;
    tags: string[];
    preview: string;
    overallExperience: string;
    rounds: number;
    tips: string[];
  };
  const [interviewExperiences, setInterviewExperiences] = useState(
    [] as InterviewExperience[]
  );
  const [experience, setExperience] = useState({} as InterviewExperience);
  const { state: globalState } = useGlobalState();
  const isDarkMode = globalState.darkMode;
  useEffect(() => {
    async function fetchData() {
      try {
        const experiences = await fetch(`${import.meta.env.VITE_API_URL}/api/interview-experience`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await experiences.json();
        setInterviewExperiences(data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [refreshKey]);
  return (
    <div className="p-6">
      <h2
        className={`text-2xl font-bold mb-6 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Interview Experiences
      </h2>

      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4">
          {interviewExperiences?.map((experience) => (
            <div
              key={experience.id}
              className={`min-w-[300px] w-[300px] p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3>
                <span
                  className={`text-lg font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Company:
                </span>{" "}
                <span
                  className={isDarkMode ? "text-gray-200" : "text-gray-800"}
                >
                  {experience.company}
                </span>
              </h3>
              <p
                className={`text-sm mb-1 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Position: {experience.position}
              </p>
              <div
                className={`mt-3 space-y-1 text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <p>
                  <span className="font-medium">Rounds:</span>{" "}
                  {experience.rounds}
                </p>
                <p>
                  <span className="font-medium">Duration:</span>{" "}
                  {experience.duration} min
                </p>
                <p>
                  <span className="font-medium">Difficulty:</span>{" "}
                  {experience.level}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowShareModal(true);
                  setExperience(experience);
                }}
                className={`mt-3 text-xs hover:underline ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                see more
              </button>
            </div>
          ))}
        </div>
      </div>
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowShareModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <InterviewExperienceDetails
              experience={experience}
              onClose={() => setShowShareModal(false)}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewExperience;
