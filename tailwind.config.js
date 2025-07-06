module.exports = {
  content: [
    './frontend/pages/**/*.{js,jsx}',
    './frontend/components/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'edu-bg': '#e8f5ff',
        'edu-card': '#d1f5d3',
        'edu-accent': '#ffb300'
      },
      fontFamily: {
        mont: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}
