/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.svelte', './src/**/*.html'],
  theme: {
    extend: {
      colors: {
        slbBlue: '#0014db', // Add your custom color
        cee5fd: '#CEE5FD',
      },
      fontFamily: {
        'sans': ['Poppins', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
}

