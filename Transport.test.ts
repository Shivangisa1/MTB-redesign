import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';

test.describe('Validating the Transport module:', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://dev.machinetoolbids.com');
        const link = await page.locator('.sub-menu ').first().click();
        await page.getByRole('link', { name: 'Transport' , exact: true}).click();
    });

    test('Test Case 1: Verify the email address for logistic request form ', async ({ page }) => {

        const email = await page.locator('#email').nth(3);
        await email.waitFor({ state: 'visible' });
        await email.fill('admin@yopmail.com');

        const selectedValue = await email.inputValue();
        console.log('Selected machine type:', selectedValue);

    });

    test('Test Case 2: Verify the Subject for logistic request form ', async ({ page }) => {
        const subject = await page.locator('#subject');
        await subject.selectOption({ label: 'Shipping Quote' });
        const selectedValue = await subject.inputValue();
        console.log('Selected machine type:', selectedValue);
        expect(selectedValue).toContain('Shipping Quote');
    });

    test('Test Case 3: Verify the other details for logistic request form ', async ({ page }) => {
        const subject = await page.locator('#details');
        await subject.fill('Yes it is high loaded machine which can be used worldwide for construction');
        const selectedValue = await subject.inputValue();
        console.log('The other details are as below: ', selectedValue);

    });

    test('Test Case 4: Verify the Machine listings for logistic request form ', async ({ page }) => {
        const subject = await page.locator(' #machineListing');
        await subject.fill('There are 4 types of machines');
        const selectedValue = await subject.inputValue();
        console.log('Machine listings as below: ', selectedValue);

    });

    test('Test Case 5: Verify the Zip Code for logistic request form ', async ({ page }) => {
        const subject = await page.locator(' #zipCode');
        await subject.fill('There are 4 types of machines');
        const selectedValue = await subject.inputValue();
        console.log('Zip code for that machine is ', selectedValue);

    });

    test('Test Case 6: Verify the customer type for logistic request form ', async ({ page }) => {

        const condition = await page.locator('#userType0');
        await condition.waitFor({ state: 'visible' });
        await condition.check();
    });


    test('Test Case 7: Verify the contact form for logistic request form is submitted successfully ', async ({ page }) => {

        const email = await page.locator('#email').nth(3);
        await email.waitFor({ state: 'visible' });
        await email.fill('admin@yopmail.com');

        const selectedValue = await email.inputValue();
        console.log('Selected machine type:', selectedValue);

        const subject = await page.locator('#subject');
        await subject.selectOption({ label: 'Shipping Quote' });
        const selectedValue1 = await subject.inputValue();
        console.log('Selected machine type:', selectedValue1);
        expect(selectedValue1).toContain('Shipping Quote');

        const detail = await page.locator('#details');
        await detail.fill('Yes it is high loaded machine which can be used worldwide for construction');
        const selectedValue2 = await detail.inputValue();
        console.log('The other details are as below: ', selectedValue2);

        const machine = await page.locator(' #machineListing');
        await machine.fill('There are 4 types of machines');
        const selectedValue3 = await machine.inputValue();
        console.log('Machine listings as below: ', selectedValue3);

        const Zip = await page.locator(' #zipCode');
        await Zip.fill('There are 4 types of machines');
        const selectedValue4 = await Zip.inputValue();
        console.log('Zip code for that machine is ', selectedValue4);

        const condition = await page.locator('#userType0');
        await condition.waitFor({ state: 'visible' });
        await condition.check();

        const msg = await page.getByRole('button', { name: 'Submit Request' }).nth(2).click();

    });
});
