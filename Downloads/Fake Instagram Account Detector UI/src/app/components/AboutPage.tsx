import { motion } from 'motion/react';
import { Shield, Target, Zap, Users, Award, TrendingUp, Brain, Lock, Globe, CheckCircle, AlertTriangle, BarChart3 } from 'lucide-react';
import { useTheme } from '@/app/App';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  
  const headingClass = isDark ? 'text-white' : 'text-gray-900';
  const subheadingClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const cardClass = isDark
    ? 'p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 backdrop-blur-sm hover:border-blue-500/50 transition-all'
    : 'p-8 bg-gradient-to-br from-white/60 to-blue-50/80 rounded-2xl border border-blue-200/50 shadow-lg hover:border-blue-400 hover:shadow-xl transition-all backdrop-blur-sm';

  const stats = [
    { icon: Users, value: '50,000+', label: 'Active Users', color: 'from-blue-500 to-cyan-500' },
    { icon: Shield, value: '10M+', label: 'Accounts Analyzed', color: 'from-purple-500 to-pink-500' },
    { icon: Award, value: '99.2%', label: 'Detection Accuracy', color: 'from-green-500 to-emerald-500' },
    { icon: TrendingUp, value: '95%', label: 'User Satisfaction', color: 'from-orange-500 to-red-500' },
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Officer',
      expertise: 'Machine Learning & NLP',
      description: 'PhD in Computer Science from Stanford, 10+ years in AI research',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Security',
      expertise: 'Cybersecurity & Fraud Detection',
      description: 'Former FBI Cyber Division, Expert in digital forensics',
    },
    {
      name: 'Priya Patel',
      role: 'Lead Data Scientist',
      expertise: 'Statistical Analysis & ML',
      description: 'MIT graduate, Published researcher in social media analytics',
    },
    {
      name: 'James Wilson',
      role: 'Product Director',
      expertise: 'User Experience & Strategy',
      description: '15+ years building security products for Fortune 500 companies',
    },
  ];

  const milestones = [
    { year: '2021', title: 'Company Founded', description: 'Started with a mission to combat fake accounts' },
    { year: '2022', title: 'ML Model V1', description: 'Launched first Random Forest detection model' },
    { year: '2023', title: '1M Analyses', description: 'Reached 1 million account analyses milestone' },
    { year: '2024', title: 'AI Enhancement', description: 'Upgraded to advanced deep learning algorithms' },
    { year: '2025', title: 'Global Expansion', description: 'Expanded services to 50+ countries' },
    { year: '2026', title: 'Premium Features', description: 'Introduced real-time monitoring and API access' },
  ];

  const features = [
    {
      icon: Brain,
      title: 'Advanced Machine Learning',
      description: 'Our Random Forest Classifier analyzes 18+ unique features to detect fake accounts with industry-leading accuracy. The model continuously learns from new data patterns.',
    },
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      description: 'Get instant results within seconds. Our optimized algorithms process thousands of data points in real-time to provide immediate insights and risk assessments.',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'We prioritize your privacy. All data is encrypted end-to-end, never shared with third parties, and processed securely on our servers. GDPR compliant.',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Supporting detection across all countries and languages. Our system is trained on diverse datasets to ensure accurate results worldwide.',
    },
    {
      icon: BarChart3,
      title: 'Detailed Analytics',
      description: 'Comprehensive reports with visual insights, risk scores, red flags, and positive indicators. Understand exactly why an account was flagged.',
    },
    {
      icon: CheckCircle,
      title: 'Continuous Improvement',
      description: 'Our models are updated weekly with new data patterns and fraud techniques. We stay ahead of evolving fake account tactics.',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Data Collection',
      description: 'Enter the Instagram username or account URL you want to analyze. Our system fetches publicly available profile information.',
      icon: Target,
    },
    {
      step: '2',
      title: 'Feature Extraction',
      description: 'We extract 18+ features including follower ratios, engagement rates, bio analysis, profile completeness, and posting patterns.',
      icon: Brain,
    },
    {
      step: '3',
      title: 'ML Analysis',
      description: 'Our Random Forest model processes the features and calculates probability scores for fake vs. real classification.',
      icon: Zap,
    },
    {
      step: '4',
      title: 'Risk Assessment',
      description: 'Results are categorized into Real, Suspicious, or Fake with detailed explanations, confidence scores, and risk levels.',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-block p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-2xl backdrop-blur-sm border border-blue-500/30 mb-8"
          >
            <Shield className="w-16 h-16 text-blue-500" />
          </motion.div>
          
          <h1 className={`text-5xl md:text-6xl font-bold ${headingClass} mb-6`}>
            About <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">InstaGuard</span>
          </h1>
          <p className={`text-xl ${subheadingClass} max-w-3xl mx-auto`}>
            We're on a mission to make social media safer by detecting fake accounts using advanced machine learning and artificial intelligence.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cardClass}
            >
              <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl w-fit mb-4 mx-auto`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className={`text-sm ${subheadingClass}`}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-4xl font-bold ${headingClass} mb-6`}>
                Our Mission
              </h2>
              <p className={`text-lg ${subheadingClass} mb-4`}>
                In today's digital age, fake Instagram accounts pose serious threats to individuals and businesses. From impersonation scams to bot networks, these accounts undermine trust and safety on social media platforms.
              </p>
              <p className={`text-lg ${subheadingClass} mb-4`}>
                InstaGuard was founded in 2021 by a team of cybersecurity experts, data scientists, and social media researchers who recognized the growing need for automated fake account detection.
              </p>
              <p className={`text-lg ${subheadingClass}`}>
                Using cutting-edge machine learning techniques, particularly Random Forest algorithms, we've built a system that analyzes multiple account parameters to identify fake profiles with over 99% accuracy.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl text-white"
              >
                <AlertTriangle className="w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg mb-2">The Problem</h3>
                <p className="text-sm text-blue-100">60% of Instagram accounts show suspicious activity patterns</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl text-white"
              >
                <Shield className="w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg mb-2">Our Solution</h3>
                <p className="text-sm text-purple-100">AI-powered detection that identifies fake accounts instantly</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl text-white"
              >
                <CheckCircle className="w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg mb-2">The Impact</h3>
                <p className="text-sm text-green-100">Protected 50K+ users from scams and impersonation</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl text-white"
              >
                <TrendingUp className="w-8 h-8 mb-4" />
                <h3 className="font-bold text-lg mb-2">The Future</h3>
                <p className="text-sm text-orange-100">Expanding to all social platforms with real-time monitoring</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className={`text-4xl font-bold ${headingClass} text-center mb-12`}>
            How InstaGuard Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cardClass}
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl w-fit mb-4 mt-4">
                    <item.icon className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                <h3 className={`text-xl font-bold ${headingClass} mb-3`}>{item.title}</h3>
                <p className={`${subheadingClass}`}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className={`text-4xl font-bold ${headingClass} text-center mb-12`}>
            Why Choose InstaGuard?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={cardClass}
              >
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold ${headingClass} mb-3`}>
                  {feature.title}
                </h3>
                <p className={subheadingClass}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className={`text-4xl font-bold ${headingClass} text-center mb-12`}>
            Our Journey
          </h2>
          <div className="relative">
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${isDark ? 'bg-gray-700' : 'bg-blue-200'}`}></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className={cardClass}>
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-2">
                        {milestone.year}
                      </div>
                      <h3 className={`text-xl font-bold ${headingClass} mb-2`}>{milestone.title}</h3>
                      <p className={subheadingClass}>{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full relative z-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="p-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Protect Yourself?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust InstaGuard to keep them safe from fake accounts and scams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('signup')}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Get Started Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('analyze')}
                className="px-8 py-4 bg-blue-700 text-white rounded-xl text-lg font-semibold hover:bg-blue-800 transition-all border border-blue-400"
              >
                Try Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}