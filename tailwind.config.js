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
    fontFamily: {
      'sans': ['roboto']
    },
    backgroundSize: {
      '400': '400%'
    },
    extend: {
      animation: {
        'better-fade-in': 'better-fade-in 0.5s linear',
        'spin-fast': 'spin 0.25s linear infinite',
      },
      keyframes: {
        "better-fade-in": {
          '100%': { opacity: 1 },
          '75%': { opacity: 0.75 },
          '50%': { opacity: 0.50 },
          '25%': { opacity: 0.25 },
          '0%': { opacity: 0 }
        },
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
