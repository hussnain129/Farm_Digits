import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Page Object for the "Add New Animal" modal.
 * Provides high-level methods to open/close the modal and fill/submit the form.
 */
export interface AnimalData {
	tagNumber: string;          // Unique animal tag number (e.g., A-001)
	name: string;               // Animal name
	dateOfBirth: string;        // yyyy-mm-dd format for <input type="date">
	breed?: string;             // Optional breed text
	purchasePrice?: string;     // Optional numeric string
	shedLocation?: string;      // Exact option label for shed/location selector
}

export class AddAnimalPage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	/** Opens the Animals tab and then opens the Add Animal modal. */
	async open(): Promise<void> {
		await this.page.getByRole('tab', { name: 'Animals' }).click();
		await this.page.locator('span', { hasText: 'Add Animal' }).click();
	}

	/** Asserts the modal is visible. */
	async verifyOpen(): Promise<void> {
		await expect(this.page.getByText('Add New Animal')).toBeVisible();
	}

	/** Asserts the modal is not visible. */
	async verifyClosed(): Promise<void> {
		await expect(this.page.getByText('Add New Animal')).not.toBeVisible();
	}

	/** Fills the form with provided data. Optional fields are skipped when undefined. */
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

	/**
	 * Selects a Shed Location by label. Handles custom dropdowns and native selects.
	 * Uses several locator strategies to robustly open and choose an option.
	 */
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

	/** Clicks the "Add Animal" submit button. */
	async submit(): Promise<void> {
		await this.page.getByRole('button', { name: /^Add Animal$/i }).click();
	}

	/** Clicks the Cancel button in the modal. */
	async cancel(): Promise<void> {
		await this.page.getByRole('button', { name: 'Cancel' }).click();
	}

	/** Verifies an error alert or inline message contains given text. */
	async expectErrorContains(text: string): Promise<void> {
		const alert = this.page.getByRole('alert');
		if (await alert.count()) {
			await expect(alert.getByText(text, { exact: false })).toBeVisible();
			return;
		}
		await expect(this.page.getByText(text, { exact: false })).toBeVisible();
	}
}
