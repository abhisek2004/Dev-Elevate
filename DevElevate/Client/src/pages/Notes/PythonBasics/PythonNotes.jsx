import React from "react";
import { useGlobalState } from '../../../contexts/GlobalContext';

const pythonBasics = [
  {
    id: 1,
    title: "Introduction to Python",
    content: [
      "Python is a high-level, interpreted programming language created by Guido van Rossum.",
      "It emphasizes code readability and uses indentation instead of curly braces.",
      "It is widely used in web development, data science, automation, AI, and more."
    ],
    code: `# Your first Python program
print("Hello, Python!")`
  },
  {
    id: 2,
    title: "Variables & Data Types",
    content: [
      "Variables are containers for storing data values.",
      "You don’t need to declare a type explicitly; Python infers it.",
      "Common types: int, float, string, boolean."
    ],
    code: `x = 10        # integer
y = 3.14      # float
name = "Alex" # string
is_active = True  # boolean

print(type(x), type(name))`
  },
  {
    id: 3,
    title: "Operators",
    content: [
      "Operators perform operations on variables and values.",
      "Arithmetic (+, -, *, /, %), Comparison (==, !=, >, <), Logical (and, or, not)."
    ],
    code: `a, b = 5, 2
print(a + b)      # 7
print(a ** b)     # 25
print(a > b and b > 0)  # True`
  },
  {
    id: 4,
    title: "Conditional Statements",
    content: [
      "`if`, `elif`, and `else` control decision-making.",
      "They let you execute blocks of code based on conditions."
    ],
    code: `age = 18
if age >= 18:
    print("You are an adult")
elif age > 13:
    print("You are a teenager")
else:
    print("You are a child")`
  },
  {
    id: 5,
    title: "Loops",
    content: [
      "`for` loops iterate over sequences (lists, strings, ranges).",
      "`while` loops run until a condition is false."
    ],
    code: `for i in range(3):
    print("For loop:", i)

count = 2
while count >= 0:
    print("While loop:", count)
    count -= 1`
  },
  {
    id: 6,
    title: "Functions",
    content: [
      "Functions group reusable blocks of code.",
      "They can take parameters and return values."
    ],
    code: `def greet(name):
    return f"Hello, {name}"

print(greet("Alice"))
print(greet("Bob"))`
  },
  {
    id: 7,
    title: "Lists",
    content: [
      "Lists are ordered, mutable collections of items.",
      "They allow duplicates and can contain multiple data types."
    ],
    code: `fruits = ["apple", "banana", "cherry"]
print(fruits[0])   # apple
fruits.append("orange")
print(fruits)`
  },
  {
    id: 8,
    title: "Dictionaries",
    content: [
      "Dictionaries store data in key-value pairs.",
      "They are unordered, mutable, and do not allow duplicate keys."
    ],
    code: `student = {"name": "John", "age": 21}
print(student["name"])  # John
student["age"] = 22
print(student)`
  },
  {
    id: 9,
    title: "Tuples & Sets",
    content: [
      "Tuple → Ordered, immutable collection (good for fixed data).",
      "Set → Unordered collection of unique items (removes duplicates)."
    ],
    code: `point = (10, 20)
print(point[0])  # 10

unique_numbers = {1, 2, 2, 3}
print(unique_numbers)  # {1, 2, 3}`
  },
  {
    id: 10,
    title: "Strings",
    content: [
      "Strings are sequences of characters enclosed in quotes.",
      "They support slicing, concatenation, and methods like upper(), lower()."
    ],
    code: `text = "Hello World"
print(text.upper())       # HELLO WORLD
print(text.replace("World", "Python"))
print(text[0:5])          # Hello`
  },
  {
    id: 11,
    title: "String Formatting",
    content: [
      "Python provides multiple ways to format strings: f-strings, format(), concatenation."
    ],
    code: `name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old.")`
  },
  {
    id: 12,
    title: "Input & Output",
    content: [
      "`input()` reads user input as a string.",
      "`print()` outputs values to the console."
    ],
    code: `name = input("Enter your name: ")
print("Hello,", name)`
  },
  {
    id: 13,
    title: "Type Casting",
    content: [
      "Convert between data types using int(), float(), str().",
      "Useful when working with user input or mixed data."
    ],
    code: `x = "10"
y = int(x)
print(y + 5)  # 15`
  },
  {
    id: 14,
    title: "List Comprehension",
    content: [
      "A concise way to create lists with a single line of code."
    ],
    code: `numbers = [x**2 for x in range(5)]
print(numbers)  # [0, 1, 4, 9, 16]`
  },
  {
    id: 15,
    title: "Nested Loops",
    content: [
      "A loop inside another loop.",
      "Commonly used in working with 2D data (matrices, grids)."
    ],
    code: `for i in range(3):
    for j in range(2):
        print(i, j)`
  },
  {
    id: 16,
    title: "Break & Continue",
    content: [
      "`break` exits the loop immediately.",
      "`continue` skips to the next iteration."
    ],
    code: `for num in range(5):
    if num == 3:
        continue
    if num == 4:
        break
    print(num)`
  },
  {
    id: 17,
    title: "Exception Handling",
    content: [
      "Exceptions are errors detected during execution.",
      "Use try-except blocks to handle errors gracefully."
    ],
    code: `try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")`
  },
  {
    id: 18,
    title: "Modules & Imports",
    content: [
      "Modules are files containing Python code (functions, classes).",
      "You can import built-in or custom modules."
    ],
    code: `import math
print(math.sqrt(16))`
  },
  {
    id: 19,
    title: "File Handling",
    content: [
      "Use `open()` to read and write files.",
      "Always close files or use `with` (context manager)."
    ],
    code: `with open("sample.txt", "w") as f:
    f.write("Hello, File!")

with open("sample.txt", "r") as f:
    print(f.read())`
  },
  {
    id: 20,
    title: "Classes & Objects",
    content: [
      "Python is object-oriented: everything is an object.",
      "Classes define blueprints, objects are instances."
    ],
    code: `class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(self.name, "says Woof!")

dog = Dog("Buddy")
dog.bark()`
  },
  {
    id: 21,
    title: "Inheritance",
    content: [
      "Inheritance lets one class derive properties from another.",
      "Promotes code reuse and extensibility."
    ],
    code: `class Animal:
    def speak(self):
        print("Animal sound")

class Dog(Animal):
    def speak(self):
        print("Woof!")

Dog().speak()`
  },
  {
    id: 22,
    title: "Built-in Functions",
    content: [
      "Python has many built-ins: len(), type(), range(), sorted(), sum(), max(), min()."
    ],
    code: `nums = [3, 7, 1]
print(len(nums))      # 3
print(sorted(nums))   # [1, 3, 7]`
  },
  {
    id: 23,
    title: "Lambda Functions",
    content: [
      "Anonymous functions defined with `lambda` keyword.",
      "Used for short operations without defining full functions."
    ],
    code: `square = lambda x: x**2
print(square(5))`
  },
  {
    id: 24,
    title: "Map, Filter, Reduce",
    content: [
      "`map()` applies a function to all items.",
      "`filter()` selects items based on condition.",
      "`reduce()` combines items into a single value."
    ],
    code: `nums = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, nums))
evens = list(filter(lambda x: x % 2 == 0, nums))
from functools import reduce
total = reduce(lambda a, b: a + b, nums)
print(squared, evens, total)`
  },
  {
    id: 25,
    title: "Summary",
    content: [
      "Python basics cover syntax, control flow, functions, data structures, OOP, and error handling.",
      "Mastering these concepts gives you the foundation to explore advanced topics like frameworks, APIs, and data science."
    ]
  }
];


