import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Github, CheckCircle } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'sonner';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Call the auth context login function
      await login(formData.email, formData.password, formData.name);
      
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Show success message then close modal
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        setFormData({ name: '', email: '', password: '' });
      }, 1500);
    } catch (error) {
      setIsSubmitting(false);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleSocialAuth = (provider: string) => {
    console.log(`Authenticating with ${provider}...`);
    // In a real app, this would redirect to OAuth provider
    alert(`${provider} authentication would be handled here. This is a demo application.`);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {showSuccess ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4"
              >
                <CheckCircle className="w-12 h-12 text-green-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
              <p className="text-slate-400">
                {isSignup ? 'Account created successfully' : 'Signed in successfully'}
              </p>
            </motion.div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-white mb-2">
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-slate-400 mb-8">
                {isSignup ? 'Sign up to start forecasting' : 'Sign in to your account'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                {isSignup && (
                  <div>
                    <label className="text-slate-300 text-sm mb-2 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required={isSignup}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-10 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-10 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 text-sm mb-2 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={8}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-10 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold py-3 rounded-lg mb-4 hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing...
                    </span>
                  ) : (
                    isSignup ? 'Sign Up' : 'Sign In'
                  )}
                </motion.button>
              </form>
            </>
          )}

          {!showSuccess && (
            <>
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-slate-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialAuth('Google')}
                  className="flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 rounded-lg py-3 hover:bg-slate-700 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-white">Google</span>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialAuth('Github')}
                  className="flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 rounded-lg py-3 hover:bg-slate-700 transition-colors"
                >
                  <Github className="w-5 h-5 text-white" />
                  <span className="text-white">Github</span>
                </motion.button>
              </div>

              <p className="text-center text-slate-400 text-sm">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setFormData({ name: '', email: '', password: '' });
                  }}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}