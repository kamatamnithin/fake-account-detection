import { motion } from 'motion/react';
import { TriangleAlert, TrendingUp, Clock } from 'lucide-react';
import { mockData } from '../../data/mockData';

export function AlertsSection() {
  const formatTimeAgo = (timestamp: string) => {
    const hours = Math.floor((Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const severityStyles = {
    high: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      icon: 'bg-gradient-to-br from-red-500 to-red-600',
    },
    medium: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      text: 'text-orange-700',
      icon: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
    low: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      icon: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    },
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-slate-800 font-bold text-lg mb-1">Anomaly Detection</h3>
          <p className="text-slate-600 text-sm">Recent unusual consumption patterns</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors cursor-pointer shadow-lg shadow-blue-500/30"
        >
          View All
        </motion.div>
      </div>

      <div className="space-y-4">
        {mockData.anomalies.map((anomaly, index) => {
          const styles = severityStyles[anomaly.severity];

          return (
            <motion.div
              key={anomaly.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              whileHover={{
                x: 5,
                transition: { duration: 0.2 },
              }}
              className={`${styles.bg} border-2 ${styles.border} rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <motion.div
                  className={`${styles.icon} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotateZ: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <TriangleAlert className="w-5 h-5 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`${styles.text} font-semibold text-sm uppercase tracking-wide`}>
                        {anomaly.severity} Priority
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600 text-sm font-medium">{anomaly.value} kW</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(anomaly.timestamp)}
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm mb-3 font-medium">{anomaly.description}</p>

                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-blue-600 text-xs font-semibold hover:text-blue-700 transition-colors"
                    >
                      Investigate
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-slate-500 text-xs font-semibold hover:text-slate-600 transition-colors"
                    >
                      Dismiss
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mt-6 pt-6 border-t-2 border-indigo-200 grid grid-cols-3 gap-4"
      >
        <div className="text-center">
          <p className="text-slate-600 text-xs mb-1 font-medium">Total Detected</p>
          <p className="text-slate-800 text-2xl font-bold">{mockData.anomalies.length}</p>
        </div>
        <div className="text-center">
          <p className="text-slate-600 text-xs mb-1 font-medium">Resolved</p>
          <p className="text-emerald-600 text-2xl font-bold">0</p>
        </div>
        <div className="text-center">
          <p className="text-slate-600 text-xs mb-1 font-medium">Pending</p>
          <p className="text-orange-600 text-2xl font-bold">{mockData.anomalies.length}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}