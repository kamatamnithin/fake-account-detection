import { motion } from 'motion/react';
import { LayoutDashboard, ChartLine, Database, Bell, Settings, Zap } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: ChartLine },
    { id: 'data', label: 'Data', icon: Database },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-slate-900 h-screen flex flex-col border-r border-slate-800"
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center"
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
          >
            <Zap className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="font-bold text-white">EnergyAI</h1>
            <p className="text-xs text-slate-400">Forecasting Platform</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
              whileHover={{ x: 5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={isActive ? { rotateY: 360 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <motion.div
          className="bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border border-blue-500/30 rounded-lg p-4"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-xs text-slate-400 mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span className="text-xs text-white font-medium">All Systems Operational</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}