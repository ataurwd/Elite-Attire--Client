/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a60efe',
        secondary: '#8fd1e3',
        text: '#170026',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },spacing: {
        '400': '400px',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
      },
    },
  },
  plugins: [require('daisyui')],
}