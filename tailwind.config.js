/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['Tajawal', 'sans-serif'] },
      colors: {
        primary: '#0ea5e9',
        secondary: '#10b981',
        dark: '#1e293b'
      }
    },
  },
  plugins: [],
}
