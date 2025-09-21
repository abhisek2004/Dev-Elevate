import CodeBlock from "../../components/CodeBlock";

const Functions = () => {
    const examples = [
        {
            title: 'Basic Function',
            code: `// Function declaration
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Function call
console.log(greet('Alice'));  // Output: "Hello, Alice!"`,
            explanation: 'A simple function that takes a name parameter and returns a greeting.'
        },
        {
            title: 'Arrow Function',
            code: `// Arrow function syntax
const square = (x) => {
    return x * x;
};

// Implicit return (for single expressions)
const double = x => x * 2;

console.log(square(5));  // Output: 25
console.log(double(4));  // Output: 8`,
            explanation: 'Arrow functions provide a concise syntax and have lexical `this` binding.'
        },
        {
            title: 'Default Parameters',
            code: `function createGreeting(name = 'Guest', greeting = 'Hello') {
    return \`\${greeting}, \${name}!\`;
}

console.log(createGreeting());                // Output: "Hello, Guest!"
console.log(createGreeting('Alice'));         // Output: "Hello, Alice!"
console.log(createGreeting('Bob', 'Hi'));     // Output: "Hi, Bob!"`,
            explanation: 'Default parameters allow you to set default values for function parameters.'
        },
        {
            title: 'Higher-Order Function',
            code: `// Function that takes a function as an argument
function processArray(arr, processor) {
    return arr.map(processor);
}

// Function that returns a function
function multiplier(factor) {
    return function(x) {
        return x * factor;
    };
}

const numbers = [1, 2, 3, 4];
const doubled = processArray(numbers, x => x * 2);
const tripled = processArray(numbers, multiplier(3));

console.log(doubled);  // Output: [2, 4, 6, 8]
console.log(tripled);  // Output: [3, 6, 9, 12]`,
            explanation: 'Higher-order functions can accept functions as arguments and/or return functions.'
        }
    ];

    const bestPractices = [
        'Use descriptive names that indicate what the function does',
        'Keep functions small and focused on a single task',
        'Limit the number of parameters (ideally 3 or fewer)',
        'Use default parameters instead of checking for undefined',
        'Document complex functions with JSDoc comments',
        'Be consistent with return types',
        'Avoid side effects when possible'
    ];

    const commonMistakes = [
        'Forgetting the return statement in a function that should return a value',
        'Not handling edge cases in function parameters',
        'Creating functions with too many responsibilities',
        'Modifying external state inside a function (unless intentional)',
        'Using arrow functions when you need access to `this` from the parent scope'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Functions
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Functions are fundamental building blocks in JavaScript that allow you to encapsulate reusable code. They can take input (parameters), perform actions, and return results. JavaScript treats functions as first-class citizens, meaning they can be assigned to variables, passed as arguments, and returned from other functions.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong> 
                        Functions in JavaScript are objects, which means they can have properties and methods, and can be passed around like any other value.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Function Declarations vs. Expressions</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        There are several ways to define functions in JavaScript. The two most common are function declarations and function expressions.
                    </p>

                    <CodeBlock
                        code={`// Function Declaration (hoisted)
function add(a, b) {
    return a + b;
}

// Function Expression (not hoisted)
const multiply = function(a, b) {
    return a * b;
};

// Arrow Function Expression (ES6+)
const divide = (a, b) => a / b;`} />
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
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">Function Scope and Closures</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript has function-level scope, meaning variables defined inside a function are not accessible from outside. Closures allow functions to access variables from an outer function even after that function has finished executing.
                    </p>
                    <CodeBlock
                        code={`function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
// 'count' is not accessible here, but the inner function maintains access to it`} />
                </div>
            </div>
        </div>
    );
};

export default Functions;
