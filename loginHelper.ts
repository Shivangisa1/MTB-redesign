import { Page } from "@playwright/test";
import { handleApiTestResult } from "./testHelper";

const APP_URL = "https://dev.machinetoolbids.com";
//const VALID_EMAIL = "admin@mailinator.com";
//const VALID_PASSWORD = "Tpac@123";

export async function login(page: Page) {
  await page.goto(APP_URL);

  const startTime = Date.now();

  // Perform login (NO waitForResponse)
  //await page.fill("#email", VALID_EMAIL);
  //await page.fill("#password", VALID_PASSWORD);

  const [navigation] = await Promise.all([
    page.waitForNavigation({ waitUntil: "load", timeout: 15000 }),
    page.click('button[type="submit"]'),
  ]);

  // If navigated to dashboard → success
  if (page.url().includes("/dashboard")) {
    console.log("✅ Logged in successfully.");
    return { success: true, startTime, response: navigation };
  }

  // Otherwise → login failed
  console.log("🔴 Login failed — Triggering common handler.");
  await handleApiTestResult({
    testName: 'Login to MTB dashboards', //"Login Failed — Please check credentials",
    featureName: "Login",
    page,
    response: navigation,
    startTime,
    successCondition: async () => false,
    testResult: 'Invalid credentials',
  });

  return { success: false, startTime, response: navigation };
}
