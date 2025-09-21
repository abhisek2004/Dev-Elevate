import React from 'react';

const JsExecution = () => {
    const executionMethods = [
        {
            title: "Browser Console",
            description: "Access the browser's developer tools (F12) and use the Console tab to write and execute JavaScript code directly.",
            example: "console.log('Hello, World!');"
        },
        {
            title: "HTML Script Tag",
            description: "Embed JavaScript directly in an HTML file using the <script> tag.",
            example: "<script>\n  // Your JavaScript code here\n  alert('Hello from HTML!');\n</script>"
        },
        {
            title: "Node.js Runtime",
            description: "Install Node.js to run JavaScript on your computer or server from the command line.",
            example: "node your-script.js"
        },
        {
            title: "Online Code Editors",
            description: "Use online platforms like CodePen, JSFiddle, or CodeSandbox to write and run JavaScript in your browser.",
            example: "// Available at code.xyz or similar platforms"
        }
    ];

    const devToolsInfo = [
        "Access the Console tab for executing JavaScript and viewing logs",
        "Use the Sources tab for debugging your JavaScript code",
        "Inspect and modify the DOM in real-time",
        "Monitor network requests and performance"
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6"><span className='text-primary-600 dark:text-primary-400'>JavaScript</span> Execution</h1>

            <div className="prose max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Do You Need to Install JavaScript?</h2>
                    <div className={`mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors`}>
                        <p className="text-primary-500 dark:text-primary-400">
                            <strong className="font-semibold">Good News!</strong> JavaScript is built into all modern web browsers, so you don't need to install anything to start coding in JavaScript!
                        </p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        JavaScript is present in all modern web browsers, including Chrome, Firefox, Safari, and Edge. This means you can start writing and executing JavaScript code right away without any additional setup. Whether you're on a computer, tablet, or smartphone, JavaScript is ready to use in your browser.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">How to Execute JavaScript</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        There are several ways to execute JavaScript code, depending on your needs and environment. Here are the most common methods:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {executionMethods.map((method, index) => (
                            <div key={index} className='bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md'>
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">{method.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{method.description}</p>
                                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md overflow-x-auto">
                                    <code className="text-sm text-gray-800 dark:text-gray-200">
                                        {method.example}
                                    </code>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Using Browser Developer Tools</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Modern browsers come with powerful developer tools that make working with JavaScript much easier. To open developer tools:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li><strong className="font-semibold">Windows/Linux:</strong> Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">F12</kbd> or <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Ctrl+Shift+I</kbd></li>
                        <li><strong className="font-semibold">Mac:</strong> Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Cmd+Option+I</kbd></li>
                        <li><strong className="font-semibold">Or:</strong> Right-click anywhere on a webpage and select "Inspect" or "Inspect Element"</li>
                    </ul>

                    <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">What can you do with Developer Tools?</h3>
                        <ul className="grid md:grid-cols-2 gap-3">
                            {devToolsInfo.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">JavaScript in Modern Web Development</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript has evolved from a simple scripting language to a powerful tool for building complex applications. Here's why understanding JavaScript execution is crucial:
                    </p>
                    <div className={`mb-4 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors`}>
                        <p className="text-primary-500 dark:text-primary-400">
                            <strong className="font-semibold">Pro Tip:</strong> The way JavaScript executes can affect performance and user experience. Understanding execution contexts, hoisting, and the event loop will help you write better, more efficient code.
                        </p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                        As you progress in your JavaScript journey, you'll learn about concepts like the call stack, event loop, and asynchronous programming, which all build upon the fundamental understanding of how JavaScript executes code.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default JsExecution;
