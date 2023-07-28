const isRecent = (date, days) => {
	return (
		Math.ceil(Math.abs(Date.now() - new Date(date)) / (1000 * 60 * 60 * 24)) <=
		days
	);
};

module.exports = (eleventyConfig) => {
	eleventyConfig.addFilter('isRecent', isRecent);
};
