// createStripeAccount.ts
import { test, expect } from '@playwright/test';
import StripeOnboarding from '../pages/StripeOnboarding.page';
import { LoginPage } from '../pages/Login.page';

test('User can create Stripe Account', async ({ page }) => {
  // Given
  const loginPage = new LoginPage(page);
  const stripePage = new StripeOnboarding(page);
  await loginPage.navigate();
  await loginPage.enterUsername("test+automatedManageUser@codiance.com");
  await loginPage.enterPassword("Test2468@");
  await loginPage.clickLoginButton();
  expect (await loginPage.getWelcomeMessage()).toBe(true);

  
  // When
  await stripePage.clickStripePage();
  await stripePage.clickPaymentSetup();
  await stripePage.connectWithStripe();

  // Then
 expect (await stripePage.isStripeOnboardingSuccessful()).toBe(true);
});
