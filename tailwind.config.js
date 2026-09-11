/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f1115',
          surface: '#16181d',
          card: '#1c1e24',
          cardHover: '#23262e',
          border: 'rgba(255, 255, 255, 0.08)',
          borderGlow: 'rgba(229, 169, 60, 0.25)',
        },
        accent: {
          gold: '#e5a93c',
          amber: '#f59e0b',
          yellow: '#d4af37',
          positive: '#10b981',
          neutral: '#64748b',
          negative: '#ef4444',
          cyan: '#06b6d4',
          purple: '#8b5cf6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', 'Cairo', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(229, 169, 60, 0.25), 0 0 10px -3px rgba(245, 158, 11, 0.2)',
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'ruby-glow': '0 0 25px -5px rgba(239, 68, 68, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
