import { ReactNode, useState } from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginModal } from './auth/LoginModal';
import { useTheme } from '../../contexts/ThemeContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const { isDarkMode } = useTheme();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode 
          ? 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        {/* Background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={`absolute top-1/4 right-1/4 w-96 h-96 ${
              isDarkMode ? 'bg-blue-500/20' : 'bg-blue-200/30'
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-2xl mx-auto px-4"
        >
          <div className={`${
            isDarkMode 
              ? 'bg-gradient-to-br from-blue-800/50 to-indigo-800/50 border-blue-400/30' 
              : 'bg-white/90 border-blue-200'
          } backdrop-blur-xl border-2 rounded-3xl p-12 text-center shadow-2xl`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6 shadow-xl shadow-blue-500/50"
            >
              <Lock className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Sign In Required
            </h2>
            <p className={`text-lg mb-8 max-w-md mx-auto ${isDarkMode ? 'text-blue-200' : 'text-slate-600'}`}>
              Please sign in to access this page and unlock all SmartEnergy features.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLoginModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Sign In to Continue
            </motion.button>
            
            <p className={`text-sm mt-6 ${isDarkMode ? 'text-blue-300' : 'text-slate-500'}`}>
              No account? Click "Sign Up" when the login modal opens.
            </p>
          </div>
        </motion.div>

        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </div>
    );
  }

  return <>{children}</>;
}
