process.env.TZ = 'Europe/Moscow'

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'svg'],
  testRegex: '.*(-test|spec)\\.(js|ts|tsx)$',
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation)'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
}
