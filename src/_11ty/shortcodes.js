const fs = require('node:fs/promises');
const path = require('node:path');

const EleventyImage = require('@11ty/eleventy-img');
const { imageSize } = require('image-size');
const { escape } = require('lodash');

const log = require('./utils/log.js');

const IMAGE_OPTIMIZATION =
	process.env.IMAGE_OPTIMIZATION === '0' ||
	process.env.IMAGE_OPTIMIZATION === 'false'
		? false
		: true;

function stringifyAttributes(attributeMap) {
	return Object.entries(attributeMap)
		.map(([attribute, value]) => {
			if (value === undefined || value === '') return '';
			return `${attribute}="${value}"`;
		})
		.join(' ');
}

const insertImage = async function (source, alt, classes) {
	source = path.join('images', source);
	try {
		await fs.access(source);
	} catch {
		throw new Error(`[images] File not found: ${source}`);
	}
	const { width } = imageSize(source);

	const data = await EleventyImage(source, {
		widths: IMAGE_OPTIMIZATION
			? [640, 750, 828, 1080, 1200, 1920, 2048, 3840, width]
					.filter((a) => a <= width)
					.sort((a, b) => a - b)
			: [width],
		formats: IMAGE_OPTIMIZATION ? ['avif', 'webp', 'png'] : ['png'],
		outputDir: 'dist/assets/images/',
		urlPath: '/assets/images/',
	});

	log.output({ category: 'images', message: source });

	const getLargestImage = (format) => {
		if (!(format in data)) return false;
		const images = data[format];
		return images.at(-1);
	};

	const base = getLargestImage('png');

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
<a class="no-underline" href="${(getLargestImage('webp') || base).url}">
    <picture>
        ${sources}
        <img ${stringifyAttributes({
					height: base.height,
					width: base.width,
					src: base.url,
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
