import CodeBlock from "../../components/CodeBlock";

const JsScreenObject = () => {
    const examples = [
        {
            title: 'Getting Total Screen Resolution',
            code: `// Get the total width and height of the user's screen
const screenWidth = screen.width;
const screenHeight = screen.height;

console.log(\`Total screen resolution: \${screenWidth}x\${screenHeight}\`);`,
            explanation: 'The `width` and `height` properties return the total size of the user\'s entire screen in pixels. This is useful for analytics or making high-level decisions about device capabilities.'
        },
        {
            title: 'Getting Available Screen Space',
            code: `// Get the available screen space, excluding system UI like taskbars
const availableWidth = screen.availWidth;
const availableHeight = screen.availHeight;

console.log(\`Available screen space: \${availableWidth}x\${availableHeight}\`);`,
            explanation: 'The `availWidth` and `availHeight` properties are crucial for tasks like positioning new popup windows, as they tell you the actual space available for application windows.'
        },
        {
            title: 'Checking Color & Pixel Depth',
            code: `// Get the color depth and pixel depth of the screen
const colorDepth = screen.colorDepth;
const pixelDepth = screen.pixelDepth;

console.log(\`Color Depth: \${colorDepth}-bit\`);
console.log(\`Pixel Depth: \${pixelDepth}-bit\`);`,
            explanation: '`colorDepth` and `pixelDepth` provide information about the screen\'s color capabilities. While often the same value on modern devices, they can be used to conditionally load different image assets.'
        },
        {
            title: 'Detecting Screen Orientation',
            code: `// Get the current screen orientation
console.log(\`Current orientation: \${screen.orientation.type}\`);

// Listen for changes in orientation
screen.orientation.addEventListener('change', () => {
    console.log(\`New orientation: \${screen.orientation.type}\`);
    // You could trigger a UI update here
});`,
            explanation: 'The Screen Orientation API is a modern feature that allows you to detect whether a device is in portrait or landscape mode and react when the user rotates their device.'
        }
    ];

    const bestPractices = [
        'Use CSS Media Queries as your primary tool for creating responsive layouts. The `screen` object is for supplemental JavaScript logic, not for styling.',
        'Use `screen.availWidth` and `screen.availHeight` when programmatically opening new windows to ensure they don\'t appear underneath system toolbars.',
        'Combine `screen.width` with `window.devicePixelRatio` for a more accurate understanding of the device\'s display capabilities, especially on high-DPI (Retina) screens.',
        'Leverage the Screen Orientation API to provide enhanced user experiences on mobile devices, such as adjusting video player controls or re-flowing complex UIs.',
        'Use screen information for analytics to better understand the devices your audience uses.'
    ];

    const commonMistakes = [
        'Confusing `screen.width` with `window.innerWidth`. `screen.width` is the entire monitor\'s width, while `window.innerWidth` is the browser\'s viewport width.',
        'Using `screen` properties to determine the layout of your page. This is an anti-pattern; CSS is the correct tool for this job.',
        'Assuming the user\'s browser is maximized. The browser window can be any size, independent of the screen resolution.',
        'Forgetting that multi-monitor setups exist. The `screen` object properties typically only report the details of the primary monitor.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Screen Object
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    The JavaScript <code className="text-primary-600 dark:text-primary-400">screen</code> object contains information about the user's display screen. It's a property of the <code className="text-primary-600 dark:text-primary-400">window</code> object and provides details such as total resolution, available screen area, color depth, and orientation, independent of the current browser window size.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> The `screen` object describes the user's entire display, not the browser viewport. For responsive design and layout adjustments based on browser size, you should almost always use CSS Media Queries or the `window.innerWidth`/`innerHeight` properties.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with the Screen Object</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The screen object's properties give you a static snapshot of the user's display hardware. These examples show how to access key screen metrics and listen for dynamic changes like device rotation.
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

export default JsScreenObject;