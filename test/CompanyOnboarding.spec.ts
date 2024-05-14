// CompanyOnboarding.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import CompanyOnboardingPage from '../pages/CompanyOnboarding.page';
import { Credentials } from '../pages/Credentials';

test('User can register company', async ({ page }) => {
  // Given
  const loginPage = new LoginPage(page);
  const companyOnboardingPage = new CompanyOnboardingPage(page);
  await loginPage.navigate();
  await loginPage.enterUsername(Credentials.username);
  await loginPage.enterPassword(Credentials.password);
  await loginPage.clickLoginButton();
  expect (await loginPage.getWelcomeMessage()).toBe(true);

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
  const loginPage = new LoginPage(page);
  const companyOnboardingPage = new CompanyOnboardingPage(page);
  await loginPage.navigate();
  await loginPage.enterUsername(Credentials.username);
  await loginPage.enterPassword(Credentials.password);
  await loginPage.clickLoginButton();
  expect (await loginPage.getWelcomeMessage()).toBe(true);

  // When
  await companyOnboardingPage.gotoCompanyOnboarding();

  await companyOnboardingPage.continueRegistration();

  // Then
  expect (await companyOnboardingPage.isUserNotifiedEmptyCompanyName()).toBe(true);
  expect (await companyOnboardingPage.isUserNotifiedEmptyCountry()).toBe(true);
});
