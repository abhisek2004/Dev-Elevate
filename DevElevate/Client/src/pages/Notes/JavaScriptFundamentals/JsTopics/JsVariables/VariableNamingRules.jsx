import CodeBlock from "../../components/CodeBlock";

const VariableNamingRules = () => {
    const examples = [
        {
            code: "let userName = 'John';",
            valid: true,
            description: "Starts with a letter, uses camelCase"
        },
        {
            code: "const MAX_USERS = 100;",
            valid: true,
            description: "UPPERCASE for constants, underscores for multiple words"
        },
        {
            code: "let _privateData = 'secret';",
            valid: true,
            description: "Can start with underscore (common convention for private variables)"
        },
        {
            code: "let $element = document.getElementById('myElement');",
            valid: true,
            description: "Can start with $ (common in jQuery and other libraries)"
        },
        {
            code: "let 123abc = 'invalid';",
            valid: false,
            description: "Cannot start with a number"
        },
        {
            code: "let user-name = 'John';",
            valid: false,
            description: "Cannot contain hyphens (interpreted as minus operator)"
        }
    ];

    const bestPractices = [
        "Use descriptive names that indicate the variable's purpose",
        "Use camelCase for variables and functions (e.g., myVariableName)",
        "Use PascalCase for constructors and classes (e.g., ClassName)",
        "Use UPPERCASE for constants (e.g., const API_KEY = '123')",
        "Avoid single-letter variable names (except in loops or simple math)",
        "Be consistent with your naming conventions throughout the codebase"
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Variable <span className='text-primary-600 dark:text-primary-400'>Naming Rules</span>
            </h1>

            <div className="prose max-w-none">
                <section className="mb-8">
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        JavaScript is a dynamically-typed language, which means that you don't have to specify the data type of a variable when you declare it.
                        The data type of a variable is determined by the value that is assigned to it.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Basic Rules for Naming Variables</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        When naming variables in JavaScript, you must follow these rules:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Can contain letters (a-z, A-Z), digits (0-9), underscores (_), and dollar signs ($)</li>
                        <li>Must begin with a letter, underscore (_), or dollar sign ($)</li>
                        <li>Cannot start with a digit (0-9)</li>
                        <li>Are case-sensitive (myVar and myvar are different variables)</li>
                        <li>Cannot be a reserved keyword (e.g., let, const, if, for, function, etc.)</li>
                    </ul>

                    <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <p className="text-primary-500 dark:text-primary-400">
                            <strong className="font-semibold">Note:</strong> While JavaScript allows non-ASCII characters in variable names, it's best to stick to English letters for better compatibility.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Examples</h3>
                        <div className="space-y-6">
                            {examples.map((example, index) => (
                                <div key={index} className="bg-white dark:bg-transparent rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                                    <div className="flex items-start">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-1 ${example.valid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                            {example.valid ? '✓' : '✗'}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-700 dark:text-gray-300 mb-3">{example.description}</p>
                                            <CodeBlock code={example.code} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                        <ul className="space-y-3">
                            {bestPractices.map((practice, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">•</span>
                                    <span className="text-gray-700 dark:text-gray-300">{practice}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Examples of Valid and Invalid Names</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr className='border-b border-gray-200 dark:border-gray-700'>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Example</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Validity</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {examples.map((example, index) => (
                                    <tr key={index} className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${!example.valid ? 'bg-red-50 dark:bg-red-900/20' : ''}`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-200">
                                            {example.code}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${example.valid
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'}`}>
                                                {example.valid ? 'Valid' : 'Invalid'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {example.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Naming Best Practices</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Following these best practices will make your code more readable and maintainable:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        {bestPractices.map((practice, index) => (
                            <div key={index} className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">{practice}</span>
                            </div>
                        ))}
                    </div>

                    <div className={`mt-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors`}>
                        <p className="text-primary-500 dark:text-primary-400">
                            <strong className="font-semibold">Pro Tip:</strong> Choose variable names that are descriptive enough to make the code self-documenting.
                            A well-named variable can eliminate the need for additional comments.
                        </p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Variable Usage Examples</h2>
                    <div className="space-y-6">
                        <div className="bg-gray-900 dark:bg-gray-900 rounded-md p-4 overflow-x-auto">
                            <CodeBlock code={`// Declaring and initializing variables
let counter = 0;
const MAX_ATTEMPTS = 3;
let isUserLoggedIn = false;
const API_BASE_URL = 'https://api.example.com';

// Using variables in expressions
counter = counter + 1;
const greeting = 'Hello, ' + 'world!';
const isOverLimit = counter > MAX_ATTEMPTS;

// Variables in control flow
if (isUserLoggedIn) {
    console.log('Welcome back!');
} else {
    console.log('Please log in');
}

// Variables in loops
for (let i = 0; i < 5; i++) {
    console.log('Iteration:', i);
}`} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default VariableNamingRules;
