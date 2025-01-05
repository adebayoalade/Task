module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: ['node_modules/(?!(your-module-to-transform)/)'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.jest.json',
      },
    },
  };
  

  
  