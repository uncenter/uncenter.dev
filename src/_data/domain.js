module.exports = {
	name: require('../../package.json').name,
	url:
		process.env.NODE_ENV === 'production'
			? require('../../package.json').author.url
			: 'http://localhost:8080/',
};
