import CodeBlock from "../../components/CodeBlock";

const JsPolymorphism = () => {
    const examples = [
        {
            title: 'Subtype Polymorphism (Method Overriding)',
            code: `class Animal {
    speak() {
        console.log('An animal makes a sound.');
    }
}

class Dog extends Animal {
    // Overrides the parent's speak method
    speak() {
        console.log('The dog barks.');
    }
}

class Cat extends Animal {
    // Overrides the parent's speak method
    speak() {
        console.log('The cat meows.');
    }
}

// A function that can work with any Animal subclass
function makeAnimalSpeak(animal) {
    animal.speak();
}

const genericAnimal = new Animal();
const myDog = new Dog();
const myCat = new Cat();

makeAnimalSpeak(genericAnimal); // An animal makes a sound.
makeAnimalSpeak(myDog);         // The dog barks.
makeAnimalSpeak(myCat);         // The cat meows.`,
            explanation: 'This is the most common form of polymorphism in OOP. Different objects (Dog, Cat) respond to the same message (`speak()`) in their own unique way, thanks to method overriding.'
        },
        {
            title: 'Ad-hoc Polymorphism (Simulating Overloading)',
            code: `function calculateArea(...args) {
    // Check the number of arguments to determine the shape
    if (args.length === 1) {
        const side = args[0];
        console.log(\`Calculating area of a square with side \${side}\`);
        return side * side; // Area of a square
    } 
    else if (args.length === 2) {
        const [width, height] = args;
        console.log(\`Calculating area of a rectangle with width \${width} and height \${height}\`);
        return width * height; // Area of a rectangle
    }
    else {
        return 'Invalid arguments: Please provide 1 (for square) or 2 (for rectangle) arguments.';
    }
}

console.log(calculateArea(5));       // Output: 25
console.log(calculateArea(4, 6));    // Output: 24
console.log(calculateArea(3, 4, 5)); // Output: Invalid arguments...`,
            explanation: 'JavaScript doesn\'t support traditional function overloading (defining multiple functions with the same name but different parameters). However, you can simulate it within a single function by inspecting the number or types of arguments passed to it.'
        },
        {
            title: 'Parametric Polymorphism (Duck Typing)',
            code: `// This class has a 'render' method
class Button {
    render() {
        return '<button>Click Me</button>';
    }
}

// This class also has a 'render' method
class Image {
    render() {
        return '<img src="photo.jpg" />';
    }
}

// This function doesn't care about the object's class, only that it can '.render()'
function drawToScreen(component) {
    // If it looks like a duck and quacks like a duck, it's a duck.
    if (typeof component.render === 'function') {
        document.body.innerHTML += component.render();
    }
}

const button = new Button();
const image = new Image();

// We can pass different object types to the same function
// because they both satisfy the implicit contract (having a 'render' method).
// drawToScreen(button);
// drawToScreen(image);

console.log('Both a Button and an Image can be rendered by the same function.');`,
            explanation: 'This is often called "duck typing". The `drawToScreen` function doesn\'t care if the object is a `Button` or an `Image`. It only cares that the object has a `render` method. The function is polymorphic because it can operate on objects of different types that share a common interface.'
        }
    ];

    const bestPractices = [
        'Leverage polymorphism to write flexible functions that can operate on a variety of objects, as long as they share a common interface (e.g., the same method names).',
        'When overriding methods, ensure the subclass method is a compatible substitute for the parent class method (Liskov Substitution Principle). It should take similar arguments and perform a similar task.',
        'Prefer subtype polymorphism (using classes and inheritance) for creating clear, structured relationships between objects.',
        'Use duck typing in situations where a formal class hierarchy is unnecessary or overly rigid, especially common in library or framework code.'
    ];

    const commonMistakes = [
        'Assuming JavaScript has native function overloading like Java or C#. Declaring two functions with the same name in the same scope will result in the second one overwriting the first.',
        'Creating subclasses that drastically alter the behavior of an inherited method, making it an unsuitable replacement for the parent method.',
        'Confusing inheritance with polymorphism. Inheritance is the mechanism that allows one class to get properties from another, while polymorphism is the ability to treat objects of different classes in the same way.',
        'Building overly complex conditional logic (`if/else if`) to simulate overloading when creating separate, clearly named functions would be simpler and more readable.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Polymorphism
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    <strong>Polymorphism</strong>, from the Greek words for "many forms", is a core concept in object-oriented programming. It refers to the ability to present the same interface for differing underlying forms (data types). In practice, this means you can call the same method on different objects, and each object can respond in its own way.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Idea: </strong> Polymorphism allows you to write code that is more abstract and decoupled. A single function can handle objects of different classes, making the code more reusable and extensible without needing a chain of `if/else` or `switch` statements.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Forms of Polymorphism in JavaScript</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Polymorphism can manifest in several ways in JavaScript, from classic method overriding to more dynamic, structure-based approaches.
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

export default JsPolymorphism;