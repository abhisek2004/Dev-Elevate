import CodeBlock from "../../components/CodeBlock";

const NumberInJS = () => {
    const examples = [
        {
            title: 'Number Conversion',
            code: `// Convert string to number
console.log(Number("3.14"));  // 3.14
console.log(Number(true));    // 1
console.log(Number(false));   // 0
console.log(Number(""));      // 0
console.log(Number(" 123 ")); // 123 (whitespace is ignored)
console.log(Number("123abc")); // NaN (Not a Number)

// Using unary plus operator (alternative to Number())
console.log(+"3.14");  // 3.14
console.log(+true);     // 1`,
            explanation: 'The `Number()` function converts values to numbers. It works with strings, booleans, and other types. The unary plus operator (`+`) provides a shorter syntax for the same conversion.'
        },
        {
            title: 'Parsing Numbers',
            code: `// Parse integers and floats from strings
console.log(parseInt("10"));       // 10
console.log(parseInt("10.5"));     // 10 (drops decimal part)
console.log(parseInt("10", 10));   // 10 (explicit radix 10)
console.log(parseInt("010"));      // 10 (treated as decimal)
console.log(parseInt("0x10"));     // 16 (hexadecimal)

console.log(parseFloat("10.5"));   // 10.5
console.log(parseFloat("10.5.5")); // 10.5 (stops at second decimal point)
console.log(parseFloat("3.14e2")); // 314 (scientific notation)`,
            explanation: '`parseInt()` and `parseFloat()` parse numbers from strings. `parseInt()` parses integers, while `parseFloat()` parses floating-point numbers. Always specify the radix (base) with `parseInt()` to avoid unexpected behavior.'
        },
        {
            title: 'Number Properties',
            code: `// Number properties
console.log(Number.MAX_VALUE);        // 1.7976931348623157e+308
console.log(Number.MIN_VALUE);        // 5e-324
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.NEGATIVE_INFINITY); // -Infinity
console.log(Number.NaN);              // NaN (Not a Number)

// Checking number type
console.log(Number.isFinite(123));    // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isInteger(10));    // true
console.log(Number.isInteger(10.5));  // false
console.log(Number.isSafeInteger(10)); // true`,
            explanation: 'The Number object provides several useful properties and methods for working with numbers. These include constants for the largest and smallest representable numbers, as well as methods for checking number types.'
        },
        {
            title: 'Number Methods',
            code: `// Number formatting
const num = 3.14159265359;

console.log(num.toFixed(2));     // "3.14" (2 decimal places)
console.log(num.toPrecision(4)); // "3.142" (4 significant digits)
console.log(num.toExponential(2)); // "3.14e+0"

// Converting to different bases
console.log((10).toString(2));   // "1010" (binary)
console.log((255).toString(16)); // "ff" (hexadecimal)
console.log((10).toString(8));   // "12" (octal)

// Parsing numbers with different bases
console.log(parseInt('1010', 2));  // 10 (binary to decimal)
console.log(parseInt('ff', 16));   // 255 (hex to decimal)`,
            explanation: 'Number instances have methods for formatting and converting numbers. `toFixed()`, `toPrecision()`, and `toExponential()` format numbers as strings. `toString(radix)` converts numbers to different bases.'
        },
        {
            title: 'Special Number Values',
            code: `// Infinity and -Infinity
console.log(1 / 0);          // Infinity
console.log(-1 / 0);         // -Infinity
console.log(Number.POSITIVE_INFINITY === Infinity); // true

// NaN (Not a Number)
console.log(0 / 0);          // NaN
console.log(Number("abc"));  // NaN
console.log(Math.sqrt(-1));  // NaN

// Checking for NaN
console.log(Number.isNaN(NaN));       // true
console.log(Number.isNaN("text"));    // false (doesn\'t coerce)
console.log(isNaN("text"));          // true (global isNaN coerces)`,
            explanation: 'JavaScript has special number values: `Infinity`, `-Infinity`, and `NaN`. Use `Number.isNaN()` to check for `NaN` as it doesn\'t coerce values, unlike the global `isNaN()` function.'
        }
    ];

    const bestPractices = [
        'Always specify the radix (base) when using `parseInt()` to avoid unexpected behavior with leading zeros',
        'Use `Number.isNaN()` instead of the global `isNaN()` function to avoid type coercion issues',
        'For floating-point comparisons, use a small epsilon value instead of exact equality due to precision issues',
        'Use `Number.isInteger()` or `Number.isSafeInteger()` to check if a value is an integer',
        'Be cautious with very large or very small numbers that might exceed JavaScript\'s safe integer range',
        'Use `toFixed()`, `toPrecision()`, or `toExponential()` for formatting numbers for display'
    ];

    const commonMistakes = [
        'Using `==` for number comparison instead of `===` (strict equality)',
        'Forgetting that `0.1 + 0.2 !== 0.3` due to floating-point precision issues',
        'Using `new Number()` to create primitive numbers (creates a Number object, not a primitive)',
        'Confusing `parseInt()` with `Number()` (different parsing behaviors)',
        'Not handling `NaN` properly in calculations (any operation with `NaN` results in `NaN`)',
        'Using the global `isNaN()` function which performs type coercion'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Number Object
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The JavaScript <code className="text-primary-600 dark:text-primary-400">Number</code> object is a built-in object that provides properties and methods for working with numeric values. It can be used to convert values to numbers, perform mathematical operations, and format numbers for display. The <code className="text-primary-600 dark:text-primary-400">Number</code> object represents both integer and floating-point numbers.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> In JavaScript, numbers are always stored as double-precision 64-bit binary format IEEE 754. This means there is no separate integer type in JavaScript, and all numbers are floating-point numbers.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with Numbers</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript provides several ways to work with numbers, including number literals, the Number object, and various methods for number conversion and formatting.
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
                        <li>Use bitwise operators ({`|0, ~~, >>0`}) for fast truncation of numbers to 32-bit integers when needed</li>
                        <li>Be cautious with floating-point arithmetic in performance-critical code</li>
                        <li>For large arrays of numbers, consider using TypedArrays for better performance</li>
                        <li>Avoid creating unnecessary Number objects (use primitive numbers instead)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NumberInJS;
