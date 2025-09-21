import CodeBlock from "../../components/CodeBlock";

const IfElseLadder = () => {
    const examples = [
        {
            title: 'Grading System',
            code: 'let marks = 78;\n\nif (marks >= 90) {\n  console.log("Grade: A+");\n} else if (marks >= 80) {\n  console.log("Grade: A");\n} else if (marks >= 70) {\n  console.log("Grade: B");\n} else if (marks >= 60) {\n  console.log("Grade: C");\n} else if (marks >= 50) {\n  console.log("Grade: D");\n} else {\n  console.log("Grade: F - Failed");\n}\n\n// Output: "Grade: B"',
            explanation: 'A grading system that assigns letter grades based on numerical scores using an if-else ladder.'
        },
        {
            title: 'Time of Day Greeting',
            code: 'let hour = new Date().getHours();\nlet greeting;\n\nif (hour < 12) {\n  greeting = "Good morning!";\n} else if (hour < 18) {\n  greeting = "Good afternoon!";\n} else if (hour < 22) {\n  greeting = "Good evening!";\n} else {\n  greeting = "Good night!";\n}\n\nconsole.log(greeting);\n// Output will vary based on current time',
            explanation: 'A greeting that changes based on the time of day using an if-else ladder.'
        },
        {
            title: 'User Role Authorization',
            code: 'let userRole = \'editor\';\nlet permissions = [];\n\nif (userRole === \'admin\') {\n  permissions = [\'create\', \'read\', \'update\', \'delete\', \'manage_users\'];\n} else if (userRole === \'editor\') {\n  permissions = [\'create\', \'read\', \'update\'];\n} else if (userRole === \'author\') {\n  permissions = [\'create\', \'read_own\', \'update_own\'];\n} else if (userRole === \'subscriber\') {\n  permissions = [\'read\'];\n} else {\n  permissions = [];\n}\n\nconsole.log("User permissions:", permissions);\n// Output: ["create", "read", "update"]',
            explanation: 'A role-based access control system using an if-else ladder to determine user permissions.'
        }
    ];

    const bestPractices = [
        'Always put the most specific conditions first to prevent unreachable code',
        'Use meaningful variable names that make the conditions easy to understand',
        'Consider using a switch statement or object lookup for better readability with many conditions',
        'Keep the conditions simple - move complex logic to separate functions if needed',
        'Always include a final else clause to handle unexpected cases'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">If-Else</span> Ladder
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    An if-else ladder is a series of if-else statements where each condition is checked in sequence. It's useful when you have multiple conditions to evaluate, and you want to execute different code blocks based on which condition is true.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> In an if-else ladder, once a condition evaluates to true, the corresponding block of code is executed, and the rest of the conditions are skipped.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Basic Syntax</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The general structure of an if-else ladder is as follows:
                    </p>

                    <CodeBlock
                        code={`if (condition1) {
  // code to execute if condition1 is true
} else if (condition2) {
  // code to execute if condition2 is true
} else if (condition3) {
  // code to execute if condition3 is true
} else {
  // code to execute if all conditions are false
}`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Code Examples</h2>
                    <div className="space-y-6">
                        {examples.map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <CodeBlock code={example.code} />
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{example.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="mt-8 bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        {bestPractices.map((practice, index) => (
                            <li key={index}>{practice}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">When to Use If-Else Ladder</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        If-else ladders are most effective when you have a series of mutually exclusive conditions where only one block of code should execute. For more than 3-4 conditions, consider using a <code className="text-primary-600 dark:text-primary-400 font-medium">switch</code> statement or an object lookup pattern for better readability and maintainability.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IfElseLadder;
