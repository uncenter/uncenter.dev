const cleanContent = require('./cleanContent.js');
const combineText = require('./combineText.js');
const wordCount = require('./wordCount.js');

// Adapted from https://github.com/johanbrook/eleventy-plugin-reading-time
module.exports = (
	content,
	{ speed = 235, preText = '', postText = '' } = {},
) => {
	const htmlContent = typeof content === 'string' ? content : content.content; // If content is a raw already, use it directly. If it's a page object, use the content.

	if (!htmlContent) {
		return combineText(preText, '0', postText);
	}

	const count = wordCount(cleanContent(htmlContent));

	return combineText(preText, Math.ceil(count / speed), postText);
};
