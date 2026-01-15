import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleDarkMode}
      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        isDarkMode
          ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
          : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
      }`}
      aria-label="Toggle dark mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? (
          <Moon className="size-5" />
        ) : (
          <Sun className="size-5" />
        )}
      </motion.div>
      <span className="hidden sm:inline">
        {isDarkMode ? 'Dark' : 'Light'}
      </span>
    </motion.button>
  );
}
