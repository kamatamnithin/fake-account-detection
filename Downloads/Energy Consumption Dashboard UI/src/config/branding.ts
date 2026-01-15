/**
 * SMARTENERGY BRANDING CONFIGURATION
 * 
 * Customize your website's branding by editing this file.
 * Changes here will automatically apply across the entire application.
 */

export const branding = {
  // ==========================================
  // COMPANY INFORMATION
  // ==========================================
  company: {
    name: 'SmartEnergy',
    tagline: 'AI-Powered Energy Forecasting',
    description: 'Transform your energy management with intelligent predictions',
    website: 'https://smartenergy.ai',
    email: 'hello@smartenergy.ai',
    phone: '+1 (555) 123-4567',
  },

  // ==========================================
  // SOCIAL MEDIA
  // ==========================================
  social: {
    twitter: 'https://twitter.com/smartenergy',
    linkedin: 'https://linkedin.com/company/smartenergy',
    github: 'https://github.com/smartenergy',
    facebook: 'https://facebook.com/smartenergy',
  },

  // ==========================================
  // COLOR SCHEME
  // ==========================================
  colors: {
    // Primary brand colors (used for buttons, links, highlights)
    primary: {
      light: '#60a5fa',  // blue-400
      main: '#3b82f6',   // blue-500
      dark: '#2563eb',   // blue-600
    },
    
    // Secondary colors
    secondary: {
      light: '#818cf8',  // indigo-400
      main: '#6366f1',   // indigo-500
      dark: '#4f46e5',   // indigo-600
    },
    
    // Accent colors
    accent: {
      success: '#10b981', // emerald-500
      warning: '#f59e0b', // amber-500
      error: '#ef4444',   // red-500
      info: '#06b6d4',    // cyan-500
    },

    // Background gradients (edit these for different color schemes)
    gradients: {
      // Light theme gradient (Home, Dashboard)
      light: 'from-blue-50 via-indigo-50 to-purple-50',
      
      // Dark theme gradient (Prediction page)
      dark: 'from-blue-900 via-indigo-900 to-purple-900',
      
      // Button gradients
      primaryButton: 'from-blue-600 to-indigo-600',
      secondaryButton: 'from-purple-600 to-pink-600',
      successButton: 'from-emerald-600 to-teal-600',
    },
  },

  // ==========================================
  // HOMEPAGE CONTENT
  // ==========================================
  hero: {
    title: 'Predict Energy Demand with',
    highlightedTitle: 'AI Intelligence',
    subtitle: 'Harness the power of machine learning to forecast energy consumption, optimize costs, and reduce your carbon footprint with precision.',
    ctaText: 'Start Forecasting',
    secondaryCtaText: 'View Demo',
  },

  // ==========================================
  // FEATURES & STATS
  // ==========================================
  stats: {
    accuracy: '96.8%',
    accuracyLabel: 'Prediction Accuracy',
    
    monitoring: '24/7',
    monitoringLabel: 'Real-Time Monitoring',
    
    savings: '24.3%',
    savingsLabel: 'Average Cost Savings',
    
    clients: '500+',
    clientsLabel: 'Enterprise Clients',
  },

  // ==========================================
  // ABOUT PAGE
  // ==========================================
  about: {
    mission: 'To revolutionize energy management through cutting-edge AI technology, enabling businesses to make data-driven decisions that reduce costs and environmental impact.',
    
    vision: 'A sustainable future where every organization can predict, optimize, and control their energy consumption with unprecedented accuracy.',
    
    founded: '2024',
    headquarters: 'San Francisco, CA',
    teamSize: '50+ experts',
  },

  // ==========================================
  // PREDICTION MODEL INFO
  // ==========================================
  model: {
    name: 'Random Forest Regressor',
    version: 'v2.1.0',
    accuracy: '96.8%',
    trainingData: '10M+ data points',
    features: '15+ input parameters',
  },

  // ==========================================
  // PREMIUM FEATURES (For 5-star feel)
  // ==========================================
  premium: {
    showRatings: true,      // Show 5-star ratings
    showBadges: true,       // Show premium badges
    showTestimonials: true, // Show testimonials
    showStats: true,        // Show statistics
    animationsEnabled: true, // Enable animations
  },

  // ==========================================
  // NAVIGATION
  // ==========================================
  navigation: {
    logo: 'SmartEnergy',
    showAuthButtons: true,
    menuItems: [
      { label: 'Home', path: '/' },
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Analysis', path: '/analysis' },
      { label: 'AI Chat', path: '/ai-chat' },
      { label: 'Prediction', path: '/prediction' },
      { label: 'About', path: '/about' },
    ],
  },

  // ==========================================
  // FOOTER
  // ==========================================
  footer: {
    copyrightYear: new Date().getFullYear(),
    copyrightText: 'SmartEnergy. All rights reserved.',
    showSocial: true,
    showNewsletter: false,
  },

  // ==========================================
  // CUSTOM THEMES (Color Presets)
  // ==========================================
  themes: {
    // Default: Blue/Indigo
    default: {
      light: 'from-blue-50 via-indigo-50 to-purple-50',
      dark: 'from-blue-900 via-indigo-900 to-purple-900',
      primary: 'blue',
      accent: 'indigo',
    },
    
    // Green/Eco theme
    eco: {
      light: 'from-emerald-50 via-green-50 to-teal-50',
      dark: 'from-emerald-900 via-green-900 to-teal-900',
      primary: 'emerald',
      accent: 'teal',
    },
    
    // Orange/Energy theme
    energy: {
      light: 'from-orange-50 via-amber-50 to-yellow-50',
      dark: 'from-orange-900 via-amber-900 to-yellow-900',
      primary: 'orange',
      accent: 'amber',
    },
    
    // Purple/Tech theme
    tech: {
      light: 'from-purple-50 via-violet-50 to-fuchsia-50',
      dark: 'from-purple-900 via-violet-900 to-fuchsia-900',
      primary: 'purple',
      accent: 'violet',
    },

    // Cyan/Modern theme
    modern: {
      light: 'from-cyan-50 via-sky-50 to-blue-50',
      dark: 'from-cyan-900 via-sky-900 to-blue-900',
      primary: 'cyan',
      accent: 'sky',
    },
  },

  // ==========================================
  // ACTIVE THEME (Change this to switch themes)
  // ==========================================
  activeTheme: 'default', // Options: 'default', 'eco', 'energy', 'tech', 'modern'
};

// Helper function to get active theme colors
export const getActiveTheme = () => {
  return branding.themes[branding.activeTheme as keyof typeof branding.themes];
};

// Export individual sections for convenience
export const { company, social, colors, hero, stats, about, model, premium, navigation, footer } = branding;