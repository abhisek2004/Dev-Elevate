import { Check, X } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';

const VarLetConst = () => {
    const comparisonTable = [
        {
            keyword: 'var',
            scope: 'Function or global',
            reassignment: 'Allowed',
            redeclaration: 'Allowed',
            example: 'var x = 10;'
        },
        {
            keyword: 'let',
            scope: 'Block',
            reassignment: 'Allowed',
            redeclaration: 'Not allowed',
            example: 'let y = 20;'
        },
        {
            keyword: 'const',
            scope: 'Block',
            reassignment: 'Not allowed',
            redeclaration: 'Not allowed',
            example: 'const z = 30;'
        }
    ];

    const examples = [
        {
            title: 'Var Hoisting',
            code: 'console.log(x); // undefined\nvar x = 5;\nconsole.log(x); // 5',
            explanation: 'Variables declared with var are hoisted to the top of their scope and initialized with undefined.'
        },
        {
            title: 'Let/Const Temporal Dead Zone',
            code: 'console.log(y); // ReferenceError\nlet y = 10;',
            explanation: 'let and const declarations are hoisted but not initialized, causing a ReferenceError if accessed before declaration.'
        },
        {
            title: 'Block Scoping',
            code: 'if (true) {\n  var a = 1;\n  let b = 2;\n  const c = 3;\n}\nconsole.log(a); // 1\nconsole.log(b); // ReferenceError\nconsole.log(c); // ReferenceError',
            explanation: 'let and const are block-scoped, while var is function-scoped.'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">Var</span> vs <span className="text-primary-600 dark:text-primary-400">Let</span> vs <span className="text-primary-600 dark:text-primary-400">Const</span>
            </h1>

            <div className="prose max-w-none">
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    In JavaScript, there are three ways to declare variables: <code className="text-primary-600 dark:text-primary-400">var</code>, <code className="text-primary-600 dark:text-primary-400">let</code>, and <code className="text-primary-600 dark:text-primary-400">const</code>. Each has its own rules and use cases, and understanding their differences is crucial for writing effective and maintainable code.
                </p>

                <div className="mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <p className="text-primary-500 dark:text-primary-400">
                        <strong className="font-semibold">Note: </strong> In modern JavaScript, it's recommended to use <code className="font-semibold">const</code> by default, <code className="font-semibold">let</code> when you need to reassign variables, and avoid using <code className="font-semibold">var</code> in new code.
                    </p>
                </div>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Comparison Table</h2>
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-900 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-950">
                                <tr className='border-b border-gray-200 dark:border-gray-600'>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Keyword</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Scope</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Reassignment</th>
                                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Redeclaration</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Example</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {comparisonTable.map((item, index) => (
                                    <tr key={index} className='hover:bg-gray-50 dark:hover:bg-gray-900'>
                                        <td className="px-4 py-3 text-sm font-medium text-primary-600 dark:text-primary-400"><code>{item.keyword}</code></td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{item.scope}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-center">
                                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${item.reassignment === 'Allowed' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'}`}>
                                                    {item.reassignment === 'Allowed' ? <Check size={16} /> : <X size={16} />}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-center">
                                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${item.redeclaration === 'Allowed' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'}`}>
                                                    {item.redeclaration === 'Allowed' ? <Check size={16} /> : <X size={16} />}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-mono">{item.example}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Key Differences</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">1. Scope</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li><code className="text-primary-600 dark:text-primary-400">var</code> is function-scoped or globally-scoped</li>
                                <li><code className="text-primary-600 dark:text-primary-400">let</code> and <code className="text-primary-600 dark:text-primary-400">const</code> are block-scoped (any code within curly braces <code className="text-primary-600 dark:text-primary-400">{`{}`}</code>)</li>
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">2. Hoisting</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li><code className="text-primary-600 dark:text-primary-400">var</code> declarations are hoisted and initialized with <code>undefined</code></li>
                                <li><code className="text-primary-600 dark:text-primary-400">let</code> and <code className="text-primary-600 dark:text-primary-400">const</code> are hoisted but not initialized (Temporal Dead Zone)</li>
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">3. Reassignment</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li><code className="text-primary-600 dark:text-primary-400">var</code> and <code className="text-primary-600 dark:text-primary-400">let</code> can be reassigned</li>
                                <li><code className="text-primary-600 dark:text-primary-400">const</code> cannot be reassigned (but object/array contents can be modified)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Code Examples</h2>
                    <div className="space-y-6">
                        {examples.map((example, index) => (
                            <div key={index} className="bg-white dark:bg-black p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                                <CodeBlock code={example.code} />
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{example.explanation}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="mt-8 bg-white dark:bg-black p-6 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Best Practices</h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Prefer <code className="text-primary-600 dark:text-primary-400 font-medium">const</code> by default for variables that won't be reassigned</li>
                        <li>Use <code className="text-primary-600 dark:text-primary-400 font-medium">let</code> when you need to reassign variables</li>
                        <li>Avoid using <code className="text-primary-600 dark:text-primary-400 font-medium">var</code> in new code due to function-scoping issues</li>
                        <li>Group related variable declarations together for better readability</li>
                        <li>Initialize variables when you declare them to avoid undefined behavior</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default VarLetConst;