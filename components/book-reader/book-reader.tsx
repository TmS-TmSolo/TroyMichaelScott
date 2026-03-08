'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { siteContent, Chapter } from '@/lib/content-config';
import { ChapterDivider } from './chapter-divider';
import { ChapterProgress } from './book-navigation';
import { ReadingProgressBar } from './reading-progress-bar';

// ── Helpers ────────────────────────────────────────────────────────────────

function countWords(chapter: Chapter): number {
  return chapter.pages.reduce((acc, page) => {
    return acc + page.content.split(/\s+/).length;
  }, 0);
}

function readingMinutes(chapter: Chapter): number {
  return Math.max(1, Math.ceil(countWords(chapter) / 230));
}

// ── Section divider ────────────────────────────────────────────────────────

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-5 my-12 select-none" aria-hidden>
      <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/30" />
      <span className="font-serif text-gold/40 tracking-[0.6em] text-[10px]">✦ ✦ ✦</span>
      <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/30" />
    </div>
  );
}

// ── Sticky chapter nav ─────────────────────────────────────────────────────

interface StickyNavProps {
  currentChapter: number;
  onPrev: () => void;
  onNext: () => void;
  show: boolean;
}

function StickyChapterNav({ currentChapter, onPrev, onNext, show }: StickyNavProps) {
  const chapter = siteContent.chapters[currentChapter];
  if (!chapter) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="sticky-nav"
          className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 py-3 bg-black/80 backdrop-blur-md border-b border-gold/10"
          initial={{ y: -48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -48, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <button
            onClick={onPrev}
            disabled={currentChapter === 0}
            className="flex items-center gap-1 font-serif text-xs text-gold/50 hover:text-gold disabled:opacity-20 transition-colors duration-200"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            Prev
          </button>

          <p
            className="font-serif text-xs text-library-paper/60 tracking-widest uppercase truncate max-w-[60vw] text-center"
          >
            {chapter.number === 0 ? 'Prologue' : `Chapter ${chapter.number}`}
            {chapter.subtitle ? ` — ${chapter.subtitle}` : ''}
          </p>

          <button
            onClick={onNext}
            disabled={currentChapter === siteContent.chapters.length - 1}
            className="flex items-center gap-1 font-serif text-xs text-gold/50 hover:text-gold disabled:opacity-20 transition-colors duration-200"
          >
            Next
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function BookReader() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  // Track active chapter via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    siteContent.chapters.forEach((_, index) => {
      const el = chapterRefs.current[index];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrentChapter(index);
        },
        { threshold: 0.1, rootMargin: '-10% 0px -60% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Show sticky nav after scrolling past the hero header
  useEffect(() => {
    const onScroll = () => setShowNav(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll to chapter by index
  const scrollToChapter = useCallback((index: number) => {
    const el = chapterRefs.current[index];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const goToPrev = useCallback(() => {
    const target = currentChapter - 1;
    if (target >= 0) scrollToChapter(target);
  }, [currentChapter, scrollToChapter]);

  const goToNext = useCallback(() => {
    const target = currentChapter + 1;
    if (target < siteContent.chapters.length) scrollToChapter(target);
  }, [currentChapter, scrollToChapter]);

  return (
    <div className="relative">
      <ReadingProgressBar />

      <StickyChapterNav
        currentChapter={currentChapter}
        onPrev={goToPrev}
        onNext={goToNext}
        show={showNav}
      />

      <ChapterProgress
        chapters={siteContent.chapters.map((c) => ({ id: c.id, title: c.title }))}
        currentChapter={currentChapter}
      />

      {/* Reading column — ~65–68 characters wide */}
      <div className="max-w-[68ch] mx-auto px-6 py-8">
        {siteContent.chapters.map((chapter, chapterIndex) => (
          <section
            key={chapter.id}
            ref={(el) => { chapterRefs.current[chapterIndex] = el; }}
            className="mb-28 scroll-mt-16"
          >
            {/* Chapter title card */}
            <ChapterDivider chapter={chapter} isVisible={true} />

            {/* Estimated reading time */}
            <p className="mt-4 text-center font-serif text-xs text-library-paper/35 tracking-widest">
              {readingMinutes(chapter)} min read
            </p>

            {/* Pages */}
            <div className="mt-14">
              {chapter.pages.map((page, pageIndex) => (
                <React.Fragment key={page.id}>
                  <motion.article
                    className="mb-0"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  >
                    {page.title && (
                      <h3
                        className="font-display text-xl md:text-2xl text-library-paper mb-6"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {page.title}
                      </h3>
                    )}

                    {page.image && (
                      <div className="relative w-full max-w-[220px] mx-auto aspect-[2/3] mb-8 rounded overflow-hidden shadow-book ring-1 ring-gold/15">
                        <Image
                          src={page.image}
                          alt={page.imageAlt || page.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="font-serif text-library-paper/80 text-[1.0625rem] leading-[1.78] space-y-6">
                      {page.content.split('\n\n').map((para, i) => (
                        <p
                          key={i}
                          className={
                            i === 0 && pageIndex === 0
                              ? 'first-letter:text-5xl first-letter:font-display first-letter:text-gold first-letter:float-left first-letter:mr-3 first-letter:mt-1'
                              : ''
                          }
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {page.quote && (
                      <blockquote className="mt-8 pl-5 border-l-2 border-gold/40 italic text-library-paper/60 leading-relaxed">
                        &ldquo;{page.quote}&rdquo;
                        {page.quoteAttribution && (
                          <footer className="mt-3 text-sm text-gold/70 not-italic">
                            — {page.quoteAttribution}
                          </footer>
                        )}
                      </blockquote>
                    )}
                  </motion.article>

                  {/* Section divider between pages, not after the last one */}
                  {pageIndex < chapter.pages.length - 1 && <SectionDivider />}
                </React.Fragment>
              ))}
            </div>

            {/* End-of-chapter continuation (not on last chapter) */}
            {chapterIndex < siteContent.chapters.length - 1 && (
              <motion.div
                className="mt-16 pt-10 border-t border-gold/10 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <button
                  onClick={goToNext}
                  className="inline-flex items-center gap-3 font-serif text-sm text-gold/50 hover:text-gold transition-colors duration-300 group"
                >
                  <span className="tracking-wide">Continue the investigation</span>
                  <ChevronDown
                    className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300"
                  />
                </button>
                <p className="mt-2 font-serif text-xs text-library-paper/25">
                  {siteContent.chapters[chapterIndex + 1]?.title}
                </p>
              </motion.div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
