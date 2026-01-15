import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  delay?: number;
}

const colorStyles = {
  blue: {
    gradient: 'from-blue-500 to-cyan-400',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    shadow: 'shadow-blue-500/30',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
  },
  green: {
    gradient: 'from-green-500 to-emerald-400',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-600',
    shadow: 'shadow-emerald-500/30',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  },
  orange: {
    gradient: 'from-orange-500 to-amber-400',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-600',
    shadow: 'shadow-orange-500/30',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
  },
  red: {
    gradient: 'from-red-500 to-rose-400',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    shadow: 'shadow-red-500/30',
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
  },
  purple: {
    gradient: 'from-purple-500 to-pink-400',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    shadow: 'shadow-purple-500/30',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
  },
};

export function KPICard({ title, value, unit, trend, icon: Icon, color, delay = 0 }: KPICardProps) {
  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0, rotateX: -15 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className={`bg-white/80 backdrop-blur-sm border-2 ${styles.border} rounded-2xl p-6 hover:shadow-2xl hover:${styles.shadow} transition-all cursor-pointer`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${styles.iconBg} p-3 rounded-xl shadow-lg ${styles.shadow}`}>
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 3,
              delay: delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {trend !== undefined && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.3, type: 'spring' }}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
              trend > 0
                ? 'bg-emerald-100 text-emerald-700'
                : trend < 0
                ? 'bg-red-100 text-red-700'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {trend > 0 ? '+' : ''}
            {trend}%
          </motion.div>
        )}
      </div>

      <div>
        <p className="text-slate-600 text-sm mb-2 font-medium">{title}</p>
        <div className="flex items-baseline gap-2">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
            className="text-slate-900 text-3xl font-bold"
          >
            {value}
          </motion.span>
          {unit && <span className="text-slate-600 text-sm font-medium">{unit}</span>}
        </div>
      </div>

      {/* 3D animated background element */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-0 rounded-2xl`}
        whileHover={{ opacity: 0.05 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}