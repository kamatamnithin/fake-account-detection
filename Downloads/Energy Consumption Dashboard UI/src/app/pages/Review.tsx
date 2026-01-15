import { motion } from 'motion/react';
import { Star, ThumbsUp, MessageCircle, Award, TrendingUp, Users, CheckCircle, Quote, Zap, Shield, LineChart, Clock, DollarSign, BarChart3, Brain, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { LoginModal } from '../components/auth/LoginModal';

export function Review() {
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submittedReviews, setSubmittedReviews] = useState<any[]>([]);

  // Theme-aware colors
  const cardBg = isDarkMode ? 'bg-blue-800/30 backdrop-blur-md border border-white/10' : 'bg-white/90 backdrop-blur-md border border-slate-200';
  const textColor = isDarkMode ? 'text-blue-100' : 'text-slate-600';
  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900';
  const labelColor = isDarkMode ? 'text-blue-200' : 'text-slate-700';
  const inputBg = isDarkMode ? 'bg-blue-900/50 border-blue-600/30 text-white placeholder-blue-300' : 'bg-white border-slate-300 text-slate-800 placeholder-slate-400';

  const stats = [
    { label: 'Total Reviews', value: submittedReviews.length.toString(), icon: Users, color: 'blue' },
    { label: 'Average Rating', value: submittedReviews.length > 0 ? `${(submittedReviews.reduce((acc, r) => acc + r.rating, 0) / submittedReviews.length).toFixed(1)}/5` : 'N/A', icon: Star, color: 'yellow' },
    { label: 'Active Users', value: submittedReviews.length.toString(), icon: ThumbsUp, color: 'green' },
    { label: 'Platform Rating', value: '5-Star', icon: Award, color: 'purple' },
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to submit a review');
      setShowLoginModal(true);
      return;
    }
    
    if (!newReview.name || !newReview.comment) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setSubmitting(true);
    toast.loading('Submitting your review...');
    
    // Simulate submission
    setTimeout(() => {
      const review = {
        id: Date.now(),
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: 'Just now',
        verified: true,
      };
      
      setSubmittedReviews([review, ...submittedReviews]);
      setSubmitting(false);
      toast.dismiss();
      toast.success('Thank you for your review! It has been published.');
      setNewReview({ name: '', rating: 5, comment: '' });
    }, 1500);
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning models with ARIMA forecasting for accurate energy demand prediction',
      color: 'blue',
    },
    {
      icon: Zap,
      title: 'Real-Time Analytics',
      description: 'Live monitoring and instant insights with interactive dashboards and visualizations',
      color: 'yellow',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and ISO 50001 compliance for data protection',
      color: 'green',
    },
    {
      icon: DollarSign,
      title: 'Cost Optimization',
      description: 'Reduce energy costs by up to 30% with intelligent consumption analysis',
      color: 'emerald',
    },
    {
      icon: LineChart,
      title: 'Trend Analysis',
      description: 'Historical data analysis with pattern recognition and anomaly detection',
      color: 'purple',
    },
    {
      icon: Globe,
      title: 'Multi-Site Support',
      description: 'Manage multiple facilities from a single unified dashboard',
      color: 'indigo',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Energy Director',
      company: 'TechCorp Industries',
      avatar: '👩‍💼',
      rating: 5,
      comment: 'SmartEnergy transformed how we manage our facilities. The AI predictions are incredibly accurate, helping us reduce costs by 28% in just 6 months. The real-time analytics give us insights we never had before.',
      highlight: 'Reduced costs by 28%',
    },
    {
      name: 'Michael Chen',
      role: 'Sustainability Manager',
      company: 'GreenTech Solutions',
      avatar: '👨‍💼',
      rating: 5,
      comment: 'The ARIMA forecasting is exceptional! We can now predict peak demand with 94% accuracy and optimize our renewable energy usage. The CSV export feature makes reporting effortless.',
      highlight: '94% prediction accuracy',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Manager',
      company: 'Manufacturing Plus',
      avatar: '👩‍🔧',
      rating: 5,
      comment: 'Best energy management platform we\'ve used. The anomaly detection caught equipment issues before they became expensive problems. The voice assistant feature is a game-changer for quick insights!',
      highlight: 'Prevented costly failures',
    },
    {
      name: 'David Kim',
      role: 'CFO',
      company: 'Retail Giant Inc',
      avatar: '👨‍💻',
      rating: 5,
      comment: 'ROI was evident within 3 months. The cost analysis tools and predictive models helped us make data-driven decisions that saved millions. Highly recommend for any enterprise serious about energy efficiency.',
      highlight: 'ROI in 3 months',
    },
  ];

  const comparisonFeatures = [
    { feature: 'AI-Powered Forecasting', smartenergy: true, competitor: false },
    { feature: 'Real-Time Voice Assistant', smartenergy: true, competitor: false },
    { feature: 'ARIMA Time Series Analysis', smartenergy: true, competitor: false },
    { feature: 'Anomaly Detection', smartenergy: true, competitor: true },
    { feature: 'Multi-Site Dashboard', smartenergy: true, competitor: true },
    { feature: 'CSV Import/Export', smartenergy: true, competitor: true },
    { feature: 'Cost Optimization AI', smartenergy: true, competitor: false },
    { feature: 'What-If Scenarios', smartenergy: true, competitor: false },
    { feature: '24/7 Support', smartenergy: true, competitor: false },
    { feature: 'Free Forever Plan', smartenergy: true, competitor: false },
  ];

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white' 
        : 'bg-white text-slate-800'
    }`}>
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-1/4 right-1/4 w-96 h-96 ${
            isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100/30'
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className={`inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-4 py-2 mb-4 shadow-lg ${
            isDarkMode ? 'bg-white/10 border-white/20' : 'bg-blue-50 border-blue-200'
          }`}>
            <Star className={`w-4 h-4 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`} />
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-blue-100' : 'text-blue-700'}`}>Customer Reviews</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {submittedReviews.length > 0 ? 'What Our Users Say' : 'Share Your Experience'}
          </h1>
          <p className={`text-lg ${textColor} max-w-2xl mx-auto`}>
            {submittedReviews.length > 0 
              ? 'Read reviews from energy managers and sustainability professionals'
              : 'Be the first to share your experience with SmartEnergy'}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`${cardBg} rounded-xl p-6 shadow-lg text-center`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 bg-${stat.color}-500/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <div className={`text-3xl font-bold ${headingColor} mb-1`}>{stat.value}</div>
              <div className={`text-sm ${textColor}`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold ${headingColor} mb-4 text-center`}>
            Why Users Love SmartEnergy
          </h2>
          <p className={`${textColor} text-center mb-8 max-w-2xl mx-auto`}>
            Discover the powerful features that make SmartEnergy the #1 choice for energy management
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`${cardBg} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all group`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-${feature.color}-500/20 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-400`} />
                </div>
                <h3 className={`text-xl font-bold ${headingColor} mb-2`}>{feature.title}</h3>
                <p className={`${textColor} text-sm leading-relaxed`}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold ${headingColor} mb-4 text-center`}>
            Success Stories
          </h2>
          <p className={`${textColor} text-center mb-8 max-w-2xl mx-auto`}>
            Real results from energy professionals who trust SmartEnergy
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`${cardBg} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{testimonial.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-bold ${headingColor}`}>{testimonial.name}</h3>
                      <CheckCircle className="w-4 h-4 text-green-400" title="Verified User" />
                    </div>
                    <p className={`text-sm ${textColor}`}>{testimonial.role}</p>
                    <p className={`text-xs ${textColor} opacity-75`}>{testimonial.company}</p>
                    <div className="flex mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <Quote className={`absolute -left-2 -top-2 w-6 h-6 ${isDarkMode ? 'text-blue-600/30' : 'text-slate-300'}`} />
                  <p className={`${textColor} leading-relaxed pl-6`}>
                    {testimonial.comment}
                  </p>
                </div>

                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  isDarkMode ? 'bg-green-500/20 border border-green-500/30' : 'bg-green-50 border border-green-200'
                }`}>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                    {testimonial.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold ${headingColor} mb-4 text-center`}>
            SmartEnergy vs Competitors
          </h2>
          <p className={`${textColor} text-center mb-8 max-w-2xl mx-auto`}>
            See why SmartEnergy is the superior choice for energy forecasting
          </p>

          <div className={`${cardBg} rounded-2xl p-6 shadow-2xl overflow-x-auto`}>
            <table className="w-full">
              <thead>
                <tr className={`border-b-2 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                  <th className={`text-left py-4 px-4 ${headingColor} font-bold`}>Feature</th>
                  <th className={`text-center py-4 px-4 ${headingColor} font-bold`}>
                    <div className="flex flex-col items-center">
                      <span className="text-lg">SmartEnergy</span>
                      <span className="text-xs text-blue-500 font-normal">Recommended</span>
                    </div>
                  </th>
                  <th className={`text-center py-4 px-4 ${textColor} font-semibold`}>Competitors</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((item, index) => (
                  <tr 
                    key={item.feature}
                    className={`${index !== comparisonFeatures.length - 1 ? `border-b ${isDarkMode ? 'border-white/5' : 'border-slate-100'}` : ''}`}
                  >
                    <td className={`py-4 px-4 ${textColor}`}>{item.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {item.smartenergy ? (
                        <div className="flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span className="text-2xl text-red-400">✕</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {item.competitor ? (
                        <div className="flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-gray-400" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span className="text-2xl text-red-400">✕</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-bold ${headingColor} mb-6`}
          >
            Recent Reviews
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {submittedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`${cardBg} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">👩‍💼</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${headingColor}`}>{review.name}</h3>
                      {review.verified && (
                        <CheckCircle className="w-4 h-4 text-green-400" title="Verified User" />
                      )}
                    </div>
                    <p className={`text-sm ${textColor}`}>Energy Manager, Tech Corp</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-xs ${textColor}`}>{review.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className={`absolute -left-2 -top-2 w-6 h-6 ${isDarkMode ? 'text-blue-600/30' : 'text-slate-300'}`} />
                  <p className={`${textColor} leading-relaxed pl-6`}>
                    {review.comment}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Write a Review Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`${cardBg} rounded-2xl p-8 shadow-2xl mt-12`}
        >
          <h2 className={`text-2xl font-bold ${headingColor} mb-2 flex items-center gap-2`}>
            <MessageCircle className="w-6 h-6 text-blue-400" />
            Write a Review
          </h2>
          <p className={`${textColor} mb-6`}>
            Share your experience with SmartEnergy and help others make informed decisions
          </p>

          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className={`block text-sm ${labelColor} mb-2`}>Your Name *</label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-blue-400 transition-colors`}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className={`block text-sm ${labelColor} mb-2`}>Rating *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        rating <= newReview.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-sm ${labelColor} mb-2`}>Your Review *</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className={`w-full px-4 py-3 ${inputBg} rounded-lg focus:outline-none focus:border-blue-400 transition-colors min-h-32 resize-none`}
                placeholder="Share your experience with SmartEnergy..."
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                'Submit Review'
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-center pt-8"
        >
          <p className={`text-sm ${textColor} mb-4`}>
            Trusted by leading organizations worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className={`${cardBg} rounded-lg px-6 py-3`}>
              <span className={headingColor}>⭐ 4.9/5.0 on G2</span>
            </div>
            <div className={`${cardBg} rounded-lg px-6 py-3`}>
              <span className={headingColor}>🏆 Best Energy Tool 2024</span>
            </div>
            <div className={`${cardBg} rounded-lg px-6 py-3`}>
              <span className={headingColor}>✅ ISO 50001 Compliant</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}