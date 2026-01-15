import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Zap, Brain, BarChart3, Shield, TrendingUp, Activity, Clock, ChevronRight, Sparkles, Target, LineChart as LineChartIcon, CheckCircle2, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LoginModal } from '../components/auth/LoginModal';

export function Home() {
  const [showLogin, setShowLogin] = useState(false);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced ARIMA and LSTM neural networks analyze historical patterns to forecast energy consumption with exceptional accuracy.',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Interactive dashboards provide live monitoring of energy consumption, demand patterns, and renewable energy integration.',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with ISO 27001 standards ensure your energy data remains secure and private.',
      color: 'green',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  const demoData = [
    { time: '00:00', value: 118 },
    { time: '03:00', value: 92 },
    { time: '06:00', value: 235 },
    { time: '09:00', value: 278 },
    { time: '12:00', value: 245 },
    { time: '15:00', value: 212 },
    { time: '18:00', value: 315 },
    { time: '21:00', value: 268 },
    { time: '24:00', value: 142 },
  ];

  const howItWorks = [
    {
      icon: Activity,
      title: 'Connect Data Sources',
      description: 'Integrate with smart meters, building management systems, or upload CSV files',
      step: '01',
    },
    {
      icon: Brain,
      title: 'AI Model Training',
      description: 'Machine learning algorithms analyze patterns and build prediction models',
      step: '02',
    },
    {
      icon: TrendingUp,
      title: 'Accurate Forecasts',
      description: 'Get hourly, daily, and weekly predictions with confidence intervals',
      step: '03',
    },
    {
      icon: Target,
      title: 'Optimize & Save',
      description: 'Reduce costs and carbon footprint with data-driven insights',
      step: '04',
    },
  ];

  const stats = [
    { value: '96.8%', label: 'Prediction Accuracy', icon: Target },
    { value: '24/7', label: 'Real-Time Monitoring', icon: Activity },
    { value: '24.3%', label: 'Average Cost Savings', icon: TrendingUp },
    { value: '500+', label: 'Enterprise Clients', icon: Sparkles },
  ];

  const benefits = [
    'Reduce operational costs by up to 30%',
    'Predict energy demand with 96%+ accuracy',
    'Detect anomalies in real-time',
    'Optimize renewable energy integration',
    'Automated reporting & compliance',
    'Carbon footprint tracking',
  ];

  return (
    <>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SmartEnergy
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-slate-800 font-semibold mb-4 max-w-3xl mx-auto">
              AI-Powered Energy Forecasting & Optimization
            </p>

            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Harness the power of machine learning to predict energy consumption, detect anomalies, 
              and optimize operations. Trusted by Fortune 500 companies for sustainable energy management.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLogin(true)}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all"
              >
                Get Started Free
              </motion.button>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white/80 backdrop-blur-sm border-2 border-indigo-200 text-slate-700 rounded-xl font-semibold hover:bg-white hover:border-indigo-300 transition-all flex items-center gap-2 shadow-lg"
                >
                  View Live Demo
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Interactive Demo Chart Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xl border border-indigo-200 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-2 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full">
              <LineChartIcon className="w-5 h-5" />
              <span className="font-semibold">Live Energy Forecast</span>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-3">
              Real-Time Prediction Model
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our AI analyzes consumption patterns and delivers accurate forecasts for better decision-making
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={demoData}>
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e7ff',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-600">96.8%</div>
              <div className="text-sm text-emerald-700">Forecast Accuracy</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">15 min</div>
              <div className="text-sm text-blue-700">Update Frequency</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">7 days</div>
              <div className="text-sm text-purple-700">Forecast Horizon</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Powerful Features for Smart Energy Management
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to monitor, predict, and optimize your energy consumption
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group bg-white/80 backdrop-blur-sm border border-indigo-200 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all"
            >
              <div className={`inline-flex p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get started in minutes with our simple 4-step process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorks.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {step.step}
                </div>
                <step.icon className="w-12 h-12 text-blue-600 mx-auto mb-4 mt-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </div>
              {index < howItWorks.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-12 md:p-16 shadow-2xl text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose SmartEnergy?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Join hundreds of enterprises already benefiting from AI-powered energy optimization
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                    <span className="text-white">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6">Start Using SmartEnergy Today</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span>Free access to all features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span>Upload your own data (CSV/Excel)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  <span>Export predictions and reports</span>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLogin(true)}
                className="w-full px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                Get Started Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}