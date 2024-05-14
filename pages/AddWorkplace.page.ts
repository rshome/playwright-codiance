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