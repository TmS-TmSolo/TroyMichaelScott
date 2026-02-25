'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-serif text-library-paper/60 text-sm mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-sm
                     text-library-paper font-serif placeholder:text-library-paper/30
                     focus:outline-none focus:border-gold/50 transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-serif text-library-paper/60 text-sm mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-sm
                     text-library-paper font-serif placeholder:text-library-paper/30
                     focus:outline-none focus:border-gold/50 transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block font-serif text-library-paper/60 text-sm mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-sm
                     text-library-paper font-serif
                     focus:outline-none focus:border-gold/50 transition-colors"
        >
          <option value="" className="bg-black">Select a subject</option>
          <option value="general" className="bg-black">General Inquiry</option>
          <option value="book" className="bg-black">About the Book</option>
          <option value="speaking" className="bg-black">Speaking Request</option>
          <option value="media" className="bg-black">Media/Press</option>
          <option value="other" className="bg-black">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-serif text-library-paper/60 text-sm mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-black/50 border border-gold/20 rounded-sm
                     text-library-paper font-serif placeholder:text-library-paper/30
                     focus:outline-none focus:border-gold/50 transition-colors resize-none"
          placeholder="Your message..."
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-4 bg-gold text-library-ink font-serif
                   hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 rounded flex items-center justify-center gap-2"
        whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
        whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
      >
        {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
        {status === 'success' && <Check className="w-4 h-4" />}
        {status === 'error' && <AlertCircle className="w-4 h-4" />}
        {status === 'idle' && <Send className="w-4 h-4" />}
        
        {status === 'idle' && 'Send Message'}
        {status === 'loading' && 'Sending...'}
        {status === 'success' && 'Message Sent!'}
        {status === 'error' && 'Failed to Send'}
      </motion.button>

      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-serif text-gold/70 text-sm"
        >
          Thank you for reaching out. I will respond as soon as possible.
        </motion.p>
      )}

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-serif text-red-400/70 text-sm"
        >
          Something went wrong. Please try again or email directly.
        </motion.p>
      )}
    </form>
  );
}
