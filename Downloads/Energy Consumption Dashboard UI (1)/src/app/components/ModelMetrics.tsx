import { motion } from 'motion/react';
import { Activity, TrendingUp, Clock, CircleCheck } from 'lucide-react';
import { mockData } from '../../data/mockData';

export function ModelMetrics() {
  const { arima, ml } = mockData.models;

  const formatTimeAgo = (timestamp: string) => {
    const hours = Math.floor((Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60));
    return `${hours} hours ago`;
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* ARIMA Model */}
      <div className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-2xl p-6 shadow-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-slate-800 font-bold text-lg mb-1">ARIMA Model</h3>
            <p className="text-slate-600 text-sm">Time series forecasting</p>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full"
          >
            <CircleCheck className="w-4 h-4" />
            <span className="text-xs font-semibold">{arima.status}</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-slate-600 text-xs font-medium">Accuracy</span>
            </div>
            <p className="text-slate-800 text-2xl font-bold">{arima.accuracy}%</p>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-600 text-xs font-medium">MAE</span>
            </div>
            <p className="text-slate-800 text-2xl font-bold">{arima.mae}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-sm font-medium">RMSE</span>
            <span className="text-slate-800 font-semibold">{arima.rmse}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-sm flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4" />
              Last Trained
            </span>
            <span className="text-slate-800 font-semibold">{formatTimeAgo(arima.lastTrained)}</span>
          </div>
        </div>

        <motion.div
          className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${arima.accuracy}%` }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </motion.div>
      </div>

      {/* ML Model */}
      <div className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-2xl p-6 shadow-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-slate-800 font-bold text-lg mb-1">ML Model</h3>
            <p className="text-slate-600 text-sm">Neural network forecasting</p>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
            className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full"
          >
            <CircleCheck className="w-4 h-4" />
            <span className="text-xs font-semibold">{ml.status}</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-purple-600" />
              <span className="text-slate-600 text-xs font-medium">Accuracy</span>
            </div>
            <p className="text-slate-800 text-2xl font-bold">{ml.accuracy}%</p>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-slate-600 text-xs font-medium">MAE</span>
            </div>
            <p className="text-slate-800 text-2xl font-bold">{ml.mae}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-sm font-medium">RMSE</span>
            <span className="text-slate-800 font-semibold">{ml.rmse}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-sm flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4" />
              Last Trained
            </span>
            <span className="text-slate-800 font-semibold">{formatTimeAgo(ml.lastTrained)}</span>
          </div>
        </div>

        <motion.div
          className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-400"
            initial={{ width: 0 }}
            animate={{ width: `${ml.accuracy}%` }}
            transition={{ duration: 1.5, delay: 1.1 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}