'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TransitionLink } from '@/components/transitions';
import { useEntranceState } from '@/lib/use-entrance-state';
import { siteContent } from '@/lib/content-config';

export function SiteFooter() {
  const { hasEntered } = useEntranceState();

  if (!hasEntered) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-gold/10 bg-black/50 backdrop-blur-sm">
      {/* Decorative top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TransitionLink 
              href="/" 
              transition="portal"
              className="font-display text-xl text-library-paper hover:text-gold transition-colors inline-block mb-4"
            >
              <span style={{ fontFamily: 'Playfair Display, serif' }}>Troy Michael Scott</span>
            </TransitionLink>
            <p className="font-serif text-library-paper/50 text-sm leading-relaxed">
              Exploring consciousness, technology, and the questions science quietly avoids.
            </p>
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="font-serif text-gold/60 text-sm tracking-widest uppercase mb-4">Explore</h4>
            <div className="space-y-2">
              <TransitionLink href="/chapters" transition="book" className="block font-serif text-library-paper/60 hover:text-gold transition-colors text-sm">
                Chapters
              </TransitionLink>
              <TransitionLink href="/my-library" transition="door" className="block font-serif text-library-paper/60 hover:text-gold transition-colors text-sm">
                My Library
              </TransitionLink>
              <TransitionLink href="/books" transition="portal" className="block font-serif text-library-paper/60 hover:text-gold transition-colors text-sm">
                Books
              </TransitionLink>
              <TransitionLink href="/about" transition="portal" className="block font-serif text-library-paper/60 hover:text-gold transition-colors text-sm">
                About
              </TransitionLink>
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="font-serif text-gold/60 text-sm tracking-widest uppercase mb-4">Connect</h4>
            <div className="space-y-2">
              <a 
                href="mailto:troy@trymysoul.com" 
                className="block font-serif text-library-paper/60 hover:text-gold transition-colors text-sm"
              >
                troy@trymysoul.com
              </a>
              <a 
                href="https://trymysoul.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block font-serif text-library-paper/60 hover:text-gold transition-colors text-sm"
              >
                Try My Soul →
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          className="pt-8 border-t border-gold/10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-serif text-library-paper/40 text-xs">
            © {currentYear} {siteContent.meta.author}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
