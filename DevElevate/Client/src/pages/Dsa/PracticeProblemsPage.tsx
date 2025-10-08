import { useGlobalState } from "../../contexts/GlobalContext";
import { useMemo, useState } from "react";
import { sampleTopics, type Topic } from "./data/questions";

export default function PracticeProblemsPage() {
  const { state } = useGlobalState();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const topics: Topic[] = sampleTopics;
  const filteredTopics = useMemo(() => {
    return topics
      .map(t => ({
        ...t,
        questions: t.questions.filter(q => {
          const matchesSearch = !search || q.title.toLowerCase().includes(search.toLowerCase());
          const matchesDifficulty = !difficulty || q.difficulty === difficulty;
          return matchesSearch && matchesDifficulty;
        })
      }))
      .filter(t => t.questions.length > 0);
  }, [topics, search, difficulty]);

  return (
    <div className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="px-4 py-8 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className={`text-3xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>DSA Practice Problems</h1>
          <p className={`${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Topic-wise problems and company-wise sets.</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3 items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problems..."
            className={`w-full max-w-md px-4 py-2 rounded-lg border ${state.darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={`px-3 py-2 rounded-lg border ${state.darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option value="">All difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="space-y-8">
          {filteredTopics.map((t) => (
            <div key={t.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>{t.name}</h2>
                <span className="text-sm text-blue-600">{t.questions.length} problems</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.questions.map((q) => (
                  <a key={q.id} href={q.links.leetcode || q.links.gfg || q.links.hackerrank || q.links.spoj || q.links.ninja || q.links.code || q.links.custom || '#'} target="_blank" rel="noreferrer"
                    className={`rounded-xl border p-4 hover:shadow transition ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className={`text-sm px-2 py-0.5 rounded-full ${q.difficulty === 'easy' ? 'bg-green-100 text-green-700' : q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{q.difficulty}</div>
                    </div>
                    <div className={`font-medium ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>{q.title}</div>
                    {q.solutionLink && (
                      <div className="mt-2 text-sm text-blue-600">
                        Solution ↗
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


