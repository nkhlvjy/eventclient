module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
  // Other Jest configuration options...
};
