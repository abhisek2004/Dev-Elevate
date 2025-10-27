import React, { useState, useEffect, useRef } from 'react';
import { Search, Star, BookmarkPlus, BookmarkCheck, Play, Filter, X, TrendingUp, Clock, Users } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import {
    updateVideoProgress,
    getContinueLearning,
    saveVideo,
    unsaveVideo,
    getSavedVideos,
    getYouTubeCourses,
} from '../../services/videoProgressService';
import { getAllAdminCourses } from '../../services/adminCourseService';
interface VideoData {
    title: string;
    creator: string;
    courseImage: string;
    creatorImage: string;
    link: string;
    description: string;
    videoId: string;
    category?: string;
    duration?: string;
    students?: number;
    rating?: number;
    progress?: number;
    courseId?: string; // ✅ ADD: For API integration
}
interface VideoProgressData {
    progressPercentage: number;
    currentTime: number;
    duration: number;
}
declare global {
    interface Window {
        YT: {
            Player: new (elementId: string, config: Record<string, unknown>) => YTPlayer;
        };
        onYouTubeIframeAPIReady: () => void;
    }
}

interface YTPlayer {
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    getCurrentTime(): number;
    getDuration(): number;
    destroy(): void;
}
/*const fetchCourses = async (): Promise<VideoData[] | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const hasData = Math.random() > 0.1;
            if (hasData) {
                resolve([
                    {
                        title: "Introduction to HTML, CSS, JavaScript & Web Basics",
                        creator: "CodeWithHarry",
                        courseImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
                        creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harry",
                        link: "https://www.youtube.com/watch?v=dGcsHMXbSOA",
                        description: "Learn the basics of web development in Hindi. Perfect for beginners starting their coding journey.",
                        videoId: "dGcsHMXbSOA",
                        courseId: "675a1234567890abcdef1234", // ✅ ADD: Unique course ID
                        category: "Web Development",
                        duration: "12h 30m",
                        students: 45000,
                        rating: 4.8,
                        progress: 0 // Will be updated from API
                    },
                    {
                        title: "Web Development Course",
                        creator: "Apna College",
                        courseImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
                        creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Apna",
                        link: "https://www.youtube.com/watch?v=example2",
                        description: "Comprehensive web development course covering frontend and backend technologies.",
                        videoId: "example2",
                        courseId: "675a1234567890abcdef1235",
                        category: "Web Development",
                        duration: "18h 45m",
                        students: 62000,
                        rating: 4.9,
                        progress: 0
                    },
                    {
                        title: "React JS Complete Tutorial",
                        creator: "Tech Academy",
                        courseImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
                        creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
                        link: "https://www.youtube.com/watch?v=example3",
                        description: "Master React JS from basics to advanced concepts with hands-on projects.",
                        videoId: "example3",
                        courseId: "675a1234567890abcdef1236",
                        category: "Frontend",
                        duration: "15h 20m",
                        students: 38000,
                        rating: 4.7,
                        progress: 0
                    },
                    {
                        title: "Python Programming Masterclass",
                        creator: "Code Masters",
                        courseImage: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80",
                        creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code",
                        link: "https://www.youtube.com/watch?v=example4",
                        description: "Learn Python programming from scratch to advanced level with real-world projects.",
                        videoId: "example4",
                        courseId: "675a1234567890abcdef1237",
                        category: "Programming",
                        duration: "20h 15m",
                        students: 72000,
                        rating: 4.9,
                        progress: 0
                    },
                    {
                        title: "Data Structures & Algorithms",
                        creator: "DSA Pro",
                        courseImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
                        creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=DSA",
                        link: "https://www.youtube.com/watch?v=example5",
                        description: "Master DSA concepts essential for coding interviews and competitive programming.",
                        videoId: "example5",
                        courseId: "675a1234567890abcdef1238",
                        category: "Algorithms",
                        duration: "25h 30m",
                        students: 55000,
                        rating: 4.8,
                        progress: 0
                    },
                    {
                        title: "UI/UX Design Fundamentals",
                        creator: "Design Studio",
                        courseImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
                        creatorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design",
                        link: "https://www.youtube.com/watch?v=example6",
                        description: "Learn the principles of great UI/UX design and create stunning user experiences.",
                        videoId: "example6",
                        courseId: "675a1234567890abcdef1239",
                        category: "Design",
                        duration: "10h 45m",
                        students: 28000,
                        rating: 4.6,
                        progress: 0
                    }
                ]);
            } else {
                resolve(null);
            }
        }, 1000);
    });
};*/
const formatTime = (minutes: number): string => {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);

    if (hrs > 0) {
        return `${hrs}h ${mins}m`;
    }
    return `${mins}m`;
};
const UserVideoPage: React.FC = () => {
    const { state } = useGlobalState();
    const darkMode = state.darkMode;
    const [courses, setCourses] = useState<VideoData[] | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<VideoData | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // NEW
    const [loading, setLoading] = useState(true);
    const [searching, setSearching] = useState(false); // NEW
    const [error, setError] = useState<string | null>(null); // NEW
    const [bookmarkedCourses, setBookmarkedCourses] = useState<Set<string>>(new Set());
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('popular');
    const [showFilters, setShowFilters] = useState(false);
    const [activeTab, setActiveTab] = useState<'youtube' | 'admin'>('youtube');
    // ✅ ADD: New state for API integration
    const [videoProgress, setVideoProgress] = useState<Record<string, VideoProgressData>>({});
    const [progressLoading, setProgressLoading] = useState<boolean>(false);
    const playerRef = useRef<YTPlayer | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const hasStartedFromSavedTime = useRef(false);
    // ✅ IMPROVED: Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // Wait 500ms after user stops typing

        return () => clearTimeout(timer);
    }, [searchTerm]);
    // ✅ ADD: Load courses with saved videos and progress data
    // ✅ UPDATE: Load courses from YouTube API
    // ✅ IMPROVED: Load courses with better error handling
    useEffect(() => {
        const loadCourses = async () => {
            // Show searching state only if there's a search term
            if (debouncedSearchTerm) {
                setSearching(true);
            } else {
                setLoading(true);
            }

            setError(null);

            try {
                console.log('🔍 Loading courses with:', {
                    search: debouncedSearchTerm || 'default',
                    category: selectedCategory
                });

                // ✅ Fetch real YouTube courses
                const youtubeResponse = await getYouTubeCourses(
                    debouncedSearchTerm || undefined,
                    selectedCategory !== 'All' ? selectedCategory : undefined,
                    12
                );

                console.log('📦 YouTube API Response:', youtubeResponse);

                let coursesData: VideoData[] | null = null;

                if (activeTab === 'youtube') {
                    // Fetch YouTube courses
                    const youtubeResponse = await getYouTubeCourses(
                        debouncedSearchTerm || undefined,
                        selectedCategory !== 'All' ? selectedCategory : undefined,
                        12
                    );

                    if (youtubeResponse.success && youtubeResponse.data) {
                        coursesData = youtubeResponse.data;
                    }
                } else {
                    // ✅ NEW: Fetch Admin courses
                    const adminResponse = await getAllAdminCourses(
                        debouncedSearchTerm || undefined,
                        selectedCategory !== 'All' ? selectedCategory : undefined
                    );

                    if (adminResponse.success && adminResponse.data) {
                        coursesData = adminResponse.data;
                    }
                }
                // ✅ NEW: Show loading state for progress
                setProgressLoading(true)

                // Fetch saved videos from API
                try {
                    const savedResponse = await getSavedVideos();
                    if (savedResponse.success && savedResponse.data) {
                        const savedIds = new Set<string>(
                            savedResponse.data.map((v: { videoId: string }) => v.videoId)
                        );
                        setBookmarkedCourses(savedIds);
                        console.log('📚 Loaded', savedIds.size, 'saved videos');
                    }
                } catch (error) {
                    console.log("Could not load saved videos:", error);
                }

                // Fetch continue learning data
                // ✅ IMPROVED: Fetch progress data properly
                try {
                    const continueResponse = await getContinueLearning();
                    if (continueResponse.success && continueResponse.data) {
                        const progressMap: Record<string, VideoProgressData> = {};

                        continueResponse.data.forEach((item: { videoId: string; progressPercentage: number; currentTime: number; duration: number }) => {
                            progressMap[item.videoId] = {
                                progressPercentage: Math.round(item.progressPercentage || 0),
                                currentTime: item.currentTime || 0,
                                duration: item.duration || 0
                            };
                        });

                        setVideoProgress(progressMap);
                        console.log('📊 Loaded progress for', Object.keys(progressMap).length, 'videos');
                    }
                } catch (error) {
                    console.log("Could not load progress data:", error);
                } finally {
                    setProgressLoading(false);
                }

                // Merge progress into courses
                if (coursesData && coursesData.length > 0) {
                    const coursesWithProgress = coursesData.map((course) => ({
                        ...course,
                        progress: videoProgress[course.videoId]?.progressPercentage || 0,
                    }));
                    setCourses(coursesWithProgress);
                } else if (debouncedSearchTerm) {
                    // If there's a search term but no results, set courses to empty array
                    setCourses([]);
                } else {
                    setCourses(null);
                }
            } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : "Failed to load courses. Please try again.";
                console.error("❌ Error loading courses:", error);
                setError(errorMessage);
                setCourses(null);
            } finally {
                setLoading(false);
                setSearching(false);
            }
        };

        loadCourses();
    }, [debouncedSearchTerm, selectedCategory, activeTab]); // ✅ Add activeTab



    // ✅ MODIFIED: Toggle bookmark with API integration
    const toggleBookmark = async (videoId: string, course?: VideoData) => {
        const isCurrentlyBookmarked = bookmarkedCourses.has(videoId);

        try {
            if (isCurrentlyBookmarked) {
                // Unsave from API
                await unsaveVideo(videoId);
                setBookmarkedCourses(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(videoId);
                    return newSet;
                });
            } else {
                // Save to API
                if (course) {
                    await saveVideo(
                        videoId,
                        course.courseId || 'unknown',
                        course.title,
                        course.category || 'Uncategorized'
                    );
                    setBookmarkedCourses(prev => new Set(prev).add(videoId));
                }
            }
        } catch (error) {
            console.error("Error toggling bookmark:", error);
            // Fallback to local state if API fails
            setBookmarkedCourses(prev => {
                const newSet = new Set(prev);
                if (newSet.has(videoId)) {
                    newSet.delete(videoId);
                } else {
                    newSet.add(videoId);
                }
                return newSet;
            });
        }
    };

    const startProgressTracking = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        progressIntervalRef.current = setInterval(() => {
            if (playerRef.current && selectedCourse) {
                const currentTime = playerRef.current.getCurrentTime();
                const duration = playerRef.current.getDuration();

                if (currentTime && duration) {
                    saveCurrentProgress(currentTime, duration);
                }
            }
        }, 10000);
    };

    const stopProgressTracking = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    };

    const saveCurrentProgress = async (currentTime: number, duration: number) => {
        if (!selectedCourse) return;

        try {
            const progressPercentage = (currentTime / duration) * 100;

            await updateVideoProgress(
                selectedCourse.videoId,
                selectedCourse.courseId || 'unknown',
                currentTime,
                duration
            );

            setVideoProgress(prev => ({
                ...prev,
                [selectedCourse.videoId]: {
                    progressPercentage: Math.round(progressPercentage),
                    currentTime,
                    duration
                }
            }));

            console.log('💾 Progress saved:', Math.round(progressPercentage) + '%');
        } catch (error) {
            console.error("Failed to save progress:", error);
        }
    };

    useEffect(() => {
        if (!selectedCourse) return;

        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const initializePlayer = () => {
            if (!selectedCourse) return;

            const savedProgress = videoProgress[selectedCourse.videoId];
            const startTime = savedProgress?.currentTime || 0;

            console.log('🎬 Initializing player at', startTime, 'seconds');

            playerRef.current = new window.YT.Player('youtube-player', {
                videoId: selectedCourse.videoId,
                playerVars: {
                    autoplay: 1,
                    start: Math.floor(startTime),
                    rel: 0,
                    modestbranding: 1
                },
                events: {
                    onReady: () => {
                        console.log('✅ Player ready');
                        hasStartedFromSavedTime.current = false;
                    },
                    onStateChange: (event: { data: number; target: YTPlayer }) => {
                        const playerState = event.data;

                        if (playerState === 1) {
                            console.log('▶️ Video playing');
                            startProgressTracking();

                            if (!hasStartedFromSavedTime.current && selectedCourse) {
                                const savedProgress = videoProgress[selectedCourse.videoId];
                                if (savedProgress && savedProgress.currentTime > 0) {
                                    console.log('⏩ Seeking to saved position:', savedProgress.currentTime);
                                    event.target.seekTo(savedProgress.currentTime, true);
                                    hasStartedFromSavedTime.current = true;
                                }
                            }
                        } else if (playerState === 2 || playerState === 0) {
                            console.log('⏸️ Video paused/ended');
                            stopProgressTracking();

                            if (selectedCourse && playerRef.current) {
                                const currentTime = playerRef.current.getCurrentTime();
                                const duration = playerRef.current.getDuration();
                                saveCurrentProgress(currentTime, duration);
                            }
                        }
                    }
                }
            });
        };

        window.onYouTubeIframeAPIReady = () => {
            initializePlayer();
        };

        if (window.YT && window.YT.Player) {
            initializePlayer();
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
            stopProgressTracking();
        };
    }, [selectedCourse, videoProgress]);

    useEffect(() => {
        return () => {
            stopProgressTracking();
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, []);


    const categories = ['All', ...Array.from(new Set(courses?.map(c => c.category) || []))];

    const filteredAndSortedCourses = courses
        ?.filter((course) => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.creator.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'popular') return (b.students || 0) - (a.students || 0);
            if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
            if (sortBy === 'duration') return (a.duration || '').localeCompare(b.duration || '');
            return 0;
        }) || [];

    const CourseCard = ({ course }: { course: VideoData }) => {
        const isBookmarked = bookmarkedCourses.has(course.videoId);
        // ✅ MODIFIED: Use videoProgress state instead of course.progress directly
        const progress = videoProgress[course.videoId]?.progressPercentage || 0;
        const isLoadingProgress = progressLoading && !videoProgress[course.videoId];

        return (
            <div className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${darkMode ? 'bg-[#374151]' : 'bg-white'
                }`}>

                <div className="relative overflow-hidden">
                    <img
                        src={course.courseImage}
                        alt={course.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(course.videoId, course); // ✅ MODIFIED: Pass course object
                        }}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm hover:scale-110 transition-transform duration-200 z-10 ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'
                            }`}

                    >
                        {isBookmarked ? (
                            <BookmarkCheck className="w-5 h-5 text-purple-600" />
                        ) : (
                            <BookmarkPlus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        )}
                    </button>
                    {/* ✅ MODIFIED: Use progress variable */}
                    {/* ✅ NEW: Progress bar with loading state */}
                    {isLoadingProgress ? (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30">
                            <div className="h-full bg-gray-400/50 animate-pulse" style={{ width: '50%' }} />
                        </div>
                    ) : progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30">
                            <div
                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                </div>

                <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${darkMode
                            ? 'text-purple-400 bg-purple-900/30'
                            : 'text-purple-600 bg-purple-100'
                            }`}>
                            {course.category}
                        </span>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {course.rating}
                            </span>
                        </div>
                    </div>

                    <h3 className={`text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem] ${darkMode ? 'text-gray-100' : 'text-gray-800'
                        }`}>
                        {course.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                        <img
                            src={course.creatorImage}
                            alt={course.creator}
                            className="w-6 h-6 rounded-full border-2 border-gray-200 dark:border-gray-600"
                        />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{course.creator}</span>
                    </div>

                    <div className={`flex items-center justify-between text-xs mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{(course.students || 0).toLocaleString()}</span>
                        </div>
                    </div>

                    {/* ✅ MODIFIED: Use progress variable */}
                    {progress > 0 ? (
                        <button
                            onClick={() => setSelectedCourse(course)}
                            className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <Play className="w-4 h-4" />
                            Continue Learning ({progress}%)
                        </button>
                    ) : (
                        <button
                            onClick={() => setSelectedCourse(course)}
                            className={`w-full py-2.5 px-4 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 ${darkMode
                                ? 'bg-gray-900 hover:bg-gray-600'
                                : 'bg-gray-800 hover:bg-gray-900'
                                }`}
                        >
                            Start Course
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const LoadingSkeleton = ({ message = "Loading courses..." }: { message?: string }) => (
        <div className="space-y-4">
            <div className="text-center py-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="animate-spin w-5 h-5 border-3 border-purple-600 border-t-transparent rounded-full"></div>
                    <span className="text-purple-700 dark:text-purple-300 font-medium">{message}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            </div>
        </div>
    );

    return (
        <div className={`min-h-screen ${darkMode ? "bg-[#2d3748]" : "bg-gray-50"} transition-colors duration-200`}>
            <div className="p-6 mx-auto max-w-7xl">
                {!selectedCourse ? (
                    <>
                        <div className="mb-8">
                            <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                                All Courses
                            </h1>
                            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Discover comprehensive courses designed to accelerate your learning journey and master new skills.
                            </p>
                        </div>
                        {/* ✅ UPDATED: Tab Switcher with better dark mode styling */}
<div className="mb-6">
    <div className={`flex gap-2 p-1 rounded-xl w-fit ${
        darkMode ? 'bg-gray-700/50' : 'bg-gray-200'
    }`}>
        <button
            onClick={() => setActiveTab('youtube')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'youtube'
                    ? darkMode
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-white text-purple-600 shadow-md'
                    : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-600/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
        >
            YouTube Courses
        </button>
        <button
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'admin'
                    ? darkMode
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-white text-purple-600 shadow-md'
                    : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-600/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
        >
            Admin Courses
        </button>
    </div>
</div>
                        <div className="mb-6 space-y-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search courses or creators..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 
                                            ${darkMode
                                                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
                                                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                                            }`}

                                    />
                                </div>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`px-6 py-3 border-2 rounded-xl transition-all duration-200 flex items-center gap-2 justify-center ${darkMode
                                        ? 'bg-gray-700 border-gray-600 text-gray-100 hover:border-purple-500'
                                        : 'bg-white border-gray-200 text-gray-900 hover:border-purple-500'
                                        }`}
                                >
                                    <Filter className="w-5 h-5" />
                                    <span className="font-medium">Filters</span>
                                </button>
                            </div>

                            {showFilters && (
                                <div className="p-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Category
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => setSelectedCategory(category || "All")}
                                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedCategory === category
                                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                        }`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Sort By
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { value: 'popular', label: 'Most Popular', icon: TrendingUp },
                                                { value: 'rating', label: 'Highest Rated', icon: Star },
                                                { value: 'duration', label: 'Duration', icon: Clock }
                                            ].map(({ value, label, icon: Icon }) => (
                                                <button
                                                    key={value}
                                                    onClick={() => setSortBy(value)}
                                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${sortBy === value
                                                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                        }`}
                                                >
                                                    <Icon className="w-4 h-4" />
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {loading || searching ? (
                            <LoadingSkeleton message={searching ? `Searching for "${debouncedSearchTerm}"...` : "Loading courses..."} />
                        ) : error ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <X className="w-12 h-12 text-red-500 dark:text-red-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Oops! Something went wrong
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    {error}
                                </p>
                                <button
                                    onClick={() => {
                                        setError(null);
                                        setDebouncedSearchTerm('');
                                        setSearchTerm('');
                                    }}
                                    className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all duration-200"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : courses && courses.length > 0 ? (
                            <>
                                {filteredAndSortedCourses.length > 0 ? (
                                    <>
                                        <div className={`mb-4 flex items-center justify-between ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            <div className="text-sm">
                                                Showing {filteredAndSortedCourses.length} {filteredAndSortedCourses.length === 1 ? 'course' : 'courses'}
                                                {debouncedSearchTerm && (
                                                    <span className="ml-2">
                                                        for <span className="font-semibold text-purple-600 dark:text-purple-400">"{debouncedSearchTerm}"</span>
                                                    </span>
                                                )}
                                            </div>
                                            {debouncedSearchTerm && (
                                                <button
                                                    onClick={() => {
                                                        setSearchTerm('');
                                                        setDebouncedSearchTerm('');
                                                    }}
                                                    className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                                >
                                                    Clear search
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {filteredAndSortedCourses.map((course) => (
                                                <CourseCard key={course.videoId} course={course} />
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-16">
                                        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Search className="w-12 h-12 text-gray-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            No courses found
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            {debouncedSearchTerm ? (
                                                <>
                                                    No results for <span className="font-semibold">"{debouncedSearchTerm}"</span>
                                                    <br />
                                                    Try different keywords or check your spelling
                                                </>
                                            ) : (
                                                "Try adjusting your filters"
                                            )}
                                        </p>
                                        {debouncedSearchTerm && (
                                            <button
                                                onClick={() => {
                                                    setSearchTerm('');
                                                    setDebouncedSearchTerm('');
                                                }}
                                                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all duration-200"
                                            >
                                                Clear Search
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <X className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    No courses available
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Unable to load courses at this time
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all duration-200"
                                >
                                    Refresh Page
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={`space-y-8 pt-6 px-4 ${darkMode ? '' : 'bg-white'}`}>
                        <button
                            onClick={() => {
                                setSelectedCourse(null);
                                hasStartedFromSavedTime.current = false;
                            }}
                            className={`px-6  my-5 py-3 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2 ${darkMode
                                ? 'bg-gray-800 hover:bg-gray-900'
                                : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Courses
                        </button>

                        <div className={`rounded-2xl shadow-xl overflow-hidden ${darkMode ? 'bg-[#374151]' : 'bg-white'
                            }`}>
                            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'
                                }`}>
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${darkMode
                                                ? 'text-purple-400 bg-purple-900/30'
                                                : 'text-purple-600 bg-purple-100'
                                                }`}>
                                                {selectedCourse.category}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                                    }`}>
                                                    {selectedCourse.rating}
                                                </span>
                                            </div>
                                        </div>
                                        <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'
                                            }`}>
                                            {selectedCourse.title}
                                        </h2>
                                        <div className={`flex items-center gap-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{selectedCourse.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span>{(selectedCourse.students || 0).toLocaleString()} students</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => toggleBookmark(selectedCourse.videoId, selectedCourse)}
                                            className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${darkMode
                                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                                                }`}
                                        >
                                            {bookmarkedCourses.has(selectedCourse.videoId) ? (
                                                <>
                                                    <BookmarkCheck className="w-5 h-5" />
                                                    Saved
                                                </>
                                            ) : (
                                                <>
                                                    <BookmarkPlus className="w-5 h-5" />
                                                    Save
                                                </>
                                            )}
                                        </button>
                                        <a
                                            href={selectedCourse.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
                                        >
                                            Watch on YouTube
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 p-6">
                                <div className="md:col-span-2 space-y-6">
                                    <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg">
                                        {/*<iframe
                                            className="absolute top-0 left-0 w-full h-full"
                                            src={`https://www.youtube.com/embed/${selectedCourse.videoId}?enablejsapi=1`}
                                            title={selectedCourse.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>*/}
                                        { /* Video Player Container - Update the background */}
                                        <div className={`relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-black' : 'bg-gray-900 border-2 border-gray-300'
                                            }`}>

                                            <div
                                                id="youtube-player"
                                                className="absolute top-0 left-0 w-full h-full"
                                            />
                                        </div>
                                    </div>

                                    {/* ✅ MODIFIED: Use videoProgress state */}
                                    {/* Progress Section - Update styling */}
                                    {videoProgress[selectedCourse.videoId] && videoProgress[selectedCourse.videoId].progressPercentage > 0 && (
                                        <div className={`p-4 rounded-xl border ${darkMode
                                            ? 'bg-purple-900/20 border-purple-800'
                                            : 'bg-purple-50 border-purple-200'
                                            }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={`text-sm font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-900'
                                                    }`}>
                                                    Course Progress
                                                </span>
                                                <span className={`text-sm font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'
                                                    }`}>
                                                    {videoProgress[selectedCourse.videoId].progressPercentage}%
                                                </span>
                                            </div>
                                            <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-purple-900' : 'bg-purple-200'
                                                }`}>
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${videoProgress[selectedCourse.videoId].progressPercentage}%` }}
                                                />
                                            </div>
                                            <div className={`mt-2 text-xs ${darkMode ? 'text-purple-300' : 'text-purple-700'
                                                }`}>
                                                {formatTime(videoProgress[selectedCourse.videoId].currentTime / 60)} watched
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-800'
                                            }`}>
                                            About This Course
                                        </h3>
                                        <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'
                                            }`}>
                                            {selectedCourse.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className={`p-6 rounded-xl border-2 ${darkMode
                                        ? 'bg-gray-900 border-gray-700'
                                        : 'bg-gray-50 border-gray-200'
                                        }`}>
                                        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'
                                            }`}>
                                            Instructor
                                        </h3>
                                        <div className="flex items-center gap-3 mb-4">
                                            <img
                                                src={selectedCourse.creatorImage}
                                                alt={selectedCourse.creator}
                                                className={`w-16 h-16 rounded-full shadow-lg ${darkMode ? 'border-4 border-gray-800' : 'border-4 border-white'
                                                    }`}
                                            />
                                            <div>
                                                <h4 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'
                                                    }`}>
                                                    {selectedCourse.creator}
                                                </h4>
                                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                                                    }`}>
                                                    Course Instructor
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-6 rounded-xl border-2 ${darkMode
                                        ? 'bg-gray-900 border-gray-700'
                                        : 'bg-gray-50 border-gray-200'
                                        }`}>
                                        <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'
                                            }`}>
                                            Course Preview
                                        </h3>
                                        <img
                                            src={selectedCourse.courseImage}
                                            alt={selectedCourse.title}
                                            className="w-full rounded-lg shadow-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default UserVideoPage;