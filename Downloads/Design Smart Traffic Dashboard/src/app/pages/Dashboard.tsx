import { motion } from "motion/react";
import {
  Car,
  AlertTriangle,
  Activity,
  Video,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const stats = [
  {
    title: "Total Vehicles Today",
    value: "24,586",
    change: "+12.5%",
    trend: "up",
    icon: Car,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Active Violations",
    value: "342",
    change: "-8.2%",
    trend: "down",
    icon: AlertTriangle,
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Traffic Density",
    value: "68%",
    change: "+5.1%",
    trend: "up",
    icon: Activity,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Active Cameras",
    value: "142/150",
    change: "94.6%",
    trend: "up",
    icon: Video,
    color: "from-green-500 to-emerald-600",
  },
];

const hourlyData = [
  { time: "00:00", count: 1200 },
  { time: "04:00", count: 800 },
  { time: "08:00", count: 4500 },
  { time: "12:00", count: 3800 },
  { time: "16:00", count: 5200 },
  { time: "20:00", count: 3100 },
  { time: "23:59", count: 1800 },
];

const violationData = [
  { name: "Speeding", value: 145, color: "#3b82f6" },
  { name: "Red Light", value: 98, color: "#8b5cf6" },
  { name: "Wrong Lane", value: 56, color: "#ec4899" },
  { name: "No Helmet", value: 43, color: "#f59e0b" },
];

const vehicleData = [
  { category: "Car", count: 12500 },
  { category: "Bike", count: 8200 },
  { category: "Bus", count: 1800 },
  { category: "Truck", count: 2086 },
];

const recentViolations = [
  {
    plate: "ABC 1234",
    type: "Speeding",
    location: "Highway 101, KM 45",
    time: "10:24 AM",
    fine: "$150",
    status: "Pending",
  },
  {
    plate: "XYZ 5678",
    type: "Red Light",
    location: "Main St & 5th Ave",
    time: "10:18 AM",
    fine: "$200",
    status: "Pending",
  },
  {
    plate: "DEF 9012",
    type: "Wrong Lane",
    location: "Central Blvd",
    time: "10:12 AM",
    fine: "$100",
    status: "Paid",
  },
  {
    plate: "GHI 3456",
    type: "No Helmet",
    location: "Park Road",
    time: "10:05 AM",
    fine: "$75",
    status: "Pending",
  },
  {
    plate: "JKL 7890",
    type: "Speeding",
    location: "Highway 202, KM 23",
    time: "09:58 AM",
    fine: "$150",
    status: "Paid",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome section with 3D animated image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-200 shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome, David Thompson
                  </h2>
                  <p className="text-gray-600 text-lg mb-4">
                    Traffic Control Officer • City Admin
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-xl shadow-md">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-gray-700">
                        All Systems Operational
                      </span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2 text-sm">
                      Thursday, Feb 26, 2026
                    </Badge>
                  </div>
                </motion.div>
              </div>

              {/* 3D Animated Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  transition: { duration: 0.3 },
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1760087616415-62270db23966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tYW5kJTIwY29udHJvbCUyMHJvb20lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MjEwNTEwMnww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Control Center"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                  
                  {/* Floating stats overlay */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">24.5K</p>
                        <p className="text-xs text-gray-600">Vehicles Today</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-600">142</p>
                        <p className="text-xs text-gray-600">Active Cameras</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">98.5%</p>
                        <p className="text-xs text-gray-600">Accuracy</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats cards with 3D hover effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -8,
                rotateX: 5,
                rotateY: 5,
                boxShadow: "0 20px 40px -15px rgba(59, 130, 246, 0.3)",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="bg-white border-gray-200 hover:border-blue-300 transition-all duration-300 overflow-hidden relative">
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0`}
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-2">{stat.title}</p>
                      <motion.h3
                        className="text-3xl font-bold text-gray-900 mb-2"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {stat.value}
                      </motion.h3>
                      <div className="flex items-center gap-2">
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            stat.trend === "up"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-400">vs yesterday</span>
                      </div>
                    </div>
                    <motion.div
                      className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -10, 10, 0],
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly vehicle count */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Hourly Vehicle Count
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
                    labelStyle={{ color: "#111827" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#colorCount)"
                    dot={{ fill: "#3b82f6", r: 4 }}
                    activeDot={{ r: 6, fill: "#2563eb" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Violation types pie chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Violation Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={violationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {violationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ color: "#111827" }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Vehicle category breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" />
              Vehicle Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vehicleData}>
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="url(#colorBar)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent violations table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Recent Violations
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    className="pl-9 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 w-64 hover:bg-gray-100 transition-colors"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Filter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Plate Number
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Violation Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Time
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Fine Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentViolations.map((violation, index) => (
                    <motion.tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="py-3 px-4 text-gray-900 font-mono font-semibold">
                        {violation.plate}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {violation.type}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {violation.location}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {violation.time}
                      </td>
                      <td className="py-3 px-4 text-blue-600 font-semibold">
                        {violation.fine}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            violation.status === "Paid"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            violation.status === "Paid"
                              ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                              : "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200"
                          }
                        >
                          {violation.status}
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}