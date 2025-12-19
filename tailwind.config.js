/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'], // تأكد من إضافة الخط في index.html
      },
      colors: {
        primary: '#0ea5e9', // Sky Blue
        secondary: '#10b981', // Emerald Green
        dark: '#1e293b', // Slate
      }
    },
  },
  plugins: [],
}
