import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    const baseUrl = process.env.BASE_URL || 'https://farmdigits.outscalers.com/';
    await this.page.goto(baseUrl);
  }

  async openLoginForm() {
    await this.page.getByRole('link', { name: 'Sign In' }).click();
  }

  async fillEmail(email?: string) {
    const defaultEmail = process.env.LOGIN_EMAIL || 'musabajwa.18@gmail.com';
    await this.page.getByPlaceholder('your.email@example.com').fill(email || defaultEmail);
  }

  async fillPassword(password?: string) {
    const defaultPassword = process.env.LOGIN_PASSWORD || '09876543';
    await this.page.getByLabel('Password').fill(password || defaultPassword);
  }

  async checkRememberMe() {
    await this.page.getByLabel('Remember me for 30 days').check();
  }

  async clickSignIn() {
    await this.page.locator("button[aria-label='Login']").click();
  }

  async pause() {
    await this.page.pause();
  }
}