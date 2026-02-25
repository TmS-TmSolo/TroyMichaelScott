'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LibraryScene } from '@/components/library-scene';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { useEntranceState } from '@/lib/use-entrance-state';
import { siteContent } from '@/lib/content-config';
import { TransitionLink } from '@/components/transitions';
import { BookOpen, ExternalLink, Sparkles } from 'lucide-react';

export default function MyLibraryPage() {
  const { setHasEntered } = useEntranceState();
  const [showDoors, setShowDoors] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasEntered(true);
    
    // Door opening animation
    const timer = setTimeout(() => {
      setShowDoors(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [setHasEntered]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  const categories = [...new Set(siteContent.bookRecommendations.map(b => b.category))];

  return (
    <>
      {/* Library Doors Opening Animation */}
      <AnimatePresence>
        {showDoors && (
          <motion.div 
            className="fixed inset-0 z-50 flex overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Left Door */}
            <motion.div
              className="w-1/2 h-full relative"
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              style={{
                background: 'linear-gradient(90deg, #1a1410 0%, #0d0a08 100%)',
              }}
            >
              {/* Door panel */}
              <div className="absolute inset-0 border-r-4 border-gold/20" />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-3 h-20 bg-gold/40 rounded" />
              
              {/* Wood grain */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 60px, rgba(139,90,43,0.1) 60px, rgba(139,90,43,0.1) 62px)',
                }}
              />
              
              {/* Ornate panel */}
              <div className="absolute inset-8 border border-gold/10 rounded-sm" />
            </motion.div>
            
            {/* Right Door */}
            <motion.div
              className="w-1/2 h-full relative"
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              style={{
                background: 'linear-gradient(-90deg, #1a1410 0%, #0d0a08 100%)',
              }}
            >
              <div className="absolute inset-0 border-l-4 border-gold/20" />
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-3 h-20 bg-gold/40 rounded" />
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 60px, rgba(139,90,43,0.1) 60px, rgba(139,90,43,0.1) 62px)',
                }}
              />
              <div className="absolute inset-8 border border-gold/10 rounded-sm" />
            </motion.div>

            {/* Light from within */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0.5] }}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{
                background: 'radial-gradient(ellipse 60% 80% at center, rgba(212,175,55,0.15) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SiteHeader />
      
      <main className="relative min-h-screen">
        <LibraryScene>
          {/* Hero Section */}
          <section className="py-20 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: showDoors ? 1.5 : 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/40" />
                <Sparkles className="w-5 h-5 text-gold/60" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/40" />
              </div>

              <h1 
                className="font-display text-4xl md:text-5xl text-library-paper mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                My Library
              </h1>
              
              <p className="font-serif text-library-paper/60 italic mb-6">
                The books that have shaped my thinking
              </p>

              <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mb-8" />

              <p className="font-serif text-library-paper/70 leading-relaxed max-w-2xl mx-auto">
                These are the works that have fundamentally altered my understanding of consciousness, 
                reality, and what it means to be aware. Each one represents a doorway into deeper questioning.
              </p>
            </motion.div>
          </section>

          {/* Books by Category */}
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-16">
              {categories.map((category, catIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: catIndex * 0.1 }}
                >
                  <h2 
                    className="font-display text-2xl text-gold/80 mb-8 flex items-center gap-4"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    <span>{category}</span>
                    <div className="flex-1 h-px bg-gold/20" />
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {siteContent.bookRecommendations
                      .filter(book => book.category === category)
                      .map((book, bookIndex) => (
                        <BookCard key={book.id} book={book} index={bookIndex} />
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Back to Library */}
          <section className="py-20 px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
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
          </section>
        </LibraryScene>
      </main>

      <SiteFooter />
    </>
  );
}

interface BookCardProps {
  book: typeof siteContent.bookRecommendations[0];
  index: number;
}

function BookCard({ book, index }: BookCardProps) {
  return (
    <motion.article
      className="group relative p-6 border border-gold/10 rounded-sm bg-black/30 backdrop-blur-sm
                 hover:border-gold/30 hover:bg-black/40 transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Hover glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.03) 0%, transparent 70%)' }}
      />

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="text-gold/40 group-hover:text-gold/60 transition-colors">
            <BookOpen className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <h3 
              className="font-display text-xl text-library-paper group-hover:text-gold transition-colors duration-300 mb-1"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {book.title}
            </h3>
            <p className="font-serif text-gold/60 text-sm italic mb-3">
              by {book.author}
            </p>
            <p className="font-serif text-library-paper/60 text-sm leading-relaxed">
              {book.description}
            </p>

            {book.link && (
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-4 text-gold/50 hover:text-gold text-xs font-serif transition-colors"
              >
                View Book <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
