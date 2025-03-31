/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': '#1a237e',
        'light-gray': '#f3f4f6',
        'white': '#ffffff',
        'accent-orange': '#f97316',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
} 