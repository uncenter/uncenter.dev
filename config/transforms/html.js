import { minify } from 'html-minifier';

export function minifyHtml(content) {
	const minified = minify(content, {
		useShortDoctype: true,
		removeComments: true,
		collapseWhitespace: true,
	});

	return minified;
}
