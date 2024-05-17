// CompanyOnboarding.ts
import { test, expect } from '@playwright/test';
import CompanyOnboardingPage from '../pages/CompanyOnboarding.page';

test('User can register company', async ({ page }) => {
  // Given
  const companyOnboardingPage = new CompanyOnboardingPage(page);

  // When
  await companyOnboardingPage.gotoCompanyOnboarding();
  await companyOnboardingPage.enterCompanyName();
  await companyOnboardingPage.enterCountry();
  await companyOnboardingPage.enterAddressLineOne();
  await companyOnboardingPage.enterAddressLineTwo();
  await companyOnboardingPage.enterState();
  await companyOnboardingPage.enterTown();
  await companyOnboardingPage.enterPostcode();
  await companyOnboardingPage.continueRegistration();

  // Then
})

test('User is notified of empty fields', async ({ page }) => {
  // Given
  const companyOnboardingPage = new CompanyOnboardingPage(page);

  // When
  await companyOnboardingPage.gotoCompanyOnboarding();

  await companyOnboardingPage.continueRegistration();

  // Then
  expect (await companyOnboardingPage.isUserNotifiedEmptyCompanyName()).toBe(true);
  expect (await companyOnboardingPage.isUserNotifiedEmptyCountry()).toBe(true);
})

test.afterEach( async ({page}) => 
  {
    await page.close();
  });