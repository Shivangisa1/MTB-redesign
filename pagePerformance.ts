import { Page } from '@playwright/test';

export async function logPageLoad(page: Page) {
  const start = Date.now();

  // Wait until DOM is interactive or loaded
  try {
    await page.waitForLoadState("domcontentloaded", { timeout: 30000 });
  } catch {
    console.log("⚠️ DOM content did not load normally");
  }


  const domLoad = Date.now() - start;

  // Try to wait until full load
  try {
    await page.waitForLoadState("load", { timeout: 30000 });
  } catch {
    console.log("⚠️ Full page load event did not fire normally");
  }

  const fullLoad = Date.now() - start;
  console.log('PERFORMANCE PARAMETERS ARE AS BELOW:-----------\n')

  console.log(`⏳ DOM Loaded Time: ${domLoad} ms`);
  console.log(`⏳ Page Load Time: ${fullLoad} ms`);

  if (fullLoad > 8000) {
    console.log("⚠️ SLOW PAGE LOAD — Possible server slowness");
  }
}


/*
export async function logPageLoad(page: Page) {
  const perf = await page.evaluate(() => performance.toJSON());

  const loadTime = perf.loadEventEnd - perf.navigationStart;
  const domLoadTime = perf.domContentLoadedEventEnd - perf.navigationStart;

  console.log(`⏳ Page Load Time: ${loadTime} ms`);
  console.log(`⏳ DOM Loaded Time: ${domLoadTime} ms`);

  if (loadTime > 8000) {
    console.log("⚠️ SLOW PAGE LOAD — Possible server issue");
  }
}
*/
