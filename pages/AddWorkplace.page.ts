// AddWorkplacePage.ts
import { Page } from 'playwright';

export default class AddWorkplacePagePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async AddWorkplace()
  {
    await this.page.locator("#addworkplaceButton").click();
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

  async enterAddressLineOne()
  {
    await this.page.fill('#AddressLine1', '1 Test Road');
  }

  async enterAddressLineTwo()
  {
    await this.page.fill('#AddressLine2', 'Bushey');
  }

  async enterTown()
  {
    await this.page.fill('#City', 'Testfordshire');
  }

  async enterState()
  {
    await this.page.fill('#State', 'Testfordshire');
  }

  async enterPostcode()
  {
    await this.page.fill('#PostCode', 'TS2 TST');
  }

  async enterLatitude()
  {
    await this.page.fill('#Latitude', '-0.44546');
  }

  async enterLongitude()
  {
    await this.page.fill('#Longitude', '1.45654');
  }

  async clickContinue()
  {
    await this.page.locator("#nextButton").click();
  }


  async isUserNotifiedEmptyCompanyName(): Promise<boolean>{
    var bool = await this.page.getByText('You must fill in your company name to continue').isVisible();
    return bool;
  }

  async isUserNotifiedEmptyCountry(): Promise<boolean>{
    var bool = await this.page.getByText('You must select a country to continue').isVisible();
    return bool;
  }

  async isWorkplaceButtonVisible(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector('#addworkplaceButton');
    var bool = await this.page.getByText("Add workplace").isVisible();
    return bool;
  }
}