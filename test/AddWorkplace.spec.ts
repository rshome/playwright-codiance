// AddWorkplace.ts
import { test, expect } from '@playwright/test';
import AddWorkplacePage from '../pages/AddWorkplace.page';
import { LoginPage } from '../pages/Login.page';
import { Credentials } from '../pages/Credentials';

interface ScenarioContext {
  rowCount?: number;
}

let scenarioContext: ScenarioContext = {};

test.beforeEach('User logs in', async({ page, browser }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.acceptCookies(page);
  //await loginPage.maximiseWindow();
  await loginPage.enterUsername(Credentials.username);
  await loginPage.enterPassword(Credentials.password);
  await loginPage.clickLoginButton();
  await loginPage.acceptCookies(page);
  await expect(page.locator('img[alt="Worka logo - Home"]')).toBeVisible();
});

test('User can add workplace', async ({ page, browser }) => {

    const addWorkPlacePage = new AddWorkplacePage(page)
  
    // Locate the table rows from workplace table
    const table = page.locator('.workplaces-table '); 

    const rows = table.locator('tbody tr[aria-rowindex]');
    // Get the count of rows
    const rowCount = await rows.count();
  
    // Store the row count in scenario context
    scenarioContext.rowCount = rowCount;

  // When
    expect (await addWorkPlacePage.isPartnerDropdownVisible()).toBe(true);
    await addWorkPlacePage.AddWorkplace();
    await addWorkPlacePage.ManuallyAddWorkplace();
    await addWorkPlacePage.Continue();
    expect(await addWorkPlacePage.isNextPageOfWizardVisible("1/6")).toBe(true);

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
    await page.waitForSelector('#WorkplaceWebsite');
    expect(await addWorkPlacePage.isNextPageOfWizardVisible("2/6")).toBe(true);

    // When
    await addWorkPlacePage.enterOpeningYear("1985");
    await addWorkPlacePage.enterWorkplaceDescription("Describe your building and workspace in a few sentences. What makes it unique? Include the key selling points but keep it as a continuous description – no bullet points or text copied from other websites please!")
    await addWorkPlacePage.enterWorkplaceDetails("Describe your building and workspace in a few sentences. What makes it unique? Include the key selling points but keep it as a continuous description – no bullet points or text copied from other websites please!")
    await addWorkPlacePage.Continue();

    //Then
    await page.waitForSelector('text="Amenities"');
    expect(await addWorkPlacePage.isNextPageOfWizardVisible("3/6")).toBe(true);

    //When
    await addWorkPlacePage.selectAmenity();
    await addWorkPlacePage.Continue();

    //Then
    await page.waitForSelector('text="Upload photos"');
    expect(await addWorkPlacePage.isNextPageOfWizardVisible("4/6")).toBe(true);

    await addWorkPlacePage.uploadPhoto();
    await addWorkPlacePage.enterPhotoDescription("Image 1 Description");
    await addWorkPlacePage.Continue();

    //Then
    await page.waitForSelector('text="Access hours"');
    expect(await addWorkPlacePage.isNextPageOfWizardVisible("5/6")).toBe(true);

    //bypass access hours page as none of the fields are mandatory
    await addWorkPlacePage.Continue();

    //when
    await page.waitForSelector('text="Contact details"');
    await addWorkPlacePage.enterSalesName("Sales Person");
    await addWorkPlacePage.enterSalesEmail("sales@codiance.com");
    await addWorkPlacePage.enterSalesPhone("07812 234455");
    await addWorkPlacePage.enterOperationalName("Operations Person");
    await addWorkPlacePage.enterOperationalEmail("operations@codiance.com");
    await addWorkPlacePage.enterOperationalPhone("07812 234456");
    await addWorkPlacePage.enterFinanceName("Finance Person");
    await addWorkPlacePage.enterFinanceEmail("finance@codiance.com");
    await addWorkPlacePage.enterFinancePhone("07812 234457");
    await addWorkPlacePage.Continue();

    await page.waitForSelector('img[alt="Worka logo - Home"]');

    // Locate the table rows from updated workplace table
    const updatedTable = page.locator('.workplaces-table '); 
    const updatedRows = table.locator('tbody tr[aria-rowindex]');

    // Get the updated count of rows
    const updatedRowsCount = await rows.count();

    //verify a new workplace row has been added
    expect(updatedRowsCount).toBe(rowCount + 1);
})

test('User is notified of empty fields', async ({ page }) => {
      // Given
      const addWorkPlacePage = new AddWorkplacePage(page);

      expect (await addWorkPlacePage.isPartnerDropdownVisible()).toBe(true);
      await addWorkPlacePage.AddWorkplace();
      await addWorkPlacePage.ManuallyAddWorkplace();
      await addWorkPlacePage.Continue();
      expect(await addWorkPlacePage.isNextPageOfWizardVisible("1/6")).toBe(true);

      // When
      await addWorkPlacePage.Continue();  //enter continue without entering any data

      // Then
      expect (await addWorkPlacePage.isUserNotifiedEmptyWorkplaceName()).toBe(true);
      expect (await addWorkPlacePage.isUserNotifiedEmptyAddressOne()).toBe(true);
      expect (await addWorkPlacePage.isUserNotifiedEmptyTownCity()).toBe(true);
      expect (await addWorkPlacePage.isUserNotifiedEmptyPostcode()).toBe(true);
      expect (await addWorkPlacePage.isUserNotifiedEmptyStateCountyProvince()).toBe(true);
      expect (await addWorkPlacePage.isUserNotifiedEmptyLatitude()).toBe(true);
      expect (await addWorkPlacePage.isUserNotifiedEmptyLongitude()).toBe(true);
})
