import { Page } from 'playwright';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto("/Login?returnUrlToken=aHR0cHM6Ly9wYXJ0bmVyLXBvcnRhbC1hcHAtZXUtd2VzdC0xLmRldi53b3JrYS50ZWNo&clientIdToken=cGFydG5lci1wb3J0YWwtYXBwbGljYXRpb24%3d");        
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
