import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';

test.describe('Verifying that the user can get the Quotes ', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://dev.machinetoolbids.com');
        await page.getByRole('link', { name: 'Search Machine' }).first().click(); 
        // Currently not working due to server 500 error.
    });


    test('Test Case 1 : Verify the user can select get quote as per the selected machine', async ({ page }) => {

        await page.getByRole('button', { name: 'Get Quote' }).first().click();

        await page.getByRole('link', { name: 'Submit Quote Request' }).click();
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

    test('Test Case 2 : Verify the user can select multiple get quote as per the selected machine', async ({ page }) => {

        await page.getByRole('button', { name: 'Get Quote' }).first().click();

        await page.getByRole('button', { name: 'Get Quote' }).nth(1).click();

        await page.getByRole('link', { name: 'Submit Quote Request' }).click();
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
});