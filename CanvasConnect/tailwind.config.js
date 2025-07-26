/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color - a deep, sophisticated blue
        primary: {
          DEFAULT: '#2C3E50', // Dark Blue/Charcoal
          light: '#34495E',
          dark: '#212F3D',
        },
        // Accent color - a vibrant, engaging tone for interactive elements
        accent: {
          DEFAULT: '#3498DB', // Bright Sky Blue
          light: '#5DADE2',
          dark: '#2874A6',
        },
        // Secondary accent - a complementary, warm color
        secondary: {
          DEFAULT: '#E67E22', // Orange/Terracotta
          light: '#EB984E',
          dark: '#B9631A',
        },
        // Neutral palette for text, backgrounds, borders
        neutral: {
          50: '#F8F9F9',   // Very Light Gray
          100: '#F2F3F4',
          200: '#E5E7E9',
          300: '#D7DBDD',
          400: '#ABB3B9',
          500: '#7F8C8D',   // Medium Gray
          600: '#626D6E',
          700: '#4A5354',
          800: '#343A3B',
          900: '#212526',   // Very Dark Gray
        },
        // Special colors for whiteboard elements (optional, can be overridden by user choice)
        whiteboard: {
          background: '#F0F0F0', // Light background for the canvas
          border: '#D3D3D3',     // Light border
        },
      },
      // You can also extend other theme properties here, e.g., fonts
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default sans-serif font
        mono: ['"Press Start 2P"', 'monospace'], // For retro/game elements
      },
    },
  },
  plugins: [],
}
