// createStripeAccount.ts
import { test, expect } from '@playwright/test';
import StripeOnboarding from '../pages/StripeOnboarding.page';

test('User can create Stripe Account', async ({ page }) => {
  // Given
  const stripePage = new StripeOnboarding(page);

  // When
  await stripePage.clickStripePage();
  await stripePage.clickPaymentSetup();
  await stripePage.connectWithStripe();

  // Then
 expect (await stripePage.isStripeOnboardingSuccessful()).toBe(true);
});

test.afterEach( async ({page}) => 
  {
    await page.close();
  })
