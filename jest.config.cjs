module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@mui|recharts)/)',
  ],
  testMatch: [
    '<rootDir>/src/tests/**/*.test.js',
    '<rootDir>/src/tests/**/*.test.jsx',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  collectCoverageFrom: [
    'src/store/slices/authSlice.js',
    'src/store/slices/procurementSlice.js',
    'src/components/common/StatusChip.jsx',
    'src/components/common/SearchBar.jsx',
    'src/components/common/KpiCard.jsx',
    'src/components/common/DataTable.jsx',
  ],
};