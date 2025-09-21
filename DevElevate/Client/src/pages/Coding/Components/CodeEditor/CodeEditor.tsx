import React, { useState, useCallback, useRef, useEffect } from "react";
import { Play, Save, Lightbulb, Zap, Settings } from "lucide-react";
import { languages } from "../../Data/languages";
import type { Language } from "../../Types";
import { motion, AnimatePresence } from "framer-motion";
import * as monaco from "monaco-editor";
import Editor, { Monaco } from "@monaco-editor/react";

interface CodeEditorProps {
  initialCode?: string;
  language: string;
  onLanguageChange: (language: string) => void;
  onCodeChange: (code: string) => void;
  onRun: (code: string, language: string) => void;
  onSubmit: (code: string, language: string) => void;
  isRunning?: boolean;
  isSubmitting?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = "",
  language,
  onLanguageChange,
  onCodeChange,
  onRun,
  onSubmit,
  isRunning = false,
  isSubmitting = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [theme, setTheme] = useState<"vs-dark" | "vs">("vs-dark");
  const [showSettings, setShowSettings] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleCodeChange = useCallback(
    (value: string | undefined) => {
      const newCode = value || "";
      setCode(newCode);
      onCodeChange(newCode);
    },
    [onCodeChange]
  );

  // When language changes, update the Monaco editor model
  useEffect(() => {
    if (editorRef.current) {
      const currentModel = editorRef.current.getModel();
      if (currentModel) {
        monaco.editor.setModelLanguage(
          currentModel,
          getMonacoLanguage(language)
        );
      }
    }
  }, [language]);

  // Update editor content when initialCode changes
  useEffect(() => {
    if (editorRef.current && initialCode !== code) {
      setCode(initialCode);
      editorRef.current.setValue(initialCode);
    }
  }, [initialCode]);

  const currentLanguage = languages.find((lang) => lang.id === language);

  // Map our language IDs to Monaco language IDs
  const getMonacoLanguage = (languageId: string): string => {
    const lang = languages.find((l) => l.id === languageId);
    return lang?.monacoLanguage || "plaintext";
  };

  // Handle Monaco editor mount
  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;

    // Add any custom editor configurations here
    editor.addAction({
      id: "run-code",
      label: "Run Code",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => onRun(code, language),
    });

    editor.addAction({
      id: "submit-code",
      label: "Submit Solution",
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
      ],
      run: () => onSubmit(code, language),
    });
  };

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineHeight: 1.5,
    fontFamily: "JetBrains Mono, Monaco, Cascadia Code, Roboto Mono, monospace",
    scrollBeyondLastLine: false,
    renderLineHighlight: "line" as const,
    selectOnLineNumbers: true,
    automaticLayout: true,
    tabSize: 2,
    insertSpaces: true,
    wordWrap: "on" as const,
    bracketPairColorization: { enabled: true },
  };

  return (
    <div className="flex overflow-hidden flex-col h-full bg-gray-800 rounded-lg border border-gray-700">
      {/* Editor Header */}
      <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="px-3 py-2 text-white bg-gray-800 rounded-lg border border-gray-600 transition-colors focus:border-electric-400 focus:outline-none"
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name} ({lang.version})
              </option>
            ))}
          </select>

          <div className="text-sm text-gray-400">
            {currentLanguage?.name} • {code.split("\n").length} lines
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center px-3 py-2 space-x-1 text-gray-300 bg-gray-800 rounded-lg transition-colors hover:bg-gray-700"
          >
            <Settings className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-3 py-2 space-x-1 text-white bg-yellow-600 rounded-lg transition-colors hover:bg-yellow-700"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Hint</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRun(code, language)}
            disabled={isRunning}
            className="flex items-center px-3 py-2 space-x-1 text-white bg-green-600 rounded-lg transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <div className="w-4 h-4 rounded-full border-2 border-white animate-spin border-t-transparent" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isRunning ? "Running..." : "Run"}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSubmit(code, language)}
            disabled={isSubmitting}
            className="flex items-center px-4 py-2 space-x-1 text-white bg-gradient-to-r rounded-lg transition-all duration-200 from-electric-400 to-neon-500 hover:from-electric-500 hover:to-neon-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 rounded-full border-2 border-white animate-spin border-t-transparent" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
          </motion.button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-4 bg-gray-900 border-b border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <label className="text-sm text-gray-300">Theme:</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as "vs-dark" | "vs")}
                className="px-3 py-1 text-white bg-gray-800 rounded border border-gray-600 focus:border-electric-400 focus:outline-none"
              >
                <option value="vs-dark">Dark</option>
                <option value="vs">Light</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          value={code}
          theme={theme}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
          options={editorOptions}
          className="overflow-hidden"
          loading={
            <div className="flex items-center justify-center h-full text-gray-400">
              Loading editor...
            </div>
          }
        />
      </div>
    </div>
  );
};

export default CodeEditor;
