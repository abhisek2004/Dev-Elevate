import React, { useContext } from 'react';

interface VideoData {
    title: string;
    creator: string;
    courseImage: string;
    creatorImage: string;
    link: string;
    description: string;
    videoId: string;
}

interface ThemeContextType {
    darkMode: boolean;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const UserVideoPage: React.FC = () => {
    const videoData={
        title: "React Tutorial for Beginners",
        creator: "John Doe",
        courseImage: "https://example.com/course-image.jpg",
        creatorImage: "https://example.com/creator-image.jpg",
        link: "https://www.youtube.com/watch?v=dGcsHMXbSOA",
        description: "Learn the basics of React in this comprehensive tutorial for beginners.",
        videoId: "dGcsHMXbSOA"

    }
    const { darkMode } = useContext(ThemeContext) || { darkMode: false }; // Default to false if context is undefined

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
            } transition-colors duration-200`}>
            <div className="p-6 mx-auto max-w-7xl">
                <div className="p-6 bg-white border border-gray-200 shadow-md dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                    <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
                        <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100 md:mb-0">
                            {videoData.title}
                        </h2>
                        <a
                            href={videoData.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm font-medium text-white transition transform rounded-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:scale-105"
                        >
                            Watch on YouTube
                        </a>
                    </div>
                    <div className="flex flex-col gap-6 md:flex-row">
                        <div className="w-full md:w-2/3">
                            <div className="relative pb-[56.25%] h-0">
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                    src={`https://www.youtube.com/embed/${videoData.videoId}`}
                                    title={videoData.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <p className="mt-4 text-gray-600 dark:text-gray-300">
                                {videoData.description}
                            </p>
                        </div>
                        <div className="flex flex-col items-center w-full md:w-1/3">
                            <img
                                src={videoData.creatorImage}
                                alt={`${videoData.creator}'s image`}
                                className="object-cover w-24 h-24 mb-4 border-2 border-gray-200 rounded-full dark:border-gray-600"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                {videoData.creator}
                            </h3>
                            <img
                                src={videoData.courseImage}
                                alt={`${videoData.title} image`}
                                className="object-cover w-full h-48 mt-4 border border-gray-200 rounded-lg dark:border-gray-600"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserVideoPage;