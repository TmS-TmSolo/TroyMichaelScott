'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PageContent } from '@/lib/content-config';

interface PageSpreadProps {
  leftPage: PageContent | null;
  rightPage: PageContent | null;
  pageNumber: number;
  isVisible: boolean;
}

export function PageSpread({ leftPage, rightPage, pageNumber, isVisible }: PageSpreadProps) {
  return (
    <motion.div
      className="relative w-full max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Book spread container */}
      <div className="relative flex flex-col md:flex-row">
        {/* Center binding/crease */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-20 pointer-events-none">
          {/* Shadow in the crease */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(90deg, 
                  rgba(0, 0, 0, 0.15) 0%, 
                  rgba(0, 0, 0, 0.3) 40%,
                  rgba(0, 0, 0, 0.3) 60%,
                  rgba(0, 0, 0, 0.15) 100%)
              `,
            }}
          />
          {/* Highlight line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-library-paper/20 to-transparent" />
        </div>

        {/* Left Page */}
        <div className="relative flex-1 md:pr-4">
          <PageSingle 
            page={leftPage} 
            side="left" 
            pageNumber={pageNumber}
          />
        </div>

        {/* Right Page */}
        <div className="relative flex-1 md:pl-4 mt-4 md:mt-0">
          <PageSingle 
            page={rightPage} 
            side="right" 
            pageNumber={pageNumber + 1}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface PageSingleProps {
  page: PageContent | null;
  side: 'left' | 'right';
  pageNumber: number;
}

function PageSingle({ page, side, pageNumber }: PageSingleProps) {
  if (!page) {
    return (
      <div className="relative aspect-[3/4] paper-texture rounded-sm shadow-page flex items-center justify-center">
        <span className="text-library-ink-faded/30 font-serif italic">Blank Page</span>
      </div>
    );
  }

  return (
    <motion.div
      className="relative aspect-[3/4] paper-texture rounded-sm overflow-hidden"
      style={{
        boxShadow: side === 'left' 
          ? '-4px 0 15px rgba(0, 0, 0, 0.2), -2px 0 5px rgba(0, 0, 0, 0.1)'
          : '4px 0 15px rgba(0, 0, 0, 0.2), 2px 0 5px rgba(0, 0, 0, 0.1)',
      }}
      initial={{ opacity: 0, rotateY: side === 'left' ? 5 : -5 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6, delay: side === 'left' ? 0 : 0.1 }}
    >
      {/* Page edge effect */}
      <div 
        className={`absolute top-0 bottom-0 w-2 ${side === 'left' ? 'left-0' : 'right-0'}`}
        style={{
          background: side === 'left'
            ? 'linear-gradient(90deg, rgba(139, 119, 82, 0.15), transparent)'
            : 'linear-gradient(270deg, rgba(139, 119, 82, 0.15), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative h-full p-6 md:p-10 flex flex-col">
        {/* Page title */}
        {page.title && (
          <h3 
            className="font-display text-xl md:text-2xl text-library-ink mb-4 md:mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {page.title}
          </h3>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {page.image && (
            <div className="relative w-full aspect-[2/3] mb-6 rounded overflow-hidden shadow-md">
              <Image
                src={page.image}
                alt={page.imageAlt || page.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="library-text text-sm md:text-base leading-relaxed">
            {page.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'drop-cap' : 'mt-4'}>
                {paragraph}
              </p>
            ))}
          </div>

          {page.quote && (
            <blockquote className="mt-6 pl-4 border-l-2 border-gold/50 italic text-library-ink-faded">
              “{page.quote}”
              {page.quoteAttribution && (
                <footer className="mt-2 text-sm text-gold/70 not-italic">
                  — {page.quoteAttribution}
                </footer>
              )}
            </blockquote>
          )}
        </div>

        {/* Page number */}
        <div className="mt-4 text-center">
          <span className="font-serif text-xs text-library-ink-faded tracking-wider">
            — {pageNumber} —
          </span>
        </div>
      </div>

      {/* Corner curl effect */}
      {side === 'right' && (
        <div 
          className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, rgba(139, 119, 82, 0.1) 100%)',
          }}
        />
      )}
    </motion.div>
  );
}
