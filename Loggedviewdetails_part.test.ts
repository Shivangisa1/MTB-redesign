import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';


test.describe('Validating the Viewing details in Search Machine', () => {

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

        try {
            await page.waitForLoadState('networkidle', { timeout: 5000 }); // it slows for 5000 ms
        } catch {
            console.log("⚠️ Network neveridle — backend is slow or infinite requests");
        }
    });


    test('Test Case 1 : Verify that the user can search machine-> view details-> Get Quote of any machine ', async ({ page }) => {
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Get Quote' }).first().click();
        const msg = await page.locator('h4.bold-title').innerHTML();
        console.log(msg);

    });

    test('Test Case 2 : Verify that the user should not buy any machine without acceptig terms & condition', async ({ page }) => {
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.getByRole('button', { name: 'Buy Now' }).first().click();

        await page.getByRole('button', { name: 'Place Order' }).click();
        const msg = await page.locator('p.m-0').innerText();
        console.log('Order is not placed due to below reason as :', msg);

    });

    test('Test Case 3 : Verify that the user should accept terms & condt before search machine-> view details-> Buy now of any machine', async ({ page }) => {
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.getByRole('button', { name: 'Buy Now' }).first().click();

    
        await page.locator('#termsCheck').check();
        await page.getByRole('button', { name: 'Place Order' }).click();

    });

    test('Test Case 4 : Verify that the user can send make offer for any machine', async ({ page }) => {
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.getByRole('button', { name: 'Make Offer' }).first().click();

        const modal = await page.locator('.modal-content');
        await modal.getByPlaceholder('Offer Price').fill('10000');

        await page.selectOption('select[name="financing"]', 'yes');
        await page.waitForTimeout(2000);

        await modal.getByPlaceholder('Start typing here...').fill('This is testing purpose only');

        await page.waitForTimeout(2000);
        await modal.getByRole('button', { name: 'Submit Your Request' }).click();

    });


});