import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import axios from "axios";

const languages = [
  { name: "C", id: 104 },
  { name: "C++", id: 54 },
  { name: "Java", id: 62 },
  { name: "Python", id: 71 },
  { name: "JavaScript", id: 63 },
  { name: "HTML/CSS/JS", id: "web" },
];

const CompilerPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>");
  const [cssCode, setCssCode] = useState("h1 { color: red; }");
  const [jsCode, setJsCode] = useState('console.log("Hello");');

  const srcDoc = useMemo(() => {
    return `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
  }, [htmlCode, cssCode, jsCode]);

  const handleRun = async () => {
    const encodedCode = btoa(code);
    const response = await axios.post("http://localhost:4000/api/v1/compiler", {
      source_code: encodedCode,
      language_id: selectedLanguage.id,
      stdin: stdin,
      is_base64: true,
    });

    const data = (await response.data) as {
      stdout?: string;
      stderr?: string;
      compile_output?: string;
    };
    if (data?.stdout) {
      setOutput(data.stdout);
    } else if (data.stderr) {
      setOutput(data.stderr);
    } else if (data.compile_output) {
      setOutput(data.compile_output);
    } else {
      setOutput("No output");
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-3xl font-bold text-white">Code Compiler</h1>
          <p className="text-gray-400">
            Insert code and run it in various languages
          </p>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 mb-8 bg-gray-800 border border-gray-700 rounded-lg"
        >
          <div className="flex flex-col gap-4 lg:flex-row">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Language
              </label>
              <select
                value={selectedLanguage.name}
                onChange={(e) =>
                  setSelectedLanguage(
                    languages.find((lang) => lang.name === e.target.value) as
                      | { name: string; id: number }
                      | { name: string; id: string }
                  )
                }
                className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-electric-400 focus:outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang.name} value={lang.name}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Code Editor Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg">
            {selectedLanguage.id === "web" ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    HTML
                  </label>
                  <textarea
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    className="w-full h-64 p-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-electric-400 focus:outline-none"
                    placeholder="Enter HTML code..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    CSS
                  </label>
                  <textarea
                    value={cssCode}
                    onChange={(e) => setCssCode(e.target.value)}
                    className="w-full h-64 p-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-electric-400 focus:outline-none"
                    placeholder="Enter CSS code..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    JavaScript
                  </label>
                  <textarea
                    value={jsCode}
                    onChange={(e) => setJsCode(e.target.value)}
                    className="w-full h-64 p-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-electric-400 focus:outline-none"
                    placeholder="Enter JS code..."
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Code
                  </label>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 p-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-electric-400 focus:outline-none"
                    placeholder="Enter code..."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Input (stdin)
                  </label>
                  <textarea
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    className="w-full h-64 p-4 text-white bg-gray-700 border border-gray-600 rounded-lg focus:border-electric-400 focus:outline-none"
                    placeholder="Enter input..."
                  />
                </div>
              </div>
            )}
            <button
              onClick={handleRun}
              className="flex items-center px-4 py-3 mt-4 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Run Code</span>
            </button>
          </div>
        </motion.div>

        {/* Output / Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-gray-800 border border-gray-700 rounded-lg"
        >
          <h2 className="mb-4 text-xl font-bold text-white">
            Output / Preview
          </h2>
          {selectedLanguage.id === "web" ? (
            <iframe
              srcDoc={srcDoc}
              title="preview"
              sandbox="allow-scripts"
              className="w-full border border-gray-600 h-96"
            />
          ) : (
            <pre className="p-4 overflow-auto text-white bg-gray-700 rounded-lg">
              {output}
            </pre>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CompilerPage;
