import { motion } from 'motion/react';
import { Zap, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RealTimeMeterProps {
  title: string;
  baseValue: number;
  unit: string;
  icon?: React.ComponentType<any>;
  color?: string;
  updateInterval?: number;
}

export function RealTimeMeter({
  title,
  baseValue,
  unit,
  icon: Icon = Zap,
  color = 'blue',
  updateInterval = 1000,
}: RealTimeMeterProps) {
  const [currentValue, setCurrentValue] = useState(baseValue);
  const [previousValue, setPreviousValue] = useState(baseValue);
  const [isIncreasing, setIsIncreasing] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviousValue(currentValue);
      
      // Simulate realistic fluctuations
      const fluctuation = (Math.random() - 0.5) * (baseValue * 0.1);
      const newValue = Math.max(baseValue * 0.7, Math.min(baseValue * 1.3, baseValue + fluctuation));
      
      setCurrentValue(newValue);
      setIsIncreasing(newValue > currentValue);
      setLastUpdate(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [baseValue, currentValue, updateInterval]);

  const changePercent = ((currentValue - previousValue) / previousValue) * 100;
  const timeSinceUpdate = Math.floor((new Date().getTime() - lastUpdate.getTime()) / 1000);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg bg-${color}-100`}>
            <Icon className={`size-6 text-${color}-600`} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-700">{title}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Activity className="size-3" />
              <span>Live • Updated {timeSinceUpdate}s ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <motion.div
            key={currentValue}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-bold text-slate-800"
          >
            {currentValue.toFixed(1)}
            <span className="text-2xl font-normal text-slate-500 ml-2">{unit}</span>
          </motion.div>
          
          <div className="flex items-center gap-1 mt-2">
            {isIncreasing ? (
              <TrendingUp className="size-4 text-green-600" />
            ) : (
              <TrendingDown className="size-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${
              isIncreasing ? 'text-green-600' : 'text-red-600'
            }`}>
              {Math.abs(changePercent).toFixed(2)}%
            </span>
            <span className="text-sm text-slate-500">vs last reading</span>
          </div>
        </div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`w-3 h-3 rounded-full bg-${color}-500`}
        />
      </div>
    </div>
  );
}
