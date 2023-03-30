const fs = require('fs');

const { DateTime } = require('luxon');
const { markdownLibrary } = require('../../utils/plugins/markdown');

const wordCount = require('./utils/wordCount.js');
const cleanContent = require('./utils/cleanContent.js');

const toDateTime = (dateObj) => {
	return dateObj;
};

const toShortDate = (dateObj) => {
	// 10/14/1983
	return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat('MM/dd/yyyy');
};

const toMedDate = (dateObj) => {
	// Oct 14, 1983
	return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat('MMM dd, yyyy');
};

const toFullDate = (dateObj) => {
	// October 14, 1983
	return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat('MMMM dd, yyyy');
};

const toShortDateTime = (dateObj) => {
	// 10/14/1983, 10:30 PM
	return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat(
		'MM/dd/yyyy, hh:mm a',
	);
};

const toMedDateTime = (dateObj) => {
	// Oct 14, 1983, 10:30 PM
	return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat(
		'MMM dd, yyyy, hh:mm a',
	);
};

const toFullDateTime = (dateObj) => {
	// October 14, 1983, 10:30 PM
	return DateTime.fromISO(dateObj, { zone: 'utc' }).toFormat(
		'MMMM dd, yyyy, hh:mm a',
	);
};

const toArray = (value) => {
	if (Array.isArray(value)) {
		return value;
	}
	return [value];
};

const toHTML = (content) => {
	return markdownLibrary.render(content);
};

const getCommitCategory = (str) => {
	return str.split(':')[0];
};

const getCommitMessage = (str) => {
	if (str.split(':').length > 2) {
		let emoji = '';
		for (let i = 2; i < str.split(':').length; i++) {
			emoji += ':' + str.split(':')[i];
		}
		return markdownLibrary.renderInline(emoji.trim());
	}
	return str.split(':')[1];
};

// Example: {{ '/icons/example.svg' | dumpContents }}
// Taken from https://bnijenhuis.nl/notes/load-file-contents-in-eleventy/
const dumpContents = (filePath) => {
	const fileContents = fs.readFileSync(filePath, (err, data) => {
		if (err) throw err;
		return data;
	});
	return fileContents.toString('utf8');
};

// Adapted from https://github.com/johanbrook/eleventy-plugin-reading-time
const getReadingTime = (
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

	const count = wordCount(cleanContent(htmlContent));

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
			est = combineText(preText, min, postText);
		} else {
			est = min;
		}
	}
	return est;
};

const getWordCount = (content, { preText = '', postText = 'words' } = {}) => {
	const htmlContent = typeof content === 'string' ? content : content.content;

	if (!htmlContent) {
		return combineText(preText, '0', postText);
	}

	const count = wordCount(cleanContent(htmlContent));

	return combineText(preText, count, postText);
};

const getIndex = (iterable, index) => {
	return iterable[index];
};

const isRecent = (date, days) => {
	const today = new Date();
	const dateObj = new Date(date);
	const diffTime = Math.abs(today - dateObj);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	if (typeof days === 'array') {
		for (let i = 0; i < days.length; i++) {
			if (diffDays <= days[i]) {
				return true;
			}
		}
		return false;
	}
	return diffDays <= days;
};

const includes = (check, value) => {
	return check.includes(value);
};

const cleanFeed = (content) => {
	content = content
		.replace(/<a class="anchor" href=".*?" aria-hidden="true">#<\/a>/g, '')
		.replace(/<div class="language-id">.*?<\/div>/g, '');
	return content;
};

module.exports = {
	toDateTime,
	toShortDate,
	toMedDate,
	toFullDate,
	toShortDateTime,
	toMedDateTime,
	toFullDateTime,
	toArray,
	toHTML,
	getCommitCategory,
	getCommitMessage,
	getReadingTime,
	getWordCount,
	getIndex,
	isRecent,
	dumpContents,
	includes,
	cleanFeed,
};

function combineText(pre, value, post) {
	if (pre !== '' && postText !== '') {
		return pre + ' ' + value + ' ' + post;
	} else if (post !== '') {
		return value + ' ' + post;
	} else if (pre !== '') {
		return pre + ' ' + value;
	} else {
		return value;
	}
}
