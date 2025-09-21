import React from "react";
import { useGlobalState } from '../../../contexts/GlobalContext';

const reactbasic = [
  {
    id: 1,
    title: "Introduction to React Patterns",
    content:
      "React patterns are reusable solutions for common design problems in React applications. They help make code more scalable, maintainable, and easier to reason about."
  },
  {
    id: 2,
    title: "Functional Components",
    content:
      "Functional components are the modern standard in React. They are simpler than class components and work seamlessly with hooks.",
    code: `function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}`
  },
  {
    id: 3,
    title: "Higher-Order Components (HOC)",
    content:
      "A Higher-Order Component is a function that takes a component and returns a new one, adding extra behavior or props.",
    code: `const withLogger = (Wrapped) => {
  return (props) => {
    console.log("Props:", props);
    return <Wrapped {...props} />;
  };
};`
  },
  {
    id: 4,
    title: "Render Props",
    content:
      "Render Props is a pattern where a component accepts a function as a prop to decide what to render.",
    code: `const DataProvider = ({ render }) => {
  const data = [1, 2, 3];
  return render(data);
};

// Usage
<DataProvider render={(data) => <ul>{data.map(i => <li>{i}</li>)}</ul>} />`
  },
  {
    id: 5,
    title: "Compound Components",
    content:
      "Compound components allow you to build a parent component that manages state while child components handle rendering.",
    code: `function Tabs({ children }) {
  const [active, setActive] = React.useState(0);
  return (
    <div>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, { active, setActive, i })
      )}
    </div>
  );
}`
  },
  {
    id: 6,
    title: "Custom Hooks",
    content:
      "Custom hooks let you extract reusable logic into functions that start with 'use'.",
    code: `function useCounter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}`
  },
  {
    id: 7,
    title: "Context API",
    content:
      "The Context API provides a way to pass data deeply without prop drilling.",
    code: `const ThemeContext = React.createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}`
  },
  {
    id: 8,
    title: "Reducer Pattern",
    content:
      "Using useReducer centralizes state logic in a reducer function, improving predictability.",
    code: `function reducer(state, action) {
  switch(action.type) {
    case "inc": return { count: state.count + 1 };
    default: return state;
  }
}`
  },
  {
    id: 9,
    title: "State Colocation",
    content:
      "Keep state as close as possible to where it is used to avoid unnecessary prop drilling."
  },
  {
    id: 10,
    title: "Controlled vs Uncontrolled Components",
    content:
      "Controlled components have their state managed by React, while uncontrolled ones use refs.",
    code: `<input value={text} onChange={e => setText(e.target.value)} />`
  },
  {
    id: 11,
    title: "Provider Pattern",
    content:
      "The provider pattern exposes state and actions via context to multiple children."
  },
  {
    id: 12,
    title: "Layout Component Pattern",
    content:
      "Encapsulate reusable UI layouts into dedicated components (e.g., Page, SidebarLayout)."
  },
  {
    id: 13,
    title: "Hooks Factory",
    content:
      "Build hooks that return state + helper methods for predictable APIs."
  },
  {
    id: 14,
    title: "State Reducer Pattern",
    content:
      "Allow consumers to override reducer logic for maximum flexibility."
  },
  {
    id: 15,
    title: "Props Getters",
    content:
      "Expose utility props through functions to avoid prop conflicts.",
    code: `function useToggle() {
  const [on, setOn] = React.useState(false);
  const getTogglerProps = (props) => ({
    ...props,
    onClick: () => setOn(!on),
  });
  return { on, getTogglerProps };
}`
  },
  {
    id: 16,
    title: "Slot Pattern",
    content:
      "Slots allow you to insert components into specific parts of another component’s layout."
  },
  {
    id: 17,
    title: "Container-Presenter Pattern",
    content:
      "Separates logic (container) from UI (presenter), making code more modular."
  },
  {
    id: 18,
    title: "Error Boundary Pattern",
    content:
      "Error boundaries catch errors in React component trees and show fallback UIs.",
    code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? "Error!" : this.props.children; }
}`
  },
  {
    id: 19,
    title: "Suspense Pattern",
    content:
      "Suspense allows components to wait for asynchronous data before rendering.",
    code: `const MyComponent = React.lazy(() => import("./Other"));`
  },
  {
    id: 20,
    title: "Code Splitting",
    content:
      "Split bundles into smaller pieces for performance. Achieved with dynamic import()."
  },
  {
    id: 21,
    title: "Portal Pattern",
    content:
      "Render children into a DOM node outside of the parent hierarchy.",
    code: `ReactDOM.createPortal(<Modal />, document.body);`
  },
  {
    id: 22,
    title: "Render Optimization",
    content:
      "Use memo, useMemo, and useCallback to prevent unnecessary renders."
  },
  {
    id: 23,
    title: "Forward Ref Pattern",
    content:
      "Forward refs allow parent components to directly access child DOM nodes.",
    code: `const Input = React.forwardRef((props, ref) => <input ref={ref} {...props} />);`
  },
  {
    id: 24,
    title: "Immutable State Updates",
    content:
      "Always return new state objects when updating state to avoid bugs."
  },
  {
    id: 25,
    title: "Summary & Best Practices",
    content:
      "React patterns improve scalability and maintainability. Key takeaways: keep components small, colocate state, use hooks, and apply patterns thoughtfully to avoid over-engineering."
  }
];

const ReactPattern = () => {
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
            React Patterns
          </h1>
          <div className={`h-1 w-32 mx-auto rounded-full bg-gradient-to-r ${state.darkMode ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'} mb-4`}></div>
          <p className={`mt-2 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${state.darkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            A comprehensive guide to React patterns and best practices
          </p>
        </div>
        <div className="pyfund-vertical-stack">
          {reactbasic.length === 0 ? (
            <div style={{ color: '#ff6b6b', textAlign: 'center', fontSize: '1.2rem', marginTop: '40px' }}>No notes available.</div>
          ) : (
            reactbasic.map(note => (
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

export default ReactPattern;
