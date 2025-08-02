import React, { useEffect, useState } from 'react';
import { Eye, X } from 'lucide-react';
import instance from '../../utils/axiosinstance';

interface DetailedAnswer {
  questionText: string;
  givenAnswer: string;
  expected: string;
  result: string;
}

interface Submission {
  student: string;
  email: string;
  score: number;
  submittedAt: string;
  answers: DetailedAnswer[];
}

interface QuizSubmissions {
  quiz: string;
  quizId: string;
  topic?: string;
  type?: string;
  submissions: Submission[];
}

interface SubmissionTrackerProps {
  darkMode: boolean;
}

const SubmissionTracker: React.FC<SubmissionTrackerProps> = ({ darkMode }) => {
  const [data, setData] = useState<QuizSubmissions[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllSubmissions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await instance.get('/admin/quiz/submissions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch submissions');
      } finally {
        setLoading(false);
      }
    };
    fetchAllSubmissions();
  }, []);

  return (
    <div className="mt-10 space-y-6">
      <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Submission Tracker</h2>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        View all quiz submissions and detailed student responses.
      </p>

      {loading && <p className="text-gray-400">Loading submissions...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && data.length === 0 && (
        <p className={`text-gray-500 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No quizzes found or no submissions yet.</p>
      )}

      {Array.isArray(data) && data.map((quizBlock) => (
        <div key={quizBlock.quizId} className={`rounded-xl border shadow p-6 ${darkMode ? 'border-gray-700 bg-gray-900' : 'bg-white border-gray-200'}`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{quizBlock.quiz}</h3>
              <p className="text-sm text-gray-400">Topic: {quizBlock.topic || 'N/A'} | Type: {quizBlock.type}</p>
            </div>
            {quizBlock.submissions.length > 0 && (
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}>
                {quizBlock.submissions.length} Submissions
              </span>
            )}
          </div>

          {quizBlock.submissions.length === 0 ? (
            <p className="text-gray-500 italic">No submissions yet for this quiz.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className={`w-full text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <thead className={darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-600'}>
                  <tr>
                    <th className="text-left p-3">Student</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-center p-3">Score</th>
                    <th className="text-center p-3">Submitted At</th>
                    <th className="text-center p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className={darkMode ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}>
                  {quizBlock.submissions.map((submission, idx) => (
                    <tr
                      key={idx}
                      className={darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}
                    >
                      <td className="p-3">{submission.student}</td>
                      <td className="p-3">{submission.email}</td>
                      <td className="p-3 text-center">{submission.score}</td>
                      <td className="p-3 text-center">{new Date(submission.submittedAt).toLocaleString()}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => {
                            setSelected(submission);
                            setSelectedQuiz(quizBlock.quiz);
                          }}
                          className={`hover:text-blue-500 ${darkMode ? 'text-gray-300' : 'text-blue-600'}`}
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <button
              onClick={() => setSelected(null)}
              className={`absolute top-2 right-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <X size={24} />
            </button>

            <h4 className="text-xl font-bold mb-4">Submission Details</h4>
            <p className="mb-1"><strong>Quiz:</strong> {selectedQuiz}</p>
            <p className="mb-1"><strong>Student:</strong> {selected.student} ({selected.email})</p>
            <p className="mb-1"><strong>Score:</strong> {selected.score}</p>
            <p className="mb-4"><strong>Submitted At:</strong> {new Date(selected.submittedAt).toLocaleString()}</p>

            <div className="mt-6 space-y-4">
              {selected.answers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-4 border rounded ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50'}`}
                >
                  <p className="font-medium mb-2">{ans.questionText}</p>
                  <p><strong>Given Answer:</strong> <pre className="font-mono whitespace-pre-wrap text-sm p-2 bg-gray-200 dark:bg-gray-700 rounded mt-1">{ans.givenAnswer}</pre></p>
                  <p><strong>Expected:</strong> <pre className="font-mono whitespace-pre-wrap text-sm p-2 bg-gray-200 dark:bg-gray-700 rounded mt-1">{ans.expected}</pre></p>
                  <p className="mt-2"><strong>Result:</strong> <span className={`font-semibold ${ans.result === 'Correct' ? 'text-green-500' : 'text-red-500'}`}>{ans.result}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionTracker;