import CodeBlock from "../../components/CodeBlock";

const JsOuterHTML = () => {
    const examples = [
        {
            title: 'Comparing outerHTML vs. innerHTML',
            code: `// HTML: <div id="container" class="box"><p>Content</p></div>

const myDiv = document.getElementById('container');

console.log('--- innerHTML ---');
console.log(myDiv.innerHTML); // Logs: "<p>Content</p>"

console.log('--- outerHTML ---');
console.log(myDiv.outerHTML); // Logs: "<div id="container" class="box"><p>Content</p></div>"`,
            explanation: 'This example clearly shows the core difference: `innerHTML` gets the content *inside* the element, while `outerHTML` gets the content *plus the element itself* as a complete HTML string.'
        },
        {
            title: 'Replacing an Element Completely',
            code: `// HTML: <div id="main"><strong id="important-text">Old Text</strong></div>

const strongEl = document.getElementById('important-text');

// Replace the <strong> element with an <em> element
if (strongEl) {
    strongEl.outerHTML = '<em id="important-text">New Text</em>';
}`,
            explanation: 'Setting `outerHTML` removes the target element from the DOM and replaces it with the new HTML content you provide. Here, the `<strong>` tag is entirely replaced by an `<em>` tag.'
        },
        {
            title: 'Demonstrating the Detached Reference',
            code: `// HTML: <p id="my-para">Click me</p>

const p = document.getElementById('my-para');
p.addEventListener('click', () => console.log('Clicked!'));

// Now, replace the element
p.outerHTML = '<p id="my-para">I have been replaced.</p>';

// The original 'p' variable is now detached from the DOM.
// The new paragraph does NOT have the event listener.
// Trying to modify the old 'p' does nothing:
p.style.color = 'red'; // This has no effect.`,
            explanation: 'After setting `outerHTML`, the original JavaScript variable (`p`) no longer points to an element in the document. The new element that was created from the string does not retain any of the old element\'s properties or event listeners.'
        }
    ];

    const bestPractices = [
        'Use `outerHTML` specifically when you need to replace an entire element, including its tag, not just its internal content.',
        'Prefer modern DOM methods like `element.replaceWith(newElement)` when you can. Working with node objects is often safer and cleaner than manipulating HTML strings.',
        'Due to security risks, **never use `outerHTML` with untrusted content.** If you must, sanitize the string with a library like DOMPurify first.',
        'To simply remove an element, use the clearer and more direct `element.remove()` method instead of setting `outerHTML` to an empty string.'
    ];

    const commonMistakes = [
        '**Using the old element reference after setting `outerHTML`.** This is the most common error. The original variable points to a detached element that is no longer in the live DOM.',
        '**Confusing it with `innerHTML`.** Using `outerHTML` accidentally when you only meant to change the content *within* an element, thus replacing the parent element unintentionally.',
        '**Introducing a security risk (XSS)** by setting `outerHTML` to a string containing unsanitized user input or other untrusted data.',
        'Losing event listeners. When an element is replaced via `outerHTML`, the new element will not have any of the JavaScript event listeners that were attached to the original.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> outerHTML Property
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The <code className="text-primary-600 dark:text-primary-400">outerHTML</code> property is similar to `innerHTML`, but with one crucial difference: it gets or sets the HTML for an element **including the element itself**. This allows you to completely replace a DOM element with new HTML markup in a single operation.
                </p>

                <div className="mb-6 bg-red-50 dark:bg-red-900/20 p-6 rounded-md shadow-sm border border-red-200 dark:border-red-900/50">
                    <p className="text-red-800 dark:text-red-200">
                        <strong className="font-semibold">Important: </strong> When you set an element's `outerHTML`, that element is removed from the document and replaced. The original JavaScript variable pointing to it becomes a "stale" or "detached" reference and should not be used further. This property also carries the same XSS security risks as `innerHTML`.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with outerHTML</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Understanding `outerHTML` is about understanding replacement. The following examples highlight its difference from `innerHTML` and the critical concept of the detached element reference after a replacement.
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

export default JsOuterHTML;