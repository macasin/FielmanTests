import { Page, expect } from "@playwright/test";


export default class DevStorePage{
    
    constructor(public page: Page) {}

        //click on booking calendar button
    async clickOnBookingCalendarButton(){
        await this.page.click("(//button[contains(@class,'MuiButtonBase-root MuiIconButton-root')])[3]");

    }

    // Check if the current URL contains the expected part
    async checkBookingURL(expectedBookingUrlPart: string) {
        //wait for valid URL before test it
        await this.page.waitForURL(url => url.toString().includes(expectedBookingUrlPart), { timeout: 10000 });

        //the URL test
        const currentUrl = this.page.url();
        expect(currentUrl).toContain(expectedBookingUrlPart);
    }

    
}

