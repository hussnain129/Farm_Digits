import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.openLoginForm();
  });

  test('valid login', async ({ page }) => {
    await loginPage.fillEmail();
    await loginPage.fillPassword();
    await loginPage.checkRememberMe();
    await loginPage.clickSignIn();
    await page.pause();
  });

  test('invalid login', async ({ page }) => {
    await loginPage.fillEmail('wrong@example.com');
    await loginPage.fillPassword('wrongpassword');
    await loginPage.clickSignIn();
  });

  test('empty fields', async ({ page }) => {
    await loginPage.clickSignIn();
  });

  test('password visibility toggle', async ({ page }) => {
    await loginPage.fillPassword('somepassword');
    await page.locator('button span.sr-only:has-text("Show password")').click();
  });

  test('remember me checkbox', async ({ page }) => {
    await loginPage.checkRememberMe();
    await expect(page.getByLabel('Remember me for 30 days')).toBeChecked();
  });

  test('forgot password link', async ({ page }) => {
    await page.getByRole('link', { name: /forgot password/i }).click();
  });
});