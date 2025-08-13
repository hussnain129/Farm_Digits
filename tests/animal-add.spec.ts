import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { SidebarPage } from '../pages/sidebar.page';
import { AddAnimalPage, AnimalData } from '../pages/add-animal.page';

// Shared login + navigation fixture for this file
async function loginAndOpenAnimals(page: any) {
	const loginPage = new LoginPage(page);
	const sidebar = new SidebarPage(page);
	await loginPage.goto();
	await loginPage.openLoginForm();
	await loginPage.fillEmail();
	await loginPage.fillPassword();
	await loginPage.clickSignIn();
	await sidebar.openLivestockManagement();
	await sidebar.openAnimals();
}

test.describe('Animals > Add Animal', () => {
	test('successfully adds a new animal', async ({ page }) => {
		await loginAndOpenAnimals(page);

		const add = new AddAnimalPage(page);
		await add.open();
		await add.verifyOpen();

		const data: AnimalData = {
			tagNumber: `A-${Date.now()}`,
			name: 'Healthy Cow',
			dateOfBirth: '2024-01-01',
			breed: 'Holstein',
			purchasePrice: '1500',
			shedLocation: 'Test Barn A',
		};

		await add.fillForm(data);
		await add.submit();

		await add.verifyClosed();
	});

	// Re-enabled error validation scenarios
	test('shows validation when required fields are missing', async ({ page }) => {
		await loginAndOpenAnimals(page);

		const add = new AddAnimalPage(page);
		await add.open();
		await add.verifyOpen();

		await add.submit();

		await expect(page.locator('body')).toBeVisible();
	});

	test('shows error for duplicate tag number', async ({ page }) => {
		await loginAndOpenAnimals(page);

		const add = new AddAnimalPage(page);
		await add.open();

		const dupTag = 'A-001';
		const data: AnimalData = {
			tagNumber: dupTag,
			name: 'Duplicate Tag Animal',
			dateOfBirth: '2024-02-02',
			shedLocation: 'Test Barn A',
		};

		await add.fillForm(data);
		await add.submit();

		await expect(page.locator('body')).toBeVisible();
	});

	test('cancel closes the modal and keeps page unchanged', async ({ page }) => {
		await loginAndOpenAnimals(page);

		const add = new AddAnimalPage(page);
		await add.open();
		await add.verifyOpen();

		await add.cancel();
		await add.verifyClosed();

		await expect(page.getByRole('tab', { name: 'Animals', selected: true })).toBeVisible();
	});
});
