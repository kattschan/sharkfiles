// This will only work in the Docker container by default
module.exports = {
	apps: [
		{
			name: 'frontend',
			script: 'build/index.js',
			cwd: '/app'
		},
		{
			name: 'backend',
			script: 'express.js', // The entry point of your Express.js application
			cwd: '/app'
		}
	]
};
