/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        'sans': ['Rubik', 'sans-serif'],
        'bebas': ['Bebas Neue', 'sans-serif'],
        'dancing': ["Dancing Script", 'cursive']
    }
    },
  },
  plugins: [],
}