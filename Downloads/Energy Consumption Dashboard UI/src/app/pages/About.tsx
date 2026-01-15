import { motion } from 'motion/react';
import { 
  Zap, 
  Brain, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  BarChart3, 
  Code, 
  Cpu,
  Database,
  Sparkles,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Forecasting',
      description: 'Advanced ARIMA and machine learning models predict energy consumption with 94%+ accuracy.',
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Analytics',
      description: 'Monitor consumption patterns, trends, and anomalies in real-time with interactive visualizations.',
    },
    {
      icon: Shield,
      title: 'Anomaly Detection',
      description: 'Automatically detect unusual consumption patterns and receive instant alerts.',
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Dashboards',
      description: 'Beautiful, intuitive dashboards with 5+ KPIs and multiple chart types.',
    },
  ];

  const techStack = [
    { name: 'React 18', icon: Code, description: 'Modern UI framework with hooks and concurrent features' },
    { name: 'TypeScript', icon: Code, description: 'Type-safe development for reliable code' },
    { name: 'Recharts', icon: BarChart3, description: 'Powerful charting library for data visualization' },
    { name: 'Motion', icon: Sparkles, description: 'Smooth animations and transitions' },
    { name: 'Gemini AI', icon: Brain, description: 'Google\'s advanced AI for intelligent insights' },
    { name: 'Tailwind CSS', icon: Cpu, description: 'Utility-first CSS framework' },
  ];

  const faqs = [
    {
      question: 'How accurate are the energy forecasts?',
      answer: 'Our ML models achieve 96.8% accuracy for 24-hour forecasts and 94.3% for weekly predictions. We use ensemble methods combining ARIMA, LSTM neural networks, and seasonal decomposition for maximum reliability.',
    },
    {
      question: 'What data sources does SmartEnergy support?',
      answer: 'SmartEnergy integrates with smart meters, building management systems (BMS), IoT sensors, and supports CSV/Excel data uploads. We provide REST APIs for custom integrations.',
    },
    {
      question: 'How is my data secured?',
      answer: 'We implement bank-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit. ISO 27001 certified infrastructure with regular security audits ensures your data remains private and protected.',
    },
    {
      question: 'Can I customize the forecasting models?',
      answer: 'Yes! Enterprise plans include model customization, custom training schedules, and the ability to incorporate external variables like weather, occupancy, and production schedules.',
    },
    {
      question: 'What makes SmartEnergy different from competitors?',
      answer: 'We combine state-of-the-art AI models with intuitive UX design, real-time anomaly detection, and an intelligent AI assistant. Our platform is built for both technical and non-technical users.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              {/* Removed the "Powered by AI & Machine Learning" badge */}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SmartEnergy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto mb-12"
            >
              Transforming energy management through AI-powered forecasting, real-time analytics, 
              and intelligent insights. Built for sustainability, optimized for performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 mb-12"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-xl shadow-blue-500/30">
                <Zap className="w-10 h-10 text-white" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed">
                  To empower organizations and individuals with intelligent energy management tools that 
                  reduce costs, optimize consumption, and contribute to a sustainable future. We believe 
                  that data-driven insights are the key to achieving energy efficiency at scale.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-slate-800">Our Vision</h2>
                <p className="text-slate-600 leading-relaxed">
                  To create a world where every kilowatt is used intelligently. We envision a future where 
                  AI-powered energy management is accessible to all, making sustainable practices the default 
                  choice for homes, businesses, and communities worldwide.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Powerful Features</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Everything you need to understand, predict, and optimize your energy consumption
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-xl shadow-lg shadow-blue-500/30">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-slate-800">{feature.title}</h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Built with Modern Technology</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Leveraging the latest frameworks and tools for maximum performance and reliability
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-xl p-6 text-center hover:border-indigo-400 hover:shadow-xl transition-all"
                >
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/30">
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-2 text-slate-800">{tech.name}</h3>
                  <p className="text-sm text-slate-600">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">Frequently Asked Questions</h2>
              <p className="text-slate-600">
                Everything you need to know about SmartEnergy
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold mb-2 text-slate-800">{faq.question}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center shadow-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Optimize Your Energy?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Start forecasting, analyzing, and reducing your energy consumption today with SmartEnergy's 
                AI-powered platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <motion.a
                  href="/dashboard"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-2xl transition-all"
                >
                  View Dashboard
                </motion.a>
                <motion.a
                  href="/ai-chat"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold transition-colors"
                >
                  Try AI Assistant
                </motion.a>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@smartenergy.ai</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '96.8%', label: 'ML Model Accuracy' },
                { value: '500+', label: 'Enterprise Clients' },
                { value: '24/7', label: 'Real-Time Monitoring' },
                { value: '50M+', label: 'Data Points Analyzed' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}