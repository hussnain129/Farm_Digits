import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/** LoginPage encapsulates actions on the login flow. */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /** Opens the app base URL. */
  async goto() {
    const baseUrl = process.env.BASE_URL || 'https://farmdigits.outscalers.com/';
    await this.page.goto(baseUrl);
  }

  /** Opens the Sign In form from the navbar. */
  async openLoginForm() {
    await this.page.getByRole('link', { name: 'Sign In' }).click();
  }

  /** Fills the email. Uses env fallback to keep tests portable. */
  async fillEmail(email?: string) {
    const defaultEmail = process.env.LOGIN_EMAIL || 'musabajwa.18@gmail.com';
    await this.page.getByPlaceholder('your.email@example.com').fill(email || defaultEmail);
  }

  /** Fills the password. Uses env fallback to keep tests portable. */
  async fillPassword(password?: string) {
    const defaultPassword = process.env.LOGIN_PASSWORD || '09876543';
    await this.page.getByLabel('Password').fill(password || defaultPassword);
  }

  /** Optional UX: checks Remember me. */
  async checkRememberMe() {
    await this.page.getByLabel('Remember me for 30 days').check();
  }

  /** Submits login. */
  async clickSignIn() {
    await this.page.locator("button[aria-label='Login']").click();
  }
}