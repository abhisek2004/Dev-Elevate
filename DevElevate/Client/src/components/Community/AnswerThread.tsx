import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useGlobalState } from "../../contexts/GlobalContext";
import { User, Question } from "./types";
import { getAnswers, postAnswer } from "../handlers/communityHandlers";

interface AnswerThreadProps {
  question: Question;
}

interface Answer {
  content: string;
  created_at: Date;
  user: User;
  accepted: boolean;
}

const AnswerThread: React.FC<AnswerThreadProps> = ({ question }) => {
  const { state } = useGlobalState();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<Answer[]>([]);

  const [inputAnswer, setInputAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        // Simulate fetching answers from an API
        const fetchedAnswers: any = await getAnswers(question.id);
        setAnswers(fetchedAnswers);
        // console.log("Fetched answers:", fetchedAnswers);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };
    fetchAnswers();
  }, [question.id]);

  const handleSubmitAnswer = async () => {
    const newAnswer = inputAnswer.trim();
    if (!newAnswer) return;

    setSubmitting(true);
    const submittedAnswer: any = await postAnswer(question.id, newAnswer);
    setAnswers((prev) => [...prev, submittedAnswer]);

    setInputAnswer("");
    setSubmitting(false);
  };

  return (
    <div
      className={`w-full h-full sm:h-fit mx-auto p-4 sm:p-6 shadow-md ${
        state.darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      <button
        className={`flex ${state.darkMode ? "text-white" : "text-gray-900"}`}
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
        <span>Back</span>
      </button>

      <h2
        className={`text-2xl font-bold mb-4 ${
          state.darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {question.title}
      </h2>
      <p
        className={` mb-2 ${
          state.darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {question.description}
      </p>

      {question.tags &&
        question.tags.map((tag, index) => (
          <span
            key={index}
            className={`inline-block px-2 py-1 mr-2 mb-2 text-xs font-semibold rounded-full ${
              state.darkMode
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {tag}
          </span>
        ))}

      <div className="flex justify-between items-center mt-2 mb-4">
        <span
          className={`text-sm ${
            state.darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Asked by {question.user?.name} on{" "}
          {new Date(question.created_at || Date.now()).toLocaleDateString()}
        </span>
        <span
          className={`text-sm ${
            state.darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {answers.length} Answers
        </span>
      </div>
      <div className="space-y-4">
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`p-2 sm:p-4 rounded-lg ${
              state.darkMode ? "bg-gray-800" : "bg-white"
            } shadow-sm`}
          >
            <div className="flex justify-between items-center mb-2">
              {answer.accepted && (
                <span
                  className={`text-xs ${
                    state.darkMode ? "text-green-400" : "text-green-600"
                  } font-semibold`}
                >
                  Accepted ✔️
                </span>
              )}
            </div>
            <p
              className={`${
                state.darkMode ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {answer.content}
            </p>
            <span
              className={`text-xs ${
                state.darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Answered by {answer.user?.name} on{" "}
              {new Date(answer.created_at || Date.now()).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <textarea
          value={inputAnswer}
          onChange={(e) => setInputAnswer(e.target.value)}
          className={`w-full p-2 rounded-lg border ${
            state.darkMode
              ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          rows={4}
          placeholder="Write your answer here..."
        ></textarea>
        <button
          onClick={handleSubmitAnswer}
          disabled={submitting}
          className={`mt-2 px-4 py-2 rounded disabled:bg-blue-400 ${
            state.darkMode
              ? "bg-blue-700 hover:bg-blue-800 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } transition-colors duration-200`}
        >
          Submit Answer
        </button>
        User Management
      </div>
    </div>
  );
};

export default AnswerThread;
