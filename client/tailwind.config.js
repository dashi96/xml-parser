const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const clientTheme = require('./client-theme')

const spacing = {}
const step = 2 //px
for (let i = 0; i < 201; i++) {
  spacing[i] = i * step + 'px'
}
spacing['1px'] = '1px'

const gridAutoColumns = {}
for (let i = 2; i < 16; i++) {
  gridAutoColumns[`auto-${i}`] = `repeat(${i}, auto)`
}

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...clientTheme.colors,
      blue: colors.blue,
      yellow: colors.amber,
      transparent: colors.transparent,
      gray: colors.gray
    },
    fontSize: clientTheme.fontSize,
    spacing,

    extend: {
      fontFamily: {
        body: ['InterVariable', ...defaultTheme.fontFamily.sans],
        display: ['Euclid', ...defaultTheme.fontFamily.sans]
      },
      lineHeight: {
        full: '100%'
      },
      borderRadius: clientTheme.borderRadius,
      gridTemplateColumns: {
        ...gridAutoColumns
      },
      boxShadow: {
        xs: '0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 2px 3px rgba(0, 0, 0, 0.05);',
        xl: '0px 16px 32px rgba(0, 0, 0, 0.05);'
      },
    }
  },
  plugins: []
}
