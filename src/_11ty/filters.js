const wordCount = require('./utils/wordCount.js');
const cleanContent = require('./utils/cleanContent.js');
const combineText = require('./utils/combineText.js');

const getWordCount = (content, { preText = '', postText = '' } = {}) => {
	const htmlContent = typeof content === 'string' ? content : content.content;

	if (!htmlContent) {
		return combineText(preText, '0', postText);
	}

	const count = wordCount(cleanContent(htmlContent));

	return combineText(preText, count, postText);
};

const isRecent = (date, days) => {
	return (
		Math.ceil(Math.abs(new Date() - new Date(date)) / (1000 * 60 * 60 * 24)) <=
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
	return seriesPosts.findIndex((url) => url === postUrl) + 1;
};

module.exports = (eleventyConfig) => {
	eleventyConfig.addFilter('readingTime', require('./utils/readingTime'));
	eleventyConfig.addFilter('wordCount', getWordCount);

	eleventyConfig.addFilter('isRecent', isRecent);

	eleventyConfig.addFilter('isSeries', isSeries);
	eleventyConfig.addFilter('seriesLocate', seriesLocate);
	eleventyConfig.addFilter('seriesGetPart', seriesGetPart);
};
