import { motion } from 'motion/react';
import { Mail, Lock, Github, Chrome, Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { useTheme } from '@/app/App';
import { supabase } from '@/lib/supabase';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: () => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setIsLoading(false);
        return;
      }

      if (data.session) {
        // Successful login
        onLogin();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign in with Google');
      console.error('Google login error:', err);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign in with GitHub');
      console.error('GitHub login error:', err);
    }
  };

  const cardClass = theme === 'dark'
    ? 'p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 backdrop-blur-xl'
    : 'p-8 bg-white/90 rounded-2xl border border-primary/10 shadow-2xl backdrop-blur-xl';

  const socialButtonClass = theme === 'dark'
    ? 'flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all border border-gray-700'
    : 'flex items-center justify-center gap-2 px-4 py-3 bg-white text-foreground rounded-lg hover:bg-secondary/50 transition-all border border-border';

  const inputClass = theme === 'dark'
    ? 'pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500'
    : 'pl-10 bg-input-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary';

  const labelClass = theme === 'dark' ? 'text-gray-300' : 'text-foreground';
  const headingClass = theme === 'dark' ? 'text-white' : 'text-foreground';
  const subtextClass = theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground';
  const dividerBg = theme === 'dark' ? 'bg-gray-900' : 'bg-background';
  const dividerBorder = theme === 'dark' ? 'border-gray-700' : 'border-border';

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
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
              className={`inline-block p-4 rounded-2xl mb-4 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-600/20 to-indigo-600/20' : 'bg-gradient-to-br from-primary/20 to-accent/30'}`}
            >
              <Lock className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-500' : 'text-primary'}`} />
            </motion.div>
            <h2 className={`text-3xl font-bold ${headingClass} mb-2`}>Welcome Back</h2>
            <p className={subtextClass}>Sign in to your account</p>
          </div>

          {/* Error Message */}
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

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGithubLogin}
              type="button"
              className={socialButtonClass}
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
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
              <span className={`px-2 ${dividerBg} ${subtextClass}`}>Or continue with</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className={labelClass}>
                  Password
                </Label>
                <button
                  type="button"
                  className={`text-sm transition-colors ${theme === 'dark' ? 'text-blue-500 hover:text-blue-400' : 'text-primary hover:text-primary/80'}`}
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full py-6 text-lg ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70'}`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </motion.div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className={subtextClass}>
              Don't have an account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className={`font-semibold transition-colors ${theme === 'dark' ? 'text-blue-500 hover:text-blue-400' : 'text-primary hover:text-primary/80'}`}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className={`text-center text-sm mt-6 ${theme === 'dark' ? 'text-gray-500' : 'text-muted-foreground'}`}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>

        {/* OAuth Setup Note */}
        <div className={`mt-4 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-secondary/50 border border-primary/20'}`}>
          <p className={`text-xs ${theme === 'dark' ? 'text-blue-400' : 'text-primary'}`}>
            <strong>Note:</strong> To enable social login (Google/GitHub), please configure OAuth providers in your Supabase dashboard. 
            Visit <a href="https://supabase.com/docs/guides/auth/social-login" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary/70">Supabase OAuth documentation</a> for setup instructions.
          </p>
        </div>
      </motion.div>
    </div>
  );
}