import CodeBlock from "../../components/CodeBlock";

const ForLoops = () => {
    const examples = [
        {
            title: 'Standard For Loop',
            code: `// Count from 1 to 5
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
// Output: 1, 2, 3, 4, 5`,
            explanation: 'The standard for loop with initialization, condition, and increment/decrement.'
        },
        {
            title: 'For...in Loop',
            code: `const person = {
    name: 'Alice',
    age: 25,
    job: 'Developer'
};

for (let key in person) {
    console.log(\`\${key}: \${person[key]}\`);
}
// Output:
// name: Alice
// age: 25
// job: Developer`,
            explanation: 'Use for...in to iterate over object properties.'
        },
        {
            title: 'For...of Loop',
            code: `const colors = ['red', 'green', 'blue'];

// Iterate over array values
for (let color of colors) {
    console.log(color);
}
// Output: 'red', 'green', 'blue'

// Works with strings too
const greeting = 'Hello';
for (let char of greeting) {
    console.log(char);
}
// Output: 'H', 'e', 'l', 'l', 'o'`,
            explanation: 'Use for...of to iterate over iterable objects like arrays and strings.'
        },
        {
            title: 'Loop Control with break and continue',
            code: `// Using break to exit loop early
for (let i = 1; i <= 10; i++) {
    if (i === 5) break;
    console.log(i);
}
// Output: 1, 2, 3, 4

// Using continue to skip an iteration
for (let i = 1; i <= 5; i++) {
    if (i % 2 === 0) continue;
    console.log(i);
}
// Output: 1, 3, 5`,
            explanation: 'Control loop execution with break and continue statements.'
        }
    ];

    const bestPractices = [
        'Use for...of for arrays and strings (iterable values)',
        'Use for...in for object properties (enumerable properties)',
        'Always declare loop variables with let or const to avoid global scope pollution',
        'Be careful with async/await in loops - consider using Promise.all() for parallel operations',
        'Use meaningful variable names (e.g., item, element) instead of just i'
    ];

    const commonMistakes = [
        'Modifying the array while iterating over it',
        'Using for...in with arrays (it iterates over all enumerable properties, not just array indices)',
        'Creating infinite loops by not updating the counter variable',
        'Using var instead of let in for loops (var has function scope, not block scope)',
        'Not handling the case when an array might be empty'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> For Loops
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    For loops are fundamental control flow structures in JavaScript that allow you to execute a block of code repeatedly. JavaScript offers several types of for loops, each designed for specific use cases. Understanding when and how to use each type is crucial for writing clean and efficient code.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong> 
                        JavaScript provides multiple loop types - standard `for`, `for...in` for objects, and `for...of` for iterables. Choose the right one for your specific use case.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Loop Types and Their Uses</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Each type of for loop serves a different purpose in JavaScript. Here's when to use each:
                    </p>

                    <CodeBlock
                        code={`// 1. Standard for loop - When you need a counter
for (let i = 0; i < array.length; i++) { ... }

// 2. for...in loop - For object properties
for (let key in object) { ... }

// 3. for...of loop - For iterable values (arrays, strings, etc.)
for (let item of iterable) { ... }`} />
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
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">Performance Considerations</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        When working with large datasets, consider these performance tips:
                    </p>
                    <CodeBlock
                        code={`// Cache array length in a variable
const arr = [/* large array */];
for (let i = 0, len = arr.length; i < len; i++) {
    // This is faster than accessing arr.length each time
}

// Use while loops for maximum performance
let i = arr.length;
while (i--) {
    // Processes array in reverse
}

// Consider using array methods for better readability
// when performance isn't critical
arr.forEach((item, index) => {
    // Process each item
});`} />
                </div>
            </div>
        </div>
    );
};

export default ForLoops;
