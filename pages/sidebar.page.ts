import { Page } from '@playwright/test';
import { BasePage } from './base.page';

/** Navigation helpers for the left sidebar. */
export class SidebarPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	/** Expands Livestock Management group. */
	async openLivestockManagement(): Promise<void> {
		await this.page.locator("span.w-\\[107\\%\\]").filter({ hasText: 'Livestock Management' }).click();
	}

	/** Clicks Animals menu item. */
	async openAnimals(): Promise<void> {
		await this.page.locator('div.font-medium').filter({ hasText: 'Animals' }).click();
	}

	/** Switches to Sheds tab within Animals. */
	async openShedsTab(): Promise<void> {
		await this.page.getByRole('tab', { name: 'Sheds' }).click();
	}
}
