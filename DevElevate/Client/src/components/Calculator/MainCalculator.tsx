import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import BasicCalculator from "./modes/BasicCalculator";
import ScientificCalculator from "./modes/ScientificCalculator";
import GraphingCalculator from "./modes/GraphingCalculator";
import FinancialCalculator from "./modes/FinancialCalculator";
import UnitConverter from "./modes/UnitConverter";
import PhysicsTools from "./modes/PhysicsTools";

export type CalculatorMode =
  | "basic"
  | "scientific"
  | "graphing"
  | "financial"
  | "converter"
  | "physics";

interface MainCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const MainCalculator: React.FC<MainCalculatorProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = React.useState<CalculatorMode>("basic");

  if (!isOpen) return null;

  const modes = [
    { id: "basic", label: "Basic", icon: "🔢" },
    { id: "scientific", label: "Scientific", icon: "🧮" },
    { id: "graphing", label: "Graph", icon: "📈" },
    { id: "financial", label: "Finance", icon: "💰" },
    { id: "converter", label: "Convert", icon: "🔄" },
    { id: "physics", label: "Physics", icon: "⚡" },
  ];

  const renderCalculator = () => {
    switch (mode) {
      case "basic":
        return <BasicCalculator />;
      case "scientific":
        return <ScientificCalculator />;
      case "graphing":
        return <GraphingCalculator />;
      case "financial":
        return <FinancialCalculator />;
      case "converter":
        return <UnitConverter />;
      case "physics":
        return <PhysicsTools />;
      default:
        return <BasicCalculator />;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-3xl h-[80vh] bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Mode Selector */}
        <div className="p-2 border-b dark:border-gray-700">
          <div className="flex flex-wrap gap-1">
            {modes.map((modeOption) => (
              <motion.button
                key={modeOption.id}
                onClick={() => setMode(modeOption.id as CalculatorMode)}
                className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  mode === modeOption.id
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1">{modeOption.icon}</span>
                {modeOption.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Calculator Content */}
        <div className="flex-1 overflow-auto p-3">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderCalculator()}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MainCalculator;
