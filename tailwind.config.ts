import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Library palette
        library: {
          wood: '#2C1810',
          woodLight: '#4A2C1D',
          woodDark: '#1A0F0A',
          leather: '#5C3A21',
          leatherLight: '#7A5033',
          paper: '#F4ECD8',
          paperDark: '#E8DCC4',
          paperAged: '#DFD4BC',
          ink: '#1C1811',
          inkFaded: '#3D352A',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C76B',
          dark: '#B8962E',
          muted: '#A08530',
        },
        amber: {
          glow: '#FF9D3D',
          warm: '#FFB366',
        },
        ivory: {
          DEFAULT: '#F5F5F0',
          dark: '#E8E8E0',
        },
      },
      fontFamily: {
        serif: ['EB Garamond', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url('/textures/paper.png')",
        'leather-texture': "url('/textures/leather.png')",
        'wood-texture': "url('/textures/wood.png')",
      },
      boxShadow: {
        'book': '0 10px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.1)',
        'page': '4px 0 15px rgba(0, 0, 0, 0.3), 2px 0 5px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 30px rgba(212, 175, 55, 0.3)',
        'candle': '0 0 60px 20px rgba(255, 157, 61, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'page-turn': 'pageTurn 0.8s ease-in-out forwards',
        'page-enter': 'pageEnter 0.6s ease-out forwards',
        'candle-flicker': 'candleFlicker 3s ease-in-out infinite',
        'dust-float': 'dustFloat 20s linear infinite',
        'dust-float-slow': 'dustFloat 30s linear infinite',
        'book-glow': 'bookGlow 4s ease-in-out infinite',
        'text-reveal': 'textReveal 1s ease-out forwards',
        'ink-spread': 'inkSpread 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pageTurn: {
          '0%': { transform: 'rotateY(0deg)', transformOrigin: 'left center' },
          '100%': { transform: 'rotateY(-180deg)', transformOrigin: 'left center' },
        },
        pageEnter: {
          '0%': { opacity: '0', transform: 'translateX(50px) rotateY(10deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) rotateY(0)' },
        },
        candleFlicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '25%': { opacity: '0.9', transform: 'scale(0.98)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
          '75%': { opacity: '0.95', transform: 'scale(0.99)' },
        },
        dustFloat: {
          '0%': { transform: 'translateY(100vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-100vh) translateX(100px) rotate(360deg)', opacity: '0' },
        },
        bookGlow: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)' },
          '50%': { boxShadow: '0 0 50px rgba(212, 175, 55, 0.4)' },
        },
        textReveal: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        inkSpread: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
