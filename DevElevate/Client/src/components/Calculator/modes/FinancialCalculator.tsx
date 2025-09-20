import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type FinancialMode = 'emi' | 'sip' | 'fd' | 'rd';

const FinancialCalculator: React.FC = () => {
  const [mode, setMode] = useState<FinancialMode>('emi');
  
  // EMI Calculator
  const [emiData, setEmiData] = useState({
    principal: 1000000,
    rate: 8,
    tenure: 20,
  });

  // SIP Calculator
  const [sipData, setSipData] = useState({
    monthly: 5000,
    rate: 12,
    tenure: 10,
  });

  // FD Calculator
  const [fdData, setFdData] = useState({
    principal: 100000,
    rate: 6.5,
    tenure: 5,
  });

  // RD Calculator
  const [rdData, setRdData] = useState({
    monthly: 2000,
    rate: 6,
    tenure: 5,
  });

  const calculateEMI = () => {
    const { principal, rate, tenure } = emiData;
    const monthlyRate = rate / 100 / 12;
    const months = tenure * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                 (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;
    
    return { emi, totalAmount, totalInterest };
  };

  const calculateSIP = () => {
    const { monthly, rate, tenure } = sipData;
    const monthlyRate = rate / 100 / 12;
    const months = tenure * 12;
    const futureValue = monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
    const totalInvestment = monthly * months;
    const returns = futureValue - totalInvestment;
    
    return { futureValue, totalInvestment, returns };
  };

  const calculateFD = () => {
    const { principal, rate, tenure } = fdData;
    const maturityAmount = principal * Math.pow(1 + rate / 100, tenure);
    const interest = maturityAmount - principal;
    
    return { maturityAmount, interest };
  };

  const calculateRD = () => {
    const { monthly, rate, tenure } = rdData;
    const months = tenure * 12;
    const monthlyRate = rate / 100 / 12;
    const maturityValue = monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
    const totalDeposit = monthly * months;
    const interest = maturityValue - totalDeposit;
    
    return { maturityValue, totalDeposit, interest };
  };

  const generateChartData = () => {
    let data: any = {};
    let labels: string[] = [];
    
    switch (mode) {
      case 'emi':
        const emiResult = calculateEMI();
        const emiMonths = emiData.tenure * 12;
        let balance = emiData.principal;
        const monthlyRate = emiData.rate / 100 / 12;
        
        labels = Array.from({ length: Math.min(60, emiMonths) }, (_, i) => `Month ${i + 1}`);
        const principalData: number[] = [];
        const interestData: number[] = [];
        
        for (let i = 0; i < Math.min(60, emiMonths); i++) {
          const interestPortion = balance * monthlyRate;
          const principalPortion = emiResult.emi - interestPortion;
          principalData.push(principalPortion);
          interestData.push(interestPortion);
          balance -= principalPortion;
        }
        
        data = {
          labels,
          datasets: [
            {
              label: 'Principal',
              data: principalData,
              borderColor: '#3B82F6',
              backgroundColor: '#3B82F620',
              fill: true,
            },
            {
              label: 'Interest',
              data: interestData,
              borderColor: '#EF4444',
              backgroundColor: '#EF444420',
              fill: true,
            },
          ],
        };
        break;
        
      case 'sip':
        const sipMonths = sipData.tenure * 12;
        labels = Array.from({ length: Math.min(60, sipMonths) }, (_, i) => `Month ${i + 1}`);
        const sipGrowth: number[] = [];
        const sipRate = sipData.rate / 100 / 12;
        
        for (let i = 1; i <= Math.min(60, sipMonths); i++) {
          const value = sipData.monthly * (Math.pow(1 + sipRate, i) - 1) / sipRate * (1 + sipRate);
          sipGrowth.push(value);
        }
        
        data = {
          labels,
          datasets: [
            {
              label: 'Investment Growth',
              data: sipGrowth,
              borderColor: '#10B981',
              backgroundColor: '#10B98120',
              fill: true,
            },
          ],
        };
        break;
    }
    
    return data;
  };

  const modes = [
    { id: 'emi', label: 'EMI', icon: '🏠' },
    { id: 'sip', label: 'SIP', icon: '📈' },
    { id: 'fd', label: 'FD', icon: '🏛️' },
    { id: 'rd', label: 'RD', icon: '💰' },
  ];

  const renderCalculator = () => {
    switch (mode) {
      case 'emi':
        const emiResult = calculateEMI();
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Loan Amount (₹)</label>
                <input
                  type="number"
                  value={emiData.principal}
                  onChange={(e) => setEmiData(prev => ({ ...prev, principal: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={emiData.rate}
                  onChange={(e) => setEmiData(prev => ({ ...prev, rate: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Tenure (Years)</label>
                <input
                  type="number"
                  value={emiData.tenure}
                  onChange={(e) => setEmiData(prev => ({ ...prev, tenure: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between">
                  <span>Monthly EMI:</span>
                  <span className="font-semibold">₹{emiResult.emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-semibold">₹{emiResult.totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest:</span>
                  <span className="font-semibold text-red-600">₹{emiResult.totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sip':
        const sipResult = calculateSIP();
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Monthly Investment (₹)</label>
                <input
                  type="number"
                  value={sipData.monthly}
                  onChange={(e) => setSipData(prev => ({ ...prev, monthly: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Expected Return (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={sipData.rate}
                  onChange={(e) => setSipData(prev => ({ ...prev, rate: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Tenure (Years)</label>
                <input
                  type="number"
                  value={sipData.tenure}
                  onChange={(e) => setSipData(prev => ({ ...prev, tenure: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between">
                  <span>Future Value:</span>
                  <span className="font-semibold text-green-600">₹{sipResult.futureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Investment:</span>
                  <span className="font-semibold">₹{sipResult.totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Returns:</span>
                  <span className="font-semibold text-blue-600">₹{sipResult.returns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Calculator coming soon...</div>;
    }
  };

  return (
    <div className="p-4 h-full overflow-auto">
      {/* Mode Selector */}
      <div className="flex gap-2 mb-4">
        {modes.map((modeOption) => (
          <motion.button
            key={modeOption.id}
            onClick={() => setMode(modeOption.id as FinancialMode)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === modeOption.id
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-1">{modeOption.icon}</span>
            {modeOption.label}
          </motion.button>
        ))}
      </div>

      {/* Calculator Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {modes.find(m => m.id === mode)?.label} Calculator
        </h3>
        {renderCalculator()}
      </div>

      {/* Chart */}
      {(mode === 'emi' || mode === 'sip') && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md h-64">
          <Line
            data={generateChartData()}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: `${modes.find(m => m.id === mode)?.label} Breakdown`,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FinancialCalculator;