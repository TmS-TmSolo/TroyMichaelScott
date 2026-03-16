'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlackBoxEntrance } from '@/components/entrance';
import { LibraryScene } from '@/components/library-scene';
import { useEntranceState } from '@/hooks/use-entrance-state';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { siteContent } from '@/lib/content-config';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { NewsletterSignup } from '@/components/newsletter-signup';
import { TransitionLink } from '@/components/transitions';
import Image from 'next/image';
import { BookOpen, Library, Sparkles, Brain, Compass, PenTool } from 'lucide-react';

const TEMP_LANDING = false;

function TemporaryLandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,90,20,0.12),transparent_35%),linear-gradient(to_bottom,#050505,#090909_45%,#040404)]" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[min(72vw,420px)] aspect-square">
          {/* Gold smoke */}
          <div className="absolute -inset-16 rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle,rgba(212,175,55,0.35),transparent_65%)] animate-pulse" />
          <div className="absolute -left-10 top-10 w-72 h-40 rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle,rgba(255,210,120,0.22),transparent_70%)]" />
          <div className="absolute -right-8 bottom-6 w-72 h-40 rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle,rgba(184,134,50,0.2),transparent_70%)]" />

          {/* Black box */}
          <div
            className="absolute inset-0 bg-black/90 rounded-sm border border-[#3a2d12]/40"
            style={{
              boxShadow:
                '0 0 0 1px rgba(212,175,55,0.08), 0 30px 80px rgba(0,0,0,0.75), inset 0 0 30px rgba(255,255,255,0.02)',
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl text-center">
        <p
          className="text-[#f3efe4] text-[clamp(1.35rem,2.2vw,2.3rem)] leading-[1.7] font-serif"
          style={{ textShadow: '0 1px 18px rgba(0,0,0,0.65)' }}
        >
          The world is moving faster every day.
          <br />
          I am building a place to slow down, think clearly, and explore what
          actually matters.
        </p>
      </div>
    </main>
  );
}


function RealHomePage() {
  const { hasEntered, setHasEntered } = useEntranceState();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited || reducedMotion) {
      setHasEntered(true);
    }
  }, [reducedMotion, setHasEntered]);

  const handleEntranceComplete = () => {
    sessionStorage.setItem('hasVisited', 'true');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Entrance Animation */}
      <AnimatePresence>
        {!hasEntered && (
          <BlackBoxEntrance onComplete={handleEntranceComplete} />
        )}
      </AnimatePresence>

      {/* Main Library Experience */}
      {hasEntered && (
        <>
          <SiteHeader />
          
          <main className="relative min-h-screen">
            <LibraryScene>
              {/* Welcome Section - Walking into the library */}
              <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="max-w-3xl"
                >
                  {/* Ornamental entrance */}
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1 }}
                  >
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
                      <Sparkles className="w-5 h-5 text-gold/60" />
                      <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
                    </div>
                    <p className="text-gold/50 font-serif text-xs tracking-[0.4em] uppercase">
                      Welcome to
                    </p>
                  </motion.div>

                  <motion.h1
                    className="font-display text-4xl sm:text-5xl md:text-7xl text-library-paper mb-6 tracking-wide"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1.2 }}
                  >
                    The Library of My Mind
                  </motion.h1>

                  <motion.p
                    className="font-serif text-lg md:text-xl text-library-paper/60 italic mb-12 max-w-xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 1 }}
                  >
                    {siteContent.library.tagline}
                  </motion.p>

                  {/* Divider */}
                  <motion.div 
                    className="w-48 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mb-12"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.1, duration: 1 }}
                  />

                  <motion.p
                    className="font-serif text-library-paper/70 leading-relaxed max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 1 }}
                  >
                    {siteContent.library.welcomeText}
                  </motion.p>
                </motion.div>
              </section>

              {/* Library Sections - Rooms to explore */}
              <section className="py-20 px-4">
                <motion.div
                  className="max-w-5xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <div className="text-center mb-16">
                    <h2 
                      className="font-display text-2xl md:text-3xl text-library-paper mb-4"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Explore the Library
                    </h2>
                    <p className="font-serif text-library-paper/60 italic">
                      Each room holds different facets of thought and creation
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* The Reading Room - Chapters */}
                    <LibraryRoom
                      href="/chapters"
                      icon={<BookOpen className="w-8 h-8" />}
                      title="The Reading Room"
                      subtitle="Chapters of My Life"
                      description="Interactive book experience exploring consciousness, identity, and the questions that shape us."
                      transition="book"
                      delay={0.1}
                    />

                    {/* My Library - Book Recommendations */}
                    <LibraryRoom
                      href="/my-library"
                      icon={<Library className="w-8 h-8" />}
                      title="My Library"
                      subtitle="Book Recommendations"
                      description="The books that have shaped my thinking on consciousness, philosophy, and the nature of reality."
                      transition="door"
                      delay={0.2}
                    />

                    {/* The Study - Books */}
                    <LibraryRoom
                      href="/books"
                      icon={<PenTool className="w-8 h-8" />}
                      title="The Study"
                      subtitle="My Written Works"
                      description="The Inner Physics Series — five volumes exploring consciousness from the inside out."
                      transition="portal"
                      delay={0.3}
                    />

                    {/* The Meditation Chamber - About */}
                    <LibraryRoom
                      href="/about"
                      icon={<Brain className="w-8 h-8" />}
                      title="The Meditation Chamber"
                      subtitle="About the Author"
                      description="The journey from service industry to consciousness research — a non-traditional path."
                      transition="portal"
                      delay={0.4}
                    />

                    {/* The Writing Desk - Essays */}
                    <LibraryRoom
                      href="/essays"
                      icon={<Compass className="w-8 h-8" />}
                      title="The Writing Desk"
                      subtitle="Essays & Explorations"
                      description="Shorter works on consciousness, AI, epistemology, and the nature of truth."
                      transition="portal"
                      delay={0.5}
                    />

                    {/* The Archives - Contact/Speaking */}
                    <LibraryRoom
                      href="/speaking"
                      icon={<Sparkles className="w-8 h-8" />}
                      title="The Archives"
                      subtitle="Speaking & Media"
                      description="For those seeking conversation on consciousness, AI, and the philosophy of mind."
                      transition="portal"
                      delay={0.6}
                    />
                  </div>
                </motion.div>
              </section>

              {/* Featured Book Section */}
              <section className="py-20 px-4">
                <motion.div
                  className="max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <div className="relative paper-texture p-8 md:p-12 rounded-sm overflow-hidden">
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
                    
                    <div className="relative grid md:grid-cols-2 gap-8 items-center">
                     {/* Book Cover */}
