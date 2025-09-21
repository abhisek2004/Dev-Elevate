import CodeBlock from "../../components/CodeBlock";
const WhatAreVariables = () => {
    const dataTypes = [
        {
            type: "Number",
            example: "42, 3.14, -1",
            description: "Numeric values, including integers and floating-point numbers"
        },
        {
            type: "String",
            example: '"Hello", \'World\`\'`',
            description: "Textual data, can be in single or double quotes"
        },
        {
            type: "Boolean",
            example: "true, false",
            description: "Logical values representing true or false"
        },
        {
            type: "Array",
            example: "[1, 2, 3], [\"a\", \"b\"]",
            description: "Ordered list of values, can contain multiple data types"
        },
        {
            type: "Object",
            example: "{ name: \"John\", age: 30 }",
            description: "Collection of key-value pairs"
        },
        {
            type: "null & undefined",
            example: "null, undefined",
            description: "Special values representing no value or uninitialized variable"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                What are <span className='text-primary-600 dark:text-primary-400'>Variables</span>?
            </h1>

            <div className="prose max-w-none">
                <section className="mb-8">
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        In JavaScript, variables are used to store data. They are an essential part of any programming language, 
                        as they allow you to store, retrieve, and manipulate data in your programs.
                    </p>

                    <div className={`mb-6 bg-white dark:bg-black p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-colors`}>
                        <p className="text-primary-500 dark:text-primary-400">
                            <strong className="font-semibold">Key Concept:</strong> Think of variables as labeled boxes where you can store information and refer to it later by its label.
                        </p>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Declaring Variables</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        There are three ways to declare variables in JavaScript, each with its own scope and usage rules:
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md">
                            <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">var</h3>
                            <CodeBlock code="var name = 'John';" />
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                <li>Function-scoped or globally scoped</li>
                                <li>Can be re-declared and updated</li>
                                <li>Hoisted to the top of their scope</li>
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md">
                            <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">let</h3>
                            <CodeBlock code="let age = 25;" />
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                <li>Block-scoped</li>
                                <li>Can be updated but not re-declared</li>
                                <li>Not hoisted</li>
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-black p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md">
                            <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-3">const</h3>
                            <CodeBlock code="const PI = 3.14159;" />
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                <li>Block-scoped</li>
                                <li>Cannot be updated or re-declared</li>
                                <li>Must be initialized during declaration</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Data Types in JavaScript</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        JavaScript is a loosely typed language, meaning you don't need to specify the data type when declaring a variable. 
                        The data type is determined automatically based on the value assigned to it.
                    </p>

                    <div className="overflow-x-auto mb-8">
                        <table className="min-w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr className='border-b border-gray-200 dark:border-gray-700'>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Data Type</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Example</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {dataTypes.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{item.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 font-mono">{item.example}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{item.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default WhatAreVariables;
