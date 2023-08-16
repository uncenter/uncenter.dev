const packageJson = require('./pkgJson');

const baseUrl = new URL(
	process.env.NODE_ENV === 'production'
		? packageJson.author.url
		: 'http://localhost:8080/',
);
module.exports = (path = '', base = baseUrl) => {
	return new URL(path, base);
};