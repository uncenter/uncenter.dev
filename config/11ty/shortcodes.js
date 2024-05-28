import path from 'node:path';
import image from '@11ty/eleventy-img';
import dimensions from 'image-size';
// biome-ignore lint/suspicious/noShadowRestrictedNames: Eh escape sounds better.
import escape from 'lodash.escape';

const IMAGE_OPTIMIZATION =
	process.env.IMAGE_OPTIMIZATION === '0' ||
	process.env.IMAGE_OPTIMIZATION === 'false'
		? false
		: true;

const stringifyAttributes = (attrs) =>
	Object.entries(attrs)
		.map(([attr, value]) => {
			if (value === undefined || value === '') return '';
			return `${attr}="${value}"`;
		})
		.join(' ');

const insertImage = async function (source, alt) {
	if (!source) throw new Error('Missing source for image shortcode');
	if (!alt) throw new Error('Missing alt for image shortcode');

	source = path.join('images', `${this.page.fileSlug}/${source}`);

	const { width } = dimensions(source);

	const data = await image(source, {
		widths: IMAGE_OPTIMIZATION
			? [640, 750, 828, 1080, 1200, 1920, 2048, 3840, width]
					.filter((a) => a <= width)
					.sort((a, b) => a - b)
			: [width],
		formats: IMAGE_OPTIMIZATION ? ['avif', 'webp', 'png'] : ['png'],
		outputDir: 'dist/assets/images/',
		urlPath: '/assets/images/',
	});

	const base = data['png'].at(-1);
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
`;
};

export const shortcodes = (eleventyConfig) => {
	eleventyConfig.addNunjucksAsyncShortcode('image', insertImage);
	eleventyConfig.addShortcode('log', (...args) => {
		console.log(...args);
		return '';
	});
};
