import theme from './src/theme'

module.exports = {
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: theme.colors,
      width: {
        '38': '144px'
      }
    },
  },
}
