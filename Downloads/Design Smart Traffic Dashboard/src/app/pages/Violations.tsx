import { useState } from "react";
import { motion } from "motion/react";
import {
  AlertTriangle,
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const violationsData = [
  {
    id: "VIO-2026-001",
    plate: "ABC 1234",
    type: "Speeding",
    location: "Highway 101, KM 45",
    camera: "CAM-101-N",
    date: "Feb 26, 2026",
    time: "10:24 AM",
    speed: "95 km/h",
    limit: "60 km/h",
    fine: "$150",
    status: "Pending",
  },
  {
    id: "VIO-2026-002",
    plate: "XYZ 5678",
    type: "Red Light",
    location: "Main St & 5th Ave",
    camera: "CAM-05-INT",
    date: "Feb 26, 2026",
    time: "10:18 AM",
    speed: "—",
    limit: "—",
    fine: "$200",
    status: "Pending",
  },
  {
    id: "VIO-2026-003",
    plate: "DEF 9012",
    type: "Wrong Lane",
    location: "Central Blvd",
    camera: "CAM-CB-12",
    date: "Feb 26, 2026",
    time: "10:12 AM",
    speed: "—",
    limit: "—",
    fine: "$100",
    status: "Paid",
  },
  {
    id: "VIO-2026-004",
    plate: "GHI 3456",
    type: "No Helmet",
    location: "Park Road",
    camera: "CAM-PR-08",
    date: "Feb 26, 2026",
    time: "10:05 AM",
    speed: "—",
    limit: "—",
    fine: "$75",
    status: "Pending",
  },
  {
    id: "VIO-2026-005",
    plate: "JKL 7890",
    type: "Speeding",
    location: "Highway 202, KM 23",
    camera: "CAM-202-S",
    date: "Feb 26, 2026",
    time: "09:58 AM",
    speed: "88 km/h",
    limit: "60 km/h",
    fine: "$150",
    status: "Paid",
  },
  {
    id: "VIO-2026-006",
    plate: "MNO 1122",
    type: "Wrong Way",
    location: "1st Street Bridge",
    camera: "CAM-BR-01",
    date: "Feb 26, 2026",
    time: "09:45 AM",
    speed: "—",
    limit: "—",
    fine: "$300",
    status: "Under Review",
  },
  {
    id: "VIO-2026-007",
    plate: "PQR 3344",
    type: "Illegal Parking",
    location: "Downtown Plaza",
    camera: "CAM-DT-15",
    date: "Feb 26, 2026",
    time: "09:30 AM",
    speed: "—",
    limit: "—",
    fine: "$50",
    status: "Paid",
  },
  {
    id: "VIO-2026-008",
    plate: "STU 5566",
    type: "Red Light",
    location: "Oak Ave & 2nd St",
    camera: "CAM-OA-03",
    date: "Feb 26, 2026",
    time: "09:15 AM",
    speed: "—",
    limit: "—",
    fine: "$200",
    status: "Disputed",
  },
  {
    id: "VIO-2026-009",
    plate: "VWX 7788",
    type: "Speeding",
    location: "School Zone - Elm St",
    camera: "CAM-EL-06",
    date: "Feb 26, 2026",
    time: "08:52 AM",
    speed: "55 km/h",
    limit: "30 km/h",
    fine: "$250",
    status: "Pending",
  },
  {
    id: "VIO-2026-010",
    plate: "YZA 9900",
    type: "No Seatbelt",
    location: "River Road",
    camera: "CAM-RR-11",
    date: "Feb 26, 2026",
    time: "08:30 AM",
    speed: "—",
    limit: "—",
    fine: "$100",
    status: "Paid",
  },
];

export function Violations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredViolations = violationsData.filter((v) => {
    const matchesSearch =
      v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || v.type === filterType;
    const matchesStatus = filterStatus === "all" || v.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredViolations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedViolations = filteredViolations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Under Review":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Disputed":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
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
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Violations</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {violationsData.length}
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
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {violationsData.filter((v) => v.status === "Pending").length}
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
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Paid</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {violationsData.filter((v) => v.status === "Paid").length}
                  </p>
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Fines</p>
                  <p className="text-2xl font-bold text-gray-900">$1,575</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main violations table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-cyan-400" />
                Violation Records
              </CardTitle>

              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search plate or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500 w-64"
                  />
                </div>

                {/* Violation type filter */}
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Speeding">Speeding</SelectItem>
                    <SelectItem value="Red Light">Red Light</SelectItem>
                    <SelectItem value="Wrong Lane">Wrong Lane</SelectItem>
                    <SelectItem value="No Helmet">No Helmet</SelectItem>
                    <SelectItem value="Wrong Way">Wrong Way</SelectItem>
                  </SelectContent>
                </Select>

                {/* Status filter */}
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-white/10 text-white">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Disputed">Disputed</SelectItem>
                  </SelectContent>
                </Select>

                {/* Export button */}
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Plate Number
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Violation
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Date & Time
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Fine
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedViolations.map((violation, index) => (
                    <motion.tr
                      key={violation.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="py-3 px-4 text-gray-400 text-sm font-mono">
                        {violation.id}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white font-mono font-bold">
                          {violation.plate}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-300">{violation.type}</span>
                        {violation.speed !== "—" && (
                          <div className="text-xs text-red-400 mt-1">
                            {violation.speed} / {violation.limit}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-gray-300 text-sm">
                              {violation.location}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {violation.camera}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="text-gray-300 text-sm">
                              {violation.date}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {violation.time}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-cyan-400 font-semibold">
                          {violation.fine}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={getStatusColor(violation.status)}
                        >
                          {violation.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-400">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredViolations.length)}{" "}
                of {filteredViolations.length} violations
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="bg-white/5 border-white/10 text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 ${
                        currentPage === page
                          ? "bg-cyan-500 border-cyan-500 text-white"
                          : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                      }`}
                    >
                      {page}
                    </Button>
                  )
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="bg-white/5 border-white/10 text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}