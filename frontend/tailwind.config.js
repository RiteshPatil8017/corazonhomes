/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        premium: {
          50: '#f9fafb',
          100: '#f3f4f6',
          900: '#111827',
          gold: '#D4AF37', 
        }
      }
    },
  },
  plugins: [],
}