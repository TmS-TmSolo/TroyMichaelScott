'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChapterHeadingProps {
  chapter?: string;
  title: string;
  subtitle?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

export function ChapterHeading({
  chapter,
  title,
  subtitle,
  className = '',
  variant = 'light',
}: ChapterHeadingProps) {
  const titleColor = variant === 'light' ? 'text-library-paper' : 'text-library-ink';
  const subtitleColor = variant === 'light' ? 'text-library-paper/70' : 'text-library-ink-faded';

  return (
    <motion.div
      className={`text-center mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {chapter && (
        <motion.p
          className="text-gold/70 font-serif text-sm tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {chapter}
        </motion.p>
      )}

      <motion.h1
        className={`font-display text-4xl md:text-5xl lg:text-6xl ${titleColor} mb-6`}
        style={{ fontFamily: 'Playfair Display, serif' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          className={`font-serif text-xl ${subtitleColor} italic max-w-2xl mx-auto`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative line */}
      <motion.div
        className="mt-8 flex items-center justify-center"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      </motion.div>
    </motion.div>
  );
}
