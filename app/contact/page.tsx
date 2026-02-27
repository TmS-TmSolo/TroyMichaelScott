'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LibraryScene } from '@/components/library-scene';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { useEntranceState } from '@/hooks/use-entrance-state';
import { TransitionLink } from '@/components/transitions';
import { ContactForm } from '@/components/contact-form';
import { Sparkles, Mail, ExternalLink } from 'lucide-react';

export default function ContactPage() {
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
              <Mail className="w-16 h-16 text-gold/60" />
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
                Contact
              </h1>
              
              <p className="font-serif text-library-paper/60 italic">
                Begin a conversation
              </p>
            </motion.div>
          </section>

          {/* Contact Content */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Direct Contact */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 
                  className="font-display text-2xl text-library-paper mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Direct Contact
                </h2>

                <div className="space-y-6">
                  <div className="p-4 border border-gold/10 rounded-sm bg-black/30">
                    <p className="text-gold/60 font-serif text-xs tracking-widest uppercase mb-2">Email</p>
                    <a 
                      href="mailto:troy@trymysoul.com"
                      className="font-serif text-library-paper hover:text-gold transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      troy@trymysoul.com
                    </a>
                  </div>

                  <div className="p-4 border border-gold/10 rounded-sm bg-black/30">
                    <p className="text-gold/60 font-serif text-xs tracking-widest uppercase mb-2">Platform</p>
                    <a 
                      href="https://trymysoul.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif text-library-paper hover:text-gold transition-colors flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Try My Soul
                    </a>
                  </div>
                </div>

                <div className="mt-8 p-6 border border-gold/10 rounded-sm bg-black/30">
                  <p className="font-serif text-library-paper/60 text-sm leading-relaxed italic">
                    "I value thoughtful correspondence. If you have questions about consciousness, 
                    the book, or simply want to share your own investigations — I read every message."
                  </p>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 
                  className="font-display text-2xl text-library-paper mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Send a Message
                </h2>
                
                <ContactForm />
              </motion.div>
            </div>
          </section>

          {/* Quote */}
          <section className="py-16 px-4">
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <blockquote className="font-serif text-library-paper/60 italic text-lg">
                "The most important conversations begin with the courage to ask a question."
              </blockquote>
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
