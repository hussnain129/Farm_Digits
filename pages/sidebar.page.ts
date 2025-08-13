import { Page } from '@playwright/test';

export class SidebarPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async openLivestockManagement(): Promise<void> {
		await this.page.locator("span.w-\\[107\\%\\]").filter({ hasText: 'Livestock Management' }).click();
	}

	async openAnimals(): Promise<void> {
		await this.page.locator('div.font-medium').filter({ hasText: 'Animals' }).click();
	}

	async openShedsTab(): Promise<void> {
		await this.page.getByRole('tab', { name: 'Sheds' }).click();
	}
}
