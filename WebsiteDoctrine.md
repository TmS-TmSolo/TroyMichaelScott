# TroyMichaelScott.com — Master Website Generation & Workflow Doctrine (v1.0)
_Last updated: 2026-02-27 (America/Chicago)_

This document is the operating contract for building and evolving **TroyMichaelScott.com** as:
- a **book-like Library of Thought**
- a **knowledge engine** (not a blog)
- an **AI-augmented publishing + funnel system**
- a bridge to **YouTube** (Try My Soul + Troy Michael Scott)

If a change is not consistent with this doctrine, it does not ship.

---

## 1) Identity & Positioning

### 1.1 Core identity
**Public intellectual, new‑age author, researcher, AI‑human creator.**  
A human-first interpreter of cutting-edge knowledge who uses AI as a tool to create efficiently and help civilians understand reality, consciousness, and the systems shaping the 2020s—without hype or fear.

### 1.2 First‑10‑seconds visitor emotion stack
1. **Safety**
2. **Trust**
3. **Awe**
4. **Curiosity / excitement**
5. “**This guy gets it. He’s incredibly smart.**”

### 1.3 One‑sentence thesis (locked)
**This site exists to prove that knowledge is power—and thought is the most powerful tool in civilizational history—by building and sharing a living library of ideas for the public.**

### 1.4 Voice standard
- Calm authority
- Human-first
- Systems-thinking, not guru energy
- Precise language over vague metaphors
- Symbolism is allowed, but must resolve into clarity

---

## 2) Content Architecture (Knowledge Engine)

### 2.1 Core pillars (site navigation pillars)
1. **Library** (the home of everything)
2. **Living Questions** (curated inquiry engine)
3. **Essays** (long-form + fragments + citations)
4. **Books** (book hub; sales without “salesy” tone)
5. **Research Notes** (raw inputs + citations; “lab notes”)
6. **Speaking** (YouTube embeds; talks)
7. **About** (face + story only)

### 2.2 Essay formats (yes to all)
- Long-form essays
- Short thought fragments
- Research citations
- AI-generated expansions (with policy guardrails)

### 2.3 AI autonomy policy (yes to all, with guardrails)
AI is allowed to:
- publish autonomously **only** within pre-approved “safe lanes” (see §8)
- draft for review
- analyze traffic and generate ideas

Guardrail: no AI publishes to production without passing the **Quality Gate** checklist (§7.4) unless the content is tagged `status: autopublish-safe`.

---

## 3) Technical Stack (Vercel-first, low ops)

### 3.1 Stack (locked)
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind**
- **MDX** content system with strict frontmatter
- **Vercel** deployment

### 3.2 Prisma
**Remove Prisma** unless you have a concrete database-backed feature shipping in the next 7 days.  
Default stance: **no database** for essays, questions, and research notes (file-based content wins for speed + AI generation).

### 3.3 Email capture (decided)
Use **ConvertKit** first.
- Fast setup
- Creator-first tagging/automations
- Easy forms + sequences
- Scales into paid products later

(If later you want newsletter-first publishing UX, you can migrate to Beehiiv; not now.)

### 3.4 Analytics (decided)
Start with **Vercel Analytics + Speed Insights**.
- Minimal setup
- Performance visibility
Later optional: Plausible for privacy-first reporting.

### 3.5 Future: embeddings / knowledge graph
Planned Phase 2:
- Generate embeddings for all content
- Store locally (files) or managed KV
- Power “Ask the Library” search + idea gap detection

---

## 4) Visual System (Book-like + Cinematic, not cheesy)

### 4.1 Global visual rule
The entire site must **read like a book**:
- generous margins
- predictable typography rhythm
- central column width (approx 700–820px)
- section breaks feel like page turns, not “landing-page blocks”

### 4.2 Intro: The Black Box (symbolic)
**First visit only** (localStorage gate). No forced replay.

Symbolic meaning:
- the box holds fears, doubts, limiting beliefs, shadow material
- infinite capacity
- where thoughts arise / are placed during meditation (Jungian shadow-work echo)

Execution rules:
- **no cheap smoke**
- no matrix rain
- no crypto/NFT vibes
- cinematic is allowed only if restrained + fast (< 2.5s total)

### 4.3 Library aesthetic (hybrid)
“**2040 meets Library of Alexandria meets Plato’s Cave**”:
- literal shelves *implied* (not cartoon)
- charcoal/black base
- subtle gold light from crevices
- depth, architecture, calm motion

### 4.4 Floating words background
Only on:
- **Home**
- **Living Questions**
Rules:
- 5–10% opacity
- slow drift (“breathing” speed)
- behind content (never harms readability)
- no hover gimmicks

