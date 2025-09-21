import CodeBlock from "../../components/CodeBlock";

const JsConstructor = () => {
    const constructorTypes = [
        {
            title: 'Constructor Functions (Pre-ES6)',
            description: 'This is the traditional way of creating object blueprints in JavaScript. By convention, the function name is capitalized to signal that it should be used with the `new` keyword to create instances.',
            code: `function Car(make, model) {
    // 'this' refers to the new empty object created by 'new'
    this.make = make;
    this.model = model;
    
    // It's better to add methods to the prototype (see Best Practices)
    this.display = function() {
        return \`\${this.make} \${this.model}\`;
    }
}

const myCar = new Car('Honda', 'Civic');
console.log(myCar.display());`
        },
        {
            title: 'The `class` Constructor (ES6+)',
            description: 'The modern `class` syntax provides a clearer, more organized way to define a constructor. The `constructor` is a special method inside a class. This syntax is essentially "syntactic sugar" over the traditional constructor function and prototype model.',
            code: `class Vehicle {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    // Methods are automatically placed on the prototype
    display() {
        return \`\${this.make} \${this.model}\`;
    }
}

const myVehicle = new Vehicle('Ford', 'Mustang');
console.log(myVehicle.display());`
        }
    ];

    const newKeywordSteps = [
        {
            title: '1. A New Empty Object is Created',
            description: 'The first step is the creation of a brand new, plain JavaScript object.',
            code: `const newObject = {};`
        },
        {
            title: '2. The Prototype is Linked',
            description: 'The new object\'s internal `[[Prototype]]` property is set to the constructor function\'s `prototype` object. This is how the new instance inherits methods.',
            code: `Object.setPrototypeOf(newObject, Constructor.prototype);`
        },
        {
            title: '3. The Constructor is Called with `this`',
            description: 'The constructor function is executed with its `this` keyword bound to the newly created object. This is where properties are assigned.',
            code: `Constructor.apply(newObject, arguments);`
        },
        {
            title: '4. The New Object is Returned',
            description: 'Finally, the newly created and initialized object is returned, unless the constructor explicitly returns a different object.',
            code: `return newObject;`
        }
    ];

    const bestPractices = [
        'Always capitalize the name of a constructor function (e.g., `MyClass`, `UserAccount`) to clearly indicate that it is intended to be used with the `new` keyword.',
        'Define shared methods on the prototype when using constructor functions. This is more memory-efficient as all instances will share a single copy of the method, rather than each instance having its own copy.',
        'Keep constructors focused on initializing properties. They should set up the initial state of an object. Avoid placing complex application logic, API calls, or heavy computations within the constructor.',
        'Use ES6 default parameters in your constructor to make object creation more flexible and prevent errors from missing arguments.'
    ];

    const commonMistakes = [
        'Forgetting the `new` keyword. Calling a constructor function without `new` executes it as a regular function. In non-strict mode, `this` will refer to the global object (`window`), leading to accidental creation of global variables and unpredictable bugs.',
        'Using arrow functions as constructors. Arrow functions do not have their own `this` context and cannot be used as constructors. Attempting to call an arrow function with `new` will result in a `TypeError`.',
        'Adding methods inside the constructor function. While this works, it\'s inefficient. Each object instance gets its own separate copy of the function, consuming more memory. Methods should be placed on the prototype.',
        'Explicitly returning a primitive value. If a constructor `return`s a string, number, or boolean, this return value is ignored, and the newly created object (`this`) is returned as normal.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Constructor
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    A <strong>constructor</strong> is a special function that creates and initializes an object instance. In JavaScript, it acts as a blueprint, allowing you to generate multiple objects that share the same initial structure and behavior. It is invoked using the <code className="text-primary-600 dark:text-primary-400">new</code> keyword, which automates the object creation process.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Under the Hood:</strong> The `new` keyword is more than just a function call. It triggers a four-step process: creating a new empty object, linking it to a prototype, calling the constructor with `this` bound to the new object, and returning the object.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Types of Constructors</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript has two main syntaxes for defining constructors, representing its evolution from a prototype-based language to one with a more familiar class-based syntax.
                    </p>
                    <div className="space-y-6">
                        {constructorTypes.map((concept, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{concept.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{concept.description}</p>
                                <CodeBlock code={concept.code} />
                            </div>
                        ))}
                    </div>
                </section>
                
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What the `new` Keyword Does</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The magic of object instantiation happens in four automated steps when you use the `new` keyword.
                    </p>
                    <div className="space-y-6">
                        {newKeywordSteps.map((feature, index) => (
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

export default JsConstructor;