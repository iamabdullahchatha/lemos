/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand — derived from the Lemos International flame mark
        navy: {
          DEFAULT: '#132258',
          50: '#eef1fb',
          100: '#d8def4',
          200: '#b0bdea',
          300: '#7f92db',
          400: '#4a63c4',
          500: '#2a44a0',
          600: '#1c3182',
          700: '#1b2c72',
          800: '#132258',
          900: '#0e1a4a',
          950: '#080f2e',
        },
        ember: {
          // red-orange -> amber flame gradient
          DEFAULT: '#f26522',
          50: '#fff3ec',
          100: '#ffe1cf',
          200: '#ffc09e',
          300: '#ff9a63',
          400: '#ff7a2e',
          500: '#f26522',
          600: '#dc4e11',
          700: '#b73a10',
          800: '#922f14',
          900: '#772913',
        },
        amber: {
          DEFAULT: '#ffa430',
          400: '#ffb347',
          500: '#ffa430',
        },
        ink: {
          DEFAULT: '#10131a',
          soft: '#2b2f38',
          mute: '#5a606c',
          faint: '#8a909c',
        },
        paper: {
          DEFAULT: '#f6f4ef',
          warm: '#efece4',
          pure: '#ffffff',
        },
        line: 'rgba(16,19,26,0.12)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fluid editorial scale
        'display-xl': ['clamp(3rem, 8vw, 8.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(2rem, 4.5vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.6rem, 3vw, 2.6rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        eyebrow: '0.28em',
      },
      maxWidth: {
        edge: '96rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        400: '400ms',
      },
      keyframes: {
        'flame-drift': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-3%) scale(1.02)' },
        },
      },
      animation: {
        'flame-drift': 'flame-drift 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
