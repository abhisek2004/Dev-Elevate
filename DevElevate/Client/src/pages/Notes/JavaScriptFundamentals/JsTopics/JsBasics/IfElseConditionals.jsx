import CodeBlock from "../../components/CodeBlock";

const IfElseConditionals = () => {
    const examples = [
        {
            title: 'Basic If Statement',
            code: 'let age = 20;\n\nif (age >= 18) {\n  console.log("You are an adult.");\n} else {\n  console.log("You are a minor.");\n}\n\n// Output: "You are an adult."',
            explanation: 'A simple if-else statement that checks if someone is an adult based on their age.'
        },
        {
            title: 'Nested If Statements',
            code: 'let num = 15;\n\nif (num > 0) {\n  console.log("Number is positive");\n  if (num % 2 === 0) {\n    console.log("and even");\n  } else {\n    console.log("and odd");\n  }\n} else {\n  console.log("Number is not positive");\n}\n\n// Output: "Number is positive and odd"',
            explanation: 'Demonstrating how to nest if statements for more complex conditions.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">If-Else</span> Conditionals
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Conditional statements are used to perform different actions based on different conditions. In JavaScript, we have the following conditional statements:
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> In JavaScript, all conditional statements require the condition to be a boolean value. If the condition is not a boolean, JavaScript will attempt to convert it to a boolean (truthy/falsy).
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">If Statement</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The <code className="text-primary-600 dark:text-primary-400">if</code> statement executes a block of code if a specified condition is true.
                    </p>

                    <CodeBlock
                        code={`
if (condition) {
  // code to be executed if condition is true
}`}
                    />

                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">If...Else Statement</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The <code className="text-primary-600 dark:text-primary-400">else</code> statement specifies a block of code to be executed if the condition is false.
                    </p>

                    <CodeBlock
                        code={`
if (condition) {
  // code to be executed if condition is true
} else {
  // code to be executed if condition is false
}`}
                    />

                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Else If Statement</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The <code className="text-primary-600 dark:text-primary-400">else if</code> statement specifies a new condition if the first condition is false.
                    </p>

                    <CodeBlock
                        code={`
if (condition1) {
  // code to be executed if condition1 is true
} else if (condition2) {
  // code to be executed if condition1 is false and condition2 is true
} else {
  // code to be executed if both condition1 and condition2 are false
}`}
                    />
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
                        <li>Always use curly braces <code className="text-primary-600 dark:text-primary-400 font-medium">{'{ }'}</code> even for single-line statements to avoid confusion</li>
                        <li>Keep conditions simple and readable - consider using variables to store complex conditions</li>
                        <li>Be careful with type coercion in conditions - use strict equality (<code className="text-primary-600 dark:text-primary-400 font-medium">===</code>) when needed</li>
                        <li>For multiple conditions, consider using a <code className="text-primary-600 dark:text-primary-400 font-medium">switch</code> statement or object lookups for better readability</li>
                        <li>Avoid deep nesting of if-else statements - consider using early returns or breaking logic into smaller functions</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default IfElseConditionals;
