import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',

  //globalSetup: './global.setup.ts', //NEW ADD FOR AUTHENTICATION - modularmultileg


  use: {
    baseURL: 'https://dev.machinetoolbids.com/',
    actionTimeout: 20_000,  // for performance testing
    navigationTimeout: 30_000,

    // storageState: 'auth.json', // NEW ADD FOR AUTHENTICATION - modularmultileg


    acceptDownloads: true,    // always allow downloads in tests
    headless: true,
    screenshot: 'on',
    trace: 'on',
    video: 'on',

    // video: 'retain-on-failure',
  },

  reporter: [

    ['list'],
    ['html', { outputFolder: 'playwright-report-project1' }],
    ['allure-playwright', {
      outputFolder: 'allure-results-project1',  // Unique folder
      detail: true,
      suiteTitle: true,

      environmentInfo: {
        'Project': 'Machine Tool Bids - Project',
        'Environment': 'Development',
        'Base URL': 'https://dev.machinetoolbids.com/',
        'Browser': 'Chromium Firefox Webkit edge',
        'Test Run': 'Regression Suite',
      },


    }]
  ],

});