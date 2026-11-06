import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo Playwright',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs',
    text: 'Docs',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'MCP', exact: true }),
    name: 'MCP',
    text: 'MCP',
    attribute: {
      type: 'href',
      value: '/mcp/introduction',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'CLI', exact: true }),
    name: 'CLI',
    text: 'CLI',
    attribute: {
      type: 'href',
      value: '/agent-cli/introduction',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByLabel('GitHub repository'),
    name: 'GitHub repository',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByLabel('Discord server'),
    name: 'Discord server',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },
  {
    locator: (page: Page): Locator => page.getByLabel('Switch between dark and light'),
    name: 'Switch between dark and light',
  },
  {
    locator: (page: Page): Locator => page.getByLabel('Search (Meta+k)'),
    name: 'Search (Meta+k)',
  },
];

test.describe('Проверка главной страницы Playwright', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    // Используем for...of вместо forEach для правильной работы с асинхронными шагами
    for (const element of elements) {
      await test.step(`Проверка отображения элемента ${element.name}`, async () => {
        await expect.soft(element.locator(page)).toBeVisible();
      });
    }

    /*
    Если вы хотите использовать деструктуризацию 
    (как пытались в уроке, но правильно — с for...of), 
    код можно записать чуть короче, сразу извлекая name и locator из element:

    test('Проверка отображения элементов навигации хедера', async ({ page }) => {
        for (const { locator, name } of elements) {
          await test.step(`Проверка отображения элемента ${name}`, async () => {
            await expect.soft(locator(page)).toBeVisible();
          });
        }
});
    */
  });

  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    for (const element of elements) {
      if (element.text) {
        await test.step(`Проверка названия элемента ${element.text}`, async () => {
          await expect.soft(element.locator(page)).toContainText(element.text!);
        });
      }
    }
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    for (const element of elements) {
      if (element.attribute) {
        await test.step(`Проверка атрибута ${element.attribute.type} элемента ${element.name}`, async () => {
          await expect
            .soft(element.locator(page))
            .toHaveAttribute(element.attribute!.type, element.attribute!.value);
        }); // 1. Добавлена точка с запятой для test.step
      } // Закрываем if
    } // 2.  (Закрываем цикл for)
  }); // Закрываем test
}); // 3. (Закрываем корневой test.describe)

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

test('Soft Assertions -  Один тест будет завалин', async ({ page }) => {
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
  await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
  await expect
    .soft(page.getByRole('link', { name: 'Get started' }))
    .toHaveAttribute('href', '/docs/intro');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect.soft(page).toHaveURL('https://playwright.dev/docs/intro');
});

test.skip('Skip Test ', async ({ page }) => {
  await expect.soft(page.getByRole('link', { name: 'Get started 666666666' })).toBeVisible();
});

test.fixme('Fixme Test', async ({ page }) => {
  await expect.soft(page.getByRole('link', { name: 'Get started 666666666' })).toBeVisible();
});

test.fail('Fail Test', async ({ page }) => {
  await expect.soft(page.getByRole('link', { name: 'Get started 1234567890' })).toBeVisible();
});
