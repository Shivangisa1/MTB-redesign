import { Page, Response } from '@playwright/test';

export function monitorAPI(page: Page, threshold: number = 3000) {
    page.on("response", async (res: Response) => {
        try {
            const timing = await res.request().timing();
            const url = res.url();

            const duration = timing.responseEnd - timing.requestStart;

            if (duration < threshold) {
                console.log(`⚠️ SLOW API: ${url} took ${duration} ms`);
            }
        } catch (e) {
            // ignore errors
        }
    });
}
