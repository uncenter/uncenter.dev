const cleanContent = require('./cleanContent.js');
const combineText = require('./combineText.js');
const wordCount = require('./wordCount.js');

// Via: https://github.com/johanbrook/eleventy-plugin-reading-time
module.exports = (content, { preText = '', postText = '' } = {}) => {
	if (!content || content === '') {
		return combineText(preText, '0', postText);
	}

	const count = wordCount(cleanContent(content));

	return combineText(preText, Math.ceil(count / 235), postText);
};
