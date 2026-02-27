import type { Metadata } from 'next';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { PageTransitionProvider } from '@/components/transitions';
import { ThoughtParticles } from '@/components/ambient';
import { siteContent } from '@/lib/content-config';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://troymichaelscott.com'),
  title: siteContent.meta.siteTitle,
  description: siteContent.meta.siteDescription,
  keywords: ['consciousness', 'philosophy', 'mind', 'science', 'Troy Michael Scott', 'Inner Physics'],
  authors: [{ name: siteContent.meta.author }],
  openGraph: {
    title: siteContent.meta.siteTitle,
    description: siteContent.meta.siteDescription,
    images: [siteContent.meta.ogImage],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteContent.meta.siteTitle,
    description: siteContent.meta.siteDescription,
    images: [siteContent.meta.ogImage],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className="min-h-screen bg-black text-library-paper antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PageTransitionProvider>
            {/* Global ambient thought particles */}
            <ThoughtParticles />
            {children}
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
