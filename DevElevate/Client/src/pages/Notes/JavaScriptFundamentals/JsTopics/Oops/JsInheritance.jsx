import CodeBlock from "../../components/CodeBlock";

const JsInheritance = () => {
    const examples = [
        {
            title: 'Prototypal Inheritance (Pre-ES6)',
            code: `// Parent constructor
function Animal(name) {
    this.name = name;
}

// Method on the parent's prototype
Animal.prototype.speak = function() {
    return \`\${this.name} makes a noise.\`;
}

// Child constructor
function Dog(name, breed) {
    // 1. Call the parent constructor to inherit properties
    Animal.call(this, name);
    this.breed = breed;
}

// 2. Set up the prototype chain
Dog.prototype = Object.create(Animal.prototype);

// 3. Reset the constructor property
Dog.prototype.constructor = Dog;

// Add a method to the child's prototype
Dog.prototype.bark = function() {
    return \`\${this.name} barks!\`;
}

const myDog = new Dog('Rex', 'German Shepherd');
console.log(myDog.speak()); // Inherited: Rex makes a noise.
console.log(myDog.bark());  // Own method: Rex barks!`,
            explanation: 'This is the traditional way to achieve inheritance in JavaScript. It involves manually calling the parent constructor, setting the child\'s prototype to an object created from the parent\'s prototype, and then resetting the child\'s constructor property.'
        },
        {
            title: 'Class-based Inheritance with `extends` (ES6+)',
            code: `// Parent class
class Vehicle {
    constructor(make) {
        this.make = make;
    }

    start() {
        return \`The \${this.make} has started.\`;
    }
}

// Child class inherits from Vehicle
class Car extends Vehicle {
    constructor(make, model) {
        // 'super' calls the parent constructor
        super(make); 
        this.model = model;
    }

    drive() {
        return \`The \${this.make} \${this.model} is driving.\`;
    }
}

const myCar = new Car('Toyota', 'Corolla');
console.log(myCar.start()); // Inherited: The Toyota has started.
console.log(myCar.drive()); // Own method: The Toyota Corolla is driving.`,
            explanation: 'The ES6 `class` syntax provides a much cleaner and more intuitive way to handle inheritance using the `extends` and `super` keywords. This is syntactic sugar over the underlying prototypal inheritance model.'
        },
        {
            title: 'Method Overriding & `super`',
            code: `class Person {
    constructor(name) {
        this.name = name;
    }

    introduce() {
        return \`Hello, my name is \${this.name}.\`;
    }
}

class Employee extends Person {
    constructor(name, title) {
        super(name);
        this.title = title;
    }

    // This method overrides the parent's introduce() method
    introduce() {
        // 'super.introduce()' calls the parent's method
        const basicIntro = super.introduce();
        return \`\${basicIntro} I work as a \${this.title}.\`;
    }
}

const employee = new Employee('Jane Doe', 'Software Engineer');
console.log(employee.introduce()); 
// Output: Hello, my name is Jane Doe. I work as a Software Engineer.`,
            explanation: 'A child class can provide its own specific implementation of a method that is already provided by its parent class. The `super` keyword can be used to call the parent class\'s version of the method from within the child class.'
        }
    ];

    const bestPractices = [
        'Prefer ES6 `class` and `extends` syntax for its superior readability and conciseness compared to the older prototypal pattern.',
        'Always call `super()` in the subclass constructor before using the `this` keyword to avoid reference errors.',
        'Use inheritance to model an "is-a" relationship (e.g., a `Manager` is an `Employee`). For "has-a" relationships (e.g., a `Car` has an `Engine`), prefer composition.',
        'Keep inheritance chains shallow. Deeply nested inheritance hierarchies can become complex and difficult to reason about and maintain.'
    ];

    const commonMistakes = [
        'In ES6 classes, accessing `this` in a subclass constructor before `super()` has been called.',
        'Forgetting to call the parent constructor (e.g., `Animal.call(this, ...)` or `super(...)`), which results in parent properties not being initialized on the instance.',
        'In the pre-ES6 pattern, incorrectly setting the prototype, such as `Dog.prototype = new Animal()`, which can create unintended side effects.',
        'Forgetting to reset the `.constructor` property after modifying the prototype in the pre-ES6 pattern, which can lead to confusing behavior.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Inheritance
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    <strong>Inheritance</strong> is a core mechanism in object-oriented programming that allows a new class (a "subclass" or "child class") to be based on an existing class (a "superclass" or "parent class"). The child class inherits the properties and methods of the parent class, enabling code reuse and the creation of a logical class hierarchy.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Under the Hood: </strong> JavaScript's inheritance is prototype-based. When you try to access a property on an object, the engine first checks the object itself. If it's not found, it checks the object's prototype, and so on, up the "prototype chain" until the property is found or the chain ends.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Implementing Inheritance</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        While the underlying mechanism is the prototype chain, modern JavaScript provides a much simpler syntax for setting up inheritance.
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

export default JsInheritance;