import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`border-b mb-6 ${
      isDarkMode ? 'border-slate-700' : 'border-slate-200'
    }`}>
      <div className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? isDarkMode
                  ? 'text-blue-400'
                  : 'text-blue-600'
                : isDarkMode
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                }`}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
