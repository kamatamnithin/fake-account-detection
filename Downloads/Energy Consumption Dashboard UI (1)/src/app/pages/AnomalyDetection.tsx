import { motion } from 'motion/react';
import { AlertTriangle, AlertCircle, CheckCircle, Info, Bell, TrendingUp, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { useState, useEffect } from 'react';

interface Anomaly {
  id: string;
  timestamp: Date;
  value: number;
  expected: number;
  deviation: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  description: string;
  rootCause?: string;
}

// Generate anomaly data with statistical detection
const generateAnomalyData = () => {
  const data: any[] = [];
  const anomalies: Anomaly[] = [];
  const baseValue = 100;
  const stdDev = 15;

  for (let i = 0; i < 100; i++) {
    const normalValue = baseValue + (Math.random() - 0.5) * stdDev;
    let value = normalValue;
    let isAnomaly = false;
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

    // Inject anomalies randomly
    if (Math.random() > 0.92) {
      const anomalyType = Math.random();
      if (anomalyType > 0.7) {
        // Spike
        value = normalValue + stdDev * (2 + Math.random() * 3);
        severity = value > normalValue + stdDev * 4 ? 'critical' : value > normalValue + stdDev * 3 ? 'high' : 'medium';
      } else if (anomalyType > 0.4) {
        // Drop
        value = normalValue - stdDev * (2 + Math.random() * 2);
        severity = value < normalValue - stdDev * 3 ? 'high' : 'medium';
      } else {
        // Gradual drift
        value = normalValue + stdDev * 2.5;
        severity = 'medium';
      }
      isAnomaly = true;

      anomalies.push({
        id: `anomaly-${i}`,
        timestamp: new Date(Date.now() - (100 - i) * 3600000),
        value,
        expected: normalValue,
        deviation: ((value - normalValue) / normalValue) * 100,
        severity,
        type: anomalyType > 0.7 ? 'Spike' : anomalyType > 0.4 ? 'Drop' : 'Drift',
        description: `Unusual ${anomalyType > 0.7 ? 'spike' : anomalyType > 0.4 ? 'drop' : 'drift'} detected`,
        rootCause: anomalyType > 0.7 ? 'Possible HVAC malfunction or unexpected occupancy surge' : 
                   anomalyType > 0.4 ? 'Equipment shutdown or reduced load' : 
                   'Gradual system degradation',
      });
    }

    const zScore = Math.abs((value - baseValue) / stdDev);

    data.push({
      timestamp: new Date(Date.now() - (100 - i) * 3600000).toLocaleTimeString(),
      value: value.toFixed(2),
      expected: normalValue.toFixed(2),
      upperBound: (baseValue + stdDev * 2).toFixed(2),
      lowerBound: (baseValue - stdDev * 2).toFixed(2),
      isAnomaly,
      zScore: zScore.toFixed(2),
    });
  }

  return { data, anomalies };
};

const { data: timeSeriesData, anomalies: detectedAnomalies } = generateAnomalyData();

// Statistics
const totalAnomalies = detectedAnomalies.length;
const criticalAnomalies = detectedAnomalies.filter(a => a.severity === 'critical').length;
const highAnomalies = detectedAnomalies.filter(a => a.severity === 'high').length;
const mediumAnomalies = detectedAnomalies.filter(a => a.severity === 'medium').length;

export function AnomalyDetection() {
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');

  const filteredAnomalies = detectedAnomalies.filter(a => {
    if (filter === 'all') return true;
    return a.severity === filter;
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: 'text-red-600' };
      case 'high': return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', icon: 'text-orange-600' };
      case 'medium': return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200', icon: 'text-amber-600' };
      default: return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', icon: 'text-blue-600' };
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle;
      case 'high': return AlertCircle;
      case 'medium': return Info;
      default: return CheckCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Activity className="size-8 text-red-600" />
            Anomaly Detection System
          </h1>
          <p className="text-slate-600 mt-2">AI-powered statistical anomaly detection and real-time alerts</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Bell className="size-8 text-slate-600" />
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                Total
              </span>
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Total Anomalies</h3>
            <p className="text-3xl font-bold text-slate-800">{totalAnomalies}</p>
            <p className="text-xs text-slate-500 mt-1">Last 100 hours</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg border border-red-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="size-8 text-red-600" />
              <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
                CRITICAL
              </span>
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Critical</h3>
            <p className="text-3xl font-bold text-red-600">{criticalAnomalies}</p>
            <p className="text-xs text-red-500 mt-1">Immediate action required</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg border border-orange-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="size-8 text-orange-600" />
              <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded">
                HIGH
              </span>
            </div>
            <h3 className="text-sm text-slate-600 mb-1">High Priority</h3>
            <p className="text-3xl font-bold text-orange-600">{highAnomalies}</p>
            <p className="text-xs text-orange-500 mt-1">Action recommended</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg border border-amber-200 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Info className="size-8 text-amber-600" />
              <span className="text-xs font-medium text-amber-600 bg-amber-100 px-2 py-1 rounded">
                MEDIUM
              </span>
            </div>
            <h3 className="text-sm text-slate-600 mb-1">Medium Priority</h3>
            <p className="text-3xl font-bold text-amber-600">{mediumAnomalies}</p>
            <p className="text-xs text-amber-500 mt-1">Monitor closely</p>
          </motion.div>
        </div>

        {/* Time Series Chart with Anomalies */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Real-Time Anomaly Detection Chart
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Z-score based statistical detection with confidence bounds
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#64748b"
                tick={{ fontSize: 10 }}
                interval={19}
              />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              
              {/* Upper and lower bounds */}
              <ReferenceLine y={100 + 30} stroke="#94a3b8" strokeDasharray="5 5" label="Upper Bound" />
              <ReferenceLine y={100 - 30} stroke="#94a3b8" strokeDasharray="5 5" label="Lower Bound" />
              <ReferenceLine y={100} stroke="#64748b" strokeDasharray="3 3" label="Mean" />
              
              {/* Expected value line */}
              <Line
                type="monotone"
                dataKey="expected"
                stroke="#94a3b8"
                strokeWidth={1}
                dot={false}
                name="Expected"
              />
              
              {/* Actual value line */}
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={(props: any) => {
                  const { cx, cy, payload, index } = props;
                  if (payload.isAnomaly) {
                    return (
                      <circle
                        key={`anomaly-dot-${index}`}
                        cx={cx}
                        cy={cy}
                        r={6}
                        fill="#ef4444"
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    );
                  }
                  return null;
                }}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-slate-700">Actual Value</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-400 rounded"></div>
              <span className="text-slate-700">Expected Value</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span className="text-slate-700">Detected Anomaly</span>
            </div>
          </div>
        </div>

        {/* Anomaly List */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Detected Anomalies
            </h2>
            <div className="flex gap-2">
              {['all', 'critical', 'high', 'medium'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === f
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredAnomalies.map((anomaly) => {
              const colors = getSeverityColor(anomaly.severity);
              const Icon = getSeverityIcon(anomaly.severity);

              return (
                <motion.div
                  key={anomaly.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${colors.bg} ${colors.border} border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all`}
                  onClick={() => setSelectedAnomaly(anomaly)}
                >
                  <div className="flex items-start gap-4">
                    <Icon className={`size-6 ${colors.icon} flex-shrink-0 mt-1`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-semibold ${colors.text}`}>
                          {anomaly.type} - {anomaly.description}
                        </h3>
                        <span className={`text-xs font-medium ${colors.text} ${colors.bg} px-2 py-1 rounded uppercase`}>
                          {anomaly.severity}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500 text-xs">Timestamp</p>
                          <p className={`font-medium ${colors.text}`}>
                            {anomaly.timestamp.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs">Actual Value</p>
                          <p className={`font-medium ${colors.text}`}>
                            {anomaly.value.toFixed(2)} kWh
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs">Expected</p>
                          <p className={`font-medium ${colors.text}`}>
                            {anomaly.expected.toFixed(2)} kWh
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs">Deviation</p>
                          <p className={`font-medium ${colors.text}`}>
                            {anomaly.deviation > 0 ? '+' : ''}{anomaly.deviation.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      {anomaly.rootCause && (
                        <div className="mt-3 pt-3 border-t border-current/20">
                          <p className="text-xs text-slate-600 font-medium mb-1">Possible Root Cause:</p>
                          <p className={`text-sm ${colors.text}`}>{anomaly.rootCause}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredAnomalies.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="size-16 text-green-600 mx-auto mb-4" />
              <p className="text-slate-600 font-medium">No anomalies detected in this category</p>
              <p className="text-sm text-slate-500 mt-1">System operating normally</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}