import type { Page } from '@playwright/test';

/* The site paints two overlays on top of everything: a Complianz cookie banner
   and the theme's guided tour, whose canvas swallows every pointer event. Both
   are dismissed once per navigation, before a test touches the page. */
export async function open(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });

  const accept = page.getByRole('button', { name: /accept cookies/i });
  await accept.click({ timeout: 5_000 }).catch(() => {});

  await page
    .evaluate(() => {
      document.getElementById('TourTipDisabledArea')?.remove();
      document.querySelectorAll('.tour-question-mark').forEach((el) => el.remove());
    })
    .catch(() => {});
}

/* Every product card is printed twice: a type6 variant kept display:none and
   the type1 variant the visitor actually sees. Tests only address what is on
   screen, otherwise every assertion lands on the hidden copy. */
export const visibleTitle = (page: Page) => page.locator('.ec_product_title_type1:visible');

export const visibleAddToCart = (page: Page) =>
  page.locator('a[id^="ec_add_to_cart_"]:visible').first();

export const escapeRe = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
