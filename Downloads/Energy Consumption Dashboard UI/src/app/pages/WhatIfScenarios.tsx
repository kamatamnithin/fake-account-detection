import { useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Play, RotateCcw, TrendingDown, TrendingUp, Zap, DollarSign, Leaf } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { notificationService } from '../../services/notificationService';

interface ScenarioParameters {
  temperatureAdjustment: number;
  occupancyReduction: number;
  renewableIncrease: number;
  hvacEfficiency: number;
  lightingEfficiency: number;
}

export function WhatIfScenarios() {
  const { isDarkMode } = useTheme();
  const [parameters, setParameters] = useState<ScenarioParameters>({
    temperatureAdjustment: 0,
    occupancyReduction: 0,
    renewableIncrease: 0,
    hvacEfficiency: 0,
    lightingEfficiency: 0,
  });

  const [scenarioResults, setScenarioResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Baseline data
  const baselineConsumption = 285; // kW average
  const baselineCost = 42.75; // $ per hour
  const baselineCarbon = 142.5; // kg CO2 per hour

  const calculateScenario = () => {
    setIsCalculating(true);
    notificationService.info('Calculating scenario impact...');

    setTimeout(() => {
      // Calculate impacts (simplified model)
      const tempImpact = parameters.temperatureAdjustment * -2.5; // -2.5% per degree
      const occupancyImpact = parameters.occupancyReduction * -0.8; // -0.8% per 1% reduction
      const renewableImpact = parameters.renewableIncrease * -0.5; // -0.5% per 1% increase
      const hvacImpact = parameters.hvacEfficiency * -0.6; // -0.6% per 1% efficiency gain
      const lightingImpact = parameters.lightingEfficiency * -0.4; // -0.4% per 1% efficiency gain

      const totalReduction = tempImpact + occupancyImpact + renewableImpact + hvacImpact + lightingImpact;
      
      const newConsumption = baselineConsumption * (1 + totalReduction / 100);
      const newCost = baselineCost * (1 + totalReduction / 100);
      const newCarbon = baselineCarbon * (1 + totalReduction / 100);

      const savingsKW = baselineConsumption - newConsumption;
      const savingsCost = (baselineCost - newCost) * 24 * 30; // Monthly savings
      const savingsCarbon = (baselineCarbon - newCarbon) * 24 * 365; // Annual savings

      // Generate hourly projection
      const hourlyData = Array.from({ length: 24 }, (_, i) => {
        const hour = i;
        const baseValue = 250 + Math.sin(i / 24 * Math.PI * 2) * 50 + Math.random() * 20;
        const newValue = baseValue * (1 + totalReduction / 100);
        
        return {
          hour: `${hour}:00`,
          baseline: parseFloat(baseValue.toFixed(1)),
          scenario: parseFloat(newValue.toFixed(1)),
          savings: parseFloat((baseValue - newValue).toFixed(1)),
        };
      });

      setScenarioResults({
        totalReduction: totalReduction.toFixed(1),
        newConsumption: newConsumption.toFixed(1),
        newCost: newCost.toFixed(2),
        newCarbon: newCarbon.toFixed(1),
        savingsKW: savingsKW.toFixed(1),
        savingsCost: savingsCost.toFixed(2),
        savingsCarbon: (savingsCarbon / 1000).toFixed(2), // Convert to tonnes
        hourlyData,
        breakdown: {
          temperature: tempImpact.toFixed(1),
          occupancy: occupancyImpact.toFixed(1),
          renewable: renewableImpact.toFixed(1),
          hvac: hvacImpact.toFixed(1),
          lighting: lightingImpact.toFixed(1),
        },
      });

      setIsCalculating(false);
      notificationService.success(`Scenario calculated: ${Math.abs(totalReduction).toFixed(1)}% reduction potential`);
    }, 1500);
  };

  const resetParameters = () => {
    setParameters({
      temperatureAdjustment: 0,
      occupancyReduction: 0,
      renewableIncrease: 0,
      hvacEfficiency: 0,
      lightingEfficiency: 0,
    });
    setScenarioResults(null);
    notificationService.info('Parameters reset to baseline');
  };

  const SliderControl = ({ 
    label, 
    value, 
    onChange, 
    min, 
    max, 
    step, 
    unit,
    icon: Icon 
  }: any) => (
    <div className={`p-4 rounded-xl border ${
      isDarkMode 
        ? 'bg-slate-800/50 border-slate-700' 
        : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <Icon className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <div className="flex-1">
          <label className={`block text-sm font-medium ${
            isDarkMode ? 'text-slate-200' : 'text-slate-700'
          }`}>
            {label}
          </label>
          <span className={`text-lg font-bold ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {value > 0 ? '+' : ''}{value}{unit}
          </span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-slate-500 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100'
        : 'bg-white text-slate-800'
    }`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDarkMode ? 'bg-blue-600/10' : 'bg-blue-400/10'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
              What-If Scenario Planning
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Model energy consumption changes and predict savings
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetParameters}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode
                ? 'border-slate-600 hover:bg-slate-800 text-slate-300'
                : 'border-slate-300 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`p-6 rounded-2xl border ${
            isDarkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Scenario Parameters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SliderControl
              label="Temperature Adjustment"
              value={parameters.temperatureAdjustment}
              onChange={(v: number) => setParameters({ ...parameters, temperatureAdjustment: v })}
              min={-5}
              max={5}
              step={0.5}
              unit="°C"
              icon={Zap}
            />
            <SliderControl
              label="Occupancy Reduction"
              value={parameters.occupancyReduction}
              onChange={(v: number) => setParameters({ ...parameters, occupancyReduction: v })}
              min={0}
              max={50}
              step={5}
              unit="%"
              icon={TrendingDown}
            />
            <SliderControl
              label="Renewable Energy Increase"
              value={parameters.renewableIncrease}
              onChange={(v: number) => setParameters({ ...parameters, renewableIncrease: v })}
              min={0}
              max={100}
              step={10}
              unit="%"
              icon={Leaf}
            />
            <SliderControl
              label="HVAC Efficiency Improvement"
              value={parameters.hvacEfficiency}
              onChange={(v: number) => setParameters({ ...parameters, hvacEfficiency: v })}
              min={0}
              max={50}
              step={5}
              unit="%"
              icon={Zap}
            />
            <SliderControl
              label="Lighting Efficiency Gain"
              value={parameters.lightingEfficiency}
              onChange={(v: number) => setParameters({ ...parameters, lightingEfficiency: v })}
              min={0}
              max={60}
              step={10}
              unit="%"
              icon={Lightbulb}
            />
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculateScenario}
              disabled={isCalculating}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed h-full"
            >
              <Play className="w-5 h-5" />
              {isCalculating ? 'Calculating...' : 'Run Scenario'}
            </motion.button>
          </div>
        </motion.div>

        {/* Results */}
        {scenarioResults && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl border ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-emerald-900/30 to-green-900/20 border-emerald-700/50' 
                    : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-emerald-500/20 rounded-xl">
                    <TrendingDown className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    Energy Savings
                  </h3>
                </div>
                <p className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {scenarioResults.savingsKW} kW
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-emerald-300/70' : 'text-emerald-600'}`}>
                  {scenarioResults.totalReduction}% reduction
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl border ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/20 border-blue-700/50' 
                    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <DollarSign className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    Cost Savings
                  </h3>
                </div>
                <p className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  ${scenarioResults.savingsCost}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-blue-300/70' : 'text-blue-600'}`}>
                  Per month
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl border ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-teal-900/30 to-cyan-900/20 border-teal-700/50' 
                    : 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-teal-500/20 rounded-xl">
                    <Leaf className="w-6 h-6 text-teal-400" />
                  </div>
                  <h3 className={`font-semibold ${isDarkMode ? 'text-teal-300' : 'text-teal-700'}`}>
                    Carbon Reduction
                  </h3>
                </div>
                <p className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {scenarioResults.savingsCarbon} t
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-teal-300/70' : 'text-teal-600'}`}>
                  CO₂ per year
                </p>
              </motion.div>
            </div>

            {/* Chart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`p-6 rounded-2xl border ${
                isDarkMode 
                  ? 'bg-slate-800/50 border-slate-700' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                24-Hour Projection
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={scenarioResults.hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#334155' : '#e2e8f0'} />
                  <XAxis 
                    dataKey="hour" 
                    stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke={isDarkMode ? '#94a3b8' : '#64748b'}
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                      border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                      borderRadius: '12px',
                      color: isDarkMode ? '#f1f5f9' : '#0f172a',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="baseline"
                    stroke="#64748b"
                    strokeWidth={2}
                    name="Baseline"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="scenario"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Scenario"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
