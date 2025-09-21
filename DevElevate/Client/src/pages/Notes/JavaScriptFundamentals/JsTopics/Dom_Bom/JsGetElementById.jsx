import CodeBlock from "../../components/CodeBlock";

const JsGetElementById = () => {
    const examples = [
        {
            title: 'Basic Usage: Selecting and Modifying an Element',
            code: `// HTML: <h1 id="main-title">Hello World</h1>

// Select the element by its ID
const titleElement = document.getElementById('main-title');

// Check if the element was found before modifying it
if (titleElement) {
    titleElement.textContent = 'Welcome to the Page!';
    titleElement.style.color = 'navy';
}`,
            explanation: 'This is the most common use case: finding an element by its unique ID and then manipulating its text content, style, or other properties.'
        },
        {
            title: 'Handling a Null Return Value',
            code: `// Attempt to select an ID that doesn't exist
const nonExistentElement = document.getElementById('non-existent-id');

if (nonExistentElement === null) {
    console.log('The element could not be found. This is expected.');
} else {
    // This code will not run
    nonExistentElement.textContent = 'This will never appear.';
}`,
            explanation: 'If no element with the specified ID exists, the method returns `null`. It is crucial to check for this to prevent "Cannot read properties of null" errors in your code.'
        },
        {
            title: 'Getting Form Input Values',
            code: `// HTML: <input type="text" id="username-input" value="JaneDoe">

// Get the input element
const usernameInput = document.getElementById('username-input');

// Access its 'value' property
if (usernameInput) {
    console.log(\`The username is: \${usernameInput.value}\`);
}`,
            explanation: '`getElementById` is extremely useful for interacting with form fields. You can easily retrieve or set the values of inputs, textareas, and other form controls.'
        }
    ];

    const bestPractices = [
        'Ensure every ID used in your HTML document is **absolutely unique**. Duplicate IDs are invalid HTML and lead to unpredictable behavior.',
        'Always check if the returned value is `null` before you try to use the element. This makes your code more robust.',
        'Use clear and descriptive IDs that explain the element\'s purpose, such as `main-navigation` or `user-profile-card`.',
        'While `getElementById` is very fast, consider using `querySelector("#yourId")` for consistency if your project uses `querySelector` for all other selections.'
    ];

    const commonMistakes = [
        'Forgetting that IDs are **case-sensitive**. `getElementById("myId")` will not find an element with `id="myid"`.',
        'Using the same ID for multiple elements. This is invalid HTML and `getElementById` will only ever return the first element it finds in the document tree.',
        'Trying to call `getElementById` on a specific element (e.g., `myDiv.getElementById(...)`). This method only exists on the global `document` object.',
        'Assuming the element always exists and directly chaining methods, like `document.getElementById("app").innerHTML = "..."`, which will throw an error if the "app" element isn\'t found.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> getElementById Method
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The <code className="text-primary-600 dark:text-primary-400">document.getElementById()</code> method is a classic and highly efficient way to find and return a single DOM element that has a specific `id` attribute. Because IDs must be unique within a document, this method provides a reliable and direct way to target a specific element for manipulation.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> `getElementById()` is one of the fastest DOM selection methods available. However, the more modern `querySelector('#yourId')` is often used for consistency, as it uses the same CSS selector engine as when selecting by classes or other attributes.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with getElementById</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        This method is straightforward: you provide a string matching the unique ID of the element you want. The key is to handle the result correctly, as the element may not always be present in the DOM.
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

export default JsGetElementById;