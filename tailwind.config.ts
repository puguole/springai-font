import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'Noto Sans SC', 'sans-serif'],
        body: ['Noto Sans SC', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#11141f',
          dark: '#0b0d16',
          light: '#181c2a',
          hover: '#1e2335',
        },
        accent: {
          DEFAULT: '#f5a623',
          dim: 'rgba(245, 166, 35, 0.1)',
          glow: 'rgba(245, 166, 35, 0.06)',
        },
        bubble: {
          user: '#1f2540',
          ai: '#151827',
        },
        muted: '#8b91a6',
        border: '#262b3d',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245, 166, 35, 0.05)' },
          '50%': { boxShadow: '0 0 40px rgba(245, 166, 35, 0.15)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
