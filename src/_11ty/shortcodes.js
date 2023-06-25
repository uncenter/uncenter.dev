const fs = require('fs/promises');

const Image = require('@11ty/eleventy-img');
const imageSize = require('image-size');

const { escape } = require('lodash');
const { markdownLibrary } = require('../../utils/plugins/markdown');

const stringifyAttributes = require('./utils/stringifyAttributes.js');
const log = require('./utils/log.js');
const kleur = require('kleur');

const createCallout = (content, title, type) => {
	const titleText =
		title === undefined ? false : markdownLibrary.renderInline(`${title}`);
	const contentHtml = markdownLibrary.render(content);

	if (['info', 'warning', 'tip', 'note'].includes(type) === false) {
		type = 'note';
	}
	return `<div class="note note-${type}">
    ${titleText ? `<div class="note-title">${titleText}</div>` : ''}
    <div>${contentHtml}</div>
    </div>`;
};

const insertImage = async function (src, alt, width, height) {
	try {
		await fs.access(src);
	} catch (error) {
		console.log(kleur.red(`[11ty][images] File not found: ${src}`));
		return;
	}
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
		outputDir: 'dist/assets/images/',
		urlPath: '/assets/images/',
	});

	log.output({ category: 'images', file: src });

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
