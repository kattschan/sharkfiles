import { expect, test } from '@playwright/test';

test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await page.waitForLoadState();
	// wait a second!
	await page.waitForTimeout(1000);
	await page.click('button');
	await page.setInputFiles('input[type=file]', { name: 'file.txt', mimeType: 'text/plain', buffer: Buffer.from('hello world') });
	// click on the a element
	await page.click('div.uploadedFile a');
	await expect(page.locator('h1')).toBeVisible();
});
