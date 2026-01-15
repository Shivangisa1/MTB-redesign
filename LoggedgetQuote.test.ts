import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';

test.describe('Verifying that the user can get the Quotes by logged user ', () => {

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
        await page.getByRole('link', { name: 'Search Machine' }).first().click(); 
     
    });


    test('Test Case 1 : Verify the user can select get quote as per the selected machine', async ({ page }) => {

        await page.getByRole('button', { name: 'Get Quote' }).first().click();

        await page.getByRole('link', { name: 'Submit Quote Request' }).click();

        const msg = await page.locator('h4.bold-title').innerText();
        console.log(msg);

    });

    test('Test Case 2 : Verify the user can select multiple get quote as per the selected machine', async ({ page }) => {

        await page.getByRole('button', { name: 'Get Quote' }).first().click();

        await page.getByRole('button', { name: 'Get Quote' }).nth(1).click();

        await page.getByRole('link', { name: 'Submit Quote Request' }).click();
        const msg = await page.locator('h4.bold-title').innerText();
        console.log(msg);

    });
});