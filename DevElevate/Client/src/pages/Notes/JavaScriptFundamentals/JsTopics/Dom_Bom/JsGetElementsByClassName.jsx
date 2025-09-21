import CodeBlock from "../../components/CodeBlock";

const JsGetElementsByClassName = () => {
    const examples = [
        {
            title: 'Basic Usage: Selecting and Styling Elements',
            code: `// HTML:
// <p class="highlight">First paragraph.</p>
// <span>Some other text.</span>
// <p class="highlight">Second paragraph.</p>

const highlighted = document.getElementsByClassName('highlight');

// Use a for...of loop to iterate (works on any HTMLCollection)
for (const element of highlighted) {
    element.style.backgroundColor = 'yellow';
}`,
            explanation: 'This method selects all elements with the class "highlight" and returns them as a collection. You can then loop through the collection to apply changes to each element individually.'
        },
        {
            title: 'Understanding the "Live" HTMLCollection',
            code: `// HTML: <div id="container"><div class="item">1</div></div>

const items = document.getElementsByClassName('item');
console.log('Initial count:', items.length); // Logs: 1

// Now, add a new element with the same class
const container = document.getElementById('container');
const newItem = document.createElement('div');
newItem.className = 'item';
newItem.textContent = '2';
container.append(newItem);

console.log('Count after adding new element:', items.length); // Logs: 2`,
            explanation: 'The `HTMLCollection` is "live." This means it automatically updates when the DOM changes. Notice how the `items` variable reflects the new element being added without being re-selected.'
        },
        {
            title: 'Searching Within a Specific Element',
            code: `// HTML:
// <div id="section-one">
//   <p class="text">Text in section one.</p>
// </div>
// <div id="section-two">
//   <p class="text">Text in section two.</p>
// </div>

const sectionTwo = document.getElementById('section-two');
const sectionTwoText = sectionTwo.getElementsByClassName('text');

sectionTwoText[0].style.fontWeight = 'bold'; // Makes only the second paragraph bold`,
            explanation: 'You can call `getElementsByClassName` on any element, not just `document`, to find only the descendant elements that have the specified class name.'
        },
         {
            title: 'Selecting Elements with Multiple Classes',
            code: `// HTML:
// <div class="box big">Big box</div>
// <div class="box small">Small box</div>
// <div class="box big red">Big red box</div>

// Select elements that have BOTH 'box' and 'big' classes
const bigBoxes = document.getElementsByClassName('box big');

console.log('Found big boxes:', bigBoxes.length); // Logs: 2`,
            explanation: 'To select elements that contain multiple classes, pass a single string with the class names separated by spaces. The order of the classes does not matter.'
        }
    ];

    const bestPractices = [
        'Be mindful that you are working with a "live" collection. If you need a static list that won\'t change, convert the collection to an array first using `Array.from(collection)`.',
        'For modern development, `querySelectorAll(".my-class")` is often preferred. It returns a static `NodeList` and supports complex CSS selectors, offering more consistency.',
        'Use a `for...of` loop for iteration, as it is clean and works reliably on `HTMLCollection`s in all modern browsers.',
        'Use descriptive, semantic class names in your HTML to make your selections more meaningful (e.g., `.product-card` instead of `.box`).'
    ];

    const commonMistakes = [
        'Attempting to use Array methods like `.forEach()` or `.map()` directly on the `HTMLCollection`. This fails in older browsers. You must convert it to an array first.',
        'Creating an infinite loop. If you iterate over a collection and add a new element with the same class inside the loop, the collection will grow, and the loop will never end.',
        'Forgetting that class names are case-sensitive. `.getElementsByClassName("myClass")` will not find elements with `class="myclass"`.',
        'Passing multiple arguments like `getElementsByClassName("classA", "classB")`. Multiple classes must be passed as a single space-separated string.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> getElementsByClassName Method
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The <code className="text-primary-600 dark:text-primary-400">getElementsByClassName()</code> method searches the document or a specific element for all elements that have a given class name. It returns a **live HTMLCollection**, which is an array-like object of the found elements.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> The key feature of `getElementsByClassName` is its "live" return collection. This means if an element with the target class is added to or removed from the page, the collection variable automatically updates to reflect that change without needing to query the DOM again.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with getElementsByClassName</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        This method is ideal for selecting groups of related elements. The examples below demonstrate how to select elements, the implications of a "live" collection, and how to perform scoped searches.
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
            </div>
        </div>
    );
};

export default JsGetElementsByClassName;