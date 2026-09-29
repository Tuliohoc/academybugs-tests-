import { test, expect } from '@playwright/test';
import { open, visibleAddToCart, visibleTitle, escapeRe } from './support';

test.describe('cart', () => {
  test('the cart page opens and says it is empty before anything is added', async ({ page }) => {
    await open(page, '/my-cart/');
    await expect(page.getByText(/there are no items in your cart/i).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /return to stor/i }).first()).toBeVisible();
  });

  test('adding a product puts it on the cart line', async ({ page }) => {
    await open(page, '/find-bugs/');

    const title = visibleTitle(page).first();
    const name = (await title.innerText()).trim();
    const card = title.locator('xpath=ancestor::*[.//a[starts-with(@id, "ec_add_to_cart_")]][1]');
    await card.locator('a[id^="ec_add_to_cart_"]:visible').first().click();

    const viewCart = page.locator('a[href*="my-cart/"]:visible').filter({ hasText: /view cart/i }).first();
    await expect(viewCart, 'the site should confirm the item was added').toBeVisible({ timeout: 15_000 });
    await viewCart.click();

    await expect(page).toHaveURL(/my-cart/);
    await expect(page.getByText(new RegExp(escapeRe(name), 'i')).first()).toBeVisible();
    await expect(page.getByText(/there are no items in your cart/i)).toHaveCount(0);
  });

  test('the cart shows a total with a real amount once it holds a product', async ({ page }) => {
    await open(page, '/find-bugs/');
    await visibleAddToCart(page).click();

    const viewCart = page.locator('a[href*="my-cart/"]:visible').filter({ hasText: /view cart/i }).first();
    await expect(viewCart).toBeVisible({ timeout: 15_000 });
    await viewCart.click();

    await expect(page).toHaveURL(/my-cart/);
    const row = page.locator('.ec_cartitem_row:visible').first();
    await expect(row, 'the added product must appear on a cart line').toBeVisible();
    await expect(row).toHaveText(/\$\s?\d/);
    await expect(row, 'a cart holding a product must not total zero').not.toHaveText(/\$\s*0\.00/);
  });
});
