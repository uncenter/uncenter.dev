const fs = require('fs');
const turndown = require('turndown');

const Image = require('@11ty/eleventy-img');
const imageSize = require('image-size');
const meta = require('../_data/meta.json');

const { escape } = require('lodash');
const { markdownLibrary } = require('../../utils/plugins/markdown');

const getReadingTime = require('./utils/readingTime.js');
const cleanContent = require('./utils/cleanContent.js');
const wordCount = require('./utils/wordCount.js');
const stringifyAttributes = require('./utils/stringifyAttributes.js');
const logOutput = require('./utils/logOutput.js');

const getExcerpt = (page) => {
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

	turndownRenderer = new turndown();
	text = turndownRenderer.turndown(content);

	// Split plain text into phrases and concatenate until length cutoff
	// Adapted https://github.com/mpcsh/eleventy-plugin-description]

	const phrases = text.split(/(\p{Terminal_Punctuation}\p{White_Space})/gu);
	let excerpt = '';
	while (phrases.length > 0 && excerpt.length < 200) {
		excerpt += phrases.shift();
	}

	excerpt += '...';
	return markdownLibrary.render(excerpt);
};

const getCollectionWordCount = (posts) => {
	let words = 0;
	posts.forEach((post) => {
		words += parseInt(wordCount(cleanContent(post.content)));
	});
	return words;
};

const getCollectionReadingTime = (posts) => {
	let readingTime = 0;
	posts.forEach((post) => {
		readingTime += parseInt(
			getReadingTime(post.content, {
				useSeconds: false,
				format: false,
				speed: 235,
				preText: '',
				postText: '',
			}),
		);
	});
	return readingTime;
};

const getCollectionWordCountAverage = (posts) => {
	let words = 0;
	posts.forEach((post) => {
		words += wordCount(cleanContent(post.content));
	});
	return Math.round(words / posts.length);
};

const getCollectionAverageWordLength = (posts) => {
	averageWordLengths = [];
	posts.forEach((post) => {
		const count = wordCount(cleanContent(post.content));
		const contentLength = cleanContent(post.content).length;
		const averageWordLength = Math.round(contentLength / count);
		averageWordLengths.push(averageWordLength);
	});
	return Math.round(
		averageWordLengths.reduce((a, b) => a + b) / averageWordLengths.length,
	);
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

const createCalloutNote = (content, title) => {
	return createCallout(content, title, 'note');
};

const createCalloutTip = (content, title) => {
	return createCallout(content, title, 'tip');
};

const createCalloutWarning = (content, title) => {
	return createCallout(content, title, 'warning');
};

const createCalloutInfo = (content, title) => {
	return createCallout(content, title, 'info');
};

const insertGiscusScript = () => {
	const repo = 'R_kgDOHSjhjQ';
	const category = 'DIC_kwDOHSjhjc4CTQUr';
	const reactions = '1';
	return `
    <script>
    let giscusTheme = "light";
    let giscusAttributes = {
        "src": "https://giscus.app/client.js",
        "data-repo": "${meta.github.username}/${meta.github.repo}",
        "data-repo-id": "${repo}",
        "data-category-id": "${category}",
        "data-mapping": "title",
        "data-reactions-enabled": "${reactions}",
        "data-emit-metadata": "0",
        "data-input-position": "top",
        "data-theme": giscusTheme,
        "data-lang": "en",
        "crossorigin": "anonymous",
        "async": ""
    };
    let giscusScript = document.createElement("script");
    Object.entries(giscusAttributes).forEach(([key, value]) => giscusScript.setAttribute(key, value));
    window.onload = (event) => {
        document.querySelector('#giscus').appendChild(giscusScript);
    };
    </script>`;
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
					class: 'container',
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
	eleventyConfig.addPairedShortcode('note', createCalloutNote);
	eleventyConfig.addPairedShortcode('tip', createCalloutTip);
	eleventyConfig.addPairedShortcode('warning', createCalloutWarning);
	eleventyConfig.addPairedShortcode('info', createCalloutInfo);
	eleventyConfig.addShortcode('giscus', insertGiscusScript);
	eleventyConfig.addNunjucksAsyncShortcode('image', insertImage);
	eleventyConfig.addShortcode('log', (...args) => {
		console.log(...args);
	});
};
