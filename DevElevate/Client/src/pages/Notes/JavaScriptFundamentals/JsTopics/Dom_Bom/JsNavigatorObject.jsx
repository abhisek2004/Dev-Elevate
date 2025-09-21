import CodeBlock from "../../components/CodeBlock";

const JsNavigatorObject = () => {
    const examples = [
        {
            title: 'Checking User Agent (with caution)',
            code: `// Get the user agent string
const userAgent = navigator.userAgent;
console.log(userAgent);

// A simple (but not recommended) check for a browser
if (userAgent.includes('Firefox')) {
    console.log('You might be using Firefox.');
} else {
    console.log('You are using a different browser.');
}`,
            explanation: 'The `userAgent` property provides a string identifying the browser. However, parsing it is unreliable and discouraged. It\'s better to detect specific features rather than sniffing the user agent.'
        },
        {
            title: 'Detecting Online Status',
            code: `// Check initial online status
if (navigator.onLine) {
    console.log('You are online!');
} else {
    console.log('You are offline.');
}

// Listen for status changes
window.addEventListener('online', () => console.log('Connection restored.'));
window.addEventListener('offline', () => console.log('Connection lost.'));`,
            explanation: 'The `onLine` property provides a simple boolean for network connectivity. Paired with the `online` and `offline` events, it\'s powerful for creating offline-first experiences in web apps.'
        },
        {
            title: 'Using the Geolocation API',
            code: `if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(\`Your location is: \${lat}, \${lon}\`);
        },
        (error) => {
            console.error('Error getting location:', error.message);
        }
    );
} else {
    console.log('Geolocation is not supported by this browser.');
}`,
            explanation: 'The `geolocation` object allows web apps to access a user\'s location, after they grant permission. This is essential for location-aware features like maps or local recommendations.'
        },
        {
            title: 'Using the Clipboard API',
            code: `async function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        console.log('Clipboard API not available');
        return;
    }
    try {
        await navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard successfully!');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

copyTextToClipboard('Hello, Clipboard!');`,
            explanation: 'The modern Clipboard API provides a secure and easy way to interact with the system clipboard. The `writeText()` method allows for programmatically copying text.'
        }
    ];

    const bestPractices = [
        'Prefer feature detection over user agent sniffing. For example, check `if (\'geolocation\' in navigator)` instead of parsing `navigator.userAgent`.',
        'Always request user permissions gracefully and provide context for why you need access to APIs like Geolocation or Notifications.',
        'Use the `online` and `offline` events to enhance user experience by handling network status changes.',
        'Check for the existence of an API on the navigator object before attempting to use it, ensuring your code doesn\'t break in older browsers.',
        'Be mindful of user privacy. Only request information that is essential for your application\'s functionality.'
    ];

    const commonMistakes = [
        'Relying on `navigator.userAgent` for critical logic, as this string can be easily spoofed and is unreliable.',
        'Forgetting to handle error cases or permission denial for sensitive APIs like Geolocation.',
        'Assuming `navigator.onLine` guarantees internet access. It only confirms a network connection, not access to the wider internet.',
        'Not providing fallback content or functionality for users whose browsers do not support a specific Navigator API.',
        'Using deprecated properties like `navigator.platform` or `navigator.appVersion` for feature detection.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Navigator Object
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The JavaScript <code className="text-primary-600 dark:text-primary-400">navigator</code> object is part of the <code className="text-primary-600 dark:text-primary-400">window</code> object and acts as a gateway to information about the browser and the device. It provides access to a variety of modern web APIs, allowing developers to query the browser's state and capabilities, such as online status, geolocation, and clipboard access.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> Many properties of the Navigator object are being deprecated in favor of more reliable feature detection methods. Always prioritize checking for the existence of a feature (e.g., `'clipboard' in navigator`) over parsing the `userAgent` string.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with the Navigator Object</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The navigator object contains a rich set of properties and methods. Below are practical examples demonstrating how to use some of its most important and modern APIs to build interactive and context-aware web applications.
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

export default JsNavigatorObject;