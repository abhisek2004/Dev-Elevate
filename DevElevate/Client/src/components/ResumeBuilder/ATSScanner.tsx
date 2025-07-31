import React, { useState } from 'react';
import { Upload, ScanLine, CheckCircle2, AlertCircle } from 'lucide-react';

// Inline Button Component
const Button = ({
  children,
  onClick,
  className = '',
  type = 'button',
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 rounded text-sm font-medium transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white ${className}`}
    >
      {children}
    </button>
  );
};

// Mock ATS scan result
const mockResults = {
  score: 78,
  passedSections: ['Personal Info', 'Experience', 'Education'],
  suggestions: ['Add more keywords relevant to job description', 'Include measurable achievements'],
};

const ATSScanner: React.FC = () => {
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [scanTriggered, setScanTriggered] = useState(false);

  const handleScan = () => {
    // Simulate scan logic
    setScanTriggered(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2">
        <ScanLine className="w-6 h-6 text-blue-500" />
        ATS Scanner
      </h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium dark:text-white">Upload your Resume below (.pdf / .docs / .txt)</label>
        <input
          type="file"
          accept=".pdf,.doc,.txt"
          onChange={(e) => setJdFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <Button onClick={handleScan} className="mb-4">
        Run ATS Scan
      </Button>

      {scanTriggered && (
        <div className="mt-6">
          <div className="mb-2 text-lg font-semibold dark:text-white">Score: {mockResults.score}%</div>

          <div className="mb-2">
            <h4 className="font-semibold dark:text-white">✅ Passed Sections:</h4>
            <ul className="list-disc list-inside text-green-500">
              {mockResults.passedSections.map((section) => (
                <li key={section} className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> {section}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold dark:text-white">⚠️ Suggestions:</h4>
            <ul className="list-disc list-inside text-yellow-400">
              {mockResults.suggestions.map((tip) => (
                <li key={tip} className="flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSScanner;
