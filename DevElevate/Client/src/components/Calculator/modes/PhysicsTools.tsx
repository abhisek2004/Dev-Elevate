import React, { useState } from 'react';
import { motion } from 'framer-motion';

type PhysicsMode = 'gravity' | 'projectile' | 'energy';

const PhysicsTools: React.FC = () => {
  const [mode, setMode] = useState<PhysicsMode>('gravity');

  // Gravity Calculator
  const [gravityData, setGravityData] = useState({
    mass1: 100,
    mass2: 200,
    distance: 10,
  });

  // Projectile Motion Calculator
  const [projectileData, setProjectileData] = useState({
    velocity: 20,
    angle: 45,
    height: 0,
  });

  // Energy Calculator
  const [energyData, setEnergyData] = useState({
    mass: 10,
    velocity: 5,
    height: 2,
    gravity: 9.8,
  });

  const calculateGravity = () => {
    const G = 6.674e-11; // Gravitational constant
    const { mass1, mass2, distance } = gravityData;
    const force = (G * mass1 * mass2) / (distance * distance);
    return { force };
  };

  const calculateProjectile = () => {
    const { velocity, angle, height } = projectileData;
    const g = 9.8;
    const angleRad = (angle * Math.PI) / 180;
    const vx = velocity * Math.cos(angleRad);
    const vy = velocity * Math.sin(angleRad);
    
    // Time of flight
    const timeOfFlight = (vy + Math.sqrt(vy * vy + 2 * g * height)) / g;
    
    // Maximum height
    const maxHeight = height + (vy * vy) / (2 * g);
    
    // Range
    const range = vx * timeOfFlight;
    
    return { timeOfFlight, maxHeight, range, vx, vy };
  };

  const calculateEnergy = () => {
    const { mass, velocity, height, gravity } = energyData;
    
    // Kinetic Energy: KE = 1/2 * m * v^2
    const kineticEnergy = 0.5 * mass * velocity * velocity;
    
    // Potential Energy: PE = m * g * h
    const potentialEnergy = mass * gravity * height;
    
    // Total Energy
    const totalEnergy = kineticEnergy + potentialEnergy;
    
    return { kineticEnergy, potentialEnergy, totalEnergy };
  };

  const modes = [
    { id: 'gravity', label: 'Gravity', icon: '🌍' },
    { id: 'projectile', label: 'Projectile', icon: '🏹' },
    { id: 'energy', label: 'Energy', icon: '⚡' },
  ];

  const renderCalculator = () => {
    switch (mode) {
      case 'gravity':
        const gravityResult = calculateGravity();
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Mass 1 (kg)</label>
                <input
                  type="number"
                  value={gravityData.mass1}
                  onChange={(e) => setGravityData(prev => ({ ...prev, mass1: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Mass 2 (kg)</label>
                <input
                  type="number"
                  value={gravityData.mass2}
                  onChange={(e) => setGravityData(prev => ({ ...prev, mass2: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Distance (m)</label>
                <input
                  type="number"
                  value={gravityData.distance}
                  onChange={(e) => setGravityData(prev => ({ ...prev, distance: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="text-center">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Gravitational Force
                  </h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {gravityResult.force.toExponential(3)} N
                  </p>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  Using Newton's Law: F = G × m₁ × m₂ / r²
                </div>
              </div>
            </div>
          </div>
        );

      case 'projectile':
        const projectileResult = calculateProjectile();
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Initial Velocity (m/s)</label>
                <input
                  type="number"
                  value={projectileData.velocity}
                  onChange={(e) => setProjectileData(prev => ({ ...prev, velocity: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Launch Angle (degrees)</label>
                <input
                  type="number"
                  value={projectileData.angle}
                  onChange={(e) => setProjectileData(prev => ({ ...prev, angle: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Initial Height (m)</label>
                <input
                  type="number"
                  value={projectileData.height}
                  onChange={(e) => setProjectileData(prev => ({ ...prev, height: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-gray-600 dark:text-gray-400">Time of Flight</div>
                  <div className="font-semibold text-blue-600">
                    {projectileResult.timeOfFlight.toFixed(2)} s
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 dark:text-gray-400">Max Height</div>
                  <div className="font-semibold text-green-600">
                    {projectileResult.maxHeight.toFixed(2)} m
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 dark:text-gray-400">Range</div>
                  <div className="font-semibold text-purple-600">
                    {projectileResult.range.toFixed(2)} m
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-gray-600 dark:text-gray-400">Velocity Components</div>
                  <div className="font-semibold text-orange-600">
                    Vₓ: {projectileResult.vx.toFixed(2)} m/s<br/>
                    Vᵧ: {projectileResult.vy.toFixed(2)} m/s
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'energy':
        const energyResult = calculateEnergy();
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Mass (kg)</label>
                <input
                  type="number"
                  value={energyData.mass}
                  onChange={(e) => setEnergyData(prev => ({ ...prev, mass: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Velocity (m/s)</label>
                <input
                  type="number"
                  value={energyData.velocity}
                  onChange={(e) => setEnergyData(prev => ({ ...prev, velocity: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Height (m)</label>
                <input
                  type="number"
                  value={energyData.height}
                  onChange={(e) => setEnergyData(prev => ({ ...prev, height: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Gravity (m/s²)</label>
                <input
                  type="number"
                  step="0.1"
                  value={energyData.gravity}
                  onChange={(e) => setEnergyData(prev => ({ ...prev, gravity: Number(e.target.value) }))}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Kinetic Energy (KE):</span>
                  <span className="font-semibold text-red-600">
                    {energyResult.kineticEnergy.toFixed(2)} J
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Potential Energy (PE):</span>
                  <span className="font-semibold text-green-600">
                    {energyResult.potentialEnergy.toFixed(2)} J
                  </span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="font-semibold">Total Energy:</span>
                  <span className="font-bold text-blue-600">
                    {energyResult.totalEnergy.toFixed(2)} J
                  </span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2">
                  KE = ½mv², PE = mgh
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
            onClick={() => setMode(modeOption.id as PhysicsMode)}
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
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
          {modes.find(m => m.id === mode)?.icon} {modes.find(m => m.id === mode)?.label} Calculator
        </h3>
        {renderCalculator()}
      </div>

      {/* Physics Formulas Reference */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md mt-4">
        <h4 className="text-md font-semibold mb-3 text-gray-900 dark:text-white">
          📚 Quick Reference
        </h4>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          {mode === 'gravity' && (
            <>
              <div><strong>Newton's Law of Gravitation:</strong> F = G × m₁ × m₂ / r²</div>
              <div><strong>G:</strong> 6.674 × 10⁻¹¹ N⋅m²/kg²</div>
            </>
          )}
          {mode === 'projectile' && (
            <>
              <div><strong>Range:</strong> R = v₀² sin(2θ) / g</div>
              <div><strong>Max Height:</strong> h = v₀² sin²(θ) / (2g)</div>
              <div><strong>Time of Flight:</strong> t = 2v₀ sin(θ) / g</div>
            </>
          )}
          {mode === 'energy' && (
            <>
              <div><strong>Kinetic Energy:</strong> KE = ½mv²</div>
              <div><strong>Potential Energy:</strong> PE = mgh</div>
              <div><strong>Conservation:</strong> Total Energy = KE + PE</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhysicsTools;