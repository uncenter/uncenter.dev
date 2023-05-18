const turndown = require('turndown');

const Image = require('@11ty/eleventy-img');
const imageSize = require('image-size');

const { escape } = require('lodash');
const { parseHTML } = require('linkedom');
const { markdownLibrary } = require('../../utils/plugins/markdown');

const getReadingTime = require('./utils/readingTime.js');
const cleanContent = require('./utils/cleanContent.js');
const wordCount = require('./utils/wordCount.js');
const stringifyAttributes = require('./utils/stringifyAttributes.js');
const logOutput = require('./utils/logOutput.js');

const getExcerpt = (page, classes = '') => {
	if (!page.hasOwnProperty('content')) {
		return null;
	}
	if (page.hasOwnProperty('excerpt')) {
		return page.excerpt;
	}

	let content = page.content.trim();

	content = content.replace(/^(\s*\n*)?<h\d[^>]*>.*?<\/h\d>(\s*\n*)?/i, '');

	const nextHeadingIndex = content.search(/<h\d[^>]*>/i);
	if (nextHeadingIndex !== -1) {
		content = content.substring(0, nextHeadingIndex);
	}

	const turndownRenderer = new turndown();
	text = turndownRenderer.turndown(content);

	// Split plain text into phrases and concatenate until length cutoff
	// Adapted https://github.com/mpcsh/eleventy-plugin-description]

	const phrases = text.split(/(\p{Terminal_Punctuation}\p{White_Space})/gu);
	let excerpt = '';
	while (phrases.length > 0 && excerpt.length < 200) {
		excerpt += phrases.shift();
	}

	excerpt += '...';
	const { document } = parseHTML(markdownLibrary.render(excerpt));
	document.firstChild.classList.add(classes);
	return document.documentElement.outerHTML;
};

const getCollectionWordCount = (posts) => {
	if (!posts) {
		return 0;
	}
	let words = 0;
	posts.forEach((post) => {
		words += parseInt(wordCount(cleanContent(post.content)));
	});
	return words;
};

const getCollectionReadingTime = (posts) => {
	if (!posts) {
		return 0;
	}
	let readingTime = 0;
	posts.forEach((post) => {
		readingTime += parseInt(getReadingTime(post.content));
	});
	return readingTime;
};

const getCollectionWordCountAverage = (posts) => {
	if (!posts) {
		return 0;
	}
	let words = 0;
	posts.forEach((post) => {
		words += wordCount(cleanContent(post.content));
	});
	return Math.round(words / posts.length);
};

const getCollectionAverageWordLength = (posts) => {
	if (!posts) {
		return 0;
	}
	const averageWordLengths = [];
	posts.forEach((post) => {
		const count = wordCount(cleanContent(post.content));
		const contentLength = cleanContent(post.content).length;
		const averageWordLength = Math.round(contentLength / count);
		averageWordLengths.push(averageWordLength);
	});
	return averageWordLengths && averageWordLengths.length > 0
		? Math.round(
				averageWordLengths.reduce((a, b) => a + b) / averageWordLengths.length,
		  )
		: 0;
};

const createCallout = (content, title, type) => {
	const titleText =
		title === undefined ? false : markdownLibrary.renderInline(`${title}`);
	const contentHtml = markdownLibrary.render(content);

	if (['info', 'warning', 'tip', 'note'].includes(type) === false) {
		type = 'note';
	}
	return `<div class="note note--${type}">
    ${titleText ? `<div class="note__title">${titleText}</div>` : ''}
    <div class="note__content">${contentHtml}</div>
    </div>`;
};

const insertImage = async function (src, alt, width, height) {
	if (!width || !height) {
		const originalDimensions = imageSize.imageSize(src);

		width = originalDimensions.width;
		height = originalDimensions.height;
	}

	const data = await Image(src, {
		widths: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, width]
			.filter((a) => a <= width)
			.sort((a, b) => a - b),
		formats: ['avif', 'webp', 'png'],
		outputDir: 'dist/images',
		urlPath: '/images/',
	});

	logOutput({
		prefix: 'assets:images',
		file: src,
	});

	const getLargestImage = (format) => {
		const images = data[format];
		return images[images.length - 1];
	};

	const largestImages = {
		base: getLargestImage('png'),
		optimized: getLargestImage('webp'),
	};

	const sources = Object.values(data)
		.map((formatEntries) => {
			const { sourceType } = formatEntries[0];
			const srcset = formatEntries.map((image) => image.srcset).join(', ');

			return `<source ${stringifyAttributes({
				type: sourceType,
				srcset,
				sizes: `(min-width: 70ch) 70ch, 100vw`,
			})}>`;
		})
		.join('\n');

	const picture = `
<a class="no-underline" href="${largestImages.optimized.url}">
    <picture>
        ${sources}
        <img ${stringifyAttributes({
					height: largestImages.base.height,
					width: largestImages.base.width,
					src: largestImages.base.url,
					alt: escape(alt),
					loading: 'lazy',
					decoding: 'async',
					sizes: `(min-width: 70ch) 70ch, 100vw`,
				})}>
    </picture>
</a>
`;

	return picture;
};

module.exports = (eleventyConfig) => {
	eleventyConfig.addShortcode('excerpt', getExcerpt);
	eleventyConfig.addShortcode('totalWordCount', getCollectionWordCount);
	eleventyConfig.addShortcode('totalReadingTime', getCollectionReadingTime);
	eleventyConfig.addShortcode(
		'wordCountAverage',
		getCollectionWordCountAverage,
	);
	eleventyConfig.addShortcode(
		'wordLengthAverage',
		getCollectionAverageWordLength,
	);
	eleventyConfig.addPairedShortcode('callout', createCallout);
	eleventyConfig.addPairedShortcode('note', (content, title) => {
		return createCallout(content, title, 'note');
	});
	eleventyConfig.addPairedShortcode('tip', (content, title) => {
		return createCallout(content, title, 'tip');
	});
	eleventyConfig.addPairedShortcode('warning', (content, title) => {
		return createCallout(content, title, 'warning');
	});
	eleventyConfig.addPairedShortcode('info', (content, title) => {
		return createCallout(content, title, 'info');
	});
	eleventyConfig.addNunjucksAsyncShortcode('image', insertImage);
	eleventyConfig.addShortcode('log', (...args) => {
		console.log(...args);
		return '';
	});
};
