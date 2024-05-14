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

  await addWorkPlacePage.enterAddressLineOne("1 Test Road");
  await addWorkPlacePage.enterAddressLineTwo("Bushey");
  await addWorkPlacePage.enterTown("Testford");
  await addWorkPlacePage.enterState("Testfordshire");
  await addWorkPlacePage.enterPostcode("TS2 TST");
  await addWorkPlacePage.enterLatitude("-0.34345");
  await addWorkPlacePage.enterLongitude("3.454545");
  await addWorkPlacePage.Continue();

  // Then
})

test('User is notified of empty fields', async ({ page }) => {
  // Given
  const loginPage = new LoginPage(page);
  const addWorkPlacePage = new AddWorkplacePage(page);
  await loginPage.navigate();
  await loginPage.enterUsername(Credentials.username);
  await loginPage.enterPassword(Credentials.password);
  await loginPage.clickLoginButton();
  expect (await loginPage.getWelcomeMessage()).toBe(true);

  // When


  // Then
  //expect (await companyOnboardingPage.isUserNotifiedEmptyCompanyName()).toBe(true);
  //expect (await companyOnboardingPage.isUserNotifiedEmptyCountry()).toBe(true);
});
