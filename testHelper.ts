import { reportToLaravel } from './reportToLaravel';
import { Page, expect } from '@playwright/test';

/**
 * Common helper to handle API test results and report to Laravel
 */
export async function handleApiTestResult({
  testName,
  featureName,
  page,
  response,
  startTime,
  successCondition,
  testResult,   // <-- MUST be here
}: {
  testName: string;
  featureName?: string;
  page: any;
  response: any;
  startTime: number;
  successCondition: () => Promise<boolean>;
  testResult: string;   // <-- MUST be here
}) {

  // 1️⃣ Duration
  const duration = Date.now() - startTime;

  // 2️⃣ Parse response safely
  let responseBody: any = {};
  let statusCode: number | null = null;

  if (response && typeof response.headers === "function") {
    try {
      const contentType = response.headers()["content-type"] || "";
      responseBody = contentType.includes("json")
        ? await response.json()
        : await response.text();

      statusCode = response.status?.() ?? null;
    } catch {
      responseBody = "[No JSON body or redirect]";
    }
  } else {
    responseBody = "[No API response captured]";
  }


  // 3️⃣ Determine pass/fail
  let passed = false;
  try {
    passed = await successCondition();
  } catch {
    passed = false;
  }

  // 4️⃣ Status
  const status = passed ? 'passed' : 'failed';
  console.log(`✅ [${featureName ?? 'General'}] ${testName} Status: ${status}`);

  // 5️⃣ Send to Laravel
  await reportToLaravel({
    testName,
    featureName,
    status,
    duration,
    response,
    responseBody,
    testResult
  });

  return { status, duration, responseBody };
}
