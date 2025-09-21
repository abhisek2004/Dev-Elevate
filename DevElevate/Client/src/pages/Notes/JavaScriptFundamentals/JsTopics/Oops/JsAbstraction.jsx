import CodeBlock from "../../components/CodeBlock";

const JsAbstraction = () => {
    const examples = [
        {
            title: 'Simulating Abstract Classes (ES6 Pattern)',
            code: `class Shape {
    constructor() {
        // Prevent direct instantiation of the 'abstract' class
        if (new.target === Shape) {
            throw new TypeError("Cannot construct Shape instances directly");
        }
    }

    // 'Abstract' method - must be implemented by subclasses
    getArea() {
        throw new Error("Method 'getArea()' must be implemented.");
    }

    // A concrete method, inherited by all subclasses
    getDescription() {
        return "This is a geometric shape.";
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    // Concrete implementation of the abstract method
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    // Concrete implementation of the abstract method
    getArea() {
        return this.width * this.height;
    }
}

const circle = new Circle(10);
console.log(circle.getDescription()); // This is a geometric shape.
console.log(circle.getArea());      // 314.159...

// const shape = new Shape(); // Throws TypeError: Cannot construct Shape instances directly`,
            explanation: 'Abstraction is achieved by defining a base class that cannot be instantiated and enforces a contract. Any class that inherits from `Shape` *must* provide its own `getArea` method, while the complex implementation details of the calculation are hidden from the user.'
        },
        {
            title: 'Abstraction via a Simplified API',
            code: `// Complex, low-level details
const lowLevelApi = {
    connect: (port) => console.log(\`Connecting to port \${port}...\`),
    authenticate: (key) => console.log(\`Authenticating with key: \${key.substring(0, 4)}...\`),
    sendCommand: (cmd) => console.log(\`Sending command: \${cmd}\`),
    disconnect: () => console.log('Disconnecting.')
};

// Simple, high-level abstraction
class DatabaseClient {
    constructor(port, apiKey) {
        this.port = port;
        this.apiKey = apiKey;
    }

    // This public method hides the complex sequence of calls
    query(queryString) {
        lowLevelApi.connect(this.port);
        lowLevelApi.authenticate(this.apiKey);
        lowLevelApi.sendCommand(\`QUERY: \${queryString}\`);
        lowLevelApi.disconnect();
        return { success: true, data: 'query results' };
    }
}

const db = new DatabaseClient('5432', 'ABC-123-XYZ');
// The user only needs to call one simple method.
// All the connection/auth details are abstracted away.
db.query('SELECT * FROM users');`,
            explanation: 'Abstraction isn\'t just about classes. It\'s about hiding complexity. The `DatabaseClient` class provides a simple `query` method that abstracts away the multi-step process of connecting, authenticating, and sending commands.'
        }
    ];

    const bestPractices = [
        'Focus on designing simple and intuitive public interfaces. The goal is to make your objects easy to use without needing to understand their internal workings.',
        'Hide implementation details. If a property or method is not meant for external use, it should be private to prevent dependencies on internal logic.',
        'Use abstraction to build loosely coupled systems. When you change the internal implementation, it shouldn\'t break the code that uses your object, as long as the public interface remains the same.',
        'Clearly document the public API of your components, including the purpose, parameters, and return values of public methods.'
    ];

    const commonMistakes = [
        'Creating "leaky" abstractions where the user still needs to understand or interact with the internal details of an object to use it correctly.',
        'Assuming JavaScript has native `abstract` classes or `interfaces` like other languages (e.g., Java, C#). These concepts must be simulated or are provided by supersets like TypeScript.',
        'Over-abstraction, which involves creating too many layers and indirections, making the code harder to debug and understand than the original implementation.',
        'Exposing too many public methods and properties, which creates a complex interface and makes the object harder to use and maintain.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Abstraction
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    <strong>Abstraction</strong> is the concept of hiding complex implementation details and showing only the essential features of an object. It's about simplifying a complex reality by modeling classes appropriate to the problem. In essence, you provide a simple, high-level interface to a more complex underlying implementation.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Idea: </strong> Think of a car's dashboard. You use a steering wheel, pedals, and a gear stick (the simple interface) to drive. You don't need to know how the engine, transmission, or brakes work internally (the complex implementation). That's abstraction.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Achieving Abstraction in JavaScript</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        While JavaScript doesn't have formal `abstract` classes, the principle of abstraction is applied by creating simple public interfaces that hide more complex logic.
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

export default JsAbstraction;