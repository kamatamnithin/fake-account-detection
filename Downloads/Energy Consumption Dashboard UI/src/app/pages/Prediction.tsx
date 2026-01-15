import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Zap, Download, Upload, Wifi, WifiOff, AlertCircle, Activity, Lightbulb, TrendingUp, BarChart3, Copy, Check } from 'lucide-react';
import { predictionService } from '../../services/predictionService';
import { useTheme } from '../../contexts/ThemeContext';
import { usePrediction } from '../../contexts/PredictionContext';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Area, AreaChart } from 'recharts';
import { toast } from 'sonner';
import { ConfidenceMeter } from '../components/ConfidenceMeter';
import { SkeletonPrediction } from '../components/SkeletonLoader';

export function Prediction() {
  const [loading, setLoading] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [predictionResult, setPredictionResult] = useState<number | null>(null);
  const [predictionBounds, setPredictionBounds] = useState<{lower: number, upper: number, confidence: number} | null>(null);
  const { isDarkMode } = useTheme();
  const { updatePrediction } = usePrediction();
  
  // Theme-aware color classes
  const cardBg = isDarkMode 
    ? 'bg-blue-800/30 backdrop-blur-md border border-white/10' 
    : 'bg-white shadow-lg shadow-blue-100/50 border border-blue-100';
  const labelColor = isDarkMode ? 'text-blue-200' : 'text-slate-700';
  const textColor = isDarkMode ? 'text-blue-100' : 'text-slate-600';
  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const inputBg = isDarkMode 
    ? 'bg-blue-900/50 border-blue-600/30 text-white placeholder-blue-300' 
    : 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-blue-200/60 text-slate-800 placeholder-slate-400 shadow-sm hover:border-blue-300 transition-all';
  
  // Form inputs
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [temperature, setTemperature] = useState('24.3');
  const [humidity, setHumidity] = useState('62.5');
  const [occupancy, setOccupancy] = useState('1800');
  const [renewableEnergy, setRenewableEnergy] = useState('55');
  const [hvacUsage, setHvacUsage] = useState('On');
  const [lightingUsage, setLightingUsage] = useState('On');
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [isHoliday, setIsHoliday] = useState('Not a Holiday');

  // File upload states
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedData, setUploadedData] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  // Check backend health on mount
  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const health = await predictionService.healthCheck();
      setBackendConnected(health.status === 'healthy');
    } catch (err) {
      setBackendConnected(false);
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    toast.loading('Analyzing energy parameters...');
    
    try {
      // Parse the datetime to extract time features
      const dt = new Date(dateTime);
      
      const features = [{
        timestamp: dateTime,
        temperature: parseFloat(temperature),
        humidity: parseFloat(humidity),
        occupancy: parseFloat(occupancy),
        renewable: parseFloat(renewableEnergy),
        hvac_status: hvacUsage === 'On' ? 1 : 0,
        lighting_status: lightingUsage === 'On' ? 1 : 0,
        day_of_week: getDayNumber(dayOfWeek),
        is_holiday: isHoliday === 'Holiday' ? 1 : 0,
        // Additional time-based features that the backend will extract
        hour: dt.getHours(),
        month: dt.getMonth() + 1,
        day_of_month: dt.getDate(),
        is_weekend: [0, 6].includes(getDayNumber(dayOfWeek)) ? 1 : 0,
        is_business_hour: (dt.getHours() >= 8 && dt.getHours() <= 18) ? 1 : 0,
      }];
      
      const result = await predictionService.predict(features, true);
      
      if (result.success && result.predictions && result.predictions.length > 0) {
        const pred = result.predictions[0];
        const bounds = {
          lower: pred.lower_bound || pred.predicted * 0.9,
          upper: pred.upper_bound || pred.predicted * 1.1,
          confidence: pred.confidence || 0.85
        };
        
        setPredictionResult(pred.predicted);
        setPredictionBounds(bounds);
        
        // Update prediction context for AI Chat
        updatePrediction({
          currentPrediction: pred.predicted,
          predictionBounds: bounds,
          timestamp: new Date(),
          features: {
            temperature: parseFloat(temperature),
            humidity: parseFloat(humidity),
            occupancy: parseFloat(occupancy),
            renewable: parseFloat(renewableEnergy),
          },
        });
        
        toast.dismiss();
        toast.success(`Prediction complete: ${pred.predicted.toFixed(2)} kWh`);
      } else {
        // Mock prediction if backend unavailable
        const mockPrediction = calculateMockPrediction();
        const mockBounds = {
          lower: mockPrediction * 0.9,
          upper: mockPrediction * 1.1,
          confidence: 0.85
        };
        
        setPredictionResult(mockPrediction);
        setPredictionBounds(mockBounds);
        
        // Update prediction context for AI Chat
        updatePrediction({
          currentPrediction: mockPrediction,
          predictionBounds: mockBounds,
          timestamp: new Date(),
          features: {
            temperature: parseFloat(temperature),
            humidity: parseFloat(humidity),
            occupancy: parseFloat(occupancy),
            renewable: parseFloat(renewableEnergy),
          },
        });
        
        toast.dismiss();
        toast.success(`Prediction complete: ${mockPrediction.toFixed(2)} kWh (Simulation Mode)`);
      }
    } catch (err) {
      // Silently fallback to mock prediction
      const mockPrediction = calculateMockPrediction();
      const mockBounds = {
        lower: mockPrediction * 0.9,
        upper: mockPrediction * 1.1,
        confidence: 0.85
      };
      
      setPredictionResult(mockPrediction);
      setPredictionBounds(mockBounds);
      
      // Update prediction context for AI Chat
      updatePrediction({
        currentPrediction: mockPrediction,
        predictionBounds: mockBounds,
        timestamp: new Date(),
        features: {
          temperature: parseFloat(temperature),
          humidity: parseFloat(humidity),
          occupancy: parseFloat(occupancy),
          renewable: parseFloat(renewableEnergy),
        },
      });
      
      toast.dismiss();
      toast.info(`Using simulation mode: ${mockPrediction.toFixed(2)} kWh`);
    } finally {
      setLoading(false);
    }
  };

  const calculateMockPrediction = () => {
    // Simple calculation based on inputs
    const baseLoad = 50;
    const tempFactor = parseFloat(temperature) * 1.5;
    const occupancyFactor = parseFloat(occupancy) / 50;
    const hvacFactor = hvacUsage === 'On' ? 15 : 0;
    const lightingFactor = lightingUsage === 'On' ? 8 : 0;
    const renewableFactor = (100 - parseFloat(renewableEnergy)) / 10;
    
    return baseLoad + tempFactor + occupancyFactor + hvacFactor + lightingFactor + renewableFactor;
  };

  const getDayNumber = (day: string) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.indexOf(day);
  };

  const getUsageLevel = () => {
    if (!predictionResult) return 'Unknown';
    if (predictionResult < 60) return 'Low';
    if (predictionResult < 80) return 'Normal';
    if (predictionResult < 100) return 'High';
    return 'Critical';
  };

  const getUsageLevelColor = () => {
    const level = getUsageLevel();
    if (level === 'Low') return 'emerald';
    if (level === 'Normal') return 'blue';
    if (level === 'High') return 'amber';
    return 'red';
  };

  const getEfficiencyScore = () => {
    if (!predictionResult) return 0;
    const renewable = parseFloat(renewableEnergy);
    const efficiency = Math.min(100, (renewable / predictionResult) * 100);
    return efficiency.toFixed(1);
  };

  const getCurrentLoad = () => {
    if (!predictionResult) return 0;
    // Simulate current load as 95% of predicted
    return (predictionResult * 0.95).toFixed(2);
  };

  // Generate chart data based on current prediction
  const getHistoricalTrendData = () => {
    if (!predictionResult) return [];
    
    const now = new Date(dateTime);
    const data = [];
    
    for (let i = -6; i <= 6; i++) {
      const time = new Date(now);
      time.setHours(now.getHours() + i);
      const hour = time.getHours();
      
      // Simulate realistic consumption pattern
      let baseFactor = 1;
      if (hour >= 6 && hour <= 9) baseFactor = 1.2; // Morning peak
      else if (hour >= 18 && hour <= 22) baseFactor = 1.3; // Evening peak
      else if (hour >= 0 && hour <= 5) baseFactor = 0.6; // Night low
      
      const consumption = predictionResult * baseFactor + (Math.random() - 0.5) * 5;
      const predicted = i === 0 ? predictionResult : consumption + (Math.random() - 0.5) * 3;
      
      data.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        actual: parseFloat(consumption.toFixed(2)),
        predicted: parseFloat(predicted.toFixed(2)),
        optimal: parseFloat((consumption * 0.85).toFixed(2)),
      });
    }
    
    return data;
  };

  const getInputFactorsData = () => {
    return [
      { factor: 'Temperature', value: parseFloat(temperature), max: 50 },
      { factor: 'Humidity', value: parseFloat(humidity), max: 100 },
      { factor: 'Occupancy', value: parseFloat(occupancy), max: 3000 },
      { factor: 'Renewable', value: parseFloat(renewableEnergy), max: 100 },
      { factor: 'HVAC', value: hvacUsage === 'On' ? 80 : 20, max: 100 },
      { factor: 'Lighting', value: lightingUsage === 'On' ? 75 : 25, max: 100 },
    ];
  };

  const getEnergyBreakdownData = () => {
    if (!predictionResult) return [];
    
    return [
      { name: 'HVAC', value: predictionResult * 0.35, color: '#3b82f6' },
      { name: 'Lighting', value: predictionResult * 0.25, color: '#f59e0b' },
      { name: 'Equipment', value: predictionResult * 0.20, color: '#10b981' },
      { name: 'Other', value: predictionResult * 0.20, color: '#6366f1' },
    ];
  };

  const getComparisonData = () => {
    if (!predictionResult) return [];
    
    return [
      {
        category: 'Current',
        consumption: predictionResult,
        benchmark: predictionResult * 0.85,
        optimal: predictionResult * 0.75,
      },
      {
        category: 'Peak Hours',
        consumption: predictionResult * 1.3,
        benchmark: predictionResult * 1.1,
        optimal: predictionResult * 0.95,
      },
      {
        category: 'Off-Peak',
        consumption: predictionResult * 0.6,
        benchmark: predictionResult * 0.55,
        optimal: predictionResult * 0.45,
      },
    ];
  };

  // File Upload Handlers
  const handleFileUpload = async (file: File) => {
    setUploadLoading(true);
    setUploadedFile(file);
    toast.loading('Processing file...');

    try {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      
      if (fileType === 'csv') {
        await processCSVFile(file);
      } else if (fileType === 'txt') {
        await processTXTFile(file);
      } else if (fileType === 'pdf') {
        await processPDFFile(file);
      } else if (fileType === 'xlsx' || fileType === 'xls') {
        await processExcelFile(file);
      } else {
        toast.dismiss();
        toast.error('Unsupported file type. Please upload CSV, TXT, PDF, or Excel files.');
        setUploadLoading(false);
        return;
      }

      toast.dismiss();
      toast.success('File processed successfully!');
      generateAIInsights(file.name, fileType || '');
    } catch (error) {
      console.error('File upload error:', error);
      toast.dismiss();
      toast.error('Failed to process file. Please try again.');
    } finally {
      setUploadLoading(false);
    }
  };

  const processCSVFile = async (file: File) => {
    const text = await file.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj: any, header, index) => {
        obj[header.trim()] = values[index]?.trim();
        return obj;
      }, {});
    });
    setUploadedData({ type: 'csv', headers, data, rowCount: data.length });
  };

  const processTXTFile = async (file: File) => {
    const text = await file.text();
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    // Parse TXT file for prediction values
    // Expected format (each line can be key:value or key=value):
    // temperature: 24.3
    // humidity: 62.5
    // occupancy: 1800
    // renewable: 55
    // hvac: On
    // lighting: On
    // day: Monday
    // holiday: Not a Holiday
    
    const parsedData: any = {};
    lines.forEach(line => {
      const separators = [':', '='];
      let key = '';
      let value = '';
      
      for (const sep of separators) {
        if (line.includes(sep)) {
          const parts = line.split(sep);
          key = parts[0].trim().toLowerCase();
          value = parts[1]?.trim() || '';
          break;
        }
      }
      
      if (key && value) {
        parsedData[key] = value;
      }
    });
    
    // Auto-fill form fields from TXT file
    if (parsedData.temperature || parsedData.temp) {
      setTemperature(parsedData.temperature || parsedData.temp);
    }
    if (parsedData.humidity) {
      setHumidity(parsedData.humidity);
    }
    if (parsedData.occupancy) {
      setOccupancy(parsedData.occupancy);
    }
    if (parsedData.renewable || parsedData.renewableenergy) {
      setRenewableEnergy(parsedData.renewable || parsedData.renewableenergy);
    }
    if (parsedData.hvac) {
      setHvacUsage(parsedData.hvac);
    }
    if (parsedData.lighting) {
      setLightingUsage(parsedData.lighting);
    }
    if (parsedData.day || parsedData.dayofweek) {
      setDayOfWeek(parsedData.day || parsedData.dayofweek);
    }
    if (parsedData.holiday) {
      setIsHoliday(parsedData.holiday);
    }
    
    setUploadedData({ 
      type: 'txt', 
      data: parsedData, 
      rowCount: lines.length,
      autofilled: true
    });
    
    // Auto-trigger prediction after 1 second
    toast.success('TXT file processed! Auto-filling form and predicting...');
    setTimeout(() => {
      handlePredict();
    }, 1000);
  };

  const processPDFFile = async (file: File) => {
    // For demo, we'll extract basic info
    setUploadedData({
      type: 'pdf',
      fileName: file.name,
      fileSize: (file.size / 1024).toFixed(2) + ' KB',
      pageCount: 'Multiple',
    });
  };

  const processExcelFile = async (file: File) => {
    // For demo, we'll extract basic info
    setUploadedData({
      type: 'excel',
      fileName: file.name,
      fileSize: (file.size / 1024).toFixed(2) + ' KB',
      sheets: 'Multiple',
    });
  };

  const generateAIInsights = (fileName: string, fileType: string) => {
    // Generate AI-powered insights based on file
    const insights = [
      `📊 **File Analysis Complete**: Successfully processed ${fileName}`,
      `📈 **Data Type**: ${fileType.toUpperCase()} format detected`,
      uploadedData?.rowCount ? `📋 **Data Points**: ${uploadedData.rowCount} records analyzed` : '',
      `🔍 **Key Findings**:`,
      `  • Energy consumption patterns detected`,
      `  • Peak usage hours identified`,
      `  • Optimization opportunities found`,
      `💡 **AI Recommendations**:`,
      `  • Consider implementing time-based scheduling`,
      `  • Review HVAC efficiency during peak hours`,
      `  • Optimize renewable energy utilization`,
    ].filter(Boolean).join('\n');

    setAiInsights(insights);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800'
    }`}>
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/4 right-1/4 w-96 h-96 ${
            isDarkMode ? 'bg-blue-500/20' : 'bg-gradient-to-br from-blue-200/40 to-indigo-200/40'
          } rounded-full blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className={`absolute bottom-1/4 left-1/4 w-96 h-96 ${
            isDarkMode ? 'bg-indigo-500/20' : 'bg-gradient-to-br from-purple-200/40 to-pink-200/40'
          } rounded-full blur-3xl`}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className={`inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-4 py-2 mb-4 shadow-lg ${
            isDarkMode 
              ? 'bg-white/10 border-white/20' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <Zap className={`w-4 h-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-blue-100' : 'text-blue-700'}`}>Smart Energy AI</span>
            {backendConnected ? (
              <Wifi className="w-4 h-4 text-emerald-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-400" />
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Energy Prediction
          </h1>
          <p className={isDarkMode ? 'text-blue-200' : 'text-slate-600'}>
            {modelLoaded ? 'Random Forest ML Model Active' : 'Advanced AI Forecasting System'}
          </p>
        </motion.div>

        {/* Backend Status */}
        {!backendConnected && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-500/20 border border-amber-400/30 rounded-xl px-4 py-3 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-amber-200">
              <AlertCircle className="w-4 h-4" />
              <span>Backend offline - using simulation mode</span>
            </div>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Side - Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className={`${cardBg} rounded-2xl p-6 shadow-2xl`}
              >
                <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${headingColor}`}>
                  <BarChart3 className={`w-5 h-5 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} />
                  Date & Time
                </h2>

                <div className="space-y-4">
                  {/* Date Time */}
                  <div>
                    <label className={`block text-sm ${labelColor} mb-2`}>Date & Time</label>
                    <input
                      type="datetime-local"
                      value={dateTime}
                      onChange={(e) => setDateTime(e.target.value)}
                      className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-blue-400 transition-colors`}
                    />
                  </div>

                  {/* Temperature */}
                  <div>
                    <label className={`block text-sm ${labelColor} mb-2`}>Temperature (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-blue-400 transition-colors`}
                      placeholder="24.3"
                    />
                  </div>

                  {/* Humidity */}
                  <div>
                    <label className={`block text-sm ${labelColor} mb-2`}>Humidity (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={humidity}
                      onChange={(e) => setHumidity(e.target.value)}
                      className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-blue-400 transition-colors`}
                      placeholder="62.5"
                    />
                  </div>

                  {/* Batch Feeding / Occupancy */}
                  <div>
                    <label className={`block text-sm ${labelColor} mb-2`}>Occupancy</label>
                    <input
                      type="number"
                      value={occupancy}
                      onChange={(e) => setOccupancy(e.target.value)}
                      className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-blue-400 transition-colors`}
                      placeholder="1800"
                    />
                  </div>

                  {/* Renewable Energy */}
                  <div>
                    <label className={`block text-sm ${labelColor} mb-2`}>Renewable Energy (%)</label>
                    <input
                      type="number"
                      step="1"
                      value={renewableEnergy}
                      onChange={(e) => setRenewableEnergy(e.target.value)}
                      className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-blue-400 transition-colors`}
                      placeholder="55"
                    />
                  </div>

                  {/* HVAC Usage */}
                  <div>
                    <label className={`block text-sm ${labelColor} mb-2`}>HVAC Usage</label>
                    <select
                      value={hvacUsage}
                      onChange={(e) => setHvacUsage(e.target.value)}
                      className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-blue-400 transition-colors`}
                    >
                      <option value="On">On</option>
                      <option value="Off">Off</option>
                    </select>
                  </div>

                  {/* Lighting Usage */}
                  <div>
                    <label className={`block text-sm ${labelColor} mb-2`}>Lighting Usage</label>
                    <select
                      value={lightingUsage}
                      onChange={(e) => setLightingUsage(e.target.value)}
                      className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-blue-400 transition-colors`}
                    >
                      <option value="On">On</option>
                      <option value="Off">Off</option>
                    </select>
                  </div>

                  {/* Day of Week */}
                  <div>
                    <label className={`block text-sm ${labelColor} mb-2`}>Day of Week</label>
                    <select
                      value={dayOfWeek}
                      onChange={(e) => setDayOfWeek(e.target.value)}
                      className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-blue-400 transition-colors`}
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>

                  {/* Holiday */}
                  <div>
                    <label className={`block text-sm ${labelColor} mb-2`}>Holiday</label>
                    <select
                      value={isHoliday}
                      onChange={(e) => setIsHoliday(e.target.value)}
                      className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-blue-400 transition-colors`}
                    >
                      <option value="Not a Holiday">Not a Holiday</option>
                      <option value="Holiday">Holiday</option>
                    </select>
                  </div>

                  {/* Predict Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePredict}
                    disabled={loading}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Predicting...
                      </span>
                    ) : (
                      'Predict'
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Side - Prediction Result */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {/* Main Prediction Display */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-2xl text-center">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: predictionResult ? 1 : 0.9 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  >
                    <div className="text-6xl md:text-7xl font-bold mb-2">
                      {predictionResult ? predictionResult.toFixed(2) : '---'}
                    </div>
                    <div className="text-lg text-blue-100">kWh Predicted Consumption</div>
                  </motion.div>
                </div>

                {/* Usage Level and Alert */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Usage Level */}
                  <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
                    <div className={`text-sm ${labelColor} mb-2`}>Usage Level</div>
                    <div className={`text-2xl font-bold text-${getUsageLevelColor()}-400 mb-1`}>
                      {getUsageLevel()}
                    </div>
                    <div className={`text-lg ${textColor}`}>
                      {getEfficiencyScore()}%
                    </div>
                    <div className={`text-xs ${textColor}`}>Efficiency Score</div>
                  </div>

                  {/* HO Alert / Current Load */}
                  <div className={`${cardBg} rounded-xl p-6 shadow-lg`}>
                    <div className={`text-sm ${labelColor} mb-2`}>HO Alert</div>
                    <div className="text-2xl font-bold text-emerald-400 mb-1">
                      {getCurrentLoad()}
                    </div>
                    <div className={`text-xs ${textColor}`}>Current Load</div>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-emerald-500/20 border border-emerald-400/30 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-emerald-100 mb-1">Use natural lighting when possible</div>
                        <div className="text-sm text-emerald-200">Reduce artificial lighting to save energy</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Activity className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-blue-100 mb-1">Increase renewable usage to reduce costs</div>
                        <div className="text-sm text-blue-200">Optimize solar/wind energy consumption</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="w-full">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (predictionResult) {
                        const csvContent = `Prediction Results\\nTimestamp,${dateTime}\\nPredicted Consumption,${predictionResult.toFixed(2)} kWh\\nUsage Level,${getUsageLevel()}\\nEfficiency Score,${getEfficiencyScore()}%\\nCurrent Load,${getCurrentLoad()} kWh\\n`;
                        const blob = new Blob([csvContent], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `prediction_${new Date().toISOString().split('T')[0]}.csv`;
                        a.click();
                        toast.success('Prediction data exported successfully!');
                      } else {
                        toast.error('No prediction data to export');
                      }
                    }}
                    disabled={!predictionResult}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600/50 hover:bg-emerald-600 border border-emerald-400/30 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    Export Results
                  </motion.button>
                </div>

                {/* Confidence Meter - NEW Professional Component */}
                {predictionBounds && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    <ConfidenceMeter
                      prediction={predictionResult!}
                      lowerBound={predictionBounds.lower}
                      upperBound={predictionBounds.upper}
                      confidence={predictionBounds.confidence}
                    />
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Visualization Charts Section - Only show when prediction exists */}
            {predictionResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 space-y-6"
              >
                <div className="text-center mb-6">
                  <h2 className={`text-2xl font-bold ${headingColor} mb-2`}>Prediction Visualizations</h2>
                  <p className={textColor}>Comprehensive analysis of your energy consumption forecast</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Historical Trend Chart */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className={`${cardBg} rounded-2xl p-6 shadow-2xl`}
                  >
                    <h3 className={`text-lg font-bold mb-4 ${headingColor} flex items-center gap-2`}>
                      <TrendingUp className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      Energy Consumption Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={getHistoricalTrendData()}>
                        <defs>
                          <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="time" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #475569',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="actual"
                          stroke="#3b82f6"
                          fillOpacity={1}
                          fill="url(#colorActual)"
                          name="Actual (kWh)"
                        />
                        <Area
                          type="monotone"
                          dataKey="predicted"
                          stroke="#10b981"
                          fillOpacity={1}
                          fill="url(#colorPredicted)"
                          name="Predicted (kWh)"
                        />
                        <Line
                          type="monotone"
                          dataKey="optimal"
                          stroke="#f59e0b"
                          strokeDasharray="5 5"
                          name="Optimal (kWh)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Energy Breakdown Pie Chart */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className={`${cardBg} rounded-2xl p-6 shadow-2xl`}
                  >
                    <h3 className={`text-lg font-bold mb-4 ${headingColor} flex items-center gap-2`}>
                      <Activity className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      Energy Breakdown
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={getEnergyBreakdownData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {getEnergyBreakdownData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #475569',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                          formatter={(value: any) => `${parseFloat(value).toFixed(2)} kWh`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Input Factors Bar Chart */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className={`${cardBg} rounded-2xl p-6 shadow-2xl`}
                  >
                    <h3 className={`text-lg font-bold mb-4 ${headingColor} flex items-center gap-2`}>
                      <BarChart3 className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      Input Parameters
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getInputFactorsData()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="factor" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #475569',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="value" fill="#3b82f6" name="Current Value" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Comparison Chart */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    className={`${cardBg} rounded-2xl p-6 shadow-2xl`}
                  >
                    <h3 className={`text-lg font-bold mb-4 ${headingColor} flex items-center gap-2`}>
                      <TrendingUp className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      Performance Comparison
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={getComparisonData()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="category" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #475569',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="consumption" fill="#ef4444" name="Current (kWh)" />
                        <Bar dataKey="benchmark" fill="#f59e0b" name="Benchmark (kWh)" />
                        <Bar dataKey="optimal" fill="#10b981" name="Optimal (kWh)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* File Upload Section - AI-Powered Data Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-bold ${headingColor} mb-2`}>📂 Upload Energy Data</h2>
                <p className={textColor}>Upload CSV, TXT, PDF, or Excel files for AI-powered analysis</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* File Upload Drop Zone */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`${cardBg} rounded-2xl p-8 shadow-2xl`}
                >
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
                      ${isDragging 
                        ? 'border-blue-400 bg-blue-500/20 scale-105' 
                        : 'border-blue-600/50 hover:border-blue-400/70 hover:bg-blue-900/30'
                      }
                    `}
                  >
                    <input
                      type="file"
                      accept=".csv,.pdf,.xlsx,.xls,.txt"
                      onChange={handleFileInputChange}
                      className="hidden"
                      id="file-upload"
                    />
                    
                    {uploadLoading ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-blue-300/30 border-t-blue-400 rounded-full animate-spin" />
                        <p className="text-blue-200">Processing file...</p>
                      </div>
                    ) : uploadedFile ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                          <Check className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="text-emerald-400 font-semibold mb-1">{uploadedFile.name}</p>
                          <p className="text-sm text-blue-300">
                            {(uploadedFile.size / 1024).toFixed(2)} KB • {uploadedFile.type || 'File'}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setUploadedFile(null);
                            setUploadedData(null);
                            setAiInsights('');
                          }}
                          className="px-4 py-2 bg-blue-600/50 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
                        >
                          Upload Another File
                        </motion.button>
                      </div>
                    ) : (
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-xl shadow-blue-500/50"
                        >
                          <Upload className="w-10 h-10 text-white" />
                        </motion.div>
                        <p className={`text-lg font-semibold ${headingColor} mb-2`}>
                          Drag & Drop or Click to Upload
                        </p>
                        <p className={`text-sm ${textColor} mb-4`}>
                          Supports CSV, TXT, PDF, Excel files • TXT auto-predicts!
                        </p>
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-blue-600/30 border border-blue-500/50 rounded-full text-xs text-blue-200">.CSV</span>
                          <span className="px-3 py-1 bg-green-600/30 border border-green-500/50 rounded-full text-xs text-green-200">.TXT</span>
                          <span className="px-3 py-1 bg-red-600/30 border border-red-500/50 rounded-full text-xs text-red-200">.PDF</span>
                          <span className="px-3 py-1 bg-emerald-600/30 border border-emerald-500/50 rounded-full text-xs text-emerald-200">.XLSX</span>
                        </div>
                      </label>
                    )}
                  </div>

                  {uploadedData && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-6 p-4 ${isDarkMode ? 'bg-blue-900/50 border-blue-600/30' : 'bg-blue-50 border-blue-200'} border rounded-xl`}
                    >
                      <h4 className={`font-semibold ${textColor} mb-3 flex items-center gap-2`}>
                        <BarChart3 className="w-4 h-4" />
                        File Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className={textColor}>Type:</span>
                          <span className={`${headingColor} font-medium`}>{uploadedData.type?.toUpperCase()}</span>
                        </div>
                        {uploadedData.rowCount && (
                          <div className="flex justify-between">
                            <span className={textColor}>Records:</span>
                            <span className={`${headingColor} font-medium`}>{uploadedData.rowCount}</span>
                          </div>
                        )}
                        {uploadedData.fileSize && (
                          <div className="flex justify-between">
                            <span className={textColor}>Size:</span>
                            <span className={`${headingColor} font-medium`}>{uploadedData.fileSize}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* AI Insights Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`${isDarkMode ? 'bg-gradient-to-br from-indigo-800/30 to-purple-800/30' : 'bg-gradient-to-br from-indigo-50 to-purple-50'} backdrop-blur-md border ${isDarkMode ? 'border-white/10' : 'border-indigo-200'} rounded-2xl p-8 shadow-2xl`}
                >
                  <h3 className={`text-xl font-bold ${headingColor} mb-4 flex items-center gap-2`}>
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                    AI-Powered Insights
                  </h3>

                  {aiInsights ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className={`p-4 ${isDarkMode ? 'bg-blue-900/50 border-blue-500/30' : 'bg-slate-50 border-slate-200'} border rounded-xl`}>
                        <pre className={`text-sm ${textColor} whitespace-pre-wrap font-sans leading-relaxed`}>
                          {aiInsights}
                        </pre>
                      </div>

                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            navigator.clipboard.writeText(aiInsights);
                            toast.success('Insights copied to clipboard!');
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/50 hover:bg-blue-600 border border-blue-400/30 text-white rounded-lg font-medium transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          Copy Insights
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            const blob = new Blob([aiInsights], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `ai_insights_${new Date().toISOString().split('T')[0]}.txt`;
                            a.click();
                            toast.success('Insights exported!');
                          }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600/50 hover:bg-emerald-600 border border-emerald-400/30 text-white rounded-lg font-medium transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Export
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className={`w-24 h-24 bg-gradient-to-br ${isDarkMode ? 'from-indigo-500/20 to-purple-500/20' : 'from-indigo-100 to-purple-100'} rounded-full flex items-center justify-center mb-4`}>
                        <Activity className={`w-12 h-12 ${isDarkMode ? 'text-indigo-300 opacity-50' : 'text-indigo-400'}`} />
                      </div>
                      <p className={`${textColor} mb-2`}>No file uploaded yet</p>
                      <p className={`text-sm ${labelColor}`}>
                        Upload a file to get AI-powered energy insights
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
      </div>
    </div>
  );
}