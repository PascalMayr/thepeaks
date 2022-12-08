import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

// custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
