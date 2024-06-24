import { test, expect } from '@playwright/test';
import StartingPage from '../pages/starting.page';
import LoginPage from '../pages/login.page';
import DevStorePage from '../pages/devStore.page';
import AppointmentPage from '../pages/appointment.page';

test.describe('Login Tests', () => {
    let startPage: StartingPage;
    let loginPage: LoginPage;
    let devStorePage: DevStorePage;
    let appointmentPage: AppointmentPage;

    // hook beforeEach 
    test.beforeEach(async ({ page, baseURL }) => {

        //pages initilization 
        startPage = new StartingPage(page);
        loginPage = new LoginPage(page);
        devStorePage = new DevStorePage(page);
        appointmentPage = new AppointmentPage(page);
   
        await page.goto(`${baseURL}/login-continue?client_id=diwa`);
        await startPage.clickWeitermachenButton();
    
        //check if the redirection to the login page have success by use the URL PART 
        const expectedLoginUrlPart = 'https://fielmann-test.lt-einfachanstellen.de/sso/u/login/';
        await startPage.checkLoginURL(expectedLoginUrlPart);

        //enter the login data and click on Login button
        await loginPage.inputEmail('andriy.kobzar@fielmann.com');
        await loginPage.inputPassword('l1netw5t');
        await loginPage.clickAnmeldenButton();

        //check if the redirection to the devstore page have success
        const expectedDevStoreUrl = "https://fielmann-test.lt-einfachanstellen.de/diwa/";
        await loginPage.checkDevStoreURL(expectedDevStoreUrl);

        //click on the booking menu
        await  devStorePage.clickOnBookingCalendarButton();

        // check if we are on the booking page
        const expectedBookingUrlPart = "https://lt-booking-fielmann-test.lt-einfachanstellen.de/calendar";
        await devStorePage.checkBookingURL(expectedBookingUrlPart);
    });

    test("Add Eye Exam appointment", async({page}) => {

        //click on the Add new Appointment button
        await appointmentPage.addNewAppointmentClick();

        //choose the Eye Exam and Mr buttons
        await appointmentPage.chooseEyeExamAndMr();

        //Last, First name and Phone number input
        await appointmentPage.inputLastName("George")
        await appointmentPage.inputFirstName("Bush")
        await appointmentPage.inputPhoneNumber("09811111111")

        //click on show all time
        await appointmentPage.ShowAllTimeClick();

        //choose the time
        await appointmentPage.chooseTime();

        //click on Add new Appointment
        await appointmentPage.appointmentButtonClick();

        //URL validation
        const expectedAppointmentURL = "https://lt-booking-fielmann-test.lt-einfachanstellen.de/calendar"
        await appointmentPage.checkAppointmentPage(expectedAppointmentURL)

        //add elements validation
    });

});