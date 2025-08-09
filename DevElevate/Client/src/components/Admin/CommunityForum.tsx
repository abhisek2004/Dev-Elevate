import React, { useEffect, useState } from 'react'
import { GlobalState, useGlobalState } from '../../contexts/GlobalContext';
import { ChevronLeft } from 'lucide-react';
import { getQuestions, getAnswers, deleteQuestion, markAsResolved, acceptAnswer } from '../handlers/communityHandlers';

interface User {
    name: string;
}

interface Question {
    id: string;
    title: string;
    description: string;
    tags: string[];
    user: User
    createdAt: string;
    answers: string[];
    isResolved: boolean;
}

interface Answer {
    id: string;
    questionId: string;
    content: string;
    createdAt: string;
    user: User
    accepted: boolean;
}

interface QuestionListProps {
    questions: Question[];
    setQuestion: (question: Question) => void;
    state: GlobalState;
}

interface QuestionCardProps {
    question: Question;
    setQuestion: (question: Question) => void;
    state: GlobalState;
}

interface AnswerThreadProps {
    question: Question;
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    navigateBack: () => void;
    state: GlobalState;
}

const CommunityForum = () => {
    const { state } = useGlobalState();
    const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);

    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const fetchedQuestions: any = await getQuestions();
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
            }
        }
        fetchQuestions();
    }, []);

    return (
        <>
            {activeQuestion ? (
                <AnswerThread question={activeQuestion} setQuestions={setQuestions} navigateBack={() => setActiveQuestion(null)} state={state} />
            ) : (
                <QuestionList questions={questions} setQuestion={q => setActiveQuestion(q)} state={state} />
            )}
        </>
    )
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, setQuestion, state }) => {
    return (
        <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-10">
                    <h1 className={`text-3xl font-extrabold tracking-tight ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                        Community Forum
                    </h1>
                    <p className={`text-lg leading-relaxed  ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Discuss various topics, ask questions and share your knowledge with others.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {questions.map(question =>
                        <QuestionCard key={question.id} question={question} setQuestion={setQuestion} state={state} />
                    )}
                </div>
            </div>
        </div>
    )
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, setQuestion, state }) => {
    return (
        <div
            onClick={() => setQuestion(question)}
            className={`p-6 rounded-lg shadow-md flex-col justify-between transition-colors duration-200 cursor-pointer
                ${state.darkMode
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`
            }
        >
            <div>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-ellipsis">{question.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2 text-ellipsis">{question.description}</p>
            </div>

            {question.tags && question.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className={`inline-block px-2 py-1 mr-2 mb-2 text-xs font-semibold rounded-full ${state.darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
                    {tag}
                </span>
            ))}

            <div>
                <div>
                    <span className="text-sm text-gray-500">By {question.user.name}</span>
                    <span className="ml-2 text-sm text-gray-500">{new Date(question.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className={`text-sm ${question.isResolved ? 'text-green-500' : 'text-red-500'}`}>
                        {question.isResolved ? 'Resolved' : 'Unresolved'}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">{question.answers.length} answers</span>
                </div>
            </div>
        </div>
    )
};

const AnswerThread: React.FC<AnswerThreadProps> = ({ question, setQuestions, navigateBack, state }) => {
    const [resolved, setResolved] = useState(question.isResolved);
    const [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const fetchedAnswers: any = await getAnswers(question.id);
                setAnswers(fetchedAnswers);
            } catch (error) {
                console.error('Failed to fetch answers:', error);
            }
        }
        fetchAnswers();
    }, [question.id]);

    const handleDelete = async () => {
        try {
            await deleteQuestion(question.id);
            setQuestions(prevQuestions => prevQuestions.filter(q => q.id !== question.id));
            navigateBack(); // Navigate back after deletion
        } catch (error) {
            console.error('Failed to delete question:', error);
        }
    }

    const handleResolve = async () => {
        try {
            await markAsResolved(question.id);
            setResolved(true);
            setQuestions(prevQuestions => prevQuestions.map(q => q.id === question.id ? { ...q, isResolved: true } : q));
        } catch (error) {
            console.error('Failed to mark question as resolved:', error);
        }
    }

    const handleAcceptAnswer = async (answerId: string) => {
        try {
            await acceptAnswer(answerId);
            setAnswers(prevAnswers => prevAnswers.map(answer => answer.id === answerId ? { ...answer, accepted: true } : answer));
        } catch (error) {
            console.error('Failed to accept answer:', error);
        }
    }

    return (
        <div className={`w-full h-full sm:h-fit mx-auto p-4 sm:p-6 rounded-lg shadow-md ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
            <button className={`flex ${state.darkMode ? 'text-white' : 'text-gray-900'}`} onClick={navigateBack}>
                <ChevronLeft />
                <span>Back</span>
            </button>

            <h2 className={`text-2xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>{question.title}</h2>
            <p className={`mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{question.description}</p>

            {question.tags && question.tags.map((tag, index) => (
                <span key={index} className={`inline-block px-2 py-1 mr-2 mb-2 text-xs font-semibold rounded-full ${state.darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
                    {tag}
                </span>
            ))}

            <div className="flex items-center justify-between mt-2 mb-4">
                <span className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Asked by {question.user.name} on {new Date(question.createdAt).toLocaleDateString()}</span>
                <span className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{answers.length} Answers</span>
            </div>

            <div className='flex items-center gap-4 mb-4'>
                {resolved ? (
                    <span className={`text-sm text-green-500 font-semibold`}>Resolved ✔️ </span>
                ) : (
                    <button
                        onClick={handleResolve}
                        className={`text-sm text-blue-500 hover:underline ${state.darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
                    >
                        Mark as Resolved
                    </button>
                )}
                <button
                    onClick={handleDelete}
                    className={`text-sm text-red-500 hover:underline ${state.darkMode ? 'hover:text-red-400' : 'hover:text-red-600'}`}
                >
                    Delete Question
                </button>
            </div>

            <div className="space-y-4">
                {answers.map((answer, index) => (
                    <div key={index} className={`p-2 sm:p-4 rounded-lg ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                        <div className="flex items-center justify-between mb-2">
                            {answer.accepted ? (<span className={`text-xs ${state.darkMode ? 'text-green-400' : 'text-green-600'} font-semibold`}>Accepted ✔️</span>) : (
                                <button
                                    onClick={() => handleAcceptAnswer(answer.id)}
                                    className={`text-xs text-blue-500 hover:underline ${state.darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
                                >
                                    Accept Answer
                                </button>
                            )}
                        </div>

                        <p className={`${state.darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{answer.content}</p>
                        <span className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Answered by {answer.user.name} on {new Date(answer.createdAt).toLocaleDateString()}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommunityForum;