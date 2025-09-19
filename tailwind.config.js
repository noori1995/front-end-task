/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        'primary-100': '#CECEEE',
        'primary-300': '#A3A3DE',
        'primary-400': '#7878CD',
        'primary-600': '#4D4DBD',
        'gray-100': '#ffffff',
        'gray-300': '#656570',
        'gray-400': '#CBCBD6',
        'gray-600': '#868695',
        'gray-800': '#222225',
        'gray-900': '#0A1629',
        'danger': '#DC3545',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
