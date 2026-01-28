import { motion } from 'motion/react';
import { useTheme } from '@/app/App';

export function Background3D() {
  const { theme } = useTheme();

  const gradientBgClass = theme === 'dark'
    ? 'absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950/20 to-indigo-950/30'
    : 'absolute inset-0 bg-gradient-to-br from-rose-100 via-amber-50 to-teal-100';

  const orb1Class = theme === 'dark'
    ? 'absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl'
    : 'absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300/50 rounded-full blur-3xl';

  const orb2Class = theme === 'dark'
    ? 'absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl'
    : 'absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-300/50 rounded-full blur-3xl';

  const orb3Class = theme === 'dark'
    ? 'absolute top-1/2 right-1/3 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl'
    : 'absolute top-1/2 right-1/3 w-80 h-80 bg-emerald-300/40 rounded-full blur-3xl';

  const gridClass = theme === 'dark'
    ? 'absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:4rem_4rem]'
    : 'absolute inset-0 bg-[linear-gradient(to_right,#fbbf2440_1px,transparent_1px),linear-gradient(to_bottom,#fbbf2440_1px,transparent_1px)] bg-[size:4rem_4rem]';

  const particleClass = theme === 'dark'
    ? 'absolute w-1 h-1 bg-blue-500/50 rounded-full'
    : 'absolute w-1 h-1 bg-pink-400/60 rounded-full';

  const radialOverlayClass = theme === 'dark'
    ? 'absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_100%)]'
    : 'absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(253,242,234,0.5)_100%)]';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className={gradientBgClass} />
      
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={orb1Class}
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={orb2Class}
      />
      
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 50, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={orb3Class}
      />

      {/* Grid Pattern */}
      <div className={gridClass} />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            className={particleClass}
          />
        ))}
      </div>

      {/* Radial Gradient Overlay */}
      <div className={radialOverlayClass} />
    </div>
  );
}