import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { evaluate, sin, cos, tan, log, log10, sqrt, pow, factorial } from 'mathjs';
import { useCalculatorHistory } from '../../../contexts/CalculatorHistoryContext';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const { addCalculation } = useCalculatorHistory();

  const appendToExpression = useCallback((value: string) => {
    setExpression(prev => prev + value);
    setDisplay(prev => prev === '0' ? value : prev + value);
  }, []);

  const calculate = useCallback(() => {
    try {
      const result = evaluate(expression || display);
      const calculation = {
        expression: expression || display,
        result: String(result),
        timestamp: Date.now(),
        type: 'scientific' as const
      };
      addCalculation(calculation);
      setDisplay(String(result));
      setExpression('');
    } catch (error) {
      setDisplay('Error');
    }
  }, [expression, display, addCalculation]);

  const clear = useCallback(() => {
    setDisplay('0');
    setExpression('');
  }, []);

  const applyFunction = useCallback((func: string, value?: number) => {
    try {
      const inputValue = value !== undefined ? value : parseFloat(display);
      let result: number;

      switch (func) {
        case 'sin':
          result = angleMode === 'deg' ? sin(inputValue * Math.PI / 180) : sin(inputValue);
          break;
        case 'cos':
          result = angleMode === 'deg' ? cos(inputValue * Math.PI / 180) : cos(inputValue);
          break;
        case 'tan':
          result = angleMode === 'deg' ? tan(inputValue * Math.PI / 180) : tan(inputValue);
          break;
        case 'log':
          result = log10(inputValue);
          break;
        case 'ln':
          result = log(inputValue);
          break;
        case 'sqrt':
          result = sqrt(inputValue);
          break;
        case 'square':
          result = pow(inputValue, 2);
          break;
        case 'cube':
          result = pow(inputValue, 3);
          break;
        case 'factorial':
          result = factorial(inputValue);
          break;
        case 'exp':
          result = Math.exp(inputValue);
          break;
        case '1/x':
          result = 1 / inputValue;
          break;
        default:
          result = inputValue;
      }

      const calculation = {
        expression: `${func}(${inputValue})`,
        result: String(result),
        timestamp: Date.now(),
        type: 'scientific' as const
      };
      addCalculation(calculation);
      setDisplay(String(result));
      setExpression('');
    } catch (error) {
      setDisplay('Error');
    }
  }, [display, angleMode, addCalculation]);

  const scientificButtons = [
    { label: angleMode.toUpperCase(), action: () => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg'), className: 'bg-purple-500 text-white' },
    { label: 'sin', action: () => applyFunction('sin'), className: 'bg-blue-500 text-white' },
    { label: 'cos', action: () => applyFunction('cos'), className: 'bg-blue-500 text-white' },
    { label: 'tan', action: () => applyFunction('tan'), className: 'bg-blue-500 text-white' },
    
    { label: 'ln', action: () => applyFunction('ln'), className: 'bg-green-500 text-white' },
    { label: 'log', action: () => applyFunction('log'), className: 'bg-green-500 text-white' },
    { label: 'e^x', action: () => applyFunction('exp'), className: 'bg-green-500 text-white' },
    { label: '10^x', action: () => applyFunction('10^x'), className: 'bg-green-500 text-white' },
    
    { label: 'x²', action: () => applyFunction('square'), className: 'bg-orange-500 text-white' },
    { label: 'x³', action: () => applyFunction('cube'), className: 'bg-orange-500 text-white' },
    { label: '√x', action: () => applyFunction('sqrt'), className: 'bg-orange-500 text-white' },
    { label: '∛x', action: () => appendToExpression('cbrt('), className: 'bg-orange-500 text-white' },
    
    { label: 'x!', action: () => applyFunction('factorial'), className: 'bg-red-500 text-white' },
    { label: '1/x', action: () => applyFunction('1/x'), className: 'bg-red-500 text-white' },
    { label: 'π', action: () => appendToExpression('pi'), className: 'bg-indigo-500 text-white' },
    { label: 'e', action: () => appendToExpression('e'), className: 'bg-indigo-500 text-white' },
  ];

  const basicButtons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  return (
    <div className="p-4 h-full">
      {/* Display */}
      <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-right">
          {expression && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {expression}
            </div>
          )}
          <div className="text-2xl font-mono text-gray-900 dark:text-white overflow-hidden">
            {display}
          </div>
          <div className="text-xs text-blue-500 mt-1">
            Angle: {angleMode.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Scientific Functions */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {scientificButtons.map((button, index) => (
          <motion.button
            key={button.label}
            onClick={button.action}
            className={`p-2 rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 ${button.className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
          >
            {button.label}
          </motion.button>
        ))}
      </div>

      {/* Basic Functions */}
      <div className="grid grid-cols-4 gap-2">
        {basicButtons.map((button, index) => (
          <motion.button
            key={button}
            onClick={() => {
              if (button === '=') {
                calculate();
              } else if (['+', '-', '*', '/'].includes(button)) {
                appendToExpression(button);
              } else {
                appendToExpression(button);
              }
            }}
            className={`p-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 ${
              button === '=' ? 'bg-green-500 hover:bg-green-600 text-white' :
              ['+', '-', '*', '/'].includes(button) ? 'bg-blue-500 hover:bg-blue-600 text-white' :
              'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (scientificButtons.length + index) * 0.02 }}
          >
            {button}
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={clear}
        className="w-full mt-4 p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Clear
      </motion.button>
    </div>
  );
};

export default ScientificCalculator;