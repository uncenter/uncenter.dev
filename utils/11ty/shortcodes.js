const path = require('node:path');
const escape = require('lodash.escape');
const sizeOf = require('image-size');
const processImage = require('@11ty/eleventy-img');

const IMAGE_OPTIMIZATION =
	process.env.IMAGE_OPTIMIZATION === '0' ||
	process.env.IMAGE_OPTIMIZATION === 'false'
		? false
		: true;

const stringifyAttributes = (attributeMap) => {
	return Object.entries(attributeMap)
		.map(([attribute, value]) => {
			if (value === undefined || value === '') return '';
			return `${attribute}="${value}"`;
		})
		.join(' ');
};

const insertImage = async function (source, alt, options) {
	const classes = options?.classes || '';
	const dark = options?.dark || false;

	if (!dark) {
		source = path.join('images', `${this.page.fileSlug}/${source}`);
	} else if (dark !== -1) {
		return (
			(await insertImage(
				path.join('images', `${this.page.fileSlug}/${source}`),
				alt,
				{ classes: classes + ' light', dark: -1 },
			)) +
			(await insertImage(
				path.join('images', `${this.page.fileSlug}/${dark}`),
				alt,
				{
					classes: classes + ' dark',
					dark: -1,
				},
			))
		);
	}

	const dimensions = sizeOf(source);

	const data = await processImage(source, {
		widths: IMAGE_OPTIMIZATION
			? [640, 750, 828, 1080, 1200, 1920, 2048, 3840, dimensions.width]
					.filter((a) => a <= dimensions.width)
					.sort((a, b) => a - b)
			: [dimensions.width],
		formats: IMAGE_OPTIMIZATION ? ['avif', 'webp', 'png'] : ['png'],
		outputDir: 'dist/assets/images/',
		urlPath: '/assets/images/',
	});

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
			const srcset = formatEntries
				.map((image) => image.srcset)
				.join(', ');

			return `<source ${stringifyAttributes({
				type: sourceType,
				srcset,
				sizes,
			})}>`;
		})
		.join('\n');

	return `
<a class="no-underline ${classes}" href="${
		(getLargestImage('webp') || base).url
	}">
    <picture>
        ${sources}
        <img ${stringifyAttributes({
			height: base.height,
			width: base.width,
			src: base.url,
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
