/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        neonPink: '#FF44CC',
        neonBlue: '#44CCFF',
        neonGreen: '#CCFF44',
        neonYellow: '#FFCC44',
        neonPurple: '#CC44FF',
        darkBackground: '#2E2E2E',
        lightBackground: '#E0E0E0',
        darkText: '#F3F3F3',
        lightText: '#1C1C1C',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
};
