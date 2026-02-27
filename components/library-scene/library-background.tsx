'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLiteMode } from '@/hooks/use-reduced-motion';

export function LibraryBackground() {
  const liteMode = useLiteMode();
  const { scrollYProgress } = useScroll();
  
  const y1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), { stiffness: 100, damping: 30 });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), { stiffness: 100, damping: 30 });
  const y3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), { stiffness: 100, damping: 30 });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base layer - Deep futuristic darkness */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 0%, #0d0d12 0%, #050508 50%, #000 100%)',
        }}
      />

      {/* Futuristic library shelves - holographic effect */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: liteMode ? 0 : y1 }}
      >
        {/* Left bookshelf silhouette */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1/4"
          style={{
            background: `
              linear-gradient(90deg, rgba(139,90,43,0.15) 0%, transparent 100%),
              repeating-linear-gradient(180deg, 
                transparent 0px, 
                transparent 40px, 
                rgba(139,90,43,0.08) 40px, 
                rgba(139,90,43,0.08) 42px
              )
            `,
          }}
        />
        
        {/* Right bookshelf silhouette */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/4"
          style={{
            background: `
              linear-gradient(-90deg, rgba(139,90,43,0.15) 0%, transparent 100%),
              repeating-linear-gradient(180deg, 
                transparent 0px, 
                transparent 40px, 
                rgba(139,90,43,0.08) 40px, 
                rgba(139,90,43,0.08) 42px
              )
            `,
          }}
        />
      </motion.div>

      {/* Mid layer - Architectural elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: liteMode ? 0 : y2 }}
      >
        {/* Columns */}
        <div className="absolute left-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-gold/5 to-transparent" />
        <div className="absolute right-[15%] top-0 bottom-0 w-px bg-gradient-to-b from-gold/20 via-gold/5 to-transparent" />
        
        {/* Ceiling arch suggestion */}
        <div 
          className="absolute top-0 inset-x-0 h-40"
          style={{
            background: 'radial-gradient(ellipse 100% 200% at 50% 0%, rgba(139,90,43,0.1) 0%, transparent 50%)',
          }}
        />

        {/* Floor reflection */}
        <div 
          className="absolute bottom-0 inset-x-0 h-32"
          style={{
            background: 'linear-gradient(to top, rgba(212,175,55,0.03) 0%, transparent 100%)',
          }}
        />
      </motion.div>

      {/* Floating light sources */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: liteMode ? 0 : y3 }}
      >
        {/* Central warm ambient light */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Secondary light sources */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-48 h-48"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-48 h-48"
          animate={{ opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </motion.div>

      {/* Holographic grid lines (futuristic touch) */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Subtle animated scan line (futuristic) */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
