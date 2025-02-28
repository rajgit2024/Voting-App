/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monomakh: ['Monomakh', 'sans-serif'],
        warang: ['Noto Sans Warang Citi', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        shafarik: ['Shafarik', 'sans-serif']
      },
      boxShadow: {
        innerCustom: 'inset 0 4px 8px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}

