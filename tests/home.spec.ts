import { test, expect } from '@playwright/test';
import { open } from './support';

test.describe('home page', () => {
  test('the practice site loads with its own identity', async ({ page }) => {
    await open(page, '/');
    await expect(page).toHaveTitle(/AcademyBugs/i);
    await expect(page.locator('.sq-site-title')).toContainText('AcademyBugs.com');
  });

  test('the main navigation points at the practice areas', async ({ page }) => {
    await open(page, '/');
    const nav = page.getByRole('navigation').first();
    await expect(nav.getByRole('link', { name: /find bugs/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /types of bugs/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /report bugs/i })).toBeVisible();
  });

  test('the examples grid shows the planted bug gallery', async ({ page }) => {
    await open(page, '/');
    const tiles = page.locator('.example-tile-heading');
    await expect(tiles.first()).toBeVisible();
    expect(await tiles.count()).toBeGreaterThan(3);
  });

  test('the catalog entry point leads to the product list', async ({ page }) => {
    await open(page, '/');
    await page.getByRole('navigation').getByRole('link', { name: /find bugs/i }).click();
    await expect(page).toHaveURL(/find-bugs/);
    await expect(page.locator('.ec_product_title_type1').first()).toBeVisible();
  });
});
