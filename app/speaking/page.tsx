'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LibraryScene } from '@/components/library-scene';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { useEntranceState } from '@/lib/use-entrance-state';
import { TransitionLink } from '@/components/transitions';
import { Sparkles, Brain, Cpu, Scale, Atom, Mail, Mic } from 'lucide-react';

const topics = [
  { icon: <Brain className="w-6 h-6" />, title: 'Consciousness', description: 'The hard problem and why subjective experience defies scientific explanation.' },
  { icon: <Cpu className="w-6 h-6" />, title: 'AI & Human Identity', description: 'What artificial minds reveal about what we are — and what we are not.' },
  { icon: <Scale className="w-6 h-6" />, title: 'Epistemology', description: 'How we know what we know in an age of information overload.' },
  { icon: <Atom className="w-6 h-6" />, title: 'Materialism', description: 'The limits of physicalist worldviews and alternative frameworks.' },
];

export default function SpeakingPage() {
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
              <Mic className="w-16 h-16 text-gold/60" />
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
                The Archives
              </h1>
              
              <p className="font-serif text-gold/60 italic">
                Speaking & Media
              </p>
            </motion.div>
          </section>

          {/* Topics */}
          <section className="py-12 px-4">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="font-display text-2xl text-library-paper text-center mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Areas of Discussion
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {topics.map((topic, index) => (
                  <motion.div
                    key={topic.title}
                    className="p-6 border border-gold/10 rounded-sm bg-black/30 hover:border-gold/30 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-gold/50 mb-3">{topic.icon}</div>
                    <h3 className="font-display text-xl text-library-paper mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {topic.title}
                    </h3>
                    <p className="font-serif text-library-paper/60 text-sm">
                      {topic.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Podcast */}
          <section className="py-12 px-4">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="font-display text-2xl text-library-paper mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Podcast Appearances
              </h2>
              
              <div className="p-8 border border-gold/20 rounded-sm bg-black/40">
                <p className="text-gold/60 font-serif text-sm tracking-[0.2em] uppercase mb-4">
                  Coming Soon
                </p>
                <p className="font-serif text-library-paper/70 leading-relaxed">
                  Selected podcast appearances and interviews will be featured here as they become available.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Contact for Speaking */}
          <section className="py-12 px-4">
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="p-8 border border-gold/20 rounded-sm bg-black/40 text-center">
                <h3 
                  className="font-display text-xl text-library-paper mb-4"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Speaking Inquiries
                </h3>
                <p className="font-serif text-library-paper/70 text-sm mb-6">
                  For podcast appearances, conferences, or speaking engagements, please reach out directly.
                </p>
                <a 
                  href="mailto:troy@trymysoul.com"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gold/40 text-gold hover:bg-gold/10 transition-all font-serif text-sm rounded"
                >
                  <Mail className="w-4 h-4" />
                  troy@trymysoul.com
                </a>
              </div>
            </motion.div>
          </section>

          {/* Back */}
          <section className="py-12 px-4 text-center">
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
