import { Page, expect } from '@playwright/test';

export interface ShedData {
  name: string;
  description: string;
  capacity: string;
  isActive: boolean;
}

export class AddShedPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openAddShedForm() {
    await this.page.locator("span").filter({ hasText: 'Add Shed' }).click();
  }

  async fillShedForm(shedData: ShedData) {
    await this.page.getByPlaceholder('e.g., Barn D or Field 3').fill(shedData.name);
    await this.page.getByPlaceholder('Enter a description of this location').fill(shedData.description);
    await this.page.getByPlaceholder('Maximum number of animals').fill(shedData.capacity);
    
    if (shedData.isActive) {
      const activeField = this.page.locator('text=Active').locator('..').locator('select, input, button').first();
      if (await activeField.count() > 0) {
        await activeField.click();
        await this.page.getByText('Active').click();
      }
    }
  }

  async submitForm() {
    await this.page.getByRole('button', { name: 'Add Location' }).click();
  }

  async cancelForm() {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }

  async verifyModalClosed() {
    await expect(this.page.getByText('Add Shed Location')).not.toBeVisible();
  }

  async verifyModalOpen() {
    await expect(this.page.getByText('Add Shed Location')).toBeVisible();
  }

  async expectErrorContains(text: string) {
    const alert = this.page.getByRole('alert');
    if (await alert.count()) {
      await expect(alert.getByText(text, { exact: false })).toBeVisible();
      return;
    }
    await expect(this.page.getByText(text, { exact: false })).toBeVisible();
  }

  async expectShedVisibleInList(name: string) {
    await expect(this.page.getByRole('row').filter({ hasText: name }).first()).toBeVisible({ timeout: 8000 });
  }
}
