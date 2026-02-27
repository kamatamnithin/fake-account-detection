import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  Car,
  Image as ImageIcon,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const mockVehicleData = {
  plate: "ABC 1234",
  type: "Sedan",
  color: "Silver",
  owner: "John Doe",
  registrationDate: "Jan 15, 2024",
  history: [
    {
      date: "Feb 26, 2026",
      time: "10:24 AM",
      location: "Highway 101, KM 45",
      camera: "CAM-101-N",
      violation: "Speeding",
      speed: "95 km/h",
      fine: "$150",
      status: "Pending",
      image: true,
    },
    {
      date: "Feb 25, 2026",
      time: "03:45 PM",
      location: "Main St & 5th Ave",
      camera: "CAM-05-INT",
      violation: null,
      speed: "45 km/h",
      fine: null,
      status: "Clear",
      image: true,
    },
    {
      date: "Feb 24, 2026",
      time: "08:15 AM",
      location: "Central Blvd",
      camera: "CAM-CB-12",
      violation: null,
      speed: "52 km/h",
      fine: null,
      status: "Clear",
      image: true,
    },
    {
      date: "Feb 22, 2026",
      time: "05:30 PM",
      location: "Park Road",
      camera: "CAM-PR-08",
      violation: "Wrong Lane",
      speed: "—",
      fine: "$100",
      status: "Paid",
      image: true,
    },
    {
      date: "Feb 20, 2026",
      time: "11:20 AM",
      location: "Highway 202, KM 23",
      camera: "CAM-202-S",
      violation: null,
      speed: "58 km/h",
      fine: null,
      status: "Clear",
      image: true,
    },
  ],
};

export function VehicleSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockVehicleData | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      if (searchQuery.toLowerCase().includes("abc") || searchQuery.toLowerCase().includes("1234")) {
        setSearchResults(mockVehicleData);
      } else {
        setSearchResults(null);
      }
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Search section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Search className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Vehicle Search
              </h2>
              <p className="text-gray-400">
                Search by license plate number to view vehicle history
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Enter license plate (e.g., ABC 1234)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-lg focus:border-cyan-500 focus:ring-cyan-500/50 rounded-xl"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={isSearching || !searchQuery}
                  className="h-14 px-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/50"
                >
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search results */}
      <AnimatePresence>
        {searchResults && (
          <>
            {/* Vehicle info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Car className="w-5 h-5 text-cyan-400" />
                    Vehicle Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">Plate Number</p>
                      <p className="text-xl font-bold text-white font-mono">
                        {searchResults.plate}
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">Vehicle Type</p>
                      <p className="text-xl font-bold text-white">
                        {searchResults.type}
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">Color</p>
                      <p className="text-xl font-bold text-white">
                        {searchResults.color}
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">Registration</p>
                      <p className="text-xl font-bold text-white">
                        {searchResults.registrationDate}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-cyan-400 mb-1">
                          Owner Information
                        </p>
                        <p className="text-white">{searchResults.owner}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* History timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    Detection History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {searchResults.history.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`relative pl-8 pb-8 ${
                          index !== searchResults.history.length - 1
                            ? "border-l-2 border-white/10"
                            : ""
                        }`}
                      >
                        {/* Timeline dot */}
                        <motion.div
                          className={`absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full ${
                            entry.violation
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                          animate={{
                            boxShadow: [
                              `0 0 0 0 ${entry.violation ? "rgba(239, 68, 68, 0)" : "rgba(34, 197, 94, 0)"}`,
                              `0 0 0 8px ${entry.violation ? "rgba(239, 68, 68, 0.2)" : "rgba(34, 197, 94, 0.2)"}`,
                              `0 0 0 0 ${entry.violation ? "rgba(239, 68, 68, 0)" : "rgba(34, 197, 94, 0)"}`,
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />

                        <div
                          className={`p-4 rounded-xl border ${
                            entry.violation
                              ? "bg-red-500/10 border-red-500/30"
                              : "bg-white/5 border-white/10"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-white font-semibold">
                                  {entry.location}
                                </h3>
                                {entry.violation ? (
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                                    {entry.violation}
                                  </Badge>
                                ) : (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                                    Clear
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {entry.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {entry.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {entry.camera}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/5 border-white/10 text-gray-400 hover:text-white"
                            >
                              <ImageIcon className="w-4 h-4 mr-2" />
                              View Image
                            </Button>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Speed</p>
                              <p className="text-white font-semibold">
                                {entry.speed}
                              </p>
                            </div>
                            {entry.fine && (
                              <div className="p-3 bg-white/5 rounded-lg">
                                <p className="text-xs text-gray-400 mb-1">Fine</p>
                                <p className="text-red-400 font-semibold">
                                  {entry.fine}
                                </p>
                              </div>
                            )}
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-1">Status</p>
                              <p
                                className={`font-semibold ${
                                  entry.status === "Clear"
                                    ? "text-green-400"
                                    : entry.status === "Paid"
                                    ? "text-blue-400"
                                    : "text-orange-400"
                                }`}
                              >
                                {entry.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Car className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Total Detections</p>
                        <p className="text-2xl font-bold text-white">
                          {searchResults.history.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Violations</p>
                        <p className="text-2xl font-bold text-white">
                          {searchResults.history.filter((h) => h.violation).length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Last Seen</p>
                        <p className="text-lg font-bold text-white">
                          {searchResults.history[0].date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* No results message */}
      {!searchResults && searchQuery && !isSearching && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-2xl mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Results Found</h3>
          <p className="text-gray-400">
            No vehicle found with plate number "{searchQuery}"
          </p>
        </motion.div>
      )}
    </div>
  );
}
