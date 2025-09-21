import CodeBlock from "../../components/CodeBlock";

const JsStaticMethod = () => {
    const examples = [
        {
            title: 'Basic Static Utility Method',
            code: `class MathHelper {
    static PI = 3.14159;

    static add(a, b) {
        return a + b;
    }

    static multiply(a, b) {
        return a * b;
    }
}

// Call static methods directly on the class
console.log(MathHelper.add(5, 10)); // Output: 15
console.log(MathHelper.multiply(3, 4)); // Output: 12
console.log('Value of PI:', MathHelper.PI); // Output: Value of PI: 3.14159`,
            explanation: 'Static methods are defined using the `static` keyword and are called on the class itself, not on an instance. They are perfect for creating utility functions that are logically related to the class.'
        },
        {
            title: 'Static Factory Methods',
            code: `class User {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }

    // A regular instance method
    getInfo() {
        return \`Name: \${this.name}, Role: \${this.role}\`;
    }

    // A static factory method to create a guest user
    static createGuest() {
        return new User('Guest', 'guest');
    }

    // Another static factory for a specific user type
    static createAdmin(name) {
        return new User(name, 'admin');
    }
}

const guest = User.createGuest();
const admin = User.createAdmin('Alice');

console.log(guest.getInfo()); // Output: Name: Guest, Role: guest
console.log(admin.getInfo()); // Output: Name: Alice, Role: admin`,
            explanation: 'Factory methods are a popular use case for static methods. They provide a convenient way to create pre-configured instances of a class without directly using the constructor.'
        },
        {
            title: 'Understanding `this` in Static Methods',
            code: `class Car {
    static manufacturer = 'Generic Motors';

    static getManufacturer() {
        // 'this' inside a static method refers to the class itself (Car)
        return this.manufacturer;
    }
    
    // A static method can call another static method using 'this'
    static displayInfo() {
        return \`This car is made by \${this.getManufacturer()}\`;
    }
}

console.log(Car.displayInfo()); // Output: This car is made by Generic Motors

// This will fail because 'this' is not an instance
const myCar = new Car();
// console.log(myCar.getManufacturer()); // TypeError: myCar.getManufacturer is not a function`,
            explanation: 'Inside a static method, the `this` keyword refers to the class constructor, not an instance of the class. This allows you to access other static properties or call other static methods from within a static method.'
        }
    ];

    const bestPractices = [
        'Use static methods for pure utility functions that don\'t rely on the state of a specific object instance.',
        'Employ static "factory methods" to create and return pre-configured instances of your class, simplifying object creation.',
        'Group related helper functions as static methods within a class to create a logical namespace and avoid polluting the global scope.',
        'Use static properties to define constants or class-level configuration that is shared across all instances.'
    ];

    const commonMistakes = [
        'Attempting to call a static method from an instance of the class (e.g., `new MyClass().myStaticMethod()`). Static methods must be called on the class directly.',
        'Trying to access instance properties using `this` (e.g., `this.name`) inside a static method. `this` in a static context refers to the class constructor, not the instance.',
        'Confusing static methods with instance methods. If a method needs to know about the unique state of an object, it should be an instance method, not a static one.',
        'Overusing static methods, which can lead to procedural-style code rather than object-oriented design and can make testing more difficult.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Static Method
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    A <strong>static method</strong> is a function that belongs to a class itself, rather than to an instance of the class. You can call a static method without creating an object of the class. They are defined using the <code className="text-primary-600 dark:text-primary-400">static</code> keyword and are often used for creating utility functions or factory methods.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Concept: </strong> Static methods operate on the class level. They cannot access instance-specific data (like <code className="text-primary-600 dark:text-primary-400">this.name</code>) because they are not tied to any single instance.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Working with Static Methods</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Static methods provide a way to associate functions with a class, even when no instance has been created. Here are some common use cases and examples.
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

export default JsStaticMethod;