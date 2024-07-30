/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	webServer: {
		command:
			'docker build -t sharkfiles -f tests/Dockerfile . && docker run -p 4000:4000 -p 3000:3000 sharkfiles',
		port: 3000
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
