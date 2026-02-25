// Content Configuration for TroyMichaelScott.com
// Edit this file to update all site content without touching components

export interface PageContent {
  id: string;
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
  quote?: string;
  quoteAttribution?: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  pages: PageContent[];
}

export interface BookConfig {
  title: string;
  subtitle: string;
  author: string;
  releaseDate: string;
  thesis: string;
  excerpt: string;
  coverImage: string;
  amazonLink: string;
}

export interface BookRecommendation {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage?: string;
  link?: string;
}

export interface SiteContent {
  entrance: {
    title: string;
    enterButton: string;
    skipButton: string;
  };
  library: {
    tagline: string;
    welcomeText: string;
  };
  chapters: Chapter[];
  book: BookConfig;
  bookRecommendations: BookRecommendation[];
  newsletter: {
    headline: string;
    description: string;
    buttonText: string;
    placeholder: string;
  };
  meta: {
    siteTitle: string;
    siteDescription: string;
    author: string;
    ogImage: string;
  };
}

export const siteContent: SiteContent = {
  entrance: {
    title: 'The Library of Troy Michael Scott',
    enterButton: 'Enter',
    skipButton: 'Skip',
  },
  library: {
    tagline: 'Chapters of My Life.',
    welcomeText: 'Welcome to my library. Here you will find the collected thoughts, investigations, and stories that have shaped my understanding of consciousness, reality, and what it means to be aware.',
  },
  chapters: [
    {
      id: 'prologue',
      number: 0,
      title: 'Prologue',
      subtitle: 'The Question That Refused to Rest',
      pages: [
        {
          id: 'prologue-1',
          title: 'The Beginning',
          content: `I did not begin as an academic. The path that led to writing about consciousness wound through baseball diamonds, restaurant floors, and the relentless pace of high-end service — environments where performance, reaction time, and constant motion dominate daily life.

Over time, that environment sharpened a question rather than silencing it: If everything is movement, information, and reaction — who is experiencing it?`,
        },
        {
          id: 'prologue-2',
          title: 'The Investigation',
          content: `My intellectual path has been self-directed and obsessive. I studied neuroscience, quantum mechanics, AI systems, philosophy of mind, and consciousness research not as a hobby, but as an investigation.

The deeper I went, the more I noticed something unsettling: The smartest people alive disagree about what you are.`,
          quote: 'The most important mystery in the universe is not out there. It is the fact that you are aware of it.',
        },
      ],
    },
    {
      id: 'chapter-1',
      number: 1,
      title: 'The Inner Physics',
      subtitle: 'Of Our Mind',
      pages: [
        {
          id: 'ch1-1',
          title: 'The Hard Problem',
          content: `We have mapped the genome. Split the atom. Built machines that can write, reason, and learn. And yet we cannot explain the one thing we experience every moment: consciousness.

No equation captures it. No instrument detects it. No model explains why experience exists at all.`,
          image: '/images/book-cover.png',
          imageAlt: 'The Inner Physics of Our Mind book cover',
        },
        {
          id: 'ch1-2',
          title: 'A Structural Limit',
          content: `What if the failure to explain consciousness is not a technical problem — but a foundational one?

Across neuroscience, quantum physics, artificial intelligence, and philosophy, I trace a fracture at the heart of contemporary thought. The deeper we look, the clearer it becomes: every framework that begins by assuming matter is fundamental eventually runs into the same wall.

Not a missing detail. Not a gap future research will close. A structural limit.`,
          quote: 'The explanatory gap may be a structural limit of third-person explanation.',
          quoteAttribution: 'The Inner Physics of Our Mind',
        },
        {
          id: 'ch1-3',
          title: 'The Thesis',
          content: `The explanatory gap between brain activity and lived experience is not a temporary scientific puzzle — it is a structural limit of third-person explanation. No framework that begins by assuming matter is more fundamental than consciousness has successfully explained why experience exists at all.

This is not a rejection of science. It is a demand that science follow its own evidence wherever it leads. Because if consciousness is not something the universe produces — but something more fundamental than we have dared to admit — then everything changes.`,
        },
      ],
    },
    {
      id: 'chapter-2',
      number: 2,
      title: 'Try My Soul',
      subtitle: 'The Platform',
      pages: [
        {
          id: 'ch2-1',
          title: 'The Mission',
          content: `Try My Soul is the umbrella platform for my writing, research, and media. Founded in the mid-2020s, its purpose is simple:

To model careful thinking in an age of certainty inflation.

The platform focuses on consciousness, AI and human identity, cultural drift and truth-seeking, systems thinking, and intellectual humility without intellectual passivity.`,
        },
        {
          id: 'ch2-2',
          title: 'Not Motivation',
          content: `Try My Soul is not motivational content. It is an investigation platform.

We explore the boundaries of what we know and what we assume. We sit with difficult questions without rushing to premature conclusions. We take seriously the possibility that our most fundamental assumptions about reality may need revision.`,
        },
      ],
    },
    {
      id: 'chapter-3',
      number: 3,
      title: 'The Series',
      subtitle: 'Five Volumes',
      pages: [
        {
          id: 'ch3-1',
          title: 'The Inner Physics Series',
          content: `A five-volume exploration beginning with consciousness and expanding outward to reality, truth, and transformation.

• Volume I: The Inner Physics of Our Mind
• Volume II: The Inner Physics of Reality
• Volume III: The Inner Physics of Truth
• Volume IV: The Inner Physics of Change
• Volume V: The Inner Physics of Being

Each volume builds upon the last, creating a comprehensive framework for understanding consciousness, reality, and our place within it.`,
        },
      ],
    },
  ],
  book: {
    title: 'The Inner Physics of Our Mind',
    subtitle: 'Why the Most Certain Thing You Know Has No Scientific Explanation',
    author: 'Troy Michael Scott',
    releaseDate: '2026',
    thesis: 'The explanatory gap may be a structural limit of third-person explanation.',
    excerpt: `We have mapped the genome. Split the atom. Built machines that can write, reason, and learn. And yet we cannot explain the one thing we experience every moment: consciousness.

No equation captures it. No instrument detects it. No model explains why experience exists at all. In The Inner Physics of Our Mind, Troy Michael Scott confronts the question modern science quietly avoids: What if the failure to explain consciousness is not a technical problem — but a foundational one?`,
    coverImage: '/images/book-cover.png',
    amazonLink: '#',
  },
  bookRecommendations: [
    {
      id: 'geb',
      title: 'Gödel, Escher, Bach',
      author: 'Douglas Hofstadter',
      category: 'Mind & Recursion',
      description: 'An exploration of strange loops, self-reference, and the emergence of consciousness through the interplay of mathematics, art, and music.',
    },
    {
      id: 'consciousness-explained',
      title: 'Consciousness Explained',
      author: 'Daniel Dennett',
      category: 'Philosophy of Mind',
      description: 'A materialist perspective on consciousness that challenges our intuitions about the nature of subjective experience.',
    },
    {
      id: 'character-consciousness',
      title: 'The Character of Consciousness',
      author: 'David Chalmers',
      category: 'Philosophy of Mind',
      description: 'The definitive work on the hard problem of consciousness and why explaining experience may require new frameworks.',
    },
    {
      id: 'fabric-of-reality',
      title: 'The Fabric of Reality',
      author: 'David Deutsch',
      category: 'Physics & Reality',
      description: 'Weaving together quantum physics, epistemology, computation, and evolution into a unified worldview.',
    },
    {
      id: 'emperor-new-mind',
      title: "The Emperor's New Mind",
      author: 'Roger Penrose',
      category: 'Mind & Physics',
      description: 'A provocative argument that consciousness cannot arise from computation alone, suggesting quantum processes in the brain.',
    },
    {
      id: 'being-no-one',
      title: 'Being No One',
      author: 'Thomas Metzinger',
      category: 'Self & Identity',
      description: 'A deep investigation into the phenomenal self-model and why the feeling of being a self may be a constructed illusion.',
    },
    {
      id: 'waking-up',
      title: 'Waking Up',
      author: 'Sam Harris',
      category: 'Consciousness & Spirituality',
      description: 'A guide to spirituality without religion, exploring meditation and the nature of the mind from a scientific perspective.',
    },
    {
      id: 'structures-scientific-revolutions',
      title: 'The Structure of Scientific Revolutions',
      author: 'Thomas Kuhn',
      category: 'Philosophy of Science',
      description: 'The classic work on paradigm shifts and how scientific knowledge actually evolves—essential for understanding why consciousness research struggles.',
    },
  ],
  newsletter: {
    headline: 'If you want the chapters as they\'re written—join the list.',
    description: 'Receive early drafts, research notes, and announcements directly.',
    buttonText: 'Subscribe',
    placeholder: 'your@email.com',
  },
  meta: {
    siteTitle: 'Troy Michael Scott | Author & Systems Thinker',
    siteDescription: 'Author of The Inner Physics of Our Mind. Exploring consciousness, technology, and the questions science quietly avoids.',
    author: 'Troy Michael Scott',
    ogImage: '/images/og-image.jpg',
  },
};

export default siteContent;
