'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen } from 'lucide-react';

const navLinks = [
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/essays', label: 'Essays' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-library-wood/95 backdrop-blur-sm border-b border-gold/20 shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded border border-gold/40 flex items-center justify-center bg-library-wood-dark/50">
                <BookOpen className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h1 className="font-display text-lg text-library-paper tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Troy Michael Scott
                </h1>
                <p className="text-[10px] text-gold/60 tracking-[0.2em] uppercase">
                  Author
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative font-serif text-library-paper/80 hover:text-gold transition-colors duration-300 text-sm tracking-wide group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}

            {/* Pre-order CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/books/inner-physics-of-our-mind"
                className="btn-primary text-sm px-5 py-2.5 rounded"
              >
                Pre-Order Now
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-library-paper hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-library-wood border-b border-gold/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="px-6 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block font-serif text-library-paper/80 hover:text-gold transition-colors py-2 text-lg"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Link
                  href="/books/inner-physics-of-our-mind"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full text-center block"
                >
                  Pre-Order Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
