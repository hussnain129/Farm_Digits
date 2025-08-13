import { Page, expect } from '@playwright/test';

export interface AnimalData {
	tagNumber: string;
	name: string;
	dateOfBirth: string; // yyyy-mm-dd
	breed?: string;
	purchasePrice?: string;
	shedLocation?: string; // exact option label
}

export class AddAnimalPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async open(): Promise<void> {
		await this.page.getByRole('tab', { name: 'Animals' }).click();
		await this.page.locator('span', { hasText: 'Add Animal' }).click();
	}

	async verifyOpen(): Promise<void> {
		await expect(this.page.getByText('Add New Animal')).toBeVisible();
	}

	async verifyClosed(): Promise<void> {
		await expect(this.page.getByText('Add New Animal')).not.toBeVisible();
	}

	async fillForm(data: AnimalData): Promise<void> {
		await this.page.getByPlaceholder('e.g., A-001').fill(data.tagNumber);
		await this.page.getByPlaceholder('Animal name').fill(data.name);
		await this.page.locator('#date_of_birth').fill(data.dateOfBirth);
		if (data.breed) {
			await this.page.getByPlaceholder('e.g., Holstein').fill(data.breed);
		}
		if (data.purchasePrice) {
			await this.page.getByPlaceholder('Enter purchase price').fill(data.purchasePrice);
		}
		if (data.shedLocation) {
			await this.selectShedLocation(data.shedLocation);
		}
	}

	async selectShedLocation(label: string): Promise<void> {
		await this.page.getByRole('button', { name: 'Select location' }).click();
		await this.page.getByRole('option', { name: label, exact: true }).click();
	}

	async submit(): Promise<void> {
		await this.page.getByRole('button', { name: /^Add Animal$/i }).click();
	}

	async cancel(): Promise<void> {
		await this.page.getByRole('button', { name: 'Cancel' }).click();
	}
}
