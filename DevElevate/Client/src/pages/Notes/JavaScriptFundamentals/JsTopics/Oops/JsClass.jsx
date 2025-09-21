import CodeBlock from "../../components/CodeBlock";

const JsClass = () => {
    const keyConcepts = [
        {
            title: 'The constructor() Method',
            description: 'A special method for creating and initializing an object instance of a class. It is called automatically when you use the `new` keyword. A class can only have one constructor.',
            code: `class User {
    // This method is called when we do 'new User()'
    constructor(name) {
        this.name = name; // 'this' refers to the new instance
        this.isLoggedIn = false;
    }
}`
        },
        {
            title: 'Instance Methods',
            description: 'Functions defined within a class that are available on every object instance created from that class. They operate on the data (properties) of the instance.',
            code: `class User {
    constructor(name) {
        this.name = name;
    }

    // 'greet' is an instance method
    greet() {
        return \`Hello, my name is \${this.name}.\`;
    }
}

const user1 = new User('Alice');
console.log(user1.greet()); // "Hello, my name is Alice."`
        },
        {
            title: 'The "this" Keyword',
            description: 'Inside a class method, the `this` keyword refers to the specific instance of the object that the method was called on. It gives you access to the properties and other methods of that instance.',
            code: `class Counter {
    constructor() {
        this.count = 0;
    }

    increment() {
        // 'this' refers to the instance of Counter
        this.count++;
        console.log(\`Current count: \${this.count}\`);
    }
}
const myCounter = new Counter();
myCounter.increment(); // 'this' inside increment is 'myCounter'`
        }
    ];

    const advancedFeatures = [
        {
            title: 'Inheritance with "extends" and "super()"',
            description: 'Classes can inherit properties and methods from other classes using the `extends` keyword. The `super()` keyword is used to call the constructor of the parent class to ensure properties are initialized correctly.',
            code: `// Parent Class
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(\`\${this.name} makes a noise.\`);
    }
}

// Child Class
class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Call the parent constructor
        this.breed = breed;
    }

    speak() {
        console.log(\`\${this.name} barks.\`);
    }
}

const myDog = new Dog('Rex', 'German Shepherd');
myDog.speak(); // "Rex barks."`
        },
        {
            title: 'Static Methods',
            description: 'Static methods are defined on the class itself, not on the instances. They are often used for utility functions related to the class. You call them directly on the class name.',
            code: `class MathHelper {
    // This is a static method
    static add(a, b) {
        return a + b;
    }
}

// You call it on the class, not an instance
const sum = MathHelper.add(5, 10);
console.log(sum); // 15

// const instance = new MathHelper();
// instance.add(2, 3); // This would cause a TypeError`
        },
        {
            title: 'Getters and Setters',
            description: 'Getters and setters allow you to define methods that look like properties when they are accessed. `get` computes and returns a value, while `set` updates a property based on a new value.',
            code: `class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getter for a computed property
    get fullName() {
        return \`\${this.firstName} \${this.lastName}\`;
    }

    // Setter to update properties from a full name
    set fullName(newName) {
        const [first, last] = newName.split(' ');
        this.firstName = first;
        this.lastName = last;
    }
}

const user = new User('John', 'Doe');
console.log(user.fullName); // "John Doe" (using the getter)

user.fullName = 'Jane Smith'; // (using the setter)
console.log(user.firstName); // "Jane"`
        }
    ];

    const bestPractices = [
        'Always use `PascalCase` for class names (e.g., `MyClass`, `UserProfile`) to distinguish them from regular functions and variables.',
        'Keep constructors focused on one thing: initializing the properties of the instance. Avoid placing complex application logic inside them.',
        'Use the `extends` keyword for clear "is-a" relationships (e.g., a `Car` is a `Vehicle`). For "has-a" relationships, prefer composition (passing an object in the constructor).',
        'Remember that classes are not hoisted. Always define the class before you attempt to create an instance of it.'
    ];

    const commonMistakes = [
        'Forgetting to call `super()` in the constructor of a child class before using `this`. This is a mandatory first step and will cause a `ReferenceError` if missed.',
        'Trying to call a static method from an instance of the class (e.g., `myInstance.staticMethod()`), or calling an instance method on the class itself (e.g., `MyClass.instanceMethod()`).',
        'Forgetting the `new` keyword when instantiating a class. `const user = User("test")` will result in a `TypeError`, it must be `const user = new User("test")`.',
        'Losing the `this` context when passing an instance method as a callback (e.g., `setTimeout(myInstance.myMethod, 1000)`). The method needs to be bound using `.bind(this)` or an arrow function.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Class
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Introduced in ES6, the <code className="text-primary-600 dark:text-primary-400">class</code> syntax is a modern way to create objects and manage inheritance in JavaScript. While it looks similar to classes in other object-oriented languages, it is primarily "syntactic sugar" over JavaScript's existing prototype-based inheritance, providing a much cleaner and more readable syntax.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> Unlike function declarations, class declarations are **not hoisted**. You must declare your class before you can access it, otherwise, your code will throw a `ReferenceError`.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Core Concepts of a Class</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        A class is a blueprint for creating objects. These are the fundamental building blocks every class uses to define the structure and behavior of its instances.
                    </p>
                    <div className="space-y-6">
                        {keyConcepts.map((concept, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{concept.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{concept.description}</p>
                                <CodeBlock code={concept.code} />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Advanced Features</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript classes also support powerful features like inheritance, static methods, and computed properties with getters and setters, enabling more complex object-oriented patterns.
                    </p>
                    <div className="space-y-6">
                        {advancedFeatures.map((feature, index) => (
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

export default JsClass;