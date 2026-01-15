import { motion } from 'motion/react';
import { Activity, Zap, Thermometer, Users, Sun, DollarSign, Gauge, TrendingUp } from 'lucide-react';
import { RealTimeMeter } from '../components/RealTimeMeter';
import { LiveAlertsTicker } from '../components/LiveAlertsTicker';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export function RealTimeDashboard() {
  const { isDarkMode } = useTheme();
  const [chartData, setChartData] = useState<any[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  // Initialize chart data
  useEffect(() => {
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (19 - i) * 3000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
      }),
      consumption: 85 + Math.random() * 30,
      temperature: 22 + Math.random() * 4,
    }));
    setChartData(initialData);
  }, []);

  // Update chart data in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const newPoint = {
          time: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
          }),
          consumption: 85 + Math.random() * 30,
          temperature: 22 + Math.random() * 4,
        };
        return [...prev.slice(1), newPoint];
      });
      setLastUpdateTime(new Date());
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const timeSinceUpdate = Math.floor((new Date().getTime() - lastUpdateTime.getTime()) / 1000);

  return (
    <div>
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Activity className="size-7 text-blue-600" />
                </motion.div>
                Real-Time Monitoring
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-2">
                <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="inline-block w-2 h-2 rounded-full bg-green-500"
                />
                Live • Updates every 3 seconds • Last update: {timeSinceUpdate}s ago
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500 dark:text-slate-400">Current Time</div>
              <div className="text-xl font-bold text-slate-800 dark:text-slate-200">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <RealTimeMeter
            title="Energy Consumption"
            baseValue={98.5}
            unit="kWh"
            icon={Zap}
            color="blue"
            updateInterval={1000}
          />
          <RealTimeMeter
            title="Temperature"
            baseValue={23.2}
            unit="°C"
            icon={Thermometer}
            color="orange"
            updateInterval={2000}
          />
          <RealTimeMeter
            title="Occupancy"
            baseValue={1450}
            unit="people"
            icon={Users}
            color="purple"
            updateInterval={1500}
          />
          <RealTimeMeter
            title="Solar Output"
            baseValue={67.3}
            unit="kW"
            icon={Sun}
            color="yellow"
            updateInterval={2500}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Real-Time Consumption Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Live Energy Consumption</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Real-time monitoring (updates every 3s)</p>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
                <span className="text-xs text-slate-500 dark:text-slate-400">LIVE</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  tick={{ fontSize: 11 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  stroke="#64748b"
                  tick={{ fontSize: 11 }}
                  label={{ value: 'kWh', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="consumption" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#consumptionGradient)"
                  animationDuration={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Live Alerts */}
          <div className="lg:col-span-1">
            <LiveAlertsTicker />
          </div>
        </div>

        {/* Additional Real-Time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="size-8 text-green-600" />
              <TrendingUp className="size-5 text-green-600" />
            </div>
            <h3 className="text-sm text-slate-600 dark:text-slate-400 mb-1">Current Cost Rate</h3>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">$12.34</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">per hour</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Gauge className="size-8 text-blue-600" />
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                NORMAL
              </span>
            </div>
            <h3 className="text-sm text-slate-600 dark:text-slate-400 mb-1">System Load</h3>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">73%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">of capacity</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Sun className="size-8 text-yellow-600" />
              <TrendingUp className="size-5 text-green-600" />
            </div>
            <h3 className="text-sm text-slate-600 dark:text-slate-400 mb-1">Renewable %</h3>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">34.2%</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">of total energy</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Activity className="size-8 text-purple-600" />
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                OPTIMAL
              </span>
            </div>
            <h3 className="text-sm text-slate-600 dark:text-slate-400 mb-1">Efficiency Score</h3>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">92.8</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">out of 100</p>
          </motion.div>
        </div>

        {/* Temperature Real-Time Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Live Temperature Monitoring</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Real-time temperature fluctuations</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="w-2 h-2 rounded-full bg-orange-500"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400">LIVE</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                domain={[18, 28]}
                label={{ value: '°C', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#f97316" 
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}