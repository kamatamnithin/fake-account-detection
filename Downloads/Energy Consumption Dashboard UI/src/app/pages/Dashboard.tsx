import { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, TrendingUp, Activity, Leaf, TriangleAlert, LayoutDashboard, BarChart3, Sparkles } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { EnergyForecastChart } from '../components/EnergyForecastChart';
import { SecondaryCharts } from '../components/SecondaryCharts';
import { ModelMetrics } from '../components/ModelMetrics';
import { AlertsSection } from '../components/AlertsSection';
import { ExportButtons } from '../components/ExportButtons';
import { TabNavigation } from '../components/TabNavigation';
import { AdvancedAnalytics } from './AdvancedAnalytics';
import { useTheme } from '../../contexts/ThemeContext';
import { usePrediction } from '../../contexts/PredictionContext';
import { mockData } from '../../data/mockData';

export function Dashboard() {
  const { isDarkMode } = useTheme();
  const { predictionData } = usePrediction();
  const [activeTab, setActiveTab] = useState('overview');

  // Use real prediction data if available, otherwise use mock data
  const currentConsumption = predictionData.currentPrediction || mockData.kpis.currentConsumption;
  const forecast24h = predictionData.currentPrediction 
    ? predictionData.currentPrediction * 24 
    : mockData.kpis.forecast24h;
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
  ];
  
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
        {/* Real Data Indicator */}
        {predictionData.currentPrediction && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">
                    Using Real Prediction Data
                  </p>
                  <p className="text-emerald-100 text-sm">
                    Dashboard updated with your latest prediction: {predictionData.currentPrediction.toFixed(2)} kWh
                  </p>
                </div>
              </div>
              <div className="text-white text-sm font-medium">
                {predictionData.timestamp && new Date(predictionData.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Header with Export Buttons */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
              Energy Dashboard
            </h1>
            <p className={`mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Monitor and analyze your energy consumption
            </p>
          </div>
          <ExportButtons 
            data={mockData.predictions}
            fileName="Energy_Dashboard"
          />
        </div>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <KPICard
                title="Current Consumption"
                value={currentConsumption}
                unit="kW"
                trend={-3.2}
                icon={Zap}
                color="blue"
                delay={0}
              />
              <KPICard
                title="24-Hour Forecast"
                value={(forecast24h / 1000).toFixed(1)}
                unit="MWh"
                trend={2.8}
                icon={TrendingUp}
                color="purple"
                delay={0.1}
              />
              <KPICard
                title="Peak Demand"
                value={mockData.kpis.peakDemand}
                unit="kW"
                trend={1.5}
                icon={Activity}
                color="orange"
                delay={0.2}
              />
              <KPICard
                title="Renewable Share"
                value={mockData.kpis.renewableShare}
                unit="%"
                trend={5.2}
                icon={Leaf}
                color="green"
                delay={0.3}
              />
              <KPICard
                title="Detected Anomalies"
                value={mockData.kpis.detectedAnomalies}
                icon={TriangleAlert}
                color="red"
                delay={0.4}
              />
            </div>

            {/* Main Forecast Chart */}
            <EnergyForecastChart />

            {/* Secondary Charts */}
            <SecondaryCharts />

            {/* Model Metrics */}
            <ModelMetrics />

            {/* Alerts and System Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AlertsSection />
              
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className={`backdrop-blur-sm rounded-2xl p-6 ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border border-slate-700' 
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <h3 className={`font-bold text-lg mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                  System Overview
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Forecasting Accuracy
                      </span>
                      <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        96.8%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${
                      isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                    }`}>
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                        initial={{ width: 0 }}
                        animate={{ width: '96.8%' }}
                        transition={{ duration: 1.5, delay: 1 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Data Collection Rate
                      </span>
                      <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        99.2%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${
                      isDarkMode ? 'bg-slate-700' : 'bg-slate-200'
                    }`}>
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: '99.2%' }}
                        transition={{ duration: 1.5, delay: 1.2 }}
                      />
                    </div>
                  </div>

                  <div className={`pt-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`rounded-lg p-4 border ${
                        isDarkMode 
                          ? 'bg-slate-900/50 border-slate-700' 
                          : 'bg-white border-slate-200'
                      }`}>
                        <p className={`text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          Total Forecasts
                        </p>
                        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                          12,847
                        </p>
                      </div>
                      <div className={`rounded-lg p-4 border ${
                        isDarkMode 
                          ? 'bg-slate-900/50 border-slate-700' 
                          : 'bg-white border-slate-200'
                      }`}>
                        <p className={`text-xs mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          Energy Saved
                        </p>
                        <p className="text-green-400 text-2xl font-bold">24.3%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && <AdvancedAnalytics />}
      </div>
    </div>
  );
}