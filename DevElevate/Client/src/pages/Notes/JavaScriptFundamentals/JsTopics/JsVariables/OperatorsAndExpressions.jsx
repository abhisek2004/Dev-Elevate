import CodeBlock from "../../components/CodeBlock";

const OperatorsAndExpressions = () => {
    const arithmeticOperators = [
        { operator: '+', name: 'Addition', example: '5 + 3', result: '8' },
        { operator: '-', name: 'Subtraction', example: '10 - 4', result: '6' },
        { operator: '*', name: 'Multiplication', example: '3 * 4', result: '12' },
        { operator: '/', name: 'Division', example: '15 / 3', result: '5' },
        { operator: '%', name: 'Modulus', example: '10 % 3', result: '1 (remainder)' },
        { operator: '**', name: 'Exponentiation', example: '2 ** 3', result: '8 (2 to the power of 3)' },
        { operator: '++', name: 'Increment', example: 'let x = 5; x++;', result: 'x becomes 6' },
        { operator: '--', name: 'Decrement', example: 'let x = 5; x--;', result: 'x becomes 4' },
    ];

    const comparisonOperators = [
        { operator: '==', name: 'Equal to', example: '5 == "5"', result: 'true' },
        { operator: '===', name: 'Strict equal to', example: '5 === "5"', result: 'false' },
        { operator: '!=', name: 'Not equal', example: '5 != 3', result: 'true' },
        { operator: '!==', name: 'Strict not equal', example: '5 !== "5"', result: 'true' },
        { operator: '>', name: 'Greater than', example: '10 > 5', result: 'true' },
        { operator: '<', name: 'Less than', example: '3 < 2', result: 'false' },
        { operator: '>=', name: 'Greater than or equal', example: '5 >= 5', result: 'true' },
        { operator: '<=', name: 'Less than or equal', example: '4 <= 3', result: 'false' },
    ];

    const logicalOperators = [
        {
            operator: '&&',
            name: 'Logical AND',
            example: 'true && false',
            result: 'false',
            description: 'Returns true if both operands are true'
        },
        {
            operator: '||',
            name: 'Logical OR',
            example: 'true || false',
            result: 'true',
            description: 'Returns true if at least one operand is true'
        },
        {
            operator: '!',
            name: 'Logical NOT',
            example: '!true',
            result: 'false',
            description: 'Returns the opposite boolean value'
        },
        {
            operator: '??',
            name: 'Nullish Coalescing',
            example: 'null ?? "default"',
            result: '"default"',
            description: 'Returns the right operand when the left is null/undefined'
        }
    ];

    const assignmentOperators = [
        { operator: '=', example: 'x = 5', description: 'Assigns value to variable' },
        { operator: '+=', example: 'x += 3', description: 'x = x + 3' },
        { operator: '-=', example: 'x -= 2', description: 'x = x - 2' },
        { operator: '*=', example: 'x *= 4', description: 'x = x * 4' },
        { operator: '/=', example: 'x /= 2', description: 'x = x / 2' },
        { operator: '%=', example: 'x %= 3', description: 'x = x % 3' },
        { operator: '**=', example: 'x **= 2', description: 'x = x ** 2' },
    ];

    const operatorPrecedence = [
        { level: '1', operators: '()', description: 'Parentheses (grouping)' },
        { level: '2', operators: '++ -- !', description: 'Increment, Decrement, Logical NOT' },
        { level: '3', operators: '**', description: 'Exponentiation' },
        { level: '4', operators: '* / %', description: 'Multiplication, Division, Modulus' },
        { level: '5', operators: '+ -', description: 'Addition, Subtraction' },
        { level: '6', operators: '< <= > >=', description: 'Comparison' },
        { level: '7', operators: '== != === !==', description: 'Equality' },
        { level: '8', operators: '&&', description: 'Logical AND' },
        { level: '9', operators: '||', description: 'Logical OR' },
        { level: '10', operators: '=', description: 'Assignment' },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Operators and <span className='text-primary-600 dark:text-primary-400'>Expressions</span>
            </h1>

            <div className="prose max-w-none">
                <section className="mb-8">
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        Operators in JavaScript are symbols that perform operations on values and variables.
                        Expressions are combinations of values, variables, and operators that produce a result.
                        Understanding operators and expressions is fundamental to writing effective JavaScript code.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Arithmetic Operators</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Perform mathematical operations on numbers.
                    </p>

                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr className='border-b border-gray-200 dark:border-gray-700'>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Operator</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Example</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Result</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {arithmeticOperators.map((op, index) => (
                                    <tr key={`arith-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-200">{op.operator}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{op.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700 dark:text-gray-300">{op.example}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{op.result}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Example: Using Arithmetic Operators</h3>
                        <CodeBlock code={`let a = 10;
let b = 3;

console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.333...
console.log(a % b);  // 1 (remainder of 10 / 3)
console.log(a ** 2); // 100 (10 to the power of 2)

let count = 5;
count++;  // Increment: count is now 6
count--;  // Decrement: count is now 5 again`} />
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Comparison Operators</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Compare values and return a boolean (true/false).
                    </p>

                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr className='border-b border-gray-200 dark:border-gray-700'>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Operator</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Example</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Result</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {comparisonOperators.map((op, index) => (
                                    <tr key={`comp-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-200">{op.operator}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{op.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700 dark:text-gray-300">{op.example}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{op.result}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Example: Using Comparison Operators</h3>
                        <CodeBlock code={`// Loose equality (==) vs Strict equality (===)
console.log(5 == "5");   // true (type coercion)
console.log(5 === "5");  // false (different types)

// Not equal (!=) vs Strict not equal (!==)
console.log(5 != "5");   // false (type coercion)
console.log(5 !== "5");  // true (different types)

// Comparison with null/undefined
console.log(null == undefined);   // true
console.log(null === undefined);  // false

// String comparison (lexicographical order)
console.log("apple" < "banana");  // true
console.log("Zoo" < "apple");     // true (uppercase comes before lowercase)`} />
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Logical Operators</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Combine or invert boolean values.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {logicalOperators.map((op, index) => (
                            <div key={`logic-${index}`} className="bg-white dark:bg-black p-3 sm:p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/50">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3">
                                    <span className="whitespace-nowrap">
                                        {op.name}
                                        <span className="font-mono text-primary-600 dark:text-primary-400 ml-1">
                                            ({op.operator})
                                        </span>
                                    </span>
                                </h3>
                                <CodeBlock code={`// Example:
console.log(${op.example});  // ${op.result}`} />
                                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {op.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Short-Circuit Evaluation</h3>
                        <CodeBlock
                            code={`// Logical AND (&&) - returns first falsy value or last truthy value
console.log(0 && 2);      // 0
console.log('' && 'Hello'); // ''
console.log(1 && 2 && 3);  // 3

// Logical OR (||) - returns first truthy value or last falsy value
console.log(0 || 2);      // 2
console.log('' || 'Hello'); // 'Hello'
console.log(0 || '' || null); // null

// Nullish Coalescing (??) - returns right side only if left is null/undefined
console.log(0 ?? 'default');  // 0
console.log('' ?? 'default'); // ''
console.log(null ?? 'default'); // 'default'`} />
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Assignment Operators</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Assign values to variables, often combined with other operations.
                    </p>

                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr className='border-b border-gray-200 dark:border-gray-700'>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Operator</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Example</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Equivalent To</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {assignmentOperators.map((op, index) => (
                                    <tr key={`assign-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-200">{op.operator}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700 dark:text-gray-300">{op.example}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{op.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Operator Precedence</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Determines the order in which operators are evaluated in an expression.
                    </p>

                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr className='border-b border-gray-200 dark:border-gray-700'>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Precedence</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Operator Type</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Example</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {operatorPrecedence.map((op, index) => (
                                    <tr key={`prec-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{op.level}</td>
                                        <td className="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">{op.operators}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{op.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white dark:bg-black p-3 sm:p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">Examples of Operator Precedence</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <CodeBlock
                                code={`// Multiplication has higher precedence
let result1= 10 + 5 * 2;  // 20, not 30
// Same as: 10 + (5 * 2)

// String concatenation
let name = 'John';
let greeting = 'Hello, ' + name + '!';`} />
                            <CodeBlock
                                code={`// && has higher precedence than ||
let a = true || false && false;  // true
// Same as: true || (false && false)

// Parentheses change evaluation
let b = (true || false) && false;  // false`} />
                        </div>
                    </div>
                </section>

                <section className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">===</code> (strict equality) instead of <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">==</code> to avoid unexpected type coercion</li>
                        <li>Use parentheses to make complex expressions more readable, even when not strictly necessary</li>
                        <li>Be aware of operator precedence when combining multiple operators</li>
                        <li>Use template literals (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">`string ${'value'}`</code>) for string concatenation</li>
                        <li>Consider using the nullish coalescing operator (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">??</code>) for default values instead of <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">||</code> when you only want to check for <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">null</code> or <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">undefined</code></li>
                        <li>Use the exponentiation operator (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">**</code>) instead of <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Math.pow()</code> for better readability</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default OperatorsAndExpressions;
