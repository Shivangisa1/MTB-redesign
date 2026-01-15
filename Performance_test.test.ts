import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';

import { monitorAPI } from '../Utils/apiMonitor';
import { logPageLoad } from '../Utils/pagePerformance';


test.describe('Checking the performance of the Machine Tool Bids ', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://dev.machinetoolbids.com');
        await page.getByRole('link', { name: 'Search Machine' }).first().click();

        monitorAPI(page);
        await logPageLoad(page);

    });

    test('Performance Case : Validate the performance of filters & Search functionality', async ({ page }) => {
        await page.getByRole('heading', { name: 'Machine Type' }).click();
        await page.getByLabel('CNC Machining').check();
        await page.waitForTimeout(2000);

        await page.getByRole('heading', { name: 'Control' }).click();
        await page.getByRole('heading', { name: 'Offer Type' }).click();
        await page.getByRole('heading', { name: 'Price' }).click();
        await page.getByRole('heading', { name: 'Year' }).click();

    });

    test('Performance Case : Validate the performance of Quote of Machine ', async ({ page }) => {

        const btn = await page.getByRole('link', { name: 'Get Quote' }).first();

        if (await btn.isVisible() && await btn.isEnabled()) {

            console.log("button is clickable")
        }
        else {
            console.log("button is not clickable")

        }


    });

    test('Performance Case : Validate the performance of View details of Machine ', async ({ page }) => {

        const btn = await page.getByRole('link', { name: 'View Details' }).first();

        if (await btn.isVisible() && await btn.isEnabled()) {
            console.log("button is clickable")
        }
        else {
            console.log("button is not clickable")
        }
    });


    test('Performance Case : Validate the performance if user clicks on view details button and check the specifications ', async ({ page }) => {

        await page.getByRole('link', { name: 'View Details' }).first().click();
        await page.waitForTimeout(2000);

        const detail = await page.locator('#specification');
        const msg = await detail.locator('h4.details-head');
        console.log("Details of respective machine is as follow", msg)


    });

});