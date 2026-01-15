import React from 'react';

/**
 * Professional Loading Skeletons
 * Provides smooth skeleton screens instead of spinners
 */

export const SkeletonCard: React.FC = () => (
  <div className="animate-pulse">
    <div className="p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/20">
      <div className="h-4 bg-white/10 rounded w-1/3 mb-4"></div>
      <div className="h-8 bg-white/10 rounded w-1/2 mb-3"></div>
      <div className="h-3 bg-white/10 rounded w-3/4"></div>
    </div>
  </div>
);

export const SkeletonKPI: React.FC = () => (
  <div className="animate-pulse">
    <div className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-xl border border-white/20">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 bg-white/10 rounded w-1/3"></div>
        <div className="h-8 w-8 bg-white/10 rounded-full"></div>
      </div>
      <div className="h-10 bg-white/10 rounded w-2/3 mb-2"></div>
      <div className="h-3 bg-white/10 rounded w-1/2"></div>
    </div>
  </div>
);

export const SkeletonChart: React.FC = () => (
  <div className="animate-pulse">
    <div className="p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/20">
      <div className="h-4 bg-white/10 rounded w-1/4 mb-6"></div>
      <div className="space-y-3">
        <div className="h-48 bg-white/10 rounded relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
        <div className="flex gap-2 justify-center">
          <div className="h-3 bg-white/10 rounded w-16"></div>
          <div className="h-3 bg-white/10 rounded w-16"></div>
          <div className="h-3 bg-white/10 rounded w-16"></div>
        </div>
      </div>
    </div>
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="animate-pulse space-y-3">
    {/* Table header */}
    <div className="flex gap-4 pb-3 border-b border-white/10">
      <div className="h-3 bg-white/10 rounded w-1/4"></div>
      <div className="h-3 bg-white/10 rounded w-1/4"></div>
      <div className="h-3 bg-white/10 rounded w-1/4"></div>
      <div className="h-3 bg-white/10 rounded w-1/4"></div>
    </div>
    
    {/* Table rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4">
        <div className="h-4 bg-white/5 rounded w-1/4"></div>
        <div className="h-4 bg-white/5 rounded w-1/4"></div>
        <div className="h-4 bg-white/5 rounded w-1/4"></div>
        <div className="h-4 bg-white/5 rounded w-1/4"></div>
      </div>
    ))}
  </div>
);

export const SkeletonStats: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <SkeletonKPI key={i} />
    ))}
  </div>
);

export const SkeletonPrediction: React.FC = () => (
  <div className="animate-pulse space-y-6">
    {/* Input form skeleton */}
    <div className="p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/20">
      <div className="h-5 bg-white/10 rounded w-1/4 mb-6"></div>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="h-3 bg-white/10 rounded w-1/3 mb-2"></div>
            <div className="h-10 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>
      <div className="mt-6 h-12 bg-blue-500/20 rounded-lg"></div>
    </div>
    
    {/* Result skeleton */}
    <div className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-xl border border-white/20">
      <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
      <div className="h-16 bg-white/10 rounded w-2/3 mb-6"></div>
      <div className="space-y-3">
        <div className="h-4 bg-white/10 rounded"></div>
        <div className="h-4 bg-white/10 rounded w-4/5"></div>
      </div>
    </div>
  </div>
);

export const SkeletonDashboard: React.FC = () => (
  <div className="space-y-8">
    {/* KPI Cards */}
    <SkeletonStats />
    
    {/* Charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SkeletonChart />
      <SkeletonChart />
    </div>
    
    <SkeletonChart />
  </div>
);

export const SkeletonChat: React.FC = () => (
  <div className="flex flex-col h-full">
    {/* Messages */}
    <div className="flex-1 space-y-4 p-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[70%]">
              <div className="h-4 bg-white/10 rounded w-20 mb-2"></div>
              <div className="p-4 bg-white/5 rounded-xl">
                <div className="h-3 bg-white/10 rounded mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Input */}
    <div className="p-6 border-t border-white/10">
      <div className="animate-pulse flex gap-2">
        <div className="flex-1 h-12 bg-white/5 rounded-lg"></div>
        <div className="h-12 w-12 bg-blue-500/20 rounded-lg"></div>
      </div>
    </div>
  </div>
);

// Add shimmer animation to global CSS
const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
`;

// Export all skeletons
export const LoadingSkeletons = {
  Card: SkeletonCard,
  KPI: SkeletonKPI,
  Chart: SkeletonChart,
  Table: SkeletonTable,
  Stats: SkeletonStats,
  Prediction: SkeletonPrediction,
  Dashboard: SkeletonDashboard,
  Chat: SkeletonChat,
};

export default LoadingSkeletons;
