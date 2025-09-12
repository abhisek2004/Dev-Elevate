import React, { useState } from "react";
import { useGlobalState } from "../../contexts/GlobalContext";
import QuizForm from "../Quiz/QuizForm";
import QuizList from "../Quiz/QuizList";
import SubmissionTracker from "../Quiz/SubmissionTracker";

type Quiz = {
  id: string;
  title: string;
  topic?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  level?: string;
  type: "MCQ" | "Code";
  questions: any[];
  createdAt: string;
};

const QuizManagement: React.FC = () => {
  const { state: globalState } = useGlobalState();
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3
          className={`text-xl font-semibold ${
            globalState.darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Quiz Management
        </h3>
        <button
          onClick={() => {
            setEditingQuiz(null);
            setShowQuizForm(true);
          }}
          className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
        >
          <span>+ Create Quiz</span>
        </button>
      </div>

      {/* Conditional rendering for the Quiz Form */}
      {showQuizForm ? (
        <QuizForm
          initialData={editingQuiz}
          onSaved={() => {
            // QuizForm handles saving internally
            setShowQuizForm(false);
            setEditingQuiz(null);
          }}
          onClose={() => {
            setShowQuizForm(false);
            setEditingQuiz(null);
          }}
          darkMode={globalState.darkMode}
          token=""
        />
      ) : (
        <>
          <QuizList
            darkMode={globalState.darkMode}
            onEdit={(quiz) => {
              setEditingQuiz(quiz);
              setShowQuizForm(true);
            }}
          />
          <SubmissionTracker darkMode={globalState.darkMode} />
        </>
      )}
    </div>
  );
};

export default QuizManagement;
