import { motion } from 'motion/react';
import { Mail, Lock, User, Github, Chrome, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { useTheme } from '@/app/App';
import { supabase } from '@/lib/supabase';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      // Call backend signup endpoint
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-828f33b3/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account');
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onNavigate('login');
      }, 2000);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign up with Google');
      console.error('Google signup error:', err);
    }
  };

  const handleGithubSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign up with GitHub');
      console.error('GitHub signup error:', err);
    }
  };

  const cardClass = theme === 'dark'
    ? 'p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 backdrop-blur-xl'
    : 'p-8 bg-gradient-to-br from-white/60 to-blue-50/80 rounded-2xl border border-blue-200/50 shadow-xl backdrop-blur-xl';

  const socialButtonClass = theme === 'dark'
    ? 'flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all border border-gray-700'
    : 'flex items-center justify-center gap-2 px-4 py-3 bg-white/70 text-gray-900 rounded-lg hover:bg-white transition-all border border-blue-200';

  const inputClass = theme === 'dark'
    ? 'pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500'
    : 'pl-10 bg-white/70 border-blue-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500';

  const labelClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const headingClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const subtextClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const dividerBg = theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50/80';
  const dividerBorder = theme === 'dark' ? 'border-gray-700' : 'border-blue-200';

  return (
    <div className="min-h-screen pt-16 py-12 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className={cardClass}>
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-block p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-2xl mb-4"
            >
              <User className="w-8 h-8 text-blue-500" />
            </motion.div>
            <h2 className={`text-3xl font-bold ${headingClass} mb-2`}>Create Account</h2>
            <p className={subtextClass}>Join us to start detecting fake accounts</p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-500"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-2 text-green-500"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">Account created successfully! Redirecting to login...</p>
            </motion.div>
          )}

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGithubSignup}
              type="button"
              className={socialButtonClass}
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignup}
              type="button"
              className={socialButtonClass}
            >
              <Chrome className="w-5 h-5" />
              <span>Google</span>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${dividerBorder}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${dividerBg} ${subtextClass}`}>Or sign up with</span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={labelClass}>
                Full Name
              </Label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={labelClass}>
                Email
              </Label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className={labelClass}>
                Password
              </Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className={labelClass}>
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, agreeToTerms: checked as boolean })
                }
                className={theme === 'dark' ? 'border-gray-600' : 'border-gray-400'}
              />
              <label
                htmlFor="terms"
                className={`text-sm ${subtextClass} cursor-pointer`}
              >
                I agree to the{' '}
                <span className="text-blue-500 hover:text-blue-400">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="text-blue-500 hover:text-blue-400">
                  Privacy Policy
                </span>
              </label>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg"
                disabled={!formData.agreeToTerms || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </motion.div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className={subtextClass}>
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-blue-500 hover:text-blue-400 font-semibold transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className={`text-center text-sm mt-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
          By creating an account, you agree to our Terms and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}