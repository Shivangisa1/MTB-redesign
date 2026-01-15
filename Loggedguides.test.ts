import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';

test.describe('Validating the Transport module by logged user:', () => {

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
        await page.getByRole('link', { name: 'Guides' }).click();
    });

    // ---------------------Currently not developed in the system------------------------
    test.fail('Test Case 1: Verify the Downloading functionaility: Not Developed ', async ({ page }) => {

        //http://ec2-54-87-172-131.compute-1.amazonaws.com:3000/
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('a[onclick^="generateLegsExcel"]').click()
        ]);
        const filePath = 'C:\Users\dell\Documents\MTB- POM\Automation flles/myFile.pdf';
        await download.saveAs(filePath);
        console.log(`Downloaded file saved to: ${filePath}`);
        console.log('this functionality is not currently developed in the system.');

    });
});


