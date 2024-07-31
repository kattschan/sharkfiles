import { defineConfig, devices } from 'playwright/test';
/** @type {import('@playwright/test').PlaywrightTestConfig} */
export default defineConfig({
	webServer: {
		command:
			'docker build -t sharkfiles -f tests/Dockerfile . && docker run -p 4000:4000 -p 3000:3000 sharkfiles',
		port: 3000
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome']
			}
		},
		{
			name: 'Mobile Safari',
			use: {
				...devices['iPhone 13']
			}
		}
	]
});
