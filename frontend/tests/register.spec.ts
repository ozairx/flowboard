import { test, expect } from '@playwright/test';

test.describe('Registration Flow', () => {
  test('should allow a new user to register', async ({ page }) => {
    // Go to the registration page
    await page.goto('/register');
    await page.waitForLoadState('networkidle');

    // Fill in the registration form
    const email = `test-user-${Date.now()}@example.com`;
    await page.fill('#name', 'Test User');
    await page.fill('#email', email);
    await page.fill('#password', 'password123');

    // Click the register button
    await page.click('button[type="submit"]');

    // Wait for navigation to the dashboard
    await page.waitForURL('/dashboard');

    // Check if the dashboard title is visible
    await expect(page.locator('h1:has-text("Meus Quadros")')).toBeVisible();
  });
});
