'use client';

import React, { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-700/50 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h4 className="font-display text-xl text-library-ink mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          Message Sent
        </h4>
        <p className="font-serif text-library-ink-faded text-sm">
          Thank you for reaching out. I\'ll respond as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-serif text-library-ink text-sm mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-library-paper-dark border border-gold/20 rounded font-serif text-library-ink focus:border-gold focus:outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-serif text-library-ink text-sm mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-library-paper-dark border border-gold/20 rounded font-serif text-library-ink focus:border-gold focus:outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block font-serif text-library-ink text-sm mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 bg-library-paper-dark border border-gold/20 rounded font-serif text-library-ink focus:border-gold focus:outline-none transition-colors"
          placeholder="What is this regarding?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-serif text-library-ink text-sm mb-1">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-library-paper-dark border border-gold/20 rounded font-serif text-library-ink focus:border-gold focus:outline-none transition-colors resize-none"
          placeholder="Your message..."
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-700/30 rounded">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="font-serif text-red-400 text-sm">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <span className="animate-pulse">Sending...</span>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
