import CodeBlock from "../../components/CodeBlock";

const MathInJS = () => {
    const examples = [
        {
            title: 'Random Numbers',
            code: '// Generate a random number between 0 (inclusive) and 1 (exclusive)\nconst randomNum = Math.random();\nconsole.log(randomNum); // e.g., 0.123456789\n\n// Generate a random integer between min (inclusive) and max (exclusive)\nfunction getRandomInt(min, max) {\n    return Math.floor(Math.random() * (max - min)) + min;\n}\n\nconsole.log(getRandomInt(1, 10)); // Random integer between 1 and 9',
            explanation: 'The `Math.random()` function generates a pseudo-random number between 0 (inclusive) and 1 (exclusive). To get random integers in a specific range, combine it with `Math.floor()`. Remember that the maximum is exclusive while the minimum is inclusive.'
        },
        {
            title: 'Rounding Numbers',
            code: '// Round down to nearest integer\nconsole.log(Math.floor(3.8));  // 3\nconsole.log(Math.floor(-2.3)); // -3\n\n// Round up to nearest integer\nconsole.log(Math.ceil(3.2));   // 4\nconsole.log(Math.ceil(-2.7));  // -2\n\n// Round to nearest integer\nconsole.log(Math.round(3.2));  // 3\nconsole.log(Math.round(3.7));  // 4\nconsole.log(Math.round(-1.5)); // -1\n\n// Truncate decimal part\nconsole.log(Math.trunc(3.7));  // 3\nconsole.log(Math.trunc(-2.3)); // -2',
            explanation: 'JavaScript provides several methods for rounding numbers: `Math.floor()` rounds down, `Math.ceil()` rounds up, `Math.round()` rounds to the nearest integer, and `Math.trunc()` removes the decimal part.'
        },
        {
            title: 'Min and Max Values',
            code: '// Find the maximum value\nconsole.log(Math.max(3, 5, 1)); // 5\n\n// Find the minimum value\nconsole.log(Math.min(3, 5, 1)); // 1\n\n// Working with arrays\nconst numbers = [1, 5, 2, 8, 3];\nconsole.log(Math.max(...numbers)); // 8 (using spread operator)\nconsole.log(Math.min(...numbers)); // 1',
            explanation: '`Math.max()` and `Math.min()` return the largest and smallest of zero or more numbers, respectively. Use the spread operator (`...`) to find min/max in an array.'
        },
        {
            title: 'Mathematical Constants',
            code: '// Common mathematical constants\nconsole.log(Math.PI);           // 3.141592653589793\nconsole.log(Math.E);            // 2.718281828459045 (Euler\'s number)\nconsole.log(Math.SQRT2);        // 1.4142135623730951 (square root of 2)\nconsole.log(Math.SQRT1_2);      // 0.7071067811865476 (square root of 1/2)\nconsole.log(Math.LN2);          // 0.6931471805599453 (natural log of 2)\nconsole.log(Math.LN10);         // 2.302585092994046 (natural log of 10)',
            explanation: 'The Math object provides several useful mathematical constants. These are properties of the Math object and are written in uppercase.'
        },
        {
            title: 'Power and Roots',
            code: '// Calculate powers\nconsole.log(Math.pow(2, 3));    // 8 (2 to the power of 3)\nconsole.log(2 ** 3);           // 8 (ES7 exponentiation operator)\n\n// Calculate square root\nconsole.log(Math.sqrt(16));     // 4\n\n// Calculate cube root (ES6+)\nconsole.log(Math.cbrt(27));     // 3\n\n// Calculate hypotenuse (ES6+)\nconsole.log(Math.hypot(3, 4));  // 5 (3-4-5 triangle)',
            explanation: 'JavaScript provides methods for power and root calculations. The exponentiation operator (`**`) is a more modern alternative to `Math.pow()`. `Math.hypot()` returns the square root of the sum of squares of its arguments.'
        }
    ];

    const bestPractices = [
        'Always use the appropriate Math method instead of writing custom implementations for common mathematical operations',
        'Be aware of floating-point precision issues when working with decimal numbers (e.g., 0.1 + 0.2 !== 0.3)',
        'For financial calculations, consider using a library like decimal.js or working with integers (e.g., cents instead of dollars)',
        'When working with very large or very small numbers, be aware of JavaScript\'s Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER limits',
        'For cryptographic purposes, use the Web Crypto API instead of Math.random() for generating secure random values',
        'Consider using the exponentiation operator (**) instead of Math.pow() for better readability in modern JavaScript'
    ];

    const commonMistakes = [
        'Forgetting that Math methods are static and should be called on the Math object (e.g., Math.PI, not Math().PI)',
        'Confusing Math.floor() with Math.trunc() for negative numbers (they behave differently with negative numbers)',
        'Not handling edge cases like Infinity, -Infinity, and NaN when doing mathematical operations',
        'Expecting exact equality when comparing floating-point numbers (use a small epsilon value for comparison instead)',
        'Using Math.random() for security-sensitive applications (use crypto.getRandomValues() instead)',
        'Forgetting that angles in trigonometric functions are in radians, not degrees (convert degrees to radians using Math.PI/180)'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Math Object
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The JavaScript <code className="text-primary-600 dark:text-primary-400">Math</code> object allows you to perform mathematical tasks on numbers. Unlike other global objects,
                    <code className="text-primary-600 dark:text-primary-400">Math</code> is not a constructor. All properties and methods of <code className="text-primary-600 dark:text-primary-400">Math</code> are static and can be called by using
                    <code className="text-primary-600 dark:text-primary-400">Math</code> as an object without creating it.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> The Math object provides many useful mathematical functions and constants. All Math methods are called using the syntax <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">Math.method()</code>
                        and all properties are accessed using <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">Math.property</code>.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Common Math Operations</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The Math object includes methods for common mathematical operations like rounding, finding min/max values, generating random numbers, and more.
                    </p>

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

                <div className="mt-8 bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        {bestPractices.map((practice, index) => (
                            <li key={index} className="text-justify">{practice}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 bg-red-50 dark:bg-red-900/20 p-6 rounded-md shadow-sm border border-red-200 dark:border-red-900/50">
                    <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-4">Common Mistakes</h3>
                    <ul className="list-disc pl-6 space-y-2 text-red-700 dark:text-red-200">
                        {commonMistakes.map((mistake, index) => (
                            <li key={index} className="text-justify">{mistake}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-md shadow-sm border border-blue-200 dark:border-blue-800/50">
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Performance Considerations</h3>
                    <ul className="list-disc pl-6 space-y-2 text-blue-700 dark:text-blue-200">
                        <li>Math operations are generally very fast, but avoid unnecessary calculations in loops</li>
                        <li>Cache the value of Math.PI and other frequently used constants in variables if used repeatedly</li>
                        <li>Be cautious with Math.pow() for integer exponents - the exponentiation operator (**) might be more readable and performant</li>
                        <li>For complex mathematical operations, consider using typed arrays for better performance with large datasets</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MathInJS;
