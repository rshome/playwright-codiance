import { Page } from 'playwright';
import { Credentials } from './Credentials';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        var loginUrl = Credentials.loginUrl;
        await this.page.goto(loginUrl);
    }

    async maximiseWindow()
    {
        await this.page.setViewportSize({ width: 1920, height: 1080 });
    }

    async acceptCookies(page: Page)
    {
            // Define the selector for the "Accept Cookies" button
    const acceptButtonSelector = 'button:has-text("Accept all")';

    // Wait for the cookies dialog or button to appear
    await page.waitForSelector(acceptButtonSelector, { timeout: 5000 })
        .catch(() => console.log("No cookies dialog found within timeout."));

    // Wait for the cookies dialog to appear if present, with a short timeout
    const acceptButton = await this.page.$(acceptButtonSelector);
    if (acceptButton) {
        console.log("Cookies button found, clicking to accept.");
        await acceptButton.click();
    } else {
        console.log("No cookies dialog found.");
    }
    }

    async enterUsername(username: string) {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('input[id="UsernameId"]').isEditable();
        await this.page.fill('input[id="UsernameId"]', username);
    }

    async enterPassword(password: string) {
        await this.page.locator('input[id="Password"]').isVisible();
        await this.page.fill('input[id="Password"]', password);
    }

    async clickLoginButton() {  
        const loginButton = await this.page.locator(`button[id="signInButton"]`);;
        await loginButton?.click();
        await this.page.goForward();
    }
}
