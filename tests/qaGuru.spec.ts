import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

let newUser = {};

test.describe.only('Проверка главной страницы Playwright', () => {
  let newUser = {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
});
