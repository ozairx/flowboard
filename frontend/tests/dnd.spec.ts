import { test, expect } from '@playwright/test';

test.describe('Drag and Drop', () => {
  test.beforeEach(async ({ page }) => {
    // Log in and navigate to the board page before each test
    await page.goto('/auth');
    await page.waitForLoadState('networkidle');
    await page.fill('#email', 'seed-user@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
    await page.click('a:has-text("Seed Board")');
    await page.waitForURL(/\/board\/.*/, { timeout: 15000 });
  });

  test('should allow reordering of lists', async ({ page }) => {
    const lists = page.locator('[data-testid^="list-"]');
    const initialOrder = await lists.locator('h3').allTextContents();

    const sourceList = lists.nth(0);
    const destinationList = lists.nth(1);

    await sourceList.dragTo(destinationList);

    const finalOrder = await lists.locator('h3').allTextContents();

    expect(finalOrder[0]).toBe(initialOrder[1]);
    expect(finalOrder[1]).toBe(initialOrder[0]);
  });
});
