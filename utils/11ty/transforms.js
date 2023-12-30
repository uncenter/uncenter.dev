const { minify } = require('html-minifier');

module.exports = {
	minifyHtml: (content) => {
		return minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
		});
	},
};
