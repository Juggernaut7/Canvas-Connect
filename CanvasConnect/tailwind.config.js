/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color - A sophisticated, deep, and slightly cool base for backgrounds and main elements.
        primary: {
          DEFAULT: '#263238', // Dark Slate Gray - A deep, modern, slightly blue-tinted dark
          light: '#37474F',   // Lighter shade for cards, panels, secondary backgrounds
          dark: '#1C252A',    // Even deeper, almost black-blue for body/root background
        },
        // Accent color - A truly vibrant, electric tone for primary calls-to-action, highlights, and interactive elements.
        accent: {
          DEFAULT: '#00E5FF', // Electric Cyan - Very bright, eye-catching, and energetic
          light: '#84FFFF',   // Luminous Aqua - For hover states, subtle glows, very light accents
          dark: '#00B8D4',    // Strong Cyan - A slightly deeper, but still highly vibrant shade
        },
        // Secondary accent - A warm, inviting, and complementary pop of color for secondary actions or emphasis.
        secondary: {
          DEFAULT: '#FF9100', // Vibrant Orange - Energetic, warm, and stands out beautifully
          light: '#FFC107',   // Bright Amber - Lighter, more yellow-orange for subtle variations
          dark: '#BF360C',    // Rich Rust - A deeper, more grounded warm tone
        },
        // Neutral palette - A clean, high-contrast system for text, borders, and subtle UI elements.
        neutral: {
          50: '#FDFDFD',   // Almost pure white - for crisp text on dark backgrounds
          100: '#F5F5F5',   // Very light gray - for subtle separators or backgrounds
          200: '#E0E0E0',   // Light gray - for borders, subtle shadows
          300: '#C7C7C7',   // Medium-light gray
          400: '#A1A1A1',   // Mid-gray
          500: '#757575',   // True mid-gray - for less prominent text
          600: '#5C5C5C',   // Darker gray
          700: '#424242',   // Dark charcoal
          800: '#2C2C2C',   // Very dark charcoal - for text on lighter primary backgrounds
          900: '#1A1A1A',   // Near black - for deepest text/elements
        },
        // Special colors for whiteboard elements - keeping the canvas pure and its borders elegant.
        whiteboard: {
          background: '#FFFFFF', // Pure white for the canvas background for maximum drawing clarity
          border: '#E0E0E0',     // Neutral 200 - An elegant, subtle border for the canvas
        },
      },
      // Ensure Montserrat is explicitly available for headings as used in LandingPage
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default sans-serif font
        mono: ['"Press Start 2P"', 'monospace'], // For retro/game elements (if still desired)
        montserrat: ['Montserrat', 'sans-serif'], // Explicitly define Montserrat for headings
      },
    },
  },
  plugins: [],
}