import { Page, expect } from "@playwright/test";

export default class StartingPage {
    constructor(public page: Page) {}

    // Locators
    WeitermachenButton = () => this.page.getByRole('link', { name: 'Weitermachen' });
    
    // Actions
    async clickWeitermachenButton() {
        await this.WeitermachenButton().click();
    }

    async checkLoginURL(expectedLoginUrlPart: string) {
        const currentUrl = this.page.url();
        expect(currentUrl).toContain(expectedLoginUrlPart);
    }
}
