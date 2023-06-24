const htmlmin = require('html-minifier');
const { parseHTML } = require('linkedom');

module.exports = {
	// Minify HTML.
	minifyHtml: (content) => {
		return htmlmin.minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
		});
	},
	// Wrap Shiki code blocks in a div and apply counter IDs to provide anchor links.
	wrapShiki: (content) => {
		const { document } = parseHTML(content);
		document.querySelectorAll('pre.shiki').forEach((block, index) => {
			if (document.querySelector(`#code-${index}`)) {
				throw new Error(`Duplicate code block ID: code-${index}`);
			}
			block.outerHTML = `<div class="shiki-wrapper" id="code-${index}">${block.outerHTML}</div>`;
		});
		return document.documentElement.outerHTML;
	},
};
