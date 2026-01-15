import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';

test.describe('Validating the Searching Machines by logged user ', () => {
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
        await page.waitForTimeout(2000);
    });

    test('Test Case 1 : Verify the Filters Name to find the machines in Machine Tool Bids', async ({ page }) => {
        const filter = await page.locator('.filter-dropdown').locator('h5');
        const count = await filter.count();

        for (let i = 0; i < count; i++) {
            const text = await filter.nth(i).innerText();
            console.log(`Filter ${i + 1}:`, text);
        }

    });

    test('Test Case 2: Verify the Total number of Filters to find the machines in Machine Tool Bids', async ({ page }) => {
        const filter = await page.locator('.filter-dropdown').locator('h5');
        const count = await filter.count();
        console.log('Number of filters to find the machine is', count);

    });
    test('Test Case 3 : Verify the Total number of machines in Machine Tool Bids', async ({ page }) => {
        const resultText = await page.locator('.result-heading span').innerText();
        const number = resultText.replace(/[()]/g, ""); // removes ( and )

        console.log("Total search results:", number);
    });

    test('Test Case 4 : Verify that the user can select CNC Machining and check results', async ({ page }) => {
        await page.getByRole('heading', { name: 'Machine Type', exact: true }).click();
        await page.locator('.form-check-input').first().check();
        await page.waitForTimeout(2000);

        const resultText = await page.locator('.result-heading span').innerText();
        const number = resultText.replace(/[()]/g, ""); // removes ( and )

        console.log("all checkboxes are checked successfully & Search results:", number);
    });

    test('Test Case 5 : Verify that the user can select Brand name & check results', async ({ page }) => {
        await page.getByRole('heading', { name: 'Brand', exact: true }).click();
        await page.getByLabel('Toshiba').check();
        await page.waitForTimeout(2000);
        console.log('checkbox as Toshiba selected')
        const resultText = await page.locator('.result-heading span').innerText();
        const number = resultText.replace(/[()]/g, "");

        console.log("all checkboxes are checked successfully & Search results:", number);
    });

    test('Test Case 6 : Verify that the user can select both Brand name, machine type & check results', async ({ page }) => {
        await page.getByRole('heading', { name: 'Machine Type', exact: true }).click();
        // await page.locator('.form-check-input').first().check();
        await page.getByLabel('CNC Machining').check();
        await page.waitForTimeout(2000);

        await page.getByRole('heading', { name: 'Brand' }).first().click();
        await page.getByLabel('Toshiba').check();
        await page.waitForTimeout(2000);

        console.log('checkbox as Toshiba selected')
        const resultText = await page.locator('.result-heading span').innerText();
        const number = resultText.replace(/[()]/g, "");

        console.log("Search results for Toshiba and CNC machining are: ", number);

        console.log("PERFORMANCE TESTING IS AS FOLLOWS: ")
        const perf = await page.evaluate(() => JSON.stringify(performance.timing));
        console.log("Performance timing:", perf);

    });

    test('Test Case 7 : Verify that the user can clear machine type from the filter & check results', async ({ page }) => {
        await page.getByRole('heading', { name: 'Machine Type', exact: true }).click();
        // await page.locator('.form-check-input').first().check();
        await page.getByLabel('CNC Machining').check();
        await page.waitForTimeout(2000);

        await page.getByRole('heading', { name: 'Brand', exact: true }).click();
        await page.getByLabel('Toshiba').check();
        await page.waitForTimeout(2000);

        console.log('checkbox as Toshiba selected')

        await page.locator('.close').first().click();
        await page.waitForTimeout(2000);

        const resultText = await page.locator('.result-heading span').innerText();
        const number = resultText.replace(/[()]/g, "");

        console.log("Search results after clearing machine type are: ", number);

    });

    test('Test Case 8 : Verify that the user can select year from the filter & check results', async ({ page }) => {
        await page.getByRole('heading', { name: 'Year' }).click();

        await page.waitForTimeout(2000);
        const shift = await page.locator('.slider-handle').first();
        await page.waitForTimeout(2000);

        /*await shift.dragTo(shift, {
            targetPosition: { x: -50, y: 20 }
        });  */

        const a = await shift.hover();
        await page.waitForTimeout(2000);

        console.log('cursor pointed to slider')
        const resultText = await page.locator('.result-heading span').innerText();
        const number = resultText.replace(/[()]/g, "");

        console.log("Search results after clearing brand are: ", number);

    });

    test('Test Case 9 : Validate that the user clicks on view details button and check the specifications ', async ({ page }) => {

        await page.getByRole('link', { name: 'View Details' }).first().click();
        const detail = await page.locator('#specification').first();
        const msg = await detail.innerText();
        console.log("Details of respective machine is as follow", msg)

    });


    test('Test Case 10 : Verify that the user can basic details of selected machine', async ({ page }) => {
        await page.getByRole('link', { name: 'View Details' }).first().click();
        const container = page.locator('.machine-detail').nth(1);

        await page.waitForTimeout(2000);
        // Offer Price
        const offerPrice = await container.locator('h3.amount a').innerText();
        console.log("Basic detail of Machine are as follows: \n")
        console.log("Offer Price:", offerPrice);

        async function getField(labelText: string) {
            const label = container.locator(`label:has-text("${labelText}")`);
            const value = await label.locator('xpath=following-sibling::h5[1]').innerText();
            return value.trim();
        }

        console.log("MAKE:", await getField("MAKE"));
        console.log("MODEL:", await getField("MODEL"));
        console.log("YEAR:", await getField("YEAR"));
        console.log("CONTROL:", await getField("CONTROL"));
        console.log("REFERENCE:", await getField("REFERENCE"));
        console.log("TYPE:", await getField("TYPE"));

    });

    test('Test Case 11 : Verify that the user can click the contact us page', async ({ page }) => {
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.waitForTimeout(2000);

        await page.getByRole('link', { name: 'Contact Us Today!' }).click();
        console.log("clicked successfully")

    });


    test('Test Case 12 : Validate the buttons are clickable ', async ({ page }) => {
        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.waitForTimeout(2000);

        const btn = await page.getByRole('link', { name: 'Get Quote' }).first();

        if (await btn.isVisible() && await btn.isEnabled()) {
            console.log("button is clickable")
        }
        else {
            console.log("button is not clickable")
        }

        const Buy = await page.getByRole('link', { name: 'Buy Now' });
        if (await Buy.isVisible() && await Buy.isEnabled()) {
            console.log("button is clickable")
        }
        else {
            console.log("button is not clickable")
        }

        const offer = await page.getByRole('link', { name: 'Make Offer' });
        if (await Buy.isVisible() && await Buy.isEnabled()) {
            console.log("button is clickable")
        }
        else {
            console.log("button is not clickable")
        }

    });


});