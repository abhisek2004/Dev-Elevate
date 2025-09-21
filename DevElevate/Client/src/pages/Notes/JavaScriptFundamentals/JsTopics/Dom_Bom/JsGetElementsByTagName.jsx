import CodeBlock from "../../components/CodeBlock";

const JsGetElementsByTagName = () => {
    const examples = [
        {
            title: 'Basic Usage: Selecting All Paragraphs',
            code: `// HTML:
// <p>First paragraph.</p>
// <div><p>Second paragraph, nested.</p></div>

const allParagraphs = document.getElementsByTagName('p');

console.log('Number of paragraphs found:', allParagraphs.length); // Logs: 2

for (const p of allParagraphs) {
    p.style.fontStyle = 'italic';
}`,
            explanation: 'This is the most direct way to get a collection of every element of a specific type, regardless of where it is in the document. Here, we select and style every `<p>` element.'
        },
        {
            title: 'Searching Within a Specific Element',
            code: `// HTML:
// <article id="main-article">
//   <h2>Article Title</h2>
//   <p>Paragraph 1</p>
//   <p>Paragraph 2</p>
// </article>
// <footer><p>Footer text</p></footer>

const article = document.getElementById('main-article');
const paragraphsInArticle = article.getElementsByTagName('p');

console.log(paragraphsInArticle.length); // Logs: 2 (it ignores the <p> in the footer)

for (const p of paragraphsInArticle) {
    p.style.border = '1px solid gray';
}`,
            explanation: 'You can call `getElementsByTagName` on any element to limit the search to only its descendants, providing a powerful way to scope your DOM queries.'
        },
        {
            title: 'Using the Wildcard Selector',
            code: `// Get a collection of EVERY single element in the document
const allElements = document.getElementsByTagName('*');

console.log(\`This document has \${allElements.length} total elements.\`);`,
            explanation: 'Using the asterisk `*` as the tag name selects all HTML elements in the document or within a specific parent element. This can be useful for diagnostics or applying a universal change.'
        }
    ];

    const bestPractices = [
        'Use `getElementsByTagName` when you need a broad selection of elements of a single type and don\'t need the complexity of CSS selectors.',
        'If you plan to add or remove elements while iterating, convert the live `HTMLCollection` to a static array first using `Array.from()` to avoid unexpected behavior.',
        'For most cases in modern web development, `querySelectorAll()` is preferred for its consistency. It returns a static `NodeList` and can handle more complex selections.',
        'Combine this method with others for more specific targeting. For example, get a `<div>` by ID, then get all `<p>` tags within it.'
    ];

    const commonMistakes = [
        'Trying to use array methods like `.forEach()` directly on the `HTMLCollection`. This will fail in older browsers and is less compatible than using a `for...of` loop.',
        'Creating an infinite loop by adding new elements of the same tag name inside a loop that iterates over the live collection.',
        'Not realizing that the search is "deep." `parentElement.getElementsByTagName("p")` will find all `<p>` elements at any level inside `parentElement`, not just direct children.',
        'Relying on a specific index (e.g., `elements[0]`) to get an element, which can break easily if the HTML structure changes.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> getElementsByTagName Method
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The <code className="text-primary-600 dark:text-primary-400">getElementsByTagName()</code> method provides a way to select all elements with a given HTML tag name, such as `p`, `li`, or `div`. It returns a **live HTMLCollection** of all matching elements in the order they appear in the document.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> The tag name is case-insensitive in HTML documents, so `document.getElementsByTagName('p')` and `document.getElementsByTagName('P')` will produce the same result. The returned `HTMLCollection` is "live," meaning it automatically reflects additions or removals of elements in the DOM.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with getElementsByTagName</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        This method is excellent for gathering all instances of a particular element for batch operations. Below are examples of how to select elements globally, within a specific container, and using the special wildcard selector.
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

export default JsGetElementsByTagName;