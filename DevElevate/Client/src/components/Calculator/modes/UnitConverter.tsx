import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ConversionCategory {
  id: string;
  name: string;
  icon: string;
  units: { [key: string]: { name: string; factor: number } };
}

const conversionCategories: ConversionCategory[] = [
  {
    id: 'length',
    name: 'Length',
    icon: '📏',
    units: {
      m: { name: 'Meters', factor: 1 },
      km: { name: 'Kilometers', factor: 1000 },
      cm: { name: 'Centimeters', factor: 0.01 },
      mm: { name: 'Millimeters', factor: 0.001 },
      ft: { name: 'Feet', factor: 0.3048 },
      in: { name: 'Inches', factor: 0.0254 },
      yd: { name: 'Yards', factor: 0.9144 },
      mi: { name: 'Miles', factor: 1609.34 },
    },
  },
  {
    id: 'weight',
    name: 'Weight',
    icon: '⚖️',
    units: {
      kg: { name: 'Kilograms', factor: 1 },
      g: { name: 'Grams', factor: 0.001 },
      lb: { name: 'Pounds', factor: 0.453592 },
      oz: { name: 'Ounces', factor: 0.0283495 },
      ton: { name: 'Tons', factor: 1000 },
      stone: { name: 'Stones', factor: 6.35029 },
    },
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: '🌡️',
    units: {
      c: { name: 'Celsius', factor: 1 },
      f: { name: 'Fahrenheit', factor: 1 },
      k: { name: 'Kelvin', factor: 1 },
    },
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: '🥤',
    units: {
      l: { name: 'Liters', factor: 1 },
      ml: { name: 'Milliliters', factor: 0.001 },
      gal: { name: 'Gallons', factor: 3.78541 },
      qt: { name: 'Quarts', factor: 0.946353 },
      pt: { name: 'Pints', factor: 0.473176 },
      cup: { name: 'Cups', factor: 0.236588 },
    },
  },
  {
    id: 'area',
    name: 'Area',
    icon: '📐',
    units: {
      'm2': { name: 'Square Meters', factor: 1 },
      'km2': { name: 'Square Kilometers', factor: 1000000 },
      'cm2': { name: 'Square Centimeters', factor: 0.0001 },
      'ft2': { name: 'Square Feet', factor: 0.092903 },
      'in2': { name: 'Square Inches', factor: 0.00064516 },
      acre: { name: 'Acres', factor: 4046.86 },
    },
  },
  {
    id: 'speed',
    name: 'Speed',
    icon: '🚗',
    units: {
      'mps': { name: 'Meters per Second', factor: 1 },
      'kmh': { name: 'Kilometers per Hour', factor: 0.277778 },
      'mph': { name: 'Miles per Hour', factor: 0.44704 },
      'fps': { name: 'Feet per Second', factor: 0.3048 },
      'knot': { name: 'Knots', factor: 0.514444 },
    },
  },
];

const UnitConverter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(conversionCategories[0]);
  const [fromUnit, setFromUnit] = useState(Object.keys(conversionCategories[0].units)[0]);
  const [toUnit, setToUnit] = useState(Object.keys(conversionCategories[0].units)[1]);
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  const convertValue = (value: number, from: string, to: string, category: ConversionCategory) => {
    if (category.id === 'temperature') {
      // Special handling for temperature
      if (from === 'c' && to === 'f') {
        return (value * 9) / 5 + 32;
      } else if (from === 'f' && to === 'c') {
        return ((value - 32) * 5) / 9;
      } else if (from === 'c' && to === 'k') {
        return value + 273.15;
      } else if (from === 'k' && to === 'c') {
        return value - 273.15;
      } else if (from === 'f' && to === 'k') {
        return ((value - 32) * 5) / 9 + 273.15;
      } else if (from === 'k' && to === 'f') {
        return ((value - 273.15) * 9) / 5 + 32;
      }
      return value;
    } else {
      // Standard conversion using factors
      const fromFactor = category.units[from].factor;
      const toFactor = category.units[to].factor;
      return (value * fromFactor) / toFactor;
    }
  };

  useEffect(() => {
    const value = parseFloat(fromValue) || 0;
    const converted = convertValue(value, fromUnit, toUnit, selectedCategory);
    setToValue(converted.toFixed(8).replace(/\.?0+$/, ''));
  }, [fromValue, fromUnit, toUnit, selectedCategory]);

  useEffect(() => {
    // Reset units when category changes
    const firstUnit = Object.keys(selectedCategory.units)[0];
    const secondUnit = Object.keys(selectedCategory.units)[1] || firstUnit;
    setFromUnit(firstUnit);
    setToUnit(secondUnit);
  }, [selectedCategory]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
  };

  const commonConversions = [
    { from: '1', unit: fromUnit, category: selectedCategory.id },
    { from: '10', unit: fromUnit, category: selectedCategory.id },
    { from: '100', unit: fromUnit, category: selectedCategory.id },
    { from: '1000', unit: fromUnit, category: selectedCategory.id },
  ];

  return (
    <div className="p-4 h-full overflow-auto">
      {/* Category Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {conversionCategories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory.id === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-1">{category.icon}</span>
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Converter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {selectedCategory.icon} {selectedCategory.name} Converter
        </h3>

        <div className="space-y-4">
          {/* From Unit */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">From</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter value"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                {Object.entries(selectedCategory.units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={swapUnits}
              className="p-2 bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              🔄
            </motion.button>
          </div>

          {/* To Unit */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">To</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={toValue}
                readOnly
                className="flex-1 p-2 border rounded bg-gray-50 dark:bg-gray-600 dark:border-gray-600"
                placeholder="Result"
              />
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                {Object.entries(selectedCategory.units).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Conversions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
        <h4 className="text-md font-semibold mb-3 text-gray-900 dark:text-white">
          Quick Conversions
        </h4>
        <div className="space-y-2">
          {commonConversions.map((conversion, index) => {
            const converted = convertValue(
              parseFloat(conversion.from),
              fromUnit,
              toUnit,
              selectedCategory
            );
            return (
              <motion.div
                key={index}
                className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setFromValue(conversion.from)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>
                  {conversion.from} {selectedCategory.units[fromUnit].name}
                </span>
                <span className="font-semibold">
                  {converted.toFixed(6).replace(/\.?0+$/, '')} {selectedCategory.units[toUnit].name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;