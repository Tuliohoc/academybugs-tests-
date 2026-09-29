import { test, expect } from '@playwright/test';
import { open } from './support';

test.describe('content pages', () => {
  test('the types of bugs page explains the categories', async ({ page }) => {
    await open(page, '/types/');
    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(page.getByText('Functional', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Visual', { exact: false }).first()).toBeVisible();
  });

  test('the report bugs page offers the practice scenarios', async ({ page }) => {
    await open(page, '/report-bugs/');
    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(page.getByText(/practice scenarios/i).first()).toBeVisible();
    await expect(page.getByText(/instructions/i).first()).toBeVisible();
  });

  test('the find bugs page states how many planted bugs it holds', async ({ page }) => {
    await open(page, '/find-bugs/');
    await expect(page.getByText(/25 real bugs/i).first()).toBeVisible();
  });
});
