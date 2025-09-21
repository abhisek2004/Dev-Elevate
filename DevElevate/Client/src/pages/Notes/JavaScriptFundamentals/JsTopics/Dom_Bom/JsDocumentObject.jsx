import CodeBlock from "../../components/CodeBlock";

const JsDocumentObject = () => {
    const examples = [
        {
            title: 'Selecting a Single Element',
            code: `// Modern way using a CSS selector (recommended)
const mainHeader = document.querySelector('#main-title');
if (mainHeader) {
    mainHeader.style.color = 'blue';
}

// Traditional way using an ID
const container = document.getElementById('container');
if (container) {
    container.style.border = '1px solid black';
}`,
            explanation: 'The `querySelector()` method is a powerful, modern way to find the first element that matches a specific CSS selector. `getElementById()` is faster but less flexible as it only works with IDs.'
        },
        {
            title: 'Selecting Multiple Elements',
            code: `// Get a static NodeList of all <p> elements with the class 'highlight'
const highlightedParagraphs = document.querySelectorAll('p.highlight');

// Loop through the list and apply a style
highlightedParagraphs.forEach(p => {
    p.style.backgroundColor = 'yellow';
});`,
            explanation: '`querySelectorAll()` returns a static `NodeList` containing all elements matching the CSS selector. You can easily iterate over this list with methods like `forEach()` to manipulate multiple elements at once.'
        },
        {
            title: 'Creating and Appending New Elements',
            code: `// 1. Create a new <li> element in memory
const newItem = document.createElement('li');

// 2. Set its content and attributes
newItem.textContent = 'A new list item';
newItem.className = 'list-item';

// 3. Find the parent <ul> and append the new element
const list = document.querySelector('#myList');
if (list) {
    list.append(newItem);
}`,
            explanation: 'Dynamically creating and adding elements involves three steps: creating the element, configuring it (e.g., adding text and classes), and then appending it to an existing element in the DOM.'
        },
        {
            title: 'Listening for DOM Events',
            code: `// Wait until the entire HTML document has been loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document is ready!');

    const myButton = document.querySelector('#myButton');
    if (myButton) {
        myButton.addEventListener('click', () => {
            alert('Button was clicked!');
        });
    }
});`,
            explanation: 'The `addEventListener()` method is fundamental for interactivity. Attaching it to the `document` with the `DOMContentLoaded` event ensures your code only runs after the page is safe to manipulate.'
        }
    ];

    const bestPractices = [
        'Prefer `querySelector` and `querySelectorAll` over older methods like `getElementsByClassName` for their power and consistency with CSS syntax.',
        'Wait for the `DOMContentLoaded` event before running scripts that manipulate the DOM to avoid errors from trying to access elements that haven\'t been created yet.',
        'Minimize direct DOM manipulation in loops. If adding many elements, create a document fragment, append elements to it, and then append the fragment to the DOM in a single operation.',
        'Use `textContent` instead of `innerHTML` when inserting plain text to prevent Cross-Site Scripting (XSS) security vulnerabilities.',
        'Use event delegation by attaching a single event listener to a parent element to manage events for multiple child elements efficiently.'
    ];

    const commonMistakes = [
        'Attempting to select an element before the DOM is fully loaded, which results in `null` and causes script errors.',
        'Confusing a live `HTMLCollection` (from `getElementsByClassName`) with a static `NodeList` (from `querySelectorAll`). The live collection updates automatically if elements are added or removed from the DOM.',
        'Creating memory leaks by adding event listeners to elements but failing to remove them when the elements are no longer needed.',
        'Modifying the `style` attribute directly for many changes. It\'s better to define a CSS class and toggle it on the element using `element.classList.add()` or `element.classList.toggle()`.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Document Object
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The JavaScript <code className="text-primary-600 dark:text-primary-400">document</code> object is the entry point to the web page's content, representing the entire Document Object Model (DOM). It provides a rich API to select, create, delete, and modify every element on the page, making it the cornerstone of dynamic and interactive web development.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> While older methods like `getElementById` are still valid, modern JavaScript development heavily favors `querySelector` and `querySelectorAll`. Their ability to use any CSS selector makes them incredibly versatile and powerful for targeting DOM elements.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with the Document Object</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The `document` object allows for complete control over the HTML. The following examples demonstrate the fundamental operations: finding elements, changing them, creating new ones, and responding to user interactions.
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

export default JsDocumentObject;