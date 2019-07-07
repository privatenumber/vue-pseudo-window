module.exports = {
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    'vue-subslot': '<rootDir>/src/Subslot'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
};
