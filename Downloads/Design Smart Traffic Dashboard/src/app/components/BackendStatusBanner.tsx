import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, CheckCircle, X, Server } from "lucide-react";
import { healthCheck } from "../services/api";

export function BackendStatusBanner() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkBackend() {
      try {
        await healthCheck();
        setIsOnline(true);
        console.log("✅ Backend connected successfully!");
        // Auto-hide success banner after 5 seconds
        setTimeout(() => setShowBanner(false), 5000);
      } catch (error) {
        setIsOnline(false);
      } finally {
        setIsChecking(false);
      }
    }
    
    checkBackend();
  }, []);

  // Don't show anything while checking
  if (isChecking) return null;

  // Don't show if user dismissed or backend is offline
  if (!showBanner || isOnline === false) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
      >
        <div
          className="rounded-xl shadow-2xl border backdrop-blur-sm p-4 bg-green-50/95 border-green-200"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100 text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <h4 className="font-semibold mb-1 text-green-900">
                Backend Connected Successfully!
              </h4>
              <p className="text-sm text-green-700">
                All backend features are available. Data will be stored in Supabase.
              </p>
            </div>

            <button
              onClick={() => setShowBanner(false)}
              className="p-1 rounded-lg transition-colors hover:bg-green-100 text-green-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}