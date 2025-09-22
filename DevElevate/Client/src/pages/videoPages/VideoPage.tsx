import React, { useState, useEffect, useContext } from 'react';

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

// Mock backend fetch function (replace with actual API call)
const fetchCourses = async (): Promise<VideoData[] | null> => {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate admin upload condition (e.g., empty array if no data)
            const hasData = Math.random() > 0.3; // 70% chance of data being available
            if (hasData) {
                resolve([
                    {
                        title: "Introduction to HTML, CSS, JavaScript & Web Basics",
                        creator: "CodeWithHarry",
                        courseImage: "https://example.com/course1.jpg",
                        creatorImage: "https://example.com/harry.jpg",
                        link: "https://www.youtube.com/watch?v=dGcsHMXbSOA",
                        description: "Learn the basics of web development in Hindi.",
                        videoId: "dGcsHMXbSOA",
                    },
                    {
                        title: "Web Development Course",
                        creator: "Apna College",
                        courseImage: "https://example.com/course2.jpg",
                        creatorImage: "https://example.com/apna.jpg",
                        link: "https://www.youtube.com/watch?v=example2",
                        description: "Comprehensive web development course.",
                        videoId: "example2",
                    },
                ]);
            } else {
                resolve(null); // No data if admin hasn't uploaded
            }
        }, 1000); // Simulate network delay
    });
};

const UserVideoPage: React.FC = () => {
    const { darkMode } = useContext(ThemeContext) || { darkMode: false };
    const [courses, setCourses] = useState<VideoData[] | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<VideoData | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch courses on mount
    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            const data = await fetchCourses();
            setCourses(data);
            setLoading(false);
        };
        loadCourses();
    }, []);

    // Filter courses based on search term
    const filteredCourses = courses?.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} transition-colors duration-200`}>
            <div className="p-6 mx-auto max-w-7xl">
                {!selectedCourse ? (
                    <>
                        <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-gray-100">
                            All Courses
                        </h1>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            Discover comprehensive courses designed to accelerate your learning journey and master new skills.
                        </p>
                        <input
                            type="text"
                            placeholder="Search for courses.."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                        />
                        {loading ? (
                            <p className="text-gray-600 dark:text-gray-300">Loading courses...</p>
                        ) : courses ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course) => (
                                        <div
                                            key={course.videoId}
                                            className="transition border border-gray-200 rounded-lg shadow-md cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 hover:shadow-lg"
                                            onClick={() => setSelectedCourse(course)}
                                        >
                                            <img
                                                src={course.courseImage}
                                                alt={`${course.title} image`}
                                                className="object-cover w-full h-48 rounded-t-lg"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{course.title}</h3>
                                                <p className="mt-2 text-gray-600 dark:text-gray-300">{course.creator}</p>
                                                <button className="px-4 py-2 mt-4 text-sm font-medium text-white transition rounded-lg bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:scale-105">
                                                    Watch Now
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-300">No courses match your search.</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-300">No courses available. Please check back later or contact the admin.</p>
                        )}
                    </>
                ) : (
                    <div className="p-6 border border-gray-200 shadow-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-2xl">
                        <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
                            <h2 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100 md:mb-0">
                                {selectedCourse.title}
                            </h2>
                            <a
                                href={selectedCourse.link}
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
                                        src={`https://www.youtube.com/embed/${selectedCourse.videoId}`}
                                        title={selectedCourse.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <p className="mt-4 text-gray-600 dark:text-gray-300">
                                    {selectedCourse.description}
                                </p>
                            </div>
                            <div className="flex flex-col items-center w-full md:w-1/3">
                                <img
                                    src={selectedCourse.creatorImage}
                                    alt={`${selectedCourse.creator}'s image`}
                                    className="object-cover w-24 h-24 mb-4 border-2 border-gray-200 rounded-full dark:border-gray-600"
                                />
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    {selectedCourse.creator}
                                </h3>
                                <img
                                    src={selectedCourse.courseImage}
                                    alt={`${selectedCourse.title} image`}
                                    className="object-cover w-full h-48 mt-4 border border-gray-200 rounded-lg dark:border-gray-600"
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => setSelectedCourse(null)}
                            className="px-4 py-2 mt-6 text-sm font-medium text-white transition rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:scale-105"
                        >
                            Back to Courses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserVideoPage;