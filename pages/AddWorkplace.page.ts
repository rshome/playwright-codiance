// AddWorkplacePage.ts
import { Page } from 'playwright';
import * as path from 'path';

export default class AddWorkplacePagePage {
  
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async AddWorkplace()
  {
    await this.page.locator("#addworkplaceButton").click();
  }

  async ManuallyAddWorkplace()
  {
    await this.page.locator("#goToAddWorkplaceBtn").click();
  }

  async Continue()
  {
      await this.page.locator("#nextButton").click();
  }

  async enterWorkplaceName()
  {
    const randomNumber: number = Math.random();
    await this.page.fill('#WorkplaceName', "TestCompany-" + randomNumber);
  }

  async enterAddressLineOne(strAddress1: string)
  {
    await this.page.fill('#AddressLine1', strAddress1);
  }

  async enterAddressLineTwo(strAddress2: string)
  {
    await this.page.fill('#AddressLine2', strAddress2);
  }

  async enterTown(strCity: string)
  {
    await this.page.fill('#City', strCity);
  }

  async enterState(strState: string)
  {
    await this.page.fill('#State', strState);
  }

  async enterPostcode(strPostcode: string)
  {
    await this.page.fill('#PostCode', strPostcode);
  }

  async enterLatitude(strLatitude: string)
  {
    await this.page.fill('#Latitude', strLatitude);
  }

  async enterLongitude(strLongitude: string)
  {
    await this.page.fill('#Longitude', strLongitude);
  }

  async enterOpeningYear(strOpeningYear: string)
  {
    await this.page.fill('#WorkplaceOpeningYear', strOpeningYear);
  }

  async enterWorkplaceDescription(strDescription: string)
  {
    await this.page.fill('#WorkplaceBuildingDetails', strDescription);
  }

  async enterWorkplaceDetails(strDetails: string)
  {
    await this.page.fill('#WorkplaceAreaDetails', strDetails);
  }

  async selectAmenity()
  {
      // Locate all checkboxes on the page 
  const checkboxes = this.page.locator('input[type="checkbox"]');

  // Get the total number of checkboxes
  const checkboxCount = await checkboxes.count();
  console.log(`Total checkboxes found: ${checkboxCount}`);

  if (checkboxCount === 0) {
    console.log('No checkboxes found.');
    return;
  }

  let checkboxSelected = false;
  let attempts = 0;

  while (!checkboxSelected && attempts < 5) {  // Retry up to 5 times
    // Select a random index
    const randomIndex = Math.floor(Math.random() * checkboxCount);
    const randomCheckbox = checkboxes.nth(randomIndex);

    // Check if the checkbox is already selected
    const isSelected = await randomCheckbox.isChecked();
    if (!isSelected) {
      // Click the checkbox if not already selected
      await randomCheckbox.click();
      console.log(`Checkbox at index ${randomIndex} selected.`);
    }

    // Check if the checkbox is selected after clicking
    checkboxSelected = await randomCheckbox.isChecked();
    if (!checkboxSelected) {
      console.log(`Retrying... Checkbox at index ${randomIndex} not selected.`);
    }

    attempts++;
  }
  }

  async uploadPhoto()
  {
    const fileInputSelector = 'input[type="file"]';

    // Specify the local file path to the photo
    const filePath = path.resolve(process.cwd(), '../Playwright/Images/Image1.jpg');

    // Set the file in the file input element
    await this.page.setInputFiles(fileInputSelector, filePath);
  }

  async enterPhotoDescription(strPhotoDescription)
  {
    await this.page.fill('#PhotoDescriptionTextBox1', strPhotoDescription);
  }

  async enterSalesName(strSalesName)
  {
    await this.page.fill('#SalesFullname', strSalesName);
  }

  async enterSalesEmail(strSalesEmail)
  {
    await this.page.fill('#SalesEmail', strSalesEmail);
  }

  async enterSalesPhone(strSalesPhone)
  {
    await this.page.fill('#SalesPhone', strSalesPhone);
  }

  async enterOperationalName(strOperationalName)
  {
    await this.page.fill('#OperationalFullname', strOperationalName);
  }

  async enterOperationalEmail(strOperationalEmail)
  {
    await this.page.fill('#OperationalEmail', strOperationalEmail);
  }

  async enterOperationalPhone(strOperationalPhone)
  {
    await this.page.fill('#OperationalPhone', strOperationalPhone);
  }

  async enterFinanceName(strFinanceName)
  {
    await this.page.fill('#FinanceFullname', strFinanceName);
  }

  async enterFinanceEmail(strFinanceEmail)
  {
    await this.page.fill('#FinanceEmail', strFinanceEmail);
  }

  async enterFinancePhone(strFinancePhone)
  {
    await this.page.fill('#FinancePhone', strFinancePhone);
  }

  async clickContinue()
  {
    await this.page.locator("#nextButton").click();
  }

  async isUserNotifiedEmptyWorkplaceName(): Promise<boolean>{
    var bool = await this.page.getByText('Workplace name is mandatory').isVisible();
    return bool;
  }

  async isUserNotifiedEmptyAddressOne(): Promise<boolean>{
    var bool = await this.page.getByText('Address line 1 is mandatory').isVisible();
    return bool;
  }

  async isUserNotifiedEmptyTownCity(): Promise<boolean>{
    var bool = await this.page.getByText('Town / City is mandatory').isVisible();
    return bool;
  }

  async isUserNotifiedEmptyStateCountyProvince(): Promise<boolean>{
    var bool = await this.page.getByText('State / County / Province is mandatory').isVisible();
    return bool;
  }

  async isUserNotifiedEmptyPostcode(): Promise<boolean>{
    var bool = await this.page.getByText('Post code / Zip code is mandatory').isVisible();
    return bool;
  }

  async isUserNotifiedEmptyLatitude(): Promise<boolean>{
    var bool = await this.page.getByText('Latitude is mandatory').isVisible();
    return bool;
  }

  async isUserNotifiedEmptyLongitude(): Promise<boolean>{
    var bool = await this.page.getByText('Longitude is mandatory').isVisible();
    return bool;
  }

  async isNextPageOfWizardVisible(step): Promise<boolean> {
    const heading = await this.page.locator('h1.worka-heading.m-0.me-4[b-lj9djcb5p2]');
    const textValue = await heading.textContent();
    var check = false; 
    if (textValue === step)
      {
        check = true;
      }
    return check;
  }

  async isWorkplaceButtonVisible(): Promise<boolean> {
    await this.page.waitForSelector('#addworkplaceButton');
    var bool = await this.page.getByText("Add workplace").isVisible();
    return bool;
  }

  async isPartnerDropdownVisible(): Promise<boolean> {
    await this.page.waitForSelector(`#NavPartnerSelector`);
    var bool = await this.page.getByAltText("Worka logo - Home").isVisible();
    return bool;
  }

  async VerifyWorkplaceCreated(rowCount): Promise<boolean> {

  var bool = false;

  // Locate the table rows from workplace tabel
  const table = this.page.locator('.workplaces-table '); 
  const rows = table.locator('tbody tr[aria-rowindex]');

  // Get the count of rows
  const rowsCount = await rows.count();

  // Verify the row count
  expect(rowsCount).toBe(rowCount + 1);

  return bool;
  }

  async isAmenitiesErrorDisplayed(): Promise<boolean>{
    var bool = await this.page.getByText('At least one amenity must be selected').isVisible();
    return bool;
  }
}
