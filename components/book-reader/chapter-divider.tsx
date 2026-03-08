'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Chapter } from '@/lib/content-config';

interface ChapterDividerProps {
  chapter: Chapter;
  isVisible: boolean;
}

export function ChapterDivider({ chapter, isVisible }: ChapterDividerProps) {
  return (
    <motion.div
      className="relative w-full max-w-5xl mx-auto py-20 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Paper texture background */}
      <div className="absolute inset-0 paper-texture rounded-sm shadow-book" />

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        {/* Ornamental top */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <span className="text-gold text-2xl">❧</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Chapter number */}
        <motion.p
          className="font-serif text-sm tracking-[0.4em] uppercase text-gold/70 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {chapter.number === 0 ? '' : `Chapter ${chapter.number}`}
        </motion.p>

        {/* Chapter title */}
        <motion.h2
          className="font-display text-4xl md:text-5xl text-library-ink mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {chapter.title}
        </motion.h2>

        {/* Subtitle */}
        {chapter.subtitle && (
          <motion.p
            className="font-serif text-xl text-library-ink-faded italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {chapter.subtitle}
          </motion.p>
        )}

        {/* Ornamental bottom */}
        <motion.div
          className="mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isVisible ? 1 : 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto" />
        </motion.div>
      </div>
    </motion.div>
  );
}