### 4.5 Face policy
- Face appears **only** in **About**
- Speaking page uses embedded YouTube (no autoplay)

---

## 5) Information Architecture (Page Blueprint)

### 5.1 Home page order (locked)
1. **Manifesto / Foreword** (B)
2. **Featured Book** (A)
3. **Living Questions** (D)
4. **Latest Writing** (C)
Then: Speaking + Join (subtle)

### 5.2 Living Questions page
Purpose: curated inquiry engine that routes users into essays/videos/books.
Structure:
- “Questions” as cards
- each question maps to: (a) essays (b) videos (c) book references
- includes the floating words background

### 5.3 Essays
- Book-like reading layout
- includes citations
- end-of-essay CTA: (1) related videos (2) join letters (3) related book

### 5.4 Books
- calm, non-salesy
- clear: who it’s for + what it changes
- CTA: “Read the Book” / “Get the Book” (not “BUY NOW”)

---

## 6) Content System (MDX + Frontmatter)

### 6.1 Folder structure (canonical)
```
/content
  /essays
  /living-questions
  /research
  /books
/lib
  content.ts
  schema.ts
  citations.ts
/app
  /essays/[slug]/page.tsx
  /living-questions/page.tsx
  /books/[slug]/page.tsx
```

### 6.2 Frontmatter schema (required)
Every document must include:
- `title`
- `date`
- `type` (essay | question | research | book)
- `status` (draft | published | autopublish-safe)
- `summary`
- `tags` (array)
- `pillar` (AI-Consciousness | Human-Evolution | Systems-Reality | etc.)
- `sources` (array of citation objects when applicable)

Example:
```yaml
---
title: "AI Will Evolve Consciousness Studies"
date: "2026-03-01"
type: "essay"
status: "published"
pillar: "AI-Consciousness"
tags: ["AI", "Consciousness", "Emergence", "Measurement"]
summary: "A systems argument that AI pressures operational definitions of consciousness."
sources:
  - label: "Paper/Book/Link name"
    url: "https://..."
    note: "Why it matters"
---
```

### 6.3 Slug rules
- lowercase
- hyphenated
- no dates in slug
- stable forever (never change once published)

---

## 7) Workflow (Human + AI)

### 7.1 Daily build loop (human)
1. Choose one pillar focus for the day
2. Create/expand 1 asset:
   - 1 essay OR
   - 1 living question cluster OR
   - 1 book page improvement
3. Link it:
   - add at least 2 internal links (to/from related content)
4. Add one CTA:
   - join letters OR watch related video
5. Deploy

### 7.2 AI drafting loop (assistant/agent)
1. Generate outline with thesis + counterpoints
2. Draft in MDX using schema
3. Add citations (sources list)
4. Create 3 “Living Questions” derived from the essay
5. Produce:
   - YouTube hook suggestions
   - email subject line + short letter draft

### 7.3 “Claude Cowork” / agent file operations
AI output is always delivered as:
- a complete `.mdx` file (frontmatter included)
- a short “commit message” line
- a list of where to link it in the site (exact paths)

### 7.4 Quality Gate (must pass before publish)
- Does it increase trust?
- Is it precise (no hype / no vague claims)?
- Are sources cited where claims require it?
- Does it link into the library (2+ internal links)?
- Does it end with a useful next step (video, letter, book)?
- Does it match the “book-like” read experience?

If any “No” → revise.

---

## 8) Automation & Monetization (Phase Plan)

### Phase 1 (Now): Publish + Collect
- MDX content system
- email capture (ConvertKit)
- Vercel deploy + analytics
- YouTube embedding + cross-links

### Phase 2: Ask the Library + Idea Graph
- embeddings build
- semantic search
- “related ideas” graph
- gap detection → AI proposes new essays

### Phase 3: Funnels + Products
- lead magnets generated from essay clusters
- automated sequences
- digital downloads + courses
- behavior-based tagging

Autonomy rule: the more monetization, the stricter the review gate.

---

## 9) Non‑Negotiables
- One repo = one site (no nested apps)
- Content is file-based and structured
- Cinematic is restrained and fast
- The site reads like a book
- Trust and clarity come before cleverness
- Keep folder structure clean; no improvisation without updating this doctrine

---

## 10) Immediate Next Tasks (Action Checklist)
1. Add MDX support + `/content` folders
2. Create dynamic routes for essays + books
3. Implement “first visit only” intro (Black Box) safely
4. Implement floating words background on Home + Living Questions only
5. Connect ConvertKit form
6. Deploy to Vercel and connect domain

