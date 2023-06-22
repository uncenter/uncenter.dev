const fs = require('fs');

const { DateTime } = require('luxon');
const { markdownLibrary } = require('../../utils/plugins/markdown');

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

const toHtml = (content) => {
	return markdownLibrary.render(content);
};

const toHtmlInline = (content) => {
	return markdownLibrary.renderInline(content);
};

const readFile = (filePath) => {
	const fileContents = fs.readFileSync(filePath, (err, data) => {
		if (err) throw err;
		return data;
	});
	return fileContents.toString('utf8');
};

const includes = (check, value) => {
	if (Array.isArray(value)) {
		return value.some((v) => check.includes(v));
	}
	return check.includes(value);
};

const setAttr = (content, attribute, value = false) => {
	const regex = new RegExp(`${attribute}=".*?"`, 'g');
	let el = content.match(/<[^>]*>/)[0];
	if (el.match(regex)) {
		el = el.replace(regex, value ? `${attribute}="${value}"` : '');
	} else {
		el = el.replace('>', ` ${attribute}="${value}">`);
	}
	return content.replace(/<[^>]*>/, el);
};

const replace = (content, regex, value) => {
	return content.replace(new RegExp(regex, 'g'), value);
};

const ordinal = (number) => {
	const i = number % 10,
		j = number % 100;
	if (i === 1 && j !== 11) {
		return number + 'st';
	}
	if (i === 2 && j !== 12) {
		return number + 'nd';
	}
	if (i === 3 && j !== 13) {
		return number + 'rd';
	}
	return number + 'th';
};

const capitalize = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = (eleventyConfig) => {
	eleventyConfig.addFilter('toShortDate', toShortDate);
	eleventyConfig.addFilter('toMedDate', toMedDate);
	eleventyConfig.addFilter('toFullDate', toFullDate);
	eleventyConfig.addFilter('toShortDateTime', toShortDateTime);
	eleventyConfig.addFilter('toMedDateTime', toMedDateTime);
	eleventyConfig.addFilter('toFullDateTime', toFullDateTime);
	eleventyConfig.addFilter('toArray', toArray);
	eleventyConfig.addFilter('toHtml', toHtml);
	eleventyConfig.addFilter('toHtmlInline', toHtmlInline);
	eleventyConfig.addFilter('readingTime', require('./utils/readingTime'));
	eleventyConfig.addFilter('includes', includes);
	eleventyConfig.addFilter('setAttr', setAttr);
	eleventyConfig.addFilter('replace', replace);
	eleventyConfig.addFilter('readFile', readFile);
	eleventyConfig.addFilter('ordinal', ordinal);
	eleventyConfig.addFilter('capitalize', capitalize);
};
