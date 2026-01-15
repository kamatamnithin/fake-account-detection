import { motion } from 'motion/react';
import { LineChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockData } from '../../data/mockData';

export function EnergyForecastChart() {
  // Prepare data for the chart - combine actual and forecast
  const chartData = mockData.energy.map((point) => ({
    time: new Date(point.timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
    }),
    actual: point.actual,
    forecast: point.forecast,
    upperBound: point.upperBound,
    lowerBound: point.lowerBound,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-2 border-indigo-200 rounded-xl p-4 shadow-2xl"
        >
          <p className="text-slate-600 text-xs mb-2 font-medium">{payload[0].payload.time}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1">
              <span className="text-xs font-medium" style={{ color: entry.color }}>
                {entry.name}:
              </span>
              <span className="text-slate-900 font-bold text-sm">
                {entry.value?.toFixed(1)} kW
              </span>
            </div>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative bg-white/90 backdrop-blur-md border-2 border-indigo-200 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all overflow-hidden"
    >
      {/* Floating gradient orbs in background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-slate-800 text-2xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Energy Consumption Forecast
            </h2>
            <p className="text-slate-600 text-sm">
              Historical data vs AI predictions with confidence intervals
            </p>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-sm rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              7 Days
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-lg hover:shadow-lg transition-all font-medium shadow-md shadow-blue-500/30"
            >
              24 Hours
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-slate-100 text-slate-700 text-sm rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              Export
            </motion.button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.5} />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={{ stroke: '#cbd5e1' }}
              label={{ value: 'Energy (kW)', angle: -90, position: 'insideLeft', fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
              formatter={(value) => <span className="text-slate-700 text-sm font-medium">{value}</span>}
            />

            {/* Confidence interval area */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="url(#confidenceGradient)"
              fillOpacity={1}
              name="Upper Bound"
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="url(#confidenceGradient)"
              fillOpacity={1}
              name="Lower Bound"
            />

            {/* Actual consumption line */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
              name="Actual Consumption"
              animationDuration={2000}
            />

            {/* Forecast line */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#3b82f6"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#3b82f6', r: 4 }}
              name="Forecast"
              animationDuration={2000}
              animationBegin={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}