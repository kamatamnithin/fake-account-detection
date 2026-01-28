import { motion } from 'motion/react';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useTheme } from '@/app/App';

interface ErrorPageProps {
  onNavigate: (page: string) => void;
  errorType?: '404' | '500' | 'empty';
  title?: string;
  message?: string;
}

export function ErrorPage({
  onNavigate,
  errorType = '404',
  title,
  message,
}: ErrorPageProps) {
  const { theme } = useTheme();
  
  const errorContent = {
    '404': {
      title: 'Page Not Found',
      message: "The page you're looking for doesn't exist or has been moved.",
      code: '404',
    },
    '500': {
      title: 'Server Error',
      message: 'Something went wrong on our end. Please try again later.',
      code: '500',
    },
    empty: {
      title: 'No Data Found',
      message: "There's nothing here yet. Start by analyzing your first account!",
      code: '',
    },
  };

  const content = errorContent[errorType];

  const iconBgClass = theme === 'dark'
    ? 'p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-full border border-gray-700'
    : 'p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border border-gray-300';
  const headingClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const messageClass = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const buttonOutlineClass = theme === 'dark'
    ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
    : 'bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200';
  const helpTextClass = theme === 'dark' ? 'text-gray-500' : 'text-gray-600';

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-8 flex justify-center"
        >
          <div className={iconBgClass}>
            <AlertTriangle className="w-24 h-24 text-yellow-500" />
          </div>
        </motion.div>

        {/* Error Code */}
        {content.code && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              {content.code}
            </h1>
          </motion.div>
        )}

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <h2 className={`text-4xl font-bold ${headingClass}`}>
            {title || content.title}
          </h2>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <p className={`text-xl ${messageClass}`}>{message || content.message}</p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => onNavigate('home')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className={`${buttonOutlineClass} px-8 py-6 text-lg`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <p className={`text-sm ${helpTextClass}`}>
            Need help?{' '}
            <button
              onClick={() => onNavigate('home')}
              className="text-blue-500 hover:text-blue-400 underline"
            >
              Contact Support
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}