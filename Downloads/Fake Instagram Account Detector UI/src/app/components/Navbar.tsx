import { motion } from 'motion/react';
import { Shield, Menu, X, Sun, Moon, LogOut, Search } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/app/App';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function Navbar({ onNavigate, currentPage, isAuthenticated = false, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = isAuthenticated
    ? [
        { label: 'Home', value: 'home' },
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Analyze', value: 'analyze' },
        { label: 'About', value: 'about' },
        { label: 'Profile', value: 'profile' },
      ]
    : [];

  const navBgClass = theme === 'dark'
    ? 'backdrop-blur-lg bg-gray-900/80 border-b border-gray-800'
    : 'backdrop-blur-lg bg-white/90 border-b border-primary/10';

  const textClass = theme === 'dark' ? 'text-white' : 'text-foreground';
  const mutedTextClass = theme === 'dark' ? 'text-gray-400' : 'text-muted-foreground';
  const hoverTextClass = theme === 'dark' ? 'hover:text-white' : 'hover:text-primary';
  const mobileMenuBg = theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-secondary/30';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 ${navBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate(isAuthenticated ? 'home' : 'login')}
          >
            <div className={`relative p-2 rounded-lg ${theme === 'dark' ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : 'bg-gradient-to-br from-primary to-primary/80'}`}>
              <Search className="w-6 h-6 text-white" />
              <Shield className="w-3 h-3 text-white absolute -bottom-0.5 -right-0.5" />
            </div>
            <span className={`text-xl font-bold ${theme === 'dark' ? 'bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent' : 'bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'}`}>
              InstaGuard
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.button
                key={item.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(item.value)}
                className={`relative px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.value
                    ? textClass
                    : `${mutedTextClass} ${hoverTextClass}`
                }`}
              >
                {item.label}
                {currentPage === item.value && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-lg -z-10 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-primary to-primary/80'}`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-yellow-500' : 'bg-secondary text-primary'}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Login/Logout Button */}
            {isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('login')}
                className={`px-6 py-2 text-white rounded-lg transition-all ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70'}`}
              >
                Login
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-yellow-500' : 'bg-secondary text-primary'}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className={textClass}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  currentPage === item.value
                    ? `${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-primary to-primary/80'} text-white`
                    : `${mutedTextClass} ${hoverTextClass} ${mobileMenuBg}`
                }`}
              >
                {item.label}
              </button>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  onLogout?.();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left px-4 py-2 mt-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 mt-2 text-white rounded-lg ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-primary to-primary/80'}`}
              >
                Login
              </button>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}