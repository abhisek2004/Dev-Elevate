import React from 'react';

const JsIntroduction = () => {

    const jsUsedFor = [
        {
            title: "Frontend Development",
            description: "Creating interactive user interfaces with frameworks like React, Angular, and Vue.js"
        },
        {
            title: "Backend Development",
            description: "Building server-side applications using Node.js, Express, and other runtime environments"
        },
        {
            title: "Mobile Development",
            description: "Creating cross-platform mobile apps with React Native, Ionic, and other frameworks"
        },
        {
            title: "Desktop Applications",
            description: "Building cross-platform desktop apps with Electron and other tools"
        }
    ]


    const tableContent = [
        {
            version: "ES5",
            year: 2009,
            features: "Strict mode, JSON support, array methods"
        },
        {
            version: "ES6/ES2015",
            year: 2015,
            features: "Let/const, arrow functions, classes, modules"
        },
        {
            version: "ES2016",
            year: 2016,
            features: "Async/await, optional chaining, nullish coalescing, top-level await"
        }
    ]

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Introduction to <span className='text-primary-600 dark:text-primary-400'>JavaScript</span></h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Welcome to the JavaScript fundamentals course on Codify! This tutorial is designed to be your comprehensive guide to learning JavaScript, from the basics to advanced concepts. Whether you're just starting your programming journey or looking to refresh your skills, this resource will serve as a valuable reference throughout your learning process.
                </p>

                <div className={`mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors `}>
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Did you know?</strong> JavaScript is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Learn JavaScript?</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript brings websites to life by adding interactivity and dynamic behavior. Think of a website as a house:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li><strong className="font-semibold text-gray-800 dark:text-white">HTML</strong> is like the structure - walls, floors, and roof</li>
                        <li><strong className="font-semibold text-gray-800 dark:text-white">CSS</strong> is the paint and decoration - making it look beautiful</li>
                        <li><strong className="font-semibold text-gray-800 dark:text-white">JavaScript</strong> is the electricity - making everything work and respond to user actions</li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300">
                        Without JavaScript, websites would be static and non-interactive. JavaScript enables features like form validation, animations, real-time updates, and much more.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">JavaScript in Modern Development</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript has evolved far beyond its original role in web browsers. Today, it's used for:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {jsUsedFor.map((item, index) => {
                            return (
                                <div key={index} className='bg-white dark:bg-black  p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors'>
                                    <h3 className="text-lg font-semibold text-primary-600 mb-2">{item.title}</h3>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Understanding ECMAScript</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript is based on the ECMAScript standard, which ensures consistency across different implementations. Here's a brief timeline of its evolution:
                    </p>
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-900 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-950">
                                <tr className='border-b border-gray-200 dark:border-gray-600'>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700  dark:text-gray-300 ">Version</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700  dark:text-gray-300 ">Year</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700  dark:text-gray-300 ">Key Features</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {tableContent.map((rowData) => (
                                    <tr key={rowData.version} className='hover:bg-gray-50 dark:hover:bg-gray-900'>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rowData.version}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rowData.year}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{rowData.features}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-lg font-semibold text-primary-600 mb-2">Getting Started</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Ready to dive in? In the next sections, we'll explore JavaScript fundamentals, including variables, data types, functions, and more. Each concept will be explained with clear examples and practical exercises to reinforce your learning.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default JsIntroduction;
