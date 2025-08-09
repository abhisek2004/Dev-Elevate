import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../contexts/GlobalContext';
import { Question } from './types';

interface QuestionCardProps {
    question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
    const { state } = useGlobalState();

    return (
        <Link
            to={`/community/questions/${question.id}`}
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
        </Link>
    )
};

export default QuestionCard;