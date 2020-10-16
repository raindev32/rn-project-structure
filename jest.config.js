module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/services/**/*.js',
    '!src/store/**/*.js',
    '!src/theme/variables/**/*.js',
    '!src/Routes.js',
    '!src/**/*.test.{js,jsx}',
    '!src/*/RbGenerated*/*.{js,jsx}',
    '!App.js'
  ],
  moduleDirectories: ['node_modules', 'src'],
  testRegex: 'tests/.*\\.test\\.js$'
}
