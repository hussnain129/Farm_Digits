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
		const triggers = [
			this.page.getByRole('combobox', { name: /shed location/i }),
			this.page.getByRole('button', { name: /select location/i }),
			this.page.getByText('Select location', { exact: true }),
			this.page.getByLabel('Shed Location', { exact: false }),
		];

		let opened = false;
		for (const t of triggers) {
			if ((await t.count()) > 0 && (await t.first().isVisible())) {
				await t.first().click();
				opened = true;
				break;
			}
		}

		if (!opened) {
			const container = this.page.getByText('Shed Location', { exact: false }).locator('..').first();
			await container.locator('button,[role=button],[role=combobox],select').first().click();
		}

		await this.page.waitForSelector('[role="option"], [role="listbox"]', { timeout: 3000 }).catch(() => {});

		const optionByRole = this.page.locator('[role="option"]').filter({ hasText: label }).first();
		if ((await optionByRole.count()) > 0) {
			await optionByRole.scrollIntoViewIfNeeded();
			await optionByRole.click();
			return;
		}

		const expandedCombo = this.page.locator('[role="combobox"][aria-expanded="true"]');
		if ((await expandedCombo.count()) > 0) {
			await expandedCombo.first().pressSequentially(label, { delay: 20 });
			await this.page.keyboard.press('Enter');
			return;
		}

		const firstOption = this.page.locator('[role="option"]').first();
		if ((await firstOption.count()) > 0) {
			await firstOption.scrollIntoViewIfNeeded();
			await firstOption.click();
			return;
		}

		const nativeSelect = this.page.getByLabel('Shed Location', { exact: false });
		if ((await nativeSelect.count()) > 0) {
			await nativeSelect.selectOption({ label });
			return;
		}
	}

	async submit(): Promise<void> {
		await this.page.getByRole('button', { name: /^Add Animal$/i }).click();
	}

	async cancel(): Promise<void> {
		await this.page.getByRole('button', { name: 'Cancel' }).click();
	}
}
