import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage
 * A small collection of shared helpers for page objects.
 * Extend this for consistent, readable page code.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Waits for network to be idle which is handy right after navigation or submit. */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Clicks an element robustly by text using accessible roles first, with a fallback. */
  async clickByText(text: string): Promise<void> {
    const byRole = this.page.getByRole('button', { name: text });
    if (await byRole.count()) {
      await byRole.first().click();
      return;
    }
    await this.page.getByText(text, { exact: true }).click();
  }

  /**
   * Selects an option from a custom or native dropdown associated with a label.
   * - Tries ARIA combobox/button patterns
   * - Falls back to native <select> by label
   */
  async selectByLabel(labelText: string, optionLabel: string): Promise<void> {
    const triggers: Locator[] = [
      this.page.getByRole('combobox', { name: new RegExp(labelText, 'i') }),
      this.page.getByRole('button', { name: new RegExp(labelText, 'i') }),
      this.page.getByText(labelText, { exact: false })
    ];

    for (const t of triggers) {
      if ((await t.count()) > 0 && (await t.first().isVisible())) {
        await t.first().click();
        const option = this.page.getByRole('option', { name: optionLabel, exact: true });
        if ((await option.count()) > 0) {
          await option.first().click();
          return;
        }
      }
    }

    const nativeSelect = this.page.getByLabel(labelText, { exact: false });
    if ((await nativeSelect.count()) > 0) {
      await nativeSelect.selectOption({ label: optionLabel });
      return;
    }

    // Final safety: try plain text option click
    await this.page.getByText(optionLabel, { exact: true }).click();
  }

  /** Simple existence assertion for fast sanity checks. */
  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}
