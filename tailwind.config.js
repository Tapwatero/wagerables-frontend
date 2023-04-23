/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.tsx",
    "./**/*.html"
  ],
  theme: {
    letterSpacing: {
      widest: '.5em'
    },
    extend: {
      animation: {
        'pulse-calm': 'pulse-calm 1.2s linear infinite'
      },
      keyframes: {
        "pulse-calm": {
          '100%': { opacity: 1 },
          '75%': { opacity: 0.90 },
          '50%': { opacity: 0.80 },
          '25%': { opacity: 0.90 },
          '0%': { opacity: 1 }
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-bg-patterns'),
  ],
};
