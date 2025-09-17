import React, { useState, useEffect, useContext } from "react";
import { Clock, BookOpen, Trophy, Play } from "lucide-react";
import axiosInstance from "../../api/axiosinstance";
import QuizAttempt from "./QuizAttempt";
import QuizResults from "./QuizResults";
import { useGlobalState } from "../../contexts/GlobalContext";
import { baseUrl } from "../../config/routes";

interface Quiz {
  _id: string;
  title: string;
  topic?: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "MCQ" | "Code";
  questionCount: number;
  createdAt: string;
}
interface AuthData {
  user: {
    id: string;
    name: string;
    email: string;
    role?: string;
  };
  sessionToken: string;
}

const QuizPage: React.FC = () => {
  const { state } = useGlobalState();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState<any>(null);


const stored = localStorage.getItem("devElevateAuth");
const authData: AuthData | null = stored ? JSON.parse(stored) : null;

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/quiz");
      setQuizzes(response.data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

const handleQuizComplete = async (results: any) => {
  setQuizResults(results);
  setSelectedQuiz(null);
  setShowResults(true);

  if (!authData) {
    console.warn("No auth data found, cannot log quiz completion");
    return;
  }

  try {
    const logData = {
      action: "quiz_complete",
      performedBy: authData.user.id,
      timestamp: new Date().toISOString(),
      details: `User ${authData.user.name} completed quiz`,
    };

    await fetch(`${baseUrl}/api/v1/admin/system-log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.sessionToken}`,
      },
      credentials: "include",
      body: JSON.stringify(logData),
    });
  } catch (error) {
    console.error("Failed to log quiz completion:", error);
  }
};



  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (selectedQuiz) {
    return (
      <QuizAttempt
        quiz={selectedQuiz}
        onComplete={handleQuizComplete}
        onBack={() => setSelectedQuiz(null)}
      />
    );
  }

  if (showResults) {
    return (
      <QuizResults results={quizResults} onBack={() => setShowResults(false)} />
    );
  }

  return (
    <div
      className={`min-h-screen p-6 ${
        state.darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Quiz Center</h1>
          <p
            className={`text-lg ${
              state.darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Test your knowledge with our interactive quizzes
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className={`rounded-lg border p-6 transition-all duration-200 hover:shadow-lg ${
                  state.darkMode
                    ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <span
                      className={`text-sm font-medium ${
                        quiz.type === "MCQ"
                          ? "text-blue-600"
                          : "text-purple-600"
                      }`}
                    >
                      {quiz.type}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      quiz.difficulty
                    )}`}
                  >
                    {quiz.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>

                {quiz.topic && (
                  <p
                    className={`text-sm mb-3 ${
                      state.darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Topic: {quiz.topic}
                  </p>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4" />
                      <span>{quiz.questionCount} Questions</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>~{quiz.questionCount * 2} min</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedQuiz(quiz)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Start Quiz</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && quizzes.length === 0 && (
          <div
            className={`text-center py-12 ${
              state.darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">No Quizzes Available</h3>
            <p>Check back later for new quizzes!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
