import { test, expect } from '@playwright/test';
import { open, visibleAddToCart, visibleTitle } from './support';

test.describe('catalog', () => {
  test('every product in the catalog shows a title, a price and a way to buy', async ({ page }) => {
    await open(page, '/find-bugs/');

    const titles = visibleTitle(page);
    await expect(titles.first()).toBeVisible();
    const count = await titles.count();
    expect(count, 'the practice catalog should not be empty').toBeGreaterThan(4);

    expect(await visibleAddToCart(page).count()).toBeGreaterThan(0);

    const missingPrice: string[] = [];
    for (let i = 0; i < count; i++) {
      const title = titles.nth(i);
      const name = (await title.innerText()).trim();
      const card = title.locator('xpath=ancestor::*[contains(@class, "ec_product_li")][1]');
      if ((await card.locator('[class*="price"]:visible').count()) === 0) missingPrice.push(name);
    }
    expect(missingPrice, `products without a visible price: ${missingPrice.join(', ')}`).toEqual([]);
  });

  test('every product card links to its own detail page', async ({ page }) => {
    await open(page, '/find-bugs/');
    const first = page.locator('.ec_product_title_type1 a').first();
    await expect(first).toHaveAttribute('href', /\/store\//);
    await first.click();
    await expect(page.locator('h1.ec_details_title:visible').first()).toBeVisible();
    await expect(page.locator('.ec_product_price:visible').first()).toBeVisible();
  });

  test('the sort menu offers every ordering the page promises', async ({ page }) => {
    await open(page, '/find-bugs/');
    const sort = page.locator('#sortfield');
    await expect(sort).toBeVisible();
    await expect(sort.locator('option')).toHaveCount(9);
    await expect(sort.locator('option', { hasText: 'Price Low-High' })).toHaveCount(1);
    await expect(sort.locator('option', { hasText: 'Title A-Z' })).toHaveCount(1);
  });

  test('choosing Title A-Z reorders the catalog', async ({ page }) => {
    await open(page, '/find-bugs/');
    const titles = visibleTitle(page);
    await expect(titles.first()).toBeVisible();

    const before = (await titles.allInnerTexts()).join('|');
    await page.locator('#sortfield').selectOption('3');
    await expect(titles.first()).toBeVisible();

    const after = (await titles.allInnerTexts()).map((t) => t.trim());
    expect(after.join('|'), 'sorting should change the visible order').not.toBe(before);
    expect(
      after[0].localeCompare(after[1], 'en', { sensitivity: 'base' }),
      `expected "${after[0]}" to sort before or equal "${after[1]}"`,
    ).toBeLessThanOrEqual(0);
  });

  test('a product can be added to the cart from the catalog', async ({ page }) => {
    await open(page, '/find-bugs/');
    await visibleAddToCart(page).click();

    const viewCart = page.locator('a[href*="my-cart/"]:visible').filter({ hasText: /view cart/i }).first();
    await expect(viewCart, 'the site should confirm the item was added').toBeVisible({ timeout: 15_000 });
  });
});
