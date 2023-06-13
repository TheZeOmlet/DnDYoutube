/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./pages/**/*.vue",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'black': '#1A202C',
      'gray-input': '#BBBBBB',
      'gray-text': '#718096',
      'gray': '#4A5568',
      'gray-light': '#E2E8F0',
      'blue-light': '#EDF2F7',
      'orange': '#FD5312',
      'orange-light': '#FD9168',
      'orange-super-light': '#FEECE4',
      'red': '#E34A10',
      'darker': '#1E293B',
    },
    extend: {},
  },
  plugins: [],
}
