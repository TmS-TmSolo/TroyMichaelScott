# TroyMichaelScott.com

An immersive author platform featuring a "black box" entrance experience and interactive book-like page-turning interface.

## Features

### Interactive Entrance
- **Black Box Entrance**: Cinematic entry with gold energy/smoke effects at the seam
- **Scroll or Click to Enter**: Multiple interaction modes for user preference
- **Skip Animation**: Accessibility option to bypass entrance
- **Reduced Motion Support**: Automatic bypass for users with `prefers-reduced-motion`

### Library Experience
- **Grand Library Scene**: Warm, historically-inspired backdrop with parallax depth
- **Floating Dust Motes**: Subtle ambient particles for atmosphere
- **Warm Lighting**: Candlelight-inspired ambient glow effects

### Book Reader
- **Page-Turning Interface**: Realistic book spread with page creases and shadows
- **Chapter Navigation**: Progress indicators and chapter dividers
- **Scroll-Based Navigation**: Natural scrolling triggers page turns
- **Manual Controls**: Click/keyboard navigation (Arrow keys, Page Up/Down)
- **Mobile Touch Support**: Swipe gestures for page turning

### Content Management
- **JSON-Driven Content**: Edit `lib/content-config.ts` to update all site content
- **Chapter Structure**: Organized by chapters with multiple pages per chapter
- **Dynamic Metadata**: SEO-optimized with automatic OpenGraph generation

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Canvas**: Native Canvas API for gold energy effects
- **State**: Zustand for entrance state management
- **Database**: Prisma with PostgreSQL

## Project Structure

```
app/
├── page.tsx              # Homepage with entrance + library
├── chapters/             # Interactive book reader
├── books/                # Book listing and detail pages
├── about/                # Author biography
├── essays/               # Essays section (coming soon)
├── speaking/             # Speaking/media inquiries
├── contact/              # Contact form
└── api/
    ├── contact/          # Contact form submission
    └── newsletter/       # Newsletter signup

components/
├── entrance/             # Black box entrance components
├── library-scene/        # Library background and effects
├── book-reader/          # Page turning interface
├── site-header.tsx       # Navigation header
├── site-footer.tsx       # Site footer
└── newsletter-signup.tsx # Newsletter CTA

lib/
├── content-config.ts     # All site content (edit this!)
├── use-entrance-state.ts # Entrance animation state
└── use-reduced-motion.ts # Accessibility hooks
```

## Content Management

All site content is managed in `lib/content-config.ts`. To update content:

### Update Chapters/Pages

```typescript
// lib/content-config.ts
export const siteContent = {
  chapters: [
    {
      id: 'chapter-1',
      number: 1,
      title: 'Chapter Title',
      subtitle: 'Optional Subtitle',
      pages: [
        {
          id: 'page-1',
          title: 'Page Title',
          content: 'Your content here...',
          image: '/images/optional-image.png',
          quote: 'Optional quote',
          quoteAttribution: 'Quote source',
        },
      ],
    },
  ],
};
```

### Update Book Details

```typescript
book: {
  title: 'The Inner Physics of Our Mind',
  subtitle: 'Why the Most Certain Thing You Know Has No Scientific Explanation',
  author: 'Troy Michael Scott',
  releaseDate: '2026',
  thesis: 'Your thesis statement...',
  excerpt: 'Book excerpt text...',
  coverImage: '/images/book-cover.png',
  gumroadLink: 'https://iamtroy.gumroad.com/l/innerphysics?wanted=true',
  amazonLink: 'https://amazon.com/...',
},
```

### Update Site Metadata

```typescript
meta: {
  siteTitle: 'Troy Michael Scott | Author & Systems Thinker',
  siteDescription: 'Your site description...',
  author: 'Troy Michael Scott',
  ogImage: '/images/og-image.jpg',
},
```

## Development

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://troymichaelscott.com"
```

## Accessibility Features

- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Lite Mode**: Auto-enabled for low-power devices
- **Keyboard Navigation**: Full keyboard support for page turning
- **Skip Animation**: Button to bypass entrance animation
- **High Contrast**: Readable text on all surfaces

## Performance

- **Canvas Optimization**: RequestAnimationFrame for smooth 60fps
- **Lazy Loading**: Heavy visuals loaded on demand
- **Static Generation**: Most pages pre-rendered at build time
- **Image Optimization**: Next.js Image component for all images

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

Or deploy via Abacus.AI:

1. Click the "Deploy" button in the UI
2. Wait for deployment to complete
3. Access your site at the provided URL

## License

© 2026 Troy Michael Scott. All rights reserved.
