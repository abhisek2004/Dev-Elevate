import CodeBlock from "../../components/CodeBlock";

const BooleanInJS = () => {
    const examples = [
        {
            title: 'Creating Boolean Values',
            code: `// Using Boolean() function
const isTrue = Boolean(1);
const isFalse = Boolean(0);
console.log(isTrue);   // true
console.log(isFalse);  // false

// Using boolean literals
const isOnline = true;
const hasPermission = false;

// Truthy and Falsy values
console.log(Boolean(''));        // false (empty string)
console.log(Boolean('text'));    // true (non-empty string)
console.log(Boolean(0));         // false (zero)
console.log(Boolean(1));         // true (non-zero)
console.log(Boolean({}));        // true (object)
console.log(Boolean([]));        // true (array)
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false`,
            explanation: 'Boolean values can be created using the `Boolean()` function or boolean literals (`true`/`false`). JavaScript has specific rules for truthy and falsy values that determine how values are coerced to booleans.'
        },
        {
            title: 'Logical Operators',
            code: `// Logical AND (&&) - Returns first falsy value or last truthy value
console.log(true && true);     // true
console.log(true && false);    // false
console.log('text' && 0);      // 0 (first falsy value)
console.log('a' && 'b');       // 'b' (both truthy, returns last value)

// Logical OR (||) - Returns first truthy value or last falsy value
console.log(true || false);    // true
console.log(false || false);   // false
console.log(0 || 'default');   // 'default' (first truthy value)
console.log('' || null || 0);  // 0 (all falsy, returns last value)

// Nullish Coalescing (??) - Returns first defined value
console.log(0 ?? 'default');   // 0 (0 is defined)
console.log(null ?? 'default'); // 'default' (null is not defined)
console.log(undefined ?? 'default'); // 'default'`,
            explanation: 'Logical operators in JavaScript can be used to combine or manipulate boolean values. They use short-circuit evaluation and can return the value of one of the operands, not just `true` or `false`.'
        },
        {
            title: 'Logical NOT and Double NOT',
            code: `// Logical NOT (!) - Inverts the boolean value
console.log(!true);        // false
console.log(!false);       // true
console.log(!'text');      // false (truthy -> false)
console.log(!0);           // true (falsy -> true)

// Double NOT (!!) - Converts value to boolean
console.log(!!'text');     // true
console.log(!!0);          // false
console.log(!!1);          // true
console.log(!!undefined);  // false`,
            explanation: 'The logical NOT operator (`!`) inverts a boolean value. Using two NOT operators (`!!`) is a common pattern to convert any value to its boolean equivalent.'
        },
        {
            title: 'Boolean Object vs Primitive',
            code: `// Primitive boolean
const primitiveTrue = true;
const primitiveFalse = false;

// Boolean object (not recommended)
const boolObj = new Boolean(true);

console.log(typeof primitiveTrue);  // 'boolean'
console.log(typeof boolObj);        // 'object'

// Comparison
console.log(primitiveTrue === true);        // true
console.log(boolObj === true);              // false (object vs primitive)
console.log(boolObj.valueOf() === true);    // true

// Using Boolean as a function (without 'new')
const fromString = Boolean('true');
console.log(fromString);  // true
console.log(typeof fromString);  // 'boolean'`,
            explanation: 'JavaScript has both primitive boolean values and Boolean objects. In most cases, you should use primitive booleans. The Boolean object can lead to unexpected behavior in comparisons.'
        },
        {
            title: 'Conditional (Ternary) Operator',
            code: `// Basic syntax: condition ? valueIfTrue : valueIfFalse
const age = 20;
const status = age >= 18 ? 'adult' : 'minor';
console.log(status);  // 'adult'

// Chaining ternary operators
const score = 85;
const grade = score >= 90 ? 'A' :
              score >= 80 ? 'B' :
              score >= 70 ? 'C' : 'F';
console.log(grade);  // 'B'

// Using with template literals
const isLoggedIn = true;
console.log(\`Welcome, \${isLoggedIn ? 'User' : 'Guest'}\`);  // 'Welcome, User'`,
            explanation: 'The ternary operator provides a concise way to write conditional logic. It evaluates a condition and returns one of two values based on whether the condition is truthy or falsy.'
        }
    ];

    const bestPractices = [
        'Use strict equality (`===`) instead of loose equality (`==`) to avoid unexpected type coercion',
        'Prefer primitive booleans (`true`/`false`) over Boolean objects',
        'Use the double NOT operator (`!!`) to explicitly convert values to booleans when needed',
        'Be aware of all falsy values in JavaScript: `false`, `0`, `""`, `null`, `undefined`, `NaN`',
        'Use the nullish coalescing operator (`??`) when you only want to check for `null` or `undefined`',
        'Keep ternary operators simple and readable; avoid deeply nested ternary expressions'
    ];

    const commonMistakes = [
        'Using `new Boolean()` instead of boolean primitives, leading to unexpected comparison results',
        'Confusing the assignment operator (`=`) with the equality operator (`==` or `===`)',
        'Forgetting that `0`, empty strings, `null`, `undefined`, and `NaN` are falsy',
        'Using `==` instead of `===` which can lead to unexpected type coercion',
        'Overusing the ternary operator for complex conditions where an if-else statement would be more readable',
        'Not understanding that logical operators (`&&`, `||`) return the value of one of the operands, not just `true` or `false`'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Boolean in <span className="text-primary-600 dark:text-primary-400">JavaScript</span>
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The JavaScript <code className="text-primary-600 dark:text-primary-400">Boolean</code> is a fundamental data type that represents one of two values: <code className="text-primary-600 dark:text-primary-400">true</code> or <code className="text-primary-600 dark:text-primary-400">false</code>. Booleans are essential for controlling program flow through conditional statements and logical operations. In JavaScript, booleans can be primitive values or Boolean objects, though primitive booleans are generally preferred.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> In JavaScript, many values can be considered "falsy" when evaluated in a boolean context. These include: <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">false</code>, <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">0</code>, <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">""</code>, <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">null</code>, <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">undefined</code>, and <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">NaN</code>. All other values are considered "truthy".
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with Booleans</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript provides several ways to work with boolean values, including logical operators, comparison operators, and type conversion. Understanding these concepts is crucial for writing effective conditional logic.
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
                        <li>Boolean operations are generally very fast, but complex conditions with multiple logical operators can impact performance in tight loops</li>
                        <li>For conditions that are expensive to compute, consider evaluating the most likely condition first when using logical OR (`||`)</li>
                        <li>Be cautious with type coercion in performance-critical code as it can have a small overhead</li>
                        <li>In modern JavaScript engines, there is typically no significant performance difference between different ways of writing the same boolean logic</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BooleanInJS;
