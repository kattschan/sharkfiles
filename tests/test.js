import { expect, test } from '@playwright/test';

test('Filename persists upload', async ({ page, context }) => {
	await page.goto('/');
	await page.waitForLoadState();
	await page.click('button');
	await page.setInputFiles('input[type=file]', {
		name: 'file.txt',
		mimeType: 'text/plain',
		buffer: Buffer.from('hello world')
	});

	// Click on the a element that opens a new tab
	const [newPage] = await Promise.all([
		context.waitForEvent('page'), // Wait for the new page to open
		page.click('div.uploadedFile a') // This triggers the new page to open
	]);

	// Wait for the new page to load
	await newPage.waitForLoadState();

	// Check the content on the new page
	expect(await newPage.locator('h1').textContent()).toBe('file.txt');
});
