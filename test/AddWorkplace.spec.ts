// AddWorkplace.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import AddWorkplacePage from '../pages/AddWorkplace.page';
import { Credentials } from '../pages/Credentials';

test('User can add workplace', async ({ page }) => {
  // Given
  const loginPage = new LoginPage(page);
  const addWorkPlacePage = new AddWorkplacePage(page);
  await loginPage.navigate();
  await loginPage.enterUsername(Credentials.username);
  await loginPage.enterPassword(Credentials.password);
  await loginPage.clickLoginButton();
  expect (await loginPage.getWelcomeMessage()).toBe(true);

  // When
  expect (await addWorkPlacePage.isWorkplaceButtonVisible()).toBe(true);
  await addWorkPlacePage.AddWorkplace();
  await addWorkPlacePage.Continue();

  await addWorkPlacePage.enterWorkplaceName();

  await addWorkPlacePage.enterAddressLineOne();
  await addWorkPlacePage.enterAddressLineTwo();
  await addWorkPlacePage.enterTown();
  await addWorkPlacePage.enterState();
  await addWorkPlacePage.enterPostcode();
  await addWorkPlacePage.enterLatitude();
  await addWorkPlacePage.enterLongitude();
  await addWorkPlacePage.Continue();

  // Then
})

test('User is notified of empty fields', async ({ page }) => {
  // Given
  const loginPage = new LoginPage(page);
  const addWorkPlacePage = new AddWorkplacePage(page);
  await loginPage.navigate();
  await loginPage.enterUsername("test+automatedManageUser@codiance.com");
  await loginPage.enterPassword("Test2468@");
  await loginPage.clickLoginButton();
  expect (await loginPage.getWelcomeMessage()).toBe(true);

  // When


  // Then
  //expect (await companyOnboardingPage.isUserNotifiedEmptyCompanyName()).toBe(true);
  //expect (await companyOnboardingPage.isUserNotifiedEmptyCountry()).toBe(true);
});
