const { getPackageJson } = require('../_11ty/utils/pkgJson');

const packageJson = getPackageJson();

module.exports = {
	name: packageJson.name,
	url:
		process.env.NODE_ENV === 'production'
			? packageJson.author.url
			: 'http://localhost:8080/',
};
