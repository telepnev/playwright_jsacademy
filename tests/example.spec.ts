import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('get YouTube link', async ({ page }) => {
  await page.goto(
    'https://www.youtube.com/watch?v=0lkpbQgfNJk&list=PLz21FrQYzpJhwbstFhdyR7ik3ilhOq_Jl&index=26',
  );

  await expect(page).toHaveTitle(/YouTube/);
});
