import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  collapsed?: boolean;
}

export function Logo({ size = 'medium', collapsed = false }: LogoProps) {
  const sizes = {
    small: { container: 'w-8 h-8', icon: 'w-5 h-5' },
    medium: { container: 'w-10 h-10', icon: 'w-6 h-6' },
    large: { container: 'w-20 h-20', icon: 'w-10 h-10' },
  };

  const currentSize = sizes[size];

  return (
    <svg
      className={currentSize.container}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle - Traffic Theme */}
      <circle cx="50" cy="50" r="48" fill="url(#grad1)" />
      <circle cx="50" cy="50" r="45" fill="url(#grad2)" />
      
      {/* Traffic Light Symbol - Three dots arranged vertically */}
      <circle cx="50" cy="30" r="6" fill="#10B981" opacity="0.9" />
      <circle cx="50" cy="30" r="4" fill="#34D399" />
      
      <circle cx="50" cy="50" r="6" fill="#F59E0B" opacity="0.9" />
      <circle cx="50" cy="50" r="4" fill="#FBBF24" />
      
      <circle cx="50" cy="70" r="6" fill="#EF4444" opacity="0.9" />
      <circle cx="50" cy="70" r="4" fill="#F87171" />
      
      {/* Camera/Surveillance Icon */}
      <path
        d="M 35 40 L 25 45 L 25 55 L 35 60 Z"
        fill="white"
        opacity="0.3"
      />
      <rect x="23" y="47" width="4" height="6" fill="white" opacity="0.3" />
      
      {/* License Plate Icon */}
      <rect x="60" y="44" width="18" height="12" rx="2" fill="white" opacity="0.3" />
      <rect x="62" y="47" width="5" height="6" fill="url(#grad1)" opacity="0.5" />
      <rect x="68" y="47" width="5" height="6" fill="url(#grad1)" opacity="0.5" />
      <rect x="74" y="47" width="2" height="6" fill="url(#grad1)" opacity="0.5" />
      
      {/* Shield Border for Security */}
      <path
        d="M 50 10 L 65 15 L 65 35 Q 65 45 50 55 Q 35 45 35 35 L 35 15 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.15"
      />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
