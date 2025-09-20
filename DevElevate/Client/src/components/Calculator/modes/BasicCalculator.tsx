import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { evaluate } from "mathjs";
import { useCalculatorHistory } from "../../../contexts/CalculatorHistoryContext";

const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const { addCalculation } = useCalculatorHistory();

  const inputNumber = useCallback(
    (num: string) => {
      if (waitingForOperand) {
        setDisplay(num);
        setWaitingForOperand(false);
      } else {
        setDisplay(display === "0" ? num : display + num);
      }
    },
    [display, waitingForOperand]
  );

  const inputOperation = useCallback(
    (nextOperation: string) => {
      const inputValue = parseFloat(display);

      if (previousValue === null) {
        setPreviousValue(display);
      } else if (operation) {
        const currentValue = previousValue || "0";
        const newValue = evaluate(`${currentValue} ${operation} ${display}`);
        setDisplay(String(newValue));
        setPreviousValue(String(newValue));
      }

      setWaitingForOperand(true);
      setOperation(nextOperation);
    },
    [display, previousValue, operation]
  );

  const calculate = useCallback(() => {
    if (previousValue !== null && operation) {
      const currentValue = previousValue || "0";
      const expression = `${currentValue} ${operation} ${display}`;
      try {
        const result = evaluate(expression);
        const calculation = {
          expression,
          result: String(result),
          timestamp: Date.now(),
          type: "basic" as const,
        };
        addCalculation(calculation);
        setDisplay(String(result));
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
      } catch (error) {
        setDisplay("Error");
      }
    }
  }, [previousValue, operation, display, addCalculation]);

  const clear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const clearEntry = useCallback(() => {
    setDisplay("0");
  }, []);

  const percentage = useCallback(() => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  }, [display]);

  const buttons = [
    {
      label: "MC",
      action: () => setMemory(0),
      className: "bg-gray-300 dark:bg-gray-600",
    },
    {
      label: "MR",
      action: () => setDisplay(String(memory)),
      className: "bg-gray-300 dark:bg-gray-600",
    },
    {
      label: "M+",
      action: () => setMemory(memory + parseFloat(display)),
      className: "bg-gray-300 dark:bg-gray-600",
    },
    {
      label: "M-",
      action: () => setMemory(memory - parseFloat(display)),
      className: "bg-gray-300 dark:bg-gray-600",
    },

    {
      label: "C",
      action: clear,
      className: "bg-red-500 hover:bg-red-600 text-white",
    },
    {
      label: "CE",
      action: clearEntry,
      className: "bg-red-400 hover:bg-red-500 text-white",
    },
    {
      label: "⌫",
      action: () => setDisplay(display.length > 1 ? display.slice(0, -1) : "0"),
      className: "bg-orange-500 hover:bg-orange-600 text-white",
    },
    {
      label: "÷",
      action: () => inputOperation("/"),
      className: "bg-blue-500 hover:bg-blue-600 text-white",
    },

    {
      label: "7",
      action: () => inputNumber("7"),
      className: "bg-white dark:bg-gray-700",
    },
    {
      label: "8",
      action: () => inputNumber("8"),
      className: "bg-white dark:bg-gray-700",
    },
    {
      label: "9",
      action: () => inputNumber("9"),
      className: "bg-white dark:bg-gray-700",
    },
    {
      label: "×",
      action: () => inputOperation("*"),
      className: "bg-blue-500 hover:bg-blue-600 text-white",
    },

    {
      label: "4",
      action: () => inputNumber("4"),
      className: "bg-white dark:bg-gray-700",
    },
    {
      label: "5",
      action: () => inputNumber("5"),
      className: "bg-white dark:bg-gray-700",
    },
    {
      label: "6",
      action: () => inputNumber("6"),
      className: "bg-white dark:bg-gray-700",
    },
    {
      label: "−",
      action: () => inputOperation("-"),
      className: "bg-blue-500 hover:bg-blue-600 text-white",
    },

    {
      label: "1",
      action: () => inputNumber("1"),
      className: "bg-white dark:bg-gray-700",
    },
    {
      label: "2",
      action: () => inputNumber("2"),
      className: "bg-white dark:bg-gray-700",
    },
    {
      label: "3",
      action: () => inputNumber("3"),
      className: "bg-white dark:bg-gray-700",
    },
    {
      label: "+",
      action: () => inputOperation("+"),
      className: "bg-blue-500 hover:bg-blue-600 text-white",
    },

    {
      label: "±",
      action: () => setDisplay(String(-parseFloat(display))),
      className: "bg-gray-300 dark:bg-gray-600",
    },
    {
      label: "0",
      action: () => inputNumber("0"),
      className: "bg-white dark:bg-gray-700",
    },
    {
      label: ".",
      action: () => inputNumber("."),
      className: "bg-white dark:bg-gray-700",
    },
    {
      label: "=",
      action: calculate,
      className: "bg-green-500 hover:bg-green-600 text-white",
    },

    {
      label: "%",
      action: percentage,
      className: "bg-purple-500 hover:bg-purple-600 text-white col-span-4",
    },
  ];

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Display */}
      <div className="mb-4 p-4 rounded-xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-md shadow-inner">
        <div className="text-right">
          {previousValue && operation && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {previousValue} {operation}
            </div>
          )}
          <div className="text-3xl font-mono text-gray-900 dark:text-white overflow-hidden">
            {display}
          </div>
          {memory !== 0 && (
            <div className="text-xs text-blue-500">M: {memory}</div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((button, index) => (
          <motion.button
            key={button.label}
            onClick={button.action}
            className={`p-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 ${
              button.className
            } ${button.label === "%" ? "col-span-4" : ""}`}
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
    </div>
  );
};

export default BasicCalculator;
