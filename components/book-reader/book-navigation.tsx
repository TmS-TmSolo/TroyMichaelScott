'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function BookNavigation({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: BookNavigationProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
      {/* Previous button */}
      <motion.button
        className={`p-3 rounded-full border transition-all duration-300 ${
          canGoPrevious
            ? 'border-gold/50 text-gold hover:bg-gold/10 hover:border-gold'
            : 'border-zinc-700/50 text-zinc-700 cursor-not-allowed'
        }`}
        onClick={onPrevious}
        disabled={!canGoPrevious}
        whileHover={canGoPrevious ? { scale: 1.05 } : {}}
        whileTap={canGoPrevious ? { scale: 0.95 } : {}}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      {/* Page indicator */}
      <div className="px-4 py-2 bg-library-wood/80 backdrop-blur-sm border border-gold/20 rounded-full">
        <span className="font-serif text-sm text-library-paper/80">
          {currentPage} / {totalPages}
        </span>
      </div>

      {/* Next button */}
      <motion.button
        className={`p-3 rounded-full border transition-all duration-300 ${
          canGoNext
            ? 'border-gold/50 text-gold hover:bg-gold/10 hover:border-gold'
            : 'border-zinc-700/50 text-zinc-700 cursor-not-allowed'
        }`}
        onClick={onNext}
        disabled={!canGoNext}
        whileHover={canGoNext ? { scale: 1.05 } : {}}
        whileTap={canGoNext ? { scale: 0.95 } : {}}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

// Chapter progress indicator
export function ChapterProgress({ 
  chapters, 
  currentChapter 
}: { 
  chapters: { id: string; title: string }[]; 
  currentChapter: number;
}) {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3">
      {chapters.map((chapter, index) => (
        <div
          key={chapter.id}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            index === currentChapter
              ? 'bg-gold w-3 h-3 shadow-glow'
              : index < currentChapter
              ? 'bg-gold/50'
              : 'bg-zinc-700'
          }`}
          title={chapter.title}
        />
      ))}
    </div>
  );
}
