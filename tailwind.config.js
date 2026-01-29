/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dream: {
          50: '#f0f9ff', // Cloud white
          100: '#e0f2fe',
          300: '#7dd3fc', // Sky blue
          500: '#0ea5e9',
          pink: '#fce7f3', // Strawberry
          dark: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
      }
    },
  },
  plugins: [],
}