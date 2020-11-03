const esModules = ['three'].join('|')

module.exports = {
  clearMocks: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest'
  }
}
