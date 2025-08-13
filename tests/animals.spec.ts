import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AddShedPage, ShedData } from '../pages/add-shed.page';

const testShedData: ShedData = {
  name: 'Test Barn A',
  description: 'This is a test barn for automation testing',
  capacity: '50',
  isActive: true
};

const cancelShedData: ShedData = {
  name: 'Cancel Test Barn',
  description: 'This will be cancelled',
  capacity: '25',
  isActive: false
};

test.describe('Animals and Shed Management', () => {
  let loginPage: LoginPage;
  let addShedPage: AddShedPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    addShedPage = new AddShedPage(page);
    
    await loginPage.goto();
    await loginPage.openLoginForm();
    await loginPage.fillEmail();
    await loginPage.fillPassword();
    await loginPage.clickSignIn();

    await page.locator("span.w-\\[107\\%\\]").filter({ hasText: 'Livestock Management' }).click();
    await page.locator("div.font-medium").filter({ hasText: 'Animals' }).click();
    await page.getByRole('tab', { name: 'Sheds' }).click();
  });

  test('add new shed successfully', async ({ page }) => {
    await addShedPage.openAddShedForm();
    await addShedPage.verifyModalOpen();
    await addShedPage.fillShedForm(testShedData);
    await addShedPage.submitForm();
    await page.pause();
  });

  test('cancel add shed form', async ({ page }) => {
    await addShedPage.openAddShedForm();
    await addShedPage.verifyModalOpen();
    await addShedPage.fillShedForm(cancelShedData);
    await addShedPage.cancelForm();
    await addShedPage.verifyModalClosed();
  });

  test('add shed with different data', async ({ page }) => {
    const customShedData: ShedData = {
      name: 'Custom Field 1',
      description: 'A custom field for testing',
      capacity: '100',
      isActive: true
    };

    await addShedPage.openAddShedForm();
    await addShedPage.fillShedForm(customShedData);
    await addShedPage.submitForm();
    await page.pause();
  });
});
