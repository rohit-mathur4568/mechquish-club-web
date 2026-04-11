// client/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrialBlack: '#0a0a0a',
        brandRed: '#ff1f1f',
        brandDarkRed: '#8b0000',
      },
      fontFamily: {
        tech: ['Rajdhani', 'sans-serif'], 
        sans: ['Inter', 'sans-serif'], 
      },
      boxShadow: {
        'neon-red': '0 0 10px rgba(255, 31, 31, 0.5), 0 0 20px rgba(255, 31, 31, 0.3)',
        'neon-white': '0 0 10px rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}