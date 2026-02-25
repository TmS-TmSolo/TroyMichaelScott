'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LibraryScene } from '@/components/library-scene';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { useEntranceState } from '@/lib/use-entrance-state';
import { TransitionLink } from '@/components/transitions';
import { ChapterHeading } from '@/components/library/chapter-heading';
import { Brain, Sparkles } from 'lucide-react';

export default function AboutPage() {
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
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 20], opacity: [0, 1, 0] }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Brain className="w-16 h-16 text-gold/60" />
            </motion.div>
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
                The Meditation Chamber
              </h1>
              
              <p className="font-serif text-gold/60 italic">
                About the Author
              </p>
            </motion.div>
          </section>

          {/* Biography */}
          <section className="py-12 px-4">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ChapterHeading 
                chapter="The Beginning"
                title="Troy Michael Scott"
                subtitle="A Non-Traditional Path"
                variant="light"
              />

              <div className="space-y-6 font-serif text-library-paper/80 leading-relaxed mt-8">
                <p className="text-lg first-letter:text-5xl first-letter:font-display first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                  I did not begin as an academic. The path that led to writing about consciousness 
                  wound through baseball diamonds, restaurant floors, and the relentless pace of 
                  high-end service — environments where performance, reaction time, and constant 
                  motion dominate daily life.
                </p>

                <p>
                  Over time, that environment sharpened a question rather than silencing it: 
                  <em className="text-gold/80">If everything is movement, information, and reaction — who is experiencing it?</em>
                </p>

                <p>
                  My intellectual path has been self-directed and obsessive. I studied neuroscience, 
                  quantum mechanics, AI systems, philosophy of mind, and consciousness research not 
                  as a hobby, but as an investigation.
                </p>

                <blockquote className="border-l-2 border-gold/40 pl-6 py-2 my-8 text-library-paper/60 italic">
                  "The deeper I went, the more I noticed something unsettling: The smartest people 
                  alive disagree about what you are."
                </blockquote>

                <p>
                  This realization became the seed for The Inner Physics Series — a five-volume 
                  exploration of consciousness, reality, truth, change, and being. The first volume, 
                  <em className="text-gold/80"> The Inner Physics of Our Mind</em>, examines why the 
                  explanatory gap between brain activity and lived experience may not be a temporary 
                  puzzle, but a structural limit of third-person explanation.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Try My Soul */}
          <section className="py-12 px-4">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ChapterHeading 
                chapter="The Platform"
                title="Try My Soul"
                subtitle="Modeling Careful Thinking"
                variant="light"
              />

              <div className="space-y-6 font-serif text-library-paper/80 leading-relaxed mt-8">
                <p>
                  Try My Soul is the umbrella platform for my writing, research, and media. 
                  Founded in the mid-2020s, its purpose is simple:
                </p>

                <p className="text-center text-gold/80 text-xl italic py-4">
                  To model careful thinking in an age of certainty inflation.
                </p>

                <p>
                  The platform focuses on consciousness, AI and human identity, cultural drift 
                  and truth-seeking, systems thinking, and intellectual humility without 
                  intellectual passivity.
                </p>

                <p>
                  Try My Soul is not motivational content. It is an investigation platform. 
                  We explore the boundaries of what we know and what we assume. We sit with 
                  difficult questions without rushing to premature conclusions.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Influences */}
          <section className="py-12 px-4">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ChapterHeading 
                chapter="The Foundation"
                title="Intellectual Influences"
                variant="light"
              />

              <div className="grid md:grid-cols-2 gap-4 mt-8">
                {[
                  'David Chalmers — Philosophy of Mind',
                  'Thomas Nagel — Subjective Experience', 
                  'Douglas Hofstadter — Strange Loops',
                  'Roger Penrose — Physics & Consciousness',
                  'Thomas Kuhn — Scientific Revolutions',
                  'Sam Harris — Meditation & Mind',
                ].map((influence, index) => (
                  <motion.div
                    key={influence}
                    className="p-4 border border-gold/10 rounded-sm bg-black/30"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <p className="font-serif text-library-paper/70 text-sm">{influence}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
