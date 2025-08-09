import React, { useEffect, useState } from 'react'
import { useGlobalState } from '../../contexts/GlobalContext';
import { Routes, Route, useParams } from 'react-router-dom';
import Toast from '../Layout/Toast';
import QuestionCard from './QuestionCard';
import AskQuestionForm from './AskQuestionForm';
import AnswerThread from './AnswerThread';
import { Question } from './types';
import { getQuestions } from '../handlers/communityHandlers';

// interface Answer {
//     content: string;
//     created_at: string;
//     user: User
//     accepted: boolean;
// }

interface QuestionsListProps {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

interface AnswerThreadWrapperProps {
  questions: Question[];
}

const CommunityForum: React.FC<QuestionsListProps> = ({ questions, setQuestions }) => {
  const { state } = useGlobalState();
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} darkMode={state.darkMode} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className={`text-3xl font-extrabold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Community Forum
          </h1>
          <p className={`text-lg leading-relaxed  ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discuss various topics, ask questions and share your knowledge with others.
          </p>
        </div>

        <button
          onClick={() => setShowPopupForm(true)}
          className={`mb-6 px-4 py-2 rounded ${state.darkMode ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} transition-colors duration-200`}
        >
          <span className="font-semibold">Ask a Question</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {questions.map(question =>
            <QuestionCard key={question.id} question={question} />
          )}
        </div>
      </div>

      {showPopupForm && (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 sm:p-6 bg-blue-300/60">
          <AskQuestionForm setQuestions={setQuestions} handleClose={() => setShowPopupForm(false)} />
        </div>
      )}
    </div>
  )
}

const CommunityRouter = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions: any = await getQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchQuestions();
  },[]);

  return (
    <Routes>
      <Route path="/" element={<CommunityForum questions={questions} setQuestions={setQuestions} />} />
      <Route path="/questions/:id" element={<AnswerThreadWrapper questions={questions} />} />
    </Routes>
  );
}


const AnswerThreadWrapper: React.FC<AnswerThreadWrapperProps> = ({ questions }) => {
  const { id } = useParams();
  const question = questions.find((q: Question) => q.id === id);

  if (!question) {
    return <div className="text-center text-red-500">Question not found</div>;
  }
  return <AnswerThread question={question} />;
}

export default CommunityRouter;