// PMSIntegrations.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import PMSIntegrations from '../pages/PMSIntegrations.page';
import { Credentials } from '../pages/Credentials.ts';

test('User can integrate with third parties', async ({ page }) => {
  // Given
  const loginPage = new LoginPage(page);
  const pmsIntegrationsPage = new PMSIntegrations(page);
  await loginPage.navigate();
  await loginPage.enterUsername(Credentials.username);
  await loginPage.enterPassword(Credentials.password);
  await loginPage.clickLoginButton();
  expect (await loginPage.getWelcomeMessage()).toBe(true);

  // When
  await pmsIntegrationsPage.navigateToIntegrations();

  // Then
  expect (await pmsIntegrationsPage.areServicesConnected()).toBe(true);
  await page.close();
});