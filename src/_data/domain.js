module.exports = {
	name: 'uncenter.org',
	url:
		process.env.NODE_ENV === 'production'
			? 'https://uncenter.org/'
			: 'http://localhost:8080/',
};
