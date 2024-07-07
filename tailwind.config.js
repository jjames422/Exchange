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
        lightBackground: '#2E2E2E', // Set lightBackground to the same as darkBackground
        darkText: '#F3F3F3',
        lightText: '#F3F3F3', // Set lightText to the same as darkText
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        normal: ['Arial', 'sans-serif'],
	sans: ['"Open Sans"', 'sans-serif'], // Add normal text font family
      },
      screens: {
        'xs': '480px',  // Extra small devices (portrait phones)
        'sm': '640px',  // Small devices (landscape phones)
        'md': '768px',  // Medium devices (tablets)
        'lg': '1024px', // Large devices (desktops)
        'xl': '1280px', // Extra large devices (large desktops)
        '2xl': '1536px' // 2x large devices (larger desktops)
      }
    },
  },
  plugins: [],
};
