import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../contexts/GlobalContext";

const ProgressWidget: React.FC = () => {
  const { state } = useGlobalState();
  const navigate = useNavigate();

  // ✅ Check if the user has any learning progress
  const hasProgress =
    state.learningProgress &&
    Object.keys(state.learningProgress).length > 0 &&
    Object.values(state.learningProgress).some(
      (topic) =>
        topic.completed > 0 ||
        topic.total > 0 ||
        Object.keys(topic.modules || {}).length > 0
    );

  if (!hasProgress) {
    // ✅ Empty state UI for new users
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Learning Progress
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          You haven't started learning yet.{" "}
          <span
            className="text-blue-500 font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/learning")} // ✅ Use navigate instead of full reload
          >
            Explore the Learning Hub
          </span>{" "}
          and start your first course!
        </p>
      </div>
    );
  }

  // ✅ Show progress bars if user has progress
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Learning Progress
      </h2>

      {Object.entries(state.learningProgress).map(([topic, progress]) => (
        <div key={topic} className="mb-4">
          <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
            <span>{topic}</span>
            <span>
              {progress.completed}/{progress.total} modules
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  progress.total > 0
                    ? Math.min((progress.completed / progress.total) * 100, 100)
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressWidget;
