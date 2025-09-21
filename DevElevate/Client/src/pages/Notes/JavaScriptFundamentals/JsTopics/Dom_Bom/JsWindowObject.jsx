import CodeBlock from "../../components/CodeBlock";

const JsWindowObject = () => {
    const examples = [
        {
            title: 'Accessing and Modifying Document Content',
            code: `// Get element by ID and modify its content
document.getElementById('header').textContent = 'Welcome to our site!';

// Change multiple elements with the same class
const buttons = document.getElementsByClassName('btn');
Array.from(buttons).forEach(btn => {
    btn.style.backgroundColor = '#4CAF50';
});

// Create and append new elements
const newElement = document.createElement('div');
newElement.textContent = 'This is a new element';
document.body.appendChild(newElement);`,
            explanation: 'The `document` object, which is a property of the `window` object, allows you to access and modify the content of the current web page. You can select elements using methods like `getElementById()`, `getElementsByClassName()`, or `querySelector()`, and then modify their properties.'
        },
        {
            title: 'Window Location and Navigation',
            code: `// Get current URL information
console.log('Current URL:', window.location.href);
console.log('Hostname:', window.location.hostname);
console.log('Path:', window.location.pathname);

// Navigation methods
function goToHome() {
    window.location.href = '/home';
}

// Reload the current page
function refreshPage() {
    window.location.reload();
}

// Redirect after a delay
setTimeout(() => {
    window.location.href = 'https://example.com';
}, 3000);`,
            explanation: 'The `window.location` object provides information about the current URL and methods to navigate to different pages. You can use it to get URL components, redirect users, or reload the current page.'
        },
        {
            title: 'Dialog Boxes and User Interaction',
            code: `// Alert dialog
window.alert('This is an alert message');

// Confirmation dialog
const isConfirmed = window.confirm('Are you sure you want to delete this item?');
if (isConfirmed) {
    // Proceed with deletion
    console.log('Item deleted');
}

// Prompt for user input
const userName = window.prompt('Please enter your name:', 'Guest');
console.log('User name:', userName);`,
            explanation: 'The window object provides several methods for displaying dialog boxes. `alert()` shows a message, `confirm()` asks for confirmation and returns a boolean, and `prompt()` asks for text input. These are useful for simple user interactions.'
        },
        {
            title: 'Timing and Scheduling',
            code: `// Execute code once after a delay
const timeoutId = setTimeout(() => {
    console.log('This runs after 2 seconds');
}, 2000);

// Execute code repeatedly at intervals
let counter = 0;
const intervalId = setInterval(() => {
    console.log(\`Count: \${++counter}\`);
    if (counter >= 5) {
        clearInterval(intervalId); // Stop the interval
    }
}, 1000);

// Clear a timeout if needed
// clearTimeout(timeoutId);`,
            explanation: 'The `setTimeout()` method executes a function once after a specified delay, while `setInterval()` executes a function repeatedly at specified intervals. Both return an ID that can be used to cancel the execution using `clearTimeout()` or `clearInterval()`.'
        },
        {
            title: 'Window Size and Scrolling',
            code: `// Get viewport dimensions
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
console.log(\`Viewport: \${viewportWidth}x\${viewportHeight}\`);

// Scroll to specific position
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll to element
document.querySelector('#section2').scrollIntoView({ behavior: 'smooth' });

// Listen for scroll events
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    console.log('Current scroll position:', scrollPosition);
});`,
            explanation: 'The window object provides properties and methods to work with the viewport and scrolling. You can get the viewport dimensions, scroll to specific positions, and listen for scroll events to create dynamic scrolling effects.'
        }
    ];

    const bestPractices = [
        'Use `window.requestAnimationFrame()` for smooth animations instead of `setTimeout` or `setInterval`',
        'Always clear intervals and timeouts when they are no longer needed to prevent memory leaks',
        'Be cautious with global variables as they become properties of the window object',
        'Use `window.scrollTo()` with the `behavior: smooth` option for better user experience',
        'Consider using the `ResizeObserver` API instead of the `resize` event for better performance',
        'Use `window.localStorage` and `window.sessionStorage` for client-side storage when appropriate'
    ];

    const commonMistakes = [
        'Using `window.alert()` in production code (can be blocked by browsers and provides poor UX)',
        'Forgetting to clear intervals, leading to memory leaks',
        'Assuming `window` is always available (can cause issues in server-side rendering)',
        'Using `window.innerWidth` without debouncing in resize event listeners',
        'Not checking if a feature is supported before using it (e.g., `if (window.localStorage)`)',
        'Overusing global variables that pollute the global namespace'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Window Object
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The JavaScript <code className="text-primary-600 dark:text-primary-400">window</code> object is the global object in a browser environment, representing the browser window or tab. It provides access to the browser's window properties and methods, as well as the Document Object Model (DOM) through the <code className="text-primary-600 dark:text-primary-400">document</code> property. The window object is at the top of the scope chain, making its properties and methods globally available.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> In browser JavaScript, the <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">window</code> object is the global object, which means that global variables and functions become properties and methods of the window object. For example, <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">var x = 10;</code> is the same as <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">window.x = 10;</code>
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with the Window Object</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The window object provides a wide range of properties and methods for interacting with the browser window, including document manipulation, navigation, timing functions, and more. Here are some common use cases and examples.
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

                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-md shadow-sm border border-blue-200 dark:border-blue-800/50">
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Performance Considerations</h3>
                    <ul className="list-disc pl-6 space-y-2 text-blue-700 dark:text-blue-200">
                        <li>Be cautious with scroll and resize event listeners as they can fire many times per second</li>
                        <li>Use debouncing or throttling for performance-intensive operations in event handlers</li>
                        <li>Prefer `document` methods over `window` methods when possible for better performance</li>
                        <li>Use `window.requestIdleCallback()` for non-essential background tasks</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default JsWindowObject;
