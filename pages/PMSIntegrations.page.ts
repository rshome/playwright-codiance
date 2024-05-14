import { Page } from 'playwright';

export default class PMSIntegrations {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToIntegrations()
    {
      //click settings dropdown and select Integrations
      await this.page.getByRole('button', { name: 'Settings' }).click();
      await this.page.getByRole('link', { name: 'Integrations Integrations New!' }).click();
    }

    async ConnectToIntegratedServices()
    {
      await this.page.getByLabel('Client ID').click();
      await this.page.getByLabel('Client ID').fill('clientId');
      await this.page.getByLabel('Client ID').press('Tab');
      await this.page.getByLabel('Client secret', { exact: true }).click();
      await this.page.getByLabel('Client secret', { exact: true }).fill('clientsecret');
      await this.page.getByLabel('Admin site').click();
      await this.page.getByLabel('Admin site').fill('admin');
      await this.page.locator('#OfficeRndSubmit').click();
      await this.page.getByLabel('Network ID').click();
      await this.page.getByLabel('Network ID').fill('networkId');
      await this.page.locator('#NexudusSubmit').click();
      await this.page.locator('#GoogleCalendarSubmit').click();
      await this.page.getByLabel('Application ID').click();
      await this.page.getByLabel('Application ID').fill('appId');
      await this.page.getByLabel('Application ID').press('Tab');
      await this.page.getByLabel('Directory ID').fill('dirId');
      await this.page.getByLabel('Directory ID').press('Tab');
      await this.page.getByLabel('Client Secret', { exact: true }).fill('clientsecret');
      await this.page.getByRole('button', { name: 'Connect', exact: true }).click();
    }

    async areServicesConnected(): Promise<boolean> {
      await this.page.waitForLoadState("networkidle");
      const buttons = await this.page.$$(`button:has-text('Disconnect')`);
      var bool = false;
      if (buttons.length == 4)
        {
          bool = true;
        }     
      return bool;
    }
  }
