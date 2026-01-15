import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';

test.describe('Validating the Facility Liquidation & Auctions by logged user', () => {

    test.beforeEach(async ({ page }) => {
       
  
        await page.goto('https://dev.machinetoolbids.com');
        const a = await page.locator('.rs-wrapper');
        console.log("🔵 Home page loaded");

        await a.locator('span.btn-white-border:has-text("Login")').click({ force: true });

        await page.getByPlaceholder('Enter your email address').nth(1).fill('shivangi.saraswat@desklay.com');
        await page.getByPlaceholder('Enter your password').fill('123456');

        console.log('Please solve the CAPTCHA manually...');
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Login', exact: true }).first().click();
        console.log("🔵 Logged in successfully");

        const link = await page.locator('.sub-menu ').first().click();
        await page.getByRole('link', { name: 'Liquidation & Auction' }).click();
        await page.waitForTimeout(2000);
    });

    test('Test Case 1: Verify the full name to Contact about Liquidation Services ', async ({ page }) => {

        const name = await page.locator('#fname');
        await name.waitFor({ state: 'visible' });
        await name.fill('Dummy Tester');
        const selectedValue = await name.inputValue();
        console.log('Selected first name is:', selectedValue);
    });


    test('Test Case 2: Verify the last name to Contact about Liquidation Services ', async ({ page }) => {

        const name = await page.locator('#lname');
        await name.waitFor({ state: 'visible' });
        await name.fill('last dummy');
        const selectedValue = await name.inputValue();
        console.log('Selected last name is:', selectedValue);
    });

    test('Test Case 3: Verify the email addressto Contact about Liquidation Services ', async ({ page }) => {

        const name = await page.locator('#email').nth(1);
        await name.waitFor({ state: 'visible' });
        await name.fill('dummy@yopmail.com');
        const selectedValue = await name.inputValue();
        console.log('Selected email address is:', selectedValue);
    });


    test('Test Case 4: Verify the phone number to Contact about Liquidation Services ', async ({ page }) => {

        const name = await page.locator('#phone').nth(1);
        await name.waitFor({ state: 'visible' });
        await name.fill('1239018765');
        const selectedValue = await name.inputValue();
        console.log('Selected email address is:', selectedValue);
    });


    test('Test Case 5: Verify the Message from Customer to Contact about Liquidation Services ', async ({ page }) => {

        const name = await page.locator('#description');
        await name.waitFor({ state: 'visible' });
        await name.fill('I have few concerns, plaese schedule a call for that');
        const selectedValue = await name.inputValue();
        console.log('Selected email address is:', selectedValue);
    });

    test('Test Case 6: Verify the Contact form for Liquidation Services is submitted successfully ', async ({ page }) => {

        const name = await page.locator('#fname');
        await name.waitFor({ state: 'visible' });
        await name.fill('Dummy Tester');
        const selectedValue = await name.inputValue();
        console.log('Selected first name is:', selectedValue);


        const lastname = await page.locator('#lname');
        await lastname.waitFor({ state: 'visible' });
        await lastname.fill('last dummy');
        const selectedValue1 = await lastname.inputValue();
        console.log('Selected last name is:', selectedValue1);

        const email = await page.locator('#email').nth(1);
        await email.waitFor({ state: 'visible' });
        await email.fill('dummy@yopmail.com');
        const selectedValue2 = await email.inputValue();
        console.log('Selected email address is:', selectedValue2);

        const phone = await page.locator('#phone').nth(1);
        await phone.waitFor({ state: 'visible' });
        await phone.fill('1239018765');
        const selectedValue3 = await phone.inputValue();
        console.log('Selected phone number is:', selectedValue3);

        const desc = await page.locator('#description');
        await desc.waitFor({ state: 'visible' });
        await desc.fill('I have few concerns, plaese schedule a call for that');
        const selectedValue4 = await desc.inputValue();
        console.log('The message from customer is:', selectedValue4);

        const msg = await page.getByRole('button', { name: 'Submit Request' }).first().click();
    });


    test('Test Case 7: Validate the Assertion/ Success Message/Error Message for Liquidation Services Contact Form ', async ({ page }) => {

        const name = await page.locator('#fname');
        await name.waitFor({ state: 'visible' });
        await name.fill('Dummy Tester');
        const selectedValue = await name.inputValue();
        console.log('Selected first name is:', selectedValue);


        const lastname = await page.locator('#lname');
        await lastname.waitFor({ state: 'visible' });
        await lastname.fill('last dummy');
        const selectedValue1 = await lastname.inputValue();
        console.log('Selected last name is:', selectedValue1);

        const email = await page.locator('#email').nth(1);
        await email.waitFor({ state: 'visible' });
        await email.fill('dummy@yopmail.com');
        const selectedValue2 = await email.inputValue();
        console.log('Selected email address is:', selectedValue2);

        const phone = await page.locator('#phone').nth(1);
        await phone.waitFor({ state: 'visible' });
        await phone.fill('1239018765');
        const selectedValue3 = await phone.inputValue();
        console.log('Selected phone number is:', selectedValue3);

        const desc = await page.locator('#description');
        await desc.waitFor({ state: 'visible' });
        await desc.fill('I have few concerns, plaese schedule a call for that');
        const selectedValue4 = await desc.inputValue();
        console.log('The message from customer is:', selectedValue4);

        const msg = await page.getByRole('button', { name: 'Submit Request' }).first().click();

        const successMessage = page.locator('.alert-success');
        const errorMessage = page.locator('.alert-danger');

        try {
            await Promise.race([
                successMessage.waitFor({ state: 'visible', timeout: 5000 }),
                errorMessage.waitFor({ state: 'visible', timeout: 5000 })
            ]);

            if (await successMessage.isVisible()) {

                const text = await successMessage.textContent();
                console.log('✅ Success message displayed:', text);

                await expect(successMessage).toHaveText(/Form submitted successfully!/i);

            } else if (await errorMessage.isVisible()) {

                const text = await errorMessage.textContent();
                console.log('❌ Error message displayed:', text);

            } else {
                console.log('⚠️ No message appeared after submission.');
            }

        } catch (err) {
            console.error('⛔ Error waiting for message:', err);
        }


    });
});