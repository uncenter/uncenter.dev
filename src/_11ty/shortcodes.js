const fs = require('node:fs/promises');
const path = require('node:path');

const Image = require('@11ty/eleventy-img');
const imageSize = require('image-size');
const { escape } = require('lodash');

const log = require('./utils/log.js');

const insertImage = async function (source, alt, classes) {
	function stringifyAttributes(attributeMap) {
		return Object.entries(attributeMap)
			.map(([attribute, value]) => {
				if (value === undefined || value === '') return '';
				return `${attribute}="${value}"`;
			})
			.join(' ');
	}

	source = path.join('images', source);
	try {
		await fs.access(source);
	} catch {
		throw new Error(`[images] File not found: ${source}`);
	}
	const dimensions = imageSize.imageSize(source);
	const width = dimensions.width;

	const data = await Image(source, {
		widths: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, width]
			.filter((a) => a <= width)
			.sort((a, b) => a - b),
		formats: ['avif', 'webp', 'png'],
		outputDir: 'dist/assets/images/',
		urlPath: '/assets/images/',
	});

	log.output({ category: 'images', file: source });

	const getLargestImage = (format) => {
		const images = data[format];
		return images.at(-1);
	};

	const largestImages = {
		base: getLargestImage('png'),
		optimized: getLargestImage('webp'),
	};

	const sizes = '(min-width: 80ch) 80ch, 100vw';

	const sources = Object.values(data)
		.map((formatEntries) => {
			const { sourceType } = formatEntries[0];
			const srcset = formatEntries.map((image) => image.srcset).join(', ');

			return `<source ${stringifyAttributes({
				type: sourceType,
				srcset,
				sizes,
			})}>`;
		})
		.join('\n');

	return `
<a class="no-underline" href="${largestImages.optimized.url}">
    <picture>
        ${sources}
        <img ${stringifyAttributes({
					height: largestImages.base.height,
					width: largestImages.base.width,
					src: largestImages.base.url,
					class: classes,
					alt: escape(alt),
					loading: 'lazy',
					decoding: 'async',
					sizes,
				})}>
    </picture>
</a>
`;
};

module.exports = (eleventyConfig) => {
	eleventyConfig.addNunjucksAsyncShortcode('image', insertImage);
	eleventyConfig.addShortcode('log', (...args) => {
		console.log(...args);
		return '';
	});
};
