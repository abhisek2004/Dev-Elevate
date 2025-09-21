import CodeBlock from '../../components/CodeBlock';

const StringsInJS = () => {
    const examples = [
        {
            title: 'String Declaration',
            code: `// Using single quotes
const str1 = 'Hello World';

// Using double quotes
const str2 = "Hello World";

// Using template literals (ES6+)
const name = 'John';
const str3 = \`Hello \${name}\`;  // Hello John`,
            explanation: 'Different ways to declare strings in JavaScript.'
        },
        {
            title: 'String Length',
            code: `const str = "Hello World";
console.log(str.length);  // 11`,
            explanation: 'The length property returns the number of characters in a string.'
        },
        {
            title: 'String Concatenation',
            code: `const str1 = 'Hello';
const str2 = 'World';

// Using + operator
console.log(str1 + ' ' + str2);  // Hello World

// Using concat() method
console.log(str1.concat(' ', str2));  // Hello World

// Using template literals (preferred in modern JS)
console.log(\`\${str1} \${str2}\`);  // Hello World`,
            explanation: 'Different ways to concatenate strings in JavaScript.'
        },
        {
            title: 'String Methods',
            code: `const str = 'Hello World';

// Get character at index
console.log(str.charAt(0));  // H

// Get character code
console.log(str.charCodeAt(0));  // 72

// Check if string includes substring
console.log(str.includes('World'));  // true

// Find index of substring
console.log(str.indexOf('o'));  // 4

// Last index of substring
console.log(str.lastIndexOf('o'));  // 7

// Replace substring
console.log(str.replace('World', 'Universe'));  // Hello Universe

// Get substring
console.log(str.substring(0, 5));  // Hello

// Convert to upper/lower case
console.log(str.toUpperCase());  // HELLO WORLD
console.log(str.toLowerCase());  // hello world

// Trim whitespace
const strWithSpaces = '   Hello   ';
console.log(strWithSpaces.trim());  // 'Hello'`,
            explanation: 'Commonly used string methods in JavaScript.'
        },
        {
            title: 'Template Literals (ES6+)',
            code: `const name = 'John';
const age = 30;

// Multi-line strings
const multiLine = \`Hello,\nMy name is \${name}\nI am \${age} years old\`;

// Expressions in template literals
console.log(\`Next year I'll be \${age + 1}\`);  // Next year I'll be 31

// Function calls in template literals
function greet(name) {
    return \`Hello, \${name}!\`;
}
console.log(greet('Alice'));  // Hello, Alice!`,
            explanation: 'Template literals provide an elegant way to work with strings in modern JavaScript.'
        }
    ];

    const bestPractices = [
        'Use template literals for string interpolation and multi-line strings',
        'Be consistent with quote style (single or double quotes)',
        'Use trim() when working with user input to remove extra whitespace',
        'For simple string concatenation, template literals are more readable than + operator',
        'Use includes() instead of indexOf() when you just need to check if a string contains a substring'
    ];

    const commonMistakes = [
        'Forgetting that strings are immutable (methods return new strings)',
        'Using == instead of === for string comparison',
        'Not handling case sensitivity in string comparisons',
        'Forgetting to escape special characters in strings',
        'Using string methods on non-string values without proper type checking'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Strings
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Strings in JavaScript are used to represent and manipulate a sequence of characters. They can be created using single quotes ('), double quotes ("), or backticks (`) for template literals. Strings are immutable, meaning once created, their values cannot be changed.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong> 
                        In JavaScript, strings are primitive values, but they can be treated like objects because JavaScript provides wrapper objects (String) with methods and properties for working with strings.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">String Creation and Basic Operations</h2>
                    <div className="space-y-6">
                        {examples.slice(0, 2).map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <CodeBlock code={example.code} />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{example.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">String Manipulation</h2>
                    <div className="space-y-6">
                        {examples.slice(2, 4).map((example, index) => (
                            <div key={index + 2} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <CodeBlock code={example.code} />
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{example.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Modern JavaScript: Template Literals</h2>
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{examples[4].title}</h3>
                            <CodeBlock code={examples[4].code} />
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{examples[4].explanation}</p>
                        </div>
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
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">String Immutability</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        In JavaScript, strings are immutable, which means once a string is created, it cannot be modified. When you use string methods, they return new strings rather than modifying the original string.
                    </p>
                    <CodeBlock
                        code={`let str = 'hello';
str[0] = 'H';  // This won't work
console.log(str);  // 'hello'

// To modify a string, create a new one
str = 'H' + str.slice(1);
console.log(str);  // 'Hello'`}
                    />
                </div>
            </div>
        </div>
    );
};

export default StringsInJS;
