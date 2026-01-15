import { test, expect } from '@playwright/test';
import { clear } from 'console';

test('Testing ', async ({ page }) => {

  await page.goto('https://dev.machinetoolbids.com/backend/admin/login');
  await page.fill('input[name="email"]', 'testadmin@mtb.com');
  await page.fill('input[name="password"]', '12345678');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('https://dev.machinetoolbids.com/backend/admin/mmi-dashboard');

  const cards = page.locator('.card-body');
  const count = await cards.count();

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    const title = await card.locator('h4').innerText();
    const value = await card.locator('h3').innerText();

    console.log(`${title}: ${value}`);
  }
});

//If API Testing is started, then:----------
test.skip('should send correct email in form data', async ({ page }) => {
  await page.goto('https://dev.machinetoolbids.com/backend/admin/login');

  await page.fill('input[name="email"]', 'testadmin@mtb.com');
  await page.fill('input[name="password"]', '12345678');


  const [request] = await Promise.all([
    page.waitForRequest(req => req.url().includes('/submit') && req.method() === 'POST'),
    page.click('button[type="submit"]'),
  ]);

  const postData = request.postData();
  expect(postData).toContain('https://dev.machinetoolbids.com/admin/mmi-dashboard');

});

