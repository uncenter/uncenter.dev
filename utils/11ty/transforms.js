const { minify } = require('html-minifier');

module.exports = {
	// Minify HTML.
	minifyHtml: (content) => {
		return minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
		});
	},
};
