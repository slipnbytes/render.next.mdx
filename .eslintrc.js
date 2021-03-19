module.exports = {
  plugins: ['import-helpers'],
  extends: [
    '@hitechline/eslint-config/web',
    '@hitechline/eslint-config/typescript',
  ],
  rules: {
    'import/order': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        alphabetize: { order: 'asc', ignoreCase: true },
        groups: ['module', ['parent', 'sibling', 'index']],
      },
    ],
  },
};
