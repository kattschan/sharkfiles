import { expect, test } from '@playwright/test';

test('Upload test - filename', async ({ page, context }) => {
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
		page.click('div.uploadedFile a')
	]);
	await newPage.waitForLoadState();
	expect(await newPage.getByText('file.txt')).toBeTruthy();
});

test('Upload test - size', async ({ page, context }) => {
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
		page.click('div.uploadedFile a')
	]);
	await newPage.waitForLoadState();
	expect(await newPage.getByText('Size: 31 B')).toBeTruthy();
});

test('Upload test - type', async ({ page, context }) => {
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
		page.click('div.uploadedFile a')
	]);
	await newPage.waitForLoadState();
	expect(await newPage.getByText('Type: text/plain')).toBeTruthy();
});

test('Upload test - content', async ({ page, context }) => {
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
		page.click('div.uploadedFile a')
	]);
	await newPage.waitForLoadState();
	const downloadPromise = newPage.waitForEvent('download');
	await newPage.click('a[download]');
	const download = await downloadPromise;
	const content = await download.createReadStream();
	const chunks = [];
	for await (const chunk of content) {
		chunks.push(chunk);
	}
	expect(chunks.join('')).toBe('hello world');
});
