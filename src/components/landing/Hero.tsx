'use client';

import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const taskExamples = [
  { 
    name: 'Quarterly Review', 
    color: 'text-red-400', // Brighter, more readable colors
    tag: 'Urgent',
    bgColor: 'bg-red-500/20',
    x: 10, 
    y: 5 
  },
  { 
    name: 'Write Documentation', 
    color: 'text-blue-400',
    tag: 'Work',
    bgColor: 'bg-blue-500/20',
    x: 45, 
    y: 25 
  },
  { 
    name: 'System Design', 
    color: 'text-purple-400',
    tag: 'Learning',
    bgColor: 'bg-purple-500/20',
    x: 75, 
    y: 10 
  },
  { 
    name: 'Team Sync-up', 
    color: 'text-cyan-400',
    tag: 'Meeting',
    bgColor: 'bg-cyan-500/20',
    x: 5, 
    y: 45 
  },
  { 
    name: 'Launch Planning', 
    color: 'text-amber-400',
    tag: 'Strategy',
    bgColor: 'bg-amber-500/20',
    x: 60, 
    y: 40 
  },
  { 
    name: 'Walk my dog', 
    color: 'text-emerald-400',
    tag: 'Home',
    bgColor: 'bg-emerald-500/20',
    x: 30, 
    y: 60 
  },
  { 
    name: 'User Research', 
    color: 'text-pink-400',
    tag: 'Research',
    bgColor: 'bg-pink-500/20',
    x: 70, 
    y: 70 
  },
  { 
    name: 'API Integration', 
    color: 'text-indigo-400',
    tag: 'Tech',
    bgColor: 'bg-indigo-500/20',
    x: 15, 
    y: 80 
  }
];

const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  const springConfig = { stiffness: 100, damping: 30 };
  const mouseXSpring = useSpring(0, springConfig);
  const mouseYSpring = useSpring(0, springConfig);

  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      mouseXSpring.set(x * 15);
      mouseYSpring.set(y * 15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseXSpring, mouseYSpring]);

  return (
    <div className="relative pt-24 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
            >
              Organize smarter, not harder
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-medium text-white mb-8 tracking-tight">
              First-class
              <br />
              task management
            </h1>
            <div className="space-y-6 text-lg text-white/60">
              <p>
                We are a team of productivity enthusiasts who love building tools for other professionals.
              </p>
              <p>
                Our goal is to create the task management platform we&apos;ve always wished we had — one that <span className="italic">just works</span>.
              </p>
            </div>
          </motion.div>

          {/* Right side - Interactive task examples */}
          <div className="relative h-[500px] select-none">
            {taskExamples.map((task, index) => {
              const baseDelay = index * 0.1;
              const offsetX = isClient ? Math.random() * 3 - 1.5 : 0;
              const offsetY = isClient ? Math.random() * 3 - 1.5 : 0;

              return (
                <motion.div
                  key={task.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: baseDelay }}
                  style={{
                    position: 'absolute',
                    left: `${task.x + offsetX}%`,
                    top: `${task.y + offsetY}%`,
                  }}
                  className="relative z-20"
                >
                  <motion.div
                    style={{
                      x: mouseXSpring,
                      y: mouseYSpring,
                    }}
                    className={`
                      group flex items-center space-x-2 font-mono text-sm
                      px-4 py-2 rounded-full cursor-default backdrop-blur-sm
                      border border-white/[0.06] transition-all duration-300
                      ${task.bgColor} hover:border-white/[0.1] hover:bg-opacity-20
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white/90 group-hover:text-white transition-colors">
                      {task.name}
                    </span>
                    <span className={`
                      text-xs px-2 py-0.5 rounded-full 
                      border border-white/[0.1]
                      ${task.color} ${task.bgColor}
                      font-medium
                    `}>
                      {task.tag}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Floating particles with trails */}
            {isClient && typeof window !== 'undefined' && window.innerWidth > 768 && [...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
                initial={{
                  x: Math.random() * 500,
                  y: Math.random() * 500,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  x: Math.random() * 500,
                  y: Math.random() * 500,
                  transition: {
                    duration: Math.random() * 20 + 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  },
                }}
              >
                <div className="absolute inset-0 blur-sm bg-white/40" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;