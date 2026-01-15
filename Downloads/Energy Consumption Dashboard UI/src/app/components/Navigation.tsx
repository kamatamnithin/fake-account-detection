import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Menu, X, Home, LayoutDashboard, MessageSquare, TrendingUp, Info, Activity, BarChart3, AlertTriangle, Lightbulb, Star } from 'lucide-react';
import { LoginModal } from './auth/LoginModal';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { branding } from '../../config/branding';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { isDarkMode } = useTheme();

  // Icon mapping
  const iconMap: Record<string, any> = {
    '/': Home,
    '/dashboard': LayoutDashboard,
    '/analysis': AlertTriangle,
    '/ai-chat': MessageSquare,
    '/prediction': TrendingUp,
    '/scenarios': Lightbulb,
    '/review': Star,
    '/about': Info,
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: iconMap['/'] },
    { path: '/dashboard', label: 'Dashboard', icon: iconMap['/dashboard'] },
    { path: '/analysis', label: 'Analysis', icon: iconMap['/analysis'] },
    { path: '/prediction', label: 'Prediction', icon: iconMap['/prediction'] },
    { path: '/scenarios', label: 'Scenarios', icon: iconMap['/scenarios'] },
    { path: '/ai-chat', label: 'AI Chat', icon: iconMap['/ai-chat'] },
    { path: '/review', label: 'Review', icon: iconMap['/review'] },
    { path: '/about', label: 'About', icon: iconMap['/about'] },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl shadow-lg transition-all ${
        isDarkMode 
          ? 'border-slate-700/50 bg-slate-900/90 shadow-slate-900/50' 
          : 'border-indigo-200/50 bg-white/90 shadow-blue-100/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                  className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/30"
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>
                <span className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text ${
                  isDarkMode ? 'text-transparent' : 'text-transparent'
                }`}>
                  SmartEnergy
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex items-center gap-6"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-2 transition-colors ${
                        isActive 
                          ? 'text-blue-600 font-semibold' 
                          : isDarkMode
                            ? 'text-slate-300 hover:text-blue-400'
                            : 'text-slate-700 hover:text-blue-600'
                      }`}
                    >
                      <link.icon className="w-4 h-4" />
                      <span className="text-sm">{link.label}</span>
                    </motion.div>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600"
                      />
                    )}
                  </Link>
                );
              })}

              <ThemeToggle />

              {isAuthenticated ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
                >
                  Log Out
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogin(true)}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
                >
                  Sign In
                </motion.button>
              )}
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${
                isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-blue-400'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t backdrop-blur-xl ${
              isDarkMode
                ? 'border-slate-700 bg-slate-900/95'
                : 'border-indigo-200/50 bg-white/95'
            }`}
          >
            <div className="px-4 py-4 space-y-3 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 py-2 transition-colors ${
                    location.pathname === link.path
                      ? 'text-blue-600 font-semibold'
                      : isDarkMode
                        ? 'text-slate-300 hover:text-blue-400'
                        : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
              
              <div className="pt-2">
                <ThemeToggle />
              </div>
              
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 text-left"
                >
                  Log Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 text-left"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      <div className="h-16" /> {/* Spacer for fixed nav */}

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}