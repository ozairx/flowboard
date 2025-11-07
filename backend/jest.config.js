/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^../database/client$': '<rootDir>/tests/mocks/prisma.ts',
  },
};
