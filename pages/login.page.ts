import { Page,expect} from "@playwright/test";

export default class LoginPage {
    constructor(public page: Page) {}

    // Input email
    async inputEmail(emailAddress: string) {
        await this.page.locator("#email").fill(emailAddress);
    }

    // Input password
    async inputPassword(password: string) {
        await this.page.locator("#typePassword").fill(password);
    }

    // Click on login button
    async clickAnmeldenButton() {
        await this.page.click('button.btn.btn-primary');
    }

    // Check the Login URL
    async checkDevStoreURL(expectedDevStoreURL:string){
        const currentUrl = this.page.url()
        expect (currentUrl).toBe(expectedDevStoreURL)
    }
}
