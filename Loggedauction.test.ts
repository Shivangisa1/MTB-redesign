import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';

test.describe('Validating the Auctions Filters ', () => {

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
        await page.getByRole('link', { name: 'Auction' }).first().click();

    });


    test('Test Case 7 : Verify the Search function to find the Auction', async ({ page }) => {

        const timeline = await page.getByPlaceholder('Search Auction');

        await timeline.fill('Mid');   
        let totalCards = 0;
        let pageNumber = 1;

        const cardsSelector = '.auction-card.row';

        const nextLi = page.locator('li.page-item:has(a.page-link:text("Next"))').last();

        while (true) {

            const cards = page.locator(cardsSelector);

            const cardsOnPage = await cards.count();
            totalCards += cardsOnPage;
            console.log(`Page ${pageNumber} count:`, cardsOnPage);

            // If <li> for NEXT does not exist → stop
            if (await nextLi.count() === 0) {
                console.log("No NEXT button found → stopping.");
                break;
            }

            // If <li> has "disabled" class → stop
            const nextClass = await nextLi.getAttribute("class");
            if (nextClass?.includes("disabled")) {
                console.log("NEXT button is disabled → stopping.");
                break;
            }

            // Get old first card text
            const oldFirstCard = cardsOnPage ? await cards.first().innerText() : "";

            // Click NEXT (inside <a>)
            // await nextLi.locator("a").click();
            await nextLi.getByRole('link', { name: 'Next' }).click();


            await page.waitForFunction(
                ({ selector, oldText }) => {
                    const el = document.querySelector(selector);
                    if (!el) return false;
                    const newText = el.textContent?.trim() || "";
                    return newText !== oldText.trim();
                },
                { selector: cardsSelector, oldText: oldFirstCard },
                { timeout: 15000 }
            );

            pageNumber++;
        }

        console.log('Total auction-card row count across all pages:', totalCards);

        /*
        const nextBtnLocator = page.locator('li.page-item:has(a.page-link:text("Next")) >> a.page-link').last();


        while (true) {
            const cards = page.locator(cardsSelector);

            // Wait for at least one card to be visible (if page may have zero, check count)
            if (await cards.count() > 0) {
                await cards.first().waitFor({ state: 'visible', timeout: 10000 });
            } else {
                // no cards on this page
                console.log(`Page ${pageNumber} has 0 cards.`);
            }

            const cardsOnPage = await cards.count();
            totalCards += cardsOnPage;
            console.log(`Page ${pageNumber} count:`, cardsOnPage);

            // If <li> for NEXT does not exist → stop   ..... new line to debug
            if (await nextBtnLocator.count() === 0) {
                console.log("No NEXT button found → stopping.");
                break;
            }

            // If there is no Next button, break
            //if (await nextBtnLocator.count() === 0) break;

            /*
                        // Stop if NEXT is not enabled
                        if (!(await nextBtnLocator.isVisible()) || !(await nextBtnLocator.isEnabled())) {
                            break;
                        } 

            // Check if Next is disabled
            const nextClass = await nextBtnLocator.getAttribute('class');
            if (!nextClass || nextClass.includes('disabled')) break;

            // Capture current first card text (or empty string) BEFORE clicking Next
            const oldFirstCard = (await (await cards.count() ? cards.first().innerText() : Promise.resolve(''))) ?? '';

            // Click next
            await nextBtnLocator.click();

            // Wait until the first card changes (pass a single object arg to the page function)
            await page.waitForFunction(
                ({ selector, oldText }) => {
                    const el = document.querySelector(selector);
                    if (!el) return false;
                    const newText = (el.textContent || "").trim();
                    return newText !== oldText.trim();
                },
                { selector: cardsSelector, oldText: oldFirstCard },
                { timeout: 15000 }
            );

            pageNumber++;
        }

        console.log('Total auction-card row count across all pages:', totalCards);*/

    });


    test('Test Case 1: Verify the timeline for Current Auctions ', async ({ page }) => {

        const timeline = await page.locator('.filter-inner-box');

        await timeline.locator('.form-check-input').first().check();
        await page.waitForTimeout(2000);
        const count1 = await page.locator('.card-title').count();
        const count = await page.locator('.card-title').allInnerTexts();
        console.log('As per the selected filter of current autcions are', count);
        console.log('And the total of current auctions are:', count1);

    });

    test('Test Case 2: Verify the timeline for Future Auctions ', async ({ page }) => {

        const timeline = await page.locator('.filter-inner-box');

        await timeline.locator('.form-check-input').nth(1).check();
        await page.waitForTimeout(2000);
        const count1 = await page.locator('.card-title').count();
        const count = await page.locator('.card-title').allInnerTexts();
        console.log('As per the selected filter of current autcions are', count);
        console.log('And the total of current auctions are:', count1);
    });

    test('Test Case 3: Verify the full page of timeline for Past Auctions ', async ({ page }) => {
        // showing only 1 page results
        const timeline = await page.locator('.filter-inner-box');
        await timeline.locator('.form-check-input').nth(2).check();
        await page.waitForTimeout(2000);
        // A place to store ALL results from all pages
        let allResults = [];

        while (true) {
            // Collect results from the current page
            const titles = await page.locator('.card-title').allInnerTexts();
            allResults.push(...titles);

            // Check if a "Next" button exists and is enabled
          const nextBtn =  page.locator('li.page-item:has(a.page-link:text("Next"))').last();

          // page.getByRole('link', { name: 'Next' });

            if (await nextBtn.count() === 0) break; // No pagination
            if (await nextBtn.isDisabled()) break; // Last page

            // Go to next page 
            await nextBtn.click();
        }

        // Print the full results
        console.log("Total results across all pages:", allResults.length);
        console.log("All entries:", allResults);
    });


    test('Test Case 3.1: Verify the timeline for Past Auctions ', async ({ page }) => {
        // showing only 1 page results
        const timeline = await page.locator('.filter-inner-box');
        await timeline.locator('.form-check-input').nth(2).check();
        await page.waitForTimeout(2000);
        const count1 = await page.locator('.card-title').count();
        const count = await page.locator('.card-title').allInnerTexts();
        console.log('As per the selected filter of current autcions are', count);
        console.log('And the total of Past auctions are:', count1);
    });


    test('Test Case 4: Verify the Auction type as Open Auctions', async ({ page }) => {

        const timeline = await page.locator('.filter-inner-box');

        await timeline.locator('.form-check-input').nth(3).check();
        await page.waitForTimeout(2000);
        const count1 = await page.locator('.card-title').count();
        const count = await page.locator('.card-title').allInnerTexts();
        console.log('As per the selected filter of current autcions are', count);
        console.log('And the total of Open auctions are:', count1);
    });

    test('Test Case 5 : Verify the Auction type as Single Facility', async ({ page }) => {

        const timeline = await page.locator('.filter-inner-box');

        await timeline.locator('.form-check-input').nth(4).check();
        await page.waitForTimeout(2000);
        const count1 = await page.locator('.card-title').count();
        const count = await page.locator('.card-title').allInnerTexts();
        console.log('As per the selected filter of current autcions are', count);
        console.log('And the total of Single Facility are:', count1);
    });



    test('Test Case 6 : Verify the filter section and results ', async ({ page }) => {

        const timeline = await page.locator('.filter-inner-box');

        const checkboxes = timeline.locator('.form-check-input');
        const totalFilters = await checkboxes.count();

        for (let i = 0; i < totalFilters; i++) {

            console.log(`\n---------------------------`);
            console.log(`Applying filter checkbox ${i + 1}`);
            console.log(`---------------------------`);

            // Refresh checkbox locator each loop (important!)
            const checkbox = checkboxes.nth(i);

            // Uncheck all first (if needed)
            await checkboxes.uncheck({ force: true });

            // Check the current checkbox
            await checkbox.check({ force: true });
            await page.waitForLoadState('networkidle');

            // Get filtered results
            const titles = await page.locator('.card-title').allInnerTexts();
            const count = titles.length;

            console.log(`Filtered results count: ${count}`);
            console.log(`Entries:`);
            console.log(titles);
        }
    });



    test('Test Case 8 : Verify the upcoming Auctions and Sales of machines:', async ({ page }) => {

        const feature = await page.locator('.swiper-slide').count();
        console.log('The total upcoming auctons of machines in MTB are:', feature);

    });



});