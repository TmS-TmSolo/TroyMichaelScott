'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEntranceState } from '@/hooks/use-entrance-state';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { siteContent } from '@/lib/content-config';

interface BlackBoxEntranceProps {
  onComplete: () => void;
}

type Phase = 'idle' | 'opening' | 'dissolve';

// Weighted ease for heavy library doors — slow start, flows open, settles
const DOOR_EASE = [0.16, 1, 0.3, 1] as const;
const DOOR_DURATION = 2.2;

export function BlackBoxEntrance({ onComplete }: BlackBoxEntranceProps) {
  const { hasEntered, isAnimating, skipEntrance, startEntrance, setHasEntered, setIsAnimating } =
    useEntranceState();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');

  const leftDoor  = useAnimation();
  const rightDoor = useAnimation();
  const warmLight = useAnimation();
  const fadeOut   = useAnimation();

  useEffect(() => {
    if (reducedMotion) {
      skipEntrance();
      onComplete();
    }
  }, [reducedMotion, skipEntrance, onComplete]);

  const handleEnter = useCallback(async () => {
    startEntrance();
    setPhase('opening');

    // Warm candlelight bleeds in as the doors begin to move
    warmLight.start({
      opacity: [0, 0.7, 0.9],
      transition: { duration: DOOR_DURATION + 0.4, ease: 'easeIn' },
    });

    // Doors part — heavy, deliberate, inevitable
    await Promise.all([
      leftDoor.start({
        x: '-100%',
        transition: { duration: DOOR_DURATION, ease: DOOR_EASE },
      }),
      rightDoor.start({
        x: '100%',
        transition: { duration: DOOR_DURATION, ease: DOOR_EASE },
      }),
    ]);

    // A moment of stillness — doors fully open, light holds
    await new Promise<void>((r) => setTimeout(r, 300));

    // Dissolve to black
    setPhase('dissolve');
    await fadeOut.start({
      opacity: 1,
      transition: { duration: 1.3, ease: 'easeInOut' },
    });

    setHasEntered(true);
    setIsAnimating(false);
    onComplete();
  }, [startEntrance, setHasEntered, setIsAnimating, onComplete, leftDoor, rightDoor, warmLight, fadeOut]);

  const handleSkip = useCallback(() => {
    skipEntrance();
    onComplete();
  }, [skipEntrance, onComplete]);

  if (hasEntered && !isAnimating) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">

      {/* ── Warm candlelight — revealed as doors part ─────────────────────── */}
      <motion.div
        animate={warmLight}
        initial={{ opacity: 0 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 52%, rgba(170,110,25,0.38) 0%, rgba(110,65,10,0.18) 45%, transparent 72%)',
        }}
      />

      {/* ── Left door ─────────────────────────────────────────────────────── */}
      <motion.div
        animate={leftDoor}
        className="absolute inset-y-0 left-0 w-1/2"
        style={{
          background: 'linear-gradient(90deg, #080808 0%, #101010 55%, #151515 100%)',
        }}
      >
        {/* Inner edge — barely-lit bevel where the door meets the seam */}
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-zinc-700/25 to-transparent" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent" />
      </motion.div>

      {/* ── Right door ────────────────────────────────────────────────────── */}
      <motion.div
        animate={rightDoor}
        className="absolute inset-y-0 right-0 w-1/2"
        style={{
          background: 'linear-gradient(270deg, #080808 0%, #101010 55%, #151515 100%)',
        }}
      >
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-zinc-700/25 to-transparent" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent" />
      </motion.div>

      {/* ── Center seam — vertical gold thread ────────────────────────────── */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.div
            key="seam"
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px pointer-events-none"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {/* The thread itself */}
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.25) 20%, rgba(212,175,55,0.55) 50%, rgba(212,175,55,0.25) 80%, transparent 100%)',
              }}
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Door-pull dot at center */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full"
              style={{
                background: 'rgba(212,175,55,0.45)',
                boxShadow: '0 0 8px rgba(212,175,55,0.3)',
              }}
              animate={{ opacity: [0.45, 0.85, 0.45] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Idle content — title, Enter, glow halo ────────────────────────── */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.div
            key="content"
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none"
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
          >
            <div className="flex flex-col items-center gap-[18px]">

              {/* Author name — small, quiet */}
              <motion.p
                className="font-serif text-zinc-500 text-[10px] tracking-[0.55em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1.8, ease: 'easeOut' }}
              >
                Troy Michael Scott
              </motion.p>

              {/* Entrance title */}
              <motion.h1
                className="font-display text-xl sm:text-2xl md:text-[1.75rem] text-library-paper/70 tracking-wide leading-snug max-w-[280px] sm:max-w-sm"
                style={{ fontFamily: 'Playfair Display, serif' }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 2, ease: 'easeOut' }}
              >
                {siteContent.entrance.title}
              </motion.h1>

              {/* Thin rule — like a page divider */}
              <motion.div
                className="w-7 h-px bg-gold/35"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 2.1, duration: 0.9, ease: 'easeOut' }}
              />

              {/* Enter button */}
              <motion.button
                className="
                  pointer-events-auto
                  mt-1 px-10 py-[10px]
                  border border-gold/20
                  text-gold/60 font-serif text-[11px] tracking-[0.45em] uppercase
                  hover:border-gold/45 hover:text-gold/90 hover:bg-gold/[0.04]
                  transition-all duration-700
                  focus:outline-none focus:ring-1 focus:ring-gold/20
                "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 1.2, ease: 'easeOut' }}
                onClick={handleEnter}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
              >
                {siteContent.entrance.enterButton}
              </motion.button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Skip Intro ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === 'idle' && (
          <motion.button
            key="skip"
            className="fixed bottom-6 right-6 font-serif text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors duration-500 tracking-[0.35em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ delay: 3.2, duration: 1, ease: 'easeOut' }}
            onClick={handleSkip}
          >
            {siteContent.entrance.skipButton}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Final dissolve overlay — fades to black ───────────────────────── */}
      <motion.div
        animate={fadeOut}
        initial={{ opacity: 0 }}
        className="absolute inset-0 bg-black pointer-events-none"
      />

    </div>
  );
}
