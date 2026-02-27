'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LibraryScene } from '@/components/library-scene';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { useEntranceState } from '@/hooks/use-entrance-state';
import { siteContent } from '@/lib/content-config';
import { TransitionLink } from '@/components/transitions';
import Image from 'next/image';
import { Sparkles, BookOpen, ExternalLink } from 'lucide-react';

export default function InnerPhysicsBookPage() {
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

  const { book } = siteContent;

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
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 20], opacity: [0, 1, 0] }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <BookOpen className="w-16 h-16 text-gold/60" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteHeader />
      
      <main className="relative min-h-screen">
        <LibraryScene>
          {/* Hero Section with Book */}
          <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Book Cover */}
                <motion.div
                  className="relative max-w-sm mx-auto"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: showEntry ? 1 : 0 }}
                >
                  <div className="relative aspect-[2/3]">
                    {/* Shadow */}
                    <div className="absolute inset-0 translate-x-4 translate-y-4 bg-black/50 blur-2xl rounded" />
                    
                    {/* Book */}
                    <motion.div
                      className="relative rounded overflow-hidden shadow-2xl"
                      style={{ transformStyle: 'preserve-3d' }}
                      whileHover={{ scale: 1.02, rotateY: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                        priority
                      />
                      
                      {/* Subtle glow */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/5 to-transparent" />
                    </motion.div>

                    {/* Pre-order badge */}
                    <motion.div
                      className="absolute -top-3 -right-3 bg-gold text-library-ink font-serif text-sm px-4 py-2 rounded shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: showEntry ? 1.5 : 0.5, type: 'spring' }}
                    >
                      Pre-Order Now
                    </motion.div>
                  </div>
                </motion.div>

                {/* Book Info */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: showEntry ? 1.2 : 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-px bg-gold/40" />
                    <Sparkles className="w-4 h-4 text-gold/60" />
                  </div>

                  <p className="text-gold/60 font-serif text-xs tracking-[0.2em] uppercase mb-3">
                    Volume I • The Inner Physics Series
                  </p>

                  <h1 
                    className="font-display text-3xl md:text-4xl text-library-paper mb-3"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {book.title}
                  </h1>

                  <p className="font-serif text-library-paper/60 italic mb-6">
                    {book.subtitle}
                  </p>

                  <p className="font-serif text-gold/70 text-sm mb-6">
                    by {book.author} • {book.releaseDate}
                  </p>

                  <blockquote className="border-l-2 border-gold/40 pl-4 mb-8">
                    <p className="font-serif text-library-paper/70 italic">
                      "{book.thesis}"
                    </p>
                  </blockquote>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={book.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-library-ink font-serif hover:bg-gold-light transition-all duration-300 rounded"
                    >
                      <BookOpen className="w-5 h-5" />
                      Pre-Order on Amazon
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <TransitionLink
                      href="/chapters"
                      transition="book"
                      className="inline-flex items-center gap-2 px-8 py-4 border border-gold/40 text-gold font-serif hover:bg-gold/10 transition-all duration-300 rounded"
                    >
                      Read Chapters
                    </TransitionLink>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Synopsis */}
          <section className="py-16 px-4">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="font-display text-2xl text-library-paper text-center mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Synopsis
              </h2>

              <div className="space-y-6 font-serif text-library-paper/80 leading-relaxed">
                <p className="text-lg first-letter:text-5xl first-letter:font-display first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                  {book.excerpt}
                </p>

                <p>
                  Across neuroscience, quantum physics, artificial intelligence, and philosophy, 
                  Scott traces a fracture at the heart of contemporary thought. The deeper we look, 
                  the clearer it becomes: every framework that begins by assuming matter is fundamental 
                  eventually runs into the same wall.
                </p>

                <p>
                  This is not a rejection of science. It is a demand that science follow its own 
                  evidence wherever it leads. Because if consciousness is not something the universe 
                  produces — but something more fundamental than we have dared to admit — then 
                  everything changes.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Who Is This For */}
          <section className="py-16 px-4">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="font-display text-2xl text-library-paper text-center mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Who Is This For?
              </h2>

              <div className="space-y-4">
                {[
                  'Readers frustrated by oversimplified takes on consciousness',
                  'Those curious why AI researchers and philosophers still disagree about minds',
                  'Anyone who has felt there is more to their experience than neurons firing',
                  'Seekers who want rigor without dismissing the depth of subjective experience',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 border border-gold/10 rounded-sm bg-black/30"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="text-gold">•</span>
                    <p className="font-serif text-library-paper/70">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Newsletter */}
          <section className="py-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <NewsletterSignup />
            </motion.div>
          </section>

          {/* Back */}
          <section className="py-12 px-4 text-center">
            <TransitionLink
              href="/books"
              transition="portal"
              className="inline-flex items-center gap-3 text-gold/60 hover:text-gold transition-colors font-serif"
            >
              <span>←</span>
              <span>Back to The Study</span>
            </TransitionLink>
          </section>
        </LibraryScene>
      </main>

      <SiteFooter />
    </>
  );
}
