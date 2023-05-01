// Adapted from https://github.com/johanbrook/eleventy-plugin-reading-time
module.exports = (
	content,
	{
		useSeconds = false,
		format = true,
		speed = 235,
		preText = '',
		postText = 'min',
	} = {},
) => {
	const htmlContent = typeof content === 'string' ? content : content.content; // If content is a raw already, use it directly. If it's a page object, use the content.

	if (!htmlContent) {
		return combineText(preText, '0', postText);
	}

	const count = require('./wordCount.js')(
		require('./cleanContent.js')(htmlContent),
	);

	let est = '';

	if (useSeconds === true) {
		const min = Math.floor(count / speed);
		const sec = Math.floor((count % speed) / (speed / 60));

		if (format === true) {
			const mins = min + ' minute' + (min === 1 ? '' : 's') + ', ';
			const secs = sec + ' second' + (sec === 1 ? '' : 's');
			est = min > 0 ? mins + secs : secs;
		} else {
			est = min * 60 + sec;
		}
	} else {
		const min = Math.ceil(count / speed);

		if (format === true) {
			est = require('./combineText.js')(preText, min, postText);
		} else {
			est = min;
		}
	}
	return est;
};
