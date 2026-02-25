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
      className="relative p-8 paper-texture rounded-sm max-w-xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Ornate border */}
      <div className="absolute inset-0 border border-gold/20 rounded-sm" />
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold/40" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold/40" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold/40" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold/40" />

      <div className="relative z-10 text-center">
        <h3 
          className="font-display text-xl text-library-ink mb-3"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {siteContent.newsletter.headline}
        </h3>
        <p className="font-serif text-library-ink-faded text-sm mb-6">
          {siteContent.newsletter.description}
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-green-700">
            <Check className="w-5 h-5" />
            <span className="font-serif">You&apos;re on the list. Welcome.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={siteContent.newsletter.placeholder}
              className="flex-1 px-4 py-3 bg-library-paper-dark border border-gold/20 rounded-sm font-serif text-library-ink text-sm focus:border-gold focus:outline-none transition-colors"
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
      </div>
    </motion.div>
  );
}
