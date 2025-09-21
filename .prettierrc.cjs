/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.md',
      options: {
        singleQuote: false,
      },
    },
  ],
}; 