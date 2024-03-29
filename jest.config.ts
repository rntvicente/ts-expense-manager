export default {
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageThreshold: undefined,
  roots: ['<rootDir>/src'],
  transform: { '^.+\\.ts?$': '@swc/jest' },
  preset: '@shelf/jest-mongodb',
  setupFiles: ['dotenv/config'],
  testEnvironmentOptions: {
    timeZone: 'America/Sao_Paulo'
  }
};
