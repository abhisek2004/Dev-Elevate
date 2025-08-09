import React, { useState } from 'react'
import { useGlobalState } from '../../contexts/GlobalContext';
import { postQuestion } from '../handlers/communityHandlers';

interface AskQuestionFormProps {
    setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
    handleClose: () => void;
}

const AskQuestionForm: React.FC<AskQuestionFormProps> = ({ setQuestions, handleClose }) => {
    const { state } = useGlobalState();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!title || !description) {
            alert('Title and description are required.');
            return;
        }

        try {
            // Handle form submission logic here
            const postedQuestion = await postQuestion(title, description, tags.split(',').map(tag => tag.trim()));
            alert('Question Posted successfully!');
            setQuestions(prev => [...prev, postedQuestion]);
            handleClose();
        } catch (error) {
            console.error('Error posting question:', error);
            alert('Failed to post question. Please try again later.');
        }
    }

    return (
        <div className={`w-full h-full lg:w-1/2 sm:h-fit mx-auto p-6 rounded-lg shadow-md ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
            <h2 className={`text-2xl font-bold mb-4 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>Ask a Question</h2>
            <form>
                <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                        placeholder="Enter your question title"
                    />
                </div>
                <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`w-full resize-none p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                        rows={4}
                        placeholder="Describe your question in detail"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className={`block text-sm font-medium mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tags (Comma seperated)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${state.darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                        placeholder="Add tags (e.g., javascript, react)"
                    />
                </div>

                <div className="w-full flex flex-col justify-end items-center sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className={`px-4 py-2 rounded ${state.darkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        <span className="text-white font-semibold">Submit Question</span>
                    </button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className={`ml-2 px-4 py-2 rounded ${state.darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
                    >
                        <span className="font-semibold">Discard & Close</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AskQuestionForm
