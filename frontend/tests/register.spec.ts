import { test, expect } from '@playwright/test';

test.describe('Registration Flow', () => {
  test('should allow a new user to register', async ({ page }) => {
    // Go to the registration page
    await page.goto('/auth');
    await page.waitForLoadState('networkidle');

    // Switch to the register form
    await page.click('button:has-text("Cadastre-se")');

    // Fill in the registration form
    const email = `test-user-${Date.now()}@example.com`;
    await page.fill('#name', 'Test User');
    await page.fill('#register-email', email);
    await page.fill('#register-password', 'password123');

    // Click the register button
    await page.click('button[type="submit"]:has-text("Criar conta grátis")');

    await page.pause();

    // Wait for navigation to the dashboard
    await page.waitForURL('/dashboard');

    // Check if the dashboard title is visible
    await expect(page.locator('h1:has-text("Meus Quadros")')).toBeVisible();
  });
});
