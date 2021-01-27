module.exports = function(config) {
  config.set({
    mutate: ['src/**/*.js', '!src/server.js'],
    mutator: {
      name: 'javascript',
      excludedExpressions: ['console.log']
    },
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'jest',
    transpilers: [],
    coverageAnalysis: 'off',
    timeoutMs: 60000,
    jest: {
      projectType: 'custom',
      config: require('./jest.config.js'),
      enableFindRelatedTests: true
    }
  });
};
