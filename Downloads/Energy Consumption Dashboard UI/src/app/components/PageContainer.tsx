import { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen py-8 transition-colors ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-white'
    } ${className}`}>
      {children}
    </div>
  );
}

export function Card({ children, className = '' }: PageContainerProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`rounded-xl shadow-lg border p-6 transition-colors ${
      isDarkMode
        ? 'bg-slate-800 border-slate-700'
        : 'bg-white border-slate-200'
    } ${className}`}>
      {children}
    </div>
  );
}

export function Text({ children, variant = 'body', className = '' }: { children: ReactNode; variant?: 'heading' | 'subheading' | 'body' | 'muted'; className?: string }) {
  const { isDarkMode } = useTheme();
  
  const variantStyles = {
    heading: isDarkMode ? 'text-slate-100' : 'text-slate-800',
    subheading: isDarkMode ? 'text-slate-200' : 'text-slate-700',
    body: isDarkMode ? 'text-slate-300' : 'text-slate-600',
    muted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
  };
  
  return (
    <span className={`transition-colors ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}