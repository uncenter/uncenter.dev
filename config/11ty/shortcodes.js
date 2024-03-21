import path from 'node:path';
import escape from 'lodash.escape';
import sizeOf from 'image-size';
import processImage from '@11ty/eleventy-img';

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
	source = path.join('images', `${this.page.fileSlug}/${source}`);

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

export const shortcodes = (eleventyConfig) => {
	eleventyConfig.addNunjucksAsyncShortcode('image', insertImage);
	eleventyConfig.addShortcode('log', (...args) => {
		console.log(...args);
		return '';
	});
};
