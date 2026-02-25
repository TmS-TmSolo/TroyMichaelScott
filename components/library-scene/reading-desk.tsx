'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ReadingDeskProps {
  children: React.ReactNode;
}

export function ReadingDesk({ children }: ReadingDeskProps) {
  return (
    <motion.div
      className="relative w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Desk surface suggestion */}
      <div 
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-8"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(92, 58, 33, 0.3) 0%, 
              rgba(44, 24, 16, 0.1) 100%)
          `,
          borderRadius: '50%',
          filter: 'blur(8px)',
        }}
      />

      {/* Main content area - the "book" sits here */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Subtle desk lamp glow effect */}
      <div 
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center bottom, 
              rgba(255, 179, 102, 0.1) 0%, 
              transparent 70%)
          `,
        }}
      />
    </motion.div>
  );
}
