import { minify } from 'html-minifier';

export const transforms = {
	minifyHtml: (content) => {
		return minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
		});
	},
};
