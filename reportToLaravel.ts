import { request } from '@playwright/test';
import { Page, expect } from '@playwright/test';


/**
 * Sends test result data to Laravel backend
 */
export async function reportToLaravel({
  testName,
  featureName,
  status,
  duration,
  response,
  responseBody,
  testResult,    // <-- MUST be here
}: {
  testName: string;
  featureName?: string;
  status: string;
  duration: number;
  response: any;
  responseBody: any;
  testResult?: string;  // <-- MUST be here
}) {
  const LARAVEL_API_URL =
    'http://localhost/tpac-tests/laravel-backend/public/api/automation-results';

  try {
    const api = await request.newContext();

    const responseUrl = response?.url ? response.url() : '[No response URL]';
    const responseStatus = response?.status ? response.status() : 404;
    const responseHeaders = response?.headers ? response.headers() : {};

    const payload = {
      feature_name: featureName ?? 'General',
      test_name: testName,
      status,
      duration,
      response_url: responseUrl,
      response_status: responseStatus,
      response_headers: responseHeaders,
      response_body: responseBody,
      executed_at: new Date().toISOString(),
      test_result: testResult ?? '-',
    };


    console.log("📤 Payload being sent to Laravel:", payload);

    const postResponse = await api.post(LARAVEL_API_URL, {
      data: payload,
    });


    if (postResponse.ok()) {
      console.log(` Sent "${testName}" (${featureName} - ${status}) result to Laravel.`);
    } else {
      console.error(` Laravel responded with ${postResponse.status()} for "${testName}".`);
    }
  } catch (error) {
    console.error(` Error sending result for "${testName}":`, error);
  }
}
