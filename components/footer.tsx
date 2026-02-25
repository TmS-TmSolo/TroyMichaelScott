'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-library-wood-dark border-t border-gold/20">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded border border-gold/40 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-display text-library-paper tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Troy Michael Scott
                </h3>
              </div>
            </div>
            <p className="font-serif text-library-paper/60 text-sm leading-relaxed">
              Exploring consciousness, technology, and the questions
              that shape our understanding of reality.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-gold/80 font-serif text-sm tracking-[0.15em] uppercase">
              Explore
            </h4>
            <nav className="space-y-3">
              {[
                { href: '/books', label: 'Books' },
                { href: '/about', label: 'About' },
                { href: '/essays', label: 'Essays' },
                { href: '/speaking', label: 'Speaking' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-serif text-library-paper/60 hover:text-gold transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-gold/80 font-serif text-sm tracking-[0.15em] uppercase">
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@trymysoul.com"
                className="flex items-center gap-2 font-serif text-library-paper/60 hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                contact@trymysoul.com
              </a>
              <a
                href="https://trymysoul.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-serif text-library-paper/60 hover:text-gold transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Try My Soul
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-serif text-library-paper/40 text-xs">
            © {new Date().getFullYear()} Troy Michael Scott. All rights reserved.
          </p>
          <p className="font-serif text-library-paper/30 text-xs italic">
            “The most important mystery is not out there — it is the fact that you are aware of it.”
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
