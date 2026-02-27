import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Camera,
  Activity,
  AlertTriangle,
  X,
  Video,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const cameraLocations = [
  {
    id: 1,
    name: "Highway 101 - North",
    lat: 40.7589,
    lng: -73.9851,
    status: "active",
    vehicles: 245,
    violations: 12,
    density: "high",
    position: { top: "20%", left: "25%" },
  },
  {
    id: 2,
    name: "Main St Intersection",
    lat: 40.7489,
    lng: -73.9681,
    status: "active",
    vehicles: 156,
    violations: 8,
    density: "moderate",
    position: { top: "45%", left: "55%" },
  },
  {
    id: 3,
    name: "Central Blvd",
    lat: 40.7389,
    lng: -73.9881,
    status: "active",
    vehicles: 89,
    violations: 3,
    density: "low",
    position: { top: "65%", left: "30%" },
  },
  {
    id: 4,
    name: "Highway 202 - South",
    lat: 40.7289,
    lng: -73.9551,
    status: "active",
    vehicles: 312,
    violations: 18,
    density: "high",
    position: { top: "75%", left: "70%" },
  },
  {
    id: 5,
    name: "Downtown Plaza",
    lat: 40.7489,
    lng: -73.9951,
    status: "active",
    vehicles: 198,
    violations: 6,
    density: "moderate",
    position: { top: "35%", left: "45%" },
  },
  {
    id: 6,
    name: "Park Road",
    lat: 40.7189,
    lng: -73.9751,
    status: "active",
    vehicles: 124,
    violations: 4,
    density: "moderate",
    position: { top: "55%", left: "60%" },
  },
];

const trafficZones = [
  {
    id: "zone-1",
    type: "high",
    position: { top: "18%", left: "23%" },
    size: { width: "180px", height: "120px" },
  },
  {
    id: "zone-2",
    type: "moderate",
    position: { top: "43%", left: "53%" },
    size: { width: "150px", height: "100px" },
  },
  {
    id: "zone-3",
    type: "low",
    position: { top: "63%", left: "28%" },
    size: { width: "120px", height: "90px" },
  },
  {
    id: "zone-4",
    type: "high",
    position: { top: "73%", left: "68%" },
    size: { width: "200px", height: "130px" },
  },
];

export function MapView() {
  const [selectedCamera, setSelectedCamera] = useState<typeof cameraLocations[0] | null>(null);

  const getDensityColor = (density: string) => {
    switch (density) {
      case "high":
        return "from-red-500/30 to-orange-500/30 border-red-500/50";
      case "moderate":
        return "from-yellow-500/30 to-orange-500/30 border-yellow-500/50";
      case "low":
        return "from-green-500/30 to-emerald-500/30 border-green-500/50";
      default:
        return "from-gray-500/30 to-gray-500/30 border-gray-500/50";
    }
  };

  const getZoneColor = (type: string) => {
    switch (type) {
      case "high":
        return "bg-red-500/20 border-red-500/40";
      case "moderate":
        return "bg-yellow-500/20 border-yellow-500/40";
      case "low":
        return "bg-green-500/20 border-green-500/40";
      default:
        return "bg-gray-500/20 border-gray-500/40";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Active Cameras</p>
                  <p className="text-2xl font-bold text-white">
                    {cameraLocations.length}
                  </p>
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
          <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">High Traffic Zones</p>
                  <p className="text-2xl font-bold text-white">2</p>
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
          <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Vehicles</p>
                  <p className="text-2xl font-bold text-white">1,124</p>
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
          <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Active Violations</p>
                  <p className="text-2xl font-bold text-white">51</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Map view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-400" />
                Traffic Heat Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mock map */}
              <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden">
                {/* Map background image */}
                <img
                  src="https://images.unsplash.com/photo-1722082839841-45473f5a15cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwR1BTJTIwbmF2aWdhdGlvbiUyMGFlcmlhbHxlbnwxfHx8fDE3NzIwNzI1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="City Map"
                  className="w-full h-full object-cover opacity-60"
                />

                {/* Traffic heat zones */}
                {trafficZones.map((zone, index) => (
                  <motion.div
                    key={zone.id}
                    className={`absolute ${getZoneColor(zone.type)} rounded-2xl border-2 blur-sm`}
                    style={{
                      top: zone.position.top,
                      left: zone.position.left,
                      width: zone.size.width,
                      height: zone.size.height,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  />
                ))}

                {/* Camera markers */}
                {cameraLocations.map((camera, index) => (
                  <motion.button
                    key={camera.id}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
                    style={{
                      top: camera.position.top,
                      left: camera.position.left,
                    }}
                    onClick={() => setSelectedCamera(camera)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {/* Pulse animation */}
                    <motion.div
                      className="absolute inset-0 bg-cyan-500 rounded-full"
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Marker */}
                    <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <Camera className="w-5 h-5 text-white" />
                    </div>

                    {/* Hover label */}
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-slate-900 px-3 py-2 rounded-lg border border-white/20 whitespace-nowrap">
                        <p className="text-white text-xs font-semibold">
                          {camera.name}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                  <h4 className="text-white text-sm font-semibold mb-3">
                    Traffic Density
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded" />
                      <span className="text-xs text-gray-300">
                        Smooth (0-30%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded" />
                      <span className="text-xs text-gray-300">
                        Moderate (30-60%)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded" />
                      <span className="text-xs text-gray-300">
                        Heavy (60-100%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Camera count */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <span className="text-white text-sm font-semibold">
                      {cameraLocations.length} Cameras
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Camera list */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-cyan-400" />
                Camera List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {cameraLocations.map((camera, index) => (
                  <motion.button
                    key={camera.id}
                    onClick={() => setSelectedCamera(camera)}
                    className={`w-full p-4 rounded-xl border transition-all ${
                      selectedCamera?.id === camera.id
                        ? "bg-cyan-500/20 border-cyan-500/50"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${getDensityColor(
                            camera.density
                          )} rounded-lg flex items-center justify-center`}
                        >
                          <Camera className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-white font-semibold text-sm">
                            {camera.name}
                          </h4>
                          <p className="text-xs text-gray-400">CAM-{camera.id}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-500/20 text-green-400 border-green-500/50"
                      >
                        Active
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-xs text-gray-400 mb-1">Vehicles</p>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-cyan-400" />
                          <p className="text-white font-semibold text-sm">
                            {camera.vehicles}
                          </p>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-xs text-gray-400 mb-1">Violations</p>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-red-400" />
                          <p className="text-white font-semibold text-sm">
                            {camera.violations}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Camera detail modal */}
      <AnimatePresence>
        {selectedCamera && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCamera(null)}
          >
            <motion.div
              className="bg-slate-900 rounded-2xl border border-white/10 p-6 max-w-2xl w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedCamera.name}
                  </h3>
                  <p className="text-gray-400">Camera ID: CAM-{selectedCamera.id}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedCamera(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    <p className="text-sm text-gray-400">Current Vehicles</p>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {selectedCamera.vehicles}
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <p className="text-sm text-gray-400">Violations Today</p>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {selectedCamera.violations}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      selectedCamera.density === "high"
                        ? "bg-red-500"
                        : selectedCamera.density === "moderate"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  <p className="text-sm text-gray-400">Traffic Density</p>
                </div>
                <p className="text-xl font-bold text-white capitalize">
                  {selectedCamera.density}
                </p>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                  <Video className="w-4 h-4 mr-2" />
                  View Live Feed
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-white/5 border-white/10 text-gray-400 hover:text-white"
                >
                  View Statistics
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
