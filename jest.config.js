/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  setupFilesAfterEnv: ['<rootDir>/__tests__/jest.setup.ts'],
};
