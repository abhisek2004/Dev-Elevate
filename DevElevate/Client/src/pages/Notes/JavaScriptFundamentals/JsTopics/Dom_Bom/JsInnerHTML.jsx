import CodeBlock from "../../components/CodeBlock";

const JsInnerHTML = () => {
    const examples = [
        {
            title: 'Getting the HTML Content of an Element',
            code: `// HTML: <div id="userInfo"><p>Name: <strong>John</strong></p></div>

const userInfo = document.getElementById('userInfo');

// Get the HTML content as a string
const contentString = userInfo.innerHTML;

console.log(contentString);
// Logs: "<p>Name: <strong>John</strong></p>"`,
            explanation: 'When used as a getter, `innerHTML` returns a string containing all the HTML markup inside the selected element, including tags and text.'
        },
        {
            title: 'Replacing the Content of an Element',
            code: `// HTML: <div id="status">Loading...</div>

const statusDiv = document.getElementById('status');

// Replace the original content with new HTML
statusDiv.innerHTML = '<h2>Success!</h2><p>Your data has been loaded.</p>';`,
            explanation: 'When used as a setter, `innerHTML` parses the provided string as HTML and completely replaces any existing child elements and content. All old event listeners are destroyed.'
        },
        {
            title: 'Clearing All Content from an Element',
            code: `// HTML: <ul id="taskList"><li>Task 1</li><li>Task 2</li></ul>

const taskList = document.getElementById('taskList');

// Setting innerHTML to an empty string is a quick way to remove all children
taskList.innerHTML = '';

console.log(taskList.children.length); // Logs: 0`,
            explanation: 'Assigning an empty string to an element\'s `innerHTML` is a common and concise way to remove all of its descendant elements and content.'
        },
        {
            title: 'Building HTML from an Array (Trusted Data)',
            code: `const items = ['First item', 'Second item', 'Third item'];
const listContainer = document.getElementById('myList'); // Assuming <ul id="myList"> exists

const listItemsHTML = items.map(item => \`<li>\${item}</li>\`).join('');
listContainer.innerHTML = listItemsHTML;`,
            explanation: 'A common use case is to build an HTML string from an array of trusted data. The entire string is built first and then set once, which is more efficient than appending in a loop.'
        }
    ];

    const bestPractices = [
        '**Use `textContent` instead of `innerHTML` whenever you are dealing with plain text.** `textContent` is faster and automatically prevents security risks by not parsing the string as HTML.',
        '**Never use `innerHTML` to set content that comes from a user or any other untrusted source.** This exposes your site to Cross-Site Scripting (XSS) attacks.',
        'If you must set HTML from an external source, **sanitize it first** using a trusted library like DOMPurify to strip out malicious code.',
        'To add new HTML without destroying existing elements and their event listeners, use `element.insertAdjacentHTML()` instead of the `innerHTML += ...` pattern.'
    ];

    const commonMistakes = [
        '**The #1 mistake is setting user-provided content with `innerHTML`.** This is a major security vulnerability. For example, `div.innerHTML = userInput;` can allow an attacker to inject `<script>` tags.',
        '**Accidentally destroying event listeners.** When you set `innerHTML`, all existing child elements are removed and replaced, which also removes any event listeners attached to them.',
        '**Using `element.innerHTML += "..."` in a loop.** This is very inefficient because it forces the browser to re-read, re-parse, and re-create the DOM elements on every single iteration.',
        'Confusing `innerHTML` with `outerHTML`. `innerHTML` changes the content *inside* an element, whereas `outerHTML` replaces the element itself with the new content.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> innerHTML Property
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The <code className="text-primary-600 dark:text-primary-400">innerHTML</code> property provides a simple way to get or set the HTML content within an element. It works with a string of HTML markup, allowing you to read, completely replace, or remove all child elements of a DOM node.
                </p>

                <div className="mb-6 bg-red-50 dark:bg-red-900/20 p-6 rounded-md shadow-sm border border-red-200 dark:border-red-900/50">
                    <p className="text-red-800 dark:text-red-200">
                        <strong className="font-semibold">Security Warning: </strong> Be extremely careful with `innerHTML`. Setting content from an untrusted source (like user input) can lead to Cross-Site Scripting (XSS) attacks, allowing attackers to run malicious scripts on your page. Always prefer the safer `textContent` property for inserting text.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with innerHTML</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        While powerful, it's critical to understand how `innerHTML` works to use it safely and effectively. The examples below show how to get, set, and clear content, and how to properly build HTML from data.
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

export default JsInnerHTML;