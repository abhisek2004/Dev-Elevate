import CodeBlock from "../../components/CodeBlock";

const JsEncapsulation = () => {
    const examples = [
        {
            title: 'Encapsulation with Closures (Pre-ES2022)',
            code: `function BankAccount(initialBalance) {
    // This variable is "private" due to the closure
    let balance = initialBalance;

    // Public method to deposit funds
    this.deposit = function(amount) {
        if (amount > 0) {
            balance += amount;
            console.log(\`Deposited: \${amount}\`);
        }
    };

    // Public method to withdraw funds
    this.withdraw = function(amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            console.log(\`Withdrew: \${amount}\`);
        } else {
            console.log('Insufficient funds or invalid amount.');
        }
    };

    // Public method to get the current balance
    this.getBalance = function() {
        return balance;
    };
}

const myAccount = new BankAccount(100);
console.log(myAccount.balance); // undefined (cannot access directly)
console.log(myAccount.getBalance()); // 100

myAccount.deposit(50); // Deposited: 50
myAccount.withdraw(30); // Withdrew: 30
console.log(myAccount.getBalance()); // 120`,
            explanation: 'In older JavaScript, closures were the primary way to create private variables. The `balance` variable exists only within the `BankAccount` function\'s scope and can only be accessed or modified by the methods defined within that same scope.'
        },
        {
            title: 'Modern Encapsulation with Private Fields (ES2022+)',
            code: `class Counter {
    // # denotes a private field. It's a syntax error to access it from outside the class.
    #count = 0;

    // A private method
    #log(message) {
        console.log(\`[LOG]: \${message}\`);
    }

    increment() {
        this.#count++;
        this.#log(\`Incremented to \${this.#count}\`);
    }

    get value() {
        return this.#count;
    }
}

const myCounter = new Counter();
myCounter.increment(); // [LOG]: Incremented to 1
myCounter.increment(); // [LOG]: Incremented to 2

console.log(myCounter.value); // 2
// console.log(myCounter.#count); // SyntaxError: Private field must be declared in an enclosing class`,
            explanation: 'Modern JavaScript provides a native way to declare private class members using a hash (`#`) prefix. This provides true privacy, enforced by the JavaScript engine itself, for both properties and methods.'
        },
        {
            title: 'Getters and Setters for Controlled Access',
            code: `class UserProfile {
    #birthYear;

    constructor(name, birthYear) {
        this.name = name;
        this.#birthYear = birthYear;
    }

    // A "getter" provides public read-access to a private property
    get age() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.#birthYear;
    }

    // A "setter" provides public write-access with validation
    set birthYear(year) {
        if (year > 1900 && year < new Date().getFullYear()) {
            this.#birthYear = year;
        } else {
            console.error('Invalid birth year.');
        }
    }
}

const user = new UserProfile('Alex', 1995);
console.log(\`\${user.name} is \${user.age} years old.\`); // Alex is 30 years old.

user.birthYear = 2000; // Using the setter
console.log(\`Now, \${user.name} is \${user.age} years old.\`); // Now, Alex is 25 years old.`,
            explanation: 'Getters and setters are special methods that provide a public interface for reading and writing an object\'s private data. They allow you to add logic, such as calculation or validation, when properties are accessed.'
        }
    ];

    const bestPractices = [
        'Prefer modern `#` private fields over closure-based patterns for better readability and true, language-enforced privacy.',
        'Expose the smallest possible public interface. If a property or method is not needed by outside code, it should be private.',
        'Use getters and setters to create a stable API while keeping the internal data structure flexible and private.',
        'When returning a private object or array from a public method, return a copy or an immutable version to prevent external code from modifying the internal state directly.'
    ];

    const commonMistakes = [
        'Using underscore prefixes (e.g., `this._name`) as a convention for privacy. This does not provide any actual protection, as the property is still publicly accessible.',
        'Making all properties and methods public by default, which breaks encapsulation and can lead to a fragile system where internal changes can easily break external code.',
        'Adding a simple getter and setter for every private field without any logic, which often provides little benefit over a public field.',
        'Returning a direct reference to a private mutable object (like an array), allowing external code to bypass the class\'s methods and modify its internal state.'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Encapsulation
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    <strong>Encapsulation</strong> is a core principle of object-oriented programming (OOP) that involves bundling an object's data (properties) and the methods that operate on that data into a single unit, or "class". It also involves restricting direct access to an object's internal state from the outside, which is known as <strong>data hiding</strong>.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Key Idea: </strong> Think of encapsulation as a protective barrier. It prevents external code from accidentally or intentionally messing up an object's internal state, leading to more robust and maintainable code.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Implementing Encapsulation</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        JavaScript has evolved in how it achieves encapsulation, moving from patterns like closures to native language features.
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

export default JsEncapsulation;