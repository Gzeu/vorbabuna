import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        folk: {
          red: '#C41E3A',
          yellow: '#FECE00',
          blue: '#002868',
          brown: '#8B4513',
          cream: '#FFF8DC',
          gold: '#DAA520',
        },
        accent: {
          rose: '#E8B4B8',
          sage: '#9CAF88',
          ochre: '#CC7722',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cinzel Decorative', 'serif'],
      },
      backgroundImage: {
        'folk-pattern': "url('/patterns/ie-motif.svg')",
        'gradient-folk': 'linear-gradient(135deg, #C41E3A 0%, #DAA520 100%)',
      },
      boxShadow: {
        'folk': '0 4px 20px rgba(196, 30, 58, 0.15)',
        'glow': '0 0 30px rgba(218, 165, 32, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'folk-spin': 'folkSpin 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        folkSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
