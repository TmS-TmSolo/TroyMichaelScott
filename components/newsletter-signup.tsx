'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle } from 'lucide-react';
import { siteContent } from '@/lib/content-config';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      className="relative p-10 md:p-12 paper-texture rounded-sm max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Parchment border — gold, slightly more visible */}
      <div className="absolute inset-0 border border-gold/35 rounded-sm" />
      {/* Corner filigree */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-gold/50" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-gold/50" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-gold/50" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-gold/50" />
      {/* Subtle inner glow */}
      <div className="absolute inset-0 rounded-sm" style={{ boxShadow: 'inset 0 0 40px rgba(212,175,55,0.04)' }} />

      <div className="relative z-10 text-center">
        {/* Ornamental rule */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        <h3
          className="font-display text-2xl text-library-ink mb-4"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {siteContent.newsletter.headline}
        </h3>
        <p className="font-serif text-library-ink-faded text-sm leading-relaxed mb-8 max-w-lg mx-auto">
          {siteContent.newsletter.description}
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-green-700 py-2">
            <Check className="w-5 h-5" />
            <span className="font-serif">You&apos;re on the list. Welcome.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={siteContent.newsletter.placeholder}
              className="flex-1 px-4 py-3 bg-library-paper-dark border border-gold/25 rounded-sm font-serif text-library-ink text-sm focus:border-gold/60 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-gold text-library-ink font-serif text-sm tracking-wide hover:bg-gold-light transition-all duration-300 rounded-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? (
                <span className="animate-pulse">...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {siteContent.newsletter.buttonText}
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span className="font-serif">Something went wrong. Please try again.</span>
          </div>
        )}

        <p className="mt-6 font-serif text-library-ink/35 text-xs tracking-wide">
          {siteContent.newsletter.footerNote}
        </p>
      </div>
    </motion.div>
  );
}
