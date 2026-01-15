import { motion } from 'motion/react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockData } from '../../data/mockData';

export function SecondaryCharts() {
  const temperatureData = mockData.temperature.slice(-48).map((point) => ({
    time: new Date(point.timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
    }),
    temperature: point.temperature,
  }));

  const occupancyData = mockData.occupancy.slice(-48).map((point) => ({
    time: new Date(point.timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
    }),
    occupancy: point.occupancy,
  }));

  const renewableData = mockData.renewable.slice(-48).map((point) => ({
    time: new Date(point.timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
    }),
    solar: point.solar,
    wind: point.wind,
    total: point.solar + point.wind,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-indigo-200 rounded-xl p-3 shadow-2xl">
          <p className="text-slate-600 text-xs mb-1 font-medium">{payload[0].payload.time}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium" style={{ color: entry.color }}>
                {entry.name}:
              </span>
              <span className="text-slate-900 font-bold text-sm">
                {entry.value?.toFixed(1)}
                {entry.dataKey === 'temperature' ? '°C' : entry.dataKey === 'occupancy' ? '%' : ' kW'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Temperature Chart */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-2xl p-6 shadow-xl"
      >
        <h3 className="text-slate-800 font-bold mb-1">Temperature Trend</h3>
        <p className="text-slate-600 text-sm mb-4">Ambient temperature correlation</p>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={temperatureData}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.5} />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 10 }}
              hide
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 10 }}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#tempGradient)"
              name="Temperature"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Occupancy Chart */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-2xl p-6 shadow-xl"
      >
        <h3 className="text-slate-800 font-bold mb-1">Occupancy Rate</h3>
        <p className="text-slate-600 text-sm mb-4">Building utilization pattern</p>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={occupancyData}>
            <defs>
              <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.5} />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 10 }}
              hide
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 10 }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="occupancy"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#occupancyGradient)"
              name="Occupancy"
              animationDuration={1500}
              animationBegin={200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Renewable Energy Chart */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-2xl p-6 shadow-xl"
      >
        <h3 className="text-slate-800 font-bold mb-1">Renewable Energy</h3>
        <p className="text-slate-600 text-sm mb-4">Solar & wind contribution</p>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={renewableData}>
            <defs>
              <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#facc15" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.5} />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 10 }}
              hide
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#64748b', fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="solar"
              stackId="1"
              stroke="#facc15"
              strokeWidth={2}
              fill="url(#solarGradient)"
              name="Solar"
              animationDuration={1500}
              animationBegin={400}
            />
            <Area
              type="monotone"
              dataKey="wind"
              stackId="1"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#windGradient)"
              name="Wind"
              animationDuration={1500}
              animationBegin={600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}