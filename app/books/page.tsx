'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LibraryScene } from '@/components/library-scene';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { useEntranceState } from '@/lib/use-entrance-state';
import { TransitionLink } from '@/components/transitions';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const books = [
  {
    volume: 1,
    title: 'The Inner Physics of Our Mind',
    subtitle: 'Why the Most Certain Thing You Know Has No Scientific Explanation',
    description: 'The foundational volume exploring the hard problem of consciousness and why the explanatory gap may be a structural limit of third-person explanation.',
    status: 'pre-order',
    cover: '/images/book-cover.png',
    link: '/books/inner-physics-of-our-mind',
  },
  {
    volume: 2,
    title: 'The Inner Physics of Reality',
    subtitle: 'What Physics Actually Tells Us About the Nature of Existence',
    description: 'Examining how quantum mechanics, relativity, and cosmology challenge our assumptions about the fundamental nature of reality.',
    status: 'coming-soon',
  },
  {
    volume: 3,
    title: 'The Inner Physics of Truth',
    subtitle: 'Epistemology in an Age of Certainty Inflation',
    description: 'A deep investigation into how we know what we know, and why intellectual humility is more important than ever.',
    status: 'future',
  },
  {
    volume: 4,
    title: 'The Inner Physics of Change',
    subtitle: 'Systems, Emergence, and the Architecture of Transformation',
    description: 'Understanding how complex systems evolve and why real change requires understanding the patterns beneath the surface.',
    status: 'future',
  },
  {
    volume: 5,
    title: 'The Inner Physics of Being',
    subtitle: 'Integration and the Living Question',
    description: 'The culmination of the series, weaving together consciousness, reality, truth, and change into a coherent framework for being.',
    status: 'future',
  },
];

export default function BooksPage() {
  const { setHasEntered } = useEntranceState();
  const [showEntry, setShowEntry] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHasEntered(true);
    
    const timer = setTimeout(() => setShowEntry(false), 1000);
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
      {/* Entry Animation */}
      <AnimatePresence>
        {showEntry && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-32 h-32 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 30], opacity: [0, 1, 0] }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SiteHeader />
      
      <main className="relative min-h-screen">
        <LibraryScene>
          {/* Hero */}
          <section className="py-20 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: showEntry ? 1 : 0 }}
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
                The Study
              </h1>
              
              <p className="font-serif text-gold/60 italic mb-6">
                The Inner Physics Series
              </p>

              <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mb-8" />

              <p className="font-serif text-library-paper/70 leading-relaxed">
                A five-volume exploration beginning with consciousness and expanding outward 
                to reality, truth, transformation, and being.
              </p>
            </motion.div>
          </section>

          {/* Books Grid */}
          <section className="py-12 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
              {books.map((book, index) => (
                <motion.article
                  key={book.volume}
                  className="relative group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className={`relative p-6 md:p-8 border rounded-sm transition-all duration-500 ${
                    book.status === 'pre-order' 
                      ? 'border-gold/30 bg-black/40' 
                      : 'border-gold/10 bg-black/30'
                  } hover:border-gold/40 hover:bg-black/50`}>
                    
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                      {/* Book Cover or Placeholder */}
                      <div className="relative w-32 h-48 flex-shrink-0 mx-auto md:mx-0">
                        {book.cover ? (
                          <div className="relative w-full h-full rounded overflow-hidden shadow-book">
                            <Image
                              src={book.cover}
                              alt={book.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full rounded border border-gold/20 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                            <span className="font-display text-4xl text-gold/30">{book.volume}</span>
                          </div>
                        )}
                        
                        {/* Status badge */}
                        {book.status === 'pre-order' && (
                          <div className="absolute -top-2 -right-2 bg-gold text-library-ink text-xs font-serif px-2 py-1 rounded">
                            Pre-Order
                          </div>
                        )}
                        {book.status === 'coming-soon' && (
                          <div className="absolute -top-2 -right-2 bg-zinc-700 text-library-paper text-xs font-serif px-2 py-1 rounded">
                            Coming Soon
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-gold/50 font-serif text-xs tracking-[0.2em] uppercase mb-2">
                          Volume {book.volume}
                        </p>
                        <h2 
                          className="font-display text-2xl text-library-paper mb-2 group-hover:text-gold transition-colors"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {book.title}
                        </h2>
                        <p className="font-serif text-library-paper/60 italic text-sm mb-4">
                          {book.subtitle}
                        </p>
                        <p className="font-serif text-library-paper/70 text-sm leading-relaxed mb-4">
                          {book.description}
                        </p>

                        {book.link && (
                          <TransitionLink
                            href={book.link}
                            transition="portal"
                            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-serif text-sm"
                          >
                            Learn More →
                          </TransitionLink>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Back */}
          <section className="py-20 px-4 text-center">
            <TransitionLink
              href="/"
              transition="portal"
              className="inline-flex items-center gap-3 text-gold/60 hover:text-gold transition-colors font-serif"
            >
              <span>←</span>
              <span>Return to the Library</span>
            </TransitionLink>
          </section>
        </LibraryScene>
      </main>

      <SiteFooter />
    </>
  );
}
