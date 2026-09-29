import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: 'allure-results', detail: 'steps' }],
  ],
  use: {
    baseURL: 'https://academybugs.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  // The lab page is served from the folder GitHub Pages publishes, so the
  // tests open it the same way a visitor would.
  webServer: {
    command: 'node scripts/serve.mjs 4173 site',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
