'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent, Chapter, PageContent } from '@/lib/content-config';
import { useLiteMode } from '@/hooks/use-reduced-motion';
import { PageSpread } from './page-spread';
import { ChapterDivider } from './chapter-divider';
import { BookNavigation, ChapterProgress } from './book-navigation';

type BookItem = 
  | { type: 'chapter'; chapter: Chapter }
  | { type: 'spread'; leftPage: PageContent | null; rightPage: PageContent | null };

export function BookReader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const liteMode = useLiteMode();

  // Build flat list of book items (chapter dividers + page spreads)
  const bookItems = useMemo((): BookItem[] => {
    const items: BookItem[] = [];
    
    siteContent.chapters.forEach((chapter) => {
      // Add chapter divider
      items.push({ type: 'chapter', chapter });
      
      // Add page spreads (2 pages per spread)
      for (let i = 0; i < chapter.pages.length; i += 2) {
        items.push({
          type: 'spread',
          leftPage: chapter.pages[i] || null,
          rightPage: chapter.pages[i + 1] || null,
        });
      }
    });
    
    return items;
  }, []);

  const totalItems = bookItems.length;

  // Calculate current chapter for progress indicator
  const currentChapter = useMemo(() => {
    let chapterIndex = 0;
    for (let i = 0; i <= currentIndex && i < bookItems.length; i++) {
      if (bookItems[i].type === 'chapter') {
        chapterIndex = siteContent.chapters.findIndex(
          (c) => c.id === (bookItems[i] as { type: 'chapter'; chapter: Chapter }).chapter.id
        );
      }
    }
    return chapterIndex;
  }, [currentIndex, bookItems]);

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalItems - 1));
  }, [totalItems]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  // Scroll-based navigation (snap points)
  useEffect(() => {
    if (liteMode) return;

    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    const handleScroll = () => {
      if (isScrolling) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        
        if (Math.abs(delta) > 100) {
          isScrolling = true;
          if (delta > 0) {
            goToNext();
          } else {
            goToPrevious();
          }
          lastScrollY = currentScrollY;
          setTimeout(() => { isScrolling = false; }, 500);
        }
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [goToNext, goToPrevious, liteMode]);

  const currentItem = bookItems[currentIndex];
  const pageNumber = useMemo(() => {
    let count = 0;
    for (let i = 0; i < currentIndex; i++) {
      if (bookItems[i].type === 'spread') {
        count += 2;
      }
    }
    return count + 1;
  }, [currentIndex, bookItems]);

  return (
    <div className="relative min-h-screen">
      {/* Chapter progress */}
      <ChapterProgress
        chapters={siteContent.chapters.map((c) => ({ id: c.id, title: c.title }))}
        currentChapter={currentChapter}
      />

      {/* Main content area */}
      <div className="py-8">
        <AnimatePresence mode="wait">
          {currentItem.type === 'chapter' ? (
            <motion.div
              key={`chapter-${currentItem.chapter.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <ChapterDivider chapter={currentItem.chapter} isVisible={true} />
            </motion.div>
          ) : (
            <motion.div
              key={`spread-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <PageSpread
                leftPage={currentItem.leftPage}
                rightPage={currentItem.rightPage}
                pageNumber={pageNumber}
                isVisible={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      <BookNavigation
        currentPage={currentIndex + 1}
        totalPages={totalItems}
        onPrevious={goToPrevious}
        onNext={goToNext}
        canGoPrevious={currentIndex > 0}
        canGoNext={currentIndex < totalItems - 1}
      />
    </div>
  );
}
