const isRecent = (date, days) => {
	return (
		Math.ceil(Math.abs(Date.now() - new Date(date)) / (1000 * 60 * 60 * 24)) <=
		days
	);
};

const isSeries = (posts, title) => {
	return posts.filter((p) => p.data?.series?.title === title);
};

const seriesLocate = (collection, series) => {
	return collection.find(({ title }) => title === series.title) || {};
};

const seriesGetPart = (seriesPosts, postUrl) => {
	return [seriesPosts].indexOf(postUrl) + 1;
};

module.exports = (eleventyConfig) => {
	eleventyConfig.addFilter('isRecent', isRecent);
	eleventyConfig.addFilter('isSeries', isSeries);
	eleventyConfig.addFilter('seriesLocate', seriesLocate);
	eleventyConfig.addFilter('seriesGetPart', seriesGetPart);
};
