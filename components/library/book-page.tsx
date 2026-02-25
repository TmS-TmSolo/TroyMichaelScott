'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BookPageProps {
  children: React.ReactNode;
  className?: string;
  side?: 'left' | 'right' | 'full';
  pageNumber?: number;
}

export function BookPage({
  children,
  className = '',
  side = 'full',
  pageNumber,
}: BookPageProps) {
  const shadowClass = {
    left: 'page-shadow-left',
    right: 'page-shadow',
    full: '',
  }[side];

  return (
    <motion.div
      className={`relative paper-texture min-h-screen ${shadowClass} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page texture overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Aged edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(139,119,82,0.1) 0%, transparent 5%, transparent 95%, rgba(139,119,82,0.1) 100%)',
          }}
        />
        {/* Top/bottom aging */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(139,119,82,0.08) 0%, transparent 3%, transparent 97%, rgba(139,119,82,0.08) 100%)',
          }}
        />
      </div>

      {/* Content container with proper padding */}
      <div className="relative z-10 px-8 py-12 md:px-16 lg:px-24 xl:px-32">
        {children}
      </div>

      {/* Page number */}
      {pageNumber !== undefined && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <span className="font-serif text-library-ink-faded text-sm tracking-wider">
            — {pageNumber} —
          </span>
        </div>
      )}

      {/* Subtle page curl effect on bottom right */}
      <div
        className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, transparent 50%, rgba(139,119,82,0.1) 100%)',
        }}
      />
    </motion.div>
  );
}
