'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLiteMode } from '@/hooks/use-reduced-motion';

interface Mote {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  drift: number;
}

export function DustMotes() {
  const [mounted, setMounted] = useState(false);
  const liteMode = useLiteMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  const motes = useMemo(() => {
    if (!mounted) return [];
    const count = liteMode ? 10 : 25;
    return Array.from({ length: count }, (_, i): Mote => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 15 + Math.random() * 20,
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 100,
    }));
  }, [mounted, liteMode]);

  if (!mounted || liteMode) {
    // Render static motes for lite mode
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gold/20"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: 2,
              height: 2,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {motes.map((mote) => (
        <motion.div
          key={mote.id}
          className="absolute rounded-full"
          style={{
            left: `${mote.x}%`,
            width: mote.size,
            height: mote.size,
            backgroundColor: '#D4AF37',
          }}
          initial={{ 
            y: '110vh', 
            opacity: 0,
            x: 0,
          }}
          animate={{
            y: ['-10vh'],
            x: [0, mote.drift * 0.5, mote.drift, mote.drift * 0.5, 0],
            opacity: [0, mote.opacity, mote.opacity, mote.opacity, 0],
          }}
          transition={{
            duration: mote.duration,
            delay: mote.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
