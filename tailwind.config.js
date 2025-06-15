/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937', // Slate
        accent: '#4F46E5',  // Indigo
        background: '#F9FAFB',
        darkText: '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // You can choose your preferred sans-serif font
      },
    },
  },
  plugins: [],
}