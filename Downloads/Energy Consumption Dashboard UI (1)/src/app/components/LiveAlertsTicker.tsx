import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle, Info, TrendingUp, Zap, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Alert {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  message: string;
  timestamp: Date;
}

const alertTemplates = [
  { type: 'info', message: 'Peak demand forecasted for 6:00 PM today', icon: TrendingUp },
  { type: 'success', message: 'Energy consumption 12% below target', icon: CheckCircle },
  { type: 'warning', message: 'HVAC usage elevated in Building A', icon: AlertCircle },
  { type: 'info', message: 'Solar generation at 87% capacity', icon: Zap },
  { type: 'success', message: 'Cost savings: $234 this week', icon: CheckCircle },
  { type: 'info', message: 'Next prediction update in 5 minutes', icon: Clock },
  { type: 'warning', message: 'Occupancy spike detected - adjust HVAC', icon: AlertCircle },
  { type: 'success', message: 'Carbon footprint reduced by 8.5%', icon: CheckCircle },
];

export function LiveAlertsTicker() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Initialize with first alert
    setAlerts([{
      id: '1',
      type: alertTemplates[0].type as any,
      message: alertTemplates[0].message,
      timestamp: new Date(),
    }]);

    // Add new alert every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % alertTemplates.length);
      
      const template = alertTemplates[(currentIndex + 1) % alertTemplates.length];
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: template.type as any,
        message: template.message,
        timestamp: new Date(),
      };

      setAlerts((prev) => [newAlert, ...prev].slice(0, 3)); // Keep last 3
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: CheckCircle,
          iconColor: 'text-green-600',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          icon: AlertCircle,
          iconColor: 'text-amber-600',
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: AlertCircle,
          iconColor: 'text-red-600',
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: Info,
          iconColor: 'text-blue-600',
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-2">
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
            className="w-2 h-2 rounded-full bg-red-500"
          />
          <h3 className="font-semibold text-slate-700">Live Alerts</h3>
        </div>
        <span className="text-xs text-slate-500 ml-auto">Real-time monitoring</span>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {alerts.map((alert) => {
            const styles = getAlertStyles(alert.type);
            const Icon = styles.icon;

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`${styles.bg} ${styles.border} border rounded-lg p-3`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`size-4 ${styles.iconColor} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${styles.text}`}>
                      {alert.message}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
