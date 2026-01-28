import { motion } from 'motion/react';
import { Search, TrendingUp, Users, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { useTheme } from '@/app/App';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

export function DashboardPage() {
  const { theme } = useTheme();

  const stats = [
    {
      title: 'Total Scans',
      value: '1,284',
      change: '+12%',
      icon: Search,
      color: theme === 'dark' ? 'from-blue-600 to-indigo-600' : 'from-primary to-primary/80',
    },
    {
      title: 'Fake Detected',
      value: '342',
      change: '+8%',
      icon: XCircle,
      color: 'from-red-600 to-pink-600',
    },
    {
      title: 'Real Accounts',
      value: '856',
      change: '+15%',
      icon: CheckCircle,
      color: 'from-green-600 to-emerald-600',
    },
    {
      title: 'Suspicious',
      value: '86',
      change: '-5%',
      icon: AlertTriangle,
      color: 'from-yellow-600 to-orange-600',
    },
  ];

  const chartData = [
    { name: 'Mon', fake: 12, real: 45, suspicious: 8 },
    { name: 'Tue', fake: 19, real: 52, suspicious: 12 },
    { name: 'Wed', fake: 15, real: 48, suspicious: 10 },
    { name: 'Thu', fake: 22, real: 39, suspicious: 15 },
    { name: 'Fri', fake: 28, real: 55, suspicious: 18 },
    { name: 'Sat', fake: 25, real: 62, suspicious: 14 },
    { name: 'Sun', fake: 20, real: 58, suspicious: 11 },
  ];

  const pieData = [
    { name: 'Real', value: 856, color: '#22C55E' },
    { name: 'Fake', value: 342, color: '#EF4444' },
    { name: 'Suspicious', value: 86, color: '#F59E0B' },
  ];

  const recentScans = [
    { username: '@johndoe123', status: 'real', score: 92, time: '2 mins ago' },
    { username: '@fakepage456', status: 'fake', score: 23, time: '5 mins ago' },
    { username: '@maybe_real', status: 'suspicious', score: 58, time: '12 mins ago' },
    { username: '@verified_user', status: 'real', score: 88, time: '24 mins ago' },
    { username: '@spam_account', status: 'fake', score: 15, time: '1 hour ago' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'real') return 'text-green-500 bg-green-500/20';
    if (status === 'fake') return 'text-red-500 bg-red-500/20';
    return 'text-yellow-500 bg-yellow-500/20';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'real') return <CheckCircle className="w-5 h-5" />;
    if (status === 'fake') return <XCircle className="w-5 h-5" />;
    return <AlertTriangle className="w-5 h-5" />;
  };

  const cardClass = theme === 'dark'
    ? 'p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 backdrop-blur-sm hover:border-blue-500/50 transition-all'
    : 'p-6 bg-white/90 border-primary/10 shadow-lg hover:border-primary/30 hover:shadow-xl transition-all backdrop-blur-sm';

  const headingClass = theme === 'dark' ? 'text-white' : 'text-foreground';
  const subheadingClass = theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground';
  const scanBgClass = theme === 'dark' ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-secondary/50 hover:bg-secondary/70';
  
  const chartTooltipStyle = theme === 'dark'
    ? { backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }
    : { backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' };

  const gridColor = theme === 'dark' ? '#374151' : '#E5E7EB';
  const axisColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className={`text-4xl font-bold ${headingClass} mb-2`}>Dashboard</h1>
            <p className={subheadingClass}>Monitor your Instagram account analysis statistics</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={subheadingClass}>All systems operational</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cardClass}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-500 text-sm font-semibold">
                    {stat.change}
                  </span>
                </div>
                <h3 className={`text-sm mb-1 ${subheadingClass}`}>{stat.title}</h3>
                <p className={`text-3xl font-bold ${headingClass}`}>{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className={cardClass}>
              <h3 className={`text-xl font-bold ${headingClass} mb-6`}>Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="name" stroke={axisColor} />
                  <YAxis stroke={axisColor} />
                  <Tooltip contentStyle={chartTooltipStyle} />
                  <Bar dataKey="real" fill="#22C55E" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="fake" fill="#EF4444" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="suspicious" fill="#F59E0B" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className={cardClass}>
              <h3 className={`text-xl font-bold ${headingClass} mb-6`}>Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Recent Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className={cardClass}>
            <h3 className={`text-xl font-bold ${headingClass} mb-6`}>Recent Scans</h3>
            <div className="space-y-4">
              {recentScans.map((scan, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all ${scanBgClass}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(scan.status)}`}>
                      {getStatusIcon(scan.status)}
                    </div>
                    <div>
                      <p className={`font-semibold ${headingClass}`}>{scan.username}</p>
                      <p className={`text-sm ${subheadingClass}`}>{scan.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${headingClass}`}>{scan.score}%</p>
                    <p className={`text-sm capitalize ${subheadingClass}`}>{scan.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}