/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors :{
        gray: {
          100:'#eeeeef',
          200:'#888888',
          500:'#181818',
          700: '#211F1F'
        },
        purple: {
          200: '#d9ddee',
          500: '#9492db',
          600: '#7164c0'
        },
        black :{
          50: '#28272F',
          100: '#07060F'
        },
        primary :'#4b5eff',
        "primary-dark" : '#2638c2'
      }
    },
  },
  plugins: [],
}

