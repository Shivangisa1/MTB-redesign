import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';

test.describe('Validating the Marketplace features: ', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://dev.machinetoolbids.com');
        await page.getByRole('link', { name: 'Marketplace' }).first().click(); // Currently not working due to server 500 error.

        try {
            await page.waitForLoadState('networkidle', { timeout: 5000 }); // it slows for 5000 ms
        } catch {
            console.log("⚠️ Network never idle — backend slow or infinite requests");
        }
    });


    test('Test Case 1 : Verify the total features machines:', async ({ page }) => {

        const feature = await page.locator('.swiper-slide').count();
        console.log('The total feature machines in MTB are:', feature);

    });

    test('Test Case 2: Verify the total number of featured machines ', { tag: '@fast', }, async ({ page }) => { // npx playwright test --grep @fast

        const feature = await page.locator('.swiper-slide').count();
        console.log('The total feature machines in MTB are:', feature);

    });


    test('Test Case 3: Verify the names of featured machines:', { tag: '@slow', }, async ({ page }) => {

        const detail = page.locator('.swiper-wrapper');
        const nameElements = detail.locator('h4.card-title');

        const count = await nameElements.count();

        console.log("Below are the top featured machines:\n");

        for (let i = 0; i < count; i++) {
            const machineName = await nameElements.nth(i).innerText();
            console.log(`Machine ${i + 1}: ${machineName}`);
        }
    });

    test('Test Case 4: Verify the total number and name of featured category:', async ({ page }) => {
        const detail = await page.locator('.category-card');
        const name = detail.locator('h3.card-title');
        const count = await name.count();

        console.log("Total number of featured category machines are:", count);

        console.log("Below are the featured category machines:\n");

        for (let i = 0; i < count; i++) {
            const machineName = await name.nth(i).innerText();
            console.log(`Machine ${i + 1}: ${machineName}`);
        }

    });


    test('Test Case 5: Verify the machines by selecting different featured category as horizontal:', async ({ page }) => {

        await page.getByRole('heading', { name: 'Horizontal Machining Centers' }).click();
        await page.waitForTimeout(2000);
        const name = await page.locator('h3.title-all-machines span').innerText();
        console.log('There are total machines if we select horizontal category:', name);

    });

    test('Test Case 6: Verify the machines by selecting different featured category as Vertical:', async ({ page }) => {
        await page.getByRole('heading', { name: 'Vertical Machining Centers' }).click();
        await page.waitForTimeout(2000);
        const name = await page.locator('h3.title-all-machines span').innerText();
        console.log('There are total machines if we select Vertical category:', name);
    });


    test('Test Case 7: Verify the machines by selecting different featured category as Fabrication:', async ({ page }) => {
        await page.getByRole('heading', { name: 'Fabrication' }).click();
        await page.waitForTimeout(2000);
        const name = await page.locator('h3.title-all-machines span').innerText();
        console.log('There are total machines if we select Vertical category:', name);
    });

    test('Test Case 8: Verify the machines by selecting different featured category as CNC Lathes Machine:', async ({ page }) => {
        await page.getByRole('heading', { name: 'CNC Lathes Machine' }).click();
        await page.waitForTimeout(2000);
        const name = await page.locator('h3.title-all-machines span').innerText();
        console.log('There are total machines if we select Vertical category:', name);
    });

    test('Test Case 9: Verify the machines by selecting different featured category as Laser Machines:', async ({ page }) => {
        await page.getByRole('heading', { name: 'Laser Machine' }).click();
        await page.waitForTimeout(2000);
        const name = await page.locator('h3.title-all-machines span').innerText();
        console.log('There are total machines if we select Vertical category:', name);
    });

    test('Test Case 10: Verify the machines by selecting different featured category as Miscellaneous Machines:', async ({ page }) => {
        await page.getByRole('heading', { name: 'Miscellaneous' }).click();
        await page.waitForTimeout(2000);
        const name = await page.locator('h3.title-all-machines span').innerText();
        console.log('There are total machines if we select Vertical category:', name);
    });

    test.fail('Test Case 11: Verify the detail of featured machine', async ({ page }) => {
        const feat = await page.locator('.swiper-slide');
        const count = feat.getByRole('link', { name: 'View Details' });
        const name = await count.count();

        for (let i = 0; i < name; i++) {
            const machineName = await count.nth(i).click();
            console.log(`Machine ${i + 1}: ${machineName}`);

            const container = feat.locator('.machine-detail');
            const offerPrice = await container.locator('h3.amount span').innerText();
            console.log("Basic detail of Machine are as follows: \n")
            console.log("Offer Price:", offerPrice);
            await page.goBack();
        }


    });




});