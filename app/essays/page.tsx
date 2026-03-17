'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LibraryScene } from '@/components/library-scene';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { useEntranceState } from '@/hooks/use-entrance-state';
import { TransitionLink } from '@/components/transitions';
import { Sparkles, Brain, Cpu, Search, GraduationCap, Zap } from 'lucide-react';
import { getAllEssays } from '@/lib/essays';

const themes = [
  { icon: <Brain className="w-6 h-6" />, title: 'Consciousness', description: 'The hard problem and why experience defies explanation.' },
  { icon: <Cpu className="w-6 h-6" />, title: 'Technology & AI', description: 'What artificial minds reveal about natural ones.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Systems & Emergence', description: 'Patterns that arise from complexity.' },
  { icon: <Search className="w-6 h-6" />, title: 'Truth & Discernment', description: 'Navigating certainty in an uncertain world.' },
  { icon: <GraduationCap className="w-6 h-6" />, title: 'Education', description: 'Learning how to think, not what to think.' },
];

export default function EssaysPage() {
  const { setHasEntered } = useEntranceState();
  const [showEntry, setShowEntry] = useState(true);
  const [mounted, setMounted] = useState(false);
  const essays = getAllEssays();

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
              className="w-24 h-24"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 15], opacity: [0, 1, 0] }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.5) 0%, transparent 70%)',
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
                The Writing Desk
              </h1>
              
              <p className="font-serif text-gold/60 italic">
                Essays & Explorations
              </p>
            </motion.div>
          </section>

          {/* Essay Listing */}
          <section className="py-12 px-4">
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-px">
                {essays.map((essay, index) => (
                  <motion.div
                    key={essay.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <TransitionLink
                      href={`/essays/${essay.slug}`}
                      transition="portal"
                      className="group block py-8 border-b border-gold/10 hover:border-gold/25 transition-colors duration-300"
                    >
                      <p className="text-gold/40 font-serif text-xs tracking-[0.2em] uppercase mb-3">
                        {essay.category} · {essay.date}
                      </p>
                      <h2
                        className="text-library-paper text-xl md:text-2xl leading-snug mb-3
                          group-hover:text-gold transition-colors duration-300"
                        style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}
                      >
                        {essay.title}
                      </h2>
                      <p className="font-serif text-library-paper/50 text-sm leading-relaxed mb-4">
                        {essay.excerpt}
                      </p>
                      <span className="text-gold/50 group-hover:text-gold font-serif text-sm
                        transition-colors duration-300">
                        Read →
                      </span>
                    </TransitionLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Themes */}
          <section className="py-12 px-4">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 
                className="font-display text-2xl text-library-paper text-center mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Themes to Explore
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map((theme, index) => (
                  <motion.div
                    key={theme.title}
                    className="p-5 border border-gold/10 rounded-sm bg-black/30 hover:border-gold/30 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-gold/50 mb-3">{theme.icon}</div>
                    <h3 className="font-display text-lg text-library-paper mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {theme.title}
                    </h3>
                    <p className="font-serif text-library-paper/60 text-sm">
                      {theme.description}
                    </p>
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
