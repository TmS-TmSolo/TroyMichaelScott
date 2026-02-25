'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  symbol?: string;
  className?: string;
}

export function SectionDivider({
  symbol = '❧',
  className = '',
}: SectionDividerProps) {
  return (
    <motion.div
      className={`flex items-center justify-center gap-4 my-12 ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="flex-1 max-w-24 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
        }}
      />
      <span className="text-gold text-2xl font-serif">{symbol}</span>
      <div
        className="flex-1 max-w-24 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
        }}
      />
    </motion.div>
  );
}
