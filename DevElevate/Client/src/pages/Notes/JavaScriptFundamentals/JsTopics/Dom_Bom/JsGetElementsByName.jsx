import CodeBlock from "../../components/CodeBlock";

const JsGetElementsByName = () => {
    const examples = [
        {
            title: 'Working with Radio Buttons',
            code: `// HTML:
// <input type="radio" name="color" value="red"> Red
// <input type="radio" name="color" value="green" checked> Green
// <input type="radio" name="color" value="blue"> Blue

function getSelectedColor() {
    const colorRadios = document.getElementsByName('color');
    for (const radio of colorRadios) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null; // No color selected
}

console.log('Selected color:', getSelectedColor()); // Logs: "green"`,
            explanation: 'The primary use case for this method is to manage groups of radio buttons. Since all radio buttons in a group share the same `name`, this is the perfect way to select them and find which one is checked.'
        },
        {
            title: 'Collecting Values from Checkboxes',
            code: `// HTML:
// <input type="checkbox" name="interest" value="music" checked> Music
// <input type="checkbox" name="interest" value="sports"> Sports
// <input type="checkbox" name="interest" value="art" checked> Art

const interests = document.getElementsByName('interest');
const selectedInterests = [];

interests.forEach(checkbox => {
    if (checkbox.checked) {
        selectedInterests.push(checkbox.value);
    }
});

console.log('Selected interests:', selectedInterests); // Logs: ["music", "art"]`,
            explanation: 'Similar to radio buttons, `getElementsByName` is ideal for working with a group of related checkboxes to gather the values of all checked items.'
        },
        {
            title: 'Demonstrating the "Live" NodeList',
            code: `// HTML: <form id="myForm"><input name="user"></form>

const userInputs = document.getElementsByName('user');
console.log('Initial count:', userInputs.length); // Logs: 1

// Add a new input with the same name
const myForm = document.getElementById('myForm');
const newInput = document.createElement('input');
newInput.name = 'user';
myForm.append(newInput);

console.log('Count after adding new element:', userInputs.length); // Logs: 2`,
            explanation: 'The returned `NodeList` is "live," meaning it automatically updates if the DOM changes. The `userInputs` variable reflects the newly added input without needing to query the DOM again.'
        }
    ];

    const bestPractices = [
        'Use `getElementsByName` primarily for its intended purpose: accessing form controls like radio buttons and checkboxes, where the `name` attribute defines functional groups.',
        'Use the `forEach` method to iterate over the returned `NodeList`, as it is supported in all modern browsers and is cleaner than a traditional `for` loop.',
        'If you need a static, unchanging list of elements, convert the live `NodeList` into a standard array using `Array.from(elements)` or `[...elements]`.',
        'For selecting non-form elements by their `name` attribute, prefer `querySelectorAll(\'[name="someName"]\')` for consistency with other attribute-based selections.'
    ];

    const commonMistakes = [
        'Forgetting that the `name` attribute is case-sensitive. `getElementsByName("email")` will not find an element with `name="Email"`.',
        'Trying to get a single value directly from the result (e.g., `document.getElementsByName("color").value`). You must iterate the collection to find the specific checked element.',
        'Not realizing the collection is "live," which can cause infinite loops if you modify elements in a way that changes the collection\'s length during iteration.',
        'Confusing the purpose of `name` with `id`. An `id` must be unique in the document, while many elements can share the same `name`.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> getElementsByName Method
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The <code className="text-primary-600 dark:text-primary-400">document.getElementsByName()</code> method is specifically designed to select a group of elements based on their shared `name` attribute. Its most common and powerful use is for managing form controls, especially radio buttons and checkboxes that function together as a group.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> This method returns a **live NodeList**, which is an array-like object that automatically updates if elements with that name are added or removed from the document. Unlike the `HTMLCollection` returned by some older methods, a modern `NodeList` conveniently includes the `forEach` method for easy iteration.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with getElementsByName</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        This method shines when dealing with form element groups. The following examples show how to effectively handle radio buttons and checkboxes, and demonstrate the "live" nature of the returned collection.
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

export default JsGetElementsByName;