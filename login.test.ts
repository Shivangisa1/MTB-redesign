import { test, expect } from "@playwright/test";
import { readExcel } from "../Utils/excelreader";

test("Login using Excel Credentials", async ({ page }) => {

    const excelData: any = readExcel("credentials.xlsx");

    // excelData[0] = { username: "admin@test.com", password: "Test@123" }
    const { username, Password } = excelData[0];

    await page.goto("https://dev.machinetoolbids.com");

    const a = await page.locator('.rs-wrapper');
    console.log("🔵 Home page loaded");

    await a.locator('span.btn-white-border:has-text("Login")').click({ force: true });
    await page.waitForTimeout(3000);


    await page.getByPlaceholder('Enter your email address').nth(1).fill(username);
    await page.getByPlaceholder('Enter your password').fill(Password.toString());


    console.log('Please solve the CAPTCHA manually...');
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Login', exact: true }).first().click();
    console.log("🔵 Logged in successfully");

});
