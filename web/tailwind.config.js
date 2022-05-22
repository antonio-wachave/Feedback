const { borderRadius } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      'Display':['inter']
    },
    darkMode: 'class',
    extend: {
      colors: {
        brand: {
          300: '#996DFF',
          500: '#8257e6',
        }
      }, 
      borderRadius: {
        md: '4px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
