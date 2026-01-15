import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';

test.describe('Validating the Transport module:', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://dev.machinetoolbids.com');
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


