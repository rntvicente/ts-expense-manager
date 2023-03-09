export default {
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageThreshold: undefined,
  roots: ['<rootDir>/test'],
  transform: { '^.+\\.tsx?$': '@swc/jest' },
  preset: '@shelf/jest-mongodb'
};
