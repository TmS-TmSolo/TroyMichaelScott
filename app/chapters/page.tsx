'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LibraryScene } from '@/components/library-scene';
import { BookReader } from '@/components/book-reader';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { useEntranceState } from '@/hooks/use-entrance-state';
import { siteContent } from '@/lib/content-config';
import { TransitionLink } from '@/components/transitions';

export default function ChaptersPage() {
  const { setHasEntered } = useEntranceState();
  const [showPageTurn, setShowPageTurn] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasEntered(true);
    
    // Page turn animation
    const timer = setTimeout(() => {
      setShowPageTurn(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, [setHasEntered]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Page Turn Entry Animation */}
      <AnimatePresence>
        {showPageTurn && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Page turning from right */}
            <motion.div
              className="absolute inset-0 origin-left"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -180 }}
              transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '2000px',
              }}
            >
              {/* Front of page */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #f5f0e6 0%, #e8dfd0 100%)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Paper texture */}
                <div className="absolute inset-0 opacity-30 bg-noise" />
                
                {/* Content hint */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-display text-3xl text-library-ink/80" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {siteContent.library.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Shadow during turn */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1 }}
              style={{
                background: 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 50%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SiteHeader />
      
      <main className="relative min-h-screen">
        <LibraryScene>
          {/* Header */}
          <motion.div
            className="text-center py-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: showPageTurn ? 1.2 : 0 }}
          >
            <h1 
              className="font-display text-3xl md:text-4xl text-library-paper mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              The Reading Room
            </h1>
            <p className="font-serif text-library-paper/60 italic">
              {siteContent.library.tagline}
            </p>
          </motion.div>

          {/* Book Reader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: showPageTurn ? 1.4 : 0.2 }}
          >
            <BookReader />
          </motion.div>

          {/* Back to Library */}
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: showPageTurn ? 1.8 : 0.5 }}
          >
            <TransitionLink
              href="/"
              transition="portal"
              className="inline-flex items-center gap-3 text-gold/60 hover:text-gold transition-colors font-serif"
            >
              <span>←</span>
              <span>Return to the Library</span>
            </TransitionLink>
          </motion.div>
        </LibraryScene>
      </main>

      <SiteFooter />
    </>
  );
}
