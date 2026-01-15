import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';


test.describe('Validating the Single Sales Machine by logged user', () => {

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

        const link = await page.locator('li.sub-menu ').first().click();
    });

    test.skip('Test Case 1: Verify the type of Machines ', async ({ page }) => {

        const dropdown = await page.locator('#type_of_machine');
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.selectOption({ label: 'Lathe' });
        const selectedValue = await dropdown.inputValue();
        console.log('Selected machine type:', selectedValue);
        expect(selectedValue).toContain('Lathe');
    });

    test('Test Case 2: Verify the other machines if machine is not listed ', async ({ page }) => {

        const text = await page.locator('#other_type');
        await text.waitFor({ state: 'visible' });
        await text.fill('This is for testing purpose');
        console.log('Value in other machine types', await text.inputValue());
    });

    test('Test Case 3: Verify the MAchine name ', async ({ page }) => {

        const machine = await page.locator('#machine_name');
        await machine.waitFor({ state: 'visible' });
        await machine.fill('Test Machine');
    });

    test('Test Case 4: Verify the Machine Manufacture year ', async ({ page }) => {

        const year = await page.locator('#machine_year');
        await year.waitFor({ state: 'visible' });
        await year.fill('2020');
    });

    test('Test Case 5: Verify the Machine condition ', async ({ page }) => {

        const condition = await page.locator('#Excellent');
        await condition.waitFor({ state: 'visible' });
        await condition.check();

        await expect(condition).toBeChecked();

        //Print the value (for confirmation)
        const value = await condition.getAttribute('value');
        console.log('Selected condition:', value);
    });

    test('Test Case 6: Verify the Sales Machine Initial information saved successfully ', async ({ page }) => {

        await page.getByRole('button', { name: 'Next' }).click();
        console.log('Clicked on next button successfully');
    });

    test('Test Case 7: Verify the list of defects or repairs needed ', async ({ page }) => {

        const dropdown = await page.locator('#type_of_machine');
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.selectOption({ label: 'Lathe' });

        const text = await page.locator('#other_type');
        await text.waitFor({ state: 'visible' });
        await text.fill('This is for testing purpose');

        const machine = await page.locator('#machine_name');
        await machine.waitFor({ state: 'visible' });
        await machine.fill('Test Machine');

        const year = await page.locator('#machine_year');
        await year.waitFor({ state: 'visible' });
        await year.fill('2020');

        const condition = await page.locator('#Excellent');
        await condition.waitFor({ state: 'visible' });
        await condition.check();
        await page.getByRole('button', { name: 'Next' }).click();
        console.log('Clicked on next button successfully');

        const defect = await page.locator('#defects');
        await defect.waitFor({ state: 'visible' });
        await defect.fill('No defects, everything is perfect');
        console.log('The defects in machine if found :', await defect.inputValue());
    });


    test('Test Case 8: Verify the machine currently under power', async ({ page }) => {

        const dropdown = await page.locator('#type_of_machine');
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.selectOption({ label: 'Lathe' });

        const text = await page.locator('#other_type');
        await text.waitFor({ state: 'visible' });
        await text.fill('This is for testing purpose');

        const machine = await page.locator('#machine_name');
        await machine.waitFor({ state: 'visible' });
        await machine.fill('Test Machine');

        const year = await page.locator('#machine_year');
        await year.waitFor({ state: 'visible' });
        await year.fill('2020');

        const condition = await page.locator('#Excellent');
        await condition.waitFor({ state: 'visible' });
        await condition.check();

        await page.getByRole('button', { name: 'Next' }).click();
        console.log('Clicked on next button successfully');

        const power = await page.locator('#underPowerYes');
        await power.waitFor({ state: 'visible' });
        await power.check();
        await expect(power).toBeChecked();
        console.log('The power option selected is :', await power.getAttribute('value'));
    });

    test('Test Case 9: Verify the machine can be loaded onto a truck ', async ({ page }) => {

        const dropdown = await page.locator('#type_of_machine');
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.selectOption({ label: 'Lathe' });

        const text = await page.locator('#other_type');
        await text.waitFor({ state: 'visible' });
        await text.fill('This is for testing purpose');

        const machine = await page.locator('#machine_name');
        await machine.waitFor({ state: 'visible' });
        await machine.fill('Test Machine');

        const year = await page.locator('#machine_year');
        await year.waitFor({ state: 'visible' });
        await year.fill('2020');

        const condition = await page.locator('#Excellent');
        await condition.waitFor({ state: 'visible' });
        await condition.check();

        await page.getByRole('button', { name: 'Next' }).click();
        console.log('Clicked on next button successfully');

        const load = await page.locator('#canLoadYes');
        await load.waitFor({ state: 'visible' });
        await load.check();
        await expect(load).toBeChecked();
        console.log('The load option selected is :', await load.getAttribute('value'));

    });

    test('Test Case 10: Verify the Machine Photos can be uploaded successfully ', async ({ page }) => {

        const dropdown = await page.locator('#type_of_machine');
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.selectOption({ label: 'Lathe' });

        const text = await page.locator('#other_type');
        await text.waitFor({ state: 'visible' });
        await text.fill('This is for testing purpose');

        const machine = await page.locator('#machine_name');
        await machine.waitFor({ state: 'visible' });
        await machine.fill('Test Machine');

        const year = await page.locator('#machine_year');
        await year.waitFor({ state: 'visible' });
        await year.fill('2020');

        const condition = await page.locator('#Excellent');
        await condition.waitFor({ state: 'visible' });
        await condition.check();

        await page.getByRole('button', { name: 'Next' }).click();
        console.log('Clicked on next button successfully');

        const photo = await page.locator('#photos');

        const filePath = Path.join('tests', 'test-data', 'image.png');
        await photo.setInputFiles(filePath);
        const files = await photo.evaluate((input: HTMLInputElement) =>
            input.files ? Array.from(input.files).map(f => f.name) : []
        );
        console.log('Uploaded files:', files);

    });

    test('Test Case 11: Verify the Seller information filled and submitted successfully ', async ({ page }) => {
        // Continue with next steps
        await page.locator('button.next').click();

    });

    test('Test Case 12: Verify the Seller Full name ', async ({ page }) => {

        const dropdown = await page.locator('#type_of_machine');
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.selectOption({ label: 'Lathe' });

        const text = await page.locator('#other_type');
        await text.waitFor({ state: 'visible' });
        await text.fill('This is for testing purpose');

        const machine = await page.locator('#machine_name');
        await machine.waitFor({ state: 'visible' });
        await machine.fill('Test Machine');

        const year = await page.locator('#machine_year');
        await year.waitFor({ state: 'visible' });
        await year.fill('2020');

        const condition = await page.locator('#Excellent');
        await condition.waitFor({ state: 'visible' });
        await condition.check();

        await page.getByRole('button', { name: 'Next' }).click();
        console.log('Clicked on next button successfully');

        const defect = await page.locator('#defects');
        await defect.waitFor({ state: 'visible' });
        await defect.fill('No defects, everything is perfect');

        const power = await page.locator('#underPowerYes');
        await power.waitFor({ state: 'visible' });
        await power.check();

        const load = await page.locator('#canLoadYes');
        await load.waitFor({ state: 'visible' });
        await load.check();

        const photo = await page.locator('#photos');
        const filePath = Path.join('tests', 'test-data', 'image.png');
        await photo.setInputFiles(filePath);
        const files = await photo.evaluate((input: HTMLInputElement) =>
            input.files ? Array.from(input.files).map(f => f.name) : []
        );

        await page.getByRole('button', { name: 'Next' }).click();
        console.log('Clicked on next button successfully');

        const name = await page.locator('#full_name');
        await name.waitFor({ state: 'visible' });
        await name.fill('Test User');
        console.log('Filled full name:', await name.inputValue());
    });

    test('Test Case 13: Verify the Seller Company name, State, Country, Phone, Email and Submit the form ', async ({ page }) => {

        const dropdown = await page.locator('#type_of_machine');
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.selectOption({ label: 'Lathe' });

        const text = await page.locator('#other_type');
        await text.waitFor({ state: 'visible' });
        await text.fill('This is for testing purpose');

        const machine = await page.locator('#machine_name');
        await machine.waitFor({ state: 'visible' });
        await machine.fill('Test Machine');

        const year = await page.locator('#machine_year');
        await year.waitFor({ state: 'visible' });
        await year.fill('2020');

        const condition = await page.locator('#Excellent');
        await condition.waitFor({ state: 'visible' });
        await condition.check();

        await page.getByRole('button', { name: 'Next' }).click();
        console.log('Clicked on next button successfully');

        const defect = await page.locator('#defects');
        await defect.waitFor({ state: 'visible' });
        await defect.fill('No defects, everything is perfect');

        const power = await page.locator('#underPowerYes');
        await power.waitFor({ state: 'visible' });
        await power.check();

        const load = await page.locator('#canLoadYes');
        await load.waitFor({ state: 'visible' });
        await load.check();

        const photo = await page.locator('#photos');
        const filePath = Path.join('tests', 'test-data', 'image.png');
        await photo.setInputFiles(filePath);
        const files = await photo.evaluate((input: HTMLInputElement) =>
            input.files ? Array.from(input.files).map(f => f.name) : []
        );
        console.log('Uploaded files:', files);

        await page.getByRole('button', { name: 'Next' }).click();
        console.log('Clicked on next button successfully');

        const name = await page.locator('#full_name');
        await name.waitFor({ state: 'visible' });
        await name.fill('Test User');

        const compnay_name = await page.locator('#company_name');
        await compnay_name.waitFor({ state: 'visible' });
        await compnay_name.fill('desklay');
        console.log('Filled company name:', await compnay_name.inputValue());

        const state = await page.locator('#state');
        await state.waitFor({ state: 'visible' });
        await state.fill('Texas');
        console.log('Filled phone number:', await state.inputValue());

        const country = await page.locator('#country');
        await country.waitFor({ state: 'visible' });

        await country.selectOption({ label: 'United States' });
        console.log('Country is ', await country.getAttribute('value'));

        const phone = await page.locator('#phone').first();
        await phone.waitFor({ state: 'visible' });
        await phone.fill('+123456776');
        console.log('Filled phone number:', await phone.inputValue());

        const email = await page.locator('#email').first();
        await email.waitFor({ state: 'visible' });
        await email.fill('admin@yopmail.com');
        console.log('Filled phone number:', await email.inputValue());

        await page.getByRole('button', { name: 'Submit' }).first().click();
        console.log('Form submitted successfully');



    });

});

