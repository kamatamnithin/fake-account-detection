import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Flame, Calendar, DollarSign } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ExportButtons } from '../components/ExportButtons';
import { useTheme } from '../../contexts/ThemeContext';

// Generate correlation data
const correlationData = [
  { feature: 'Temperature', consumption: 0.87 },
  { feature: 'Occupancy', consumption: 0.72 },
  { feature: 'HVAC', consumption: 0.65 },
  { feature: 'Lighting', consumption: 0.58 },
  { feature: 'Day of Week', consumption: 0.43 },
  { feature: 'Time of Day', consumption: 0.39 },
];

// Feature importance data
const featureImportance = [
  { feature: 'Temperature', importance: 0.32 },
  { feature: 'Hour of Day', importance: 0.24 },
  { feature: 'Occupancy', importance: 0.18 },
  { feature: 'Day of Week', importance: 0.12 },
  { feature: 'Weather', importance: 0.08 },
  { feature: 'HVAC Status', importance: 0.06 },
];

// Hourly breakdown data
const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  consumption: 80 + Math.sin(i / 24 * Math.PI * 2) * 30 + Math.random() * 15,
  cost: (80 + Math.sin(i / 24 * Math.PI * 2) * 30 + Math.random() * 15) * 0.12,
}));

// Weekly comparison data
const weeklyComparison = [
  { day: 'Mon', thisWeek: 850, lastWeek: 920 },
  { day: 'Tue', thisWeek: 880, lastWeek: 890 },
  { day: 'Wed', thisWeek: 920, lastWeek: 950 },
  { day: 'Thu', thisWeek: 910, lastWeek: 940 },
  { day: 'Fri', thisWeek: 870, lastWeek: 910 },
  { day: 'Sat', thisWeek: 620, lastWeek: 680 },
  { day: 'Sun', thisWeek: 590, lastWeek: 650 },
];

// Heatmap data (Hour x Day)
const generateHeatmapData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data: any[] = [];
  
  days.forEach((day, dayIndex) => {
    for (let hour = 0; hour < 24; hour++) {
      const baseValue = 50;
      const dayVariation = dayIndex >= 5 ? -20 : 0; // Weekend effect
      const hourVariation = Math.sin((hour - 6) / 12 * Math.PI) * 40; // Peak during day
      const randomNoise = Math.random() * 10;
      
      data.push({
        day,
        hour,
        value: Math.max(0, baseValue + dayVariation + hourVariation + randomNoise),
      });
    }
  });
  
  return data;
};

const heatmapData = generateHeatmapData();

// Peak demand analysis
const peakAnalysis = [
  { time: '6-9 AM', average: 145, peak: 189, events: 23 },
  { time: '9-12 PM', average: 167, peak: 201, events: 18 },
  { time: '12-3 PM', average: 178, peak: 215, events: 31 },
  { time: '3-6 PM', average: 192, peak: 234, events: 45 },
  { time: '6-9 PM', average: 156, peak: 198, events: 27 },
  { time: '9-12 AM', average: 98, peak: 132, events: 12 },
];

// Radar chart data for multi-dimensional analysis
const radarData = [
  { metric: 'Efficiency', current: 92, target: 95, industry: 85 },
  { metric: 'Cost', current: 78, target: 90, industry: 70 },
  { metric: 'Reliability', current: 96, target: 98, industry: 88 },
  { metric: 'Sustainability', current: 85, target: 95, industry: 75 },
  { metric: 'Predictability', current: 89, target: 92, industry: 80 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

export function AdvancedAnalytics() {
  const { theme } = useTheme();
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <BarChart3 className="size-8 text-blue-600" />
              Advanced Analytics
            </h1>
            <p className="text-slate-600 mt-2">Deep insights and correlation analysis</p>
          </div>
          <ExportButtons 
            data={hourlyData}
            fileName="Advanced_Analytics"
          />
        </div>

        {/* Correlation Matrix */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="size-5 text-blue-600" />
            Feature Correlation Matrix
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Correlation strength between features and energy consumption
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={correlationData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 1]} stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="feature" stroke="#64748b" tick={{ fontSize: 11 }} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="consumption" fill="#3b82f6" radius={[0, 8, 8, 0]}>
                {correlationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Key Insight:</strong> Temperature shows the strongest correlation (0.87) with energy consumption,
              followed by occupancy (0.72). This validates our model's feature selection.
            </p>
          </div>
        </div>

        {/* Feature Importance */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Flame className="size-5 text-orange-600" />
            ML Model Feature Importance
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Impact of each feature on Random Forest predictions
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={featureImportance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="feature" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="importance" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 24-Hour Breakdown */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="size-5 text-purple-600" />
              24-Hour Consumption Pattern
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="hourlyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 10 }} interval={3} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
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
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#hourlyGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Cost Breakdown */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <DollarSign className="size-5 text-green-600" />
              Hourly Cost Analysis
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 10 }} interval={3} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => `$${value.toFixed(2)}`}
                />
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#costGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Comparison */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Week-over-Week Comparison
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="thisWeek" fill="#3b82f6" radius={[8, 8, 0, 0]} name="This Week" />
              <Bar dataKey="lastWeek" fill="#94a3b8" radius={[8, 8, 0, 0]} name="Last Week" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 font-medium">Total Reduction</p>
              <p className="text-2xl font-bold text-green-900">7.8%</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 font-medium">This Week</p>
              <p className="text-2xl font-bold text-blue-900">5,640 kWh</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-700 font-medium">Last Week</p>
              <p className="text-2xl font-bold text-slate-900">6,120 kWh</p>
            </div>
          </div>
        </div>

        {/* Peak Demand Analysis */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Peak Demand Analysis by Time Period
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={peakAnalysis}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
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
                dataKey="average"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Average"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="peak"
                stroke="#ef4444"
                strokeWidth={2}
                name="Peak"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-900">
              <strong>Peak Alert:</strong> Highest peak demand occurs between 3-6 PM (234 kWh) with 45 peak events.
              Consider load shifting to reduce costs.
            </p>
          </div>
        </div>

        {/* Radar Chart - Multi-dimensional Performance */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Multi-Dimensional Performance Analysis
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" stroke="#64748b" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              <Radar name="Industry Avg" dataKey="industry" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm text-slate-700">Current Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-sm text-slate-700">Target Goals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-400 rounded"></div>
              <span className="text-sm text-slate-700">Industry Average</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}