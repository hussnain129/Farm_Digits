import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { SidebarPage } from '../pages/sidebar.page';
import { AddShedPage, ShedData } from '../pages/add-shed.page';

const uniqueName = `Auto Shed ${Date.now()}`;

test.describe('Sheds', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const sidebar = new SidebarPage(page);
    await login.goto();
    await login.openLoginForm();
    await login.fillEmail();
    await login.fillPassword();
    await login.clickSignIn();
    await sidebar.openLivestockManagement();
    await sidebar.openAnimals();
    await sidebar.openShedsTab();
  });

  test('add shed successfully', async ({ page }) => {
    const sheds = new AddShedPage(page);
    await sheds.openAddShedForm();
    await sheds.verifyModalOpen();

    const data: ShedData = { name: uniqueName, description: 'auto', capacity: '10', isActive: true };
    await sheds.fillShedForm(data);
    await sheds.submitForm();

    await sheds.expectShedVisibleInList(uniqueName);
  });

  test('duplicate shed name shows error', async ({ page }) => {
    const sheds = new AddShedPage(page);
    await sheds.openAddShedForm();
    await sheds.fillShedForm({ name: 'Test Barn A', description: 'dup', capacity: '5', isActive: true });
    await sheds.submitForm();

    await sheds.expectErrorContains('already exists');
  });
});
