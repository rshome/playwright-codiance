import { test as setup, expect } from '@playwright/test';
import { Credentials } from '../pages/Credentials';
import { LoginPage } from '../pages/Login.page';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto(Credentials.loginUrl);
  
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.enterUsername(Credentials.username);
  await loginPage.enterPassword(Credentials.password);
  await loginPage.clickLoginButton();
  expect (await loginPage.getWelcomeMessage()).toBe(true);
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});