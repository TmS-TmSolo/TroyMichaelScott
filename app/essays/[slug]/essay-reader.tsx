'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { TransitionLink } from '@/components/transitions';
import type { Essay } from '@/lib/essays';

// ─── Divider Detection ────────────────────────────────────────────────────────

function isDotDivider(s: string): boolean {
  return s.startsWith('\u22ef') || s === '• • •';
}

function isLineDivider(s: string): boolean {
  return /^[\u2014—]\s[\u2014—]/.test(s);
}

function isQuoteAttribution(s: string): boolean {
  return /^[\u2014—]\s[^\u2014—]/.test(s) && s.length < 80;
}

function isSectionTitle(chunk: string, chunks: string[], index: number): boolean {
  if (chunk.length > 60) return false;
  if (chunk.includes('.') || chunk.includes(',') || chunk.includes(':')) return false;
  const prev = chunks[index - 1]?.trim();
  return prev !== undefined && isLineDivider(prev);
}

function isQuoteParagraph(s: string): boolean {
  return s.startsWith('\u201c') || s.startsWith('"');
}

function isAttribution(s: string): boolean {
  return s.endsWith(':') && s.length < 120;
}

// ─── Line Break Renderer ──────────────────────────────────────────────────────

function renderLines(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </React.Fragment>
  ));
}

// ─── Body Renderer ────────────────────────────────────────────────────────────

const SERIF: React.CSSProperties = { fontFamily: 'Georgia, "Times New Roman", serif' };
const BODY_CLASS = 'mb-8 text-[1.1rem] leading-[1.95] text-[#1a150e]';

