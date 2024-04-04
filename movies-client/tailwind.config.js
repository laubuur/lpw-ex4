/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      'body': 'Open Sans'
    },
    extend: {},
  },
  plugins: [],
  safelist: [
    'border-red-500',
    'focus:border-red-500',
  ]
}