<div className="relative w-full max-w-xs mx-auto">
  <div className="relative w-full aspect-[2/3]">
    <div className="absolute inset-0 translate-x-3 translate-y-3 bg-black/40 blur-xl rounded" />
    <motion.div
      className="relative w-full h-full rounded overflow-hidden shadow-book"
      whileHover={{ scale: 1.02, rotateY: 3 }}
      transition={{ duration: 0.3 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Image
        src={siteContent.book.coverImage}
        alt={siteContent.book.title}
        fill
        className="object-cover"
        priority
      />
    </motion.div>
    <div className="absolute -top-2 -right-2 bg-gold text-library-ink text-xs font-serif px-3 py-1 rounded shadow-lg">
      Available Now
    </div>
  </div>
</div>
{/* Full-Width Thesis Section */}
<section className="py-28 px-6 border-y border-gold/10 bg-black/70">
  <motion.div
    className="max-w-4xl mx-auto text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    <p className="text-gold/50 font-serif text-xs tracking-[0.35em] uppercase mb-6">
      The Central Question
    </p>

    <blockquote
      className="font-serif text-2xl md:text-4xl text-library-paper italic leading-relaxed"
      style={{ textShadow: '0 2px 18px rgba(0,0,0,0.35)' }}
    >
      “{siteContent.book.thesis}”
    </blockquote>

    <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto my-10" />

    <p className="font-serif text-library-paper/70 max-w-2xl mx-auto leading-relaxed">
      The Inner Physics Series begins with a simple but unsettling observation:
      modern science can map the brain in extraordinary detail, yet still cannot
      explain why any physical process should produce conscious experience at all.
    </p>

    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
      <a
        href="https://iamtroy.gumroad.com/l/innerphysics?wanted=true"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-library-ink font-serif text-sm hover:bg-gold-light transition-all duration-300 rounded"
      >
        <BookOpen className="w-4 h-4" />
        Get the Book
      </a>

      <TransitionLink
        href="/books/inner-physics-of-our-mind"
        transition="portal"
        className="inline-flex items-center gap-2 px-6 py-3 border border-gold/40 text-gold font-serif text-sm hover:bg-gold/10 transition-all duration-300 rounded"
      >
        Explore the Book
      </TransitionLink>
    </div>
  </motion.div>
</section>
                      {/* Book Info */}
                      <div className="space-y-4">
                        <p className="text-gold/60 font-serif text-xs tracking-[0.2em] uppercase">
                          Volume I • The Inner Physics Series
                        </p>
                        <h2 
                          className="font-display text-2xl md:text-3xl text-library-ink"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {siteContent.book.title}
                        </h2>
                        <p className="font-serif text-library-ink-faded italic">
                          {siteContent.book.subtitle}
                        </p>
                        
                        <blockquote className="pl-4 border-l-2 border-gold/40 text-library-ink-faded italic text-sm">
                          "{siteContent.book.thesis}"
                        </blockquote>

                        <div className="pt-4 flex flex-wrap gap-4">
                          <TransitionLink
                            href="/books/inner-physics-of-our-mind"
                            transition="portal"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-library-ink font-serif text-sm hover:bg-gold-light transition-all duration-300 rounded"
                          >
                            <BookOpen className="w-4 h-4" />
                            Learn More
                          </TransitionLink>
                          <TransitionLink
                            href="/chapters"
                            transition="book"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/40 text-gold font-serif text-sm hover:bg-gold/10 transition-all duration-300 rounded"
                          >
                            Read Chapters
                          </TransitionLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* Newsletter */}
              <section className="py-20 px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <NewsletterSignup />
                </motion.div>
              </section>
            </LibraryScene>
          </main>

          <SiteFooter />
        </>
      )}
    </>
  );
}