function EssayBody({ body }: { body: string }) {
  const chunks = body.split('\n\n').filter(Boolean);

  const firstBodyIdx = chunks.findIndex((chunk, i) => {
    const t = chunk.trim();
    if (isDotDivider(t) || isLineDivider(t)) return false;
    if (isQuoteParagraph(t) || isAttribution(t) || isQuoteAttribution(t)) return false;
    if (isSectionTitle(t, chunks, i)) return false;
    if (t.length < 60) return false;
    return true;
  });

  return (
    <div className="mt-10">
      {chunks.map((chunk, i) => {
        const trimmed = chunk.trim();

        if (isDotDivider(trimmed)) {
          return (
            <div key={i} className="flex items-center justify-center my-14 select-none" aria-hidden="true">
              <span className="text-[#a8916a] tracking-[0.8em] text-sm">⋯ ⋯ ⋯</span>
            </div>
          );
        }

        if (isLineDivider(trimmed)) {
          return (
            <div key={i} className="my-14" aria-hidden="true">
              <div className="border-t border-[#c4aa82]" />
            </div>
          );
        }

        if (isSectionTitle(trimmed, chunks, i)) {
          return (
            <p key={i} className="text-center text-[#8a7252] text-[0.68rem] tracking-[0.35em] uppercase mt-0 mb-0" style={SERIF}>
              {trimmed}
            </p>
          );
        }

        if (isQuoteAttribution(trimmed)) {
          return (
            <p key={i} className="text-[0.82rem] text-[#8a7252] italic mt-[-1.5rem] mb-10 pl-8 tracking-wide" style={SERIF}>
              {trimmed}
            </p>
          );
        }

        if (isQuoteParagraph(trimmed)) {
          return (
            <blockquote key={i} className="border-l-2 border-[#c4aa82] pl-6 my-10 italic text-[1.0rem] leading-[1.9] text-[#3a2e1c]" style={SERIF}>
              {renderLines(trimmed)}
            </blockquote>
          );
        }

        if (isAttribution(trimmed)) {
          return (
            <p key={i} className="text-[0.88rem] text-[#8a7252] leading-relaxed mb-3 mt-2" style={SERIF}>
              {trimmed}
            </p>
          );
        }

        if (i === firstBodyIdx) {
          return (
            <p
              key={i}
              className={`${BODY_CLASS} first-letter:text-[4.2rem] first-letter:font-display first-letter:text-[#3a2410] first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.8]`}
              style={SERIF}
            >
              {renderLines(trimmed)}
            </p>
          );
        }

        return (
          <p key={i} className={BODY_CLASS} style={SERIF}>
            {renderLines(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

// ─── Paper visual constants ───────────────────────────────────────────────────

/*
  clip-path polygon creates the deckled edge.
  ~20 points per side with ±0.5% perpendicular variation.
  This is applied to the paper container only — text paints
  normally inside and is clipped at the boundary after paint,
  so letters remain completely sharp.
*/
const DECKLE_CLIP = `polygon(
  0.2% 0.4%,  5%  0.1%,  10% 0.5%,  15% 0.2%,  20% 0.6%,
  25% 0.1%,  30% 0.4%,  35% 0.2%,  40% 0.5%,  45% 0.1%,
  50% 0.4%,  55% 0.2%,  60% 0.6%,  65% 0.1%,  70% 0.4%,
  75% 0.2%,  80% 0.5%,  85% 0.1%,  90% 0.4%,  95% 0.2%,
  99.7% 0.5%,
  100%   5%,  99.5% 10%,  99.8% 15%,  99.4% 20%,  99.9% 25%,
  99.5% 30%,  99.8% 35%,  99.4% 40%,  99.7% 45%,  99.5% 50%,
  99.8% 55%,  99.4% 60%,  99.7% 65%,  99.5% 70%,  99.8% 75%,
  99.4% 80%,  99.7% 85%,  99.5% 90%,  99.8% 95%,  99.6% 99.7%,
  95%  100%,  90%  99.5%,  85%  99.8%,  80%  99.4%,  75%  99.7%,
  70%  99.5%,  65%  99.8%,  60%  99.4%,  55%  99.7%,  50%  99.5%,
  45%  99.8%,  40%  99.4%,  35%  99.7%,  30%  99.5%,  25%  99.8%,
  20%  99.4%,  15%  99.7%,  10%  99.5%,   5%  99.8%,   0.3% 99.6%,
  0.1%  95%,  0.4%  90%,  0.1%  85%,  0.5%  80%,  0.2%  75%,
  0.4%  70%,  0.1%  65%,  0.5%  60%,  0.2%  55%,  0.4%  50%,
  0.1%  45%,  0.5%  40%,  0.2%  35%,  0.4%  30%,  0.1%  25%,
  0.5%  20%,  0.2%  15%,  0.4%  10%,  0.1%   5%
)`;

// Age stains: multiple overlapping radial gradients at very low opacity.
// Warm amber/ochre tones — imitates natural foxing and oxidation.
const STAIN_BG = `
  radial-gradient(ellipse 200px 130px at 11%  7%,  rgba(160,120,60,0.055) 0%, transparent 65%),
  radial-gradient(ellipse 280px 110px at 88% 12%,  rgba(140,105,50,0.045) 0%, transparent 60%),
  radial-gradient(ellipse 160px 240px at  4%  80%, rgba(130,100,45,0.060) 0%, transparent 60%),
  radial-gradient(ellipse 240px 160px at 93%  88%, rgba(150,115,55,0.050) 0%, transparent 55%),
  radial-gradient(ellipse 320px  90px at 50%  42%, rgba(145,110,50,0.030) 0%, transparent 70%),
  radial-gradient(ellipse 180px 180px at 72%  26%, rgba(135,100,48,0.038) 0%, transparent 60%),
  radial-gradient(ellipse 140px 200px at 22%  68%, rgba(155,118,52,0.042) 0%, transparent 58%)
`.trim();

// SVG fractalNoise grain — background-image only, never a DOM filter.
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`;

// ─── Essay Reader ─────────────────────────────────────────────────────────────

export function EssayReader({ essay }: { essay: Essay }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0908] flex items-center justify-center">
        <div className="w-6 h-6 border border-[#8a7a5e]/40 border-t-[#8a7a5e] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#0a0908] py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="max-w-[700px] mx-auto"
        >
          {/*
            Outer wrapper: drop-shadow filter only.
            drop-shadow traces the alpha channel of its child,
            so the shadow follows the irregular deckled clip-path edge
            rather than casting a perfect rectangle.
          */}
          <div
            style={{
              filter:
                'drop-shadow(0px 3px 8px rgba(0,0,0,0.45)) drop-shadow(0px 16px 56px rgba(0,0,0,0.70))',
            }}
          >
            {/*
              Paper container.
              clip-path creates the deckled/irregular edge.
              Applied here so text paints normally first,
              then the boundary is clipped — letters stay sharp.
            */}
            <div
              className="relative"
              style={{
                backgroundColor: '#ebe0c0',
                clipPath: DECKLE_CLIP,
              }}
            >

              {/* ── Age stains / tonal variation ──────────────────── */}
              {/* Warm radial blotches at very low opacity.             */}
              {/* Simulates natural foxing and uneven oxidation.        */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                aria-hidden="true"
                style={{ background: STAIN_BG }}
              />

              {/* ── Grain / paper fiber texture ───────────────────── */}
              {/* SVG fractalNoise as background-image only.           */}
              {/* Never a DOM filter — text rendering unaffected.      */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                aria-hidden="true"
                style={{
                  opacity: 0.055,
                  backgroundImage: GRAIN_BG,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '128px 128px',
                }}
              />

              {/* ── Edge vignette / oxidation wear ────────────────── */}
              {/* Radial gradient: transparent center → warm dark       */}
              {/* amber at margins. Simulates edge aging / storage.     */}
              {/* Opacity ~12–14%: visible but not dramatic.            */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 38%, transparent 35%, rgba(60, 35, 8, 0.13) 100%)',
                }}
              />

              {/* ── Corner wear — slightly heavier at corners ─────── */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                aria-hidden="true"
                style={{
                  background: `
                    radial-gradient(ellipse 140px 140px at   0%   0%, rgba(50,28,6,0.10) 0%, transparent 100%),
                    radial-gradient(ellipse 140px 140px at 100%   0%, rgba(50,28,6,0.09) 0%, transparent 100%),
                    radial-gradient(ellipse 140px 140px at   0% 100%, rgba(50,28,6,0.10) 0%, transparent 100%),
                    radial-gradient(ellipse 140px 140px at 100% 100%, rgba(50,28,6,0.10) 0%, transparent 100%)
                  `,
                }}
              />

              {/* ── Essay content ──────────────────────────────────── */}
              {/* z-20 so it renders above all overlay layers.          */}
              {/* Text is never touched by any filter or overlay.       */}
              <div className="relative z-20 px-10 md:px-16 pt-14 pb-16">

                {/* Back link — top */}
                <div className="mb-12">
                  <TransitionLink
                    href="/essays"
                    transition="portal"
                    className="inline-flex items-center gap-2 text-[#8a7252] hover:text-[#1a150e] transition-colors duration-200 text-sm tracking-wide font-serif"
                  >
                    <span>←</span>
                    <span>Essays</span>
                  </TransitionLink>
                </div>

                {/* Category */}
                <p className="text-[#8a7252] text-[0.68rem] tracking-[0.3em] uppercase mb-5" style={SERIF}>
                  {essay.category}
                </p>

                {/* Title */}
                <h1
                  className="text-[#1a150e] text-3xl md:text-[2.05rem] leading-[1.22] mb-5"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400 }}
                >
                  {essay.title}
                </h1>

                {/* Date */}
                <p className="text-[#8a7252] text-sm tracking-wide mb-10" style={SERIF}>
                  {essay.date}
                </p>

                {/* Header rule */}
                <div className="border-t border-[#c4aa82]" />

                {/* Body */}
                <EssayBody body={essay.body} />

                {/* End rule */}
                <div className="border-t border-[#c4aa82] mt-14 mb-10" />

                {/* Subtle footer */}
                <p className="text-center text-[#a89070] text-[0.78rem] italic tracking-wide" style={SERIF}>
                  Troy Michael Scott writes about technology, economics, and human systems.
                </p>

                {/* Back link — bottom */}
                <div className="mt-14 text-center">
                  <TransitionLink
                    href="/essays"
                    transition="portal"
                    className="inline-flex items-center gap-2 text-[#8a7252] hover:text-[#1a150e] transition-colors duration-200 text-sm tracking-wide font-serif"
                  >
                    <span>←</span>
                    <span>Back to Essays</span>
                  </TransitionLink>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <SiteFooter />
    </>
  );
}
