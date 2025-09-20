import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { evaluate } from 'mathjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphFunction {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
}

const GraphingCalculator: React.FC = () => {
  const [functions, setFunctions] = useState<GraphFunction[]>([
    { id: '1', expression: 'sin(x)', color: '#3B82F6', visible: true }
  ]);
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const [newExpression, setNewExpression] = useState('');

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#F97316'];

  const generateData = useCallback((expression: string) => {
    const points = [];
    const step = (xMax - xMin) / 200;
    
    for (let x = xMin; x <= xMax; x += step) {
      try {
        const y = evaluate(expression.replace(/x/g, x.toString()));
        if (typeof y === 'number' && isFinite(y)) {
          points.push({ x, y });
        }
      } catch (error) {
        // Skip invalid points
      }
    }
    
    return points;
  }, [xMin, xMax]);

  const chartData = {
    datasets: functions
      .filter(func => func.visible && func.expression)
      .map(func => ({
        label: `y = ${func.expression}`,
        data: generateData(func.expression),
        borderColor: func.color,
        backgroundColor: func.color + '20',
        fill: false,
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.1,
      })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Function Graphs',
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        position: 'center' as const,
        min: xMin,
        max: xMax,
        grid: {
          color: '#E5E7EB',
        },
      },
      y: {
        type: 'linear' as const,
        position: 'center' as const,
        min: yMin,
        max: yMax,
        grid: {
          color: '#E5E7EB',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const addFunction = useCallback(() => {
    if (newExpression.trim()) {
      const newFunction: GraphFunction = {
        id: Date.now().toString(),
        expression: newExpression.trim(),
        color: colors[functions.length % colors.length],
        visible: true,
      };
      setFunctions(prev => [...prev, newFunction]);
      setNewExpression('');
    }
  }, [newExpression, functions.length]);

  const removeFunction = useCallback((id: string) => {
    setFunctions(prev => prev.filter(func => func.id !== id));
  }, []);

  const toggleFunction = useCallback((id: string) => {
    setFunctions(prev =>
      prev.map(func =>
        func.id === id ? { ...func, visible: !func.visible } : func
      )
    );
  }, []);

  const presetFunctions = [
    'sin(x)', 'cos(x)', 'tan(x)', 'x^2', 'x^3', 'sqrt(x)', 'log(x)', 'exp(x)'
  ];

  return (
    <div className="p-4 h-full overflow-auto">
      {/* Graph */}
      <div className="mb-4 h-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Range Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Graph Range</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">X Min</label>
              <input
                type="number"
                value={xMin}
                onChange={(e) => setXMin(Number(e.target.value))}
                className="w-full p-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">X Max</label>
              <input
                type="number"
                value={xMax}
                onChange={(e) => setXMax(Number(e.target.value))}
                className="w-full p-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">Y Min</label>
              <input
                type="number"
                value={yMin}
                onChange={(e) => setYMin(Number(e.target.value))}
                className="w-full p-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">Y Max</label>
              <input
                type="number"
                value={yMax}
                onChange={(e) => setYMax(Number(e.target.value))}
                className="w-full p-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Add Function */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Add Function</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newExpression}
              onChange={(e) => setNewExpression(e.target.value)}
              placeholder="Enter function (e.g., sin(x), x^2)"
              className="flex-1 p-2 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
              onKeyPress={(e) => e.key === 'Enter' && addFunction()}
            />
            <motion.button
              onClick={addFunction}
              className="px-3 py-2 bg-blue-500 text-white rounded font-medium text-sm hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add
            </motion.button>
          </div>
          
          {/* Preset Functions */}
          <div className="flex flex-wrap gap-1">
            {presetFunctions.map((func) => (
              <motion.button
                key={func}
                onClick={() => setNewExpression(func)}
                className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {func}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Function List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Functions</h3>
          <div className="space-y-2">
            {functions.map((func) => (
              <motion.div
                key={func.id}
                className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: func.color }}
                />
                <span className="flex-1 text-sm font-mono">{func.expression}</span>
                <button
                  onClick={() => toggleFunction(func.id)}
                  className={`px-2 py-1 text-xs rounded ${
                    func.visible ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  {func.visible ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => removeFunction(func.id)}
                  className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ×
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphingCalculator;