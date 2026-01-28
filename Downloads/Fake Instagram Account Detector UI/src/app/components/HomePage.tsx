import { motion } from 'motion/react';
import { Shield, Search, BarChart3, Zap, UserCheck, Brain, Target, TrendingUp, Play, CheckCircle2, Upload, ScanLine, AlertTriangle } from 'lucide-react';
import { useTheme } from '@/app/App';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { theme } = useTheme();
  const [userName, setUserName] = useState<string>('User');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.user_metadata?.name) {
          setUserName(user.user_metadata.name);
        } else if (user?.email) {
          // Extract name from email if no name is set
          const emailName = user.email.split('@')[0];
          setUserName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Machine learning algorithms with 99.2% accuracy for precise account classification',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Get instant insights with comprehensive data visualization and trends',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: UserCheck,
      title: 'Account Verification',
      description: 'Verify authenticity through multiple parameters and behavioral analysis',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: Target,
      title: 'Smart Recommendations',
      description: 'Actionable insights to protect yourself from suspicious accounts',
      gradient: 'from-orange-500 to-amber-500',
    },
  ];

  const howItWorksSteps = [
    {
      step: '01',
      icon: Upload,
      title: 'Input Account Data',
      description: 'Enter Instagram account parameters including follower count, following count, posts, and profile details.',
      color: theme === 'dark' ? 'from-cyan-500 to-blue-500' : 'from-[#FF6B35] to-[#FF8C61]',
    },
    {
      step: '02',
      icon: ScanLine,
      title: 'AI Analysis',
      description: 'Our Random Forest ML model analyzes patterns and behaviors to detect anomalies with 99.2% accuracy.',
      color: theme === 'dark' ? 'from-blue-500 to-purple-500' : 'from-[#FF8C61] to-[#FFA07A]',
    },
    {
      step: '03',
      icon: BarChart3,
      title: 'Get Results',
      description: 'Receive detailed classification (Real, Fake, or Suspicious) with visual analytics and insights.',
      color: theme === 'dark' ? 'from-purple-500 to-pink-500' : 'from-[#FFA07A] to-[#FF6B35]',
    },
    {
      step: '04',
      icon: CheckCircle2,
      title: 'Take Action',
      description: 'Make informed decisions with actionable recommendations to protect yourself online.',
      color: theme === 'dark' ? 'from-pink-500 to-red-500' : 'from-[#FF5722] to-[#FF6B35]',
    },
  ];

  const bgClass = theme === 'dark' 
    ? 'bg-[#0A1128]' 
    : 'bg-gradient-to-br from-[#FFF8F3] via-[#FFE8E0] to-[#FFF0E6]';
  
  const textPrimaryClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  
  const welcomeTextClass = theme === 'dark' ? 'text-cyan-400' : 'text-[#FF6B35]';
  
  const heroTitleGradient = theme === 'dark'
    ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400'
    : 'bg-gradient-to-r from-[#FF6B35] via-[#FF8C61] to-[#FFA07A]';
  
  const featureCardClass = theme === 'dark'
    ? 'bg-gradient-to-br from-[#1a2947] to-[#0f1829] border border-cyan-500/20 hover:border-cyan-500/40'
    : 'bg-white/60 border border-[#FF6B35]/20 hover:border-[#FF6B35]/40 shadow-lg hover:shadow-xl';

  const buttonPrimaryClass = theme === 'dark'
    ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
    : 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] hover:from-[#FF5722] hover:to-[#FF6B35]';

  const buttonSecondaryClass = theme === 'dark'
    ? 'bg-[#1a2947] text-white border border-cyan-500/30 hover:border-cyan-500/60'
    : 'bg-white/80 text-[#FF6B35] border border-[#FF6B35]/30 hover:border-[#FF6B35]/60';

  const sectionBgClass = theme === 'dark'
    ? 'bg-gradient-to-b from-[#0f1829] to-[#0A1128]'
    : 'bg-gradient-to-b from-white/40 to-transparent';

  return (
    <div className={`min-h-screen pt-16 ${bgClass}`}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Welcome Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <Shield className={`w-5 h-5 ${welcomeTextClass}`} />
                <span className={`text-sm font-medium ${welcomeTextClass}`}>
                  {isLoading ? 'Welcome!' : `Welcome, ${userName}!`}
                </span>
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${textPrimaryClass} leading-tight`}>
                  Smart Instagram Account
                </h1>
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${heroTitleGradient} bg-clip-text text-transparent leading-tight`}>
                  Analysis & Prediction
                </h1>
              </div>

              {/* Description */}
              <p className={`text-lg sm:text-xl ${textSecondaryClass} max-w-xl`}>
                Harness the power of Machine Learning to detect fake Instagram accounts, optimize your social media safety, and protect yourself with AI-driven insights.
              </p>

              {/* Feature Pills */}
              <div className="grid grid-cols-2 gap-4 max-w-xl">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`p-4 rounded-xl ${featureCardClass} backdrop-blur-sm transition-all duration-300`}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.gradient} w-fit mb-2`}>
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className={`text-sm font-semibold ${textPrimaryClass}`}>
                      {feature.title}
                    </h3>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('analyze')}
                  className={`px-8 py-4 ${buttonPrimaryClass} text-white rounded-xl text-lg font-semibold transition-all shadow-lg flex items-center justify-center gap-2`}
                >
                  <Zap className="w-5 h-5" />
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('dashboard')}
                  className={`px-8 py-4 ${buttonSecondaryClass} rounded-xl text-lg font-semibold transition-all backdrop-blur-sm flex items-center justify-center gap-2`}
                >
                  <Play className="w-5 h-5" />
                  View Dashboard
                </motion.button>
              </div>
            </motion.div>

            {/* Right Decorative Element with Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative flex items-center justify-center"
            >
              {/* Phone Mockup */}
              <div className="relative z-10">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* Phone Frame */}
                  <div className={`relative w-72 sm:w-80 rounded-[3rem] overflow-hidden ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border-8 border-gray-700' 
                      : 'bg-gradient-to-br from-gray-100 to-white shadow-2xl border-8 border-gray-200'
                  }`}>
                    {/* Phone Notch */}
                    <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 ${
                      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
                    } rounded-b-2xl z-20`}></div>
                    
                    {/* Phone Screen */}
                    <div className="relative aspect-[9/19.5] overflow-hidden">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1498926506265-166e25d0910a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwc29jaWFsJTIwbWVkaWElMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY5NTc2MDE1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Instagram Interface"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay with gradient */}
                      <div className={`absolute inset-0 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-t from-cyan-900/60 via-transparent to-transparent'
                          : 'bg-gradient-to-t from-[#FF6B35]/40 via-transparent to-transparent'
                      }`}></div>
                      
                      {/* Detection Badge */}
                      <div className="absolute bottom-6 left-4 right-4">
                        <div className={`p-4 rounded-2xl backdrop-blur-xl ${
                          theme === 'dark'
                            ? 'bg-cyan-500/20 border border-cyan-400/30'
                            : 'bg-white/80 border border-[#FF6B35]/30'
                        } shadow-lg`}>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className={theme === 'dark' ? 'text-cyan-400' : 'text-[#FF6B35]'} />
                            <span className={`font-semibold ${textPrimaryClass}`}>Account Verified</span>
                          </div>
                          <p className={`text-xs mt-1 ${textSecondaryClass}`}>99.2% Accuracy</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Orbs - Hidden on mobile */}
              <div className="hidden lg:block absolute inset-0">
                {[...Array(6)].map((_, i) => {
                  const angle = (i * 60 * Math.PI) / 180;
                  const radius = 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: [y, y - 20, y],
                        x: [x, x + 10, x],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute"
                      style={{ 
                        left: '50%',
                        top: '50%',
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      <div 
                        className={`w-12 h-12 rounded-full ${
                          theme === 'dark'
                            ? 'bg-gradient-to-br from-cyan-400 to-blue-500'
                            : 'bg-gradient-to-br from-[#FF6B35] to-[#FFA07A]'
                        } shadow-lg flex items-center justify-center backdrop-blur-sm`}
                      >
                        {i % 3 === 0 ? (
                          <Search className="w-6 h-6 text-white" />
                        ) : i % 3 === 1 ? (
                          <BarChart3 className="w-6 h-6 text-white" />
                        ) : (
                          <Target className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${sectionBgClass}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${textPrimaryClass} mb-4`}>
              How It Works
            </h2>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>
              Simple, fast, and accurate. Our AI-powered system makes fake account detection effortless.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Connecting Line */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-current to-transparent opacity-20 z-0" 
                    style={{ color: theme === 'dark' ? '#06b6d4' : '#FF6B35' }}
                  />
                )}

                <div className={`relative p-6 rounded-2xl ${featureCardClass} backdrop-blur-sm h-full`}>
                  {/* Step Number */}
                  <div className={`text-6xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent mb-4 opacity-20`}>
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${step.color} w-fit mb-4 shadow-lg -mt-2`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold ${textPrimaryClass} mb-3`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${textSecondaryClass} leading-relaxed`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('analyze')}
              className={`px-8 py-4 ${buttonPrimaryClass} text-white rounded-xl text-lg font-semibold transition-all shadow-lg`}
            >
              Try It Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Visual Screenshots Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${textPrimaryClass} mb-4`}>
              Powerful Visual Analytics
            </h2>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>
              Get comprehensive insights with our advanced data visualization and AI-powered detection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
              className={`rounded-2xl overflow-hidden ${featureCardClass} backdrop-blur-sm`}
            >
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761850167081-473019536383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjBkYXNoYm9hcmQlMjBzY3JlZW58ZW58MXx8fHwxNzY5NTE1MDYwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Analytics Dashboard"
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-t from-cyan-900/80 to-transparent'
                    : 'bg-gradient-to-t from-[#FF6B35]/60 to-transparent'
                }`}></div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold ${textPrimaryClass} mb-2`}>
                  Real-Time Dashboard
                </h3>
                <p className={`text-sm ${textSecondaryClass}`}>
                  Track and analyze multiple accounts with comprehensive metrics
                </p>
              </div>
            </motion.div>

            {/* AI Technology */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className={`rounded-2xl overflow-hidden ${featureCardClass} backdrop-blur-sm`}
            >
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njk0ODA1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="AI Technology"
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-t from-blue-900/80 to-transparent'
                    : 'bg-gradient-to-t from-[#FF8C61]/60 to-transparent'
                }`}></div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold ${textPrimaryClass} mb-2`}>
                  AI-Powered Detection
                </h3>
                <p className={`text-sm ${textSecondaryClass}`}>
                  Advanced machine learning with Random Forest algorithm
                </p>
              </div>
            </motion.div>

            {/* Security */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -10 }}
              className={`rounded-2xl overflow-hidden ${featureCardClass} backdrop-blur-sm`}
            >
              <div className="relative aspect-video overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1652148555073-4b1d2ecd664c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMHNoaWVsZCUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzY5NDkxMjMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Security Protection"
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-t from-purple-900/80 to-transparent'
                    : 'bg-gradient-to-t from-[#FFA07A]/60 to-transparent'
                }`}></div>
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold ${textPrimaryClass} mb-2`}>
                  Enhanced Security
                </h3>
                <p className={`text-sm ${textSecondaryClass}`}>
                  Protect yourself from scams and fake account threats
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Detail Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${sectionBgClass}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${textPrimaryClass} mb-4`}>
              Powerful Detection Features
            </h2>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>
              Everything you need to identify and protect yourself from fake Instagram accounts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`p-8 rounded-2xl ${featureCardClass} backdrop-blur-sm transition-all duration-300`}
              >
                <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} w-fit mb-4 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold ${textPrimaryClass} mb-3`}>
                  {feature.title}
                </h3>
                <p className={`text-base ${textSecondaryClass} leading-relaxed`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '99.2%', label: 'Detection Accuracy' },
              { value: '50K+', label: 'Accounts Analyzed' },
              { value: '10K+', label: 'Active Users' },
              { value: '24/7', label: 'AI Monitoring' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-4xl sm:text-5xl font-bold mb-2 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                    : 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61]'
                } bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className={`text-sm sm:text-base ${textSecondaryClass} font-medium`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`p-12 rounded-3xl text-center ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-cyan-600 to-blue-700'
                : 'bg-gradient-to-br from-[#FF6B35] to-[#FF5722]'
            } shadow-2xl`}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-6"
            >
              <Shield className="w-16 h-16 text-white" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Analyze Accounts?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Start detecting fake Instagram accounts now with our AI-powered detection system
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('analyze')}
              className="px-8 py-4 bg-white text-[#FF6B35] rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Start Analysis Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
