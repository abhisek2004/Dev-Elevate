import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import instance from '../../utils/axiosinstance';
import QuizForm from './QuizForm';

export interface Quiz {
  id: string;
  title: string;
  topic?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  type: 'MCQ' | 'Code';
  questions: any[];
  createdAt: string;
}

type QuizListProps = {
  darkMode: boolean;
  onEdit: (quiz: Quiz) => void;
};

const QuizList: React.FC<QuizListProps> = ({ darkMode, onEdit }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchQuizzes = async () => {
    try {
      const res = await instance.get('admin/quiz', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const normalized = (res.data || []).map((q: any) => ({
        ...q,
        id: q._id || q.id,
      }));
      setQuizzes(normalized);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to fetch quizzes');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await instance.delete(`admin/quiz/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete quiz');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchQuizzes();
    const handler = () => fetchQuizzes();
    window.addEventListener('quiz-updated', handler);
    return () => window.removeEventListener('quiz-updated', handler);
  }, []);

  return (
    <div className={`rounded-xl border shadow mt-6 overflow-x-auto ${darkMode ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-200'}`}>
      <table className="w-full min-w-[600px] text-sm">
        <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
          <tr>
            <th className={`p-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>Title</th>
            <th className={`p-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>Topic</th>
            <th className={`p-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>Difficulty</th>
            <th className={`p-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>Questions</th>
            <th className={`p-4 text-left font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>Created At</th>
            <th className={`p-4 text-center font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>Actions</th>
          </tr>
        </thead>
        <tbody className={darkMode ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}>
          {quizzes.length === 0 ? (
            <tr>
              <td colSpan={6} className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No quizzes available.
              </td>
            </tr>
          ) : (
            quizzes.map((quiz) => (
              <tr
                key={quiz.id}
                className={darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
              >
                <td className="p-4">{quiz.title}</td>
                <td className="p-4">{quiz.topic || '-'}</td>
                <td className="p-4">{quiz.difficulty || '-'}</td>
                <td className="p-4 text-center">{quiz.questions?.length || 0}</td>
                <td className="p-4">{new Date(quiz.createdAt).toLocaleDateString()}</td>
                <td className="p-4 flex gap-3 justify-center">
                  <button
                    onClick={() => onEdit(quiz)}
                    title="Edit Quiz"
                    disabled={deletingId === quiz.id}
                    className="text-blue-500 hover:text-blue-700 disabled:opacity-50"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete quiz "${quiz.title}"? This action cannot be undone.`)) {
                        handleDelete(quiz.id);
                      }
                    }}
                    title="Delete Quiz"
                    disabled={deletingId === quiz.id}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuizList;