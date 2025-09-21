import CodeBlock from "../../components/CodeBlock";

const JsObjects = () => {
    const creationMethods = [
        {
            title: 'Object Literal',
            description: 'The simplest and most common way to create an object. It\'s a comma-separated list of key-value pairs enclosed in curly braces `{}`.',
            code: `const person = {
    name: 'Alice',
    age: 30,
    isAdmin: true
};`
        },
        {
            title: 'Constructor Function',
            description: 'A traditional way to create a blueprint for objects. It\'s a function that uses the `this` keyword to assign properties and is instantiated with the `new` keyword.',
            code: `function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

const myCar = new Car('Toyota', 'Camry', 2021);`
        },
        {
            title: 'Object.create()',
            description: 'A method that creates a new object, using an existing object as the prototype of the newly created object. This is useful for controlling the inheritance chain.',
            code: `const animal = {
    isAlive: true,
    breathe: function() {
        console.log('Breathing...');
    }
};

const dog = Object.create(animal);
dog.breed = 'Golden Retriever';

dog.breathe(); // Inherited from 'animal'`
        }
    ];

    const propertyManagement = [
        {
            title: 'Accessing Properties: Dot vs. Bracket Notation',
            description: 'Dot notation is cleaner and used for valid identifier keys. Bracket notation is required for keys with spaces, special characters, or when the key name is stored in a variable.',
            code: `const user = {
    name: 'Bob',
    'home-address': '123 Main St'
};

// Dot notation
console.log(user.name); // "Bob"

// Bracket notation (for special characters)
console.log(user['home-address']); // "123 Main St"

// Bracket notation (with a variable)
const key = 'name';
console.log(user[key]); // "Bob"`
        },
        {
            title: 'Adding and Updating Properties',
            description: 'You can add new properties or update existing ones at any time using simple assignment with either dot or bracket notation.',
            code: `const config = {
    theme: 'dark'
};

// Add a new property
config.fontSize = 16;

// Update an existing property
config.theme = 'light';`
        },
        {
            title: 'Deleting Properties',
            description: 'The `delete` operator completely removes a property (the key and its value) from an object.',
            code: `const product = {
    id: 101,
    name: 'Laptop',
    inStock: true
};

delete product.inStock;
console.log(product); // { id: 101, name: 'Laptop' }`
        },
        {
            title: 'Checking for Property Existence',
            description: 'The `in` operator checks if a property exists on an object or its prototype chain. The `.hasOwnProperty()` method only checks the object\'s own properties.',
            code: `const obj = { a: 1 };

console.log('a' in obj);           // true (own property)
console.log('toString' in obj);  // true (inherited from prototype)

console.log(obj.hasOwnProperty('a'));          // true
console.log(obj.hasOwnProperty('toString')); // false`
        }
    ];

    const advancedConcepts = [
        {
            title: 'Object Iteration',
            description: 'There are several ways to loop over an object\'s properties. Modern methods like `Object.keys()`, `Object.values()`, and `Object.entries()` are generally preferred over the older `for...in` loop.',
            code: `const user = { name: 'Charlie', role: 'admin' };

// Get an array of keys
Object.keys(user).forEach(key => {
    console.log(\`\${key}: \${user[key]}\`);
});

// Get an array of [key, value] pairs
for (const [key, value] of Object.entries(user)) {
    console.log(\`\${key} -> \${value}\`);
}`
        },
        {
            title: 'Object Methods and "this"',
            description: 'Functions stored as properties on an object are called methods. Inside a method, the `this` keyword refers to the object the method was called on, allowing you to access its other properties.',
            code: `const person = {
    name: "Diana",
    greet: function() {
        // 'this' refers to the 'person' object
        return \`Hello, my name is \${this.name}.\`;
    }
};

console.log(person.greet()); // "Hello, my name is Diana."`
        }
    ];

    const bestPractices = [
        'Prefer the **object literal syntax `{}`** for creating objects unless you need a blueprint for multiple instances, in which case a `class` is better.',
        'Use `const` to declare objects. This prevents reassignment of the variable, though the object\'s properties can still be modified.',
        'Use **dot notation** by default for its readability. Switch to bracket notation only when necessary (e.g., dynamic keys from variables or keys with special characters).',
        'When iterating, use **`Object.keys()`**, **`Object.values()`**, or **`Object.entries()`** to avoid accidentally including properties from the object\'s prototype chain, which can happen with a `for...in` loop.'
    ];

    const commonMistakes = [
        '**Assuming `const` makes an object immutable.** `const` only protects the variable assignment, not the object\'s properties. You can still add, update, and delete properties on a `const` object.',
        '**Objects are passed by reference, not value.** If you pass an object to a function and modify it inside the function, you are modifying the original object.',
        '**Incorrectly using `this`.** The context of `this` can change depending on how a method is called. Passing an object method as a callback (e.g., to `setTimeout`) can detach it from its object.',
        '**Using dot notation for invalid keys.** Trying to access a key with a hyphen like `obj.my-key` will cause a syntax error. It must be accessed with bracket notation: `obj[\'my-key\']`.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Object
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    In JavaScript, an object is a fundamental, non-primitive data type that acts as a dynamic collection of key-value pairs (called properties). Nearly everything in JavaScript is an object or behaves like one, making a deep understanding of them essential for mastering the language. They are used to group related data and functionality together.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong> Objects are **passed by reference**, not by value. When you assign an object to another variable or pass it to a function, you are working with a reference to the original object, not a copy. Any changes will affect the original object.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Ways to Create Objects</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript provides several flexible ways to create objects, each suited for different scenarios, from simple data structures to complex instances from a blueprint.
                    </p>
                    <div className="space-y-6">
                        {creationMethods.map((concept, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{concept.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{concept.description}</p>
                                <CodeBlock code={concept.code} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Managing Properties</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Once an object is created, you can dynamically access, add, update, or remove its properties, making objects highly flexible data structures.
                    </p>
                    <div className="space-y-6">
                        {propertyManagement.map((feature, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{feature.description}</p>
                                <CodeBlock code={feature.code} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Advanced Concepts</h2>
                     <div className="space-y-6">
                        {advancedConcepts.map((feature, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{feature.description}</p>
                                <CodeBlock code={feature.code} />
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

export default JsObjects;