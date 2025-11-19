import { test, expect } from '@playwright/test';

test.describe('Board Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto('/auth');
    await page.waitForLoadState('networkidle');
    await page.fill('#email', 'seed-user@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('should display boards on the dashboard and allow navigation to a board', async ({ page }) => {
    // Check if the board card is visible
    const boardLink = page.locator('a:has-text("Seed Board")').first();
    await boardLink.waitFor({ state: 'visible' });
    await expect(boardLink).toBeVisible();

    // Click on the board card
    await boardLink.click();

    // Wait for navigation to the board detail page
    await page.waitForURL(/\/board\/.*/, { timeout: 15000 });

    // Check if the board title is visible
    await expect(page.locator('h1:has-text("Seed Board")')).toBeVisible();
  });
});
