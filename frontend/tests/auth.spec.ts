import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should allow a user to log in and log out', async ({ page }) => {
    // Go to the login page
    await page.goto('/login');
    await page.waitForLoadState('networkidle');

    // Fill in the login form
    await page.fill('#email', 'seed-user@example.com');
    await page.fill('#password', 'password123');

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for navigation to the dashboard
    await page.waitForURL('/dashboard');

    // Check if the dashboard title is visible
    await expect(page.locator('h1:has-text("Meus Quadros")')).toBeVisible();

    // Click the logout button
    await page.click('button:has-text("Sair")');

    // Wait for navigation back to the login page
    await page.waitForURL('/login');

    // Check if the login form is visible again
    await expect(page.locator('form')).toBeVisible();
  });
});
