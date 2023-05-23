module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    quotes: [2, 'single', 'avoid-escape'],
    'no-undef': 'error',
    'no-console': 'error',
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        bracketSameLine: true,
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
      },
    ],
  },
};
