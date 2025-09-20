import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Calculation {
  expression: string;
  result: string;
  timestamp: number;
  type: 'basic' | 'scientific' | 'financial' | 'physics';
}

interface CalculatorHistoryContextType {
  calculations: Calculation[];
  addCalculation: (calculation: Calculation) => void;
  clearHistory: () => void;
  removeCalculation: (timestamp: number) => void;
}

const CalculatorHistoryContext = createContext<CalculatorHistoryContextType | undefined>(undefined);

export const CalculatorHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [calculations, setCalculations] = useState<Calculation[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('calculator-history');
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        return [];
      }
    }
    return [];
  });

  const addCalculation = (calculation: Calculation) => {
    setCalculations(prev => {
      const newCalculations = [calculation, ...prev].slice(0, 100); // Keep only last 100
      return newCalculations;
    });
  };

  const clearHistory = () => {
    setCalculations([]);
  };

  const removeCalculation = (timestamp: number) => {
    setCalculations(prev => prev.filter(calc => calc.timestamp !== timestamp));
  };

  useEffect(() => {
    localStorage.setItem('calculator-history', JSON.stringify(calculations));
  }, [calculations]);

  return (
    <CalculatorHistoryContext.Provider value={{
      calculations,
      addCalculation,
      clearHistory,
      removeCalculation,
    }}>
      {children}
    </CalculatorHistoryContext.Provider>
  );
};

export const useCalculatorHistory = () => {
  const context = useContext(CalculatorHistoryContext);
  if (!context) {
    throw new Error('useCalculatorHistory must be used within a CalculatorHistoryProvider');
  }
  return context;
};