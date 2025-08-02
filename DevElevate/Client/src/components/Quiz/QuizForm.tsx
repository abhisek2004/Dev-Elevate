import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import instance from '../../utils/axiosinstance';
import { Quiz } from './QuizList';

export interface QuizQuestion {
  id?: string;
  _id?: string;
  questionText: string;
  options?: string[];
  correctAnswer?: string;
  expectedOutput?: string;
  isNew?: boolean;
  isDeleted?: boolean;
}

type QuizFormProps = {
  initialData?: Quiz | null;
  onClose: () => void;
  onSaved?: () => void;
  darkMode: boolean;
};

const QuizForm: React.FC<QuizFormProps> = ({ initialData, onClose, onSaved, darkMode }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [topic, setTopic] = useState(initialData?.topic || '');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | ''>(initialData?.difficulty || '');
  const [type, setType] = useState<'MCQ' | 'Code'>(initialData?.type || 'MCQ');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      const fetchQuizQuestions = async () => {
        try {
          const res = await instance.get(`/admin/quiz/${initialData.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          const fullQuiz = res.data.quiz;
          // Map questions to include a unique ID and other properties
          setQuestions((fullQuiz.questions || []).map((q: any) => ({ ...q, id: q._id })));
        } catch (err: any) {
          alert(err.response?.data?.message || 'Failed to fetch quiz questions');
        }
      };
      fetchQuizQuestions();
    } else {
      // For a new quiz, initialize with one empty question
      setQuestions([
        type === 'MCQ'
          ? { questionText: '', options: ['', '', '', ''], correctAnswer: '', isNew: true }
          : { questionText: '', expectedOutput: '', isNew: true },
      ]);
    }
  }, [initialData, type]); // Added 'type' to the dependency array

  const handleChange = (index: number, field: keyof QuizQuestion, value: any) => {
    setQuestions(prev => prev.map((q, i) => (i === index ? { ...q, [field]: value } : q)));
  };

  const handleOptionChange = (qi: number, oi: number, val: string) => {
    setQuestions(prev => prev.map((q, i) => {
      if (i !== qi || !q.options) return q;
      const opts = [...q.options];
      opts[oi] = val;
      return { ...q, options: opts };
    }));
  };

  const handleDeleteQuestion = (index: number) => {
    const q = questions[index];
    if (q.id) {
      setQuestions(prev => prev.map((item, i) => (i === index ? { ...item, isDeleted: true } : item)));
    } else {
      setQuestions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !difficulty || !type) return alert('Missing required quiz details');

    setSaving(true);
    try {
      let quizId = initialData?.id;

      if (initialData) {
        await instance.put(`/admin/quiz/${quizId}`, { title, topic, difficulty, type }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        const res = await instance.post('/admin/quiz', { title, topic, difficulty, type }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        quizId = res.data.quiz._id;
      }

      for (const q of questions) {
        if (q.isDeleted && q.id) {
          await instance.delete(`/admin/quiz/${quizId}/questions/${q.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
        } else if (q.isNew && !q.isDeleted) {
          await instance.post(`/admin/quiz/${quizId}/questions`, q, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
        } else if (q.id && !q.isDeleted) {
          await instance.put(`/admin/quiz/${quizId}/questions/${q.id}`, q, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
        }
      }

      onSaved?.();
      window.dispatchEvent(new Event('quiz-updated'));
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  const addQuestion = () => {
    const newQuestion = type === 'MCQ'
      ? { questionText: '', options: ['', '', '', ''], correctAnswer: '', isNew: true }
      : { questionText: '', expectedOutput: '', isNew: true };
    setQuestions(prev => [...prev, newQuestion]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className={`rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {initialData ? 'Edit Quiz' : 'Create Quiz'}
            </h2>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required disabled={saving}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
            <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic" disabled={saving}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select value={difficulty} onChange={e => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')} required disabled={saving}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <select value={type} onChange={e => setType(e.target.value as 'MCQ' | 'Code')} disabled={!!initialData || saving}
              className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
              <option value="MCQ">MCQ</option>
              <option value="Code">Code</option>
            </select>
          </div>

          <h3 className="text-lg font-semibold my-4">Questions</h3>

          {questions.filter(q => !q.isDeleted).map((q, i) => (
            <div key={i} className={`mb-4 p-4 border rounded relative ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100'}`}>
              <textarea
                value={q.questionText}
                onChange={e => handleChange(i, 'questionText', e.target.value)}
                placeholder={`Question ${i + 1}`}
                className={`w-full p-2 mb-2 border rounded ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                required
              />

              {type === 'MCQ' && (
                <>
                  {(q.options || []).map((opt, oi) => (
                    <input key={oi} type="text" value={opt} onChange={e => handleOptionChange(i, oi, e.target.value)}
                      placeholder={`Option ${oi + 1}`} className={`w-full mb-1 p-2 border rounded ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`} required />
                  ))}
                  <select value={q.correctAnswer} onChange={e => handleChange(i, 'correctAnswer', e.target.value)} className={`w-full p-2 border rounded mt-2 ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}>
                    <option value="">Correct Answer</option>
                    {(q.options || []).map((opt, oi) => (
                      <option key={oi} value={opt}>{opt}</option>
                    ))}
                  </select>
                </>
              )}

              {type === 'Code' && (
                <textarea
                  value={q.expectedOutput || ''}
                  onChange={e => handleChange(i, 'expectedOutput', e.target.value)}
                  placeholder="Expected Output"
                  className={`w-full mt-2 p-2 border rounded ${darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-gray-300'}`}
                />
              )}

              <button type="button" onClick={() => handleDeleteQuestion(i)} className="absolute top-2 right-2 text-red-600 hover:text-red-800">
                <X size={16} />
              </button>
            </div>
          ))}

          <button type="button" onClick={addQuestion} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            + Add Question
          </button>

          <div className="flex gap-4 mt-6 justify-end">
            <button type="submit" disabled={saving} className={`px-6 py-2 rounded-lg transition-colors ${saving ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
              {saving ? 'Saving...' : initialData ? 'Update Quiz' : 'Create Quiz'}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;