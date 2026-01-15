import { motion } from 'motion/react';
import { Search, Bell, User } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 px-8 py-4 flex items-center justify-between sticky top-0 z-10"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search forecasts, models, or data..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1, rotateZ: 15 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Bell className="w-5 h-5" />
          <motion.span
            className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.button>

        {/* User Profile */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 bg-slate-800 rounded-lg px-4 py-2 cursor-pointer"
        >
          <div className="text-right">
            <p className="text-sm text-white font-medium">Alex Morgan</p>
            <p className="text-xs text-slate-400">Energy Manager</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}