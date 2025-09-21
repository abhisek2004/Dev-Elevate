import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useGlobalState } from './../../contexts/GlobalContext';
import { motion } from 'framer-motion';
import Loader from '../../components/Layout/Loader';
const cardVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    hover: {
        y: -8,
        scale: 1.02,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    }
};
const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1,
            ease: "easeOut"
        }
    }
};
const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};
function FallBackNotes() {
    const { state, dispatch } = useGlobalState();
    const { topic } = useParams();
    const [subjectData, setSubjectData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSubjectData = async () => {
            try {
                setLoading(true);
                const response = await import(`../assets/json/notesfolder/${topic}.json`);
                setSubjectData(response.default);
            } catch (error) {
                console.error('Error loading notes:', error);
                // Handle error (show 404 page, etc.)
            } finally {
                setLoading(false);
            }
        };

        loadSubjectData();
    }, [topic]);

    if (loading) return <Loader />;
    if (!subjectData) return (
        <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Enhanced Background with gradient overlay */}
            <motion.div
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
                className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
            >
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
                {/* Enhanced Header Section */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-12"
                >
                    <div className="inline-block">
                        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                            Notes & Resources for {topic}
                        </h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className={`h-1 rounded-full bg-gradient-to-r ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'}`}
                        ></motion.div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className={`mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
                    >
                        Resources not found for {topic}.
                    </motion.p>
                </motion.div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Go Home Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}
                        onClick={() => window.location.href = '/'}
                    >
                        <div className="text-4xl mb-4">🏠</div>
                        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                            Go Home
                        </h3>
                        <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                            Return to the main page and explore all available resources
                        </p>
                    </motion.div>

                    {/* Explore More Notes Card */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        whileHover="hover"
                        className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}
                        onClick={() => window.location.href = '/notes'}
                    >
                        <div className="text-4xl mb-4">📚</div>
                        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                            Explore More Notes
                        </h3>
                        <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                            Discover all available subjects and learning resources
                        </p>
                    </motion.div>
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        whileHover="hover"
                        className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}
                        onClick={() => window.location.href = '/contact'}
                    >
                        <div className="text-4xl mb-4">📧</div>
                        <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>
                            Contact Support
                        </h3>
                        <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                            Need help or have questions? Get in touch with our support team for assistance
                        </p>
                    </motion.div>
                </div>

            </div>
        </div>
    );

    return (
        <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
            {/* Enhanced Background with gradient overlay */}
            <motion.div
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
                className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
            >
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
                {/* Enhanced Header Section */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-12"
                >
                    <div className="inline-block">
                        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                            Notes & Resources for {topic}
                        </h1>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className={`h-1 rounded-full bg-gradient-to-r ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'}`}
                        ></motion.div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className={`mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
                    >
                        Access curated notes, study materials, and resources for {topic} to enhance your learning journey.
                    </motion.p>
                </motion.div>
                {/* Notes Content Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        subjectData.map((item, ind) => {
                            return (
                                <NotesCard key={ind} isDark={isDark} item={item} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
const NotesCard = ({ isDark, item }) => {
    return (
        <motion.div
            variants={cardVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col justify-between min-h-[200px] hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}
        >
            <div className='flex gap-2' >
                <img className={`size-10 rounded-full ${isDark ? 'border-white' : 'border-black'} border-2 p-2`} src={item.logo} alt={item.provider} />
                <span className='text-xl ' >{item.category}</span>

            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className={`mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {item.description}
            </p>
            <a className={`relative z-10 inline-flex items-center justify-center py-3 px-4 sm:px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm sm:text-base`}
                href={item.link}
                target='_blank'
            >
                View Notes
            </a>
        </motion.div>
    );
}
export default FallBackNotes;