import CodeBlock from '../../components/CodeBlock';

const SwitchCase = () => {
    const examples = [
        {
            title: 'Basic Switch Case',
            code: `let day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = 'Sunday';
    break;
  case 2:
    dayName = 'Monday';
    break;
  case 3:
    dayName = 'Tuesday';
    break;
  case 4:
    dayName = 'Wednesday';
    break;
  case 5:
    dayName = 'Thursday';
    break;
  case 6:
    dayName = 'Friday';
    break;
  case 7:
    dayName = 'Saturday';
    break;
  default:
    dayName = 'Invalid day';
}

console.log(dayName); // Output: Tuesday`,
            explanation: 'A basic switch statement that assigns a day name based on a numeric day value.'
        },
        {
            title: 'Multiple Cases with Same Code',
            code: `let fruit = 'apple';
let message;

switch (fruit) {
  case 'apple':
  case 'banana':
  case 'orange':
    message = 'This is a common fruit';
    break;
  case 'dragonfruit':
  case 'kiwano':
    message = 'This is an exotic fruit';
    break;
  default:
    message = 'Unknown fruit';
}

console.log(message);`,
            explanation: 'Multiple cases can be grouped together to execute the same block of code.'
        },
        {
            title: 'Type Coercion in Switch',
            code: `let value = '1';

switch (value) {
  case 1:
    console.log('Number 1');
    break;
  case '1':
    console.log('String "1"'); // This will execute
    break;
  default:
    console.log('Something else');
}

// Using strict equality (===) in switch cases`,
            explanation: 'Switch uses strict comparison (===), so type matters when matching cases.'
        }
    ];

    const bestPractices = [
        'Always include a default case to handle unexpected values',
        'Use break statements to prevent fall-through behavior unless intentional',
        'Group related cases together for better readability',
        'Consider using an object lookup for large switch statements',
        'Keep the switch statement simple - extract complex logic into separate functions'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Switch</span> Statement
            </h1>

            <div className="space-y-8">
                <section className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300">
                        The "switch" statement in JavaScript is a control structure that allows you to execute different code blocks based on the value of an expression. It's particularly useful when you have multiple conditions to check against a single value, making it a cleaner alternative to long if-else chains.
                    </p>

                    <div className="mt-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                        <p className="text-primary-500 dark:text-primary-400">
                            <strong className="font-semibold">Note: </strong> The switch statement uses strict equality (===) for comparisons, so the type of the expression must match the case values.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-8 mb-4">Basic Syntax</h2>

                    <CodeBlock code={`switch (expression) {
  case value1:
    // code to execute if expression === value1
    break;
  case value2:
    // code to execute if expression === value2
    break;
  // ... more cases ...
  default:
    // code to execute if no cases match
}`} />
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Examples</h2>
                    <div className="space-y-8">
                        {examples.map((example, index) => (
                            <div key={index} className="bg-white dark:bg-transparent p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
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
                            <li key={index}>{practice}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">When to Use Switch Statement</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Switch statements are most effective when you have a single expression that needs to be compared against multiple possible values. They are particularly useful when you have more than three conditions to check, as they can be more readable than long if-else chains. However, for complex conditions or when you need to check different variables, if-else statements might be more appropriate.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SwitchCase;
