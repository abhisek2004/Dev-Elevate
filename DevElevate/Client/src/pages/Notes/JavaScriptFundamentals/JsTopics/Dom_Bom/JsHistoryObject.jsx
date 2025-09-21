import CodeBlock from "../../components/CodeBlock";

const JsHistoryObject = () => {
    const examples = [
        {
            title: 'Using pushState()',
            code: `// Add a new entry to browser history and change URL without reloading
const state = { page: 'about' };
const title = 'About Page';
const url = '/about';

history.pushState(state, title, url);
console.log('New history entry added');`,
            explanation: 'The `pushState()` method adds a new entry to the browser\'s history stack. It takes three parameters: a state object, a title (currently ignored by most browsers), and a URL (optional). This is particularly useful for single-page applications to update the URL without a full page reload.'
        },
        {
            title: 'Using replaceState()',
            code: `// Replace the current history entry
const state = { login: 'success' };
const title = 'Login Success';
const url = '/dashboard';

history.replaceState(state, title, url);
console.log('Current history entry replaced');`,
            explanation: 'The `replaceState()` method modifies the current history entry instead of creating a new one. This is particularly useful for scenarios like login redirects or when you want to update the URL without creating additional history entries that would require users to click back multiple times.'
        },
        {
            title: 'Navigation Methods',
            code: `// Go back one page in history
// history.back();

// Go forward one page in history
// history.forward();

// Go to a specific page in history
// history.go(-2); // Go back 2 pages
// history.go(1);  // Go forward 1 page

// Get number of history entries
console.log('History length:', history.length);`,
            explanation: 'The history object provides methods to programmatically navigate through the user\'s browsing history. The `back()` and `forward()` methods move one step in either direction, while `go()` can move multiple steps at once. The `length` property returns the number of entries in the session history.'
        },
        {
            title: 'Listening to Navigation Events',
            code: `// Listen for popstate event (triggered by back/forward buttons)
window.addEventListener('popstate', (event) => {
    console.log('Location changed to:', document.location.pathname);
    console.log('State:', event.state);
    
    // Update your UI based on the new state
    if (event.state) {
        // Handle the state change
        console.log('Page:', event.state.page);
    }
});

// Example of state management with pushState
const state = { page: 'profile', userId: 42 };
history.pushState(state, '', '/profile/42');`,
            explanation: 'The `popstate` event is crucial for handling browser navigation. It fires when the active history entry changes, either through the back/forward buttons or programmatic navigation. The event object contains the state object associated with the history entry, allowing you to restore the application state.'
        }
    ];

    const bestPractices = [
        'Always provide meaningful state objects with `pushState()` for better debugging and state management',
        'Update the page content when `popstate` events occur to maintain UI consistency',
        'Use `replaceState()` for redirects or login/logout flows to prevent cluttering the history',
        'Check browser support before using history API features with feature detection',
        'Keep state objects small and serializable for better performance',
        'Handle cases when users directly enter a URL with a specific state or use bookmarks',
        'Use the `history.state` property to access the current state without waiting for events'
    ];

    const commonMistakes = [
        'Forgetting to handle the `popstate` event when using `pushState`, breaking the back/forward buttons',
        'Using `pushState` with a different origin (violates same-origin policy)',
        'Storing sensitive data in the state object (visible in browser dev tools)',
        'Assuming the state object is always available (it might be null)',
        'Not updating the UI when the URL changes programmatically',
        'Creating too many history entries without proper state management',
        'Forgetting to handle the initial page load state'
    ];

    const performanceConsiderations = [
        'Be mindful of the history stack size in single-page applications',
        'Avoid storing large objects in the history state',
        'Consider using URL parameters for simple state that should be shareable',
        'Use `replaceState` instead of `pushState` when you don\'t want to create a new history entry',
        'Implement proper cleanup of event listeners when components unmount'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> History Object
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The JavaScript <code className="text-primary-600 dark:text-primary-400">history</code> object is a powerful API that provides access to the browser's session history. It enables developers to manipulate the browser history and change the current URL without reloading the page, which is essential for creating smooth single-page applications (SPAs) and improving the user experience.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> The History API is part of the HTML5 specification and is supported in all modern browsers. However, for older browsers, you might need to use a polyfill or fallback to traditional navigation methods. The state object can store up to 2MB of data, but it's recommended to keep it small for better performance.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with the History Object</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The history object provides methods and properties for interacting with the browser's session history. Here are some common use cases and examples that demonstrate how to work with the History API effectively.
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
                        {performanceConsiderations.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default JsHistoryObject;