const PythonNotes = () => {
 const { state, dispatch } = useGlobalState();
  return (
    <div className={`relative min-h-screen py-12 px-4 z-10 ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Background grid and gradient overlay */}
      <div className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${state.darkMode ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}>
        <div className={`absolute inset-0 ${state.darkMode ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-righteous tracking-wider mb-4 transition-colors duration-300 ${state.darkMode ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            Python Basics
          </h1>
          <div className={`h-1 w-32 mx-auto rounded-full bg-gradient-to-r ${state.darkMode ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'} mb-4`}></div>
          <p className={`mt-2 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${state.darkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            A comprehensive guide to Python concepts and syntax
          </p>
        </div>
        <div className="pyfund-vertical-stack">
          {pythonBasics.length === 0 ? (
            <div style={{color: '#ff6b6b', textAlign: 'center', fontSize: '1.2rem', marginTop: '40px'}}>No notes available.</div>
          ) : (
            pythonBasics.map(note => (
              <div key={note.id} className={`pyfund-card group relative p-6 rounded-2xl shadow-lg flex flex-col justify-between w-full max-w-2xl mx-auto mb-8 hover:border-b-2 hover:border-r-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${state.darkMode ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' : 'bg-light-bg-secondary border border-light-border hover:border-primary/50'} transition-all duration-300 overflow-hidden`}>
                <h2 className="text-xl font-semibold mb-4 text-primary">{note.title}</h2>
                {note.content && Array.isArray(note.content) ? (
                  <ul className="list-disc pl-5 mb-2">
                    {note.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : note.content ? (
                  <p className="mb-2">{note.content}</p>
                ) : null}
                {note.code && (
                  <pre className="bg-gray-950 text-blue-200 text-sm rounded-lg p-4 mt-2 overflow-x-auto border border-blue-800 font-mono">
                    <code>{note.code}</code>
                  </pre>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <style>{`
        .font-righteous {
          font-family: 'Righteous', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .pyfund-vertical-stack {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .pyfund-card {
          width: 100%;
          margin-bottom: 2rem;
        }
        @media (max-width: 600px) {
          .pyfund-card {
            min-width: 95vw;
            max-width: 99vw;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PythonNotes;
