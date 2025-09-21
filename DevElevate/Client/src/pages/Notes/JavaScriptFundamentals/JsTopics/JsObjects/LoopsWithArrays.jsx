import CodeBlock from '../../components/CodeBlock';
import React from 'react';

const LoopsWithArrays = () => {
    const examples = [
        {
            title: 'Basic for Loop',
            code: `const numbers = [1, 2, 3, 4, 5];

// Traditional for loop
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}

// Backward iteration
for (let i = numbers.length - 1; i >= 0; i--) {
    console.log(numbers[i]);
}

// Skipping elements
for (let i = 0; i < numbers.length; i += 2) {
    console.log(numbers[i]);  // 1, 3, 5
}`,
            explanation: 'The traditional for loop gives you full control over the iteration process.'
        },
        {
            title: 'For Each Method',
            code: `const fruits = ['apple', 'banana', 'cherry'];

// Basic forEach
fruits.forEach(function(fruit) {
    console.log(fruit);
});

// With index parameter
fruits.forEach((fruit, index) => {
    console.log(\`\${index + 1}. \${fruit}\`);
});

// Using a separate function
function logItem(item, index) {
    console.log(\`\${index}: \${item}\`);
}
fruits.forEach(logItem);`,
            explanation: 'The forEach method provides a clean way to iterate through array elements.'
        },
        {
            title: 'For...Of Loop',
            code: `const colors = ['red', 'green', 'blue'];

// Basic for...of loop
for (const color of colors) {
    console.log(color);
}

// With index using entries()
for (const [index, color] of colors.entries()) {
    console.log(\`\${index}: \${color}\`);
}

// Breaking out of loop
for (const color of colors) {
    if (color === 'green') break;
    console.log(color);  // Only logs 'red'
}`,
            explanation: 'The for...of loop provides a cleaner syntax and works with any iterable.'
        },
        {
            title: 'Modifying Arrays During Iteration',
            code: `let numbers = [1, 2, 3, 4, 5];

// Safe way to modify array while iterating (backwards)
for (let i = numbers.length - 1; i >= 0; i--) {
    if (numbers[i] % 2 === 0) {
        numbers.splice(i, 1);  // Remove even numbers
    }
}
console.log(numbers);  // [1, 3, 5]

// Alternative: Create a new array
numbers = [1, 2, 3, 4, 5];
const oddNumbers = [];
for (const num of numbers) {
    if (num % 2 !== 0) {
        oddNumbers.push(num);
    }
}
console.log(oddNumbers);  // [1, 3, 5]`,
            explanation: 'Be cautious when modifying arrays during iteration to avoid unexpected behavior.'
        },
        {
            title: 'Performance Comparison',
            code: `const largeArray = Array(1000000).fill().map((_, i) => i);

// for loop (fastest for large arrays)
console.time('for');
let sum1 = 0;
for (let i = 0; i < largeArray.length; i++) {
    sum1 += largeArray[i];
}
console.timeEnd('for');

// for...of (cleaner but slightly slower)
console.time('for...of');
let sum2 = 0;
for (const num of largeArray) {
    sum2 += num;
}
console.timeEnd('for...of');

// forEach (functional but slowest for large arrays)
console.time('forEach');
let sum3 = 0;
largeArray.forEach(num => {
    sum3 += num;
});
console.timeEnd('forEach');`,
            explanation: 'Different loop types have different performance characteristics, especially with large arrays.'
        }
    ];

    const bestPractices = [
        'Use for...of for better readability when you don\'t need the index',
        'Use forEach for functional programming style when performance isn\'t critical',
        'Use traditional for loops when you need precise control over the iteration',
        'Be careful when modifying arrays during iteration - consider creating a new array instead',
        'Use Array methods (map, filter, reduce) for common operations when appropriate'
    ];

    const commonMistakes = [
        'Modifying array length during iteration (can cause skipped elements or infinite loops)',
        'Using for...in with arrays (iterates over all enumerable properties, not just array elements)',
        'Not handling sparse arrays correctly',
        'Using forEach when you need to break out of the loop early (use for...of with break instead)',
        'Creating unnecessary function calls in tight loops (affects performance)'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Loops with Arrays
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Working with arrays is a fundamental part of JavaScript programming. Whether you're processing data, manipulating the DOM, or handling API responses, you'll often need to iterate through arrays. JavaScript provides several ways to loop through arrays, each with its own use cases and performance characteristics.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong>
                        When choosing a loop type, consider both readability and performance. Modern JavaScript engines optimize all loop types well, but for very large datasets, traditional for loops often have a slight performance advantage.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Basic Loop Types</h2>
                    <div className="space-y-6">
                        {examples.slice(0, 3).map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <CodeBlock code={example.code} />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{example.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Advanced Topics</h2>
                    <div className="space-y-6">
                        {examples.slice(3).map((example, index) => (
                            <div key={index + 3} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
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
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">When to Use Each Loop Type</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Each loop type has its strengths. Here's a quick guide to help you choose:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                        <li><strong>for loop:</strong> When you need the index, when performance is critical with large arrays, or when you need to iterate in non-standard ways (e.g., backwards, skipping elements)</li>
                        <li><strong>for...of:</strong> For clean, readable iteration when you don't need the index, and when you might need to break out of the loop early</li>
                        <li><strong>forEach:</strong> For functional programming style when you want to perform an action for each element, and when you don't need to break out of the loop</li>
                        <li><strong>Array methods (map, filter, reduce):</strong> For transforming, filtering, or reducing arrays in a functional style</li>
                    </ul>
                    <CodeBlock
                        code={`// Example: Choosing the right loop

// When you need the index
for (let i = 0; i < items.length; i++) {
    console.log(\`Item \${i}: \${items[i]}\`);
}

// When you need to break early
for (const item of items) {
    if (item === 'stop') break;
    console.log(item);
}

// When you want to transform an array
const doubled = items.map(item => item * 2);

// When you want to perform an action for each item
items.forEach(item => {
    console.log('Processing:', item);
});`}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoopsWithArrays;
