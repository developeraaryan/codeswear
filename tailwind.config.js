/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements/dist/js/**/*.js",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  darkMode: 'media', // or 'media' or 'class'
  plugins: [
    require('@tailwindcss/forms'),
    require("daisyui"),
    require('tw-elements/dist/plugin.cjs')
  ],
}