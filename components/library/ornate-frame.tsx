'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface OrnateFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'paper' | 'leather' | 'wood';
}

export function OrnateFrame({
  children,
  className = '',
  variant = 'paper',
}: OrnateFrameProps) {
  const bgClass = {
    paper: 'paper-texture',
    leather: 'leather-texture',
    wood: 'wood-texture',
  }[variant];

  return (
    <motion.div
      className={`relative ${bgClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Outer gold border */}
      <div className="absolute inset-0 border-2 border-gold/30" />
      
      {/* Inner gold border */}
      <div className="absolute inset-4 border border-gold/20" />

      {/* Corner ornaments */}
      <OrnateCorner position="top-left" />
      <OrnateCorner position="top-right" />
      <OrnateCorner position="bottom-left" />
      <OrnateCorner position="bottom-right" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function OrnateCorner({ position }: { position: string }) {
  const positionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2 rotate-90',
    'bottom-left': 'bottom-2 left-2 -rotate-90',
    'bottom-right': 'bottom-2 right-2 rotate-180',
  }[position];

  return (
    <div className={`absolute ${positionClasses} w-8 h-8 z-20`}>
      <svg viewBox="0 0 32 32" className="w-full h-full text-gold/60">
        <path
          d="M0 0 L12 0 C8 0 4 4 4 8 L4 12 C4 8 0 8 0 8 Z"
          fill="currentColor"
        />
        <path
          d="M0 0 L0 6 M0 0 L6 0"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
