
import CodeBlock from '../../components/CodeBlock';

const NodeJsInstallation = () => {
    const installationSteps = [
        {
            step: 1,
            title: "Download the Installer",
            description: "Go to the official Node.js website and download the LTS (Long Term Support) version for your operating system.",
            details: "The LTS version is recommended for most users as it's more stable and receives security updates for a longer period."
        },
        {
            step: 2,
            title: "Run the Installer",
            description: "Double-click the downloaded file and follow the installation wizard.",
            details: "You can keep all the default settings during installation. The Node.js installer includes npm (Node Package Manager) which you'll need for managing JavaScript packages."
        },
        {
            step: 3,
            title: "Verify Installation",
            description: "Check that Node.js and npm are installed correctly by running these commands in your terminal or command prompt.",
            details: "These commands will display the installed versions of Node.js and npm if the installation was successful."
        },
        {
            step: 4,
            title: "Create Your First Script",
            description: "Create a new file named 'app.js' and add some JavaScript code.",
            details: "This script demonstrates basic Node.js functionality including console output and simple calculations."
        },
        {
            step: 5,
            title: "Run Your Script",
            description: "In the terminal, navigate to your project directory and run your script.",
            details: "You should see the output messages in your terminal showing the greeting, calculation result, and current directory path."
        }
    ];

    const vsCodeSteps = [
        {
            title: "Install VS Code",
            description: "Download and install Visual Studio Code from the official website.",
            link: "https://code.visualstudio.com/"
        },
        {
            title: "Install Extensions",
            description: "Install the following recommended extensions for JavaScript development:",
            extensions: [
                "JavaScript (ES6) code snippets",
                "ESLint",
                "Prettier - Code formatter",
                "Node.js Extension Pack"
            ]
        },
        {
            title: "Configure the Terminal",
            description: "VS Code includes an integrated terminal where you can run your Node.js applications.",
            details: "Open the terminal with `Ctrl+` (backtick) or via the menu: View > Terminal"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className='text-primary-600 dark:text-primary-400'>Node.js</span> Installation & Setup
            </h1>

            <div className="prose max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is Node.js?</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser.
                        It's built on Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.
                    </p>
                    <div className={`mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors`}>
                        <p className="text-primary-500 dark:text-primary-400">
                            <strong className="font-semibold">Key Features:</strong> Asynchronous and Event Driven, Single Threaded but Highly Scalable, Fast, No Buffering, and more.
                        </p>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Installation Guide</h2>

                    <div className="space-y-8">
                        {installationSteps.map((step, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{step.step}</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-2">{step.description}</p>
                                    {step.details && (
                                        <div className="mt-2">
                                            {step.step === 3 ? (
                                                <CodeBlock code={`node -v    # Check Node.js version
npm -v     # Check npm version`} />
                                            ) : step.step === 4 ? (
                                                <CodeBlock code={`// Print a welcome message
console.log('Hello from Node.js!');

// Calculate and print the sum of two numbers
const num1 = 5;
const num2 = 7;
const sum = num1 + num2;

console.log('The sum of ' + num1 + ' and ' + num2 + ' is: ' + sum);`} />
                                            ) : step.step === 5 ? (
                                                <CodeBlock code={`node app.js`} />
                                            ) : (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{step.details}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Using VS Code for Node.js Development</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        Visual Studio Code is a lightweight but powerful source code editor that's perfect for Node.js development.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {vsCodeSteps.map((step, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md">
                                <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">{step.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">{step.description}</p>

                                {step.link && (
                                    <a
                                        href={step.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        Download VS Code
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                )}

                                {step.extensions && (
                                    <ul className="mt-3 space-y-2">
                                        {step.extensions.map((ext, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{ext}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {step.details && (
                                    <CodeBlock code={step.details} />
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <div className={`mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors`}>
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">Troubleshooting Tips</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                        <li>If you get a "command not found" error, try restarting your terminal or command prompt.</li>
                        <li>On Windows, you might need to run the terminal as administrator for global installations.</li>
                        <li>Check the <a href="https://nodejs.org/en/docs/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">official Node.js documentation</a> for platform-specific instructions.</li>
                    </ul>
                </div>

                <section className="mt-10 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 p-4">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Next Steps</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Now that you have Node.js installed, you're ready to start building applications! Here are some things to explore next:
                    </p>
                    <ul className="grid md:grid-cols-2 gap-4">
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            <span className="text-gray-700 dark:text-gray-300">Learn about <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">npm</code> (Node Package Manager)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            <span className="text-gray-700 dark:text-gray-300">Explore popular Node.js frameworks like <strong>Express.js</strong> or <strong>NestJS</strong></span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            <span className="text-gray-700 dark:text-gray-300">Set up a simple web server</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">•</span>
                            <span className="text-gray-700 dark:text-gray-300">Learn about <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">package.json</code> and dependency management</span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default NodeJsInstallation;
