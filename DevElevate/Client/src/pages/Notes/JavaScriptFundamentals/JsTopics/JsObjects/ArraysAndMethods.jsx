import CodeBlock from '../../components/CodeBlock';

const ArraysAndMethods = () => {
    const examples = [
        {
            title: 'Array Declaration',
            code: `// Empty array
const emptyArr = [];

// Array with elements
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'two', true, { name: 'John' }, [1, 2, 3]];

// Using Array constructor
const colors = new Array('red', 'green', 'blue');

// Array with a specific length
const emptyArr2 = new Array(5);  // Creates array with length 5`,
            explanation: 'Different ways to create arrays in JavaScript.'
        },
        {
            title: 'Basic Array Methods',
            code: `const fruits = ['apple', 'banana'];

// Add to end
fruits.push('orange');  // ['apple', 'banana', 'orange']

// Remove from end
const last = fruits.pop();  // 'orange', fruits = ['apple', 'banana']

// Add to beginning
fruits.unshift('kiwi');  // ['kiwi', 'apple', 'banana']

// Remove from beginning
const first = fruits.shift();  // 'kiwi', fruits = ['apple', 'banana']

// Get array length
const count = fruits.length;  // 2`,
            explanation: 'Basic array manipulation methods.'
        },
        {
            title: 'Array Iteration Methods',
            code: `const numbers = [1, 2, 3, 4, 5];

// forEach - executes a function for each element
numbers.forEach(num => console.log(num * 2));

// map - creates a new array with results of calling a function
const doubled = numbers.map(num => num * 2);  // [2, 4, 6, 8, 10]

// filter - creates a new array with elements that pass a test
const evens = numbers.filter(num => num % 2 === 0);  // [2, 4]

// reduce - reduces array to a single value
const sum = numbers.reduce((acc, curr) => acc + curr, 0);  // 15

// find - returns the first element that passes a test
const firstEven = numbers.find(num => num % 2 === 0);  // 2

// some - tests if any element passes a test
const hasEven = numbers.some(num => num % 2 === 0);  // true

// every - tests if all elements pass a test
const allEven = numbers.every(num => num % 2 === 0);  // false`,
            explanation: 'Common array iteration methods for processing array elements.'
        },
        {
            title: 'Array Manipulation',
            code: `const colors = ['red', 'green', 'blue'];

// slice - returns a portion of the array
const primary = colors.slice(0, 2);  // ['red', 'green']

// splice - changes the array by removing/replacing elements
colors.splice(1, 1, 'yellow');  // removes 1 element at index 1, adds 'yellow'
// colors is now ['red', 'yellow', 'blue']

// concat - merges arrays
const moreColors = colors.concat(['purple', 'pink']);

// join - creates a string from array elements
const colorString = colors.join(', ');  // 'red, yellow, blue'

// sort - sorts array elements
const numbers = [3, 1, 4, 1, 5];
numbers.sort();  // [1, 1, 3, 4, 5]

// reverse - reverses array order
numbers.reverse();  // [5, 4, 3, 1, 1]`,
            explanation: 'Methods for manipulating array contents and order.'
        },
        {
            title: 'ES6+ Array Features',
            code: `// Spread operator
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];  // [1, 2, 3, 4]

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4];  // first=1, second=2, rest=[3,4]

// Array.from - creates array from array-like objects
const str = 'hello';
const chars = Array.from(str);  // ['h', 'e', 'l', 'l', 'o']

// Array.of - creates array from arguments
const nums = Array.of(1, 2, 3);  // [1, 2, 3]

// findIndex - finds index of first element that passes test
const index = [10, 20, 30].findIndex(num => num > 15);  // 1`,
            explanation: 'Modern JavaScript array features and syntax.'
        }
    ];

    const bestPractices = [
        'Use const for arrays that should not be reassigned',
        'Prefer array methods (map, filter, reduce) over for/while loops for better readability',
        'Use Array.isArray() instead of typeof to check if a value is an array',
        'Be careful with array methods that modify the original array (push, pop, splice, etc.)',
        'Use the spread operator (...) for array copying and merging'
    ];

    const commonMistakes = [
        'Forgetting that array and object comparisons are by reference, not value',
        'Using == instead of === for array element comparison',
        'Modifying arrays during iteration which can lead to unexpected behavior',
        'Not handling sparse arrays correctly',
        'Using delete on array elements (leaves undefined holes, use splice instead)'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Arrays and Methods
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Arrays in JavaScript are used to store multiple values in a single variable. They are dynamic, can contain elements of different types, and provide many built-in methods for manipulation. Understanding arrays and their methods is fundamental to effective JavaScript programming.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong> 
                        Arrays in JavaScript are actually objects with special behaviors and properties. They are zero-indexed and can be dynamically resized.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Array Basics</h2>
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
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Array Iteration</h2>
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{examples[2].title}</h3>
                            <CodeBlock code={examples[2].code} />
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{examples[2].explanation}</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Advanced Array Operations</h2>
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
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">Performance Considerations</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        When working with large arrays, consider these performance tips:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                        <li>Use for loops instead of forEach/map for large datasets when performance is critical</li>
                        <li>Avoid unnecessary array method chaining which creates intermediate arrays</li>
                        <li>Consider using Set for unique value operations</li>
                        <li>Be mindful of O(n²) operations with nested array iterations</li>
                    </ul>
                    <CodeBlock
                        code={`// Inefficient with large arrays
const result = bigArray
  .filter(x => x > 10)
  .map(x => x * 2)
  .reduce((sum, x) => sum + x, 0);

// More efficient
let sum = 0;
for (let i = 0; i < bigArray.length; i++) {
    if (bigArray[i] > 10) {
        sum += bigArray[i] * 2;
    }
}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ArraysAndMethods;
