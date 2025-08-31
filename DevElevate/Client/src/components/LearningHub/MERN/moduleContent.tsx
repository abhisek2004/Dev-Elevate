export const mernModules = {
  html: {
    id: 'html',
    title: 'HTML5 Fundamentals',
    description: 'Master semantic HTML, forms, accessibility, and modern HTML5 features',
    topics: [
      {
        id: 'html-basics',
        title: 'HTML Structure & Semantics',
        content: `# HTML5 Structure & Semantic Elements

## What is HTML5?
**HTML5** is the latest version of HyperText Markup Language, the standard markup language for creating web pages and web applications.

### Key Features of HTML5:
- **Semantic Elements**: Better document structure
- **Multimedia Support**: Native audio and video
- **Form Enhancements**: New input types and validation
- **Canvas & SVG**: Graphics and animations
- **Local Storage**: Client-side data storage
- **Geolocation**: Location-aware applications

## Document Structure
Every HTML5 document follows this basic structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>
\`\`\`

## Semantic HTML Elements

### Page Structure Elements:
- **\`<header>\`**: Page or section header
- **\`<nav>\`**: Navigation links
- **\`<main>\`**: Main content area
- **\`<section>\`**: Thematic grouping of content
- **\`<article>\`**: Independent, self-contained content
- **\`<aside>\`**: Sidebar content
- **\`<footer>\`**: Page or section footer

### Content Elements:
- **\`<h1>\` to \`<h6>\`**: Headings (hierarchy)
- **\`<p>\`**: Paragraphs
- **\`<blockquote>\`**: Block quotations
- **\`<figure>\` & \`<figcaption>\`**: Images with captions
- **\`<time>\`**: Dates and times
- **\`<mark>\`**: Highlighted text

## HTML5 Form Elements

### New Input Types:
- **email**: Email validation
- **url**: URL validation
- **tel**: Telephone numbers
- **number**: Numeric input
- **range**: Slider control
- **date**: Date picker
- **color**: Color picker
- **search**: Search input

### Form Validation:
- **required**: Required fields
- **pattern**: Regular expression validation
- **min/max**: Value constraints
- **maxlength**: Character limits

## Accessibility Best Practices

### ARIA Attributes:
- **aria-label**: Accessible name
- **aria-describedby**: Additional description
- **role**: Element purpose
- **aria-hidden**: Hide decorative elements

### Semantic Guidelines:
1. Use headings in logical order (h1 → h2 → h3)
2. Provide alt text for images
3. Use proper form labels
4. Ensure keyboard navigation
5. Maintain color contrast ratios`,
        codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML5 Semantic Structure</title>
</head>
<body>
    <header>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="hero">
            <h1>Welcome to Modern Web Development</h1>
            <p>Learn HTML5, CSS3, and JavaScript</p>
        </section>

        <section id="contact">
            <h2>Contact Form</h2>
            <form action="/submit" method="POST">
                <label for="name">Name *</label>
                <input type="text" id="name" name="name" required>
                
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" required>
                
                <label for="message">Message</label>
                <textarea id="message" name="message"></textarea>
                
                <button type="submit">Send</button>
            </form>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Web Development Course</p>
    </footer>
</body>
</html>`,
        practiceLinks: [
          { name: 'MDN HTML Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
          { name: 'HTML5 Validator', url: 'https://validator.w3.org/' },
          { name: 'Can I Use', url: 'https://caniuse.com/' }
        ]
      },
      {
        id: 'forms-accessibility',
        title: 'Forms & Accessibility',
        content: `# HTML5 Forms & Accessibility

## HTML5 Form Elements

### New Input Types:
- **email**: Email validation
- **url**: URL validation
- **tel**: Telephone numbers
- **number**: Numeric input
- **range**: Slider control
- **date**: Date picker
- **color**: Color picker
- **search**: Search input

### Form Validation:
- **required**: Required fields
- **pattern**: Regular expression validation
- **min/max**: Value constraints
- **maxlength**: Character limits

## Accessibility Best Practices

### ARIA Attributes:
- **aria-label**: Accessible name
- **aria-describedby**: Additional description
- **role**: Element purpose
- **aria-hidden**: Hide decorative elements

### Form Accessibility:
1. Use proper form labels
2. Group related fields with fieldset
3. Provide clear error messages
4. Ensure keyboard navigation
5. Use appropriate input types`,
        codeExample: `<!-- Accessible Contact Form -->
<form action="/contact" method="POST" novalidate>
    <fieldset>
        <legend>Contact Information</legend>
        
        <div class="form-group">
            <label for="name">Full Name *</label>
            <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                aria-describedby="name-error"
                autocomplete="name"
            >
            <div id="name-error" class="error" aria-live="polite"></div>
        </div>
        
        <div class="form-group">
            <label for="email">Email Address *</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                aria-describedby="email-error"
                autocomplete="email"
            >
            <div id="email-error" class="error" aria-live="polite"></div>
        </div>
        
        <div class="form-group">
            <label for="phone">Phone Number</label>
            <input 
                type="tel" 
                id="phone" 
                name="phone" 
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="123-456-7890"
                autocomplete="tel"
            >
        </div>
        
        <div class="form-group">
            <label for="birthdate">Date of Birth</label>
            <input 
                type="date" 
                id="birthdate" 
                name="birthdate"
                min="1900-01-01" 
                max="2024-12-31"
            >
        </div>
        
        <div class="form-group">
            <label for="website">Website</label>
            <input 
                type="url" 
                id="website" 
                name="website" 
                placeholder="https://example.com"
            >
        </div>
        
        <div class="form-group">
            <label for="age">Age</label>
            <input 
                type="number" 
                id="age" 
                name="age" 
                min="18" 
                max="120"
            >
        </div>
        
        <div class="form-group">
            <label for="priority">Priority Level</label>
            <input 
                type="range" 
                id="priority" 
                name="priority" 
                min="1" 
                max="5" 
                value="3"
                aria-describedby="priority-value"
            >
            <output id="priority-value">3</output>
        </div>
        
        <div class="form-group">
            <label for="color">Favorite Color</label>
            <input 
                type="color" 
                id="color" 
                name="color" 
                value="#ff0000"
            >
        </div>
    </fieldset>
    
    <fieldset>
        <legend>Message Details</legend>
        
        <div class="form-group">
            <label for="subject">Subject *</label>
            <input 
                type="text" 
                id="subject" 
                name="subject" 
                required 
                maxlength="100"
            >
        </div>
        
        <div class="form-group">
            <label for="message">Message *</label>
            <textarea 
                id="message" 
                name="message" 
                required 
                rows="5" 
                maxlength="500"
                aria-describedby="message-count"
            ></textarea>
            <div id="message-count" aria-live="polite">0/500 characters</div>
        </div>
        
        <div class="form-group">
            <fieldset>
                <legend>Contact Preference</legend>
                <input type="radio" id="email-pref" name="contact-pref" value="email" checked>
                <label for="email-pref">Email</label>
                
                <input type="radio" id="phone-pref" name="contact-pref" value="phone">
                <label for="phone-pref">Phone</label>
            </fieldset>
        </div>
        
        <div class="form-group">
            <input type="checkbox" id="newsletter" name="newsletter" value="yes">
            <label for="newsletter">Subscribe to newsletter</label>
        </div>
    </fieldset>
    
    <button type="submit" aria-describedby="submit-help">
        Send Message
    </button>
    <div id="submit-help">Your message will be sent securely</div>
</form>`,
        practiceLinks: [
          { name: 'Web Accessibility Guidelines', url: 'https://www.w3.org/WAI/WCAG21/quickref/' },
          { name: 'HTML Forms Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form' }
        ]
      }
    ]
  },
  css: {
    id: 'css',
    title: 'CSS3 & Styling',
    description: 'Master modern CSS including Flexbox, Grid, animations, and responsive design',
    topics: [
      {
        id: 'css-fundamentals',
        title: 'CSS Fundamentals & Selectors',
        content: `# CSS3 Fundamentals & Advanced Selectors

## What is CSS?
**CSS (Cascading Style Sheets)** is a stylesheet language used to describe the presentation of HTML documents.

### CSS Syntax:
\`\`\`css
selector {
    property: value;
}
\`\`\`

## CSS Selectors

### Basic Selectors:
- **Element**: \`p { }\` - Selects all \`<p>\` elements
- **Class**: \`.className { }\` - Selects elements with class
- **ID**: \`#idName { }\` - Selects element with specific ID
- **Universal**: \`* { }\` - Selects all elements

### Pseudo-classes:
- **\`:hover\`**: Mouse over
- **\`:focus\`**: Element has focus
- **\`:nth-child(n)\`**: Nth child element

## CSS Box Model

### Components:
1. **Content**: The actual content
2. **Padding**: Space inside the border
3. **Border**: Border around padding
4. **Margin**: Space outside the border`,
        codeExample: `/* CSS Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

/* CSS Variables */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --spacing: 1rem;
}

/* Component Styles */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing);
}

.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: var(--primary-color);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
    background: #0056b3;
    transform: translateY(-2px);
}`,
        practiceLinks: [
          { name: 'CSS Tricks', url: 'https://css-tricks.com/' },
          { name: 'MDN CSS Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' }
        ]
      },
      {
        id: 'flexbox-grid',
        title: 'Flexbox & CSS Grid',
        content: `# Flexbox & CSS Grid Layout

## CSS Flexbox
**Flexbox** is a one-dimensional layout method for arranging items in rows or columns.

### Flex Container Properties:
- **\`display: flex\`**: Creates flex container
- **\`flex-direction\`**: row, column, row-reverse, column-reverse
- **\`justify-content\`**: Align items along main axis
- **\`align-items\`**: Align items along cross axis
- **\`flex-wrap\`**: Allow items to wrap

### Flex Item Properties:
- **\`flex-grow\`**: How much item should grow
- **\`flex-shrink\`**: How much item should shrink
- **\`flex-basis\`**: Initial size before free space distribution
- **\`align-self\`**: Override align-items for individual item

## CSS Grid
**CSS Grid** is a two-dimensional layout system for creating complex layouts.

### Grid Container Properties:
- **\`display: grid\`**: Creates grid container
- **\`grid-template-columns\`**: Define column sizes
- **\`grid-template-rows\`**: Define row sizes
- **\`gap\`**: Space between grid items
- **\`grid-template-areas\`**: Named grid areas

### Grid Item Properties:
- **\`grid-column\`**: Span across columns
- **\`grid-row\`**: Span across rows
- **\`grid-area\`**: Place item in named area`,
        codeExample: `/* Flexbox Examples */
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.flex-item {
    flex: 1;
    padding: 1rem;
    background: #f0f0f0;
    border-radius: 8px;
}

/* Navigation with Flexbox */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #333;
    color: white;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

/* CSS Grid Examples */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

/* Complex Grid Layout */
.page-layout {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 1rem;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }`,
        practiceLinks: [
          { name: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/' },
          { name: 'Grid Garden', url: 'https://cssgridgarden.com/' }
        ]
      }
    ]
  },
  javascript: {
    id: 'javascript',
    title: 'JavaScript ES6+',
    description: 'Modern JavaScript fundamentals, ES6+ features, DOM manipulation, and async programming',
    topics: [
      {
        id: 'js-fundamentals',
        title: 'JavaScript Fundamentals',
        content: `# JavaScript ES6+ Fundamentals

## What is JavaScript?
**JavaScript** is a high-level, interpreted programming language that enables interactive web pages and dynamic content.

## Variables and Data Types

### Variable Declarations:
- **\`let\`**: Block-scoped, mutable
- **\`const\`**: Block-scoped, immutable
- **\`var\`**: Function-scoped (avoid in modern JS)

### Data Types:
- **Primitive**: string, number, boolean, null, undefined, symbol, bigint
- **Non-primitive**: object, array, function

## Functions

### Function Declaration:
\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

### Arrow Functions:
\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
\`\`\`

## ES6+ Features

### Destructuring:
\`\`\`javascript
const [a, b] = [1, 2];
const {name, age} = person;
\`\`\`

### Template Literals:
\`\`\`javascript
const message = \`Hello, \${name}!\`;
\`\`\`

### Spread Operator:
\`\`\`javascript
const newArray = [...oldArray, newItem];
\`\`\``,
        codeExample: `// Modern JavaScript Examples

// Variables and Constants
const API_URL = 'https://api.example.com';
let userCount = 0;

// Arrow Functions
const calculateArea = (radius) => Math.PI * radius ** 2;

// Template Literals
const createMessage = (name, age) => {
    return \`Hello \${name}, you are \${age} years old.\`;
};

// Destructuring
const user = { name: 'John', age: 30, city: 'New York' };
const { name, age, city } = user;

// Array Methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// Async/Await
async function fetchUserData(userId) {
    try {
        const response = await fetch(\`\${API_URL}/users/\${userId}\`);
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

// Classes
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
}

// DOM Manipulation
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    const output = document.getElementById('output');
    
    button.addEventListener('click', async () => {
        try {
            const data = await fetchUserData(1);
            output.textContent = \`User: \${data.name}\`;
        } catch (error) {
            output.textContent = 'Error loading user data';
        }
    });
});`,
        practiceLinks: [
          { name: 'MDN JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
          { name: 'JavaScript.info', url: 'https://javascript.info/' }
        ]
      },
      {
        id: 'dom-events',
        title: 'DOM Manipulation & Events',
        content: `# DOM Manipulation & Event Handling

## What is the DOM?
**DOM (Document Object Model)** is a programming interface for HTML documents that represents the page structure as a tree of objects.

## Selecting Elements

### Modern Methods:
- **\`document.querySelector()\`**: Select first matching element
- **\`document.querySelectorAll()\`**: Select all matching elements
- **\`document.getElementById()\`**: Select by ID
- **\`document.getElementsByClassName()\`**: Select by class name

## Manipulating Elements

### Content Manipulation:
- **\`textContent\`**: Get/set text content
- **\`innerHTML\`**: Get/set HTML content
- **\`value\`**: Get/set form input values

### Style Manipulation:
- **\`style\`**: Direct style properties
- **\`classList\`**: Add, remove, toggle CSS classes

### Attribute Manipulation:
- **\`getAttribute()\`**: Get attribute value
- **\`setAttribute()\`**: Set attribute value
- **\`removeAttribute()\`**: Remove attribute

## Event Handling

### Adding Event Listeners:
\`\`\`javascript
element.addEventListener('event', function);
\`\`\`

### Common Events:
- **\`click\`**: Mouse click
- **\`submit\`**: Form submission
- **\`load\`**: Page/image loaded
- **\`keydown\`**: Key pressed
- **\`change\`**: Input value changed`,
        codeExample: `// DOM Manipulation Examples

// Selecting elements
const button = document.querySelector('#myButton');
const items = document.querySelectorAll('.item');
const form = document.getElementById('contactForm');

// Creating and modifying elements
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.classList.add('highlight');
document.body.appendChild(newDiv);

// Event handling
button.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Button clicked!');
});

// Form handling
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    
    console.log('Form submitted:', { name, email });
});

// Dynamic content creation
function createTodoItem(text) {
    const li = document.createElement('li');
    li.innerHTML = \`
        <span>\${text}</span>
        <button class="delete-btn">Delete</button>
    \`;
    
    // Add delete functionality
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });
    
    return li;
}

// Interactive todo list
const todoList = document.getElementById('todoList');
const addBtn = document.getElementById('addTodo');
const todoInput = document.getElementById('todoInput');

addBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        const todoItem = createTodoItem(text);
        todoList.appendChild(todoItem);
        todoInput.value = '';
    }
});`,
        practiceLinks: [
          { name: 'DOM Manipulation Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model' },
          { name: 'JavaScript Events', url: 'https://developer.mozilla.org/en-US/docs/Web/Events' }
        ]
      }
    ]
  },
  react: {
    id: 'react',
    title: 'React.js',
    description: 'Build modern user interfaces with React components, hooks, and state management',
    topics: [
      {
        id: 'react-basics',
        title: 'React Components & JSX',
        content: `# React.js Fundamentals

## What is React?
**React** is a JavaScript library for building user interfaces, particularly web applications with dynamic, interactive content.

## JSX Syntax
JSX allows you to write HTML-like syntax in JavaScript:

\`\`\`jsx
const element = <h1>Hello, World!</h1>;
\`\`\`

## Components

### Function Components:
\`\`\`jsx
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
\`\`\`

### Class Components:
\`\`\`jsx
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
\`\`\`

## React Hooks

### useState:
\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

### useEffect:
\`\`\`jsx
useEffect(() => {
    // Side effect
}, [dependencies]);
\`\`\``,
        codeExample: `import React, { useState, useEffect } from 'react';

// Functional Component with Hooks
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');

    // Load todos from localStorage on mount
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Save todos to localStorage when todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (inputValue.trim()) {
            const newTodo = {
                id: Date.now(),
                text: inputValue.trim(),
                completed: false,
                createdAt: new Date().toISOString()
            };
            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className="todo-app">
            <h1>Todo App</h1>
            
            <div className="todo-input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="Add a new todo..."
                />
                <button onClick={addTodo}>Add</button>
            </div>

            <div className="filters">
                <button 
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All ({todos.length})
                </button>
                <button 
                    className={filter === 'active' ? 'active' : ''}
                    onClick={() => setFilter('active')}
                >
                    Active ({todos.filter(t => !t.completed).length})
                </button>
                <button 
                    className={filter === 'completed' ? 'active' : ''}
                    onClick={() => setFilter('completed')}
                >
                    Completed ({todos.filter(t => t.completed).length})
                </button>
            </div>

            <ul className="todo-list">
                {filteredTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>

            {filteredTodos.length === 0 && (
                <p className="empty-state">No todos found</p>
            )}
        </div>
    );
}

// Child Component
function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li className={\`todo-item \${todo.completed ? 'completed' : ''}\`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button 
                className="delete-btn"
                onClick={() => onDelete(todo.id)}
            >
                Delete
            </button>
        </li>
    );
}

export default TodoApp;`,
        practiceLinks: [
          { name: 'React Documentation', url: 'https://react.dev/' },
          { name: 'React Tutorial', url: 'https://react.dev/learn' }
        ]
      },
      {
        id: 'hooks-state',
        title: 'Hooks & State Management',
        content: `# React Hooks & State Management

## React Hooks
**Hooks** are functions that let you use state and other React features in functional components.

## useState Hook
Manages local component state:

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

## useEffect Hook
Handles side effects:

\`\`\`jsx
useEffect(() => {
    // Effect logic
    return () => {
        // Cleanup
    };
}, [dependencies]);
\`\`\`

## Custom Hooks
Reusable stateful logic:

\`\`\`jsx
function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);
    
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    
    return { count, increment, decrement };
}
\`\`\`

## State Management Patterns

### Local State:
- Component-specific data
- Form inputs, UI state

### Lifted State:
- Shared between components
- Move state to common parent

### Context API:
- Global state management
- Avoid prop drilling`,
        codeExample: `import React, { useState, useEffect, useContext, createContext } from 'react';

// Context for global state
const ThemeContext = createContext();

// Custom hook for theme
function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

// Theme Provider Component
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook for API data
function useApi(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        
        fetchData();
    }, [url]);
    
    return { data, loading, error };
}

// Component using hooks
function UserProfile({ userId }) {
    const { theme, toggleTheme } = useTheme();
    const { data: user, loading, error } = useApi(\`/api/users/\${userId}\`);
    const [isEditing, setIsEditing] = useState(false);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div className={\`profile \${theme}\`}>
            <button onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'dark' : 'light'} mode
            </button>
            
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit'}
            </button>
            
            {isEditing && (
                <EditForm user={user} onSave={() => setIsEditing(false)} />
            )}
        </div>
    );
}

// Main App
function App() {
    return (
        <ThemeProvider>
            <UserProfile userId={1} />
        </ThemeProvider>
    );
}`,
        practiceLinks: [
          { name: 'React Hooks Guide', url: 'https://react.dev/reference/react' },
          { name: 'State Management Patterns', url: 'https://react.dev/learn/managing-state' }
        ]
      }
    ]
  },
  nodejs: {
    id: 'nodejs',
    title: 'Node.js & Express',
    description: 'Server-side JavaScript with Node.js, Express framework, and REST API development',
    topics: [
      {
        id: 'nodejs-basics',
        title: 'Node.js & Express Fundamentals',
        content: `# Node.js & Express.js

## What is Node.js?
**Node.js** is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows you to run JavaScript on the server.

## Express.js Framework
**Express.js** is a minimal and flexible Node.js web application framework.

## Basic Server Setup:
\`\`\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
\`\`\`

## Middleware
Functions that execute during the request-response cycle:

\`\`\`javascript
app.use(express.json());
app.use(express.static('public'));
\`\`\`

## REST API Routes:
- **GET**: Retrieve data
- **POST**: Create data
- **PUT**: Update data
- **DELETE**: Remove data`,
        codeExample: `const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Todo Schema
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/todos', async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title
        });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`,
        practiceLinks: [
          { name: 'Node.js Documentation', url: 'https://nodejs.org/en/docs/' },
          { name: 'Express.js Guide', url: 'https://expressjs.com/' }
        ]
      },
      {
        id: 'api-development',
        title: 'REST API Development',
        content: `# REST API Development with Express

## REST Principles
**REST (Representational State Transfer)** is an architectural style for designing networked applications.

### HTTP Methods:
- **GET**: Retrieve data
- **POST**: Create new resource
- **PUT**: Update entire resource
- **PATCH**: Partial update
- **DELETE**: Remove resource

## API Design Best Practices

### URL Structure:
- **\`/api/users\`**: Collection of users
- **\`/api/users/123\`**: Specific user
- **\`/api/users/123/posts\`**: User's posts

### Status Codes:
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Server Error

## Middleware
Functions that execute during request-response cycle:

\`\`\`javascript
app.use(express.json());
app.use(cors());
app.use(authenticate);
\`\`\`

## Authentication & Authorization

### JWT (JSON Web Tokens):
- Stateless authentication
- Secure token-based auth
- Include in Authorization header

### Middleware Pattern:
\`\`\`javascript
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    // Verify token
    next();
};
\`\`\``,
        codeExample: `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

// Validation middleware
const validateUser = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ 
            error: 'Email and password are required' 
        });
    }
    
    if (password.length < 6) {
        return res.status(400).json({ 
            error: 'Password must be at least 6 characters' 
        });
    }
    
    next();
};

// Routes

// User registration
app.post('/api/auth/register', validateUser, async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = new User({
            email,
            password: hashedPassword,
            name
        });
        
        await user.save();
        
        // Generate token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User login
app.post('/api/auth/login', validateUser, async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Protected route
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});`,
        practiceLinks: [
          { name: 'REST API Design', url: 'https://restfulapi.net/' },
          { name: 'Express.js Best Practices', url: 'https://expressjs.com/en/advanced/best-practice-security.html' }
        ]
      }
    ]
  },
  mongodb: {
    id: 'mongodb',
    title: 'MongoDB & Database',
    description: 'NoSQL database fundamentals, MongoDB operations, and Mongoose ODM',
    topics: [
      {
        id: 'mongodb-basics',
        title: 'MongoDB Fundamentals',
        content: `# MongoDB & NoSQL Databases

## What is MongoDB?
**MongoDB** is a NoSQL document database that stores data in flexible, JSON-like documents.

## Key Concepts:
- **Document**: Basic unit of data (like JSON)
- **Collection**: Group of documents
- **Database**: Container for collections

## Basic Operations:

### Create:
\`\`\`javascript
db.users.insertOne({name: "John", age: 30});
\`\`\`

### Read:
\`\`\`javascript
db.users.find({age: {$gte: 18}});
\`\`\`

### Update:
\`\`\`javascript
db.users.updateOne({name: "John"}, {$set: {age: 31}});
\`\`\`

### Delete:
\`\`\`javascript
db.users.deleteOne({name: "John"});
\`\`\`

## Mongoose ODM
Object Document Mapper for MongoDB and Node.js:

\`\`\`javascript
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    age: Number
});
\`\`\``,
        codeExample: `const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// Product Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['electronics', 'clothing', 'books', 'home']
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    images: [String],
    tags: [String],
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual for average rating
productSchema.virtual('averageRating').get(function() {
    if (this.ratings.length === 0) return 0;
    const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / this.ratings.length;
});

// Models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// Example usage
async function createUser(userData) {
    try {
        const user = new User(userData);
        const savedUser = await user.save();
        console.log('User created:', savedUser);
        return savedUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function findProducts(filters = {}) {
    try {
        const products = await Product.find(filters)
            .populate('ratings.user', 'username')
            .sort({ createdAt: -1 });
        return products;
    } catch (error) {
        console.error('Error finding products:', error);
        throw error;
    }
}

async function updateProductStock(productId, newStock) {
    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            { stock: newStock },
            { new: true, runValidators: true }
        );
        return product;
    } catch (error) {
        console.error('Error updating stock:', error);
        throw error;
    }
}

module.exports = { User, Product, createUser, findProducts, updateProductStock };`,
        practiceLinks: [
          { name: 'MongoDB Documentation', url: 'https://docs.mongodb.com/' },
          { name: 'Mongoose Guide', url: 'https://mongoosejs.com/' }
        ]
      },
      {
        id: 'data-modeling',
        title: 'Data Modeling & Relationships',
        content: `# MongoDB Data Modeling & Relationships

## Data Modeling Principles

### Document Structure:
- **Embed**: Related data in same document
- **Reference**: Link to other documents
- **Hybrid**: Combination of both approaches

### When to Embed:
- One-to-one relationships
- One-to-few relationships
- Data accessed together
- Atomic updates needed

### When to Reference:
- One-to-many relationships
- Many-to-many relationships
- Large documents
- Independent data lifecycle

## Mongoose Relationships

### Population:
\`\`\`javascript
const user = await User.findById(id).populate('posts');
\`\`\`

### Virtual Population:
\`\`\`javascript
userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
});
\`\`\`

## Indexing for Performance

### Single Field Index:
\`\`\`javascript
db.users.createIndex({ email: 1 });
\`\`\`

### Compound Index:
\`\`\`javascript
db.posts.createIndex({ author: 1, createdAt: -1 });
\`\`\`

### Text Index:
\`\`\`javascript
db.posts.createIndex({ title: 'text', content: 'text' });
\`\`\``,
        codeExample: `const mongoose = require('mongoose');

// User Schema with embedded profile
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: String,
        socialLinks: {
            twitter: String,
            linkedin: String,
            github: String
        }
    },
    preferences: {
        theme: { type: String, default: 'light' },
        notifications: { type: Boolean, default: true },
        language: { type: String, default: 'en' }
    },
    createdAt: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
    return \`\${this.profile.firstName} \${this.profile.lastName}\`;
});

// Virtual populate for user posts
userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
});

// Post Schema with references
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: 'text'
    },
    content: {
        type: String,
        required: true,
        index: 'text'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    tags: [{
        type: String,
        index: true
    }],
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    comments: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    views: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    publishedAt: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Compound indexes for better query performance
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ status: 1, publishedAt: -1 });
postSchema.index({ tags: 1, status: 1 });

// Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    description: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

// Models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Category = mongoose.model('Category', categorySchema);

// Advanced queries with aggregation
async function getPostsWithStats() {
    return await Post.aggregate([
        {
            $match: { status: 'published' }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'authorInfo'
            }
        },
        {
            $addFields: {
                likesCount: { $size: '$likes' },
                commentsCount: { $size: '$comments' },
                author: { $arrayElemAt: ['$authorInfo', 0] }
            }
        },
        {
            $project: {
                title: 1,
                content: 1,
                'author.username': 1,
                'author.profile.firstName': 1,
                'author.profile.lastName': 1,
                likesCount: 1,
                commentsCount: 1,
                views: 1,
                createdAt: 1
            }
        },
        {
            $sort: { createdAt: -1 }
        }
    ]);
}

module.exports = { User, Post, Category, getPostsWithStats };`,
        practiceLinks: [
          { name: 'MongoDB Schema Design', url: 'https://docs.mongodb.com/manual/data-modeling/' },
          { name: 'Mongoose Population', url: 'https://mongoosejs.com/docs/populate.html' }
        ]
      }
    ]
  }
};