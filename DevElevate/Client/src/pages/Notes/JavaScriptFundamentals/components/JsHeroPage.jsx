import CodeBlock from './CodeBlock';
import { Link } from 'react-router-dom';
import { FiCode, FiBookOpen, FiLayers, FiChevronRight } from 'react-icons/fi';

const JsHeroPage = () => {
    const features = [
        {
            icon: <FiCode className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Comprehensive Guide',
            description: 'From basics to advanced concepts, master JavaScript with our structured learning path.'
        },
        {
            icon: <FiBookOpen className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Interactive Examples',
            description: 'Learn by doing with hands-on examples and live code editors.'
        },
        {
            icon: <FiLayers className='w-6 h-6 text-primary-600 dark:text-primary-400' />,
            title: 'Modern JavaScript',
            description: 'Stay up-to-date with the latest ES6+ features and best practices.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Master JavaScript <span className="text-primary-600 dark:text-primary-400">Fundamentals</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                    Start your journey to becoming a JavaScript pro with our comprehensive collection of notes, examples, and exercises.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/notes/javascript/introduction"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-200"
                    >
                        Get Started
                        <FiChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        to="/notes/javascript/what-are-variables"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        Explore Topics
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
                    What You'll Learn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
                            <div className="w-12 h-12 flex items-center justify-center bg-primary-50 dark:bg-primary-900/30 rounded-full mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Start Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Quick Start</h2>
                <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Try JavaScript in your browser</h3>
                    <CodeBlock
                        code={`// Welcome to JavaScript!
console.log('Hello, World!');

// Variables and Constants
const greeting = 'Welcome to JavaScript';
let count = 0;

// Function Example
function increment() {
    count++;
    return count;
}

console.log(greeting); // Output: Welcome to JavaScript`}
                    />
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Copy and paste this code into your browser's console to see it in action!
                    </p>
                </div>
            </section>
        </div>
    );
};

export default JsHeroPage;