// Library Room Card Component
interface LibraryRoomProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  transition: 'door' | 'portal' | 'book' | 'fade';
  delay: number;
}

function LibraryRoom({ href, icon, title, subtitle, description, transition, delay }: LibraryRoomProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <TransitionLink
        href={href}
        transition={transition}
        className="block group"
      >
        <div className="relative p-6 border border-gold/10 rounded-sm bg-black/30 backdrop-blur-sm
                        hover:border-gold/30 hover:bg-black/40 transition-all duration-500
                        overflow-hidden h-full">
          {/* Hover glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
               style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />
          
          {/* Icon */}
          <div className="text-gold/50 group-hover:text-gold transition-colors duration-300 mb-4">
            {icon}
          </div>
          
          {/* Content */}
          <h3 
            className="font-display text-xl text-library-paper group-hover:text-gold transition-colors duration-300 mb-1"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {title}
          </h3>
          <p className="font-serif text-gold/60 text-sm italic mb-3">
            {subtitle}
          </p>
          <p className="font-serif text-library-paper/60 text-sm leading-relaxed">
            {description}
          </p>

          {/* Enter indicator */}
          <div className="mt-4 flex items-center gap-2 text-gold/40 group-hover:text-gold/70 transition-colors duration-300">
            <span className="text-xs font-serif tracking-widest uppercase">Enter</span>
            <motion.span 
              className="text-lg"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>
        </div>
      </TransitionLink>
    </motion.div>
  );
}


export default function HomePage() {
  // temporary gate
  if (TEMP_LANDING) return <TemporaryLandingPage />;
  return <RealHomePage />;
}
