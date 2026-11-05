import { test, expect } from '@playwright/test';

test.describe('Проверка главной страницы Playwright', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Playwright logo Playwright' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'MCP', exact: true })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'CLI', exact: true })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect.soft(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
    await expect.soft(page.getByLabel('GitHub repository')).toBeVisible();
    await expect.soft(page.getByLabel('Discord server')).toBeVisible();
    await expect.soft(page.getByLabel('Switch between dark and light')).toBeVisible();
    await expect.soft(page.getByLabel('Search (Meta+k)')).toBeVisible();
  });

  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText(
      'Playwright',
    );
    await expect.soft(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
    await expect.soft(page.getByRole('link', { name: 'MCP', exact: true })).toContainText('MCP');
    await expect.soft(page.getByRole('link', { name: 'CLI', exact: true })).toContainText('CLI');
    await expect.soft(page.getByRole('link', { name: 'API' })).toContainText('API');
    await expect.soft(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    await expect
      .soft(page.getByRole('link', { name: 'Playwright logo Playwright' }))
      .toHaveAttribute('href', '/');
    await expect
      .soft(page.getByRole('link', { name: 'Docs' }))
      .toHaveAttribute('href', '/docs/intro');
    await expect
      .soft(page.getByRole('link', { name: 'MCP', exact: true }))
      .toHaveAttribute('href', '/mcp/introduction');
    await expect
      .soft(page.getByRole('link', { name: 'CLI', exact: true }))
      .toHaveAttribute('href', '/agent-cli/introduction');
    await expect
      .soft(page.getByRole('link', { name: 'API' }))
      .toHaveAttribute('href', '/docs/api/class-playwright');
    await expect
      .soft(page.getByLabel('GitHub repository'))
      .toHaveAttribute('href', 'https://github.com/microsoft/playwright');
    await expect
      .soft(page.getByLabel('Discord server'))
      .toHaveAttribute('href', 'https://aka.ms/playwright/discord');
  });

  test('Проверка переключения dark/light mode', async ({ page }) => {
    let darkAndLightMode = page.getByLabel('Switch between dark and light');
    darkAndLightMode.click();
    await expect(darkAndLightMode).toHaveAttribute(
      'aria-label',
      'Switch between dark and light mode (currently light mode)',
    );
    darkAndLightMode.click();
    await expect(darkAndLightMode).toHaveAttribute(
      'aria-label',
      'Switch between dark and light mode (currently dark mode)',
    );
    darkAndLightMode.click();
    await expect(darkAndLightMode).toHaveAttribute(
      'aria-label',
      'Switch between dark and light mode (currently system mode)',
    );
  });

  test('Проверка заголовка страницы', async ({ page }) => {
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toBeVisible();
    await expect
      .soft(page.getByRole('heading', { name: 'Playwright enables reliable' }))
      .toContainText(
        'Playwright enables reliable web automation for testing, scripting, and AI agents.',
      );
  });

  test('Проверка кнопки Get stardeted', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect.soft(page).toHaveURL('https://playwright.dev/docs/intro');
  });

  test('Soft Assertions -  Один тест будет завалин', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect.soft(page).toHaveURL('https://playwright.dev/docs/intro');
  });
});
