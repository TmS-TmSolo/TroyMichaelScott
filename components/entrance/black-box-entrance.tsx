'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEntranceState } from '@/hooks/use-entrance-state';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { siteContent } from '@/lib/content-config';
import { GoldEnergyCanvas } from './gold-energy-canvas';

interface BlackBoxEntranceProps {
  onComplete: () => void;
}

export function BlackBoxEntrance({ onComplete }: BlackBoxEntranceProps) {
  const { hasEntered, isAnimating, skipEntrance, startEntrance, setHasEntered, setIsAnimating } = useEntranceState();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<'idle' | 'opening' | 'burst' | 'travel' | 'arrive'>('idle');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      skipEntrance();
      onComplete();
    }
  }, [reducedMotion, skipEntrance, onComplete]);

  const handleEnter = useCallback(() => {
    startEntrance();
    setPhase('opening');
    
    // Sequence: opening -> burst -> travel -> arrive
    setTimeout(() => setPhase('burst'), 800);
    setTimeout(() => setPhase('travel'), 1600);
    setTimeout(() => {
      setPhase('arrive');
      setHasEntered(true);
      setIsAnimating(false);
      onComplete();
    }, 3000);
  }, [startEntrance, setHasEntered, setIsAnimating, onComplete]);

  const handleSkip = () => {
    skipEntrance();
    onComplete();
  };

  if (hasEntered && !isAnimating) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <AnimatePresence mode="wait">
        {/* Initial Black Box State */}
        {phase === 'idle' && (
          <motion.div
            key="idle"
            className="absolute inset-0 bg-black flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* The Black Box */}
            <motion.div
              className="relative w-[85vw] max-w-3xl aspect-[16/10] rounded-sm overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, #000 100%)',
                boxShadow: '0 0 80px rgba(0,0,0,0.9), inset 0 0 60px rgba(0,0,0,0.8)',
              }}
            >
              {/* Matte surface texture */}
              <div className="absolute inset-0 opacity-30 bg-noise" />
              
              {/* Subtle edge highlight */}
              <div className="absolute inset-0 border border-zinc-800/50" />
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
              
              {/* The Seam - Source of golden light */}
              <motion.div
                className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2"
                animate={{
                  boxShadow: isHovering 
                    ? [
                        '0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.3)',
                        '0 0 50px rgba(212,175,55,0.6), 0 0 100px rgba(212,175,55,0.4)',
                        '0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.3)',
                      ]
                    : '0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.2)'
                }}
                transition={{ duration: 1.5, repeat: isHovering ? Infinity : 0 }}
              >
                <div 
                  className="h-[2px] w-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.6) 20%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0.6) 80%, transparent 100%)',
                  }}
                />
              </motion.div>

              {/* Gold Energy Particles */}
              <GoldEnergyCanvas 
                isActive={true} 
                intensity={isHovering ? 1.5 : 0.8} 
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                <motion.h1
                  className="font-display text-2xl sm:text-3xl md:text-5xl text-library-paper/90 mb-12 tracking-wide leading-tight"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1.2 }}
                >
                  {siteContent.entrance.title}
                </motion.h1>

                <motion.button
                  className="relative px-16 py-5 border border-gold/40 text-gold font-serif text-lg tracking-[0.3em] uppercase
                             hover:border-gold hover:bg-gold/5 transition-all duration-500
                             focus:outline-none focus:ring-2 focus:ring-gold/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  onClick={handleEnter}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {siteContent.entrance.enterButton}
                  
                  {/* Pulsing border animation */}
                  <motion.span
                    className="absolute inset-0 border border-gold/20 pointer-events-none"
                    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.button>
              </div>
            </motion.div>

            {/* Skip button */}
            <motion.button
              className="fixed bottom-6 right-6 text-zinc-600 hover:text-gold font-serif text-sm tracking-wider transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={handleSkip}
            >
              {siteContent.entrance.skipButton}
            </motion.button>
          </motion.div>
        )}

        {/* Opening Phase - Box opens, light intensifies */}
        {phase === 'opening' && (
          <motion.div
            key="opening"
            className="absolute inset-0 bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
          >
            {/* Top half of box lifting */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-3xl h-[25vh] origin-top"
              initial={{ rotateX: 0, y: 'calc(50vh - 50%)' }}
              animate={{ rotateX: -90, y: 'calc(50vh - 100%)' }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              style={{
                background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
                transformStyle: 'preserve-3d',
              }}
            />
            
            {/* Bottom half staying */}
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-3xl h-[25vh]"
              initial={{ y: 'calc(-50vh + 50%)' }}
              animate={{ y: 'calc(-50vh + 100%)' }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              style={{
                background: 'linear-gradient(0deg, #1a1a1a 0%, #0d0d0d 100%)',
              }}
            />

            {/* Intensifying light from seam */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                background: 'radial-gradient(ellipse 80% 40% at center, rgba(212,175,55,0.4) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        )}

        {/* Burst Phase - Golden light explosion */}
        {phase === 'burst' && (
          <motion.div
            key="burst"
            className="absolute inset-0 bg-black"
            initial={{ opacity: 1 }}
          >
            {/* Central burst */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 5], opacity: [0, 1, 0.8] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                width: '100vmax',
                height: '100vmax',
                background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(212,175,55,0.3) 30%, transparent 60%)',
              }}
            />

            {/* Golden rays */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 h-[200vh] w-1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                  background: 'linear-gradient(to top, transparent 0%, rgba(212,175,55,0.8) 50%, transparent 100%)',
                }}
              />
            ))}

            {/* Particles burst */}
            <GoldEnergyCanvas isActive={true} intensity={3} />
          </motion.div>
        )}

        {/* Travel Phase - Flying through golden smoke/thoughts */}
        {phase === 'travel' && (
          <motion.div
            key="travel"
            className="absolute inset-0"
            style={{ perspective: '1000px' }}
          >
            {/* Tunnel effect */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 50%, black 100%)',
              }}
            />

            {/* Flying particles/thoughts */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                initial={{ 
                  x: '50vw', 
                  y: '50vh',
                  scale: 0.1,
                  opacity: 0 
                }}
                animate={{ 
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: [0.1, 1, 2],
                  opacity: [0, 0.8, 0]
                }}
                transition={{ 
                  duration: 1.4 - (i * 0.02),
                  delay: i * 0.03,
                  ease: 'easeOut'
                }}
                style={{
                  width: `${4 + Math.random() * 12}px`,
                  height: `${4 + Math.random() * 12}px`,
                  background: `radial-gradient(circle, rgba(212,175,55,${0.4 + Math.random() * 0.4}) 0%, transparent 70%)`,
                  filter: 'blur(1px)',
                }}
              />
            ))}

            {/* Thought words flying past */}
            {['consciousness', 'awareness', 'being', 'thought', 'mind', 'wonder'].map((word, i) => (
              <motion.span
                key={word}
                className="absolute font-serif text-gold/40 pointer-events-none"
                initial={{ 
                  x: '50vw', 
                  y: '50vh',
                  scale: 0.5,
                  opacity: 0 
                }}
                animate={{ 
                  x: `${20 + Math.random() * 60}vw`,
                  y: `${20 + Math.random() * 60}vh`,
                  scale: [0.5, 1.5, 3],
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.2 + i * 0.1,
                  ease: 'easeOut'
                }}
                style={{ fontSize: `${14 + Math.random() * 10}px` }}
              >
                {word}
              </motion.span>
            ))}

            {/* Central golden glow leading forward */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: [1, 10], opacity: [0.5, 0] }}
              transition={{ duration: 1.4, ease: 'easeIn' }}
              style={{
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />
          </motion.div>
        )}

        {/* Arrive Phase - Fade into library */}
        {phase === 'arrive' && (
          <motion.div
            key="arrive"
            className="absolute inset-0 bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            {/* Final golden shimmer */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, transparent 60%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
