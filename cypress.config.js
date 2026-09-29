const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://academybugs.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1440,
    viewportHeight: 900,
    defaultCommandTimeout: 15000,
    setupNodeEvents(on, config) {
      allureCypress(on, config, { resultsDir: 'allure-results-cypress' });
      return config;
    },
  },
});
