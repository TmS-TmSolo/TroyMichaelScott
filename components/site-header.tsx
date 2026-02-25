'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitionLink } from '@/components/transitions';
import { useEntranceState } from '@/lib/use-entrance-state';
import { Menu, X, BookOpen } from 'lucide-react';

const navLinks = [
  { href: '/chapters', label: 'Chapters', transition: 'book' as const },
  { href: '/my-library', label: 'My Library', transition: 'door' as const },
  { href: '/books', label: 'Books', transition: 'portal' as const },
  { href: '/about', label: 'About', transition: 'portal' as const },
  { href: '/contact', label: 'Contact', transition: 'portal' as const },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { hasEntered } = useEntranceState();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!hasEntered) return null;

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-gold/10' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <TransitionLink 
          href="/" 
          transition="portal"
          className="font-display text-lg text-library-paper hover:text-gold transition-colors"
        >
          <span style={{ fontFamily: 'Playfair Display, serif' }}>TMS</span>
        </TransitionLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <TransitionLink
                href={link.href}
                transition={link.transition}
                className="font-serif text-sm text-library-paper/70 hover:text-gold transition-colors tracking-wide"
              >
                {link.label}
              </TransitionLink>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gold text-library-ink font-serif text-sm
                         hover:bg-gold-light transition-all duration-300 rounded"
            >
              <BookOpen className="w-4 h-4" />
              Pre-Order
            </a>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-library-paper hover:text-gold transition-colors p-2"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full inset-x-0 bg-black/95 backdrop-blur-md border-b border-gold/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  transition={link.transition}
                  onClick={() => setIsOpen(false)}
                  className="block font-serif text-library-paper/80 hover:text-gold transition-colors py-2"
                >
                  {link.label}
                </TransitionLink>
              ))}
              <a
                href="#"
                className="block mt-4 py-3 text-center bg-gold text-library-ink font-serif rounded"
              >
                Pre-Order Book
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
