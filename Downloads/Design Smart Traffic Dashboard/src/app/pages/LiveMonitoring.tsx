import { useState } from "react";
import { motion } from "motion/react";
import {
  Video,
  Maximize2,
  AlertCircle,
  Camera,
  CheckCircle,
  Activity,
  ZoomIn,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";

const detectedVehicles = [
  {
    plate: "ABC 1234",
    confidence: 98.5,
    type: "Car",
    violation: null,
    timestamp: "10:45:32",
  },
  {
    plate: "XYZ 5678",
    confidence: 96.2,
    type: "Bike",
    violation: "No Helmet",
    timestamp: "10:45:28",
  },
  {
    plate: "DEF 9012",
    confidence: 99.1,
    type: "Car",
    violation: null,
    timestamp: "10:45:24",
  },
  {
    plate: "GHI 3456",
    confidence: 94.7,
    type: "Truck",
    violation: null,
    timestamp: "10:45:18",
  },
  {
    plate: "JKL 7890",
    confidence: 97.8,
    type: "Car",
    violation: "Speeding",
    timestamp: "10:45:12",
  },
  {
    plate: "MNO 1122",
    confidence: 95.3,
    type: "Bus",
    violation: null,
    timestamp: "10:45:05",
  },
  {
    plate: "PQR 3344",
    confidence: 98.9,
    type: "Bike",
    violation: null,
    timestamp: "10:44:58",
  },
  {
    plate: "STU 5566",
    confidence: 93.2,
    type: "Car",
    violation: "Red Light",
    timestamp: "10:44:52",
  },
];

const cameraFeeds = [
  { id: 1, name: "Highway 101 - North", status: "active" },
  { id: 2, name: "Main St Intersection", status: "active" },
  { id: 3, name: "Central Blvd", status: "active" },
  { id: 4, name: "Highway 202 - South", status: "active" },
];

export function LiveMonitoring() {
  const [selectedCamera, setSelectedCamera] = useState(cameraFeeds[0]);
  const [violations] = useState(
    detectedVehicles.filter((v) => v.violation !== null).length
  );

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Live Cameras</p>
                  <p className="text-2xl font-bold text-gray-900">4/4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Detected</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {detectedVehicles.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Violations</p>
                  <p className="text-2xl font-bold text-gray-900">{violations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg Confidence</p>
                  <p className="text-2xl font-bold text-gray-900">96.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video feed */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-600" />
                  {selectedCamera.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-700 font-semibold">
                      LIVE
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Mock CCTV feed */}
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1733149086985-7e607db85843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdod2F5JTIwdHJhZmZpYyUyMHN1cnZlaWxsYW5jZSUyMGNhbWVyYXxlbnwxfHx8fDE3NzIwODE0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="CCTV Feed"
                  className="w-full h-full object-cover"
                />

                {/* Animated bounding boxes with 3D effect */}
                <motion.div
                  className="absolute top-20 left-32 w-32 h-24 border-2 border-blue-500 rounded shadow-lg backdrop-blur-sm"
                  animate={{
                    borderColor: ["#3b82f6", "#06b6d4", "#3b82f6"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ scale: 1.05 }}
                  style={{ borderWidth: 2 }}
                >
                  <motion.div
                    className="absolute -top-7 left-0 bg-blue-500 text-white text-xs px-3 py-1 rounded-lg font-semibold shadow-lg"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Car - 98.5%
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute top-32 right-40 w-24 h-20 border-2 border-red-500 rounded shadow-lg backdrop-blur-sm"
                  animate={{
                    borderColor: ["#ef4444", "#f59e0b", "#ef4444"],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  whileHover={{ scale: 1.05 }}
                  style={{ borderWidth: 2 }}
                >
                  <motion.div
                    className="absolute -top-7 left-0 bg-red-500 text-white text-xs px-3 py-1 rounded-lg font-semibold shadow-lg"
                    animate={{
                      boxShadow: [
                        "0 4px 6px rgba(239, 68, 68, 0.3)",
                        "0 6px 12px rgba(239, 68, 68, 0.5)",
                        "0 4px 6px rgba(239, 68, 68, 0.3)",
                      ],
                    }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    ⚠️ Violation!
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute bottom-24 left-20 w-28 h-20 border-2 border-blue-500 rounded shadow-lg backdrop-blur-sm"
                  animate={{
                    borderColor: ["#3b82f6", "#8b5cf6", "#3b82f6"],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  whileHover={{ scale: 1.05 }}
                  style={{ borderWidth: 2 }}
                >
                  <motion.div
                    className="absolute -top-7 left-0 bg-blue-500 text-white text-xs px-3 py-1 rounded-lg font-semibold shadow-lg"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  >
                    Bike - 96.2%
                  </motion.div>
                </motion.div>

                {/* Info overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-gray-900 text-sm font-semibold">
                      {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200">
                    <p className="text-gray-900 text-sm font-semibold">FPS: 30 | Resolution: 1080p</p>
                  </div>
                </div>
              </div>

              {/* Camera selector */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {cameraFeeds.map((camera) => (
                  <motion.button
                    key={camera.id}
                    onClick={() => setSelectedCamera(camera)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedCamera.id === camera.id
                        ? "bg-blue-50 border-blue-500 shadow-md"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera
                      className={`w-5 h-5 mb-1 mx-auto ${
                        selectedCamera.id === camera.id
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    />
                    <p
                      className={`text-xs font-medium ${
                        selectedCamera.id === camera.id
                          ? "text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      Cam {camera.id}
                    </p>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detection panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-white border-gray-200 shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Live Detections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {detectedVehicles.map((vehicle, index) => (
                    <motion.div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        vehicle.violation
                          ? "bg-red-50 border-red-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-gray-900 font-mono font-bold text-lg">
                            {vehicle.plate}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {vehicle.type}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-700 border-blue-200"
                        >
                          {vehicle.confidence}%
                        </Badge>
                      </div>

                      {vehicle.violation && (
                        <div className="mt-2 p-2 bg-red-100 rounded-lg border border-red-200">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="text-red-700 text-sm font-semibold">
                              {vehicle.violation}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span>{vehicle.timestamp}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <ZoomIn className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}