import CodeBlock from "../../components/CodeBlock";

const TernaryOperator = () => {
    const examples = [
        {
            title: 'Basic Usage',
            code: `let age = 20;
let canVote = age >= 18 ? "Yes" : "No";

console.log(\`Can vote? \${canVote}\`);
// Output: "Can vote? Yes"`,
            explanation: 'A simple example showing the basic syntax of the ternary operator to determine voting eligibility.'
        },
        {
            title: 'Multiple Conditions',
            code: `let score = 85;
let grade = score >= 90 ? "A" :
            score >= 80 ? "B" :
            score >= 70 ? "C" :
            score >= 60 ? "D" : "F";

console.log(\`Your grade is: \${grade}\`);
// Output: "Your grade is: B"`,
            explanation: 'Nested ternary operators can be used for multiple conditions, though they can become hard to read.'
        },
        {
            title: 'Function Return',
            code: `function getFee(isMember) {
  return isMember ? "$2.00" : "$10.00";
}

console.log(getFee(true));  // Output: "$2.00"
console.log(getFee(false)); // Output: "$10.00"
console.log(getFee(1));     // Output: "$2.00" (truthy value)`,
            explanation: 'Using the ternary operator to return different values from a function based on a condition.'
        }
    ];

    const bestPractices = [
        'Use ternary operators for simple, straightforward conditions',
        'Avoid nesting ternary operators as it can make code hard to read',
        'Use parentheses for complex expressions to improve readability',
        'Consider using if-else statements for more complex logic',
        'Be mindful of operator precedence when combining with other operators'
    ];

    const commonMistakes = [
        'Forgetting the colon (:) between the true and false expressions',
        'Using it for side effects instead of just value assignment',
        'Creating overly complex expressions that are hard to read',
        'Using it when an if-else statement would be more appropriate',
        'Not considering falsy values (0, "", null, undefined, false, NaN)'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Ternary</span> Operator
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The ternary operator is a concise way to write conditional statements in JavaScript. It's often used as a shorthand for simple if-else statements when you need to assign a value based on a condition.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Syntax: </strong> 
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">condition ? expressionIfTrue : expressionIfFalse</code>
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Basic Usage</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The ternary operator takes three operands: a condition followed by a question mark (?), then an expression to execute if the condition is truthy, followed by a colon (:), and finally the expression to execute if the condition is falsy.
                    </p>

                    <CodeBlock
                        code={`// Basic syntax
const result = condition ? valueIfTrue : valueIfFalse;

// Equivalent to:
let result;
if (condition) {
  result = valueIfTrue;
} else {
  result = valueIfFalse;
}`} />
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Code Examples</h2>
                    <div className="space-y-6">
                        {examples.map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <CodeBlock code={example.code} />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{example.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {bestPractices.map((practice, index) => (
                                <li key={`best-${index}`} className="text-sm">{practice}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Common Mistakes</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            {commonMistakes.map((mistake, index) => (
                                <li key={`mistake-${index}`} className="text-sm">{mistake}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">When to Use Ternary Operator</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        The ternary operator is best used for simple, single-condition assignments where both outcomes are simple expressions. For more complex logic or multiple conditions, consider using <code className="text-primary-600 dark:text-primary-400 font-medium">if-else</code> statements or <code className="text-primary-600 dark:text-primary-400 font-medium">switch</code> statements for better readability and maintainability.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TernaryOperator;
