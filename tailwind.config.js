/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#049f82',
        'primary-dark': '#008f72',
        secondary: '#353535',
        'gray-text': '#454545',
        'gray-light': '#f7f7f7',
        'gray-lighter': '#eeeeee',
        foreground: '#222222',
        background: '#ffffff',
      },
      fontFamily: {
        sans: ['Kumbh Sans', 'system-ui', 'sans-serif'],
        display: ['Kumbh Sans', 'system-ui', 'sans-serif'],
        nav: ['Raleway', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}