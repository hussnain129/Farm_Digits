import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { SidebarPage } from '../pages/sidebar.page';
import { AddAnimalPage, AnimalData } from '../pages/add-animal.page';

test('add new animal from Animals page', async ({ page }) => {
	const loginPage = new LoginPage(page);
	const sidebar = new SidebarPage(page);
	const addAnimal = new AddAnimalPage(page);

	await loginPage.goto();
	await loginPage.openLoginForm();
	await loginPage.fillEmail();
	await loginPage.fillPassword();
	await loginPage.clickSignIn();

	await sidebar.openLivestockManagement();
	await sidebar.openAnimals();

	await addAnimal.open();
	await addAnimal.verifyOpen();

	const data: AnimalData = {
		tagNumber: `A-${Date.now()}`,
		name: 'Test Animal',
		dateOfBirth: '2024-01-01',
		breed: 'Holstein',
		purchasePrice: '1200',
		shedLocation: 'Test Barn A'
	};

	await addAnimal.fillForm(data);
	await addAnimal.submit();
	await page.pause();
});
