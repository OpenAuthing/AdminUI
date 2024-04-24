import theme from './src/theme';

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
                content: '1048px',
                38: '144px',
            },
            maxWidth: {
                content: '1048px',
            },
            boxShadow: {
                'black-inset': 'inset 0 0 0 1px #000000',
            },
        },
    },
};
