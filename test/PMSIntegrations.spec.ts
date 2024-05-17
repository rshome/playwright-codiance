// PMSIntegrations.ts
import { test, expect } from '@playwright/test';
import PMSIntegrations from '../pages/PMSIntegrations.page';

test('User can integrate with third parties', async ({ page }) => {
  // Given
  const pmsIntegrationsPage = new PMSIntegrations(page);

  // When
  await pmsIntegrationsPage.navigateToIntegrations();

  // Then
  expect (await pmsIntegrationsPage.areServicesConnected()).toBe(true);
});

test.afterEach( async ({page}) => 
{
  await page.close();
})