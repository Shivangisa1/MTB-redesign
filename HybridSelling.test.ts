import { test, expect } from '@playwright/test';
import { clear } from 'console';
import Path from 'path';

let requestId: string;
//test.use({ storageState: 'auth.json' });


test.describe('Validating the Single Sales Machine', () => {
    test.beforeEach(async ({ request }) => {
        const response = await request.post('https://dev.machinetoolbids.com/api/surplus-request', {
            data: {
                type_of_machine: 'Milling',
                other_type: 'testing done',
                machine_name: 'Test Machine',
                machine_year: '2020',
                condition: 'Excellent',
                defects: 'No defects found',
                under_power: 'yes',
                name: 'can_load',
                photos: [],
                full_name: 'test user1',
                company_name: 'desklay1',
                state: 'cusino',
                country: 'United states',
                phone: '+123456776',
                email: 'admin@yopmail.com',
                cf_turnstile_response: '1x00000000000000000000AA',
                page_name: 'Submit Your Equipment',
                page_url: 'http://ec2-54-87-172-131.compute-1.amazonaws.com:3000/selling'

            },
        });
        const status = response.status();
        console.log('Status code:', status);
        const text = await response.text();
        console.log('Response body:', await response.text());   // works here...

        if (!response.ok()) {

            throw new Error(`Create surplus request failed: ${status}\n${text}`);
        }


        // Content-Type Validation
        const contentType = response.headers()['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error(`❌ Expected JSON but got: ${contentType}\nBody:\n${text}`);
        }

        const body = await response.json();
        requestId = body.requestId || body.id;
        console.log("🟢 Request Created with ID:", requestId);



        /*
        const body = JSON.parse(text || '{}');   // this is html not json
        requestId = body.id || body.requestId || body._id;
        console.log('🟢 Created Surplus Request via API:', requestId);*/



    });


    test('Test Case 1: Verify the type of Machines ', async ({ page }) => {
        await page.goto('http://ec2-54-87-172-131.compute-1.amazonaws.com:3000/selling/');

        const dropdown = await page.locator('#type_of_machine');
        await dropdown.waitFor({ state: 'visible' });

        // Select by visible text
        await dropdown.selectOption({ label: 'Lathe' });
        const selectedValue = await dropdown.inputValue();
        console.log('Selected machine type:', selectedValue);
        expect(selectedValue).toContain('Lathe');


        const text = await page.locator('#other_type');
        await text.waitFor({ state: 'visible' });
        await text.fill('This is for testing purpose');
        console.log('Value in other machine types', await text.inputValue());


        const machine = await page.locator('#machine_name');
        await machine.waitFor({ state: 'visible' });
        await machine.fill('Test Machine');

        const year = await page.locator('#machine_year');
        await year.waitFor({ state: 'visible' });
        await year.fill('2020');


        const condition = await page.locator('#Excellent');
        await condition.waitFor({ state: 'visible' });
        await condition.check();

        await expect(condition).toBeChecked();

        //Print the value (for confirmation)
        const value = await condition.getAttribute('value');
        console.log('Selected condition:', value);


        await page.getByRole('button', { name: 'Next' }).click();
        console.log('Clicked on next button successfully');

        const defect = await page.locator('#defects');
        await defect.waitFor({ state: 'visible' });
        await defect.fill('No defects, everything is perfect');
        console.log('The defects in machine if found :', await defect.inputValue());



        const power = await page.locator('#underPowerYes');
        await power.waitFor({ state: 'visible' });
        await power.check();
        await expect(power).toBeChecked();
        console.log('The power option selected is :', await power.getAttribute('value'));



        const load = await page.locator('#canLoadYes');
        await load.waitFor({ state: 'visible' });
        await load.check();
        await expect(load).toBeChecked();
        console.log('The load option selected is :', await load.getAttribute('value'));


        const photo = await page.locator('#photos');
        const filePath = Path.join(__dirname, 'test-data', 'image.png');
        await photo.setInputFiles(filePath);
        const files = await photo.evaluate((input: HTMLInputElement) =>
            input.files ? Array.from(input.files).map(f => f.name) : []
        );
        console.log('Uploaded files:', files);

        // Continue with next steps
        await page.locator('button.next').click();



        const name = await page.locator('#full_name');
        await name.waitFor({ state: 'visible' });
        await name.fill('Test User');
        console.log('Filled full name:', await name.inputValue());

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

