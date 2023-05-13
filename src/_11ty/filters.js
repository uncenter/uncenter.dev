const fs = require('fs');

const { DateTime } = require('luxon');
const { markdownLibrary } = require('../../utils/plugins/markdown');

const wordCount = require('./utils/wordCount.js');
const cleanContent = require('./utils/cleanContent.js');
const combineText = require('./utils/combineText.js');

const toDateTime = (dateObj) => {
	return dateObj;
};

const toRFC3339 = (dateObj) => {
	let split = dateObj.split('.');
	split.pop();
	return split.join('') + 'Z';
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

const getWordCount = (content, { preText = '', postText = '' } = {}) => {
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
	return (
		Math.ceil(Math.abs(new Date() - new Date(date)) / (1000 * 60 * 60 * 24)) <=
		days
	);
};

const includes = (check, value) => {
	if (Array.isArray(value)) {
		return value.some((v) => check.includes(v));
	}
	return check.includes(value);
};

const setAttribute = (content, attribute, value = false) => {
	const regex = new RegExp(`${attribute}=".*?"`, 'g');
	let el = content.match(/<[^>]*>/)[0];
	if (el.match(regex)) {
		el = el.replace(regex, value ? `${attribute}="${value}"` : '');
	} else {
		el = el.replace('>', ` ${attribute}="${value}">`);
	}
	return content.replace(/<[^>]*>/, el);
};

const cleanFeed = (content) => {
	content = content
		.replace(/<a class="anchor" href=".*?" aria-hidden="true">#<\/a>/g, '')
		.replace(/<div class="language-id">.*?<\/div>/g, '')
		.replace(/<div id="section-tags" [^>]*>.*?<\/div>/g, '')
		.replace(/<nav id="section-toc" [^>]*>.*?<\/nav>/g, '');
	return content;
};

const merge = (a, b) => {
	return Object.assign({}, a, b);
};

const parseUrlPath = (url) => {
	return url.replace(/^(?:\/\/|[^/]+)*\//, '/');
};
module.exports = (eleventyConfig) => {
	eleventyConfig.addFilter('toDateTime', toDateTime);
	eleventyConfig.addFilter('toRFC3339', toRFC3339);
	eleventyConfig.addFilter('toShortDate', toShortDate);
	eleventyConfig.addFilter('toMedDate', toMedDate);
	eleventyConfig.addFilter('toFullDate', toFullDate);
	eleventyConfig.addFilter('toShortDateTime', toShortDateTime);
	eleventyConfig.addFilter('toMedDateTime', toMedDateTime);
	eleventyConfig.addFilter('toFullDateTime', toFullDateTime);
	eleventyConfig.addFilter('toArray', toArray);
	eleventyConfig.addFilter('toHTML', toHTML);
	eleventyConfig.addFilter('getCommitCategory', getCommitCategory);
	eleventyConfig.addFilter('getCommitMessage', getCommitMessage);
	eleventyConfig.addFilter('readingTime', require('./utils/readingTime'));
	eleventyConfig.addFilter('wordCount', getWordCount);
	eleventyConfig.addFilter('getIndex', getIndex);
	eleventyConfig.addFilter('isRecent', isRecent);
	eleventyConfig.addFilter('dumpContents', dumpContents);
	eleventyConfig.addFilter('includes', includes);
	eleventyConfig.addFilter('cleanFeed', cleanFeed);
	eleventyConfig.addFilter('setAttr', setAttribute);
	eleventyConfig.addFilter('merge', merge);
	eleventyConfig.addFilter('parseUrlPath', parseUrlPath);
};
