import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';


test.describe('Validating the Viewing details in Search Machine', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('https://dev.machinetoolbids.com');
        await page.getByRole('link', { name: 'Search Machine' }).first().click();

        try {
            await page.waitForLoadState('networkidle', { timeout: 5000 }); // it slows for 5000 ms
        } catch {
            console.log("⚠️ Network neveridle — backend is slow or infinite requests");
        }
    });


    test('Test Case 1 : Verify that the user can search machine-> view details-> Get Quote of any machine ', async ({ page }) => {
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.getByRole('button', { name: 'Get Quote' }).first().click();

        const modal = await page.locator('.modal-content');

        modal.getByPlaceholder('First Name').fill('testuser');
        await page.waitForTimeout(2000);

        modal.getByPlaceholder('Last Name').fill('Testing');
        await page.waitForTimeout(2000);

        modal.getByPlaceholder('Email Address').fill('Testing@yopmail.com');
        await page.waitForTimeout(2000);

        modal.getByPlaceholder('(000) 000-0000').fill('8078234441');
        await page.waitForTimeout(2000);

        modal.getByPlaceholder('Company').fill('MTB user');
        await page.waitForTimeout(2000);

        modal.getByRole('button', { name: 'Submit Your Request' }).click();

        const msg = await page.locator('h4.bold-title').innerText();
        console.log(msg);

    });

    test('Test Case 2 : Verify that the user should not buy any machine without acceptig terms & condition', async ({ page }) => {
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.getByRole('button', { name: 'Buy Now' }).first().click();

        await page.getByPlaceholder('Enter first name').fill('testuser');
        await page.getByPlaceholder('Enter last name').fill('testingname');
        await page.getByPlaceholder('Enter company name').fill('desklay');
        await page.getByPlaceholder('Enter phone number').fill('+9765432190');
        await page.getByPlaceholder('Enter email address').fill('testinguser@yopmail.com');
        await page.getByPlaceholder('Enter address').fill('address line 1');
        await page.getByPlaceholder('Apartment, suite, etc.').fill('12-O');
        await page.getByPlaceholder('Enter city').fill('eschilop')
        await page.getByPlaceholder('Enter state').fill('Cicage');
        await page.getByPlaceholder('Enter ZIP code').fill('09876');
        await page.getByPlaceholder('Enter country').fill('united marriogo');

        await page.getByRole('button', { name: 'Place Order' }).click();
        const msg = await page.locator('p.m-0').innerText();
        console.log('Order is not placed due to below reason as :', msg);

    });

    test('Test Case 3 : Verify that the user should accept terms & condt before search machine-> view details-> Buy now of any machine', async ({ page }) => {
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.getByRole('button', { name: 'Buy Now' }).first().click();

        await page.getByPlaceholder('Enter first name').fill('testuser');
        await page.getByPlaceholder('Enter last name').fill('testingname');
        await page.getByPlaceholder('Enter company name').fill('desklay');
        await page.getByPlaceholder('Enter phone number').fill('+9765432190');
        await page.getByPlaceholder('Enter email address').fill('testinguser@yopmail.com');
        await page.getByPlaceholder('Enter address').fill('address line 1');
        await page.getByPlaceholder('Apartment, suite, etc.').fill('12-O');
        await page.getByPlaceholder('Enter city').fill('eschilop')
        await page.getByPlaceholder('Enter state').fill('Cicage');
        await page.getByPlaceholder('Enter ZIP code').fill('09876');
        await page.getByPlaceholder('Enter country').fill('united marriogo');

        await page.locator('#termsCheck').check();
        await page.getByRole('button', { name: 'Place Order' }).click();

    });

    test('Test Case 4 : Verify that the user can send make offer for any machine', async ({ page }) => {
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.getByRole('button', { name: 'Make Offer' }).first().click();

        const modal = await page.locator('.modal-content');
        await modal.getByPlaceholder('First Name').fill('testuser');
        await modal.getByPlaceholder('Last Name').fill('Testing');
        await modal.getByPlaceholder('Email Address').fill('shivangi.saraswat@desklay.com');

        await modal.getByPlaceholder('(000) 000-0000').fill('+9087651223');
        await modal.getByPlaceholder('Company').fill('desklay');
        await modal.getByPlaceholder('Offer Price').fill('10000');

        await page.selectOption('select[name="financing"]', 'yes');
        await page.waitForTimeout(2000);

        await modal.getByPlaceholder('Start typing here...').fill('This is testing purpose only');

        await page.waitForTimeout(2000);
        await modal.getByRole('button', { name: 'Submit Your Request' }).click();

    });


});