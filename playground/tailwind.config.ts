import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      // Palet warna OSN berdasarkan identitas perusahaan
      colors: {
        osn: {
          50:  '#e8f0ff',
          100: '#c7d8ff',
          200: '#a2bbff',
          300: '#6d94ff',
          400: '#3b6df8',
          500: '#0544B8', // Primary — Deep Blue
          600: '#043da5',
          700: '#033490',
          800: '#022a74',
          900: '#001F3F', // Secondary — Dark Navy
          950: '#001230',
        },
        seulanga: {
          50:  '#fff5eb',
          100: '#ffe3cc',
          200: '#ffcca3',
          300: '#ffad6e',
          400: '#F27420', // Accent — Vibrant Orange
          500: '#e0620f',
          600: '#c4520a',
          700: '#a34208',
          800: '#833507',
          900: '#6b2c06',
          950: '#3d1703',
        },
        navy: {
          DEFAULT: '#001F3F',
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001F3F',
        },
        slate: {
          850: '#172033',
        },
      },
      backgroundImage: {
        'osn-gradient': 'linear-gradient(135deg, #0544B8 0%, #033490 50%, #001F3F 100%)',
        'osn-gradient-warm': 'linear-gradient(135deg, #F27420 0%, #e0620f 100%)',
        'dark-bg': 'linear-gradient(135deg, #0a1628 0%, #0f1f3a 50%, #0a1628 100%)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite reverse',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 1s linear infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 40px rgba(5,68,184,0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(5,68,184,0.7)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'osn': '0 8px 25px rgba(5, 68, 184, 0.35)',
        'seulanga': '0 8px 25px rgba(242, 116, 32, 0.35)',
        'card': '0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config
