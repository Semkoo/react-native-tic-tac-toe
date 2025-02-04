// https://docs.expo.dev/guides/using-eslint/

module.exports = {
  extends: ['expo', 'prettier'],
  ignorePatterns: ['/dist/*'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/order': 0,
    'react-native/no-inline-styles': 0,
    'import/namespace': 0,
    'no-duplicate-imports': 'error',
  },
};
