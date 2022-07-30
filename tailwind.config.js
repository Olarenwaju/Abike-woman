/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif']
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) {....}

      md: '768px',
      // => @media (min-width: 768px) {....}

      lg: '1022px',
      // => @media (min-width: 1024px) {....}

      xl: '1280px',
      // => @media (min-width: 1280px) {...}

      '2xl': '1536px',
      // => @media (min-width: 1536px) {...}
    },
    // container: {
    //   padding: '7rem',
    // },
  },
  plugins: [],
}
