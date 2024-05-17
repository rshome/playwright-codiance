import { Page } from 'playwright';
import { Credentials } from './Credentials';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto(Credentials.loginUrl);        
    }

    async enterUsername(username: string) {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('input[type="email"]').isEditable();
        await this.page.focus('input[type="email"]');
        await this.page.fill('input[type="email"]', '');
        await this.page.fill('input[type="email"]', username);
    }

    async enterPassword(password: string) {
        await this.page.locator('input[type="password"]').isVisible();
        await this.page.fill('input[type="password"]', password);
    }

    async clickLoginButton() {  
        const loginButton = await this.page.locator(`button[type="button"]`);;
        await loginButton?.click();
        await this.page.goForward();
    }

    async getWelcomeMessage(): Promise<boolean> {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('#NavPartnerSelector');
        var bool = await this.page.getByText("You are authorized!").isVisible();
        return bool;
    }
}
