'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

interface PageTurnContainerProps {
  children: React.ReactNode[];
  className?: string;
}

export function PageTurnContainer({ children, className = '' }: PageTurnContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const totalPages = children.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring for smooth animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate current page based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const newPage = Math.min(
        Math.floor(latest * totalPages),
        totalPages - 1
      );
      if (newPage !== currentPage && !isAnimating) {
        setIsAnimating(true);
        setCurrentPage(newPage);
        setTimeout(() => setIsAnimating(false), 800);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, currentPage, totalPages, isAnimating]);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0 && currentPage < totalPages - 1) {
      // Swipe left - next page
      setIsAnimating(true);
      setCurrentPage((prev) => prev + 1);
      setTimeout(() => setIsAnimating(false), 800);
    } else if (distance < 0 && currentPage > 0) {
      // Swipe right - previous page
      setIsAnimating(true);
      setCurrentPage((prev) => prev - 1);
      setTimeout(() => setIsAnimating(false), 800);
    }
  }, [touchStart, touchEnd, currentPage, totalPages]);

  // Page turn variants
  const pageVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1],
      },
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.6,
        ease: [0.645, 0.045, 0.355, 1],
      },
    }),
  };

  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const newDirection = currentPage > page ? 1 : -1;
    setPage([currentPage, newDirection]);
  }, [currentPage]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: '2000px' }}
    >
      {/* Book binding spine effect */}
      <div className="fixed left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-50 pointer-events-none hidden lg:block">
        <div className="w-full h-full book-spine" />
      </div>

      {/* Page indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentPage(index);
                setTimeout(() => setIsAnimating(false), 800);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentPage === index
                ? 'bg-gold w-3 h-3 shadow-glow'
                : 'bg-gold/30 hover:bg-gold/60'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      {/* Pages */}
      <div className="relative min-h-screen" style={{ transformStyle: 'preserve-3d' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Page curl shadow */}
            <div
              className="absolute inset-y-0 right-0 w-16 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to left, rgba(0,0,0,0.1), transparent)',
              }}
            />
            {children[currentPage]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scroll height spacer for scroll-based navigation */}
      <div style={{ height: `${(totalPages - 1) * 100}vh` }} />
    </div>
  );
}
