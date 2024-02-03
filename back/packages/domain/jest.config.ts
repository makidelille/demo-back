export default {
  roots: ['<rootDir>'],
  transform: {
    '.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^domain/(.*)$': '<rootDir>/src/$1',
  },
};
