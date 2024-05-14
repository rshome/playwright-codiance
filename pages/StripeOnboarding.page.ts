// StripeOnboardingPage.ts
import { Page } from 'playwright';

export default class StripeOnboardingPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickStripePage()
  {
    
    //click settings dropdown and select Payments
    var settings = await this.page.$('a#SettingsNavLink');
    settings?.click();
    var payments = await this.page.$('a#PaymentsNavLink');
    payments?.click();
  }

  async clickPaymentSetup() {
    await this.page.getByText('Payment Setup').click();
  }

  async connectWithStripe()
  {
    var stripeButton = await this.page.getByRole("button");
    stripeButton.dblclick();
  }

  async isStripeOnboardingSuccessful(): Promise<boolean>{
    var bool = await this.page.getByText('Stripe Documentation' ).isVisible();
    return bool;
  }
}