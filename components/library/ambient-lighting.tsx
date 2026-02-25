'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AmbientLighting() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Main ambient gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-library-wood-dark" />

      {/* Warm candlelight glow - top left */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,157,61,0.08) 0%, rgba(255,179,102,0.04) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 0.95, 1.05, 1],
          opacity: [0.8, 1, 0.7, 0.9, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary glow - bottom right */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,157,61,0.06) 0%, rgba(255,179,102,0.03) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1, 0.95, 1.1, 1],
          opacity: [0.6, 0.8, 0.5, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Subtle center glow for reading area */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(244,236,216,0.03) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(26,15,10,0.6) 100%)',
        }}
      />
    </div>
  );
}
