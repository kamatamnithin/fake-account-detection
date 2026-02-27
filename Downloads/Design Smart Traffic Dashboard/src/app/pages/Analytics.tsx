import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  BarChart3,
  TrendingUp,
  Moon,
  Sun,
  Cpu,
  Target,
  Clock,
  Calendar as CalendarIcon,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { analyticsApi } from "../services/api";

const dayNightData = [
  { time: "00:00", day: 0, night: 850 },
  { time: "04:00", day: 0, night: 620 },
  { time: "08:00", day: 4200, night: 0 },
  { time: "12:00", day: 3500, night: 0 },
  { time: "16:00", day: 4800, night: 0 },
  { time: "20:00", day: 0, night: 2900 },
  { time: "23:59", day: 0, night: 1650 },
];

const modelAccuracyData = [
  { model: "YOLOv5", accuracy: 92.5, speed: 45, f1Score: 91.2 },
  { model: "YOLOv8", accuracy: 96.8, speed: 62, f1Score: 95.4 },
  { model: "Faster R-CNN", accuracy: 94.2, speed: 28, f1Score: 93.1 },
  { model: "EfficientDet", accuracy: 93.7, speed: 38, f1Score: 92.8 },
];

const monthlyTrafficData = [
  { month: "Jan", vehicles: 685000 },
  { month: "Feb", vehicles: 720000 },
  { month: "Mar", vehicles: 750000 },
  { month: "Apr", vehicles: 695000 },
  { month: "May", vehicles: 780000 },
  { month: "Jun", vehicles: 810000 },
];

const performanceMetrics = [
  { metric: "Detection", value: 96.8 },
  { metric: "Classification", value: 94.2 },
  { metric: "Tracking", value: 92.5 },
  { metric: "OCR", value: 98.1 },
  { metric: "Speed", value: 91.7 },
];

export function Analytics() {
  const [stats, setStats] = useState({
    avgAccuracy: "96.8%",
    totalProcessed: "2.4M",
    avgResponseTime: "45ms",
    uptime: "99.9%",
  });

  // Load analytics data from API
  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data = await analyticsApi.getStats();
        console.log("Analytics data loaded:", data);
        // Update stats with real data if needed
      } catch (error) {
        console.warn("⚠️ Failed to load analytics from backend:", error);
        console.log("📊 Using mock data for analytics display");
      }
    }
    loadAnalytics();
  }, []);

  const metrics = [
    {
      title: "Average Accuracy",
      value: stats.avgAccuracy,
      icon: Target,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Processed",
      value: stats.totalProcessed,
      icon: Activity,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Avg Response Time",
      value: stats.avgResponseTime,
      icon: Clock,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "System Uptime",
      value: stats.uptime,
      icon: Cpu,
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Header with 3D Animated Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-200 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* 3D Animated Image */}
              <motion.div
                className="relative order-2 md:order-1"
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                whileHover={{
                  scale: 1.05,
                  rotateY: -5,
                  rotateX: 5,
                  transition: { duration: 0.3 },
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1762279389083-abf71f22d338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwY2hhcnRzJTIwZ3JhcGhzJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzIxMDUwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Analytics Dashboard"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
                  
                  {/* Floating metrics overlay */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-purple-600">96.8%</p>
                        <p className="text-xs text-gray-600">Avg Accuracy</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">2.4M</p>
                        <p className="text-xs text-gray-600">Total Processed</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="space-y-4 relative z-10 order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-purple-700">
                      Advanced Analytics
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    System Performance Analytics
                  </h2>
                  <p className="text-gray-600 text-lg mb-4">
                    Real-time insights and AI-powered detection metrics
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl shadow-md">
                      <Activity className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Live Tracking Active
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl shadow-md">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">
                        +12.5% This Month
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance metrics cards with 3D effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -10,
                rotateX: 10,
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="bg-white border-gray-200 shadow-lg relative overflow-hidden">
                {/* Animated gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0`}
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                />
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">{metric.title}</p>
                  <motion.p
                    className="text-3xl font-bold text-gray-900"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {metric.value}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Day vs Night Traffic */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-yellow-500" />
                  <Moon className="w-5 h-5 text-indigo-500" />
                </div>
                Day vs Night Traffic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dayNightData}>
                  <defs>
                    <linearGradient id="colorDay" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorNight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="day"
                    stroke="#f59e0b"
                    fill="url(#colorDay)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="night"
                    stroke="#6366f1"
                    fill="url(#colorNight)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Model Performance Radar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={performanceMetrics}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                  <PolarRadiusAxis stroke="#6b7280" />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Monthly Traffic Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.01 }}
      >
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              Monthly Traffic Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrafficData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="vehicles" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Model Accuracy Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.01 }}
      >
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              AI Model Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={modelAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="model" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="f1Score"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="speed"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}