import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Activity, TrendingUp, Zap } from 'lucide-react';
import { AnomalyDetection } from './AnomalyDetection';
import { useTheme } from '../../contexts/ThemeContext';
import { usePrediction } from '../../contexts/PredictionContext';

export function Analysis() {
  const { isDarkMode } = useTheme();
  const { predictionData } = usePrediction();
  
  // Check if we have real prediction data
  const hasPredictionData = predictionData.currentPrediction !== null;

  return (
    <div className={`min-h-screen transition-colors ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100'
        : 'bg-white text-slate-800'
    }`}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            isDarkMode ? 'bg-blue-600/10' : 'bg-blue-400/10'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
            Anomaly Detection
          </h1>
          <p className={`mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Identify unusual patterns and potential issues in energy consumption
          </p>
        </div>

        {/* Content */}
        <AnomalyDetection />
      </div>
    </div>
  );
}