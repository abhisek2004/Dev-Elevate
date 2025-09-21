import CodeBlock from "../../components/CodeBlock"

const MapFilterReduce = () => {
    const examples = [
        {
            title: 'Map Method',
            code: `// Double each number
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
// [2, 4, 6]`,
            explanation: `The map() method creates a new array by applying a function to each element in the original array. It's ideal for transforming data without mutating the original array. The callback function receives each element, its index, and the original array as arguments.`
        },
        {
            title: 'Filter Method',
            code: `// Get even numbers
const numbers = [1, 2, 3, 4];
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]`,
            explanation: `The filter() method creates a new array with all elements that pass a test implemented by the provided function. It's useful for extracting a subset of data. The callback should return true to keep the element, or false otherwise.`
        },
        {
            title: 'Reduce Method',
            code: `// Sum all numbers
const numbers = [1, 2, 3];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
// 6`,
            explanation: `The reduce() method executes a reducer function on each element, resulting in a single output value. It's powerful for calculations that need to remember previous values. The reducer function takes an accumulator (carries the result of previous iterations) and current value as arguments.`
        },
        {
            title: 'Chaining Methods',
            code: `// Get total price of in-stock products
const products = [
    { name: 'Laptop', price: 1000, inStock: true },
    { name: 'Mouse', price: 25, inStock: false },
    { name: 'Keyboard', price: 100, inStock: true }
];

const total = products
    .filter(p => p.inStock)    // First filter in-stock items
    .map(p => p.price)         // Then extract just the prices
    .reduce((sum, price) => sum + price, 0);  // Finally, sum them up
// 1100`,
            explanation: 'Method chaining allows you to perform multiple operations in sequence. Each method returns a new array, enabling you to chain the next method call. This creates a clean, readable pipeline for data transformation. The order of operations matters - filter first to reduce the dataset before mapping or reducing.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">
                <span className="text-primary-600">JavaScript</span> Map, Filter, and Reduce
            </h1>

            <div className="prose max-w-none">
                <div className="mb-6 space-y-4">
                    <p>
                        JavaScript's functional array methods - map, filter, and reduce - provide a declarative approach to data transformation. Unlike imperative loops that describe how to perform an operation, these methods describe what operation to perform, making the code more readable and maintainable.
                    </p>
                    <p>
                        These methods are part of the functional programming paradigm in JavaScript, promoting immutability (they don't modify the original array) and pure functions (same input always produces the same output without side effects). This leads to more predictable and testable code.
                    </p>
                    <p>
                        All three methods are higher-order functions, meaning they take other functions as arguments. They iterate over arrays automatically, handling the iteration logic internally, which reduces boilerplate code and potential off-by-one errors common in traditional for loops.
                    </p>
                </div>

                <div className="space-y-6">
                    {examples.map((example, i) => (
                        <div key={i} className="bg-white dark:bg-black p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                            <CodeBlock code={example.code} />
                            <p className="mt-2">{example.explanation}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-gray-50 dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-semibold mb-2">Key Points</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Immutability:</strong> All methods return new arrays/values, leaving the original data unchanged</li>
                        <li><strong>Chainable:</strong> Methods can be chained together for complex data transformations</li>
                        <li><strong>Readability:</strong> The code clearly expresses intent rather than implementation details</li>
                        <li><strong>Functional:</strong> Follows functional programming principles with pure functions</li>
                        <li><strong>Performance:</strong> While generally slightly slower than for loops, the difference is negligible for most use cases</li>
                        <li><strong>Return Values:</strong> map and filter return arrays, while reduce can return any data type</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MapFilterReduce;
