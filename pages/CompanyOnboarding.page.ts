// CompanyOnboardingPage.ts
import { Page } from 'playwright';

const randomNumber = Math.floor(Math.random() * 9000) + 1000;

export default class CompanyOnboardingPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoCompanyOnboarding()
  {
      const currentUrl = await this.page.url();
      const newUrl = 'companyonboardingdetails';
      await this.page.goto(currentUrl + newUrl);
  }

  async enterCompanyName()
  {
    await this.page.fill('#CompanyNameInput', "TestCompany- " + randomNumber);
  }

  async enterCountry()
  {
    await this.page.locator('#CountrySelect').click();
    await this.page.locator('[aria-label="United Kingdom"]').click();
  }

  async enterAddressLineOne()
  {
    await this.page.fill('#AddressLine1Input', '1 Test Road');
  }

  async enterAddressLineTwo()
  {
    await this.page.fill('#AddressLine2Input', 'Bushey');
  }

  async enterState()
  {
    await this.page.fill('#StateInput', 'Testfordshire');
  }

  async enterTown()
  {
    await this.page.fill('#CityInput', 'Testfordshire');
  }

  async enterPostcode()
  {
    await this.page.fill('#PostalCodeInput', 'TS2 TST');
  }

  async continueRegistration()
  {
    await this.page.locator('button[type="submit"]').click();
  }

  async isUserNotifiedEmptyCompanyName(): Promise<boolean>{
    var bool = await this.page.getByText('You must fill in your company name to continue').isVisible();
    return bool;
  }

  async isUserNotifiedEmptyCountry(): Promise<boolean>{
    var bool = await this.page.getByText('You must select a country to continue').isVisible();
    return bool;
  }
}