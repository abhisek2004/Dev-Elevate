import React, { useState } from 'react';
import CounselorResultCard from '../components/CounselorResultCard';

interface IResult {
  role: string;
  match: string;
}

const CareerCounselor: React.FC = () => {
  const [skills, setSkills] = useState<string>('');
  const [results, setResults] = useState<IResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('/api/counselor/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An unknown error occurred.');
      }

      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze skills. Check the server connection and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 text-center">
      <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100">AI Career Counselor</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">Enter your skills to discover matching career paths.</p>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          className="w-full md:w-3/4 p-3 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Enter your skills, separated by commas (e.g., React, Node.js, Python, SQL, AWS)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="mt-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 transition-all duration-300"
          disabled={loading || !skills}
        >
          {loading ? 'Analyzing...' : 'Analyze My Skills'}
        </button>
      </form>

      {error && <p className="text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-200 p-3 rounded-lg">{error}</p>}

      {results.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) => (
            <CounselorResultCard key={index} role={result.role} match={result.match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerCounselor;