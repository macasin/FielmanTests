import { test, expect } from '@playwright/test';
import StartingPage from '../pages/starting.page';
import LoginPage from '../pages/login.page';
import DevStorePage from '../pages/diwa.page';
import AppointmentPage from '../pages/calendar.page';
import DiwaPage from '../pages/diwa.page';
import CalendarPage from '../pages/calendar.page';

test.describe('Login Tests', () => {
    let startPage: StartingPage;
    let loginPage: LoginPage;
    let diwaPage: DiwaPage;
    let calendarPage: CalendarPage;

    // hook beforeEach 
    test.beforeEach(async ({ page, baseURL }) => {

        //pages initilization 
        startPage = new StartingPage(page);
        loginPage = new LoginPage(page);
        diwaPage = new DevStorePage(page);
        calendarPage = new CalendarPage(page);
   
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
        await  diwaPage.clickOnBookingCalendarButton();

        // check if we are on the booking page
        const expectedBookingUrlPart = "https://lt-booking-fielmann-test.lt-einfachanstellen.de/calendar";
        await diwaPage.checkBookingURL(expectedBookingUrlPart);
    });

    test("Add Eye Exam appointment", async({page}) => {

        //click on the Add new Appointment button
        await calendarPage.addNewAppointmentClick();

        //choose the Eye Exam and Mr buttons
        await calendarPage.chooseEyeExamAndMr();

        //Last, First name and Phone number input
        await calendarPage.inputLastName("George")
        await calendarPage.inputFirstName("Bush")
        await calendarPage.inputPhoneNumber("09811111111")

        //click on show all time
        await calendarPage.ShowAllTimeClick();

        //choose the time
        await calendarPage.chooseTime();

        //click on Add new Appointment
        await calendarPage.appointmentButtonClick();

        //URL validation
        const expectedAppointmentURL = "https://lt-booking-fielmann-test.lt-einfachanstellen.de/calendar"
        await calendarPage.checkCalendarPage(expectedAppointmentURL)

        //add elements validation
    });

});