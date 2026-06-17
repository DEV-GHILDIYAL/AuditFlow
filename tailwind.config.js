/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sleek harmonized dark mode colors
        darkBg: '#090d16',
        darkCard: '#111827',
        darkBorder: '#1f2937',
        accentPrimary: '#3b82f6', // Premium deep blue
        accentSecondary: '#60a5fa',
        accentPurple: '#8b5cf6', // Indigo/purple accent for gradient
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
