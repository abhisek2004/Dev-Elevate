import CodeBlock from "../../components/CodeBlock";
import React from 'react';

const WhileLoops = () => {
    const examples = [
        {
            title: 'Basic While Loop',
            code: `// Count from 1 to 5
let i = 1;
while (i <= 5) {
    console.log(i);
    i++;
}
// Output: 1, 2, 3, 4, 5`,
            explanation: 'A basic while loop that runs as long as the condition is true.'
        },
        {
            title: 'User Input Validation',
            code: `// Example using prompt (runs in browser)

let userInput = '';
while (userInput.toLowerCase() !== 'yes' && userInput.toLowerCase() !== 'no') {
    userInput = prompt("Please enter 'yes' or 'no':");
}
console.log('You entered: ' + userInput);
`,
            explanation: 'Using while loop for input validation until valid input is received.'
        },
        {
            title: 'Do...While Loop',
            code: `// Do-while loop - executes at least once
let count = 0;
do {
    console.log('Count is: ' + count);
    count++;
} while (count < 3);
// Output: 0, 1, 2`,
            explanation: 'Do-while loop executes the code block once before checking the condition.'
        },
        {
            title: 'Infinite Loop with Break',
            code: `// Using while(true) with break
let attempts = 0;
while (true) {
    attempts = attempts + 1;
    console.log('Attempt ' + attempts);
    
    if (attempts >= 5 || Math.random() > 0.7) {
        console.log('Condition met, exiting loop');
        break;
    }
}
// Output: Varies based on random condition`,
            explanation: 'Creating a controlled infinite loop with a break condition.'
        }
    ];

    const bestPractices = [
        'Always ensure the loop condition will eventually become false to prevent infinite loops',
        'Use while loops when the number of iterations is not known beforehand',
        'Consider using for loops when you know the exact number of iterations needed',
        'Use meaningful variable names for loop counters (e.g., count, index, attempt)',
        'Be cautious with complex conditions - consider breaking them into variables for readability'
    ];

    const commonMistakes = [
        'Forgetting to update the loop control variable',
        'Creating accidental infinite loops',
        'Using while loops when a for loop would be more appropriate',
        'Not handling edge cases (e.g., empty inputs)',
        'Modifying the loop counter in complex ways that make the code hard to follow'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> While Loops
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    While loops in JavaScript allow you to execute a block of code repeatedly as long as a specified condition evaluates to true. They are particularly useful when you don't know in advance how many times you need to execute the loop.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong> 
                        While loops check the condition before each iteration. If the condition is false initially, the loop won't execute at all.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">While vs Do-While Loops</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript offers two types of while loops: the standard while loop and the do-while loop. The key difference is when the condition is evaluated.
                    </p>

                    <CodeBlock
                        code={`// Standard while loop
while (condition) {
    // Code runs 0 or more times
}

// Do-while loop
do {
    // Code runs 1 or more times
} while (condition);`}
                    />
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
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">When to Use While Loops</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        While loops are particularly useful in these scenarios:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                        <li>When the number of iterations is unknown in advance</li>
                        <li>When waiting for a specific condition to be met (e.g., user input, API response)</li>
                        <li>When implementing retry logic with a maximum number of attempts</li>
                        <li>When processing data until a certain condition is met</li>
                    </ul>
                    <CodeBlock
                        code={`// Example: Processing queue items until empty
const queue = [/* items to process */];
while (queue.length > 0) {
    const item = queue.shift();
    processItem(item);
    
    // Optionally add a delay between iterations
    // await new Promise(resolve => setTimeout(resolve, 100));
}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default WhileLoops;
