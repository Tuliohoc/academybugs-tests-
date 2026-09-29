import { test, expect, type Page } from '@playwright/test';

/* The Test Lab lives in this repository, published from `site/`. Everything
   these tests touch is that page itself: the runner, the recorded results and
   the report the button opens. The numbers are not asserted on purpose — they
   are rewritten from the real run on every pipeline, so the tests check the
   shape instead: counts are numbers, rates end in %, the failing test is the
   one with steps and an error. */
test.use({ baseURL: 'http://127.0.0.1:4173' });

const runSuite = async (page: Page, suite: 'playwright' | 'cypress' | 'api') => {
  await page.locator('[data-lang="en"]').click();
  await page.locator(`[data-suite="${suite}"]`).click();
  await expect(page.locator('#runDone')).toBeVisible({ timeout: 15_000 });
};

test('the lab opens with its three suites and a way back to the portfolio', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1, name: 'Interactive Test Lab' })).toBeVisible();
  await expect(page.locator('.lab-card')).toHaveCount(3);
  await expect(page.locator('[data-suite="playwright"]')).toBeEnabled();
  await expect(page.locator('.bar .mark')).toHaveAttribute('href', 'https://tuliohoc.github.io/portifolio/');
  await expect(page.locator('.nav a[href="#lab"]')).toHaveText('Test Lab');
});

test('running a suite fills the stats and lists the recorded tests', async ({ page }) => {
  await page.goto('/');
  await runSuite(page, 'playwright');

  await expect(page.locator('#stTotal')).toHaveText(/^\d+$/);
  await expect(page.locator('#stPassed')).toHaveText(/^\d+$/);
  await expect(page.locator('#stFailed')).toHaveText(/^\d+$/);
  await expect(page.locator('#stRate')).toHaveText(/^\d+(\.\d+)?%$/);
  await expect(page.locator('#stDur')).toHaveText(/^\d{2}:\d{2}$/);
  await expect(page.locator('#runNote')).toContainText('Recorded run');

  await expect(page.locator('#repList .rep-row')).toHaveCount(5);
  await expect(page.locator('#repNote')).toHaveText(/^Showing 5 of \d+ tests\./);
});

test('the planted bug opens into steps, error and evidence', async ({ page }) => {
  await page.goto('/');
  await runSuite(page, 'playwright');

  const failed = page.locator('#repList .rep-row').filter({ has: page.locator('.st-label.failed') });
  await expect(failed.first()).toBeVisible();
  await failed.first().click();

  await expect(page.locator('#repBody .st-label')).toContainText('Failed');
  await expect(page.locator('#repBody .rep-steps li').first()).toBeVisible();
  await expect(page.locator('#repBody .rep-pre.err')).toContainText(/Error|expect/);
  await expect(page.locator('#repBody .evi-row .evi').first()).toBeVisible();
});

test('Open Full Report points at the published Allure run', async ({ page }) => {
  await page.goto('/');
  await runSuite(page, 'playwright');

  await page.locator('#openFull').click();
  await expect(page.locator('#allure')).toBeVisible();
  await expect(page.locator('#openFull')).toHaveAttribute('aria-expanded', 'true');
  // the report is published next to this page, so the address stays relative
  await expect(page.locator('#allureFrame')).toHaveAttribute('src', './playwright/');
  await expect(page.locator('#allureMeta')).toContainText('Playwright Test Suite');
  await expect(page.locator('#allureMeta')).toContainText(/\d+ tests/);

  await page.locator('#allureClose').click();
  await expect(page.locator('#allure')).toBeHidden();
});

test('a suite without a published report falls back to the text note', async ({ page }) => {
  await page.goto('/');
  await runSuite(page, 'api');

  await page.locator('#openFull').click();
  await expect(page.locator('#fullNote')).toBeVisible();
  await expect(page.locator('#allure')).toBeHidden();
  await expect(page.locator('#openFull')).toHaveAttribute('aria-expanded', 'false');
});

test('the lab speaks both languages without touching the artifacts', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-lang="pt"]').click();
  await expect(page.getByRole('heading', { level: 1, name: 'Laboratório de Testes Interativo' })).toBeVisible();

  await page.locator('[data-suite="playwright"]').click();
  await expect(page.locator('#runDone')).toBeVisible({ timeout: 15_000 });
  await expect(page.locator('#runNote')).toContainText('Execução gravada');
  await expect(page.locator('.done-title')).toHaveText('EXECUÇÃO CONCLUÍDA');
  // the recorded test names stay in English whatever the language
  await expect(page.locator('#repList .rep-name').first()).toHaveText(/[a-z]/i);

  await page.locator('[data-lang="en"]').click();
  await expect(page.locator('#runNote')).toContainText('Recorded run');
});
