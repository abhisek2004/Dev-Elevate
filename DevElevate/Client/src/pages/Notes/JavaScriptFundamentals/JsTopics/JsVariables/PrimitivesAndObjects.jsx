import CodeBlock from '../../components/CodeBlock';

const PrimitivesAndObjects = () => {
    const primitiveExamples = [
        {
            type: 'Number',
            example: '42, 3.14, -5',
            description: 'Numeric values, including integers and floating-point numbers'
        },
        {
            type: 'String',
            example: '"Hello", \'World\', `Template Literal`',
            description: 'Textual data, can use single quotes, double quotes, or backticks'
        },
        {
            type: 'Boolean',
            example: 'true, false',
            description: 'Logical values representing true or false'
        },
        {
            type: 'Null',
            example: 'null',
            description: 'Represents the intentional absence of any object value'
        },
        {
            type: 'Undefined',
            example: 'let x; // x is undefined',
            description: 'Variable that has been declared but not assigned a value'
        },
        {
            type: 'Symbol',
            example: 'const sym = Symbol(\'unique\')',
            description: 'Unique and immutable primitive value (ES6+)'
        },
        {
            type: 'BigInt',
            example: '9007199254740991n',
            description: 'Represents integers larger than 2^53 - 1 (ES2020+)'
        }
    ];

    const objectExamples = [
        {
            type: 'Object',
            example: '{ name: "John", age: 30 }',
            description: 'Collection of key-value pairs'
        },
        {
            type: 'Array',
            example: '[1, 2, 3, 4, 5]',
            description: 'Ordered list of values'
        },
        {
            type: 'Function',
            example: 'function greet() { return "Hello!"; }',
            description: 'Callable object that executes a block of code'
        },
        {
            type: 'Date',
            example: 'new Date()',
            description: 'Represents a specific moment in time'
        },
        {
            type: 'RegExp',
            example: '/[A-Z]+/g',
            description: 'Pattern used for text search and replace'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Primitives and <span className='text-primary-600 dark:text-primary-400'>Objects</span>
            </h1>

            <div className="prose max-w-none">
                <section className="mb-8">
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        In JavaScript, data types are divided into two main categories: primitives and objects.
                        Understanding the difference between them is crucial for writing effective JavaScript code.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Primitive Types</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Primitives are the most basic data types in JavaScript. They are immutable (cannot be changed) and are passed by value.
                    </p>

                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr className='border-b border-gray-200 dark:border-gray-700'>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Type</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Example</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {primitiveExamples.map((item, index) => (
                                    <tr key={`primitive-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{item.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-mono">{item.example}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Immutability Example</h3>

                        <CodeBlock code={`let a = 5;
let b = a;  // b gets the value of a (5)
b = 10;     // Changing b does not affect a

console.log(a); // 5
console.log(b); // 10`} />
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                            Primitives are passed by value. When you assign a primitive to a variable, a copy of the value is created.
                        </p>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Object Types</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Objects are more complex data structures that can contain multiple values as properties. They are mutable and passed by reference.
                    </p>

                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr className='border-b border-gray-200 dark:border-gray-700'>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Type</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Example</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {objectExamples.map((item, index) => (
                                    <tr key={`object-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{item.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-mono">{item.example}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Reference Example</h3>
                            <CodeBlock
                                code={`const obj1 = { name: 'John' };
const obj2 = obj1;  // obj2 references the same object as obj1
obj2.name = 'Jane';  // Modifying obj2 affects obj1

console.log(obj1.name); // 'Jane'
console.log(obj2.name); // 'Jane'`} />

                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                                Objects are passed by reference. When you assign an object to a variable, you're creating a reference to the same object in memory.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Creating Copies</h3>
                            <CodeBlock
                                code={`// Shallow copy
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };  // Spread operator

// Deep copy (for simple objects)
const deepCopy = JSON.parse(JSON.stringify(original));

// Using Object.assign()
const anotherCopy = Object.assign({}, original);`}
                            />
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                                To create true copies of objects, you need to use techniques like spread operator, Object.assign(), or deep cloning.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Type Coercion</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript is loosely typed, which means variables can change types implicitly. Understanding type coercion is essential.
                    </p>

                    <div className="bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Implicit Coercion</h3>
                                <CodeBlock
                                    code={`'5' + 3      // '53' (number to string)
'5' - 3      // 2   (string to number)
true + 1     // 2   (boolean to number)
'5' == 5     // true (loose equality)
'5' === 5    // false (strict equality)`} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Explicit Conversion</h3>
                                <CodeBlock
                                    code={`String(123)        // '123'
Number('123')      // 123
Boolean('hello')   // true
parseInt('10px')   // 10
+ '42'             // 42 (unary plus)
!!'hello'          // true (double negation)`} />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Key Differences</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr className='border-b border-gray-200 dark:border-gray-700'>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Aspect</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Primitives</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Objects</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">Mutability</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Immutable</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Mutable</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">Storage</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Stored by value</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Stored by reference</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">Copying</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Creates independent copy</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Creates reference to same object</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">Comparison</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">By value</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">By reference</td>
                                </tr>
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">Methods</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">No methods (except auto-boxing)</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">Can have methods and properties</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">===</code> (strict equality) instead of <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">==</code> to avoid unexpected type coercion</li>
                        <li>Be explicit with type conversions rather than relying on implicit coercion</li>
                        <li>When working with objects, be mindful of reference vs value behavior</li>
                        <li>Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">const</code> by default, and only use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">let</code> when you need to reassign a variable</li>
                        <li>Consider using TypeScript for better type safety in larger projects</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default PrimitivesAndObjects;
