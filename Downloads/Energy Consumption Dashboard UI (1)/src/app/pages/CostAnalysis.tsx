import { motion } from 'motion/react';
import { DollarSign, TrendingDown, Lightbulb, PiggyBank, Calculator, Zap } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';
import { ExportButtons } from '../components/ExportButtons';

// Monthly cost data
const monthlyCostData = [
  { month: 'Jan', actual: 1250, optimized: 980, savings: 270 },
  { month: 'Feb', actual: 1180, optimized: 920, savings: 260 },
  { month: 'Mar', actual: 1320, optimized: 1050, savings: 270 },
  { month: 'Apr', actual: 1280, optimized: 1020, savings: 260 },
  { month: 'May', actual: 1450, optimized: 1150, savings: 300 },
  { month: 'Jun', actual: 1520, optimized: 1210, savings: 310 },
];

// Cost breakdown by category
const costBreakdown = [
  { name: 'HVAC', value: 42, cost: 525 },
  { name: 'Lighting', value: 28, cost: 350 },
  { name: 'Equipment', value: 18, cost: 225 },
  { name: 'Other', value: 12, cost: 150 },
];

// Time-of-use rates
const timeOfUseData = [
  { hour: '00:00', rate: 0.08, consumption: 45 },
  { hour: '03:00', rate: 0.08, consumption: 42 },
  { hour: '06:00', rate: 0.12, consumption: 85 },
  { hour: '09:00', rate: 0.18, consumption: 145 },
  { hour: '12:00', rate: 0.18, consumption: 165 },
  { hour: '15:00', rate: 0.22, consumption: 178 },
  { hour: '18:00', rate: 0.22, consumption: 192 },
  { hour: '21:00', rate: 0.12, consumption: 125 },
];

// Savings recommendations
const recommendations = [
  {
    id: 1,
    title: 'Shift Peak Load to Off-Peak Hours',
    description: 'Move 20% of non-critical operations from 3-6 PM to night hours',
    estimatedSavings: 340,
    difficulty: 'Medium',
    roi: '3-6 months',
    icon: Zap,
    color: 'blue',
  },
  {
    id: 2,
    title: 'Upgrade to LED Lighting',
    description: 'Replace remaining fluorescent lights with energy-efficient LEDs',
    estimatedSavings: 180,
    difficulty: 'Easy',
    roi: '12-18 months',
    icon: Lightbulb,
    color: 'yellow',
  },
  {
    id: 3,
    title: 'Optimize HVAC Scheduling',
    description: 'Implement smart scheduling based on occupancy patterns',
    estimatedSavings: 420,
    difficulty: 'Medium',
    roi: '4-8 months',
    icon: TrendingDown,
    color: 'green',
  },
  {
    id: 4,
    title: 'Install Solar Panels',
    description: 'Add 50kW solar capacity to reduce grid dependency',
    estimatedSavings: 650,
    difficulty: 'Hard',
    roi: '36-48 months',
    icon: PiggyBank,
    color: 'purple',
  },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export function CostAnalysis() {
  const [rateType, setRateType] = useState<'standard' | 'time-of-use'>('standard');
  const [monthlyBudget, setMonthlyBudget] = useState(1200);

  const currentMonthCost = 1520;
  const optimizedCost = 1210;
  const totalSavingsPotential = currentMonthCost - optimizedCost;
  const annualSavingsPotential = totalSavingsPotential * 12;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-amber-600 bg-amber-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'yellow': return 'text-yellow-600 bg-yellow-100';
      case 'green': return 'text-green-600 bg-green-100';
      case 'purple': return 'text-purple-600 bg-purple-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <DollarSign className="size-8 text-green-600" />
              Cost Analysis & Savings Calculator
            </h1>
            <p className="text-slate-600 mt-2">Maximize savings and optimize energy costs</p>
          </div>
          <ExportButtons 
            data={monthlyCostData}
            fileName="Cost_Analysis"
          />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="size-8 text-slate-600" />
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Current Month Cost</h3>
            <p className="text-3xl font-bold text-slate-800">${currentMonthCost}</p>
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <TrendingDown className="size-3" />
              ${currentMonthCost - monthlyBudget} over budget
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg border border-green-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="size-8 text-green-600" />
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Optimized Cost</h3>
            <p className="text-3xl font-bold text-green-600">${optimizedCost}</p>
            <p className="text-xs text-green-500 mt-1">With recommended changes</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg border border-blue-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <PiggyBank className="size-8 text-blue-600" />
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Monthly Savings</h3>
            <p className="text-3xl font-bold text-blue-600">${totalSavingsPotential}</p>
            <p className="text-xs text-blue-500 mt-1">{((totalSavingsPotential / currentMonthCost) * 100).toFixed(1)}% reduction</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg border border-purple-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Calculator className="size-8 text-purple-600" />
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Annual Savings</h3>
            <p className="text-3xl font-bold text-purple-600">${annualSavingsPotential.toLocaleString()}</p>
            <p className="text-xs text-purple-500 mt-1">Projected for 12 months</p>
          </motion.div>
        </div>

        {/* Cost Trend */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Cost Trend: Actual vs Optimized
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyCostData}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="optimizedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: any) => `$${value}`}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#actualGradient)"
                name="Actual Cost"
              />
              <Area
                type="monotone"
                dataKey="optimized"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#optimizedGradient)"
                name="Optimized Cost"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-700 font-medium">Total Spent (6 months)</p>
              <p className="text-2xl font-bold text-red-900">
                ${monthlyCostData.reduce((sum, d) => sum + d.actual, 0)}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 font-medium">Optimized Total</p>
              <p className="text-2xl font-bold text-green-900">
                ${monthlyCostData.reduce((sum, d) => sum + d.optimized, 0)}
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 font-medium">Total Savings</p>
              <p className="text-2xl font-bold text-blue-900">
                ${monthlyCostData.reduce((sum, d) => sum + d.savings, 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Cost Breakdown by Category
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: any, name: any, props: any) => [`$${props.payload.cost}`, `${value}%`]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {costBreakdown.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{item.name}</p>
                    <p className="text-xs text-slate-500">${item.cost}/month</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Time-of-Use Rate Analysis
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeOfUseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="consumption" fill="#3b82f6" name="Consumption (kWh)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="rate" fill="#f59e0b" name="Rate ($/kWh)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-900">
                <strong>Recommendation:</strong> Peak rate hours (3-6 PM) show highest consumption.
                Shifting 20% of load could save $340/month.
              </p>
            </div>
          </div>
        </div>

        {/* Savings Recommendations */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Savings Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => {
              const Icon = rec.icon;
              return (
                <motion.div
                  key={rec.id}
                  whileHover={{ scale: 1.02 }}
                  className="border border-slate-200 rounded-lg p-5 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${getIconColor(rec.color)}`}>
                      <Icon className="size-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 mb-2">{rec.title}</h3>
                      <p className="text-sm text-slate-600 mb-4">{rec.description}</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <p className="text-xs text-slate-500">Savings</p>
                          <p className="text-lg font-bold text-green-600">${rec.estimatedSavings}/mo</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Difficulty</p>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(rec.difficulty)}`}>
                            {rec.difficulty}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">ROI</p>
                          <p className="text-sm font-medium text-slate-700">{rec.roi}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Total Potential Monthly Savings</h3>
                <p className="text-sm opacity-90">By implementing all recommendations</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">
                  ${recommendations.reduce((sum, r) => sum + r.estimatedSavings, 0)}
                </p>
                <p className="text-sm opacity-90 mt-1">per month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}